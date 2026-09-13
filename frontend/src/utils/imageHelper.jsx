import React, { useState, useEffect } from 'react';

const API_ORIGIN = (import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '');

// Known bundled static assets deployed in frontend/public/uploads/
export const KNOWN_STATIC_UPLOADS = new Set([
  'app-store.png',
  'broncos-lifestyle.jpeg',
  'broncos-logo.png',
  'broncos-stadium.jpeg',
  'conoco-default.png',
  'Conoco-live-phone.jpeg',
  'conoco-one-tank-ig.jpeg',
  'conoco-rev.png',
  'conoco-sponsors-trimmed.png',
  'contact-attendant.png',
  'Cropped-phone.jpg',
  'dispenser-pump-app.jpeg',
  'facebook.svg',
  'FF-App-Icon.svg',
  'gas-pumps-conoco.png',
  'globe-white.svg',
  'go-shape-conoco-red-utility-bar.png',
  'go-shape-londis-green-utility-bar.png',
  'google-play.png',
  'hero-poster.jpeg',
  'hero-station-ref.png',
  'hero-video.mp4',
  'instagram.svg',
  'kickback-card.jpeg',
  'nozzle.svg',
  'pay-at-pump-survey.jpeg',
  'Phone-frame-bottom.png',
  'Phone-frame-top.png',
  'seventh-inning-stretch.jpeg',
  'street-map-bg.jpeg',
  'tribrand-white-reg-mark.png',
  'youtube.svg',
  '1789126910747-414335354.mp4',
  '1789126982124-670392333.png',
  '1789126992479-582900206.jpeg',
  '1789127013679-714811150.jpeg',
  '1789127036933-552270613.jpeg',
  '1789127052571-753215907.jpeg',
  '1789127064890-527279591.jpeg',
  '1789127099556-189447935.png',
  '1789127105015-574233430.png',
  '1789127110197-150498453.png',
  '1789127114232-81015424.png',
  '1789127121447-8496426.png',
  '1789127128241-718953333.png',
  '1789127169752-947061930.jpeg',
  '1789127192911-294088960.png',
  '1789127201534-508361486.jpeg',
  '1789127209953-470831119.jpeg',
  '1789127220920-40195423.jpeg',
  '1789127233213-279730124.jpeg',
  '1789157325826-565058953.png',
  '1789157352096-496543799.png',
  '1789170002125-477613954.mp4',
  '1789171432103-466233934.jpeg',
  '1789172280807-762862505.jpeg',
  '1789172695446-349303326.jpeg',
  '1789172710765-452221979.jpeg',
  '1789172730346-173158649.jpeg',
  '1789333605542-126609700.mp4',
  '1789334082410-467432492.png',
]);

export function isKnownStaticUpload(url) {
  if (!url || typeof url !== 'string') return false;
  const filename = url.replace(/^\/?uploads\//, '').split(/[?#]/)[0];
  return KNOWN_STATIC_UPLOADS.has(filename);
}

/**
 * Resolves an image URL against backend host or fallback.
 * If url is explicitly empty string or 'none' (user removed it), returns ''.
 * If url is undefined or null, returns defaultFallback.
 * If url is an external URL (http/https/data:), returns as is.
 * If url is a relative path starting with /uploads:
 *   - Known bundled static uploads resolve locally from Vercel frontend.
 *   - Backend-generated uploads resolve against API_ORIGIN (Railway).
 */
export function resolveImageUrl(url, defaultFallback = '') {
  if (url === '' || url === 'none') {
    return '';
  }
  if (url === undefined || url === null) {
    return defaultFallback;
  }
  if (typeof url !== 'string' || url.trim() === '') {
    return defaultFallback;
  }
  const cleanUrl = url.trim();
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') || cleanUrl.startsWith('data:')) {
    return cleanUrl;
  }
  const normalized = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;

  if (normalized.startsWith('/uploads/')) {
    if (isKnownStaticUpload(normalized) || !API_ORIGIN) {
      return normalized;
    }
    return `${API_ORIGIN}${normalized}`;
  }

  return normalized;
}

/**
 * SafeImage Component
 * Automatically catches load errors (e.g. if the image 404s)
 * and falls back to defaultFallback without infinite error loops.
 * If src is explicitly cleared (''), does NOT render (returns null).
 */
export function SafeImage({
  src,
  defaultFallback,
  alt = '',
  className = '',
  width,
  height,
  loading = 'lazy',
  ...rest
}) {
  if (src === '' || src === 'none') {
    return null;
  }

  const resolvedInitial = resolveImageUrl(src, defaultFallback);
  if (!resolvedInitial) {
    return null;
  }

  const [currentSrc, setCurrentSrc] = useState(resolvedInitial);
  const [triedBackend, setTriedBackend] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    if (src === '' || src === 'none') {
      setCurrentSrc('');
      return;
    }
    setCurrentSrc(resolveImageUrl(src, defaultFallback));
    setTriedBackend(false);
    setHasErrored(false);
  }, [src, defaultFallback]);

  const handleError = () => {
    // If a static /uploads/ path failed on Vercel, attempt backend API origin fallback once
    if (
      !triedBackend &&
      API_ORIGIN &&
      typeof currentSrc === 'string' &&
      currentSrc.startsWith('/uploads/')
    ) {
      setTriedBackend(true);
      setCurrentSrc(`${API_ORIGIN}${currentSrc}`);
      return;
    }

    if (!hasErrored && defaultFallback && currentSrc !== defaultFallback) {
      setHasErrored(true);
      setCurrentSrc(defaultFallback);
    }
  };

  if (!currentSrc) {
    return null;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
      {...rest}
    />
  );
}

/**
 * Hook for CSS background images that automatically validates whether
 * customUrl can be loaded. If customUrl is explicitly empty/none, returns empty string.
 * If it fails or is unconfigured, falls back to defaultUrl.
 */
export function useSafeBackgroundImage(customUrl, defaultUrl) {
  const [bgUrl, setBgUrl] = useState(() => {
    if (customUrl === '' || customUrl === 'none') return '';
    return resolveImageUrl(customUrl, defaultUrl);
  });

  useEffect(() => {
    if (customUrl === '' || customUrl === 'none') {
      setBgUrl('');
      return;
    }
    const targetUrl = resolveImageUrl(customUrl, defaultUrl);
    if (!targetUrl || targetUrl === defaultUrl) {
      setBgUrl(defaultUrl || '');
      return;
    }

    const img = new Image();
    img.src = targetUrl;
    img.onload = () => {
      setBgUrl(targetUrl);
    };
    img.onerror = () => {
      // If a relative /uploads failed and we have API_ORIGIN, try API_ORIGIN once
      if (API_ORIGIN && targetUrl.startsWith('/uploads/')) {
        const backendUrl = `${API_ORIGIN}${targetUrl}`;
        const retryImg = new Image();
        retryImg.src = backendUrl;
        retryImg.onload = () => setBgUrl(backendUrl);
        retryImg.onerror = () => {
          console.warn(`[SafeImage] Failed to load background image "${targetUrl}". Falling back to default.`);
          setBgUrl(defaultUrl || '');
        };
        return;
      }
      console.warn(`[SafeImage] Failed to load background image "${targetUrl}". Falling back to default.`);
      setBgUrl(defaultUrl || '');
    };
  }, [customUrl, defaultUrl]);

  return bgUrl;
}
