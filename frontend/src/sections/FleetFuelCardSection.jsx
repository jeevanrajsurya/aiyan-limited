import { CreditCard, ShieldCheck, FileCheck, Receipt, Truck, ArrowRight } from 'lucide-react';

export default function FleetFuelCardSection({ onOpenFleetModal }) {
  const benefits = [
    {
      title: 'Consolidated Weekly VAT Invoicing',
      desc: 'HMRC-compliant consolidated VAT invoices with line-item vehicle registrations to simplify tax returns.',
    },
    {
      title: 'Wholesale Commercial Fuel Pricing',
      desc: 'Tiered volume discounts on diesel, unleaded, and bulk AdBlue for commercial fleet operators.',
    },
    {
      title: 'Accepted Major Card Networks',
      desc: 'We accept and support Allstar, Keyfuels, UK Fuels, DKV, and S&B Dedicated Local Fleet Cards.',
    },
    {
      title: 'High-Flow Commercial Diesel Lanes',
      desc: 'High-speed fast dispensing nozzles designed for vans, light commercials, and HGVs to reduce driver downtime.',
    },
  ];

  return (
    <section id="fleet-cards" className="py-16 text-[#161616] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl sm:rounded-4xl p-8 sm:p-12 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9fa] border border-[#005f73]/20 text-[#005f73] text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5" /> B2B Commercial Fleet Accounts
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#161616] tracking-tight leading-tight">
                Streamline Your UK Business Fleet Fuel & Expense Management
              </h2>

              <p className="text-sm sm:text-base text-[#797979] leading-relaxed">
                Whether managing 2 delivery vans or a regional transport fleet across the North East, open a direct credit account with S&B Forecourt for zero cash transactions, driver cards, and weekly direct debit terms.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {benefits.map((b, i) => (
                  <div key={i} className="p-4 bg-[#ebebef]/50 rounded-2xl border border-slate-200/80 space-y-1">
                    <h4 className="font-bold text-[#161616] text-xs flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#005f73] shrink-0" />
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-[#797979] leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenFleetModal}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-teal-900/20 text-sm transition-all hover:scale-105 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" /> Apply for B2B Fuel Card Account
                </button>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="lg:col-span-5 bg-[#071e26] text-white p-6 sm:p-8 rounded-3xl border border-[#005f73]/30 shadow-xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-sans">
                <span className="font-bold text-white">Fleet Account Specs</span>
                <span className="text-[#f59e0b] font-bold text-xs">HMRC Approved</span>
              </div>

              <div className="space-y-3 text-slate-200">
                <div className="flex justify-between">
                  <span className="text-white/50 font-sans">Billing Cycle:</span>
                  <span className="text-white font-bold">Weekly / Bi-Weekly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 font-sans">Payment Method:</span>
                  <span className="text-white font-bold">BACS Direct Debit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 font-sans">Fuel Cards Issued:</span>
                  <span className="text-white font-bold">Vehicle Reg / Driver PIN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 font-sans">Network Accepted:</span>
                  <span className="text-[#0a9396] font-bold">Allstar, Keyfuels, UK Fuels</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 font-sans">Bulk AdBlue:</span>
                  <span className="text-white font-bold">Dedicated High-Flow Nozzle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

