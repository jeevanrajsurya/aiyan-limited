import { useQuery } from '@tanstack/react-query';
import { getSiteSettings, getCachedSiteSettings } from '../api/client';

import HeroSection from '../sections/HeroSection';
import AppBentoSection from '../sections/AppBentoSection';
import PinnedProductsSection from '../sections/PinnedProductsSection';
import NewsletterSection from '../sections/NewsletterSection';
import RunningProductsTicker from '../components/common/RunningProductsTicker';

export default function Home({ onOpenValet, onOpenFleet, onOpenJob }) {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: getSiteSettings,
    initialData: getCachedSiteSettings,
  });

  // Prevent flash of empty/uninitialized layout on cold start before data or cache exists
  if (isLoading && !settings) {
    return <div className="min-h-screen bg-white" />;
  }

  const homepageCms = settings?.homepage || {};
  const heroData    = homepageCms.hero            || settings?.hero || {};
  const specialtyData = homepageCms.specialtyApp  || {};
  const pinnedData    = homepageCms.pinnedProducts || {};
  const newsletterData = homepageCms.newsletter   || {};

  // Running marquee data lives under pinnedProducts CMS key (no dummy fallbacks)
  const runningProducts =
    Array.isArray(pinnedData?.runningProducts)
      ? pinnedData.runningProducts
      : [];
  const runningEnabled = pinnedData?.runningProductsEnabled !== false;
  const runningSpeed   = pinnedData?.runningProductsSpeed || 'normal';

  return (
    <div className="min-h-screen bg-white text-[#161616] overflow-x-hidden w-full max-w-full">

      {/* 1. Hero Section — Full-Width & Viewport Height */}
      {heroData?.enabled !== false && <HeroSection heroData={heroData} />}

      {/* 2. Running Products Marquee — Standalone ticker below Hero */}
      {runningEnabled && (
        <RunningProductsTicker
          products={runningProducts}
          speed={runningSpeed}
          enabled={runningEnabled}
        />
      )}

      {/* 3. In-Store App Showcase & Interactive Phone Feed */}
      {specialtyData?.enabled !== false && (
        <AppBentoSection
          specialtyData={specialtyData}
          onOpenFleetModal={onOpenFleet}
        />
      )}

      {/* 4. Pinned Products Polaroid Board */}
      {pinnedData?.enabled !== false && <PinnedProductsSection pinnedData={pinnedData} />}

      {/* 5. Newsletter & Community Sign-up */}
      {newsletterData?.enabled !== false && <NewsletterSection newsletterData={newsletterData} />}

    </div>
  );
}
