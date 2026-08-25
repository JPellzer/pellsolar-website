import CityPageTemplate from "@/components/CityPageTemplate";

export default function ElMontePage() {
  return (
    <CityPageTemplate
      city="El Monte"
      state="CA"
      county="Los Angeles County"
      utility="Southern California Edison (SCE)"
      avgBill="$200–$380"
      sunHours="5.5–6.2"
      extra="El Monte homeowners are increasingly turning to solar to escape SCE's rising rates. Our NEM 3.0-ready systems with Tesla Powerwall are designed to maximize savings in the San Gabriel Valley."
    />
  );
}
