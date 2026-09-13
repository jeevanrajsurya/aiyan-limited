import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getCardsRewardsPageSettings, getCachedCardsRewardsSettings } from '../../api/client';
import { SafeImage } from '../../utils/imageHelper';
import { ArrowRight, ChevronRight, ShieldCheck, CreditCard } from 'lucide-react';

export default function CreditCardsPage() {
  const { data: cms } = useQuery({
    queryKey: ['cards-rewards-cms'],
    queryFn: getCardsRewardsPageSettings,
    initialData: getCachedCardsRewardsSettings,
  });

  const creditData = cms?.creditCards || {};
  const hero = creditData.hero || {};
  const cards = creditData.cards || [];

  return (
    <div className="bg-white min-h-screen text-[#161616] pb-24 sm:pb-32 font-sans selection:bg-[#005f73] selection:text-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-3">
        <nav className="flex items-center gap-2 font-gotham text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#005f73] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/cards-rewards" className="hover:text-[#005f73] transition-colors">Cards &amp; Rewards</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Credit Cards</span>
        </nav>
      </div>

      {/* 1. Hero Section matching Phillips 66 / Conoco Credit Cards (Converted to S&B Petrol & Diesel) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-16 sm:mb-24">
        <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-[#071e26] via-[#005f73] to-[#071e26] min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center shadow-lg border border-cyan-500/30">
          {/* Subtle brand glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071e26] via-[#005f73]/80 to-transparent z-10 pointer-events-none" />

          {/* Hero Content Grid */}
          <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-14 lg:p-20">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                <CreditCard className="w-4 h-4 text-[#d97706]" />
                <span className="text-white text-xs font-bold uppercase tracking-wider font-gotham">
                  Fuel &amp; Fleet Credit Solutions
                </span>
              </div>

              <h1 className="font-gotham text-4xl sm:text-5xl lg:text-[58px] font-black text-white tracking-tight leading-[1.05] drop-shadow-sm">
                {hero.headline || 'There’s a card for every car (and driver).'}
              </h1>

              {hero.subtitle && (
                <p className="font-gotham text-white/90 text-lg sm:text-xl font-normal leading-relaxed max-w-xl">
                  {hero.subtitle}
                </p>
              )}
            </div>

            {/* Right: Stacked Cards Visual */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative max-w-[420px] sm:max-w-[480px] w-full transform hover:scale-[1.02] transition-transform duration-500">
                <SafeImage
                  src={hero.bgMediaUrl || 'https://phillips66.widen.net/content/1ppdmpdyf8/jpeg/Hero%20Credit%20Card.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb'}
                  defaultFallback="https://phillips66.widen.net/content/1ppdmpdyf8/jpeg/Hero%20Credit%20Card.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb"
                  alt="Stacked S&B Retail Cards"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Alternating Split Cards Section matching Conoco style on #ebebef */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-20 sm:space-y-28 lg:space-y-36">
        {cards && cards.length > 0 ? (
          cards.map((card, idx) => {
            const isImageRight = card.imagePosition === 'right' || idx % 2 === 0;

            return (
              <div
                key={card.id || idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center"
              >
                {/* Media Column */}
                <div
                  className={`lg:col-span-6 flex justify-center ${
                    isImageRight ? 'order-1 lg:order-2' : 'order-1'
                  }`}
                >
                  <div className="w-full max-w-[540px] bg-white rounded-[24px] p-6 sm:p-12 shadow-sm border border-slate-200/60 flex items-center justify-center hover:shadow-md transition-shadow group">
                    <SafeImage
                      src={card.imageUrl}
                      defaultFallback="https://phillips66.widen.net/content/7pv15t7doa/png/new-cc-p66-card.png?position=c&color=ffffff00&quality=100&u=pqrmwb"
                      alt={card.title}
                      className="w-full max-h-[300px] sm:max-h-[360px] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isImageRight ? 'order-2 lg:order-1' : 'order-2'
                  }`}
                >
                  <h2 className="font-gotham text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#161616] tracking-tight leading-tight">
                    {card.title}
                  </h2>

                  <div className="space-y-4 font-gotham text-[16px] sm:text-[17px] text-[#2c2c2c] leading-relaxed">
                    {Array.isArray(card.paragraphs) ? (
                      card.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))
                    ) : (
                      <p>{card.body || card.description}</p>
                    )}
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    {card.primaryCta && card.primaryCta.label && (
                      <a
                        href={card.primaryCta.link || '#'}
                        target={card.primaryCta.link?.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white font-founders font-semibold text-[17px] sm:text-[18px] px-8 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
                      >
                        <span>{card.primaryCta.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}

                    {card.secondaryCta && card.secondaryCta.label && (
                      <a
                        href={card.secondaryCta.link || '#'}
                        target={card.secondaryCta.link?.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="border-2 border-[#161616] text-[#161616] hover:bg-[#161616] hover:text-white font-founders font-semibold text-[17px] sm:text-[18px] px-8 py-3 rounded-full inline-flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <span>{card.secondaryCta.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white rounded-[24px] p-8 border border-slate-200">
            <p className="text-slate-500 font-medium">No credit cards currently listed. You can add cards in the Admin CMS.</p>
          </div>
        )}
      </div>

      {/* Security & Benefits Footer Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-24">
        <div className="bg-white rounded-[24px] p-8 sm:p-12 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#005f73]/10 flex items-center justify-center text-[#005f73] shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-gotham font-bold text-xl text-[#161616]">Zero Fraud Liability &amp; EMV Chip Security</h3>
              <p className="font-gotham text-slate-600 text-sm mt-1">
                Every S&B Retail credit card comes with encrypted contactless pay, real-time purchase alerts, and comprehensive fraud protection.
              </p>
            </div>
          </div>
          <Link
            to="/cards-rewards"
            className="font-gotham text-sm font-bold text-[#005f73] hover:underline flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Back to All Cards &amp; Rewards</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
