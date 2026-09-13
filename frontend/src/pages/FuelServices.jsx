import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Fuel,
  Zap,
  Sparkles,
  ShieldCheck,
  Flame,
  Gauge,
  CheckCircle2,
  Clock,
  CreditCard,
  Truck,
  ArrowRight,
  Wind,
} from 'lucide-react';
import { getLiveFuelPrices, getForecourtServices } from '../api/client';
import { fallbackFuelPrices, fallbackServices } from '../data/forecourtData';
import FuelPriceBoard from '../components/FuelPriceBoard';

export default function FuelServices({ onOpenValet, onOpenFleet }) {
  const { data: fuelPrices } = useQuery({
    queryKey: ['live-fuel-prices'],
    queryFn: getLiveFuelPrices,
    initialData: () => fallbackFuelPrices,
  });

  const { data: services } = useQuery({
    queryKey: ['forecourt-services'],
    queryFn: () => getForecourtServices(),
    initialData: () => fallbackServices,
  });

  const fuelGrades = [
    {
      name: 'Regular Unleaded',
      octane: '87 Octane',
      badge: 'Top Tier™ Certified',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description:
        'Standard everyday performance formulation meeting strict Top Tier™ detergent standards. Protects intake valves from carbon deposits.',
      benefits: ['Optimized fuel economy', 'Prevents deposit buildup', 'Meets EPA compliance'],
      recommendedFor: 'Sedans, crossovers, family SUVs & daily commuters',
    },
    {
      name: 'Plus Midgrade',
      octane: '89 Octane',
      badge: 'Balanced Performance',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      description:
        'Mid-octane blend providing higher knock resistance and improved combustion timing for turbocharged and mid-compression engines.',
      benefits: ['Smooth engine acceleration', 'Enhanced knock resistance', 'Cleaner fuel injectors'],
      recommendedFor: 'Turbocharged crossovers, performance sedans, light trucks',
    },
    {
      name: 'Premium Unleaded',
      octane: '93 Octane',
      badge: '3X Detergent Power',
      badgeColor: 'bg-[#005f73]/10 text-[#005f73] border-[#005f73]/30',
      description:
        'Our flagship formulation with 3x the minimum detergent additive requirement. Restores lost horsepower and protects precision direct injectors.',
      benefits: ['Peak horsepower restoration', 'Maximum valve cleanliness', 'Prevents spark knock'],
      recommendedFor: 'Sports cars, luxury European models, towing trucks',
    },
    {
      name: 'Ultra-Low Sulfur Diesel',
      octane: 'Diesel #2',
      badge: 'High Cetane',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
      description:
        'Formulated with lubricity additives to safeguard modern high-pressure common rail (HPCR) injection pumps and particulate filters.',
      benefits: ['Winter anti-gel formulation', 'High cetane smooth starts', 'Protects fuel injectors'],
      recommendedFor: 'Heavy duty pickups, Sprinter vans, commercial fleet haulers',
    },
    {
      name: 'Diesel Exhaust Fluid (DEF)',
      octane: 'Bulk Island Pump',
      badge: 'API Certified',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      description:
        'High-purity urea solution dispensed directly at the commercial island. No messy jugs, fast flow rates, and automated shut-off.',
      benefits: ['Direct pump nozzle', 'ISO 22241 compliance', 'SCR system protection'],
      recommendedFor: 'Modern diesel pickups, commercial trucks & box vans',
    },
    {
      name: '150kW Ultra-Rapid EV Charging',
      octane: 'CCS & NACS',
      badge: '100% Clean Energy',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      description:
        'High-power DC fast charging bays delivering 20% to 80% state of charge in 20 minutes. Pay directly with credit card tap.',
      benefits: ['150 kW peak DC speed', 'Tesla NACS + CCS1 plugs', 'Covered canopy lighting'],
      recommendedFor: 'All modern battery electric vehicles (BEVs)',
    },
  ];

  const washPackages = [
    {
      name: 'Basic Express Wash',
      price: '$9',
      duration: '4 Mins',
      features: [
        'High-pressure underbody blast',
        'Contour pre-soak shampoo',
        'Wheel & rim blast rinse',
        'Spot-free reverse osmosis rinse',
        'High-velocity touchless dryer',
      ],
      highlight: false,
    },
    {
      name: 'Deluxe Tri-Color Wax',
      price: '$14',
      duration: '6 Mins',
      features: [
        'Everything in Basic Express',
        'Tri-Color conditioning foam polish',
        'Rust inhibitor undercarriage shield',
        'High-gloss Carnauba hot wax',
        'Tire shine chemical applicator',
      ],
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Ultimate Ceramic Shield',
      price: '$18',
      duration: '8 Mins',
      features: [
        'Everything in Deluxe Tri-Color',
        'Hydrophobic ceramic polymer sealant',
        'Bug & road grime dissolver cycle',
        'Deep wheel & brake dust scrubber',
        'Extended multi-pass dryer blast',
      ],
      highlight: false,
    },
  ];

  return (
    <div className="bg-white space-y-12 pb-16">
      {/* 1. Forecourt Hero Banner with High-Res Photo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl min-h-[460px] flex items-center bg-[#161616]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />

          <div className="relative z-10 p-8 sm:p-14 max-w-2xl text-white space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#005f73]/30 border border-[#005f73]/60 text-white text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#94d2bd]" />
              Top Tier™ Detergent Gasoline Forecourt
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Premium Fuel, EV Charging &amp; Forecourt Care.
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Engineered with advanced Top Tier™ cleaning detergents to maximize mileage, restore engine responsiveness, and keep fuel injectors running at factory peak. Open 24/7 with contactless pay-at-the-pump.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#grades"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                View Fuel Grades <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenValet}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-sm border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Book Car Wash
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Live Fuel Price Board Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FuelPriceBoard prices={fuelPrices} />
      </div>

      {/* 3. Comprehensive Fuel Grades Breakdown */}
      <div id="grades" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#005f73] bg-[#005f73]/10 px-3.5 py-1 rounded-full border border-[#005f73]/20 inline-block">
            Engineered For Performance
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#161616]">
            Every Drop Meets Top Tier™ Certification
          </h2>
          <p className="text-sm text-[#797979]">
            Conoco fuels contain 3 times more cleaning detergents than minimum EPA requirements, actively preventing deposit accumulation on vital engine valves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fuelGrades.map((grade, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#c9c9c9]/60 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-wider text-[#161616] uppercase bg-[#ebebef] px-3 py-1 rounded-lg">
                    {grade.octane}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${grade.badgeColor}`}>
                    {grade.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#161616]">{grade.name}</h3>
                  <p className="text-xs text-[#797979] mt-2 leading-relaxed">{grade.description}</p>
                </div>

                <div className="pt-2 border-t border-dashed border-[#ebebef] space-y-1.5">
                  <p className="text-[11px] font-bold text-[#161616] uppercase tracking-wide">Key Benefits:</p>
                  {grade.benefits.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-[#161616]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#005f73] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ebebef]">
                <p className="text-[11px] text-[#797979]">
                  <span className="font-semibold text-[#161616]">Recommended for: </span>
                  {grade.recommendedFor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Touchless Soft-Cloth Car Wash Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-[#161616] rounded-3xl sm:rounded-4xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Forecourt Auto Spa
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                  High-Pressure Touchless &amp; Soft-Cloth Car Wash
                </h2>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Protect your paint with ceramic polymer sealants, undercarriage rust inhibitors, and high-velocity spot-free drying. Open 06:00 AM - 10:00 PM daily.
                </p>
              </div>
              <button
                onClick={onOpenValet}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#92400e] text-white text-xs font-bold transition-all shadow-md shrink-0 inline-flex items-center gap-2 self-start sm:self-auto"
              >
                Book Custom Valet <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {washPackages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                    pkg.highlight
                      ? 'bg-gradient-to-br from-[#071e26] via-[#005f73] to-[#0a424e] text-white ring-4 ring-cyan-500/40 shadow-xl'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg">{pkg.name}</h4>
                      {pkg.badge && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#d97706] text-white font-bold px-2.5 py-0.5 rounded-full">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black">{pkg.price}</span>
                      <span className={`text-xs ${pkg.highlight ? 'text-white/80' : 'text-white/60'}`}>
                        / {pkg.duration}
                      </span>
                    </div>
                    <ul className="space-y-2 pt-2 border-t border-white/15">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              pkg.highlight ? 'text-cyan-300' : 'text-emerald-400'
                            }`}
                          />
                          <span className={pkg.highlight ? 'text-white/95' : 'text-white/80'}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={onOpenValet}
                    className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                      pkg.highlight
                        ? 'bg-gradient-to-r from-[#d97706] to-[#b45309] text-white hover:from-[#b45309] hover:to-[#92400e] shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    Select {pkg.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. 150kW Ultra-Rapid EV Charging Hub & B2B Commercial Islands */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* EV Charging Bento Card */}
          <div className="bg-white rounded-3xl p-8 border border-[#c9c9c9]/60 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                150kW DC Fast EV Hub
              </div>
              <h3 className="text-2xl font-black text-[#161616]">
                Charge to 80% in Under 20 Minutes
              </h3>
              <p className="text-xs sm:text-sm text-[#797979] leading-relaxed">
                Our dual high-speed charging bays are powered by 100% certified wind energy and feature universal CCS1 and Tesla NACS plugs. Tap any credit card or EV roaming card to charge instantly without subscriptions.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#ebebef]/60 p-3 rounded-xl text-center">
                  <p className="text-lg font-black text-[#161616]">150 kW</p>
                  <p className="text-[10px] text-[#797979] font-medium">Max Output</p>
                </div>
                <div className="bg-[#ebebef]/60 p-3 rounded-xl text-center">
                  <p className="text-lg font-black text-[#161616]">Dual Bay</p>
                  <p className="text-[10px] text-[#797979] font-medium">CCS &amp; NACS</p>
                </div>
                <div className="bg-[#ebebef]/60 p-3 rounded-xl text-center">
                  <p className="text-lg font-black text-[#161616]">$0.38</p>
                  <p className="text-[10px] text-[#797979] font-medium">Per kWh</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-44 border border-black/10 relative">
              <img
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80"
                alt="150kW EV Charging Station"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-semibold">
                Available 24/7 with LED illumination
              </div>
            </div>
          </div>

          {/* B2B Commercial Fleet Card & Island */}
          <div className="bg-white rounded-3xl p-8 border border-[#c9c9c9]/60 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005f73]/10 border border-[#005f73]/30 text-[#005f73] text-xs font-bold">
                <Truck className="w-3.5 h-3.5 text-[#005f73]" />
                Commercial Fleet Fuelling
              </div>
              <h3 className="text-2xl font-black text-[#161616]">
                High-Flow Diesel &amp; Satellite Islands
              </h3>
              <p className="text-xs sm:text-sm text-[#797979] leading-relaxed">
                Dedicated wide-turn lanes with 15' 6" overhead clearance, high-speed dual satellite diesel dispensers, and bulk Diesel Exhaust Fluid (DEF) on island. Save up to 7¢/gal with our Commercial Fleet Program.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#ebebef]/60 p-3 rounded-xl text-center">
                  <p className="text-lg font-black text-[#161616]">15' 6"</p>
                  <p className="text-[10px] text-[#797979] font-medium">Canopy Height</p>
                </div>
                <div className="bg-[#ebebef]/60 p-3 rounded-xl text-center">
                  <p className="text-lg font-black text-[#161616]">DEF Pump</p>
                  <p className="text-[10px] text-[#797979] font-medium">On Commercial Bay</p>
                </div>
                <div className="bg-[#ebebef]/60 p-3 rounded-xl text-center">
                  <p className="text-lg font-black text-[#161616]">Up to 7¢</p>
                  <p className="text-[10px] text-[#797979] font-medium">Rebate / Gallon</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-44 border border-black/10 relative">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                alt="Commercial Fleet Dispenser"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <button
                  onClick={onOpenFleet}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  Apply for Fleet Account <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Forecourt Amenities Strip: Propane, Air, Restrooms */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#ebebef]/80 rounded-3xl p-8 border border-[#c9c9c9]/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#005f73] shrink-0 border border-[#c9c9c9]/40">
                <Flame className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#161616] text-sm">20lb Propane Tank Swap</h4>
                <p className="text-xs text-[#797979] leading-relaxed">
                  Precision-filled Blue Rhino® propane cylinders ready for grills, patio heaters, and RVs. $19.99 exchange.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#005f73] shrink-0 border border-[#c9c9c9]/40">
                <Wind className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#161616] text-sm">Digital Air &amp; High-Suction Vacuums</h4>
                <p className="text-xs text-[#797979] leading-relaxed">
                  Calibrated digital tire air tower with automated target PSI shut-off, plus dual commercial suction bays.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#005f73] shrink-0 border border-[#c9c9c9]/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#161616] text-sm">Clean Restrooms Guarantee</h4>
                <p className="text-xs text-[#797979] leading-relaxed">
                  Restrooms inspected and sanitized hourly. Contactless soap, touch-free faucets, and baby changing stations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

