import React from 'react';
import { ArrowRight, CreditCard, Gift, Award, Sparkles } from 'lucide-react';

export default function CardsRewardsSection({ onOpenFleetModal }) {
  return (
    <section id="cards-rewards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Floating Bento Card matching Conoco Reference */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
        {/* Left: Red Presentation Capsule with Realistic Credit Card */}
        <div className="w-full lg:w-auto flex-shrink-0 flex items-center justify-center">
          <div className="bg-gradient-to-br from-[#071e26] via-[#005f73] to-[#0a424e] rounded-2xl p-6 sm:p-8 flex items-center justify-center shadow-inner w-full sm:w-[360px] aspect-[1.5/1] border border-[#005f73]/40">
            {/* Metallic Credit Card Mockup */}
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2e] via-[#1a1a1c] to-[#0f0f11] rounded-xl p-4 sm:p-5 shadow-2xl border border-white/15 flex flex-col justify-between relative overflow-hidden text-white select-none">
              {/* Brushed metal sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Card Top Row: Chip & Contactless */}
              <div className="flex items-center justify-between z-10">
                {/* Metallic Gold Chip */}
                <div className="w-9 h-7 rounded bg-gradient-to-br from-[#e6ca65] via-[#d4af37] to-[#aa8010] border border-[#f5df88]/40 shadow-sm relative overflow-hidden flex items-center justify-center">
                  <div className="w-full h-[1px] bg-black/30" />
                  <div className="h-full w-[1px] bg-black/30 absolute" />
                </div>
                {/* Contactless Waves */}
                <div className="text-white/60 text-xs font-mono tracking-widest rotate-90">
                  ))))
                </div>
              </div>

              {/* Card Center: Conoco Oval Brand Badge */}
              <div className="my-auto text-center z-10 py-1">
                <div className="inline-flex items-center justify-center border-2 border-[#005f73] bg-white rounded-full px-4 py-1 shadow-md">
                  <span className="text-[#005f73] font-black text-lg tracking-tighter leading-none lowercase">
                    petrol
                  </span>
                  <span className="text-[#f59e0b] text-[8px] font-bold ml-0.5 -mt-1.5">®</span>
                </div>
              </div>

              {/* Card Bottom Row: Partner Badges & Network */}
              <div className="flex items-end justify-between text-[9px] z-10 pt-1">
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#005f73] text-white px-1 py-0.5 rounded text-[8px] font-black">
                    P66
                  </div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#f16639] text-[#003893] flex items-center justify-center text-[7px] font-black">
                    76
                  </div>
                  <span className="text-[9px] font-semibold text-white/70 tracking-wider">
                    S&B FORECOURT
                  </span>
                </div>
                <div className="border border-white/30 rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white/90">
                  Fleet Care
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Headline and Description */}
        <div className="flex-1 text-center lg:text-left space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#161616] tracking-tight">
            Cards & Rewards
          </h2>
          <p className="text-sm sm:text-base text-[#797979] leading-relaxed max-w-lg mx-auto lg:mx-0">
            Explore our suite of commercial fuel cards, everyday customer loyalty rewards, and forecourt vouchers designed to make the most of every single mile.
          </p>
        </div>

        {/* Right: Quick Action Links */}
        <div className="flex flex-col gap-4 sm:gap-5 w-full sm:w-auto text-left min-w-[220px]">
          <button
            onClick={onOpenFleetModal}
            className="group flex items-center justify-between sm:justify-start gap-3 text-base sm:text-lg font-bold text-[#161616] hover:text-[#005f73] transition-colors cursor-pointer py-1"
          >
            <span>Credit & Fleet Cards</span>
            <ArrowRight className="w-5 h-5 text-[#161616] group-hover:text-[#f59e0b] group-hover:translate-x-1.5 transition-all" />
          </button>

          <a
            href="#rewards-program"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#bento-app-showcase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center justify-between sm:justify-start gap-3 text-base sm:text-lg font-bold text-[#161616] hover:text-[#005f73] transition-colors cursor-pointer py-1"
          >
            <span>KickBack® Rewards</span>
            <ArrowRight className="w-5 h-5 text-[#161616] group-hover:text-[#f59e0b] group-hover:translate-x-1.5 transition-all" />
          </a>

          <a
            href="#convenience-store"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#convenience-store');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center justify-between sm:justify-start gap-3 text-base sm:text-lg font-bold text-[#161616] hover:text-[#005f73] transition-colors cursor-pointer py-1"
          >
            <span>Gift Cards & Vouchers</span>
            <ArrowRight className="w-5 h-5 text-[#161616] group-hover:text-[#f59e0b] group-hover:translate-x-1.5 transition-all" />
          </a>
        </div>
      </div>
    </section>
  );
}
