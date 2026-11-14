import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FinancingOptions from '@/components/FinancingOptions';
export default function Financing() {
  return <><Navbar/><main><section className="bg-[#0B1D51] text-white pt-36 pb-16 px-6"><div className="max-w-6xl mx-auto"><h1 className="text-4xl md:text-5xl font-extrabold mb-5">Solar and battery financing</h1><p className="text-lg text-slate-200 max-w-3xl">Start with the system your home needs. Then compare the cash price, loan and lease terms side by side.</p></div></section><FinancingOptions/></main><Footer/></>;
}
