import type { Express } from "express";
import { storagePut, storageGetSignedUrl } from "./storage";

// Multer-free upload handler using raw body parsing
export function registerUploadRoute(app: Express) {
  // Multipart upload handled via base64 JSON body to avoid multer dependency
  app.post("/api/upload-bill", async (req, res) => {
    try {
      const { fileName, contentType, base64Data } = req.body as {
        fileName: string;
        contentType: string;
        base64Data: string;
      };

      if (!fileName || !contentType || !base64Data) {
        res.status(400).json({ error: "Missing fileName, contentType, or base64Data" });
        return;
      }

      // Validate file type — includes CSV for Green Button data
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/heic",
        "image/heif",
        "text/csv",
        "application/csv",
        "text/plain",
        "application/vnd.ms-excel",
        "application/octet-stream",
      ];
      if (!allowedTypes.includes(contentType)) {
        res.status(400).json({ error: "Invalid file type. Accepted: CSV, PDF, JPEG, PNG" });
        return;
      }

      const buffer = Buffer.from(base64Data, "base64");

      // 10MB limit
      if (buffer.length > 10 * 1024 * 1024) {
        res.status(400).json({ error: "File too large. Maximum size is 10MB." });
        return;
      }

      const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const key = `bills/${Date.now()}-${safeFileName}`;

      const { key: storedKey, url } = await storagePut(key, buffer, contentType);

      // Generate a presigned S3 URL so third-party servers (e.g. the CRM)
      // can download the file directly — /manus-storage/ URLs are browser-session-bound
      // and return 403 to external servers.
      // Always fall back to the /manus-storage/ path so billFileUrl is never NULL.
      let publicUrl: string = `https://pellsolar.com/manus-storage/${storedKey}`;
      try {
        const signedUrl = await storageGetSignedUrl(storedKey, 7 * 24 * 60 * 60);
        if (signedUrl) publicUrl = signedUrl;
      } catch (e) {
        console.warn("[UploadRoute] Could not generate presigned URL, using fallback:", e);
      }

      res.json({ success: true, key: storedKey, url, publicUrl });
    } catch (err) {
      console.error("[UploadRoute] Error:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  });
}
