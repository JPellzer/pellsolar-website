import CityPageTemplate from "@/components/CityPageTemplate";

export default function BaldwinParkPage() {
  return (
    <CityPageTemplate
      city="Baldwin Park"
      state="CA"
      county="Los Angeles County"
      utility="Southern California Edison (SCE)"
      avgBill="$200–$380"
      sunHours="5.5–6.2"
      extra="Baldwin Park homeowners face some of the highest electricity rates in the San Gabriel Valley. Solar + Powerwall is the most effective way to eliminate your SCE bill under NEM 3.0."
    />
  );
}
