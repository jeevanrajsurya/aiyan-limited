import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { resolveImageUrl } from '../utils/imageHelper';

/**
 * Default Pinned Forecourt Cards matching the reference layout
 */
export const DEFAULT_PINNED_CARDS = [
  {
    id: 'pin-confectionery-shelf',
    image: '/uploads/1789126982124-670392333.png',
    order: 0,
    title: 'In-Store Confectionery & Sweet Shelf',
    enabled: true,
    buttonLink: '/our-products',
    buttonText: 'EXPLORE DETAILS',
    description: '',
  },
  {
    id: 'pin-race-fuels',
    image: '/uploads/1789126992479-582900206.jpeg',
    order: 1,
    title: 'Official Forecourt Fuel & Race Blends',
    enabled: true,
    buttonLink: '/our-products',
    buttonText: 'GET MOTOR FUELS',
    description:
      'Engineered for maximum throttle response and engine protection across high-mileage journeys, road trips, and everyday commutes.',
  },
  {
    id: 'pin-shell-tin',
    image: '/uploads/1789127013679-714811150.jpeg',
    order: 1,
    title: 'Take the Lead with Vintage Lubricants',
    enabled: true,
    buttonLink: '/our-products',
    buttonText: 'EXPLORE COLLECTIBLES',
    description:
      'Authentic collectible oil cans, Castrol pourers, and Shell Retinax tins curated directly from classic British service stations.',
  },
  {
    id: 'pin-forecourt-savings',
    image: '/uploads/1789127036933-552270613.jpeg',
    order: 2,
    title: 'Forecourt Pay: Shift Into Everyday Savings',
    enabled: true,
    buttonLink: '/our-products',
    buttonText: 'VIEW REWARDS',
    description:
      'Unlock instant price reductions per litre, Costa Express loyalty stamps, and special store combo discounts every time you fill up.',
  },
  {
    id: 'pin-norton-sign',
    image: '/uploads/1789127052571-753215907.jpeg',
    order: 3,
    title: 'Classic Motoring Enamel Signs & Badges',
    enabled: true,
    buttonLink: '/our-products',
    buttonText: 'DISCOVER RELICS',
    description:
      'Historic AA garage plaques, authentic petroleum roadside advertising, and museum-grade memorabilia spanning the golden era of motoring.',
  },
  {
    id: 'pin-convenience-store',
    image: '/uploads/1789127064890-527279591.jpeg',
    order: 4,
    title: 'Artisan Food & Chilled Beverages',
    enabled: true,
    buttonLink: '/our-products',
    buttonText: 'BROWSE IN-STORE',
    description:
      'Freshly prepared morning bakery, gourmet sandwiches, and chilled refreshment ready whenever you need a quick pit stop.',
  },
];

export default function PinnedProductsSection({ pinnedData }) {
  // If explicitly disabled in CMS, do not render
  if (pinnedData?.enabled === false) {
    return null;
  }

  // Section Headline & Description
  const title =
    typeof pinnedData?.title === 'string'
      ? pinnedData.title
      : 'You can be part of Fergus & Gibbs history.';
  const description =
    typeof pinnedData?.description === 'string'
      ? pinnedData.description
      : "Get in touch if you have rusty relics, tins, pourers, signs or old items for sale. We're always buying!";

  const hasTitle = Boolean(title && title.trim());
  const hasDescription = Boolean(description && description.trim());

  // Timing configuration
  const autoPlayEnabled = pinnedData?.autoPlayEnabled !== false;
  const autoPlayInterval =
    (typeof pinnedData?.autoPlayInterval === 'number'
      ? pinnedData.autoPlayInterval
      : 5) * 1000;

  // Active cards
  const rawCards =
    Array.isArray(pinnedData?.cards) && pinnedData.cards.length > 0
      ? pinnedData.cards
      : DEFAULT_PINNED_CARDS;

  const activeCards = useMemo(() => {
    const list = rawCards.filter((c) => c?.enabled !== false);
    return list.length > 0 ? list : DEFAULT_PINNED_CARDS;
  }, [rawCards]);

  const uniqueCount = activeCards.length;

  // Build virtual pool for seamless infinite looping without visible wrap jumps
  const virtualPool = useMemo(() => {
    if (uniqueCount >= 5) {
      return activeCards.map((c, idx) => ({ ...c, poolKey: `${c.id || idx}-0`, originalIndex: idx }));
    }
    const repetitions = uniqueCount <= 2 ? 4 : 2;
    const pool = [];
    for (let r = 0; r < repetitions; r++) {
      activeCards.forEach((c, idx) => {
        pool.push({
          ...c,
          poolKey: `${c.id || idx}-rep-${r}`,
          originalIndex: idx,
        });
      });
    }
    return pool;
  }, [activeCards, uniqueCount]);

  const poolLength = virtualPool.length;

  // Carousel State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const isPointerDown = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchIntent = useRef(null); // null | 'vertical' | 'horizontal'
  const isTouchActive = useRef(false);

  // Auto-play timer
  useEffect(() => {
    if (!autoPlayEnabled || isHovered || isDragging || uniqueCount <= 1) {
      return;
    }
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % poolLength);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayEnabled, isHovered, isDragging, poolLength, autoPlayInterval, uniqueCount]);

  // Handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % poolLength);
  }, [poolLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + poolLength) % poolLength);
  }, [poolLength]);

  const handleJumpToUniqueIndex = useCallback(
    (targetUniqueIndex) => {
      // Find the closest index in virtualPool that maps to targetUniqueIndex
      let bestIndex = 0;
      let minDiff = Infinity;
      virtualPool.forEach((item, poolIdx) => {
        if (item.originalIndex === targetUniqueIndex) {
          let diff = (poolIdx - activeIndex) % poolLength;
          if (diff > poolLength / 2) diff -= poolLength;
          if (diff < -poolLength / 2) diff += poolLength;
          if (Math.abs(diff) < minDiff) {
            minDiff = Math.abs(diff);
            bestIndex = poolIdx;
          }
        }
      });
      setActiveIndex(bestIndex);
    },
    [virtualPool, activeIndex, poolLength]
  );

  // Drag & Swipe Event Handlers
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchIntent.current = null;
    isTouchActive.current = true;
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isTouchActive.current || !e.touches || e.touches.length === 0) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // Detect gesture intent after small movement threshold (8px)
    if (!touchIntent.current) {
      if (Math.abs(diffX) < 8 && Math.abs(diffY) < 8) {
        return;
      }
      // If user is scrolling down or up the page, lock to vertical and do NOT drag cards
      if (Math.abs(diffY) >= Math.abs(diffX)) {
        touchIntent.current = 'vertical';
        return;
      } else {
        // User intentionally swiped horizontally on the carousel
        touchIntent.current = 'horizontal';
        setIsDragging(true);
      }
    }

    if (touchIntent.current === 'horizontal') {
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isTouchActive.current) return;
    isTouchActive.current = false;

    if (touchIntent.current === 'horizontal') {
      if (dragOffset < -50) {
        handleNext();
      } else if (dragOffset > 50) {
        handlePrev();
      }
    }
    touchIntent.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    isPointerDown.current = true;
    dragStartX.current = e.clientX;
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isPointerDown.current) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 5) {
      setIsDragging(true);
      setDragOffset(diff);
    }
  };

  const handleMouseUp = () => {
    if (isPointerDown.current) {
      if (dragOffset < -50) {
        handleNext();
      } else if (dragOffset > 50) {
        handlePrev();
      }
    }
    isPointerDown.current = false;
    setDragOffset(0);
    setTimeout(() => setIsDragging(false), 50);
  };

  const currentUniqueIndex = virtualPool[activeIndex]?.originalIndex ?? 0;

  return (
    <section
      id="pinned-heritage-section"
      className="w-full bg-white relative py-12 sm:py-16 lg:py-20 overflow-hidden border-none select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUp();
      }}
    >
      {/* Unique Aerodynamic Background Curve Ribbon with Soft Ambient Shadow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          viewBox="0 0 1440 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Soft Petrol Brand Gradient Fill */}
            <linearGradient id="uniqueWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0f9fa" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#e3f3f6" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#d4edf2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f0f9fa" stopOpacity="0.85" />
            </linearGradient>

            {/* Smooth Edge-Faded Stroke Gradient (No Hard Seams on Left/Right) */}
            <linearGradient id="uniqueStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005f73" stopOpacity="0" />
              <stop offset="25%" stopColor="#0a9396" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#005f73" stopOpacity="0.35" />
              <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0a9396" stopOpacity="0" />
            </linearGradient>

            {/* Soft Diffused Shadow Filter for the Floating Curve */}
            <filter
              id="uniqueWaveShadow"
              x="-10%"
              y="-20%"
              width="120%"
              height="150%"
              filterUnits="userSpaceOnUse"
            >
              <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#005f73" floodOpacity="0.08" />
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#071e26" floodOpacity="0.04" />
            </filter>
          </defs>

          {/* Layer 1: Sculpted Aerodynamic Wave Ribbon (Clean, Zero Dark Shadow) */}
          <path
            d="M-50,220 C260,110 520,270 820,170 C1100,80 1320,185 1490,135 L1490,620 C1320,680 1080,580 820,650 C520,720 260,600 -50,660 Z"
            fill="url(#uniqueWaveGrad)"
          />

          {/* Layer 2: Graceful Top Flow Contour Line */}
          <path
            d="M-50,220 C260,110 520,270 820,170 C1100,80 1320,185 1490,135"
            stroke="url(#uniqueStrokeGrad)"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Layer 3: Subtle Speed Trajectory Dashed Path */}
          <path
            d="M-50,255 C265,145 525,305 825,205 C1105,115 1325,220 1490,170"
            stroke="#0a9396"
            strokeWidth="1.5"
            strokeDasharray="8 10"
            strokeOpacity="0.2"
            fill="none"
          />
        </svg>

        {/* Soft Radial Ambient Glow in the Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-5xl h-[380px] bg-gradient-to-r from-[#005f73]/[0.03] via-[#0a9396]/[0.05] to-[#f59e0b]/[0.03] rounded-full blur-3xl pointer-events-none" />

        {/* Top Seamless Fade Merge (Pure White to match previous section) */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-[2]" />

        {/* Bottom Seamless Fade Merge (Pure White to match next section) */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-[2]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER (OPTIONAL CMS TITLE & DESCRIPTION)                          */}
        {/* ========================================================================= */}
        {(hasTitle || hasDescription) && (
          <div className="text-center max-w-5xl mx-auto mb-3 sm:mb-4 px-4 sm:px-6 select-text">
            {hasTitle && (
              <h2
                className="font-gotham font-black text-2xl sm:text-3xl lg:text-4xl text-[#161616] tracking-tight leading-snug max-w-4xl mx-auto"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}
            {hasDescription && (
              <p className="mt-2.5 font-gotham text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-4xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3-CARD VISIBLE CONTINUOUS STAGE CAROUSEL                                  */}
        {/* ========================================================================= */}
        <div
          className="relative w-full h-[480px] sm:h-[550px] lg:h-[600px] overflow-hidden flex items-end justify-center cursor-grab active:cursor-grabbing pb-2 sm:pb-3 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {virtualPool.map((card, poolIdx) => {
            // Compute circular difference to activeIndex
            let diff = (poolIdx - activeIndex) % poolLength;
            if (diff > poolLength / 2) diff -= poolLength;
            if (diff < -poolLength / 2) diff += poolLength;

            const isCenter = diff === 0;
            const isPrev = diff === -1;
            const isNext = diff === 1;
            const isFarPrev = diff === -2;
            const isFarNext = diff === 2;

            // Positioning & asymmetric card heights with shared bottom baseline:
            // - Middle (Active): full height, tallest ("middle oky")
            // - Left (Prev): height slightly decreased ("left side card height light ahh decrease")
            // - Right (Next): height lower than left ("right left oda kammiya erukanum")
            let translateXPercent = diff * 102;
            let cardHeight = 'min(74vh, 580px)';
            let opacity = 0;
            let zIndex = 10;
            let pointerEvents = 'none';

            if (isCenter) {
              translateXPercent = 0;
              cardHeight = 'min(74vh, 580px)';
              opacity = 1;
              zIndex = 30;
              pointerEvents = 'auto';
            } else if (isPrev) {
              translateXPercent = -102;
              cardHeight = 'min(64vh, 500px)';
              opacity = 0.90;
              zIndex = 20;
              pointerEvents = 'auto';
            } else if (isNext) {
              translateXPercent = 102;
              cardHeight = 'min(52vh, 410px)';
              opacity = 0.85;
              zIndex = 20;
              pointerEvents = 'auto';
            } else if (isFarPrev) {
              translateXPercent = -204;
              cardHeight = 'min(44vh, 340px)';
              opacity = 0;
              zIndex = 10;
            } else if (isFarNext) {
              translateXPercent = 204;
              cardHeight = 'min(44vh, 340px)';
              opacity = 0;
              zIndex = 10;
            } else {
              translateXPercent = diff > 0 ? 300 : -300;
              cardHeight = 'min(38vh, 290px)';
              opacity = 0;
              zIndex = 5;
            }

            const effectiveDrag = isDragging ? dragOffset : 0;
            const cardImage = resolveImageUrl(card.image, '');

            return (
              <div
                key={card.poolKey}
                onClick={() => {
                  if (isDragging) return;
                  if (isPrev) handlePrev();
                  if (isNext) handleNext();
                }}
                className={`absolute bottom-2 sm:bottom-3 left-1/2 select-none ${
                  isCenter ? 'cursor-default' : 'cursor-pointer'
                }`}
                style={{
                  width: 'min(82vw, 380px)',
                  height: cardHeight,
                  transform: `translate(-50%, 0) translate3d(calc(${translateXPercent}% + ${effectiveDrag}px), 0, 0)`,
                  opacity,
                  zIndex,
                  pointerEvents,
                  transition: isDragging
                    ? 'none'
                    : 'transform 550ms cubic-bezier(0.22, 1, 0.36, 1), height 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease',
                }}
              >
                {/* Physical Card Container - 100% Pure Tall Visual Image (Zero Text Inside, Zero Black Shadow) */}
                <div
                  className={`w-full h-full rounded-[28px] overflow-hidden border relative bg-slate-100 transition-all duration-500 flex flex-col group shadow-none ${
                    isCenter
                      ? 'border-slate-300'
                      : 'border-slate-200/90 opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* Top Accent Precision Hairline Stripe (Illuminating Accent on Hover) */}
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#005f73] via-[#0a9396] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

                  {/* 4 Architectural Precision Corner Accents (Square-curved, Zero Dots) */}
                  <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-white/70 rounded-tl-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-white/70 rounded-tr-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-white/70 rounded-bl-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-white/70 rounded-br-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Pure Full-Height Image (Zero Text Inside - 100% Visual Focus) */}
                  {cardImage ? (
                    <img
                      src={cardImage}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/80 border border-slate-200 shadow-sm flex items-center justify-center text-[#005f73] mb-2">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Product Showcase
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM CONTROLS: NAVIGATION ARROWS & PAGINATION DOTS                      */}
        {/* ========================================================================= */}
        {uniqueCount > 1 && (
          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3">
            {/* Left Chevron Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-white hover:bg-[#005f73] hover:border-[#005f73] flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Indicator Dots */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/80 border border-slate-200/60 rounded-full">
              {activeCards.map((_, dotIdx) => {
                const isActive = dotIdx === currentUniqueIndex;
                return (
                  <button
                    key={`dot-${dotIdx}`}
                    type="button"
                    onClick={() => handleJumpToUniqueIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? 'w-7 h-2 bg-[#005f73]'
                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                );
              })}
            </div>

            {/* Right Chevron Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-white hover:bg-[#005f73] hover:border-[#005f73] flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
