import { ShoppingBag, Coffee, Utensils, Sparkles, Tag } from 'lucide-react';

export default function ConvenienceStoreSection({ promotions = [] }) {
  return (
    <section id="convenience-store" className="py-16 text-[#161616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9fa] border border-[#005f73]/20 text-[#005f73] text-xs font-bold uppercase tracking-wider">
              <Coffee className="w-3.5 h-3.5" /> Costa Express & Food-to-Go
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#161616] tracking-tight">
              Fresh Costa Coffee, Bakery & Everyday Essentials
            </h2>
            <p className="text-sm sm:text-base text-[#797979] leading-relaxed">
              Step inside our modern forecourt convenience store. Whether grabbing a hot Costa barista coffee on your morning commute, a fresh meal deal for lunch, or chilled off-licence drinks, we have everything you need.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-[#161616]">
              <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-sm">☕ Costa Express Bar</div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-sm">🥖 Warm Fresh Bakery</div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-sm">🥪 £3.85 Meal Deals</div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-sm">🍷 Off-Licence & Beers</div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-sm">🏧 Free 24/7 ATM</div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-sm">🎟️ Lottery & PayPoint</div>
            </div>
          </div>

          {/* Store Hours Highlight Card */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl sm:rounded-4xl border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-[#161616] tracking-tight">Store Opening Hours</h3>
                <p className="text-xs text-[#797979]">Early morning coffee to late night groceries</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-[#d97706] text-xs font-bold">
                Open Daily
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-[#797979]">Monday - Saturday</span>
                <span className="font-bold text-[#161616]">06:00 - 23:00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-[#797979]">Sunday</span>
                <span className="font-bold text-[#161616]">07:00 - 22:30</span>
              </div>
              <div className="flex justify-between py-2 text-[#005f73] font-bold">
                <span>Fuel Pumps & EV Charging</span>
                <span>Open 24/7 All Year</span>
              </div>
            </div>
          </div>
        </div>

        {/* In-Store Featured Promotions */}
        <div id="store-promotions" className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-[#161616] flex items-center gap-2 tracking-tight">
              <Tag className="w-5 h-5 text-[#005f73]" /> Featured Forecourt Offers & Meal Deals
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promotions.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all flex flex-col justify-between hover:border-[#005f73]/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ebebef] text-[#161616] uppercase">
                      {p.category}
                    </span>
                    {p.discountBadge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-[#d97706]">
                        {p.discountBadge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-[#161616] text-base mt-3 leading-snug">{p.title}</h4>
                  <p className="text-xs text-[#797979] mt-1 leading-relaxed">{p.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-base font-black text-[#005f73]">{p.priceText}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

