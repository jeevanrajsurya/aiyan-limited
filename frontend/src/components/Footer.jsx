import { Link } from 'react-router-dom';
import { Fuel, Phone, Mail, MapPin, Clock, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Footer({ settings }) {
  const general = settings?.general || {};

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-black text-xl">
                ⛽
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">S&B Petroleum</span>
                <p className="text-xs text-teal-400 font-semibold">Houston Forecourt & EV Charging Hub</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              Premier 24/7 multi-fuel service forecourt in Houston, TX. Dispensing Top Tier™ certified
              Regular, Plus, and Premium gasoline, Diesel #2, and 150kW ultra-rapid EV charging.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0a9396]" /> Top Tier™ Certified
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Station Details</h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0a9396] shrink-0 mt-0.5" />
                <span>
                  {general.address || '14205 Katy Freeway, Houston, TX'}<br />
                  <strong className="text-white font-mono">{general.postcode || '77079'}</strong>, USA
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0a9396] shrink-0" />
                <a href={`tel:${general.phone || '+12815550199'}`} className="text-white hover:text-[#f59e0b]">
                  {general.phone || '(281) 555-0199'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${general.email || 'info@aiyanlimited.com'}`} className="hover:text-teal-400">
                  {general.email || 'info@aiyanlimited.com'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-teal-300 font-semibold">{general.forecourtHours || 'Open 24 Hours / 7 Days'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aiyan Limited. All rights reserved. Registered in England & Wales.</p>
          <div className="flex items-center gap-6">
            <span>VAT Reg: {general.vatNumber || 'GB 384 9281 74'}</span>
            <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-400">Terms of Service</Link>
            <a href={import.meta.env.VITE_ADMIN_URL || '#'} className="text-teal-500 hover:text-teal-400 font-semibold">Staff Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
