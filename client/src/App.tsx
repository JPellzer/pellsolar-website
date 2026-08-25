import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}
import { Toaster } from "sonner";
// Core pages
import Home from "@/pages/Home";
import QuotePage from "@/pages/QuotePage";
import AboutUs from "@/pages/AboutUs";
import Reviews from "@/pages/Reviews";
import ScheduleCall from "@/pages/ScheduleCall";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import SmsOptIn from "@/pages/SmsOptIn";
import California from "@/pages/California";
import Idaho from "@/pages/Idaho";
import OurWork from "@/pages/OurWork";
import AdminPhotos from "@/pages/AdminPhotos";
import AdminDashboard from "@/pages/AdminDashboard";
import LeadDetail from "@/pages/LeadDetail";
import Blog from "@/pages/Blog";
import BlogArticle from "@/pages/BlogArticle";

// Service pages
import SolarSystems from "@/pages/SolarSystems";
import TeslaPowerwall from "@/pages/TeslaPowerwall";
import BatteryBackup from "@/pages/BatteryBackup";
import EVCharging from "@/pages/EVCharging";
import Financing from "@/pages/Financing";
import SolarRepair from "@/pages/SolarRepair";
import ReferralProgram from "@/pages/ReferralProgram";
import ServiceWarranty from "@/pages/ServiceWarranty";
import SolarLease from "@/pages/SolarLease";
import NEM30 from "@/pages/NEM30";
import SolarDemo from "@/pages/SolarDemo";
import UploadBill from "@/pages/UploadBill";
import ThankYou from "@/pages/ThankYou";
import Unsubscribe from "@/pages/Unsubscribe";
import AdminUnsubscribes from "@/pages/AdminUnsubscribes";
import AdminChat from "@/pages/AdminChat";
import AdminChatHistory from "@/pages/AdminChatHistory";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import Head from "@/components/Head";

// City pages
import AnaheimPage from "@/pages/cities/Anaheim";
import BakersfieldPage from "@/pages/cities/Bakersfield";
import BaldwinParkPage from "@/pages/cities/BaldwinPark";
import BreaPage from "@/pages/cities/Brea";
import BurbankPage from "@/pages/cities/Burbank";
import ChinoPage from "@/pages/cities/Chino";
import ChinoHillsPage from "@/pages/cities/ChinoHills";
import CoronaPage from "@/pages/cities/Corona";
import ElMontePage from "@/pages/cities/ElMonte";
import FontanaPage from "@/pages/cities/Fontana";
import FresnoPage from "@/pages/cities/Fresno";
import FullertonPage from "@/pages/cities/Fullerton";
import GardenGrovePage from "@/pages/cities/GardenGrove";
import GlendoraPage from "@/pages/cities/Glendora";
import InlandEmpirePage from "@/pages/cities/InlandEmpire";
import IrvinePage from "@/pages/cities/Irvine";
import LaHabraPage from "@/pages/cities/LaHabra";
import LakewoodPage from "@/pages/cities/Lakewood";
import LancasterPage from "@/pages/cities/Lancaster";
import LongBeachPage from "@/pages/cities/LongBeach";
import LosAngelesPage from "@/pages/cities/LosAngeles";
import MurrietaPage from "@/pages/cities/Murrieta";
import OntarioPage from "@/pages/cities/Ontario";
import OrangePage from "@/pages/cities/Orange";
import PalmdalePage from "@/pages/cities/Palmdale";
import PomonaPage from "@/pages/cities/Pomona";
import RanchoCucamongaPage from "@/pages/cities/RanchoCucamonga";
import RiversidePage from "@/pages/cities/Riverside";
import SanBernardinoPage from "@/pages/cities/SanBernardino";
import SantaAnaPage from "@/pages/cities/SantaAna";
import TemeculaPage from "@/pages/cities/Temecula";
import ThousandOaksPage from "@/pages/cities/ThousandOaks";
import TorrancePage from "@/pages/cities/Torrance";
import VenturaPage from "@/pages/cities/Ventura";
import ActiveTerritoryCity from "@/pages/cities/ActiveTerritoryCity";

export default function App() {
  return (
    <>
      <Head />
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <Switch>
        {/* Core */}
        <Route path="/" component={Home} />
        <Route path="/get-quote" component={QuotePage} />
        <Route path="/referral-program" component={ReferralProgram} />
        <Route path="/refer" component={ReferralProgram} />
        <Route path="/about" component={AboutUs} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/schedule" component={ScheduleCall} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route path="/terms-and-conditions" component={Terms} />
        <Route path="/sms-updates" component={SmsOptIn} />
        <Route path="/solar-demo" component={SolarDemo} />
        <Route path="/upload-bill" component={UploadBill} />
        <Route path="/upload-your-bill" component={UploadBill} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/unsubscribe" component={Unsubscribe} />
        <Route path="/our-work" component={OurWork} />

        {/* Blog */}
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogArticle} />

        {/* State pages */}
        <Route path="/california" component={California} />
        <Route path="/solar-california" component={California} />
        <Route path="/idaho" component={Idaho} />
        <Route path="/solar-idaho" component={Idaho} />

        {/* Service pages */}
        <Route path="/solar-panel-systems" component={SolarSystems} />
        <Route path="/solar-panels" component={SolarSystems} />
        <Route path="/tesla-powerwall" component={TeslaPowerwall} />
        <Route path="/battery-backup" component={BatteryBackup} />
        <Route path="/ev-charging" component={EVCharging} />
        <Route path="/financing" component={Financing} />
        <Route path="/solar-financing" component={Financing} />
        <Route path="/solar-repair" component={SolarRepair} />
        <Route path="/service-warranty" component={ServiceWarranty} />
        <Route path="/solar-lease" component={SolarLease} />
        <Route path="/nem-3" component={NEM30} />
        <Route path="/nem-3-0" component={NEM30} />

        {/* City pages — CA */}
        <Route path="/solar/anaheim-ca" component={AnaheimPage} />
        <Route path="/solar/bakersfield-ca" component={BakersfieldPage} />
        <Route path="/solar/baldwin-park-ca" component={BaldwinParkPage} />
        <Route path="/solar/brea-ca" component={BreaPage} />
        <Route path="/solar/burbank-ca" component={BurbankPage} />
        <Route path="/solar/chino-ca" component={ChinoPage} />
        <Route path="/solar/chino-hills-ca" component={ChinoHillsPage} />
        <Route path="/solar/corona-ca" component={CoronaPage} />
        <Route path="/solar/el-monte-ca" component={ElMontePage} />
        <Route path="/solar/fontana-ca" component={FontanaPage} />
        <Route path="/solar/fresno-ca" component={FresnoPage} />
        <Route path="/solar/fullerton-ca" component={FullertonPage} />
        <Route path="/solar/garden-grove-ca" component={GardenGrovePage} />
        <Route path="/solar/glendora-ca" component={GlendoraPage} />
        <Route path="/solar/inland-empire-ca" component={InlandEmpirePage} />
        <Route path="/solar/irvine-ca" component={IrvinePage} />
        <Route path="/solar/la-habra-ca" component={LaHabraPage} />
        <Route path="/solar/lakewood-ca" component={LakewoodPage} />
        <Route path="/solar/lancaster-ca" component={LancasterPage} />
        <Route path="/solar/long-beach-ca" component={LongBeachPage} />
        <Route path="/solar/los-angeles-ca" component={LosAngelesPage} />
        <Route path="/solar/murrieta-ca" component={MurrietaPage} />
        <Route path="/solar/ontario-ca" component={OntarioPage} />
        <Route path="/solar/orange-ca" component={OrangePage} />
        <Route path="/solar/palmdale-ca" component={PalmdalePage} />
        <Route path="/solar/pomona-ca" component={PomonaPage} />
        <Route path="/solar/rancho-cucamonga-ca" component={RanchoCucamongaPage} />
        <Route path="/solar/riverside-ca" component={RiversidePage} />
        <Route path="/solar/san-bernardino-ca" component={SanBernardinoPage} />
        <Route path="/solar/santa-ana-ca" component={SantaAnaPage} />
        <Route path="/solar/temecula-ca" component={TemeculaPage} />
        <Route path="/solar/thousand-oaks-ca" component={ThousandOaksPage} />
        <Route path="/solar/torrance-ca" component={TorrancePage} />
        <Route path="/solar/ventura-ca" component={VenturaPage} />
        <Route path="/solar/:citySlug" component={ActiveTerritoryCity} />

        {/* Admin pages */}
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/photos" component={AdminPhotos} />
        <Route path="/admin/leads/:id" component={LeadDetail} />
        <Route path="/admin/unsubscribes" component={AdminUnsubscribes} />
        <Route path="/admin/chat" component={AdminChat} />
        <Route path="/admin/chat/:sessionId" component={AdminChat} />
        <Route path="/admin/chat-history" component={AdminChatHistory} />

        {/* 404 fallback */}
        <Route>
          <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "72px", fontWeight: 800, color: "#0f1f3d" }}>404</div>
              <div style={{ fontSize: "20px", color: "#666", marginBottom: "24px" }}>Page not found</div>
              <a href="/" style={{ background: "#FED44D", color: "#0f1f3d", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }}>Go Home</a>
            </div>
          </div>
        </Route>
      </Switch>
      <LiveChatWidget />
    </>
  );
}
