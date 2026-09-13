import { Fuel, ArrowUpRight, Zap, Sparkles } from 'lucide-react';

export default function FuelPriceBoard({ fuelPrices = [] }) {
  return (
    <div className="bg-[#161616] text-white rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#0a9396]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-[#0a9396] text-xs font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0a9396] animate-pulse" />
            Live US Forecourt Board • Houston Forecourt
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
            Real-Time Fuel &amp; Energy Totem
          </h3>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] text-white/50 uppercase tracking-widest block">Standard Verified</span>
          <span className="text-xs font-mono text-white/90 font-bold">Top Tier™ Certified Detergent</span>
        </div>
      </div>

      {/* Digital LED Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {fuelPrices.map((fuel) => {
          const isDiesel = fuel.fuelType?.toLowerCase().includes('diesel');
          const isAdditive = fuel.fuelType?.toLowerCase().includes('additives');

          return (
            <div
              key={fuel.id}
              className="bg-[#19242b] border border-white/10 hover:border-[#0a9396]/60 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      isDiesel
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
                        : isAdditive
                        ? 'bg-blue-950/60 text-blue-300 border border-blue-400/40'
                        : 'bg-[#0a2e38] text-[#94d2bd] border border-[#0a9396]/40'
                    }`}
                  >
                    {fuel.fuelType}
                  </span>
                  <span className="text-[10px] text-white/50 font-medium">{fuel.badge || 'Standard'}</span>
                </div>

                <h4 className="font-bold text-white text-sm mt-2 leading-snug line-clamp-1">
                  {fuel.gradeName}
                </h4>
              </div>

              {/* Digital LED Pricing Box */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-baseline justify-between font-mono">
                <div>
                  <span className={`text-xl font-bold mr-1 ${isDiesel ? 'text-amber-400' : 'text-[#0a9396]'}`}>$</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#ffffff] tracking-tight">
                    {Number(fuel.pricePence) > 10 ? (Number(fuel.pricePence) / 40).toFixed(2) : Number(fuel.pricePence).toFixed(2)}
                  </span>
                  <span className="text-[11px] text-white/50 align-top ml-0.5 font-sans">9/10</span>
                  <span className={`text-xs font-bold ml-1.5 font-sans ${isDiesel ? 'text-amber-400' : 'text-[#0a9396]'}`}>/gal</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-white/40 block font-sans">US Gallon</span>
                  <span className="text-xs font-bold text-white/80 font-sans">
                    Top Tier™ Certified
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EV Ultra-Rapid Highlight Bar */}
      <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-[#071e26] to-[#14232c] border border-[#0a9396]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-[#0a9396]/20 text-[#0a9396] flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
              150kW Dual Ultra-Rapid EV Charging Hub
            </h5>
            <p className="text-[11px] text-white/60">
              CCS &amp; CHAdeMO • Contactless Tap &amp; Charge • 100% Clean Renewable Energy
            </p>
          </div>
        </div>
        <a
          href="#forecourt-services"
          className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#005f73] hover:bg-[#071e26] px-3.5 py-1.5 rounded-xl transition-colors shrink-0 shadow-sm"
        >
          View Specs <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

