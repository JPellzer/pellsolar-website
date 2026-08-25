import CityPageTemplate from "@/components/CityPageTemplate";

export default function BurbankPage() {
  return (
    <CityPageTemplate
      city="Burbank"
      state="CA"
      county="Los Angeles County"
      utility="Southern California Edison (SCE)"
      avgBill="$220–$420"
      sunHours="5.5–6.2"
      extra="Burbank homeowners pay some of the highest electricity rates in LA County. With SCE's peak rates reaching $0.58/kWh, a Tesla Powerwall paired with solar can eliminate your bill entirely."
    />
  );
}
