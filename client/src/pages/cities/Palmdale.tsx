import CityPageTemplate from "@/components/CityPageTemplate";

export default function PalmdalePage() {
  return (
    <CityPageTemplate
      city="Palmdale"
      state="CA"
      county="Los Angeles County"
      utility="Southern California Edison (SCE)"
      avgBill="$200–$400"
      sunHours="6.5–7.5"
      extra="Palmdale is one of the sunniest cities in California — averaging over 6.5 peak sun hours per day in the Antelope Valley. More sun means more production, faster payback, and bigger savings."
    />
  );
}
