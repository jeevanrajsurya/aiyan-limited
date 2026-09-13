import React, { useState } from 'react';

export default function HeroSection({ heroData }) {
  const [videoFailed, setVideoFailed] = useState(false);

  // If section is explicitly disabled in Admin CMS, do not render
  if (heroData?.enabled === false) {
    return null;
  }

  // Unified dynamic CMS values: supports bgMediaUrl, bgImageUrl, or videoUrl
  const mediaUrl =
    typeof heroData?.bgMediaUrl === 'string' && heroData.bgMediaUrl.trim()
      ? heroData.bgMediaUrl.trim()
      : typeof heroData?.videoUrl === 'string' && heroData.videoUrl.trim()
      ? heroData.videoUrl.trim()
      : typeof heroData?.bgImageUrl === 'string' && heroData.bgImageUrl.trim()
      ? heroData.bgImageUrl.trim()
      : '/uploads/1789126910747-414335354.mp4';

  const isVideo =
    (heroData?.bgMediaType === 'video' ||
      /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(mediaUrl)) &&
    !videoFailed;

  // Text Color & Background Gradient Tint (matching user reference Image 3)
  const textColor = heroData?.textColor || 'white';
  const isWhiteText = textColor !== 'dark';

  const overlayStyle = heroData?.overlayStyle || 'none';

  const line1 = typeof heroData?.headlineLine1 === 'string' ? heroData.headlineLine1.trim() : '';
  const line2 = typeof heroData?.headlineLine2 === 'string' ? heroData.headlineLine2.trim() : '';
  const ctaText = typeof heroData?.buttonText === 'string' ? heroData.buttonText.trim() : '';
  const ctaLink = typeof heroData?.buttonLink === 'string' ? heroData.buttonLink.trim() : '';

  // Helper to format Conoco-style bold text for GO GO GO / SAVE SAVE SAVE
  const renderHeadlineSpan = (text, defaultHighlight) => {
    if (!text) return null;
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
    return text;
  };

  const hasHeadlines = Boolean(line1 || line2);
  const hasCta = Boolean(ctaText);

  return (
    <section className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden bg-[#071e26] border-none">
      {/* 1. Background Media: Video or High-Res Image */}
      {isVideo ? (
        <video
          src={mediaUrl}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          onError={() => setVideoFailed(true)}
        />
      ) : mediaUrl && !/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(mediaUrl) ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none scale-105"
          style={{
            backgroundImage: `url(${mediaUrl})`,
          }}
        />
      ) : null}

      {/* 2. Gradient Overlays for High Contrast & Visual Depth based on overlayStyle */}
      {/* Overlay style variations matching Image 3 */}
      {overlayStyle === 'dark' && (
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-[1]" />
      )}

      {overlayStyle === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/60 pointer-events-none z-[1]" />
      )}

      {/* Seamless White Fade & Soft Natural Shadow Transition to Pinned Section */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-[2]" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-[3]" />

      {/* 3. Hero Foreground Content — Centered Layout matching Reference */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
        {/* Dynamic Headlines */}
        {(hasHeadlines || !heroData) && (
          <div className="space-y-3 sm:space-y-4">
            <h1
              className={`font-gotham text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] ${
                isWhiteText
                  ? 'text-white drop-shadow-2xl'
                  : 'text-[#161616] drop-shadow-sm'
              }`}
            >
              {line1 ? renderHeadlineSpan(line1, 'GO GO GO.') : 'The fuel that lets you GO GO GO.'}
            </h1>
            {(line2 || !heroData) && (
              <p
                className={`font-gotham text-base sm:text-xl md:text-2xl font-medium tracking-wide max-w-2xl mx-auto ${
                  isWhiteText
                    ? 'text-white/90 drop-shadow-lg'
                    : 'text-[#161616]/90 drop-shadow-xs'
                }`}
              >
                {line2 ? renderHeadlineSpan(line2, 'SAVE SAVE SAVE.') : 'The app that lets you SAVE SAVE SAVE.'}
              </p>
            )}
          </div>
        )}

        {/* Dynamic CTA Button — Rounded Pill matching Reference image */}
        {(hasCta || !heroData) && (
          <div className="pt-2 sm:pt-4">
            <a
              href={ctaLink || 'https://onelink.to/xpxtfg'}
              target={ctaLink?.startsWith('http') ? '_blank' : '_self'}
              rel={ctaLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full font-gotham font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-2xl hover:scale-105 cursor-pointer ${
                isWhiteText
                  ? 'border-2 border-white/80 bg-white/10 hover:bg-[#f59e0b] hover:border-[#f59e0b] hover:text-[#071e26] backdrop-blur-md text-white hover:shadow-amber-500/25'
                  : 'border-2 border-[#161616] bg-[#161616]/10 hover:bg-[#161616] hover:text-white text-[#161616]'
              }`}
            >
              <span>{ctaText || 'Download the app'}</span>
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
  );
}
