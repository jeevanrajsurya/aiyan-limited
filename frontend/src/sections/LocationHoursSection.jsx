import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from 'lucide-react';

export default function LocationHoursSection({ settings }) {
  const general = settings?.general || {};
  const phone = general.phone || '(281) 555-0199';
  const email = general.email || 'contact@sb-conoco.com';
  const address = general.address || '14205 Katy Freeway, Houston, TX';
  const postcode = general.postcode || '77079';

  return (
    <section id="location-hours" className="py-16 text-[#161616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details & Times */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl sm:rounded-4xl border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9fa] border border-[#005f73]/20 text-[#005f73] text-xs font-bold uppercase tracking-wider">
                Forecourt Station Locator
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#161616] tracking-tight">
                Find Us in Houston, TX
              </h2>
              <p className="text-xs sm:text-sm text-[#797979] leading-relaxed">
                Conveniently located on Katy Freeway (I-10) with wide forecourt access lanes for passenger cars, trucks, and commercial fleet haulers.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3 p-4 bg-[#ebebef]/50 rounded-2xl border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-[#005f73] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#161616] text-sm">{address}</div>
                    <div className="font-mono text-[#005f73] font-bold text-sm mt-0.5">{postcode}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#ebebef]/50 rounded-2xl border border-slate-200/80">
                  <Phone className="w-5 h-5 text-[#005f73] shrink-0" />
                  <div>
                    <div className="text-[#797979] text-[11px]">Station Direct Telephone</div>
                    <a href={`tel:${phone}`} className="font-bold text-[#161616] text-sm hover:text-[#005f73] transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#ebebef]/50 rounded-2xl border border-slate-200/80">
                  <Mail className="w-5 h-5 text-[#005f73] shrink-0" />
                  <div>
                    <div className="text-[#797979] text-[11px]">Customer & Fleet Inquiries</div>
                    <a href={`mailto:${email}`} className="font-bold text-[#161616] text-sm hover:text-[#005f73] transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${postcode}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Navigation className="w-4 h-4" /> Open in Google Maps Navigation
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 bg-white rounded-3xl sm:rounded-4xl border border-slate-200/90 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-h-[420px] relative">
            <iframe
              title="Forecourt Location Map"
              src="https://maps.google.com/maps?q=14205%20Katy%20Freeway%20Houston%20TX%2077079&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[420px] border-0"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

