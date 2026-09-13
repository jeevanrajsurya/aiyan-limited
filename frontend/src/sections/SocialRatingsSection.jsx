import React from 'react';
import { SafeImage } from '../utils/imageHelper';

export default function SocialRatingsSection({ socialRatingsData }) {
  if (socialRatingsData?.enabled === false) {
    return null;
  }

  // Card 1: Social Follow Card
  const socialCard = socialRatingsData?.socialCard || {};
  const showSocialCard = socialCard?.enabled !== false;
  const socialTitle =
    socialCard?.title !== undefined
      ? socialCard.title
      : 'Follow to stay in the know while you go.';
  const igUrl =
    socialCard?.instagramUrl !== undefined
      ? socialCard.instagramUrl
      : 'https://www.instagram.com/conoco/';
  const fbUrl =
    socialCard?.facebookUrl !== undefined
      ? socialCard.facebookUrl
      : 'https://www.facebook.com/conoco';
  const ytUrl =
    socialCard?.youtubeUrl !== undefined
      ? socialCard.youtubeUrl
      : 'https://youtube.com/playlist?list=PLhZANlfVQtQeQq02_i-P-FzxJk8lOKgX-';

  // Card 2: App Ratings Card
  const ratingsCard = socialRatingsData?.ratingsCard || {};
  const showRatingsCard = ratingsCard?.enabled !== false;
  const appIcon =
    ratingsCard?.appIconUrl &&
    ratingsCard.appIconUrl !== 'none' &&
    ratingsCard.appIconUrl.trim() !== ''
      ? ratingsCard.appIconUrl
      : (ratingsCard?.appIconUrl !== undefined ? null : '/uploads/FF-App-Icon.svg');
  const hasAppIcon = Boolean(appIcon);
  const appName =
    ratingsCard?.appName !== undefined ? ratingsCard.appName : 'Fuel Forward® App';
  const r1Val =
    ratingsCard?.rating1Value !== undefined ? ratingsCard.rating1Value : '4.9';
  const r1Count =
    ratingsCard?.rating1Count !== undefined ? ratingsCard.rating1Count : '53K reviews';
  const r1Img =
    ratingsCard?.rating1ImageUrl &&
    ratingsCard.rating1ImageUrl !== 'none' &&
    ratingsCard.rating1ImageUrl.trim() !== ''
      ? ratingsCard.rating1ImageUrl
      : null;
  const r1Link =
    ratingsCard?.rating1Link !== undefined
      ? ratingsCard.rating1Link
      : 'https://apps.apple.com/us/app/my-phillips-66/id922282104';
  const r2Val =
    ratingsCard?.rating2Value !== undefined ? ratingsCard.rating2Value : '4.4';
  const r2Count =
    ratingsCard?.rating2Count !== undefined ? ratingsCard.rating2Count : '7.99K reviews';
  const r2Img =
    ratingsCard?.rating2ImageUrl &&
    ratingsCard.rating2ImageUrl !== 'none' &&
    ratingsCard.rating2ImageUrl.trim() !== ''
      ? ratingsCard.rating2ImageUrl
      : null;
  const r2Link =
    ratingsCard?.rating2Link !== undefined
      ? ratingsCard.rating2Link
      : 'https://play.google.com/store/apps/details?id=com.p66.b2c.stationfinder.p66';
  const ratingsBtnText =
    ratingsCard?.buttonText !== undefined ? ratingsCard.buttonText : 'Download the app';
  const ratingsBtnLink =
    ratingsCard?.buttonLink !== undefined ? ratingsCard.buttonLink : 'https://onelink.to/xpxtfg';

  // Card 3: Testimonial Card
  const testimonialCard = socialRatingsData?.testimonialCard || {};
  const showTestimonialCard = testimonialCard?.enabled !== false;
  const testStars =
    testimonialCard?.stars !== undefined ? testimonialCard.stars : '★★★★★';
  const testQuote =
    testimonialCard?.quote !== undefined
      ? testimonialCard.quote
      : '“The Fuel Forward app makes filling up so easy. I save money and time on every visit.”';
  const testAuthor =
    testimonialCard?.author !== undefined
      ? testimonialCard.author
      : '— Sarah M., App User';
  const testBtnText =
    testimonialCard?.buttonText !== undefined ? testimonialCard.buttonText : 'Try the app';
  const testBtnLink =
    testimonialCard?.buttonLink !== undefined ? testimonialCard.buttonLink : 'https://onelink.to/xpxtfg';

  const activeCardsCount =
    (showSocialCard ? 1 : 0) + (showRatingsCard ? 1 : 0) + (showTestimonialCard ? 1 : 0);

  if (activeCardsCount === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div
        className={`grid grid-cols-1 ${
          activeCardsCount === 1
            ? 'max-w-md mx-auto'
            : activeCardsCount === 2
            ? 'md:grid-cols-2 max-w-3xl mx-auto'
            : 'lg:grid-cols-3 w-full'
        } gap-5 sm:gap-6 items-stretch justify-center`}
      >
        {/* Card 1: Social Follow Card */}
        {showSocialCard && (
          <div className="bg-[#071e26] rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-white shadow-sm min-h-[300px] sm:min-h-[340px]">
            {socialTitle ? (
              <h3 className="font-founders text-2xl sm:text-3xl font-black tracking-tight leading-[1.1] text-white">
                {socialTitle}
              </h3>
            ) : null}

            <div className="flex items-center gap-5 pt-6">
              {/* Instagram */}
              {igUrl && igUrl.trim() !== '' && (
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform text-white"
                  aria-label="Petrol Instagram"
                >
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {/* Facebook */}
              {fbUrl && fbUrl.trim() !== '' && (
                <a
                  href={fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform text-white"
                  aria-label="Petrol Facebook"
                >
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              )}
              {/* YouTube */}
              {ytUrl && ytUrl.trim() !== '' && (
                <a
                  href={ytUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform text-white"
                  aria-label="Petrol YouTube"
                >
                  <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Card 2: App Store & Google Play Ratings Card */}
        {showRatingsCard && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-center space-y-5 shadow-sm min-h-[300px] sm:min-h-[340px]">
            {(hasAppIcon || appName) ? (
              <div className="flex items-center gap-3.5">
                {hasAppIcon ? (
                  <div className="w-11 h-11 rounded-xl overflow-hidden shadow-sm flex items-center justify-center flex-shrink-0 bg-transparent">
                    <SafeImage
                      src={appIcon}
                      alt={appName || 'App Icon'}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : null}

                {appName ? (
                  <span className="text-lg sm:text-xl font-black text-[#161616] tracking-tight">
                    {appName}
                  </span>
                ) : null}
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-4 pt-1">
              {/* App Store Rating */}
              {(r1Val || r1Count || r1Img) ? (
                <div className="space-y-1">
                  {(r1Val || r1Count) ? (
                    <div>
                      {r1Val ? (
                        <div className="flex items-center gap-1">
                          <span className="text-2xl sm:text-3xl font-black text-[#161616] tracking-tight leading-none">{r1Val}</span>
                          <span className="text-xl text-[#f59e0b] leading-none">★</span>
                        </div>
                      ) : null}
                      {r1Count ? <p className="text-xs sm:text-sm font-medium text-[#666666] mt-1">{r1Count}</p> : null}
                    </div>
                  ) : null}
                  {r1Img && (
                    <div className="pt-2">
                      <a
                        href={r1Link || '#'}
                        target={r1Link?.startsWith('http') ? '_blank' : '_self'}
                        rel={r1Link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-block hover:opacity-85 transition-opacity"
                      >
                        <SafeImage
                          src={r1Img}
                          alt="Download on App Store"
                          className="h-8 sm:h-9 w-auto object-contain"
                        />
                      </a>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Google Play Rating */}
              {(r2Val || r2Count || r2Img) ? (
                <div className="space-y-1">
                  {(r2Val || r2Count) ? (
                    <div>
                      {r2Val ? (
                        <div className="flex items-center gap-1">
                          <span className="text-2xl sm:text-3xl font-black text-[#161616] tracking-tight leading-none">{r2Val}</span>
                          <span className="text-xl text-[#f59e0b] leading-none">★</span>
                        </div>
                      ) : null}
                      {r2Count ? <p className="text-xs sm:text-sm font-medium text-[#666666] mt-1">{r2Count}</p> : null}
                    </div>
                  ) : null}
                  {r2Img && (
                    <div className="pt-2">
                      <a
                        href={r2Link || '#'}
                        target={r2Link?.startsWith('http') ? '_blank' : '_self'}
                        rel={r2Link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-block hover:opacity-85 transition-opacity"
                      >
                        <SafeImage
                          src={r2Img}
                          alt="Get it on Google Play"
                          className="h-8 sm:h-9 w-auto object-contain"
                        />
                      </a>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {ratingsBtnText ? (
              <div className="pt-1">
                <a
                  href={ratingsBtnLink || '#'}
                  target={ratingsBtnLink?.startsWith('http') ? '_blank' : '_self'}
                  rel={ratingsBtnLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#005f73] hover:text-[#0a9396] hover:underline cursor-pointer group"
                >
                  <span>{ratingsBtnText}</span>
                  <span className="text-base font-bold transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            ) : null}
          </div>
        )}

        {/* Card 3: 5-Star Testimonial Card */}
        {showTestimonialCard && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-center space-y-4 shadow-sm min-h-[300px] sm:min-h-[340px]">
            {(testStars || testQuote || testAuthor) ? (
              <div className="space-y-3">
                {testStars ? (
                  <div className="flex items-center gap-1 text-[#f59e0b] text-2xl sm:text-3xl tracking-wide leading-none">
                    {testStars}
                  </div>
                ) : null}

                {testQuote ? (
                  <blockquote className="text-base sm:text-lg font-bold text-[#161616] leading-snug">
                    {testQuote}
                  </blockquote>
                ) : null}

                {testAuthor ? (
                  <p className="text-xs sm:text-sm font-medium text-[#666666]">
                    {testAuthor}
                  </p>
                ) : null}
              </div>
            ) : null}

            {testBtnText ? (
              <div className="pt-1">
                <a
                  href={testBtnLink || '#'}
                  target={testBtnLink?.startsWith('http') ? '_blank' : '_self'}
                  rel={testBtnLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#005f73] hover:text-[#0a9396] hover:underline cursor-pointer group"
                >
                  <span>{testBtnText}</span>
                  <span className="text-base font-bold transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
