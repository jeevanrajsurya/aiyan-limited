import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Fuel, Phone, MapPin, Clock, Menu, X, Sparkles, CreditCard, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenValet, onOpenFleet, settings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const general = settings?.general || {};
  const notice = general?.noticeBanner || {};

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white font-sans">
      {/* Top Alert / Notice Ticker */}
      {notice.enabled !== false && notice.text && (
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white py-1.5 px-4 text-xs font-medium border-b border-teal-700/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="bg-teal-400 text-slate-950 text-[10px] font-black uppercase px-1.5 py-0.5 rounded tracking-wider shrink-0">
                {notice.badge || 'Live'}
              </span>
              <span className="truncate">{notice.text}</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-slate-300 text-[11px] shrink-0">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-teal-400" /> Forecourt 24/7
              </span>
              <a
                href={`tel:${general.emergencyPhone || '+447700900123'}`}
                className="flex items-center gap-1 hover:text-white text-teal-300 font-semibold"
              >
                <Phone className="w-3 h-3" /> {general.phone || '+44 191 536 7890'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            ⛽
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none">
                S&B Petroleum
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.5 rounded bg-[#0a2e38] text-[#94d2bd] text-[10px] font-bold border border-[#0a9396]/40">
                US Forecourt
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Houston 24/7 Petrol Fuel &amp; EV Hub
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
          <Link to="/" className={`hover:text-teal-400 transition-colors ${location.pathname === '/' ? 'text-teal-400' : ''}`}>
            Home
          </Link>
          <a href="#prices" className="hover:text-teal-400 transition-colors">
            Live Fuel Prices
          </a>
          <a href="#services" className="hover:text-teal-400 transition-colors">
            Forecourt & EV Hub
          </a>
          <a href="#store" className="hover:text-teal-400 transition-colors">
            Costa & Store
          </a>
          <a href="#fleet" className="hover:text-teal-400 transition-colors">
            B2B Fuel Cards
          </a>
          <Link to="/careers" className={`hover:text-teal-400 transition-colors ${location.pathname === '/careers' ? 'text-teal-400' : ''}`}>
            Careers
          </Link>
          <Link to="/contact" className={`hover:text-teal-400 transition-colors ${location.pathname === '/contact' ? 'text-teal-400' : ''}`}>
            Contact & Map
          </Link>
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenValet}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-teal-500/30 px-3.5 py-2 rounded-xl transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Book Valet Slot
          </button>
          <button
            onClick={onOpenFleet}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 px-4 py-2 rounded-xl shadow-lg shadow-teal-400/20 transition-all hover:shadow-teal-400/30"
          >
            <CreditCard className="w-3.5 h-3.5" /> Fleet Fuel Cards
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-6 py-6 space-y-4">
          <div className="space-y-3 font-semibold text-sm">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block text-slate-200 hover:text-teal-400">
              Home
            </Link>
            <a href="#prices" onClick={() => setMobileOpen(false)} className="block text-slate-200 hover:text-teal-400">
              Live Fuel Prices
            </a>
            <a href="#services" onClick={() => setMobileOpen(false)} className="block text-slate-200 hover:text-teal-400">
              Forecourt & EV Hub
            </a>
            <a href="#store" onClick={() => setMobileOpen(false)} className="block text-slate-200 hover:text-teal-400">
              Costa & Store Deals
            </a>
            <a href="#fleet" onClick={() => setMobileOpen(false)} className="block text-slate-200 hover:text-teal-400">
              B2B Fleet Accounts
            </a>
            <Link to="/careers" onClick={() => setMobileOpen(false)} className="block text-slate-200 hover:text-teal-400">
              Careers & Jobs
            </Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block text-slate-200 hover:text-teal-400">
              Find Forecourt & Contact
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenValet();
              }}
              className="w-full py-2.5 bg-slate-800 text-teal-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Book Jet Wash & Valet
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenFleet();
              }}
              className="w-full py-2.5 bg-teal-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <CreditCard className="w-3.5 h-3.5" /> Request Fleet Fuel Card
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
