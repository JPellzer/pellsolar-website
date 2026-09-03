import type { Express } from "express";
import path from "path";
import fs from "fs";
import { storageGetSignedUrl } from "../storage";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { ENV } from "./env";

let _s3Client: S3Client | null = null;

function getR2Client(): S3Client {
  if (!_s3Client) {
    const accountId = ENV.r2AccountId;
    const accessKeyId = ENV.r2AccessKeyId;
    const secretAccessKey = ENV.r2SecretAccessKey;

    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error(
        "R2 config missing: set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY"
      );
    }

    _s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  return _s3Client;
}

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
          const client = getR2Client();
          const bucket = ENV.r2Bucket || "pellsolar-website";
          let finalKey = key;

          // Try bare key first, fall back to manus-storage/ prefix if not found
          try {
            await client.send(
              new HeadObjectCommand({
                Bucket: bucket,
                Key: key,
              })
            );
            // Bare key exists, use it
            finalKey = key;
          } catch (headErr: unknown) {
            // Bare key doesn't exist, try prefixed key
            const errName = headErr && typeof headErr === "object" && "name" in headErr ? (headErr as { name: string }).name : "";
            if (errName === "NotFound" || errName === "NoSuchKey") {
              finalKey = `manus-storage/${key}`;
            } else {
              // Some other error, rethrow
              throw headErr;
            }
          }

          const signedUrl = await storageGetSignedUrl(finalKey, 3600);
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
