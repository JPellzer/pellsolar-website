import CityPageTemplate from "@/components/CityPageTemplate";

export default function LongBeachPage() {
  return (
    <CityPageTemplate
      city="Long Beach"
      state="CA"
      county="Los Angeles County"
      utility="Southern California Edison (SCE)"
      avgBill="$200–$400"
      sunHours="5.5–6.2"
      extra="Long Beach homeowners benefit from California's strong solar incentives and SCE's high rates. Our Solar Shield packages start at $234/mo with $0 down and include a Tesla Powerwall 3."
    />
  );
}
