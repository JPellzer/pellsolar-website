import CityPageTemplate from "@/components/CityPageTemplate";

export default function LaHabraPage() {
  return (
    <CityPageTemplate
      city="La Habra"
      state="CA"
      county="Orange County"
      utility="Southern California Edison (SCE)"
      avgBill="$200–$380"
      sunHours="5.8–6.5"
      extra="La Habra's location on the Orange/LA County border gives homeowners excellent sun exposure and access to local solar options."
    />
  );
}
