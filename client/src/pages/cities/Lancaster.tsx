import CityPageTemplate from "@/components/CityPageTemplate";

export default function LancasterPage() {
  return (
    <CityPageTemplate
      city="Lancaster"
      state="CA"
      county="Los Angeles County"
      utility="Southern California Edison (SCE)"
      avgBill="$200–$400"
      sunHours="6.5–7.5"
      extra="Lancaster is one of the best cities in California for solar — with over 6.5 peak sun hours per day in the Antelope Valley. More sun means more production and faster payback."
    />
  );
}
