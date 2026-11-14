import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FinancingOptions from '@/components/FinancingOptions';
export default function SolarLease() {
  return <><Navbar/><main>
    <section className="bg-[#0B1D51] text-white pt-36 pb-20 px-6"><div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center"><div>
      <p className="text-[#FED44D] font-bold mb-4">SOLAR & BATTERY LEASE OPTIONS</p><h1 className="text-4xl md:text-5xl font-extrabold mb-6">A clear proposal. A payment you understand.</h1>
      <p className="text-lg text-slate-200 mb-8">Looking for solar panels, solar with a battery, or battery storage on its own? Choose your equipment first. Pell Solar will then explain the lease and purchase options available for that project.</p>
      <Link href="/get-quote?payment=leasing" className="inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold rounded-xl px-6 py-4">Get my lease estimate</Link>
    </div><img src="/manus-storage/solar-home-main-v2_0ad97127.jpg" alt="A home with rooftop solar panels" className="rounded-2xl w-full"/></div></section>
    <section className="max-w-5xl mx-auto py-16 px-6"><h2 className="text-3xl font-bold mb-6">What we’ll put in writing</h2><div className="grid sm:grid-cols-2 gap-6">
      {[['Your equipment','System size, battery capacity, installation scope and the loads your battery is designed to support.'],['Your payments','Initial monthly payment, any annual increase, term, upfront costs and estimated remaining utility charges.'],['Your coverage','Manufacturer warranties and the separate service or replacement coverage in the provider agreement, including exclusions.'],['Your choices later','Transfer requirements when you sell, purchase options where available, and end-of-term obligations.']].map(([title,copy])=><div key={title} className="p-6 border rounded-xl"><h3 className="font-bold text-lg mb-2">{title}</h3><p className="text-slate-600">{copy}</p></div>)}
      </div><p className="text-sm text-slate-500 mt-6">Lease coverage is separate from the equipment manufacturer’s warranty. We confirm current eligibility and provider terms for each proposal; no blanket tax incentive or savings amount is promised.</p>
    </section><FinancingOptions/>
  </main><Footer/></>;
}
