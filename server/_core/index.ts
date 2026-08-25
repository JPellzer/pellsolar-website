import "dotenv/config";
import express from "express";
import crypto from "crypto";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerUploadRoute } from "../uploadRoute";
import { registerUnsubscribeRoute } from "../unsubscribeRoute";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import redirectsRouter from "../redirects";
import staticPagesRouter from "../staticPages";
import { ensureSchema } from "./ensureSchema";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  // Bootstrap schema before starting server
  await ensureSchema();

  const app = express();
  const server = createServer(app);
  if (process.env.NODE_ENV === "production") {
    app.use((_req, res, next) => {
      const nonce = crypto.randomBytes(16).toString("base64");
      res.locals.cspNonce = nonce;
      // The hosted HTML shell contains a Vite module script without a per-request nonce.
      // Keep first-party bundles and approved analytics working, while refusing the injected
      // third-party dispatcher host rather than preventing React hydration sitewide.
      res.setHeader(
        "Content-Security-Policy",
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://connect.facebook.net https://maps.googleapis.com https://maps.gstatic.com; object-src 'none'; base-uri 'self'"
      );
      next();
    });
  }
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  // 301 redirects from old WordPress URLs — must be before tRPC and static
  app.use(redirectsRouter);
  registerOAuthRoutes(app);
  registerUploadRoute(app);
  registerUnsubscribeRoute(app);
  // Static HTML pages (server-side rendered for bots/scrapers — must be before tRPC and Vite)
  app.use(staticPagesRouter);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
