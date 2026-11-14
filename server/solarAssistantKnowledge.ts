// Reviewed website facts for the assistant. Marketing claims on other pages are not
// automatically evidence for pricing, eligibility, warranties, diagnosis or sizing.
export const assistantKnowledge = [
  {
    id: "company",
    source: "https://pellsolar.com/",
    facts:
      "Pell Solar is a family-owned business serving Southern California and Idaho. It offers new solar installations, battery backup and service/repair. A representative confirms service availability for the customer's address.",
  },
  {
    id: "solar",
    source: "https://pellsolar.com/solar-panel-systems",
    facts:
      "Solar panels generate electricity from sunlight. Project design depends on the property and electricity use. Pell Solar can discuss solar with or without battery storage. No production, savings or system-size guarantee is available in chat.",
  },
  {
    id: "battery",
    source: "https://pellsolar.com/battery-backup",
    facts:
      "A home battery stores energy for later use. A system designed for backup can supply selected loads during an outage. Existing-solar battery additions require a compatibility and electrical review. The number of batteries and backup duration depend on the equipment, loads, stored charge and installation; a specialist must size the customer's system.",
  },
  {
    id: "powerwall",
    source:
      "https://www.tesla.com/support/energy/powerwall/learn/what-can-powerwall-back-up",
    facts:
      "Powerwall backup capability and duration depend on system configuration, the number of Powerwalls, appliances and home energy use. Do not estimate a customer's runtime or promise that one battery is enough. Pell Solar offers Tesla Powerwall installations subject to project review.",
  },
  {
    id: "payments",
    source: "https://pellsolar.com/financing",
    facts:
      "Customers can ask to compare cash purchase, financing and lease options. Solar or battery-only lease availability and approval depend on the project, equipment and provider. A written proposal explains price, payments, fees, annual increases, coverage and home-sale terms. An equipment payment does not necessarily eliminate the utility bill. Chat cannot quote terms or decide eligibility.",
  },
  {
    id: "service",
    source: "https://pellsolar.com/solar-repair",
    facts:
      "Customers can request help for solar, inverter, battery or monitoring problems, including an existing installation. Collect the symptom, equipment brand and any displayed error if already known. Do not diagnose a fault, confirm warranty coverage or instruct electrical repair; arrange a qualified person's review.",
  },
  {
    id: "next_step",
    source: "https://pellsolar.com/get-quote",
    facts:
      "For a project review, gather name, contact number, ZIP, address and project interests when the visitor wants follow-up. They review and confirm a callback card. The request is not sent until they confirm it. There is no verified immediate-callback or installation-time promise.",
  },
];
export const humanHandoffAnswer =
  "I don't have a verified answer for that, and I don't want to steer you wrong. A Pell Solar specialist should review it with you. You can call Josh at (909) 240-5294 or request a callback below.";
export function safetyAnswer(question: string): string | null {
  if (
    /\b(smoking|sparking|burning smell|exposed (?:live )?wir(?:e|es|ing)|electric(?:al)? shock)\b|\bsmoke (?:coming |is coming )?from\b/i.test(
      question
    )
  )
    return "If there is smoke, fire, sparking or an immediate danger, move away from the equipment and call 911. Do not open, touch or try to repair the equipment. After the area is safe, a qualified technician needs to inspect it; a callback request is not emergency service.";
  return null;
}
export function serviceGuidance(input: {
  description?: string;
  selectedIssues?: string[];
}) {
  const emergency = safetyAnswer(input.description || "");
  if (emergency)
    return (
      emergency +
      "\n\nWarranty coverage must be checked against your equipment and written terms."
    );
  return "A qualified technician needs to review the symptoms before we can identify a fault or recommend a repair. If you can view your monitoring app safely, note the displayed alert, error code and when it last updated. You do not need to open equipment, reset breakers, climb onto the roof or change settings.\n\nWarranty coverage depends on the equipment and applicable written terms; we cannot confirm coverage from this form.\n\nCall Josh at (909) 240-5294 or complete the contact step below to request a service review. No appointment is booked until the team confirms it.";
}
type Reply = {
  answer: string;
  offerCallback: boolean;
  answerBasis?: string;
  sourceIds?: string[];
};
export function enforceGrounding<T extends Reply>(
  reply: T,
  question: string
): T {
  const danger = safetyAnswer(question);
  if (danger) return { ...reply, answer: danger, offerCallback: true };
  const known = new Set(assistantKnowledge.map(k => k.id));
  const sourced =
    reply.answerBasis === "website" &&
    !!reply.sourceIds?.length &&
    reply.sourceIds.every(id => known.has(id));
  const recalled = reply.answerBasis === "conversation";
  const text = reply.answer.replace(
    /\(909\) 240-5294|909[ .-]?240[ .-]?5294/g,
    ""
  );
  // No generated numbers for a quote, incentive, warranty or performance promise.
  const unsupported =
    /\$\s*\d|\d\s*%|\b\d+(?:\.\d+)?\s*(?:kwh|kw|hours?|years?|months?)\b|\b(?:one|two|three|single)\s+(?:battery|batteries|powerwalls?)\b|\b(?:guarantee(?:d)?|definitely qualifies|approved for|off.grid indefinitely)\b/i.test(
      text
    );
  const unsafeInstruction =
    /\b(?:open|remove|disconnect|rewire|bypass|reset|switch off|turn off)\b.{0,70}\b(?:panel|cover|wire|breaker|disconnect|inverter|battery)\b/i.test(
      text
    );
  if ((!sourced && !recalled) || unsupported || unsafeInstruction)
    return { ...reply, answer: humanHandoffAnswer, offerCallback: true };
  return reply;
}
