import React from 'react';
import { Link } from 'react-router-dom';

export const DEFAULT_RUNNING_PRODUCTS = [
  {
    id: 'prod-shell-rotella',
    title: 'Shell Rotella Oil Jug',
    image: '/uploads/1789127099556-189447935.png',
    link: '/our-products',
  },
  {
    id: 'prod-castrol-pourer',
    title: 'Castrol Vintage Oil Pourer',
    image: '/uploads/1789127105015-574233430.png',
    link: '/our-products',
  },
  {
    id: 'prod-racing-helmet',
    title: 'Classic Racing Helmet on Stand',
    image: '/uploads/1789127110197-150498453.png',
    link: '/our-products',
  },
  {
    id: 'prod-burmah-helmet',
    title: 'Burmah Classic Red Helmet',
    image: '/uploads/1789127114232-81015424.png',
    link: '/our-products',
  },
  {
    id: 'prod-mobil-pump',
    title: 'Mobil Super Special Miniature Dispenser',
    image: '/uploads/1789127121447-8496426.png',
    link: '/our-products',
  },
  {
    id: 'prod-castrol-bottle',
    title: 'Castrol Vintage Glass Oil Bottle',
    image: '/uploads/1789127128241-718953333.png',
    link: '/our-products',
  },
];

/**
 * Resolves local public images vs backend uploaded images
 */
function resolveProductImage(url) {
  if (!url) return '';
  const clean = url.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('data:')) {
    return clean;
  }
  return clean;
}

/**
 * Full-width edge-to-edge running product marquee
 * Scrolls endlessly from RIGHT to LEFT on a clean white background.
 */
export default function RunningProductsTicker({
  products = DEFAULT_RUNNING_PRODUCTS,
  speed = 'normal',
  enabled = true,
}) {
  if (enabled === false) return null;

  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  const validProducts = products.filter((p) => p && p.enabled !== false);
  if (validProducts.length === 0) {
    return null;
  }

  // Speed durations in seconds
  const speedMap = {
    slow: '45s',
    normal: '30s',
    fast: '18s',
  };
  const duration = speedMap[speed] || (typeof speed === 'number' ? `${speed}s` : '30s');

  // Repeat items to ensure a seamless endless ticker across all screens (ultrawide / 4K)
  const repeatedProducts = [
    ...validProducts,
    ...validProducts,
    ...validProducts,
    ...validProducts,
  ];

  return (
    <div className="w-full bg-white relative pt-8 sm:pt-12 pb-4 sm:pb-6 select-none overflow-hidden group border-none">
      {/* Inline styles for the smooth right-to-left marquee animation */}
      <style>{`
        @keyframes runningProductsRtl {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-running-products {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: runningProductsRtl ${duration} linear infinite;
        }
        .group:hover .animate-running-products {
          animation-play-state: paused;
        }
      `}</style>

      {/* Subtle edge fade overlays for a sleek transition */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Scrolling Track */}
      <div className="flex w-full overflow-hidden">
        <div className="animate-running-products flex items-center py-2">
          {repeatedProducts.map((item, idx) => {
            const imgSrc = resolveProductImage(item.image);
            const isExternal =
              item.link && (item.link.startsWith('http://') || item.link.startsWith('https://'));

            const cardContent = (
              <div className="flex flex-col items-center justify-end px-6 sm:px-10 lg:px-14 shrink-0 transition-transform duration-300 transform-gpu hover:scale-110">
                {/* Product Image on Clean White Floor with soft shadow */}
                <div className="h-32 sm:h-40 lg:h-48 flex items-end justify-center">
                  <img
                    src={imgSrc}
                    alt={item.title || `Vintage Relic Product #${idx + 1}`}
                    className="max-h-full max-w-[140px] sm:max-w-[180px] lg:max-w-[210px] object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.12)] transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />
                </div>

                {/* Optional Subtle Label */}
                {item.title && (
                  <span className="mt-3 text-[11px] sm:text-xs font-bold text-slate-700 tracking-tight opacity-70 group-hover:opacity-100 transition-opacity text-center max-w-[160px] truncate">
                    {item.title}
                  </span>
                )}
              </div>
            );

            if (item.link) {
              if (isExternal) {
                return (
                  <a
                    key={`run-prod-${idx}-${item.id || idx}`}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer block"
                    title={item.title || 'View item'}
                  >
                    {cardContent}
                  </a>
                );
              }
              return (
                <Link
                  key={`run-prod-${idx}-${item.id || idx}`}
                  to={item.link}
                  className="cursor-pointer block"
                  title={item.title || 'View item'}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={`run-prod-${idx}-${item.id || idx}`}
                className="cursor-default"
                title={item.title || 'Vintage Relic'}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
