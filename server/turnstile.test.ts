import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("./_core/env", () => ({
  ENV: {
    turnstileSiteKey: "site-test-key",
    turnstileSecretKey: "secret-test-key",
  },
}));

import { verifyTurnstile } from "./turnstile";

describe("Turnstile verification", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("validates the token server-side with the visitor IP", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(verifyTurnstile("turnstile-token", "198.51.100.42")).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({ method: "POST" }),
    );
    const sent = new URLSearchParams(fetchMock.mock.calls[0][1].body);
    expect(Object.fromEntries(sent)).toEqual({
      secret: "secret-test-key",
      response: "turnstile-token",
      remoteip: "198.51.100.42",
    });
  });
});
