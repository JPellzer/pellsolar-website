import CityPageTemplate from "@/components/CityPageTemplate";

export default function FresnoPage() {
  return (
    <CityPageTemplate
      city="Fresno"
      state="CA"
      county="Fresno County"
      utility="Pacific Gas & Electric (PG&E)"
      avgBill="$200–$400"
      sunHours="6.0–7.0"
      extra="Fresno is one of the sunniest cities in California with over 6 peak sun hours per day. PG&E's high rates and Fresno's abundant sunshine make solar one of the best investments a homeowner can make."
    />
  );
}
