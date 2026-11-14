import { Link } from 'wouter';
export default function FinancingOptions() {
  return <section className="py-16 bg-slate-50"><div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-extrabold text-[#0B1D51] mb-4">Compare the payment options for your home</h2>
    <p className="text-slate-600 mb-8 max-w-3xl">The right choice depends on your equipment, electricity use and priorities. Your written proposal will show the complete cost, any annual payment increase, coverage and what happens if you sell your home.</p>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {title:'Lease',copy:'Ask about a solar lease or a battery-only lease for your selected equipment. We explain available provider terms, monthly payments, annual increases and service coverage.',payment:'leasing'},
        {title:'Finance',copy:'Own the system with a loan. Compare the financed price, interest rate, fees, loan term and total payments against the cash price.',payment:'financing'},
        {title:'Cash purchase',copy:'Own the system without a monthly equipment payment. We will explain installation costs, equipment warranties and expected utility charges.',payment:'cash'},
      ].map(o=><article key={o.title} className="rounded-xl bg-white border border-slate-200 p-6"><h3 className="text-xl font-bold mb-3">{o.title}</h3><p className="text-slate-600 mb-6">{o.copy}</p><Link href={'/get-quote?payment='+o.payment} className="font-bold text-sky-700 underline">Compare this option →</Link></article>)}
    </div>
    <p className="text-sm text-slate-500 mt-6">Pricing, availability and approval depend on the project and provider. A solar payment does not necessarily eliminate your utility bill. Savings estimates depend on usage, rates and system performance.</p>
  </div></section>;
}
