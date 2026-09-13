import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Smartphone,
  Gift,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  Sparkles,
  Percent,
  Coins,
  Truck,
} from 'lucide-react';

export default function Rewards({ onOpenFleet }) {
  const cards = [
    {
      id: 'consumer-card',
      title: 'Conoco® Consumer Credit Card',
      badge: 'Best for Everyday Motorists',
      badgeColor: 'bg-[#005f73]/10 text-[#005f73] border-[#005f73]/30',
      headlineSaving: 'Save 25¢ / Gallon',
      subSaving: 'For the first 60 days, then 5¢/gal every day',
      cardType: 'consumer',
      features: [
        'Save 25¢/gal for first 60 days from account opening',
        'Save 5¢/gal every day at Conoco, Phillips 66® and 76® stations',
        'No annual fee & zero fraud liability guarantee',
        'Contactless RFID tap-to-pay + digital mobile wallet sync',
        'Stackable with KickBack® Points for even higher savings',
      ],
      ctaText: 'Apply for Conoco Card',
      isPrimary: true,
    },
    {
      id: 'fuel-forward',
      title: 'Fuel Forward® Mobile App',
      badge: 'Digital Contactless Fueling',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      headlineSaving: 'Pay at Pump via Phone',
      subSaving: 'Unlock instant mobile member coupons & double points',
      cardType: 'app',
      features: [
        'Authorize and pay for fuel from the comfort of your car',
        'Real-time fuel price station locator with turn-by-turn navigation',
        'Track all fuel savings and digital itemized receipts',
        'Receive exclusive in-store snack and beverage digital coupons',
        'Apple Pay, Google Pay, PayPal & Conoco Card integration',
      ],
      ctaText: 'Download Fuel Forward App',
      isPrimary: false,
    },
    {
      id: 'kickback',
      title: 'KickBack® Points Loyalty Program',
      badge: 'Points Spend Like Cash',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      headlineSaving: 'Earn on Every Dollar',
      subSaving: '1 Point = 1 Cent at the pump and inside the store',
      cardType: 'kickback',
      features: [
        'Free to pick up at the cash register or link digitally',
        'Earn points on fuel gallons and convenience store snacks',
        'Spend points like real cash on gas, coffee, car washes, or food',
        'Automatic entry into exclusive national customer sweepstakes',
        'Points never expire for active registered cardholders',
      ],
      ctaText: 'Register KickBack Card',
      isPrimary: false,
    },
    {
      id: 'commercial-fleet',
      title: 'Commercial Fleet Fuel Card',
      badge: 'B2B Fleets & Contractors',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      headlineSaving: 'Up to 7¢ / Gallon Rebate',
      subSaving: 'Volume tiered monthly fuel invoice rebates',
      cardType: 'fleet',
      features: [
        'Tiered volume rebates up to 7¢ off every gallon pumped',
        'Level 3 itemized tax reporting (Driver ID, Odometer, Vehicle #)',
        'Custom purchasing rules (fuel-only lockouts, gallon limits)',
        'Accepted nationwide across Conoco, P66, 76 & WEX networks',
        'Dedicated 24/7 commercial B2B account support manager',
      ],
      ctaText: 'Apply for Fleet Account',
      isPrimary: false,
      onClick: onOpenFleet,
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Download Fuel Forward®',
      description: 'Get the free app on iOS App Store or Google Play Store in seconds.',
      icon: Smartphone,
    },
    {
      step: '02',
      title: 'Link Your Conoco Card',
      description: 'Add your Conoco Consumer Card or KickBack points to stack maximum savings.',
      icon: CreditCard,
    },
    {
      step: '03',
      title: 'Fuel Up & Save at Pump',
      description: 'Select your pump number in the app, unlock the nozzle, and watch the price drop!',
      icon: Sparkles,
    },
  ];

  return (
    <div className="bg-white space-y-12 pb-16">
      {/* 1. Hero Showcase: 3D Metallic Card & Value Prop (Conoco Image 1 Ref) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-[#161616] rounded-3xl sm:rounded-4xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#005f73]/30 border border-[#005f73]/60 text-white text-xs font-bold">
                <Percent className="w-3.5 h-3.5 text-[#94d2bd]" />
                Conoco Rewards &amp; Forecourt Savings
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Stack &amp; Save Every Time You Fill Up.
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                Combine the Conoco® Consumer Credit Card with the Fuel Forward® app and KickBack® points. Save 25¢/gal for the first 60 days, earn cash-back points in-store, and pay touch-free right from your driver's seat.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#card-options"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
                >
                  Explore Cards <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#how-it-works"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-sm border border-white/20 transition-all inline-flex items-center gap-2"
                >
                  How It Works
                </a>
              </div>
            </div>

            {/* Right 3D Metallic Card Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] aspect-[1.586/1] rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#071e26] via-[#005f73] to-[#d97706] shadow-2xl ring-1 ring-white/30 relative flex flex-col justify-between overflow-hidden transform hover:scale-105 transition-transform duration-300">
                {/* Diagonal Gloss Sheen */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 pointer-events-none" />

                {/* Top Row: Conoco Brand + Contactless Icon */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black text-xl sm:text-2xl tracking-tighter drop-shadow-md">
                      conoco
                    </span>
                    <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest bg-black/30 px-2 py-0.5 rounded-full">
                      Rewards
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M8.5 16.5a5 5 0 0 1 0-9" strokeLinecap="round" />
                    <path d="M12 19a8.5 8.5 0 0 0 0-14" strokeLinecap="round" />
                    <path d="M15.5 21.5a12 12 0 0 0 0-19" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Center: Metallic EMV Chip */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner border border-amber-500/60 flex items-center justify-center">
                    <div className="w-6 h-5 border border-amber-700/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                      <div className="border-r border-amber-800/40" />
                      <div />
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-white/90 bg-white/15 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/20">
                    SAVE 25¢ / GAL
                  </span>
                </div>

                {/* Bottom Row: Cardholder & Network Logo */}
                <div className="relative z-10 flex items-end justify-between text-white drop-shadow-sm">
                  <div className="space-y-0.5">
                    <p className="text-[9px] uppercase tracking-widest text-white/70 font-semibold">Forecourt Member</p>
                    <p className="font-mono text-xs sm:text-sm tracking-wider font-bold">•••• •••• •••• 5476</p>
                  </div>
                  <div className="flex -space-x-2 opacity-90">
                    <div className="w-6 h-6 rounded-full bg-white/90" />
                    <div className="w-6 h-6 rounded-full bg-amber-400/90" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. "How It Works" 3-Step Visual Breakdown */}
      <div id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#005f73] bg-[#005f73]/10 px-3.5 py-1 rounded-full border border-[#005f73]/20 inline-block">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#161616]">
            How to Stack Your Savings
          </h2>
          <p className="text-sm text-[#797979]">
            Saving on fuel and C-store favorites takes less than 2 minutes to set up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-[#c9c9c9]/60 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              <span className="text-5xl font-black text-[#ebebef] absolute top-4 right-4 select-none pointer-events-none">
                {s.step}
              </span>
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#005f73]/10 flex items-center justify-center text-[#005f73]">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#161616]">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[#797979] leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Comprehensive Cards Comparison Grid */}
      <div id="card-options" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#005f73] bg-[#005f73]/10 px-3.5 py-1 rounded-full border border-[#005f73]/20 inline-block">
            Choose Your Program
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#161616]">
            Find the Perfect Card For Your Drive
          </h2>
          <p className="text-sm text-[#797979]">
            Whether you are a solo commuter, a busy family, or managing a fleet of work trucks, we have a tailored rewards program for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all border ${
                card.isPrimary
                  ? 'bg-white border-[#005f73] shadow-xl ring-2 ring-[#005f73]/20'
                  : 'bg-white border-[#c9c9c9]/60 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                  {card.isPrimary && (
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#d97706] bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#161616]">{card.title}</h3>
                  <div className="mt-2 bg-[#ebebef]/60 rounded-2xl p-4">
                    <p className="text-2xl font-black text-[#005f73]">{card.headlineSaving}</p>
                    <p className="text-xs text-[#797979] font-medium mt-0.5">{card.subSaving}</p>
                  </div>
                </div>

                <div className="pt-2 space-y-2 border-t border-dashed border-[#ebebef]">
                  <p className="text-[11px] font-bold text-[#161616] uppercase tracking-wide">Key Program Benefits:</p>
                  {card.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#161616]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#005f73] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ebebef]">
                {card.onClick ? (
                  <button
                    onClick={card.onClick}
                    className="w-full py-3 rounded-full text-xs font-bold bg-[#071e26] hover:bg-[#005f73] text-white transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {card.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Starting application for ${card.title}. You will be redirected to the secure enrollment portal.`)}
                    className={`w-full py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                      card.isPrimary
                        ? 'bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white'
                        : 'bg-[#071e26] hover:bg-[#005f73] text-white'
                    }`}
                  >
                    {card.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. App Store & Google Play Download Banner (Conoco Image 2 Ref) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#161616] rounded-3xl sm:rounded-4xl p-8 sm:p-12 text-white border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold inline-block">
                Mobile Forecourt App
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
                Get Fuel Forward® on Your Phone
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Unlock pump dispensers touch-free, access exclusive mobile-only snack discounts, and track your total dollars saved. Available free for iOS and Android.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              {/* Apple App Store */}
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#232323] hover:bg-[#2c2c2c] border border-white/15 transition-all shadow-lg text-left"
              >
                <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .61-2.65 1.36-.58.67-1.09 1.74-.96 2.77 1 .08 2.08-.53 2.69-1.28z" />
                </svg>
                <div>
                  <p className="text-[10px] text-white/60 leading-none uppercase">Download on the</p>
                  <p className="text-xs font-bold text-white leading-tight mt-0.5">App Store</p>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#232323] hover:bg-[#2c2c2c] border border-white/15 transition-all shadow-lg text-left"
              >
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186a1.985 1.985 0 0 1-.61-1.436V3.25c0-.547.225-1.044.609-1.436zm11.233 11.234l2.563 2.563-12.796 7.39 10.233-9.953zm0-2.096L4.61 1.001l12.795 7.39-2.563 2.561zm1.488 1.488l3.413 1.971c.883.51.883 1.346 0 1.856l-3.413 1.971-2.316-2.316 2.316-2.482z" />
                </svg>
                <div>
                  <p className="text-[10px] text-white/60 leading-none uppercase">Get it on</p>
                  <p className="text-xs font-bold text-white leading-tight mt-0.5">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

