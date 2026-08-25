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
    if (key.includes("..")) {
      res.status(400).send("Invalid storage key");
      return;
    }

    // Try to serve from local bundled files first
    const localPath = path.join(__dirname, "../../dist/public/manus-storage", key);
    if (fs.existsSync(localPath)) {
      res.set("Cache-Control", "public, max-age=31536000, immutable");
      res.sendFile(localPath);
      return;
    }

    // Fall back to R2 if local file doesn't exist
    try {
      const signedUrl = await storageGetSignedUrl(key, 3600);
      res.set("Cache-Control", "no-store");
      res.redirect(307, signedUrl);
    } catch (err) {
      console.error("[StorageProxy] R2 fetch failed and no local file:", err);
      res.status(404).send("File not found");
    }
  });
}
