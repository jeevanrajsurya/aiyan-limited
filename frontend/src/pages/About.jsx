import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Coffee,
  Tag,
  Zap,
  HeartHandshake,
  ShoppingBag,
  Sparkles,
  Truck,
  CreditCard,
  Trophy,
  Flame,
  Droplets,
  Wind,
  Gauge,
  Package,
  Fuel,
  Wrench,
  Gift,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Star,
  Check,
  Clock,
  Plus,
  Camera,
  ChevronDown,
} from 'lucide-react';
import { getAboutPageSettings, getCachedAboutSettings } from '../api/client';
import { fallbackAboutCms } from '../data/forecourtData';

// Map icon string names to Lucide icons
const ICON_MAP = {
  Coffee,
  Tag,
  Zap,
  HeartHandshake,
  ShoppingBag,
  Sparkles,
  Truck,
  CreditCard,
  Trophy,
  Flame,
  Droplets,
  Wind,
  Gauge,
  Package,
  Fuel,
  Wrench,
  Gift,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Star,
  Check,
  Clock,
  ChevronDown,
};

function renderIcon(iconName, className = 'w-5 h-5') {
  const IconComponent = ICON_MAP[iconName] || Sparkles;
  return <IconComponent className={className} />;
}

export default function About() {
  const [expandedProtocol, setExpandedProtocol] = useState(null);

  const { data: cmsData, isLoading } = useQuery({
    queryKey: ['about-page-cms'],
    queryFn: getAboutPageSettings,
    initialData: getCachedAboutSettings,
    initialDataUpdatedAt: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  });

  // Prevent flash of uninitialized/fallback layout on cold start before data or cache exists
  if (isLoading && !cmsData && !getCachedAboutSettings()) {
    return <div className="min-h-screen bg-white" />;
  }

  const cms = cmsData || getCachedAboutSettings() || fallbackAboutCms;

  // Fallback merges in case existing DB settings lack new keys
  const hero = { ...fallbackAboutCms.hero, ...(cms.hero || {}) };
  const story = { ...fallbackAboutCms.storySection, ...(cms.storySection || {}) };
  const featuresSec = { ...fallbackAboutCms.featuresSection, ...(cms.featuresSection || {}) };
  const gallery = {
    ...fallbackAboutCms.gallerySection,
    ...(cms.gallerySection || {}),
    images:
      Array.isArray(cms.gallerySection?.images) && cms.gallerySection.images.length > 0
        ? cms.gallerySection.images
        : fallbackAboutCms.gallerySection?.images || [],
  };
  const hygiene = {
    ...fallbackAboutCms.hygieneSection,
    ...(cms.hygieneSection || {}),
    protocols: Array.isArray(cms.hygieneSection?.protocols)
      ? cms.hygieneSection.protocols
      : fallbackAboutCms.hygieneSection.protocols,
  };

  const heroMediaUrl = (hero.bgMediaUrl || hero.bgImageUrl || '').trim();
  const isHeroVideo =
    hero.bgMediaType === 'video' ||
    /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(heroMediaUrl);
  const isWhiteText = (hero.textColor || 'white') !== 'dark';
  const overlayStyle = hero.overlayStyle || 'gradient';

  const line1 =
    (hero.headlineLine1 || hero.title || 'Every Journey Starts Here.').trim();
  const line2 =
    (hero.headlineLine2 || hero.subtitle || 'Fresh Food. Quality Fuel. Friendly Local Service.').trim();
  const ctaText =
    (hero.buttonText || hero.ctaPrimaryText || 'Our Community Story').trim();
  const ctaLink =
    (hero.buttonLink || hero.ctaPrimaryLink || '#story').trim();

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

  const storyMediaUrl = (story.imageUrl || story.mediaUrl || '').trim();
  const hasStoryMedia = Boolean(storyMediaUrl);
  const isStoryVideo =
    story.mediaType === 'video' ||
    /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(storyMediaUrl);

  const storyMediaWidth = story.mediaWidth || 'half';
  const leftColSpan =
    storyMediaWidth === 'wide'
      ? 'lg:col-span-7'
      : storyMediaWidth === 'compact'
      ? 'lg:col-span-5'
      : 'lg:col-span-6';
  const rightColSpan =
    storyMediaWidth === 'wide'
      ? 'lg:col-span-5'
      : storyMediaWidth === 'compact'
      ? 'lg:col-span-7'
      : 'lg:col-span-6';

  return (
    <div className="min-h-screen bg-white text-[#161616] font-gotham pb-16 sm:pb-24 overflow-hidden selection:bg-[#005f73] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO FORECOURT BANNER (Full-Width Viewport Height & Left-Aligned)        */}
      {/* ========================================================================= */}
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
          {overlayStyle === 'gradient' && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent pointer-events-none z-[1]" />
          )}
          {overlayStyle === 'dark' && (
            <div className="absolute inset-0 bg-black/60 pointer-events-none z-[1]" />
          )}

          {/* Seamless White Fade to section below */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-[2]" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-[3]" />

          {/* Hero Content — Left Aligned */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28 flex flex-col items-start justify-center text-left space-y-6 sm:space-y-8">
            <div className="max-w-3xl space-y-3 sm:space-y-4">
              {line1 && (
                <h1
                  className={`font-gotham text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] ${
                    isWhiteText ? 'text-white drop-shadow-2xl' : 'text-[#161616] drop-shadow-sm'
                  }`}
                >
                  {renderHeadlineSpan(line1, 'Starts Here\\.?')}
                </h1>
              )}
              {line2 && (
                <p
                  className={`font-gotham text-base sm:text-xl md:text-2xl font-medium tracking-wide max-w-2xl ${
                    isWhiteText ? 'text-white/90 drop-shadow-lg' : 'text-[#161616]/90 drop-shadow-xs'
                  }`}
                >
                  {renderHeadlineSpan(line2, 'Friendly Local Service\\.?')}
                </p>
              )}
            </div>

            {/* CTA Pill Button */}
            {ctaText && (
              <div className="pt-2 sm:pt-4">
                <a
                  href={ctaLink || '#story'}
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

      {/* ========================================================================= */}
      {/* 2. OUR NEIGHBOURHOOD STORY & LONDIS HERITAGE                               */}
      {/* ========================================================================= */}
      {story.enabled !== false && (
        <section className="relative w-full py-14 sm:py-18 lg:py-22 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: High-Impact Media (50% Width) */}
              {hasStoryMedia && (
                <div className={`${leftColSpan} flex flex-col justify-center`}>
                  <div className="relative rounded-3xl overflow-hidden w-full h-[400px] sm:h-[480px] lg:h-[520px] shadow-[0_16px_36px_-8px_rgba(7,30,38,0.12)] border border-slate-200/90 group bg-slate-100">
                    {isStoryVideo ? (
                      <video
                        src={storyMediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={storyMediaUrl}
                        alt={story.title || 'S&B Retail Forecourt'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Right Column: Narrative & Dynamic Highlights (50% Width) */}
              <div className={`${hasStoryMedia ? rightColSpan : 'lg:col-span-12'} flex flex-col justify-center items-start space-y-4 sm:space-y-5`}>
                {story.tagline && (
                  <div className="inline-flex items-center px-3 py-1 rounded-md bg-[#005f73]/8 border border-[#005f73]/15 text-[#005f73] font-founders font-bold text-xs uppercase tracking-widest">
                    <span>{story.tagline}</span>
                  </div>
                )}

                {story.title && (
                  <h2 className="font-founders text-2xl sm:text-4xl lg:text-[42px] font-black text-[#071e26] tracking-tight leading-[1.15]">
                    {story.title}
                  </h2>
                )}

                {story.description && (
                  <p className="font-gotham text-sm sm:text-base text-slate-600 leading-[1.75] whitespace-pre-line">
                    {story.description}
                  </p>
                )}

                {/* Dynamic Highlights Grid (Clean, Zero Underlines) */}
                {Array.isArray(story.highlights) && story.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 w-full">
                    {story.highlights.map((item, idx) => {
                      const IconComp = ICON_MAP[item.icon] || Clock;
                      return (
                        <div
                          key={item.id || idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-[#005f73]/30 hover:bg-[#005f73]/5 transition-all shadow-xs"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#005f73]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <IconComp className="w-4 h-4 text-[#005f73]" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-founders font-bold text-sm text-[#071e26] leading-snug">
                              {item.title}
                            </h4>
                            {item.desc && (
                              <p className="font-gotham text-xs text-slate-500 mt-0.5 leading-relaxed">
                                {item.desc}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Action & Address Row */}
                {(story.buttonText || story.addressText) && (
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    {story.buttonText && (
                      <Link
                        to={story.buttonLink || '/contact'}
                        className="inline-flex items-center gap-2.5 bg-[#005f73] hover:bg-[#071e26] text-white font-founders font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-md shadow-[#005f73]/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        <span>{story.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                    {story.addressText && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-gotham text-slate-500">
                        <MapPin className="w-4 h-4 text-[#005f73] shrink-0" />
                        <span>{story.addressText}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. THE 7 PILLARS OF CONVENIENCE (Clean Architectural Cards & Vectors)     */}
      {/* ========================================================================= */}
      {featuresSec.enabled !== false && (
        <section id="features" className="relative w-full py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
          {/* Subtle Micro-Dot Matrix Canvas Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          {/* Architectural Vector Elements (Inspired by Reference) */}
          {/* Left Radar Concentric Rings */}
          <div className="absolute top-1/3 -left-16 sm:-left-8 lg:left-4 -translate-y-1/2 w-72 sm:w-80 h-72 sm:h-80 pointer-events-none opacity-35 z-0">
            <svg viewBox="0 0 300 300" className="w-full h-full text-slate-400">
              <circle cx="150" cy="150" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="150" cy="150" r="105" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="150" cy="150" r="70" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="150" cy="150" r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="150" cy="150" r="6" fill="#005f73" />
              <circle cx="150" cy="150" r="2" fill="#ffffff" />
              {/* Connector Vector line to node */}
              <path d="M 150 150 L 280 150 L 280 90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="280" cy="90" r="4" fill="#005f73" />
            </svg>
          </div>

          {/* Right Radar Concentric Rings */}
          <div className="absolute bottom-10 -right-16 sm:-right-8 lg:right-4 w-72 sm:w-88 h-72 sm:h-88 pointer-events-none opacity-35 z-0">
            <svg viewBox="0 0 320 320" className="w-full h-full text-emerald-600/40">
              <circle cx="160" cy="160" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="160" cy="160" r="110" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="160" cy="160" r="75" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="160" cy="160" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="160" cy="160" r="6" fill="#0a9396" />
              <circle cx="160" cy="160" r="2" fill="#ffffff" />
              {/* Connector Vector line to node */}
              <path d="M 160 160 L 40 160 L 40 90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="40" cy="90" r="4" fill="#0a9396" />
            </svg>
          </div>

          {/* Top Architectural Dashed Connecting Vector */}
          <div className="absolute top-12 sm:top-14 left-1/2 -translate-x-1/2 w-full max-w-5xl h-20 pointer-events-none opacity-30 hidden md:block z-0">
            <svg viewBox="0 0 1000 80" className="w-full h-full text-slate-400">
              <path d="M 100 40 L 380 40 L 430 15 L 570 15 L 620 40 L 900 40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="40" r="3.5" fill="#005f73" />
              <circle cx="430" cy="15" r="3.5" fill="#005f73" />
              <circle cx="570" cy="15" r="3.5" fill="#005f73" />
              <circle cx="900" cy="40" r="3.5" fill="#005f73" />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              {featuresSec.tagline && (
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#005f73]/8 border border-[#005f73]/20 text-[#005f73] font-founders font-bold text-xs uppercase tracking-widest mb-3 shadow-2xs">
                  <span>{featuresSec.tagline}</span>
                </div>
              )}
              {featuresSec.title && (
                <h2 className="font-founders text-3xl sm:text-4xl lg:text-[44px] font-black text-[#071e26] tracking-tight leading-[1.12]">
                  {featuresSec.title}
                </h2>
              )}
              {featuresSec.subtitle && (
                <p className="font-gotham text-sm sm:text-base text-slate-600 leading-relaxed mt-3 max-w-2xl mx-auto">
                  {featuresSec.subtitle}
                </p>
              )}
            </div>

            {/* Symmetrical 12-Column Architectural Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-7">
              {featuresSec.features?.map((feat, idx) => {
                const total = featuresSec.features.length;
                let colSpan = 'lg:col-span-4 md:col-span-1';

                // 7 items: Row 1 has 3 cards (4+4+4=12), Row 2 has 4 cards (3+3+3+3=12)
                if (total === 7) {
                  colSpan = idx < 3 ? 'lg:col-span-4 md:col-span-1' : 'lg:col-span-3 md:col-span-1';
                } else if (total === 6) {
                  colSpan = 'lg:col-span-4 md:col-span-1';
                } else if (total === 5) {
                  colSpan = idx < 2 ? 'lg:col-span-6 md:col-span-1' : 'lg:col-span-4 md:col-span-1';
                }

                return (
                  <div
                    key={feat.id || `feat-${idx}`}
                    className={`group relative rounded-3xl p-6 sm:p-7 bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(7,30,38,0.06)] hover:shadow-[0_20px_45px_-12px_rgba(0,95,115,0.18)] hover:border-[#005f73]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-start overflow-hidden ${colSpan}`}
                  >
                    {/* Top Brand Accent Micro-Stripe */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#005f73] via-[#0a9396] to-[#f59e0b] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Reference Double Quote Mark Emblem */}
                    <span className="font-serif text-3xl sm:text-4xl text-[#005f73]/30 font-black leading-none select-none group-hover:text-[#005f73]/50 transition-colors mb-2">
                      “
                    </span>

                    {/* Pillar Title */}
                    <h3 className="font-founders text-lg sm:text-xl font-bold text-[#071e26] tracking-tight leading-snug group-hover:text-[#005f73] transition-colors mb-2.5">
                      {feat.title}
                    </h3>

                    {/* Description */}
                    <p className="font-gotham text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. FULL-WIDTH 3-PANEL FORECOURT & STOREFRONT SHOWCASE                      */}
      {/* ========================================================================= */}
      {gallery.enabled !== false && (
        <section className="relative w-full bg-white overflow-hidden">
          {/* Full-Width 3-Image Triptych Grid */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-slate-200/80 bg-slate-950 overflow-hidden shadow-md">
              {(gallery.images || []).slice(0, 3).map((img, idx) => (
                <div
                  key={img.id || `gallery-img-${idx}`}
                  className="relative group h-[260px] sm:h-[320px] lg:h-[360px] xl:h-[400px] overflow-hidden bg-slate-900 md:border-r border-white/10 last:border-r-0"
                >
                  <img
                    src={img.url}
                    alt={img.alt || img.caption || `Forecourt View ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. OFFICIAL FOOD HYGIENE & SAFETY CHARTER (Dual-Column Inspection Ledger)  */}
      {/* ========================================================================= */}
      {hygiene.enabled !== false && (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
          {/* Subtle Ambient Depth Lighting */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-emerald-100/30 via-teal-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Centered Section Header */}
            {(hygiene.title || hygiene.subtitle) && (
              <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                {hygiene.title && (
                  <h2 className="font-founders text-3xl sm:text-4xl lg:text-[44px] font-black text-[#161616] tracking-tight leading-[1.15]">
                    {hygiene.title}
                  </h2>
                )}

                {hygiene.subtitle && (
                  <p className="mt-3.5 font-gotham text-base sm:text-lg font-semibold text-emerald-900 leading-snug">
                    {hygiene.subtitle}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Clean Showcase Image on Top & Description Below */}
              <div className="lg:col-span-5 space-y-5">
                {/* Hygiene Showcase Image (Uploadable / Dynamic via Admin CMS) */}
                {hygiene.imageUrl && (
                  <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5 border border-slate-200/90 group">
                    <img
                      src={hygiene.imageUrl}
                      alt={hygiene.title || 'Food Hygiene & Safety'}
                      className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {hygiene.description && (
                  <p className="font-gotham text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hygiene.description}
                  </p>
                )}
              </div>

              {/* Right Column: Clean Operating Protocols Specification Stack */}
              <div className="lg:col-span-7">
                {/* Self-Contained Interactive Specification Cards (Accordion with Dark ChevronDown) */}
                <div className="space-y-3 sm:space-y-3.5">
                  {(hygiene.protocols || fallbackAboutCms.hygieneSection.protocols || []).map((protocol, idx) => {
                    const isExpanded = expandedProtocol === idx;

                    return (
                      <div
                        key={protocol.id || idx}
                        className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${
                          isExpanded
                            ? 'border-emerald-500/60 shadow-[0_8px_30px_-6px_rgba(0,95,115,0.12)] bg-gradient-to-r from-emerald-50/15 via-white to-white'
                            : 'border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                        }`}
                      >
                        {/* Interactive Header Bar: Click to Toggle */}
                        <button
                          type="button"
                          onClick={() => setExpandedProtocol(isExpanded ? null : idx)}
                          className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3.5 text-left cursor-pointer select-none group"
                        >
                          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                            {/* Step Tile with CMS Icon */}
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors border shadow-xs ${
                                isExpanded
                                  ? 'bg-[#005f73] text-white border-[#005f73]'
                                  : 'bg-slate-100 text-slate-700 border-slate-200/70 group-hover:bg-[#005f73]/10 group-hover:text-[#005f73]'
                              }`}
                            >
                              {protocol.icon ? (
                                renderIcon(protocol.icon, `w-5 h-5 transition-colors ${isExpanded ? 'text-white' : 'text-slate-700'}`)
                              ) : (
                                <span className="font-founders font-black text-sm">{String(idx + 1).padStart(2, '0')}</span>
                              )}
                            </div>

                            {/* Protocol Title */}
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <h3
                                className={`font-founders text-base sm:text-lg font-bold transition-colors leading-snug truncate sm:whitespace-normal ${
                                  isExpanded ? 'text-[#005f73]' : 'text-[#161616] group-hover:text-[#005f73]'
                                }`}
                              >
                                {protocol.title}
                              </h3>
                            </div>
                          </div>

                          {/* Right: Tag & Dark Animated Chevron Button */}
                          <div className="flex items-center gap-2.5 shrink-0">
                            {protocol.tag && (
                              <span className="hidden md:inline-block text-[10px] font-bold font-founders uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-md">
                                {protocol.tag}
                              </span>
                            )}
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs ${
                                isExpanded
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-slate-800 text-white group-hover:bg-[#005f73]'
                              }`}
                              title={isExpanded ? 'Collapse' : 'Expand'}
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-300 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </div>
                        </button>

                        {/* Expandable Content (Zero Inner Underline) */}
                        <div
                          className={`transition-all duration-300 ease-in-out px-4 sm:px-4.5 overflow-hidden ${
                            isExpanded
                              ? 'max-h-96 pb-4 sm:pb-5 opacity-100 pt-1'
                              : 'max-h-0 pb-0 opacity-0 pointer-events-none'
                          }`}
                        >
                          <div className="pl-0 sm:pl-14 space-y-2.5">
                            {protocol.tag && (
                              <div className="md:hidden pb-0.5">
                                <span className="text-[10px] font-bold font-founders uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-md">
                                  {protocol.tag}
                                </span>
                              </div>
                            )}

                            {protocol.desc && (
                              <p className="font-gotham text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {protocol.desc}
                              </p>
                            )}

                            {protocol.status && (
                              <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-emerald-800">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{protocol.status}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
