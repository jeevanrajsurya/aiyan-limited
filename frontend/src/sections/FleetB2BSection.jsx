import { CreditCard, FileSpreadsheet, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export default function FleetB2BSection({ onOpenFleet }) {
  return (
    <section id="fleet" className="py-20 bg-slate-950 text-white border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 border border-teal-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 text-teal-300 text-xs font-bold border border-teal-500/30">
              <CreditCard className="w-3.5 h-3.5" /> B2B Commercial Fleet Accounts
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Fuel Your Business Fleets with Tailored UK Commercial Accounts
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Serving local businesses, couriers, taxi operators, and logistics fleets across Tyne and Wear. Enjoy
              competitive bulk fuel rates, zero transaction fees, pin-protected multi-cards, and consolidated weekly VAT invoices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Zero annual or transaction card fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Weekly HMRC-compliant VAT invoices</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Dedicated commercial high-flow diesel & AdBlue</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Accepts Allstar, Keyfuels, UK Fuels & DKV</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <button
              onClick={onOpenFleet}
              className="w-full sm:w-auto px-8 py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-teal-400/20 hover:shadow-teal-400/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Apply for Fleet Fuel Account</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
