import CityPageTemplate from "@/components/CityPageTemplate";

export default function LosAngelesPage() {
  return (
    <CityPageTemplate
      city="Los Angeles"
      state="CA"
      county="Los Angeles County"
      utility="Southern California Edison (SCE)"
      avgBill="$250–$500"
      sunHours="5.5–6.2"
      extra="Los Angeles is one of the largest solar markets in the world. With SCE's high rates, California's strong incentives, and LA's abundant sunshine, going solar in Los Angeles is one of the best financial decisions a homeowner can make."
    />
  );
}
