import { beforeAll, afterAll, describe, it, expect, vi } from "vitest";
import { Pool } from "pg";
let db: Pool, schema: string, api: typeof import("./solarAssistant");
let modelCalls = 0,
  crmCalls = 0,
  crmOk = false;
vi.mock("./db", () => ({ getPool: async () => db }));
vi.mock("./_core/env", () => ({ ENV: { anthropicApiKey: "fixture" } }));
const suite =
  process.env.MARKETING_TEST_DB === "local" ? describe : describe.skip;
suite("website solar assistant persistence", () => {
  beforeAll(async () => {
    schema = "web_assistant_" + Math.random().toString(16).slice(2);
    const config = {
      host: "127.0.0.1",
      port: 55439,
      database: "postgres",
      user: process.env.USER,
    };
    const setup = new Pool(config);
    await setup.query("CREATE SCHEMA " + schema);
    await setup.end();
    db = new Pool({ ...config, options: "-c search_path=" + schema });
    await db.query(
      `CREATE TABLE website_chat_sessions(id SERIAL PRIMARY KEY,"visitorName" TEXT,"visitorPhone" TEXT,"visitorEmail" TEXT);CREATE TABLE website_chat_messages(id SERIAL PRIMARY KEY,"sessionId" INT,sender TEXT,message TEXT,"createdAt" TIMESTAMPTZ DEFAULT NOW());INSERT INTO website_chat_sessions(id) VALUES(1),(2),(90001);`
    );
    vi.stubEnv("CRM_WEBHOOK_URL", "https://crm.test/api/webhooks/website-lead");
    vi.stubEnv("CRM_DELIVERY_ENABLED", "true");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url, opts) => {
        if (String(url).includes("anthropic")) {
          modelCalls++;
          const context = JSON.parse(
            JSON.parse(String(opts.body)).messages[0].content
          );
          expect(context.conversation.at(-1).text).toContain("battery");
          return new Response(
            JSON.stringify({
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    answer:
                      "A battery can store energy for evening use. Do you already have solar?",
                    profile: {
                      name: "Fabricated Person",
                      phone: "9995550109",
                      interest: "battery",
                    },
                    summary: "Asked about battery backup. Location unknown.",
                    offerCallback: true,
                  }),
                },
              ],
            })
          );
        }
        crmCalls++;
        const payload = JSON.parse(String(opts.body));
        expect(payload.followup_requested).toBe(true);
        expect(
          payload.messages.some((m: any) => m.text.includes("battery"))
        ).toBe(true);
        return new Response(
          JSON.stringify(
            crmOk ? { success: true, deal_id: 99 } : { success: false }
          ),
          { status: crmOk ? 200 : 503 }
        );
      })
    );
    api = await import("./solarAssistant");
    await api.ensureAssistant();
    await api.initializeSession(1, "fixture");
    await api.initializeSession(2, "fixture");
  });
  afterAll(async () => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    if (db) {
      await db.query("DROP SCHEMA " + schema + " CASCADE");
      await db.end();
    }
  });
  it("defaults ON, deduplicates a retried visitor question and remembers the response without sending a lead", async () => {
    const inserted = await db.query('INSERT INTO website_chat_sessions DEFAULT VALUES RETURNING id');
    expect(inserted.rows[0].id).toBeGreaterThan(90001);
    expect((await api.assistantStatus()).isOnline).toBe(true);
    await api.queueTurn(1, "message-one", "I want a battery");
    await api.queueTurn(1, "message-one", "I want a battery");
    await Promise.all([api.respond(1), api.respond(1)]);
    expect(modelCalls).toBe(1);
    expect(crmCalls).toBe(0);
    expect(
      (await db.query("SELECT count(*)::int n FROM website_chat_messages"))
        .rows[0].n
    ).toBe(2);
    const state = await api.stateFor(1);
    expect(state.pending).toBe(false);
    expect(state.profile.phone).toBeUndefined();
    expect(state.profile.name).toBeUndefined();
    expect(state.profile.interest).toBe("battery");
  });
  it("requires usable contact and retains a callback request until the CRM acknowledges it", async () => {
    await expect(
      api.requestHandoff(1, { name: "Test", phone: "123", zip: "91786" })
    ).rejects.toThrow(/valid phone/);
    await api.requestHandoff(1, {
      name: "Test Visitor",
      phone: "9515550101",
      zip: "91786",
    });
    expect((await api.stateFor(1)).handoff_requested).toBe(true);
    expect((await api.stateFor(1)).crm_deal_id).toBeNull();
    crmOk = true;
    await db.query(
      "UPDATE website_assistant_sessions SET next_delivery_at=NOW()"
    );
    await api.deliver(1);
    expect((await api.stateFor(1)).crm_deal_id).toBe(99);
    const previous = crmCalls;
    await api.deliver(1);
    expect(crmCalls).toBe(previous);
  });
  it("the OFF switch and human takeover suppress AI replies", async () => {
    await api.setAssistantEnabled(false);
    await api.queueTurn(2, "off-one", "Another battery question");
    await api.respond(2);
    expect(modelCalls).toBe(1);
    await api.setAssistantEnabled(true);
    await api.takeOver(2);
    await api.queueTurn(2, "staff-one", "A battery question for the rep");
    await api.respond(2);
    expect(modelCalls).toBe(1);
  });
  it("keeps callback details confirmed while a model response is in flight", async () => {
    await db.query('INSERT INTO website_chat_sessions(id) VALUES(3)');
    await api.initializeSession(3, "race-fixture");
    await api.queueTurn(3, "race-one", "I want a battery");
    let release!: () => void;
    let started!: () => void;
    const waiting = new Promise<void>(resolve => { release = resolve; });
    const entered = new Promise<void>(resolve => { started = resolve; });
    vi.mocked(fetch).mockImplementationOnce(async () => {
      started();
      await waiting;
      return new Response(JSON.stringify({ content: [{ type: "text", text: JSON.stringify({
        answer: "A battery can help with backup.", profile: { interest: "battery" },
        summary: "Interested in a battery.", offerCallback: true,
      }) }] }));
    });
    const response = api.respond(3);
    await entered;
    await api.requestHandoff(3, { name: "Confirmed Visitor", phone: "9515550102", zip: "91786" });
    release();
    await response;
    const state = await api.stateFor(3);
    expect(state.profile.name).toBe("Confirmed Visitor");
    expect(state.profile.phone).toBe("9515550102");
    expect(state.crm_deal_id).toBe(99);
  });
});
