import { Fuel, Zap, Sparkles, ShoppingBag, Flame, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export default function ForecourtServicesSection({ services = [], onOpenValetModal, onOpenFleetModal }) {
  const iconMap = {
    Fuel: Fuel,
    Zap: Zap,
    Sparkles: Sparkles,
    ShoppingBag: ShoppingBag,
    Flame: Flame,
  };

  return (
    <section id="forecourt-services" className="py-16 text-[#161616] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9fa] border border-[#005f73]/20 text-[#005f73] text-xs font-bold uppercase tracking-wider">
            Our Fuel & Forecourt Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#161616] tracking-tight">
            Premium Fuels, EV Ultra-Rapid Hub & Vehicle Care
          </h2>
          <p className="text-sm sm:text-base text-[#797979]">
            Certified high-performance fuels, 150kW ultra-rapid chargers, high-pressure foam jet wash bays, and convenience retail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const IconComponent = iconMap[srv.icon] || Fuel;
            const isEV = srv.category === 'EV_CHARGING';
            const isValet = srv.category === 'CAR_CARE';

            return (
              <div
                key={srv.id}
                id={isEV ? 'ev-hub' : undefined}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all flex flex-col justify-between hover:border-[#005f73]/40 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#f0f9fa] text-[#005f73] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {srv.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#ebebef] text-[#161616]">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-[#161616] mt-5 tracking-tight">{srv.name}</h3>
                  <p className="text-xs sm:text-sm text-[#797979] mt-2 leading-relaxed">{srv.summary}</p>

                  {srv.features && Array.isArray(srv.features) && (
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                      {srv.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#797979]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#005f73] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  {isValet ? (
                    <button
                      onClick={onOpenValetModal}
                      className="w-full py-2.5 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      Book Valet Slot <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : isEV ? (
                    <div className="text-center py-1 text-xs font-bold text-[#0a9396] bg-[#0a2e38] border border-[#0a9396]/30 rounded-xl">
                      ⚡ 2 Dedicated 150kW Bays Open 24/7
                    </div>
                  ) : (
                    <a
                      href="#location-hours"
                      className="inline-flex items-center text-xs font-bold text-[#005f73] hover:text-[#0a9396] gap-1 group-hover:translate-x-0.5 transition-all"
                    >
                      Visit Forecourt <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

