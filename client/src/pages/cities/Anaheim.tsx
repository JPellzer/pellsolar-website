import CityPageTemplate from "@/components/CityPageTemplate";

export default function AnaheimPage() {
  return (
    <CityPageTemplate
      city="Anaheim"
      state="CA"
      county="Orange County"
      utility="Southern California Edison (SCE)"
      avgBill="$200–$380"
      sunHours="5.8–6.5"
      extra="Anaheim homeowners are switching to solar faster than almost anywhere in Orange County. With SCE's tiered rates pushing bills over $300/mo in summer, a solar + Powerwall system pays for itself faster here than in most of California."
    />
  );
}
