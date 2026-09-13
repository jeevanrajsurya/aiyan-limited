import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getCardsRewardsPageSettings, getCachedCardsRewardsSettings } from '../../api/client';
import { SafeImage } from '../../utils/imageHelper';
import { ArrowRight, ChevronRight, Gift, Phone, Mail, Award, CheckCircle } from 'lucide-react';

export default function KickBackPage() {
  const { data: cms } = useQuery({
    queryKey: ['cards-rewards-cms'],
    queryFn: getCardsRewardsPageSettings,
    initialData: getCachedCardsRewardsSettings,
  });

  const kickbackData = cms?.kickback || {};
  const hero = kickbackData.hero || {};
  const howItWorks = kickbackData.howItWorks || { steps: [] };
  const cards = kickbackData.cards || [];
  const bottomBento = kickbackData.bottomBento || [];

  return (
    <div className="bg-white min-h-screen text-[#161616] pb-24 sm:pb-32 font-sans selection:bg-[#005f73] selection:text-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-3">
        <nav className="flex items-center gap-2 font-gotham text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#005f73] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/cards-rewards" className="hover:text-[#005f73] transition-colors">Cards &amp; Rewards</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">KickBack® Rewards</span>
        </nav>
      </div>

      {/* 1. Hero Section matching Image 3 (Phillips 66 / KickBack) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-16 sm:mb-24">
        <div className="relative rounded-[24px] overflow-hidden min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center shadow-lg border border-slate-300">
          {/* Background Image: Wallet & Card on Wood */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={hero.bgMediaUrl || 'https://phillips66.widen.net/content/sebzu6tx2p/jpeg/kickback-hero-01.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb'}
              defaultFallback="https://phillips66.widen.net/content/sebzu6tx2p/jpeg/kickback-hero-01.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb"
              alt="KickBack Rewards Points Card"
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
          </div>

          {/* Hero Content */}
          <div className="relative z-20 w-full max-w-3xl p-8 sm:p-14 lg:p-20 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#005f73] px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider font-gotham shadow-md">
              <Award className="w-4 h-4 text-[#d97706]" />
              <span>Official Loyalty Program</span>
            </div>

            <h1 className="font-gotham text-4xl sm:text-5xl lg:text-[58px] font-black text-white tracking-tight leading-[1.05] drop-shadow-md">
              {hero.headline || 'Treat yourself and your car'}
            </h1>

            <p className="font-gotham text-white/95 text-lg sm:text-xl font-normal leading-relaxed drop-shadow-sm">
              {hero.subtitle || 'With the KickBack® points card, You can earn points on typical purchases, then spend your points like cash at any of our participating locations.'}
            </p>

            {/* CTAs in S&B Petrol Blue */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {hero.primaryCta && (
                <a
                  href={hero.primaryCta.link || 'https://kickbackpoints.com/my-account/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white font-founders font-semibold text-[17px] sm:text-[18px] px-8 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all hover:scale-[1.02] shadow-lg cursor-pointer"
                >
                  <span>{hero.primaryCta.label || 'Register your card'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              {hero.secondaryCta && (
                <a
                  href={hero.secondaryCta.link || 'https://kickbackpoints.com/my-account/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 font-founders font-semibold text-[17px] sm:text-[18px] px-8 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all cursor-pointer"
                >
                  <span>{hero.secondaryCta.label || 'Manage account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. "How it works" 3-Card Bento Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-gotham text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#161616] tracking-tight">
            {howItWorks.headline || 'How it works'}
          </h2>
          <p className="font-gotham text-slate-600 text-base sm:text-lg mt-3">
            Earning and redeeming rewards with S&amp;B Retail is quick and automatic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {howItWorks.steps && howItWorks.steps.map((step, sIdx) => (
            <div
              key={sIdx}
              className="bg-gradient-to-br from-[#071e26] via-[#005f73] to-[#0a424e] text-white rounded-[24px] p-8 sm:p-10 shadow-md border border-cyan-500/30 flex flex-col justify-between min-h-[300px] hover:shadow-xl transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-gotham font-black text-4xl text-[#d97706]">
                    {step.number || `0${sIdx + 1}`}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#94d2bd]" />
                  </div>
                </div>

                <h3 className="font-gotham font-bold text-2xl mb-4 text-white">
                  {step.title}
                </h3>

                <p className="font-gotham text-white/90 text-[15px] sm:text-[16px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Alternating 50/50 Split Cards matching Phillips 66 on #ebebef */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-20 sm:space-y-28 lg:space-y-36 mb-24">
        {cards && cards.map((card, idx) => {
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
                <div className="w-full max-w-[540px] rounded-[24px] overflow-hidden shadow-sm border border-slate-300 group">
                  <SafeImage
                    src={card.imageUrl}
                    defaultFallback="https://phillips66.widen.net/content/thzariutom/jpeg/rewards-01.jpeg?keep=c&crop=yes&color=ffffffff&quality=54&u=mw5qdv"
                    alt={card.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
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

                {card.primaryCta && card.primaryCta.label && (
                  <div className="pt-2">
                    <a
                      href={card.primaryCta.link || '#'}
                      target={card.primaryCta.link?.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white font-founders font-semibold text-[17px] sm:text-[18px] px-8 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
                    >
                      <span>{card.primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom 2 Bento Cards (Manage Account & Support) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bottomBento && bottomBento.length > 0 ? (
            bottomBento.map((item, bIdx) => (
              <div
                key={bIdx}
                className="bg-white rounded-[24px] p-8 sm:p-12 shadow-sm border border-slate-200/80 flex flex-col justify-between min-h-[260px] hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-gotham font-bold text-2xl sm:text-3xl text-[#161616] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-gotham text-slate-600 text-base leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {item.phone && (
                    <div className="flex items-center gap-2.5 text-[#005f73] font-gotham font-bold text-lg mb-2">
                      <Phone className="w-5 h-5" />
                      <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a>
                    </div>
                  )}

                  {item.email && (
                    <div className="flex items-center gap-2.5 text-[#005f73] font-gotham font-bold text-base">
                      <Mail className="w-5 h-5" />
                      <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                    </div>
                  )}
                </div>

                {item.buttonText && item.buttonLink && (
                  <div className="pt-6">
                    <a
                      href={item.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white font-founders font-semibold text-[17px] px-8 py-3 rounded-full inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>{item.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-slate-500 font-medium">
              Manage account and support info available via Admin CMS.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
