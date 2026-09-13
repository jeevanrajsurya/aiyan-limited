import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Coffee,
  ShoppingBag,
  Sparkles,
  Tag,
  Clock,
  CheckCircle2,
  Search,
  ArrowRight,
  Flame,
  ShieldCheck,
  Utensils,
  Wine,
  Car,
  CreditCard,
} from 'lucide-react';
import { getStorePromotions } from '../api/client';

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch live store promotions managed via Admin Dashboard
  const { data: promotions, isLoading: loadingPromos } = useQuery({
    queryKey: ['store-promotions'],
    queryFn: getStorePromotions,
  });

  const departments = [
    {
      id: 'coffee',
      category: 'COFFEE',
      title: 'Bean-to-Cup Coffee Bar',
      subtitle: '100% Arabica, Ground Fresh Per Cup',
      description:
        'Single-origin roasts, dark and medium roasts, French vanilla cappuccinos, iced brews, and gourmet creamers available 24/7.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      badge: 'Freshly Brewed 24/7',
      highlights: ['Automated bean-to-cup grinding', 'Iced and hot coffee options', 'Full syrup & creamer bar'],
    },
    {
      id: 'bakery',
      category: 'FOOD',
      title: 'Artisan Bakery & Warm Breakfast',
      subtitle: 'Baked Fresh In-Store Every Morning',
      description:
        'Flaky butter croissants, artisan muffins, glazed donuts, cinnamon swirls, and hot sausage egg burritos made for early morning drivers.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      badge: 'Morning Specials',
      highlights: ['Daily delivered pastry trays', 'Heated breakfast sandwiches', 'All-day breakfast warmer'],
    },
    {
      id: 'deli',
      category: 'FOOD',
      title: 'Fresh Deli & Grab-and-Go',
      subtitle: 'Hand-Crafted Subs, Crisp Salads & Bowls',
      description:
        'Ready-to-eat artisan subs on freshly baked baguettes, garden fresh chicken salads, crisp fruit parfaits, and protein packs.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      badge: 'Chef Prepared Daily',
      highlights: ['Made-from-scratch subs', 'Crisp fresh fruit bowls', 'High-protein fitness snacks'],
    },
    {
      id: 'drinks',
      category: 'BEVERAGES',
      title: 'Sub-Zero Beer Cave & Chilled Drinks',
      subtitle: 'Walk-In 28°F Chiller & 32+ Fountain Taps',
      description:
        'Step inside our sub-zero Beer Cave featuring craft IPAs, imported lagers, hard seltzers, plus energy drinks, teas, and crushed pellet ice fountains.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      badge: 'Sub-Zero Cold',
      highlights: ['28°F walk-in beer cave', 'Mega fountain drink fountain', 'Red Bull, Monster & Celsius'],
    },
    {
      id: 'snacks',
      category: 'SNACKS',
      title: 'Highway Road Snacks & Jerky Wall',
      subtitle: 'Fuel for Every Road Trip',
      description:
        'Artisan smoked beef jerky, gourmet kettle chips, roasted nuts, trail mixes, gourmet candy gummies, and chocolate treats.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80',
      badge: 'Road Trip Must-Haves',
      highlights: ['20+ artisan beef jerky varieties', 'Kettle-cooked potato chips', 'Mix & match snack packs'],
    },
    {
      id: 'travel',
      category: 'TRAVEL',
      title: 'Forecourt Care & Travel Gear',
      subtitle: 'Highway Road Essentials & Auto Fluids',
      description:
        'Synthetic motor oils, DEF jugs, all-season windshield wiper fluids, phone charging cords, sunglasses, and emergency roadside tools.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      badge: '24/7 Emergency Care',
      highlights: ['Full synthetic motor oils', '-20°F de-icer wiper fluid', 'Fast iPhone/USB-C chargers'],
    },
  ];

  const filteredDepartments = departments.filter((dept) => {
    const matchesCat = selectedCategory === 'ALL' || dept.category === selectedCategory;
    const matchesSearch =
      dept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white space-y-12 pb-16">
      {/* 1. High-Impact C-Store Photo Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl min-h-[460px] flex items-center bg-[#161616]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />

          <div className="relative z-10 p-8 sm:p-14 max-w-2xl text-white space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#005f73]/30 border border-[#005f73]/60 text-white text-xs font-bold">
              <ShoppingBag className="w-4 h-4 text-[#94d2bd]" />
              Our Products • S&B Conoco 24/7 Store
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Fresh Brewed. Daily Baked. Road Ready.
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Step inside for freshly ground 100% Arabica coffee, hot breakfast burritos, crisp deli subs, our sub-zero Beer Cave, and every road trip essential you need for the journey ahead.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Open 24/7 / 365 Days
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Apple Pay &amp; EBT Accepted
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dynamic Live Forecourt Store Promotions (Managed via Admin Panel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#005f73] bg-[#005f73]/10 px-3.5 py-1 rounded-full border border-[#005f73]/20 inline-block">
              Our Products &amp; Daily Savings
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#161616] mt-2">
              Featured In-Store Products, Deals &amp; Combos
            </h2>
          </div>
          <p className="text-xs text-[#797979]">
            Prices in USD ($) • Updated live from our store counter
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions?.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-3xl p-6 border border-[#c9c9c9]/60 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#797979] bg-[#ebebef] px-2.5 py-1 rounded-lg">
                    {promo.category || 'Special Deal'}
                  </span>
                  <span className="text-[11px] font-bold text-[#d97706] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
                    {promo.discountBadge || 'Save Today'}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#161616] group-hover:text-[#005f73] transition-colors leading-snug">
                  {promo.title}
                </h3>
                <p className="text-xs text-[#797979] leading-relaxed">{promo.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#ebebef] flex items-center justify-between">
                <span className="text-xl font-black text-[#161616]">{promo.priceText}</span>
                <span className="text-xs font-bold text-[#005f73] flex items-center gap-1">
                  In Store <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Category Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#c9c9c9]/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories Pill Bar */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: 'ALL', label: 'All Departments' },
              { id: 'COFFEE', label: 'Coffee & Drinks' },
              { id: 'FOOD', label: 'Deli & Bakery' },
              { id: 'BEVERAGES', label: 'Beer Cave & Soda' },
              { id: 'SNACKS', label: 'Snacks & Jerky' },
              { id: 'TRAVEL', label: 'Auto & Travel Care' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white shadow-md'
                    : 'bg-[#ebebef] text-[#161616] hover:bg-[#c9c9c9]/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#797979] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search store items, snacks, drinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[#c9c9c9] text-xs focus:outline-none focus:ring-2 focus:ring-[#005f73] bg-white text-[#161616]"
            />
          </div>
        </div>
      </div>

      {/* 4. Visual C-Store Departments Grid with High-Res Photos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#c9c9c9]/60 shadow-sm hover:shadow-xl transition-all flex flex-col group"
            >
              {/* Image Container with Badge */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={dept.image}
                  alt={dept.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-[#161616]/80 text-white backdrop-blur-sm border border-white/20">
                  {dept.badge}
                </span>
                <p className="absolute bottom-3 left-4 text-xs font-semibold text-white/90">
                  {dept.subtitle}
                </p>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#161616] group-hover:text-[#005f73] transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-[#797979] leading-relaxed">{dept.description}</p>
                </div>

                <div className="pt-3 border-t border-dashed border-[#ebebef] space-y-1.5">
                  {dept.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-[#161616]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#005f73] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Fuel Forward® Rewards Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#071e26] via-[#0d2a35] to-[#111827] rounded-3xl p-8 sm:p-12 text-white border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <span className="px-3 py-1 rounded-full bg-[#005f73]/40 border border-[#005f73]/60 text-[#94d2bd] text-xs font-bold inline-block">
                Loyalty &amp; Mobile Savings
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
                Scan Your App at Checkout &amp; Earn Double Points
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Connect your KickBack® points with the Fuel Forward® app. Earn points on every coffee, fountain drink, fresh deli sandwich, and fuel fill-up. Redeem points like cash directly inside the store.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                to="/rewards"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#92400e] text-white text-xs font-bold transition-all shadow-lg inline-flex items-center gap-2"
              >
                Explore Cards &amp; Rewards <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

