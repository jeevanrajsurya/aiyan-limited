import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getCardsRewardsPageSettings, getCachedCardsRewardsSettings } from '../../api/client';
import { SafeImage } from '../../utils/imageHelper';
import { ArrowRight, ChevronRight, Gift, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function GiftCardsPage() {
  const { data: cms } = useQuery({
    queryKey: ['cards-rewards-cms'],
    queryFn: getCardsRewardsPageSettings,
    initialData: getCachedCardsRewardsSettings,
  });

  const giftData = cms?.giftCards || {};
  const hero = giftData.hero || {};
  const features = giftData.features || [];

  return (
    <div className="bg-white min-h-screen text-[#161616] pb-24 sm:pb-32 font-sans selection:bg-[#005f73] selection:text-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-3">
        <nav className="flex items-center gap-2 font-gotham text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#005f73] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/cards-rewards" className="hover:text-[#005f73] transition-colors">Cards &amp; Rewards</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Gift Cards</span>
        </nav>
      </div>

      {/* 1. Hero Split Card matching Image 4 (Phillips 66 / Gift Cards) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-6 sm:py-12">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#005f73]/10 text-[#005f73] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-gotham">
              <Gift className="w-4 h-4" />
              <span>Perfect for Any Occasion</span>
            </div>

            <h1 className="font-gotham text-4xl sm:text-5xl lg:text-[62px] font-black text-[#161616] tracking-tight leading-[1.05]">
              {hero.headline || 'Gift Cards'}
            </h1>

            <p className="font-gotham text-[#2c2c2c] text-lg sm:text-[19px] leading-relaxed">
              {hero.body ||
                'S&B Retail gift cards make a perfect gift for your friends, family, and their cars. Available in denominations you set between $5 and $500, S&B Retail gift cards can be used to buy snacks at our convenience stores and quality fuel at any S&B pumps. Your friends, coworkers, clients and their cars will thank you for it.'}
            </p>

            {/* CTAs */}
            <div className="space-y-4 pt-4">
              {/* Primary Pill Button */}
              <div>
                <a
                  href={hero.primaryCta?.link || 'https://phillips66.ourgiftcards.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white font-founders font-semibold text-[18px] px-9 py-4 rounded-full inline-flex items-center gap-2.5 transition-all hover:scale-[1.02] shadow-md cursor-pointer"
                >
                  <span>{hero.primaryCta?.label || 'Buy now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Secondary / Tertiary Links with Arrows matching Conoco */}
              <div className="flex flex-wrap items-center gap-6 pt-2 font-gotham text-sm font-bold text-[#161616]">
                {hero.checkBalanceCta && (
                  <a
                    href={hero.checkBalanceCta.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#005f73] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{hero.checkBalanceCta.label || 'Check your balance'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                {hero.termsCta && (
                  <a
                    href={hero.termsCta.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#005f73] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{hero.termsCta.label || 'Terms and conditions'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Card Graphic Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[560px] bg-white rounded-[24px] p-6 sm:p-12 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow group flex items-center justify-center">
              <SafeImage
                src={hero.imageUrl || 'https://phillips66.widen.net/content/ka6jknjdl7/jpeg/SV2300164_Front%20%28002%29.jpeg?w=640&keep=c&crop=yes&color=cccccc&quality=80&u=u6q5cu'}
                defaultFallback="https://phillips66.widen.net/content/ka6jknjdl7/jpeg/SV2300164_Front%20%28002%29.jpeg?w=640&keep=c&crop=yes&color=cccccc&quality=80&u=u6q5cu"
                alt="S&B Retail Gift Card"
                className="w-full h-auto object-contain rounded-xl group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Benefits / Feature Bento Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-gotham text-3xl sm:text-4xl font-bold text-[#161616] tracking-tight">
            Why Choose S&amp;B Retail Gift Cards?
          </h2>
          <p className="font-gotham text-slate-600 text-base mt-2">
            The simplest, most practical gift for everyday drivers, commuting teams, and families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features && features.map((feat, fIdx) => (
            <div
              key={fIdx}
              className="bg-white rounded-[24px] p-8 sm:p-10 shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="font-gotham font-black text-3xl text-[#005f73] block mb-4">
                  {feat.number || `0${fIdx + 1}`}
                </span>
                <h3 className="font-gotham font-bold text-2xl text-[#161616] mb-3">
                  {feat.title}
                </h3>
                <p className="font-gotham text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Corporate & Bulk Orders Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="rounded-[24px] bg-gradient-to-r from-[#071e26] via-[#005f73] to-[#071e26] text-white p-8 sm:p-14 shadow-xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-gotham">
              <HeartHandshake className="w-4 h-4 text-[#d97706]" />
              <span>Corporate &amp; Bulk Orders</span>
            </div>
            <h3 className="font-gotham font-bold text-2xl sm:text-3xl">
              Rewarding Your Team or Commercial Drivers?
            </h3>
            <p className="font-gotham text-white/90 text-base leading-relaxed">
              Order bulk gift cards for corporate rewards, safety incentives, or client appreciation. Invoiced orders and custom digital delivery available.
            </p>
          </div>

          <Link
            to="/contact"
            className="bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#92400e] text-white font-founders font-semibold text-[17px] px-8 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all whitespace-nowrap shadow-md"
          >
            <span>Inquire for Bulk Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
