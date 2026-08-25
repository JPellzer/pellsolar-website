import type { Express } from "express";
import path from "path";
import fs from "fs";
import { storageGetSignedUrl } from "../storage";

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string | undefined>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    // Guard against path traversal
    if (key.includes("..") || key.startsWith("/")) {
      res.status(400).send("Invalid storage key");
      return;
    }

    // Try to serve from local bundled files first
    const localPath = path.resolve(process.cwd(), "dist", "public", "manus-storage", key);

    try {
      if (fs.existsSync(localPath)) {
        res.set("Cache-Control", "public, max-age=31536000, immutable");
        res.sendFile(localPath, (err) => {
          if (err) {
            console.error("[StorageProxy] sendFile error:", err);
            if (!res.headersSent) {
              res.status(404).send("File not found");
            }
          }
        });
        return;
      }

      // Fall back to R2 if local file doesn't exist AND R2 is configured
      if (process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY) {
        try {
          const signedUrl = await storageGetSignedUrl(key, 3600);
          res.set("Cache-Control", "no-store");
          res.redirect(307, signedUrl);
        } catch (err) {
          console.error("[StorageProxy] R2 fetch failed:", err);
          res.status(404).send("File not found");
        }
      } else {
        // No local file and R2 not configured
        res.status(404).send("File not found");
      }
    } catch (err) {
      console.error("[StorageProxy] Unhandled error:", err);
      if (!res.headersSent) {
        res.status(500).send("Internal server error");
      }
    }
  });
}
