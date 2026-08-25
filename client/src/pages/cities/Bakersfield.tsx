import CityPageTemplate from "@/components/CityPageTemplate";

export default function BakersfieldPage() {
  return (
    <CityPageTemplate
      city="Bakersfield"
      state="CA"
      county="Kern County"
      utility="Pacific Gas & Electric (PG&E)"
      avgBill="$180–$350"
      sunHours="6.0–7.0"
      extra="Bakersfield is one of the sunniest cities in California — averaging over 6 peak sun hours per day. That means more solar production, faster payback, and bigger savings than most California cities."
    />
  );
}
