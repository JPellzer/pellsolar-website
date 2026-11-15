import { describe, it, expect } from "vitest";
import {
  enforceGrounding,
  humanHandoffAnswer,
  serviceGuidance,
} from "./solarAssistantKnowledge";
describe("website answers and human handoff", () => {
  const basic = {
    answer:
      "A battery stores energy for later use. What would you like to back up?",
    offerCallback: false,
    answerBasis: "website",
    sourceIds: ["battery"],
  };
  it("answers a supported basic question without demanding contact details", () => {
    expect(enforceGrounding(basic, "What is a battery for?")).toEqual(basic);
  });
  it("hands unknown, unsupported and fabricated-source answers to a person", () => {
    for (const extra of [
      { answerBasis: "needs_person" },
      { sourceIds: ["invented"] },
      { sourceIds: [] },
      { answerBasis: undefined },
    ]) {
      const r = enforceGrounding({ ...basic, ...extra }, "Am I covered?");
      expect(r.answer).toBe(humanHandoffAnswer);
      expect(r.offerCallback).toBe(true);
    }
  });
  it.each([
    "Your price is $12,000.",
    "You qualify for 30%.",
    "It runs for 12 hours.",
    "Your warranty is 10 years.",
    "A single battery should be enough.",
    "You are approved for a lease.",
    "Open the inverter cover and disconnect the wire.",
  ])("blocks an unverified claim or repair instruction: %s", answer => {
    expect(enforceGrounding({ ...basic, answer }, "Please guess").answer).toBe(
      humanHandoffAnswer
    );
  });
  it("retains visitor context and the verified telephone contact", () => {
    const r = enforceGrounding(
      {
        ...basic,
        answerBasis: "conversation",
        sourceIds: [],
        answer:
          "You mentioned your refrigerator and lights. You can call Josh at (909) 240-5294.",
      },
      "What did I want to back up?"
    );
    expect(r.answer).toContain("refrigerator and lights");
  });
  it("directs hazards to emergency help rather than waiting for a sales callback", () => {
    const r = enforceGrounding(basic, "My battery is smoking");
    expect(r.answer).toContain("911");
    expect(r.answer).toContain("not emergency service");
    expect(
      serviceGuidance({ description: "There is a burning smell" })
    ).toContain("911");
  });
  it("service guidance never diagnoses a fault or promises warranty coverage", () => {
    const r = serviceGuidance({
      description: "The app is offline",
      selectedIssues: ["monitoring_issue"],
    });
    expect(r).toContain("qualified technician");
    expect(r).toContain("cannot confirm coverage");
    expect(r).toContain("No appointment is booked");
    expect(r).not.toMatch(/OFF →|DC ON|\d+.?year warranty/);
  });
});
