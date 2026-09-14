import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../utils/imageHelper';
import {
  Heart,
  MessageCircle,
  Share2,
  Coffee,
  Sandwich,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';

const DEFAULT_REELS = [
  {
    id: 'costa-coffee',
    category: 'Coffee',
    title: 'Costa Express Barista Coffee',
    price: '£2.45',
    badge: 'Fresh Brew',
    tag: '#CostaCoffee #Forecourt',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80',
    initialLikes: 1420,
    commentsCount: 84,
  },
  {
    id: 'deli-meal-deal',
    category: 'Meal Deals',
    title: 'Fresh Artisan Lunch Combo',
    price: '£4.99 Deal',
    badge: 'Popular',
    tag: '#MealDeal #FreshDeli',
    image:
      'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=700&q=80',
    initialLikes: 2180,
    commentsCount: 142,
  },
  {
    id: 'cold-drinks',
    category: 'Chilled Drinks',
    title: 'Polar Slush & Energy Drinks',
    price: '2 for £3.50',
    badge: 'Ice Cold',
    tag: '#IceCold #Slush',
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80',
    initialLikes: 940,
    commentsCount: 39,
  },
  {
    id: 'fresh-bakery',
    category: 'Fresh Bakery',
    title: 'Warm Butter Croissants',
    price: '£1.85',
    badge: 'Baked Fresh',
    tag: '#WarmBakery #Pastries',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80',
    initialLikes: 1150,
    commentsCount: 67,
  },
  {
    id: 'fuel-savings',
    category: 'Fuel Rewards',
    title: 'Forecourt Fuel & Store Savings',
    price: 'Save 5p / Litre',
    badge: 'Loyalty Perks',
    tag: '#FuelSavings #Rewards',
    image:
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=700&q=80',
    initialLikes: 3840,
    commentsCount: 215,
  },
];

export default function AppBentoSection({ specialtyData }) {
  // If explicitly disabled in Admin CMS, do not render
  if (specialtyData?.enabled === false) {
    return null;
  }

  // Dynamic CMS fields with robust support for intentionally emptied fields
  const title =
    typeof specialtyData?.title === 'string'
      ? specialtyData.title
      : typeof specialtyData?.leftTitle === 'string'
      ? specialtyData.leftTitle
      : 'Fresh Food. Cold Drinks.<br />Everyday Savings.';
  const description =
    typeof specialtyData?.description === 'string'
      ? specialtyData.description
      : typeof specialtyData?.leftDescription === 'string'
      ? specialtyData.leftDescription
      : 'Stop by our convenient forecourt store anytime for freshly baked artisan pastries, Costa barista coffee, chilled beverages, lunch combos, and everyday travel essentials on the go.';
  const ctaText =
    typeof specialtyData?.ctaText === 'string'
      ? specialtyData.ctaText
      : typeof specialtyData?.leftCtaText === 'string'
      ? specialtyData.leftCtaText
      : 'Explore In-Store Products';
  const ctaLink =
    typeof specialtyData?.ctaLink === 'string'
      ? specialtyData.ctaLink
      : typeof specialtyData?.leftCtaLink === 'string'
      ? specialtyData.leftCtaLink
      : '/our-products';

  // In-Store Feature Highlights (Do NOT fall back if field is an empty string)
  const feature1Title =
    typeof specialtyData?.feature1Title === 'string'
      ? specialtyData.feature1Title
      : 'Daily Fresh Meal Deals';
  const feature1Desc =
    typeof specialtyData?.feature1Desc === 'string'
      ? specialtyData.feature1Desc
      : 'Artisan sandwiches, warm paninis, and combo deals made fresh every morning.';
  const feature2Title =
    typeof specialtyData?.feature2Title === 'string'
      ? specialtyData.feature2Title
      : 'Costa Express Barista Coffee';
  const feature2Desc =
    typeof specialtyData?.feature2Desc === 'string'
      ? specialtyData.feature2Desc
      : '100% Arabica bean-to-cup hot espresso, lattes, and cappuccinos anytime day or night.';
  const feature3Title =
    typeof specialtyData?.feature3Title === 'string'
      ? specialtyData.feature3Title
      : '24/7 Forecourt Convenience';
  const feature3Desc =
    typeof specialtyData?.feature3Desc === 'string'
      ? specialtyData.feature3Desc
      : 'Chilled drinks, snacks, groceries, car care, and travel necessities ready when you need them.';

  const storeHandle =
    typeof specialtyData?.storeHandle === 'string' && specialtyData.storeHandle.trim()
      ? specialtyData.storeHandle.trim()
      : 'aiyanlimited';

  const storeAvatar =
    typeof specialtyData?.storeAvatar === 'string' && specialtyData.storeAvatar.trim()
      ? specialtyData.storeAvatar.trim()
      : 'AL';

  const phoneDetailsText =
    typeof specialtyData?.phoneDetailsText === 'string' && specialtyData.phoneDetailsText.trim()
      ? specialtyData.phoneDetailsText.trim()
      : 'Details →';

  const phoneDetailsLink =
    typeof specialtyData?.phoneDetailsLink === 'string' && specialtyData.phoneDetailsLink.trim()
      ? specialtyData.phoneDetailsLink.trim()
      : ctaLink || '/our-products';

  const hasTitle = Boolean(title && title.trim());
  const hasDescription = Boolean(description && description.trim());
  const hasCta = Boolean(ctaText && ctaText.trim());

  const hasFeature1 = Boolean(
    (feature1Title && feature1Title.trim()) || (feature1Desc && feature1Desc.trim())
  );
  const hasFeature2 = Boolean(
    (feature2Title && feature2Title.trim()) || (feature2Desc && feature2Desc.trim())
  );
  const hasFeature3 = Boolean(
    (feature3Title && feature3Title.trim()) || (feature3Desc && feature3Desc.trim())
  );
  const hasAnyFeatures = hasFeature1 || hasFeature2 || hasFeature3;

  // Interactive Reels state (from Admin CMS or defaults)
  const reels =
    specialtyData?.reels && specialtyData.reels.length > 0
      ? specialtyData.reels
      : DEFAULT_REELS;

  // Clone first item to end for smooth, seamless infinite upward loop
  const displayReels = reels.length > 1 ? [...reels, reels[0]] : reels;

  const [currentReel, setCurrentReel] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [likesState, setLikesState] = useState(
    reels.reduce((acc, r) => ({ ...acc, [r.id]: r.initialLikes || 1200 }), {})
  );
  const [likedMap, setLikedMap] = useState({});
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartY = useRef(null);

  // Synchronize likesState and index when reels change dynamically from CMS
  useEffect(() => {
    setLikesState((prev) => {
      const next = { ...prev };
      reels.forEach((r) => {
        if (next[r.id] === undefined) {
          next[r.id] = r.initialLikes || 1200;
        }
      });
      return next;
    });
    if (currentReel >= reels.length) {
      setCurrentReel(0);
    }
  }, [reels]);

  // Auto-advance reels continuously from bottom to top every 3.8s when not paused/hovered
  useEffect(() => {
    if (isPaused || reels.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentReel((prev) => prev + 1);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, reels.length]);

  // Seamless infinite loop transition handler
  const handleTransitionEnd = () => {
    if (currentReel >= reels.length) {
      setWithTransition(false);
      setCurrentReel(0);
    }
  };

  // Re-enable smooth transition immediately after instant jump
  useEffect(() => {
    if (!withTransition) {
      const frame1 = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          setWithTransition(true);
        });
        return () => cancelAnimationFrame(frame2);
      });
      return () => cancelAnimationFrame(frame1);
    }
  }, [withTransition]);

  // Handle Like Interaction
  const handleLike = (reelId, e) => {
    if (e) e.stopPropagation();
    const isCurrentlyLiked = likedMap[reelId];
    setLikedMap((prev) => ({ ...prev, [reelId]: !isCurrentlyLiked }));
    setLikesState((prev) => ({
      ...prev,
      [reelId]: isCurrentlyLiked ? (prev[reelId] || 1) - 1 : (prev[reelId] || 0) + 1,
    }));
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 900);
  };

  const nextReel = () => {
    if (!withTransition) return;
    setCurrentReel((prev) => (prev < reels.length ? prev + 1 : 1));
  };

  const prevReel = () => {
    if (!withTransition) return;
    setCurrentReel((prev) => (prev > 0 ? prev - 1 : reels.length - 1));
  };

  // Touch swipe support (Swipe Up = Next Reel from bottom to top)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 35) {
      nextReel();
    } else if (diff < -35) {
      prevReel();
    }
    touchStartY.current = null;
  };

  // Mouse wheel scroll support
  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) > 25) {
      if (e.deltaY > 0) {
        nextReel();
      } else {
        prevReel();
      }
    }
  };

  return (
    <section
      id="bento-app-showcase"
      className="w-full bg-white py-14 sm:py-20 border-none transition-all overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: OUR REAL SMARTPHONE MOCKUP WITH SCROLLABLE REELS FEED       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6 lg:py-10">
          <div className="relative flex items-center justify-center transform transition-all duration-700 -rotate-3 sm:-rotate-6 lg:-rotate-12 hover:rotate-0 filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.22)]">
            {/* Real Smartphone Container matching project frame assets */}
            <div
              className="relative w-[280px] sm:w-[310px] aspect-[327/663] select-none group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              {/* Phone Body & Metallic Edge Chassis Layer */}
              <img
                className="absolute inset-0 w-full h-full pointer-events-none z-10 object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.28)]"
                src={resolveImageUrl('/uploads/Phone-frame-bottom.png')}
                alt="Smartphone Frame"
              />

              {/* 1. Phone Screen Display inside the Phone Frame */}
              <div
                className="absolute top-[2%] bottom-[2%] left-[4%] right-[4%] rounded-[34px] sm:rounded-[38px] overflow-hidden bg-black text-white flex flex-col justify-between z-20"
              >
                {/* Fixed Top Status Bar */}
                <div className="absolute top-0 inset-x-0 z-30 pt-2.5 px-4 pointer-events-none">
                  <div className="flex items-center justify-between text-[10px] text-white font-medium pb-1 px-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px]">5G</span>
                      <div className="w-3.5 h-2 border border-white/80 rounded-xs p-[1px]">
                        <div className="w-full h-full bg-white rounded-2xs" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Sliding Reel Stack (Continuous Bottom-to-Top Infinite Loop) */}
                <div
                  onTransitionEnd={handleTransitionEnd}
                  className={`h-full w-full flex flex-col ${
                    withTransition
                      ? 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
                      : 'transition-none'
                  }`}
                  style={{
                    transform: `translateY(-${currentReel * 100}%)`,
                  }}
                >
                  {displayReels.map((reel, index) => {
                    const actualReel = reel;
                    const isLiked = likedMap[actualReel.id];
                    const likesCount = likesState[actualReel.id] || actualReel.initialLikes || 1200;
                    return (
                      <div
                        key={`${actualReel.id}-${index}`}
                        className="h-full w-full shrink-0 relative flex flex-col justify-end overflow-hidden cursor-pointer"
                        onClick={nextReel}
                      >
                        {/* Background Media: Auto-detect Video vs Image */}
                        {/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(actualReel.image || '') || actualReel.mediaType === 'video' ? (
                          <video
                            src={resolveImageUrl(actualReel.image, '')}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                          />
                        ) : (
                          <img
                            src={resolveImageUrl(actualReel.image, '')}
                            alt={actualReel.title}
                            className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-700"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80';
                            }}
                          />
                        )}

                        {/* Animated Heart Overlay on Like */}
                        {showHeartAnim && (currentReel === index || (currentReel === reels.length && index === 0)) && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
                            <Heart className="w-16 h-16 fill-[#f59e0b] text-[#f59e0b] drop-shadow-2xl" />
                          </div>
                        )}

                        {/* Right Reel Actions - Pure Icons Without Background Boxes */}
                        <div
                          className="absolute right-2 bottom-14 z-30 flex flex-col items-center gap-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Like Button */}
                          <button
                            type="button"
                            onClick={(e) => handleLike(actualReel.id, e)}
                            className="flex flex-col items-center gap-0.5 cursor-pointer group/btn"
                            aria-label="Like product"
                          >
                            <Heart
                              className={`w-6 h-6 transition-transform duration-200 group-hover/btn:scale-115 ${
                                isLiked
                                  ? 'fill-rose-500 text-rose-500 drop-shadow-[0_2px_8px_rgba(244,63,94,0.7)]'
                                  : 'fill-transparent text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]'
                              }`}
                            />
                            <span className="text-[9px] font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                              {likesCount}
                            </span>
                          </button>

                          {/* Comments */}
                          <div className="flex flex-col items-center gap-0.5">
                            <MessageCircle className="w-5 h-5 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]" />
                            <span className="text-[9px] font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                              {actualReel.commentsCount || 48}
                            </span>
                          </div>

                          {/* Share */}
                          <button
                            type="button"
                            className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] hover:scale-110 transition-transform cursor-pointer"
                            aria-label="Share"
                          >
                            <Share2 className="w-5 h-5 text-white" />
                          </button>

                        </div>

                        {/* Bottom Minimal Info Overlay - Compact & Neat Typography */}
                        <div
                          className="relative z-20 p-3 pb-3 pr-11 space-y-0.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Store Handle with Verified Badge */}
                          <div className="flex items-center gap-1.5 pb-0.5">
                            <div className="w-4 h-4 rounded-full bg-[#005f73] border border-white/60 flex items-center justify-center font-black text-[7px] text-white shrink-0 uppercase">
                              {storeAvatar}
                            </div>
                            <span className="text-[10px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] flex items-center gap-1">
                              {storeHandle}
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 text-[6px] text-white flex items-center justify-center font-bold">
                                ✓
                              </span>
                            </span>
                          </div>

                          {/* Short Product Title */}
                          {actualReel.title ? (
                            <h4 className="font-gotham font-black text-xs text-white leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] line-clamp-1">
                              {actualReel.title}
                            </h4>
                          ) : null}

                          {/* Tag */}
                          {actualReel.tag && (
                            <p className="text-[9px] text-white/80 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1">
                              {actualReel.tag}
                            </p>
                          )}

                          {/* Price Tag & Compact Action Button */}
                          <div className="flex items-center gap-2 pt-0.5">
                            {actualReel.price ? (
                              <span className="bg-[#f59e0b] text-[#071e26] font-founders font-black text-[10px] px-1.5 py-0.5 rounded shadow-xs">
                                {actualReel.price}
                              </span>
                            ) : null}
                            <Link
                              to={actualReel.link || actualReel.buttonLink || phoneDetailsLink}
                              className="text-[9px] font-gotham font-bold text-white bg-black/75 hover:bg-black/90 px-2.5 py-0.5 rounded-md transition-colors shadow-md"
                            >
                              {phoneDetailsText}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Island Top Layer */}
              <img
                className="absolute top-0 inset-x-0 w-full pointer-events-none z-30 object-contain"
                src={resolveImageUrl('/uploads/Phone-frame-top.png')}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: UNIQUE BOX-LESS EDITORIAL FLOW & LIVE STATUS                */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          {/* Main Title & Description */}
          {(hasTitle || hasDescription) && (
            <div className="space-y-3">
              {hasTitle && (
                <h2
                  className="font-gotham text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#161616] leading-[1.12]"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              {hasDescription && (
                <p className="font-gotham text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* In-Store Feature Highlights Flow */}
          {hasAnyFeatures && (
            <div className="space-y-4 my-2">
              {/* Feature 1 */}
              {hasFeature1 && (
                <div className="group flex items-start gap-4 sm:gap-5 py-1.5 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Sandwich className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    {Boolean(feature1Title && feature1Title.trim()) && (
                      <h3 className="font-gotham font-black text-base sm:text-lg text-[#161616] group-hover:text-[#005f73] transition-colors flex items-center gap-2">
                        <span>{feature1Title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#005f73]" />
                      </h3>
                    )}
                    {Boolean(feature1Desc && feature1Desc.trim()) && (
                      <p className="font-gotham text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {feature1Desc}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Feature 2 */}
              {hasFeature2 && (
                <div className="group flex items-start gap-4 sm:gap-5 py-1.5 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-[#005f73]/10 text-[#005f73] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    {Boolean(feature2Title && feature2Title.trim()) && (
                      <h3 className="font-gotham font-black text-base sm:text-lg text-[#161616] group-hover:text-[#005f73] transition-colors flex items-center gap-2">
                        <span>{feature2Title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#005f73]" />
                      </h3>
                    )}
                    {Boolean(feature2Desc && feature2Desc.trim()) && (
                      <p className="font-gotham text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {feature2Desc}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Feature 3 */}
              {hasFeature3 && (
                <div className="group flex items-start gap-4 sm:gap-5 py-1.5 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    {Boolean(feature3Title && feature3Title.trim()) && (
                      <h3 className="font-gotham font-black text-base sm:text-lg text-[#161616] group-hover:text-[#005f73] transition-colors flex items-center gap-2">
                        <span>{feature3Title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#005f73]" />
                      </h3>
                    )}
                    {Boolean(feature3Desc && feature3Desc.trim()) && (
                      <p className="font-gotham text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {feature3Desc}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Row: CTA Pill */}
          {hasCta && (
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {ctaLink && ctaLink.startsWith('http') ? (
                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-gotham font-bold text-xs sm:text-sm uppercase tracking-wider h-[48px] px-8 rounded-full inline-flex items-center gap-2.5 transition-all shadow-lg hover:shadow-cyan-500/25 hover:scale-105 cursor-pointer"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  to={ctaLink || '/our-products'}
                  className="bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-gotham font-bold text-xs sm:text-sm uppercase tracking-wider h-[48px] px-8 rounded-full inline-flex items-center gap-2.5 transition-all shadow-lg hover:shadow-cyan-500/25 hover:scale-105 cursor-pointer"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
