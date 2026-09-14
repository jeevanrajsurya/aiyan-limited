import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SafeImage, resolveImageUrl } from '../../utils/imageHelper';

const defaultCol1 = [
  { name: 'About Us', to: '/about' },
  { name: 'Contact Us', to: '/contact' },
];

const defaultCol2 = [
  { name: 'Email Newsletter', to: '/#newsletter' },
  { name: 'Accessibility Statement', to: '/about' },
];

const defaultLegalLinks = [
  { name: 'Cookies Settings', to: '#cookies' },
  { name: 'Terms & Conditions', to: '/about' },
  { name: 'Privacy Statement', to: '/about' },
  { name: 'California Supply Disclosure', to: '/about' },
  { name: 'Admin Portal', to: import.meta.env.VITE_ADMIN_URL || '#' },
];

export default function Footer({
  footerData,
  onOpenValetModal,
  onOpenFleetModal,
  onOpenJobModal,
}) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  if (footerData?.enabled === false) {
    return null;
  }

  const logoUrl = footerData?.logoUrl;
  const hasLogoImage = logoUrl !== '' && logoUrl !== 'none';

  const col1Title = footerData?.col1Title ?? '';
  const col2Title = footerData?.col2Title ?? '';
  const col1 = footerData?.col1Links !== undefined ? footerData.col1Links : defaultCol1;
  const col2 = footerData?.col2Links !== undefined ? footerData.col2Links : defaultCol2;
  const legalList =
    footerData?.legalLinks !== undefined && Array.isArray(footerData.legalLinks)
      ? footerData.legalLinks
      : defaultLegalLinks;

  const igUrl = footerData?.instagramUrl;
  const fbUrl = footerData?.facebookUrl;
  const ytUrl = footerData?.youtubeUrl;
  const hasSocials =
    (igUrl && igUrl !== '' && igUrl !== 'none') ||
    (fbUrl && fbUrl !== '' && fbUrl !== 'none') ||
    (ytUrl && ytUrl !== '' && ytUrl !== 'none');

  const copyright =
    footerData?.copyrightText ??
    `Conoco® and its respective logos are registered trademarks owned by Phillips 66 Company. KickBack and its respective logos are registered trademarks of KickBack Points, LLC. Other products and logos mentioned herein may be trademarks of their respective owners.\n©${new Date().getFullYear()} Phillips 66 Company. All rights reserved.`;

  // Render legal link without persistent underline (underline removed per request, subtle hover transition)
  const renderLegalLink = (link) => {
    const isAdmin = link.name?.toLowerCase().includes('admin');
    const baseCls = isAdmin
      ? 'text-[#f59e0b] font-semibold hover:text-[#fbbf24] transition-colors block text-left bg-transparent p-0 border-0 cursor-pointer no-underline'
      : 'text-white/70 hover:text-white transition-colors block text-left bg-transparent p-0 border-0 cursor-pointer no-underline';

    if (link.to?.startsWith('http')) {
      return (
        <a
          href={link.to}
          target="_blank"
          rel="noopener noreferrer"
          className={baseCls}
        >
          {link.name}
        </a>
      );
    }
    if (link.to === '#cookies' || link.to === '#') {
      return (
        <button
          type="button"
          onClick={() => {}}
          className={baseCls}
        >
          {link.name}
        </button>
      );
    }
    if (link.to?.includes('#')) {
      return (
        <a href={link.to} className={baseCls}>
          {link.name}
        </a>
      );
    }
    return (
      <Link to={link.to} className={baseCls}>
        {link.name}
      </Link>
    );
  };

  return (
    <div className="bg-white w-full">
      <footer
        id="site-footer"
        className={`bg-[#000000] text-white rounded-t-[32px] sm:rounded-t-[44px] pt-16 sm:pt-20 pb-16 overflow-hidden relative shadow-[0_-16px_40px_rgba(0,0,0,0.14)] ${
          isHome ? 'mt-0' : 'mt-12'
        }`}
      >
        {/* Conoco Dynamic Angular Geometry Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 2286 1041"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover opacity-85"
          >
            {/* Lower Parallelogram Geometry Line */}
            <path
              d="M790.857 1038.13H3.0957L148.844 657.311C180.362 574.964 262.717 520.13 354.934 520.13H1142.7L996.947 900.948C965.429 983.296 883.074 1038.13 790.857 1038.13Z"
              stroke="#2e2e2e"
              strokeWidth="4"
            />
            {/* Upper Parallelogram Geometry Line */}
            <path
              d="M1930.46 520.13H1142.7L1288.44 139.311C1319.96 56.9639 1402.32 2.12988 1494.53 2.12988H2282.3L2136.55 382.948C2105.03 465.296 2022.67 520.13 1930.46 520.13Z"
              stroke="#2e2e2e"
              strokeWidth="4"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Group: Logo & Nav on Left, App Callout & Socials on Right */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 pb-14 sm:pb-16">
            {/* Left Column: Tri-Brand Logo + 2 Nav Columns */}
            <div className="flex-1">
              {/* Tri-Brand White Logo */}
              {hasLogoImage && (
                <div className="mb-10 sm:mb-12">
                  <SafeImage
                    src={logoUrl || '/uploads/tribrand-white-reg-mark.png'}
                    defaultFallback="/uploads/tribrand-white-reg-mark.png"
                    alt="Phillips 66, Conoco, 76"
                    className="h-14 sm:h-16 md:h-20 max-h-[84px] w-auto object-contain drop-shadow-md"
                  />
                </div>
              )}

              {/* Navigation Columns (About Us / Contact Us & Email Newsletter / Accessibility Statement) */}
              <div className="flex flex-wrap gap-20 sm:gap-28 lg:gap-32 text-base font-semibold text-white">
                {/* Column 1 */}
                {(col1.length > 0 || col1Title) && (
                  <div className="space-y-4 sm:space-y-5">
                    {col1Title ? (
                      <span className="text-xs font-bold uppercase tracking-wider text-[#f59e0b] block mb-2">
                        {col1Title}
                      </span>
                    ) : null}
                    {col1.map((link, idx) => (
                      <div key={link.to || idx}>
                        {link.to?.startsWith('http') ? (
                          <a
                            href={link.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white/80 transition-colors block text-white"
                          >
                            {link.name}
                          </a>
                        ) : link.to?.includes('#') ? (
                          <a
                            href={link.to}
                            className="hover:text-white/80 transition-colors block text-white"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            to={link.to}
                            className="hover:text-white/80 transition-colors block text-white"
                          >
                            {link.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Column 2 */}
                {(col2.length > 0 || col2Title) && (
                  <div className="space-y-4 sm:space-y-5">
                    {col2Title ? (
                      <span className="text-xs font-bold uppercase tracking-wider text-[#f59e0b] block mb-2">
                        {col2Title}
                      </span>
                    ) : null}
                    {col2.map((link, idx) => (
                      <div key={link.to || idx}>
                        {link.to?.startsWith('http') ? (
                          <a
                            href={link.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white/80 transition-colors block text-white"
                          >
                            {link.name}
                          </a>
                        ) : link.to?.includes('#') ? (
                          <a
                            href={link.to}
                            className="hover:text-white/80 transition-colors block text-white"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            to={link.to}
                            className="hover:text-white/80 transition-colors block text-white"
                          >
                            {link.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Social Links */}
            {hasSocials && (
              <div className="shrink-0 lg:pl-6 pt-2">
                <div className="flex items-center gap-5 sm:gap-6">
                  {igUrl && igUrl !== '' && igUrl !== 'none' && (
                    <a
                      href={igUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 opacity-90 hover:opacity-100 transition-opacity cursor-pointer inline-flex items-center justify-center"
                      aria-label="Instagram"
                    >
                      <img
                        src={resolveImageUrl('/uploads/instagram.svg')}
                        alt="Instagram"
                        className="w-full h-full object-contain"
                      />
                    </a>
                  )}
                  {fbUrl && fbUrl !== '' && fbUrl !== 'none' && (
                    <a
                      href={fbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 opacity-90 hover:opacity-100 transition-opacity cursor-pointer inline-flex items-center justify-center"
                      aria-label="Facebook"
                    >
                      <img
                        src={resolveImageUrl('/uploads/facebook.svg')}
                        alt="Facebook"
                        className="w-full h-full object-contain"
                      />
                    </a>
                  )}
                  {ytUrl && ytUrl !== '' && ytUrl !== 'none' && (
                    <a
                      href={ytUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 opacity-90 hover:opacity-100 transition-opacity cursor-pointer inline-flex items-center justify-center"
                      aria-label="YouTube"
                    >
                      <img
                        src={resolveImageUrl('/uploads/youtube.svg')}
                        alt="YouTube"
                        className="w-full h-full object-contain"
                      />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Group: 2 Legal Columns on Left, Trademark/Copyright on Right */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16 pt-10 sm:pt-12 text-xs text-white/70">
            {/* Legal Links Columns (Underlines completely removed, clean text) */}
            {legalList.length > 0 && (
              <div className="flex flex-wrap gap-16 sm:gap-24 text-xs sm:text-[13px] font-medium text-white/70">
                <div className="space-y-3 sm:space-y-4">
                  {legalList.slice(0, Math.ceil(legalList.length / 2)).map((link, idx) => (
                    <div key={link.name || idx}>
                      {renderLegalLink(link)}
                    </div>
                  ))}
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {legalList.slice(Math.ceil(legalList.length / 2)).map((link, idx) => (
                    <div key={link.name || idx}>
                      {renderLegalLink(link)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Copyright & Disclaimers (Left-aligned within right-anchored max-w-md block) */}
            {copyright && (
              <div className="text-left max-w-[420px] text-[11px] sm:text-xs leading-[18px] text-white/50 whitespace-pre-line space-y-2">
                {copyright}
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
