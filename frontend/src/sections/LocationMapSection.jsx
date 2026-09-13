import { MapPin, Navigation, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function LocationMapSection({ general }) {
  return (
    <section id="contact" className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#005f73] font-bold text-xs uppercase tracking-widest bg-[#f0f9fa] px-3 py-1 rounded-full border border-[#005f73]/20">
            Forecourt Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Find Us on Katy Freeway, Houston, TX
          </h2>
          <p className="text-sm text-slate-400">
            Conveniently located for motorists and commercial fleets traveling on I-10 Katy Freeway in Houston.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Station Details Card */}
          <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Forecourt Address</h3>
              <p className="text-sm text-slate-300 mt-2">
                {general?.address || '14205 Katy Freeway, Houston, TX'}
              </p>
              <div className="mt-2 inline-block font-mono font-bold bg-[#005f73] text-white px-3 py-1 rounded-lg text-sm">
                ZIP: {general?.postcode || '77079'}
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-5">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#0a9396]" />
                <span>Forecourt Fuel Pumps: <strong className="text-white">24/7 Pay-at-Pump</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#0a9396]" />
                <span>Convenience Store: <strong className="text-white">{general?.storeHours || 'Open 24/7 / 365 Days'}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0a9396]" />
                <span>Helpline: <strong className="text-white">{general?.phone || '(281) 555-0199'}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0a9396]" />
                <span>Email: <strong className="text-white">{general?.email || 'contact@sb-petrol.com'}</strong></span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(general?.address || '14205 Katy Freeway, Houston, TX 77079')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" /> Open in Google Maps
              </a>
            </div>
          </div>

          {/* Interactive Map Embed / Preview */}
          <div className="lg:col-span-2 bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl min-h-[350px] relative flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 bg-[#0a2e38] text-[#94d2bd] border border-[#0a9396]/40 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white">S&amp;B Petrol Katy Forecourt</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              14205 Katy Freeway, Houston, TX 77079, United States
            </p>
            <p className="text-xs text-[#f59e0b] font-semibold mt-3">
              ⚡ 150kW Ultra-Rapid EV Bays • ⛽ Top Tier™ Gasoline • ☕ Bean-to-Cup Coffee Bar
            </p>
            <a
              href="https://maps.google.com/?q=14205+Katy+Freeway,+Houston,+TX+77079"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5 text-[#0a9396]" /> Get GPS Route &amp; Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
