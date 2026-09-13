import { Fuel, RefreshCw, Clock, CheckCircle2 } from 'lucide-react';

export default function LivePricesSection({ fuelPrices, lastUpdated }) {
  const fallbackPrices = [
    { gradeName: 'Unleaded E10 (95 Octane)', fuelType: 'Petrol', pricePence: 136.9, badge: 'Standard Grade' },
    { gradeName: 'Super Unleaded E5 (99 Octane)', fuelType: 'Petrol', pricePence: 148.9, badge: 'High Octane Performance' },
    { gradeName: 'Standard Diesel B7', fuelType: 'Diesel', pricePence: 141.9, badge: 'Enhanced Detergents' },
    { gradeName: 'Premium Diesel Ultra', fuelType: 'Diesel', pricePence: 152.9, badge: 'Maximum Engine Clean' },
    { gradeName: 'AdBlue on Pump', fuelType: 'Additives', pricePence: 78.9, badge: 'Fast Flow Nozzle' },
    { gradeName: 'Calor Autogas LPG', fuelType: 'LPG', pricePence: 86.9, badge: 'Eco Autogas' },
  ];

  const items = fuelPrices && fuelPrices.length ? fuelPrices : fallbackPrices;

  return (
    <section id="prices" className="py-16 sm:py-24 bg-[#161616] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a9396]/15 text-[#0a9396] text-xs font-bold border border-[#0a9396]/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0a9396] animate-pulse" />
              Live Forecourt Price Board
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Real-Time US Fuel Prices
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Transparent, competitive daily fuel prices per gallon at our Houston forecourt.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-black px-4 py-2 rounded-xl border border-slate-800 shrink-0">
            <RefreshCw className="w-3.5 h-3.5 text-[#0a9396]" />
            <span>Updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Live Today'}</span>
          </div>
        </div>

        {/* Digital LED Fuel Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((fuel, idx) => {
            const isDiesel = fuel.fuelType.toLowerCase().includes('diesel');
            const isLpg = fuel.fuelType.toLowerCase().includes('lpg');
            const isAdditive = fuel.fuelType.toLowerCase().includes('def') || fuel.fuelType.toLowerCase().includes('additives');

            return (
              <div
                key={idx}
                className="bg-[#212124] rounded-3xl p-6 border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between hover:border-[#0a9396]/50 transition-colors group"
              >
                {/* Top Grade Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-lg tracking-wider ${
                      isDiesel
                        ? 'bg-amber-400 text-slate-950 font-extrabold'
                        : isAdditive
                        ? 'bg-blue-500 text-white'
                        : isLpg
                        ? 'bg-teal-500 text-white'
                        : 'bg-[#0a2e38] text-[#94d2bd] border border-[#0a9396]/40'
                    }`}
                  >
                    {fuel.fuelType}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Top Tier™ Certified</span>
                </div>

                {/* Grade Name */}
                <h3 className="text-xl font-bold text-white mt-4 group-hover:text-[#0a9396] transition-colors">
                  {fuel.gradeName}
                </h3>

                {/* Digital LED Price Display */}
                <div className="my-6 p-4 rounded-2xl bg-black border border-slate-800 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">USD / Gallon</span>
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      <span className={`text-2xl mr-1 ${isDiesel ? 'text-amber-400' : 'text-[#0a9396]'}`}>$</span>
                      {Number(fuel.pricePence).toFixed(2)}
                      <span className="text-sm text-slate-400 font-normal ml-1">/gal</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Standard</span>
                    <span className="text-xs font-bold text-[#f59e0b]">
                      Top Tier™
                    </span>
                  </div>
                </div>

                {/* Bottom Badges */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-slate-300 font-medium">{fuel.badge || 'Standard Fuel'}</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready at Pump
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
