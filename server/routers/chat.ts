import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { chatSessions, chatMessages } from "../../drizzle/schema";
import { eq, desc, and, gt } from "drizzle-orm";
import crypto from "crypto";
import {
  assistantStatus,
  setAssistantEnabled,
  initializeSession,
  queueTurn,
  respond,
  stateFor,
  requestHandoff,
  profileSchema,
  takeOver,
  syncConversation,
} from "../solarAssistant";
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});
async function sessionFor(token: string) {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  const [s] = await db
    .select()
    .from(chatSessions)
    .where(eq(chatSessions.sessionToken, token));
  if (!s) throw new TRPCError({ code: "NOT_FOUND" });
  return { db, s };
}
export const chatRouter = router({
  getStatus: publicProcedure.query(() => assistantStatus()),
  startSession: publicProcedure
    .input(
      z.object({
        firstMessage: z.string().trim().min(1).max(2000),
        clientId: z.string().uuid(),
        utm: z.record(z.string(), z.string().max(500)).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!(await assistantStatus()).isOnline)
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Chat is paused. Please call the team.",
        });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const sessionToken = crypto.randomBytes(32).toString("hex");
      const [s] = await db
        .insert(chatSessions)
        .values({ sessionToken, status: "active", smsSent: 0 })
        .returning();
      try {
        await initializeSession(s.id, ctx.req.ip || "unknown", input.utm);
        await queueTurn(s.id, input.clientId, input.firstMessage);
      } catch (e) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: e instanceof Error ? e.message : "Please try again.",
        });
      }
      void respond(s.id).catch(() => {});
      return { sessionToken, sessionId: s.id };
    }),
  sendMessage: publicProcedure
    .input(
      z.object({
        sessionToken: z.string().length(64),
        message: z.string().trim().min(1).max(2000),
        clientId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { s } = await sessionFor(input.sessionToken);
      if (s.status === "closed")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This chat is closed. Please start a new conversation.",
        });
      if (!(await assistantStatus()).isOnline)
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Chat is paused. Please call the team.",
        });
      try {
        await queueTurn(s.id, input.clientId, input.message);
      } catch (e) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: e instanceof Error ? e.message : "Please try again.",
        });
      }
      void respond(s.id).catch(() => {});
      return { success: true };
    }),
  getMessages: publicProcedure
    .input(
      z.object({
        sessionToken: z.string().length(64),
        afterId: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const { db, s } = await sessionFor(input.sessionToken);
      const state = await stateFor(s.id);
      const messages = await db
        .select()
        .from(chatMessages)
        .where(
          input.afterId
            ? and(
                eq(chatMessages.sessionId, s.id),
                gt(chatMessages.id, input.afterId)
              )
            : eq(chatMessages.sessionId, s.id)
        )
        .orderBy(chatMessages.id);
      return { messages, status: s.status, assistant: state };
    }),
  requestCallback: publicProcedure
    .input(
      z.object({
        sessionToken: z.string().length(64),
        profile: profileSchema,
        consent: z.literal(true),
      })
    )
    .mutation(async ({ input }) => {
      const { s } = await sessionFor(input.sessionToken);
      if (s.status === "closed")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please start a new chat.",
        });
      try {
        return await requestHandoff(s.id, input.profile);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            e instanceof Error ? e.message : "Please check your details.",
        });
      }
    }),
  // Admin: toggle online/offline
  setOnlineStatus: adminProcedure
    .input(z.object({ isOnline: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await setAssistantEnabled(input.isOnline);
      return { isOnline: input.isOnline };
    }),

  // Admin: list sessions
  getSessions: adminProcedure
    .input(
      z.object({
        status: z.enum(["active", "closed", "missed", "all"]).optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const sessions = await db
        .select()
        .from(chatSessions)
        .orderBy(desc(chatSessions.createdAt))
        .limit(100);
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
      const rows = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.id, input.sessionId));
      const session = rows[0];
      if (!session) throw new TRPCError({ code: "NOT_FOUND" });
      const messages = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, input.sessionId))
        .orderBy(chatMessages.createdAt);
      return { session, messages };
    }),

  // Admin: reply
  adminReply: adminProcedure
    .input(
      z.object({
        sessionId: z.number(),
        message: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const rows = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.id, input.sessionId));
      if (!rows[0]) throw new TRPCError({ code: "NOT_FOUND" });
      await takeOver(input.sessionId);
      await db.insert(chatMessages).values({
        sessionId: input.sessionId,
        sender: "admin",
        message: input.message,
      });
      await syncConversation(input.sessionId);
      return { success: true };
    }),

  // Admin: close session
  closeSession: adminProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db
        .update(chatSessions)
        .set({ status: "closed" })
        .where(eq(chatSessions.id, input.sessionId));
      return { success: true };
    }),
});
