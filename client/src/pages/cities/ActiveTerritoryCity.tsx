import { useRoute } from "wouter";
import CityPageTemplate from "@/components/CityPageTemplate";

type TerritoryCity = {
  city: string;
  intro: string;
  extra: string;
};

export const activeTerritoryCities: Record<string, TerritoryCity> = {
  "upland-ca": {
    city: "Upland",
    intro: "Pell Solar serves homeowners throughout Upland, California with professional solar and battery evaluations. Our team helps you understand residential energy options clearly and straightforwardly.",
    extra: "We help Upland homeowners evaluate solar and battery systems for their properties and household energy goals.",
  },
  "montclair-ca": {
    city: "Montclair",
    intro: "Pell Solar provides solar and battery evaluation services for homeowners throughout Montclair, California. Our team helps households assess their energy needs and explore residential system options.",
    extra: "Montclair homeowners can request a clear solar and battery evaluation tailored to their property and energy use.",
  },
  "claremont-ca": {
    city: "Claremont",
    intro: "Pell Solar serves homeowners in Claremont, California with professional solar and battery evaluations. Our team helps you explore residential energy options tailored to your household needs.",
    extra: "Claremont homeowners can talk with Pell Solar about solar panels, battery storage, and a practical next step for their home.",
  },
  "rialto-ca": {
    city: "Rialto",
    intro: "Pell Solar provides solar and battery evaluations for homeowners in Rialto, California. These consultations help households understand options for residential solar and energy storage.",
    extra: "Rialto residents can request a straightforward evaluation of solar and battery possibilities for their property.",
  },
  "colton-ca": {
    city: "Colton",
    intro: "Pell Solar serves homeowners in Colton, California with solar and battery evaluations. We provide clear energy assessments for residential properties and household goals.",
    extra: "Colton homeowners can schedule a conversation about solar panels, batteries, and their home energy needs.",
  },
  "jurupa-valley-ca": {
    city: "Jurupa Valley",
    intro: "Pell Solar serves homeowners throughout Jurupa Valley, California with solar and battery evaluations. Our team provides straightforward guidance to help households understand their energy options.",
    extra: "Jurupa Valley homeowners can request a residential solar and battery evaluation from Pell Solar.",
  },
  "moreno-valley-ca": {
    city: "Moreno Valley",
    intro: "Pell Solar provides professional solar and battery evaluations for homeowners throughout Moreno Valley, California. Our team helps you assess household energy needs with clear information.",
    extra: "Moreno Valley residents can explore solar panels and home battery options through a no-pressure consultation.",
  },
  "san-dimas-ca": {
    city: "San Dimas",
    intro: "Pell Solar serves homeowners in San Dimas, California with solar and battery evaluations. Contact our team to discuss a residential energy assessment for your property.",
    extra: "San Dimas homeowners can review solar and battery options designed around their household energy needs.",
  },
  "la-verne-ca": {
    city: "La Verne",
    intro: "Pell Solar serves homeowners in La Verne, California with solar and battery evaluations. Schedule a consultation to understand residential solar options for your property.",
    extra: "La Verne homeowners can speak with Pell Solar about solar panels, storage, and a custom home-energy evaluation.",
  },
  "covina-ca": {
    city: "Covina",
    intro: "Pell Solar provides professional solar and battery evaluations for homeowners in Covina, California. We help residential property owners assess energy needs and system options clearly.",
    extra: "Covina residents can request a practical review of solar and battery possibilities for their home.",
  },
  "west-covina-ca": {
    city: "West Covina",
    intro: "Pell Solar serves homeowners in West Covina, California with professional solar and battery evaluations. Our team helps households explore residential energy options for their property.",
    extra: "West Covina homeowners can discuss solar panels and home battery storage with a local Pell Solar representative.",
  },
  "eastvale-ca": {
    city: "Eastvale",
    intro: "Pell Solar serves homeowners throughout Eastvale, California with solar and battery evaluations. Our team helps you understand home energy options in a clear, straightforward way.",
    extra: "Eastvale homeowners can request a solar and battery consultation that starts with their household energy goals.",
  },
  "norco-ca": {
    city: "Norco",
    intro: "Pell Solar serves homeowners in Norco, California with professional solar and battery evaluations. We help you review home energy options without complicated jargon.",
    extra: "Norco homeowners can request a clear solar and battery evaluation from Pell Solar.",
  },
  "redlands-ca": {
    city: "Redlands",
    intro: "Pell Solar provides professional solar and battery evaluations for homeowners in Redlands, California. Our team is available to help you assess energy needs and explore system options.",
    extra: "Redlands residents can schedule a conversation about solar panels, home batteries, and their property’s energy needs.",
  },
  "highland-ca": {
    city: "Highland",
    intro: "Pell Solar serves homeowners in Highland, California with professional solar and battery evaluations. We help local residents review residential energy options through straightforward assessments.",
    extra: "Highland homeowners can ask Pell Solar about solar panels and battery storage for their household.",
  },
  "loma-linda-ca": {
    city: "Loma Linda",
    intro: "Pell Solar provides professional solar and battery evaluations for homeowners in Loma Linda, California. Our services help residential property owners understand their energy options clearly.",
    extra: "Loma Linda homeowners can schedule a solar and battery evaluation for their home with Pell Solar.",
  },
  "bloomington-ca": {
    city: "Bloomington",
    intro: "Pell Solar serves homeowners in Bloomington, California with solar and battery evaluations. Residents can contact our team to schedule an assessment for their home.",
    extra: "Bloomington homeowners can explore solar panels and home battery options through a clear, residential-focused consultation.",
  },
  "grand-terrace-ca": {
    city: "Grand Terrace",
    intro: "Pell Solar serves homeowners in Grand Terrace, California with professional solar and battery evaluations. We provide direct assessments to help you understand residential energy options.",
    extra: "Grand Terrace residents can request a discussion of solar and battery options suited to their property.",
  },
  "hacienda-heights-ca": {
    city: "Hacienda Heights",
    intro: "Pell Solar serves homeowners in Hacienda Heights, California with professional solar and battery evaluations. We help local residents understand home energy options through clear consultations.",
    extra: "Hacienda Heights homeowners can request a residential solar and battery evaluation from Pell Solar.",
  },
  "walnut-ca": {
    city: "Walnut",
    intro: "Pell Solar serves homeowners in Walnut, California with professional solar and battery evaluations. Our team helps you understand residential energy options through detailed property discussions.",
    extra: "Walnut residents can discuss solar panels and battery storage with Pell Solar for their home.",
  },
  "diamond-bar-ca": {
    city: "Diamond Bar",
    intro: "Pell Solar serves homeowners in Diamond Bar, California with professional solar and battery evaluations. Our team provides clear guidance to help you assess residential energy options.",
    extra: "Diamond Bar homeowners can arrange a solar and battery evaluation tailored to their household energy needs.",
  },
  "azusa-ca": {
    city: "Azusa",
    intro: "Pell Solar serves homeowners throughout Azusa, California with solar and battery evaluations. Our team helps you understand residential energy options clearly and straightforwardly.",
    extra: "Azusa homeowners can schedule a solar and battery consultation with Pell Solar for their property.",
  },
};

export default function ActiveTerritoryCity() {
  const [, params] = useRoute("/solar/:citySlug");
  const cityPage = params?.citySlug ? activeTerritoryCities[params.citySlug] : undefined;

  if (!cityPage) return null;

  return <CityPageTemplate city={cityPage.city} state="CA" intro={cityPage.intro} extra={cityPage.extra} />;
}
