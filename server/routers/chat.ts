import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { chatSessions, chatMessages, chatSettings } from "../../drizzle/schema";
import { eq, desc, and, gt } from "drizzle-orm";
import { sendSms } from "../_core/sms";
import { ENV } from "../_core/env";
import crypto from "crypto";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const chatRouter = router({
  // Public: get chat status
  getStatus: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { isOnline: false, offlineMessage: "Chat unavailable" };
    const rows = await db.select().from(chatSettings).where(eq(chatSettings.id, 1));
    const settings = rows[0];
    return {
      isOnline: settings ? settings.isOnline === 1 : false,
      offlineMessage: settings?.offlineMessage ?? "We're currently offline. Leave your name and email and we'll get back to you shortly!",
    };
  }),

  // Public: start a new chat session
  startSession: publicProcedure
    .input(z.object({
      visitorName: z.string().min(1).max(128).optional(),
      visitorEmail: z.string().email().optional(),
      visitorPhone: z.string().max(32).optional(),
      firstMessage: z.string().min(1).max(2000),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const sessionToken = crypto.randomBytes(32).toString("hex");

      await db.insert(chatSessions).values({
        sessionToken,
        visitorName: input.visitorName,
        visitorEmail: input.visitorEmail,
        visitorPhone: input.visitorPhone,
        status: "active",
        smsSent: 0,
      });

      const rows = await db.select().from(chatSessions).where(eq(chatSessions.sessionToken, sessionToken));
      const session = rows[0];

      await db.insert(chatMessages).values({
        sessionId: session.id,
        sender: "visitor",
        message: input.firstMessage,
      });

      // SMS notification to Josh
      try {
        const name = input.visitorName || "Someone";
        const phoneStr = input.visitorPhone ? ` | Phone: ${input.visitorPhone}` : "";
        const emailStr = input.visitorEmail ? ` | Email: ${input.visitorEmail}` : "";
        // Use googlechrome:// deep link so iOS opens in Chrome instead of Safari
        const chatUrl = `https://pellsolar.com/admin/chat/${session.id}`;
        const chromeUrl = `googlechrome://pellsolar.com/admin/chat/${session.id}`;
        const smsBody = `NEW LIVE CHAT on pellsolar.com!\n${name}${phoneStr}${emailStr}\nMsg: "${input.firstMessage.slice(0, 100)}"\nReply (Chrome): ${chromeUrl}\nReply (Safari): ${chatUrl}`;
        await sendSms(ENV.twilioNotifyNumber || ENV.twilioFromNumber, smsBody);
        await db.update(chatSessions).set({ smsSent: 1 }).where(eq(chatSessions.id, session.id));
      } catch (e) {
        console.error("[Chat] SMS failed:", e);
      }

      return { sessionToken, sessionId: session.id };
    }),

  // Public: send a message
  sendMessage: publicProcedure
    .input(z.object({
      sessionToken: z.string().length(64),
      message: z.string().min(1).max(2000),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const rows = await db.select().from(chatSessions).where(eq(chatSessions.sessionToken, input.sessionToken));
      const session = rows[0];
      if (!session) throw new TRPCError({ code: "NOT_FOUND" });
      if (session.status === "closed") throw new TRPCError({ code: "BAD_REQUEST", message: "Chat is closed" });

      await db.insert(chatMessages).values({
        sessionId: session.id,
        sender: "visitor",
        message: input.message,
      });
      return { success: true };
    }),

  // Public: poll for messages
  getMessages: publicProcedure
    .input(z.object({
      sessionToken: z.string().length(64),
      afterId: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const rows = await db.select().from(chatSessions).where(eq(chatSessions.sessionToken, input.sessionToken));
      const session = rows[0];
      if (!session) throw new TRPCError({ code: "NOT_FOUND" });

      const messages = input.afterId
        ? await db.select().from(chatMessages).where(and(eq(chatMessages.sessionId, session.id), gt(chatMessages.id, input.afterId))).orderBy(chatMessages.createdAt)
        : await db.select().from(chatMessages).where(eq(chatMessages.sessionId, session.id)).orderBy(chatMessages.createdAt);

      return { messages, status: session.status };
    }),

  // Admin: toggle online/offline
  setOnlineStatus: adminProcedure
    .input(z.object({ isOnline: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(chatSettings).set({ isOnline: input.isOnline ? 1 : 0 }).where(eq(chatSettings.id, 1));
      return { isOnline: input.isOnline };
    }),

  // Admin: list sessions
  getSessions: adminProcedure
    .input(z.object({ status: z.enum(["active", "closed", "missed", "all"]).optional() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const sessions = await db.select().from(chatSessions).orderBy(desc(chatSessions.createdAt)).limit(100);
      if (input.status && input.status !== "all") {
        return sessions.filter(s => s.status === input.status);
      }
      return sessions;
    }),

  // Admin: get session messages
  getSessionMessages: adminProcedure
    .input(z.object({ sessionId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const rows = await db.select().from(chatSessions).where(eq(chatSessions.id, input.sessionId));
      const session = rows[0];
      if (!session) throw new TRPCError({ code: "NOT_FOUND" });
      const messages = await db.select().from(chatMessages).where(eq(chatMessages.sessionId, input.sessionId)).orderBy(chatMessages.createdAt);
      return { session, messages };
    }),

  // Admin: reply
  adminReply: adminProcedure
    .input(z.object({
      sessionId: z.number(),
      message: z.string().min(1).max(2000),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const rows = await db.select().from(chatSessions).where(eq(chatSessions.id, input.sessionId));
      if (!rows[0]) throw new TRPCError({ code: "NOT_FOUND" });
      await db.insert(chatMessages).values({
        sessionId: input.sessionId,
        sender: "admin",
        message: input.message,
      });
      return { success: true };
    }),

  // Admin: close session
  closeSession: adminProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(chatSessions).set({ status: "closed" }).where(eq(chatSessions.id, input.sessionId));
      return { success: true };
    }),
});
