import CityPageTemplate from "@/components/CityPageTemplate";

export default function VenturaPage() {
  return (
    <CityPageTemplate
      city="Ventura"
      state="CA"
      county="Ventura County"
      utility="Southern California Edison (SCE)"
      avgBill="$200–$400"
      sunHours="5.8–6.5"
      extra="Ventura's coastal location gives homeowners consistent sun exposure and strong potential for solar and battery planning."
    />
  );
}
