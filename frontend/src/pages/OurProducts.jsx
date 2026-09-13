import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sparkles } from 'lucide-react';
import { getOurProductsPageSettings, getCachedOurProductsSettings } from '../api/client';
import { fallbackOurProductsCms } from '../data/ourProductsData';

export default function OurProducts() {
  const { data: cmsData, isLoading } = useQuery({
    queryKey: ['our-products-cms'],
    queryFn: getOurProductsPageSettings,
    initialData: getCachedOurProductsSettings,
    initialDataUpdatedAt: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  // Prevent flash of uninitialized/fallback layout on cold start (no cache yet)
  if (isLoading && !cmsData) {
    return <div className="min-h-screen bg-white" />;
  }


  const rawCms = cmsData || fallbackOurProductsCms;
  const cms = typeof rawCms === 'string' ? (() => { try { return JSON.parse(rawCms); } catch(e) { return fallbackOurProductsCms; } })() : rawCms;
  const hub = cms?.hub || fallbackOurProductsCms.hub;
  const hero = hub.hero || {};
  const intro = hub.intro || {};
  const actionCards = Array.isArray(hub.actionCards) ? hub.actionCards : [];

  const heroMediaUrl = (hero.bgMediaUrl || '').trim();
  const isHeroVideo =
    hero.bgMediaType === 'video' ||
    /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(heroMediaUrl);
  const isWhiteText = (hero.textColor || 'white') !== 'dark';
  const overlayStyle = hero.overlayStyle || 'gradient';

  const line1 =
    (hero.headlineLine1 || hero.title || 'Quality You Can Taste & Trust.').trim();
  const line2 =
    (hero.headlineLine2 || hero.subtitle || 'Artisan Coffee, Fresh Bakery & Everyday Essentials.').trim();
  const ctaText =
    (hero.buttonText || hero.ctaPrimaryText || 'Explore In-Store Range').trim();
  const ctaLink =
    (hero.buttonLink || hero.ctaPrimaryLink || '#products').trim();

  // Helper to format Conoco/Homepage-style bold headline accent text
  const renderHeadlineSpan = (text, defaultHighlight) => {
    if (!text) return null;

    // 1. Support markdown bold **text** for custom highlights from admin
    if (/\*\*(.*?)\*\*/.test(text)) {
      const segments = text.split(/(\*\*.*?\*\*)/g);
      return (
        <>
          {segments.map((seg, i) => {
            if (seg.startsWith('**') && seg.endsWith('**')) {
              const inner = seg.slice(2, -2);
              return (
                <strong
                  key={i}
                  className={`font-black italic uppercase tracking-normal ${
                    isWhiteText ? 'text-amber-400' : 'text-[#005f73]'
                  }`}
                >
                  {inner}
                </strong>
              );
            }
            return seg;
          })}
        </>
      );
    }

    // 2. Default highlight matching
    if (defaultHighlight) {
      const parts = text.split(new RegExp(`(${defaultHighlight})`, 'i'));
      if (parts.length > 1) {
        return (
          <>
            {parts[0]}
            <strong
              className={`font-black italic uppercase tracking-normal ${
                isWhiteText ? 'text-amber-400' : 'text-[#005f73]'
              }`}
            >
              {parts[1]}
            </strong>
            {parts.slice(2).join('')}
          </>
        );
      }
    }

    return text;
  };

  return (
    <div className="min-h-screen bg-white text-[#161616] font-gotham pb-20 sm:pb-28">
      {/* 1. TOP PANORAMIC HERO BANNER - Full Width Edge-to-Edge & Viewport Height */}
      {hero.enabled !== false && (
        <section className="relative w-full min-h-screen h-screen flex items-center overflow-hidden bg-[#071e26] border-none">
          {/* Background Media: Video or High-Res Image (Full Bleed Edge-to-Edge) */}
          {heroMediaUrl ? (
            isHeroVideo ? (
              <video
                src={heroMediaUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
              />
            ) : !/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(heroMediaUrl) ? (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none scale-105"
                style={{ backgroundImage: `url(${heroMediaUrl})` }}
              />
            ) : null
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#071e26] via-[#005f73] to-[#071e26] z-0" />
          )}

          {/* Ambient Overlays based on CMS selection */}
          {overlayStyle === 'warm' && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-amber-600/20 z-[1] pointer-events-none" />
          )}
          {overlayStyle === 'gradient' && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-[1] pointer-events-none" />
          )}
          {overlayStyle === 'dark' && (
            <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />
          )}

          {/* Seamless Bottom Gradient Fade into White Content Below (Zero Hard Lines) */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-[2]" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-[3]" />

          {/* Hero Banner Content — Left-Aligned Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28 flex flex-col items-start justify-center text-left space-y-6 sm:space-y-8">
            {/* Optional badge */}
            {hero.badgeText && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-[#f59e0b] text-xs font-bold font-gotham uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>{hero.badgeText}</span>
              </div>
            )}

            <div className="max-w-3xl space-y-3 sm:space-y-4">
              {line1 && (
                <h1
                  className={`font-gotham text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] ${
                    isWhiteText ? 'text-white drop-shadow-2xl' : 'text-[#161616] drop-shadow-sm'
                  }`}
                >
                  {renderHeadlineSpan(line1, 'Taste & Trust\\.?')}
                </h1>
              )}

              {line2 && (
                <p
                  className={`font-gotham text-base sm:text-xl md:text-2xl font-medium tracking-wide max-w-2xl ${
                    isWhiteText ? 'text-white/90 drop-shadow-lg' : 'text-[#161616]/90 drop-shadow-xs'
                  }`}
                >
                  {renderHeadlineSpan(line2, 'Everyday Essentials\\.?')}
                </p>
              )}
            </div>

            {/* CTA Pill Button */}
            {ctaText && (
              <div className="pt-2 sm:pt-4">
                <a
                  href={ctaLink || '#products'}
                  className={`inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full font-gotham font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-2xl hover:scale-105 cursor-pointer ${
                    isWhiteText
                      ? 'border-2 border-white/80 bg-white/10 hover:bg-[#f59e0b] hover:border-[#f59e0b] hover:text-[#071e26] backdrop-blur-md text-white hover:shadow-amber-500/25'
                      : 'border-2 border-[#161616] bg-[#161616]/10 hover:bg-[#161616] hover:text-white text-[#161616]'
                  }`}
                >
                  <span>{ctaText}</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="w-4 h-4 stroke-current stroke-[2.5]"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.33331 7.99998L12.6666 7.99998M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Products Anchor */}
      <div id="products" className="scroll-mt-24" />

      {/* 2. CENTERED INTRO TYPOGRAPHY SECTION (Conditionally Rendered if populated in CMS) */}
      {intro.enabled !== false && (intro.headline || intro.body) && (
        <section className="max-w-[1040px] mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-16 sm:pb-12 text-center">
          {intro.headline && (
            <h2 className="font-founders text-2xl sm:text-3xl lg:text-[38px] font-black text-[#071e26] leading-tight tracking-tight max-w-4xl mx-auto">
              {intro.headline}
            </h2>
          )}

          {intro.body && (
            <p className="font-gotham text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto mt-4 whitespace-pre-line">
              {intro.body}
            </p>
          )}
        </section>
      )}

      {/* 3. UNIQUE IMAGE-ONLY SHOWCASE CARDS (Zero Text, Pure Image Canvas, Unique Styling) */}
      {hub.actionCardsEnabled !== false && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {actionCards.filter((card) => card.enabled !== false).length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-slate-500">
              <p className="text-base font-bold">No product feature cards currently available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {actionCards
                .filter((card) => card.enabled !== false)
                .map((card, idx) => {
                const hasCardImage = Boolean(card.imageUrl && card.imageUrl.trim());

                return (
                  <div
                    key={card.id || `card-${idx}`}
                    className="group relative rounded-[28px] overflow-hidden bg-white border border-slate-200/90 hover:border-[#005f73]/50 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_22px_45px_-8px_rgba(0,95,115,0.22)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
                  >
                    {/* Top Accent Precision Hairline Stripe (Illuminating Accent on Hover) */}
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#005f73] via-[#0a9396] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                    {/* 4 Architectural Precision Corner Accents */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/70 rounded-tl-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/70 rounded-tr-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/70 rounded-bl-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/70 rounded-br-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Pure Image Canvas (Zero Text Inside - 100% Visual Focus) */}
                    <div className="w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200">
                      {hasCardImage ? (
                        <img
                          src={card.imageUrl.trim()}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          loading="lazy"
                        />
                      ) : (
                        /* Clean Placeholder when no image is uploaded */
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                          <div className="w-14 h-14 rounded-2xl bg-white/80 border border-slate-200 shadow-sm flex items-center justify-center text-[#005f73] mb-2 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Product Card #{idx + 1}
                          </span>
                        </div>
                      )}

                      {/* Ambient Glassmorphism Hover Shimmer Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
