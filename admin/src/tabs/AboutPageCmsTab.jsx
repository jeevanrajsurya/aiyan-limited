import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import {
  Save,
  RotateCcw,
  Layout,
  Sparkles,
  Upload,
  Video,
  Image as ImageIcon,
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Info,
  Loader2,
  Coffee,
  Tag,
  Zap,
  HeartHandshake,
  ShoppingBag,
  Camera,
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
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Check,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sun,
  Moon,
  Palette,
  Eye,
  EyeOff,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DEFAULT_ABOUT_CMS = {
  hero: {
    enabled: true,
    headlineLine1: 'Every Journey Starts Here.',
    headlineLine2: 'Fresh Food. Quality Fuel. Friendly Local Service.',
    buttonText: 'Our Community Story',
    buttonLink: '#story',
    bgMediaUrl:
      'https://img1.wsimg.com/isteam/ip/ea6df9f7-aa7e-4815-80af-46c36ca892fd/WhatsApp%20Image%202024-03-09%20at%2016.32.23%20(1).jpeg',
    bgMediaType: 'image',
    textColor: 'white',
    overlayStyle: 'gradient',
  },
  storySection: {
    enabled: true,
    tagline: 'OUR HERITAGE & COMMUNITY',
    title: "We're Not Just a Store; We're a Part of Your Community",
    description:
      'At S&B Retail, we take immense pride in powering everyday journeys across our neighbourhood. Partnered with Londis, we combine the reliability of top-tier Jet forecourt fuels with a warm, welcoming community supermarket experience. Whether you need fuel, fresh Costa coffee on your morning commute, a quick lunchtime meal deal, or weekly groceries close to home, our dedicated team is always here with a friendly smile.',
    imageUrl:
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    mediaWidth: 'half',
    buttonText: 'Get Directions (SR6 7PQ)',
    buttonLink: '/contact',
    addressText: 'Cleadon Forecourt, SR6 7PQ',
    highlights: [
      {
        id: 'hl-1',
        title: 'Open 7 Days a Week',
        desc: 'Convenient daily forecourt hours',
        icon: 'Clock',
      },
      {
        id: 'hl-2',
        title: 'Costa Express Barista',
        desc: 'Fresh whole-bean artisan coffee',
        icon: 'Coffee',
      },
      {
        id: 'hl-3',
        title: 'Jet Forecourt Fuels',
        desc: 'High-performance Unleaded & Diesel',
        icon: 'Fuel',
      },
      {
        id: 'hl-4',
        title: 'Uber Eats & Deliveroo',
        desc: 'Fast grocery delivery to your door',
        icon: 'ShoppingBag',
      },
    ],
  },
  featuresSection: {
    enabled: true,
    tagline: 'WHAT SETS US APART',
    title: 'Our 7 Pillars of Convenience',
    subtitle:
      'Everything you need under one welcoming roof — fresh food, great deals, and friendly local forecourt service 24/7.',
    features: [
      {
        id: 'feat-1',
        title: 'Food to Go & Costa Coffee',
        description:
          'We take pride in offering delicious Breakfast Deals, artisan Lunch Combos, and freshly brewed barista Costa Express Coffee.',
      },
      {
        id: 'feat-2',
        title: 'Monthly Special Offers',
        description:
          'Embrace generous monthly deals, promotional bundles, and seasonal discounts designed to keep your family budget smiling.',
      },
      {
        id: 'feat-3',
        title: 'Convenience Redefined',
        description:
          'Forget the hassle and long queues of big-box supermarkets. Find what you need in seconds, from quick snacks to full dinners.',
      },
      {
        id: 'feat-4',
        title: 'Friendly Local Service',
        description:
          'Our warm, attentive team is dedicated to making every forecourt and in-store visit pleasant, helpful, and welcoming.',
      },
      {
        id: 'feat-5',
        title: 'Daily Essentials & Pantry',
        description:
          'Fully stocked aisles with everyday essentials from trusted household brands — toiletries, milk, bakery, chilled foods, and cleaning goods.',
      },
      {
        id: 'feat-6',
        title: "Jack's Value Range",
        description:
          "Enjoy exceptional savings with our Jack's products range. High quality meets everyday affordability on pantry must-haves.",
      },
      {
        id: 'feat-7',
        title: 'Online Ordering & Delivery',
        description:
          'Can’t make it to the store? No problem! Order your favorite groceries and treats directly to your doorstep via Uber Eats and Deliveroo.',
      },
    ],
  },
  gallerySection: {
    enabled: true,
    images: [
      {
        id: 'gal-1',
        url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Jet Petrol Station Canopy at Night',
      },
      {
        id: 'gal-2',
        url: 'https://img1.wsimg.com/isteam/ip/ea6df9f7-aa7e-4815-80af-46c36ca892fd/WhatsApp%20Image%202024-03-09%20at%2016.32.23%20(1).jpeg',
        alt: 'Londis Supermarket Forecourt Store',
      },
      {
        id: 'gal-3',
        url: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=1200&q=80',
        alt: 'Modern Fuel Station Night View',
      },
    ],
  },
  hygieneSection: {
    enabled: true,
    title: 'Food & Hygiene Rating: 5 Out of 5',
    subtitle:
      'We are proud to hold a perfect 5-star rating in food hygiene and safety from food standards inspection authorities.',
    description:
      'Our relentless commitment to cleanliness, proper refrigeration, and strict hygiene protocols ensures every forecourt visit is safe, spotless, and enjoyable. From our Costa preparation areas to customer facilities, you can trust our products meet the highest national standards.',
    imageUrl:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    protocols: [
      {
        id: 'prot-1',
        tag: 'Cold Chain Protocol',
        title: 'Sub-5°C Active Chilling & Dairy Governance',
        desc: 'Continuous electronic telemetry across all dairy, deli, and pre-packaged sandwiches. Digital temperature logging guarantees zero break in the critical refrigeration chain.',
        icon: 'Sparkles',
        status: 'Continuously Logged',
      },
      {
        id: 'prot-2',
        tag: 'Barista Certification',
        title: 'Certified Costa Coffee Sanitisation Routine',
        desc: 'Hospital-grade steam wand purging after every espresso pour, daily chemical milk-line descaling, and scheduled Brita carbon water filtration exchange.',
        icon: 'Coffee',
        status: 'Barista Certified',
      },
      {
        id: 'prot-3',
        tag: 'Facility Sanitation',
        title: 'Hourly Customer Restroom & Touchpoint Care',
        desc: 'Scheduled sanitation cycles spanning customer restrooms, food preparation surfaces, and checkout touchpoints with antibacterial hospital-grade solutions.',
        icon: 'ShieldCheck',
        status: 'Hourly Audit Cycles',
      },
      {
        id: 'prot-4',
        tag: 'Independent Audit',
        title: 'Food Standards Agency Full Code Compliance',
        desc: 'Exemplary environmental health standards with full allergen labelling, proper stock rotation (FIFO), and continuous staff hygiene safety accreditations.',
        icon: 'CheckCircle2',
        status: 'Full Code Compliance',
      },
    ],
  },
};

const AVAILABLE_ICONS = [
  'Coffee',
  'Tag',
  'Zap',
  'HeartHandshake',
  'ShoppingBag',
  'Sparkles',
  'Truck',
  'CreditCard',
  'Trophy',
  'Flame',
  'Droplets',
  'Wind',
  'Gauge',
  'Package',
  'Fuel',
  'Wrench',
  'Gift',
  'ShieldCheck',
  'CheckCircle2',
  'MapPin',
  'Clock',
  'Check',
];

export default function AboutPageCmsTab() {
  const queryClient = useQueryClient();
  const [activeSubtab, setActiveSubtab] = useState('hero');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingStory, setUploadingStory] = useState(false);
  const [uploadingHygiene, setUploadingHygiene] = useState(false);
  const [uploadingGalleryIdx, setUploadingGalleryIdx] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_ABOUT_CMS);

  // Fetch CMS data from backend
  const { data, isLoading } = useQuery({
    queryKey: ['cms-about-page'],
    queryFn: () => getSettingByKey('about_page_cms'),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data?.value) {
      setFormData({
        hero: {
          ...DEFAULT_ABOUT_CMS.hero,
          ...(data.value.hero || {}),
        },
        storySection: {
          ...DEFAULT_ABOUT_CMS.storySection,
          ...(data.value.storySection || {}),
        },
        featuresSection: {
          ...DEFAULT_ABOUT_CMS.featuresSection,
          ...(data.value.featuresSection || {}),
          features: Array.isArray(data.value.featuresSection?.features)
            ? data.value.featuresSection.features
            : DEFAULT_ABOUT_CMS.featuresSection.features,
        },
        gallerySection: {
          ...DEFAULT_ABOUT_CMS.gallerySection,
          ...(data.value.gallerySection || {}),
          images:
            Array.isArray(data.value.gallerySection?.images) && data.value.gallerySection.images.length > 0
              ? data.value.gallerySection.images
              : DEFAULT_ABOUT_CMS.gallerySection.images,
        },
        hygieneSection: {
          ...DEFAULT_ABOUT_CMS.hygieneSection,
          ...(data.value.hygieneSection || {}),
          protocols: Array.isArray(data.value.hygieneSection?.protocols)
            ? data.value.hygieneSection.protocols
            : DEFAULT_ABOUT_CMS.hygieneSection.protocols,
        },
      });
    }
  }, [data]);

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: (updatedData) => updateSetting('about_page_cms', updatedData),
    onSuccess: (savedResult) => {
      queryClient.invalidateQueries({ queryKey: ['cms-about-page'] });
      queryClient.invalidateQueries({ queryKey: ['about-page-cms'] });
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      if (savedResult?.setting?.value) {
        setFormData((prev) => ({ ...prev, ...savedResult.setting.value }));
        try {
          localStorage.setItem('sb_about_cms_cache', JSON.stringify(savedResult.setting.value));
        } catch (_) {}
      }
      toast.success('About Us Page CMS updated successfully!');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to update About Page CMS');
    },
  });

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  const handleReset = () => {
    if (window.confirm('Reset all About Us page content to default Jet Cleadon forecourt settings?')) {
      setFormData(DEFAULT_ABOUT_CMS);
      toast.info('Reset to defaults. Click "Save Changes" to apply.');
    }
  };

  // Hero Media Upload
  const handleHeroMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingHero(true);
      const res = await uploadImage(file);
      const isVid = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);
      setFormData((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          bgMediaUrl: res.url,
          bgMediaType: isVid ? 'video' : 'image',
        },
      }));
      toast.success(isVid ? 'Hero video uploaded!' : 'Hero image uploaded!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Hero media upload failed');
    } finally {
      setUploadingHero(false);
      e.target.value = '';
    }
  };

  // Story Media Upload (Image or Video)
  const handleStoryMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingStory(true);
      const res = await uploadImage(file);
      const isVid = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);
      setFormData((prev) => ({
        ...prev,
        storySection: {
          ...prev.storySection,
          imageUrl: res.url,
          mediaType: isVid ? 'video' : 'image',
        },
      }));
      toast.success(isVid ? 'Story video uploaded successfully!' : 'Story image uploaded successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Story media upload failed');
    } finally {
      setUploadingStory(false);
      e.target.value = '';
    }
  };

  // Hygiene Showcase Image Upload
  const handleHygieneImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingHygiene(true);
      const res = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        hygieneSection: {
          ...prev.hygieneSection,
          imageUrl: res.url,
        },
      }));
      toast.success('Hygiene showcase image uploaded successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Image upload failed');
    } finally {
      setUploadingHygiene(false);
      e.target.value = '';
    }
  };

  // Gallery Image Upload (3 Photos)
  const handleGalleryImageUpload = async (e, imageIndex) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingGalleryIdx(imageIndex);
      const res = await uploadImage(file);
      setFormData((prev) => {
        const defaultImages = DEFAULT_ABOUT_CMS.gallerySection.images;
        const currentImages = [
          ...(prev.gallerySection?.images?.length ? prev.gallerySection.images : defaultImages),
        ];
        if (currentImages[imageIndex]) {
          currentImages[imageIndex] = {
            ...currentImages[imageIndex],
            url: res.url,
          };
        }
        return {
          ...prev,
          gallerySection: {
            ...prev.gallerySection,
            images: currentImages,
          },
        };
      });
      toast.success(`Gallery photo ${imageIndex + 1} uploaded successfully!`);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Gallery image upload failed');
    } finally {
      setUploadingGalleryIdx(null);
      e.target.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#005f73]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar with Save & Reset */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Layout className="w-6 h-6 text-[#005f73]" />
            About Us / Forecourt Heritage CMS
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage your Jet Cleadon forecourt hero, community story, 7 convenience pillars, and 5-star hygiene credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#005f73] hover:bg-[#071e26] rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'hero', label: '1. Forecourt Hero & Location' },
          { id: 'story', label: '2. Our Community Story' },
          { id: 'features', label: '3. 7 Convenience Pillars' },
          { id: 'gallery', label: '4. Forecourt Gallery (3 Photos)' },
          { id: 'hygiene', label: '5. 5-Star Food Hygiene' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubtab(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSubtab === tab.id
                ? 'bg-[#005f73] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: FORECOURT HERO & LOCATION IDENTITY                              */}
      {/* ========================================================================= */}
      {activeSubtab === 'hero' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#005f73]" />
                Forecourt Hero &amp; Identity
              </h3>
              <p className="text-xs text-slate-500">
                Full-bleed hero banner, location badge, headlines, and call-to-action buttons.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, enabled: prev.hero.enabled === false ? true : false },
                }))
              }
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
                formData.hero.enabled !== false
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                  : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
              }`}
            >
              {formData.hero.enabled !== false ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Active on Website</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hidden / Removed</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Headline Line 1 (Fuel Callout) */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Headline Line 1 (Main Fuel / Brand Callout)</label>
              <input
                type="text"
                value={formData.hero.headlineLine1 ?? formData.hero.title ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, headlineLine1: e.target.value, title: e.target.value },
                  }))
                }
                placeholder="e.g. Every Journey Starts Here."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none font-semibold"
              />
            </div>

            {/* Headline Line 2 (App Callout / Narrative) */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Headline Line 2 (Secondary Subtitle / App Callout)</label>
              <textarea
                rows={2}
                value={formData.hero.headlineLine2 ?? formData.hero.subtitle ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, headlineLine2: e.target.value, subtitle: e.target.value },
                  }))
                }
                placeholder="e.g. Fresh Food. Quality Fuel. Friendly Local Service."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            {/* Button Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Button Text</label>
              <input
                type="text"
                value={formData.hero.buttonText ?? formData.hero.ctaPrimaryText ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, buttonText: e.target.value, ctaPrimaryText: e.target.value },
                  }))
                }
                placeholder="e.g. Our Community Story"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none font-semibold"
              />
            </div>

            {/* Button Target Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Button Target Link</label>
              <input
                type="text"
                value={formData.hero.buttonLink ?? formData.hero.ctaPrimaryLink ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, buttonLink: e.target.value, ctaPrimaryLink: e.target.value },
                  }))
                }
                placeholder="e.g. #story or /contact"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            {/* Text Color & Overlay Style matching Homepage Hero section */}
            <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">Hero Text Color:</span>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  {[
                    { id: 'white', label: 'White (#FFFFFF) (Recommended for Media)' },
                    { id: 'dark', label: 'Dark (#161616)' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                      <input
                        type="radio"
                        name="aboutHeroTextColor"
                        value={opt.id}
                        checked={(formData.hero.textColor || 'white') === opt.id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, textColor: e.target.value },
                          }))
                        }
                        className="text-[#005f73] focus:ring-[#005f73] accent-[#005f73]"
                      />
                      <span className="font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/70">
                <span className="text-xs font-bold text-slate-800 block">Background Gradient Tint:</span>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  {[
                    { id: 'gradient', label: 'Soft Gradient (Conoco Style)' },
                    { id: 'none', label: 'None (100% Brightness)' },
                    { id: 'dark', label: 'Dark Tint' },
                  ].map((tint) => (
                    <label key={tint.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                      <input
                        type="radio"
                        name="aboutHeroOverlayStyle"
                        value={tint.id}
                        checked={(formData.hero.overlayStyle || 'gradient') === tint.id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, overlayStyle: e.target.value },
                          }))
                        }
                        className="text-[#005f73] focus:ring-[#005f73] accent-[#005f73]"
                      />
                      <span className="font-medium">{tint.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Background Media URL & Upload */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Forecourt Background Image or Video URL</label>
                <div className="flex items-center gap-3">
                  {formData.hero.bgMediaUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, bgMediaUrl: '' },
                        }))
                      }
                      className="text-xs text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove Image
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          bgMediaUrl: DEFAULT_ABOUT_CMS.hero.bgMediaUrl,
                          bgMediaType: DEFAULT_ABOUT_CMS.hero.bgMediaType,
                        },
                      }))
                    }
                    className="text-xs text-[#005f73] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Default
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.hero.bgMediaUrl ?? ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, bgMediaUrl: e.target.value },
                    }))
                  }
                  placeholder="https://... (Leave empty to display solid background color)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                />
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors">
                  {uploadingHero ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Upload
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleHeroMediaUpload}
                    className="hidden"
                    disabled={uploadingHero}
                  />
                </label>
              </div>

              {formData.hero.bgMediaUrl && (
                <div className="w-full max-w-md h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 mt-2 relative group">
                  <img
                    src={formData.hero.bgMediaUrl}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, bgMediaUrl: '' },
                      }))
                    }
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: OUR COMMUNITY STORY                                             */}
      {/* ========================================================================= */}
      {activeSubtab === 'story' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#005f73]" />
                Our Community Story &amp; Londis Heritage
              </h3>
              <p className="text-xs text-slate-500">
                Executive story card with image/video display, community narrative, and highlight points.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  storySection: {
                    ...prev.storySection,
                    enabled: prev.storySection.enabled === false ? true : false,
                  },
                }))
              }
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
                formData.storySection.enabled !== false
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                  : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
              }`}
            >
              {formData.storySection.enabled !== false ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Active on Website</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hidden / Removed</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Small Tagline (Leave empty to remove)</label>
              <input
                type="text"
                value={formData.storySection.tagline ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storySection: { ...prev.storySection, tagline: e.target.value },
                  }))
                }
                placeholder="e.g. OUR HERITAGE & COMMUNITY"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Story Title</label>
              <input
                type="text"
                value={formData.storySection.title ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storySection: { ...prev.storySection, title: e.target.value },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Story Narrative Paragraph</label>
              <textarea
                rows={4}
                value={formData.storySection.description ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storySection: { ...prev.storySection, description: e.target.value },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Button Label (Leave empty to remove button)</label>
              <input
                type="text"
                value={formData.storySection.buttonText ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storySection: { ...prev.storySection, buttonText: e.target.value },
                  }))
                }
                placeholder="e.g. Get Directions (SR6 7PQ)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Button Link</label>
              <input
                type="text"
                value={formData.storySection.buttonLink ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storySection: { ...prev.storySection, buttonLink: e.target.value },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Forecourt Address Label (Leave empty to remove)</label>
              <input
                type="text"
                value={formData.storySection.addressText ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storySection: { ...prev.storySection, addressText: e.target.value },
                  }))
                }
                placeholder="e.g. Cleadon Forecourt, SR6 7PQ"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            {/* Story Showcase Media (Image or Video) */}
            <div className="space-y-3 md:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#005f73]" />
                    Left Side Showcase Media (Video & Image Supported)
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Upload or link an MP4/WebM video or high-res photo. Framed by the 4-edge architectural backdrop.
                  </p>
                </div>
                {/* Media Type Switcher */}
                <div className="inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                  {[
                    { value: 'auto', label: 'Auto' },
                    { value: 'image', label: 'Image' },
                    { value: 'video', label: 'Video' },
                  ].map((t) => {
                    const currentType = formData.storySection.mediaType || 'auto';
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            storySection: { ...prev.storySection, mediaType: t.value },
                          }))
                        }
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          currentType === t.value
                            ? 'bg-[#005f73] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.storySection.imageUrl ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const isVid = /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(val);
                    setFormData((prev) => ({
                      ...prev,
                      storySection: {
                        ...prev.storySection,
                        imageUrl: val,
                        mediaType: isVid ? 'video' : prev.storySection.mediaType || 'auto',
                      },
                    }));
                  }}
                  placeholder="https://... (Image or Video URL)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                />
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors shrink-0 shadow-2xs">
                  {uploadingStory ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-[#005f73]" />}
                  Upload Media
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleStoryMediaUpload}
                    className="hidden"
                    disabled={uploadingStory}
                  />
                </label>
                {formData.storySection.imageUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        storySection: { ...prev.storySection, imageUrl: '' },
                      }))
                    }
                    className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 shrink-0"
                    title="Remove Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                )}
              </div>

              {formData.storySection.imageUrl && (
                <div className="w-full max-w-sm h-52 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 mt-2 relative group">
                  {formData.storySection.mediaType === 'video' ||
                  /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(formData.storySection.imageUrl) ? (
                    <video
                      src={formData.storySection.imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={formData.storySection.imageUrl}
                      alt="Story Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        storySection: { ...prev.storySection, imageUrl: '' },
                      }))
                    }
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                    title="Remove Media"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Media Card Width Selector */}
              <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-800">Media Card Width Proportion</label>
                  <p className="text-[11px] text-slate-500">
                    Adjust how wide the left media card appears relative to the right narrative.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                  {[
                    { value: 'half', label: 'Balanced (50% / 50%)' },
                    { value: 'wide', label: 'Extra Wide (58% / 42%)' },
                    { value: 'compact', label: 'Compact (42% / 58%)' },
                  ].map((w) => {
                    const currentW = formData.storySection.mediaWidth || 'half';
                    return (
                      <button
                        key={w.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            storySection: { ...prev.storySection, mediaWidth: w.value },
                          }))
                        }
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          currentW === w.value
                            ? 'bg-[#005f73] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {w.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Highlights List Manager (Add, Edit, Reorder, Delete) */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Feature Highlights Cards (Zero Dots)
                </h4>
                <p className="text-xs text-slate-500">
                  Edit, reorder, or delete cards. If you delete all cards, the feature grid is hidden.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newId = `hl-${Date.now()}`;
                  setFormData((prev) => ({
                    ...prev,
                    storySection: {
                      ...prev.storySection,
                      highlights: [
                        ...(prev.storySection.highlights || []),
                        {
                          id: newId,
                          title: 'New Service Highlight',
                          desc: 'Description of this forecourt capability or offering',
                          icon: 'Clock',
                        },
                      ],
                    },
                  }));
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#005f73] text-white rounded-xl text-xs font-bold hover:bg-[#071e26] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Highlight Card
              </button>
            </div>

            <div className="space-y-3">
              {formData.storySection.highlights?.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Highlight Card #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      {/* Move Up */}
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const list = [...(formData.storySection.highlights || [])];
                          const temp = list[idx - 1];
                          list[idx - 1] = list[idx];
                          list[idx] = temp;
                          setFormData((prev) => ({
                            ...prev,
                            storySection: { ...prev.storySection, highlights: list },
                          }));
                        }}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      {/* Move Down */}
                      <button
                        type="button"
                        disabled={idx === (formData.storySection.highlights || []).length - 1}
                        onClick={() => {
                          const list = [...(formData.storySection.highlights || [])];
                          const temp = list[idx + 1];
                          list[idx + 1] = list[idx];
                          list[idx] = temp;
                          setFormData((prev) => ({
                            ...prev,
                            storySection: { ...prev.storySection, highlights: list },
                          }));
                        }}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          const list = (formData.storySection.highlights || []).filter((_, i) => i !== idx);
                          setFormData((prev) => ({
                            ...prev,
                            storySection: { ...prev.storySection, highlights: list },
                          }));
                        }}
                        className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                        title="Delete Card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5 space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Card Title</label>
                      <input
                        type="text"
                        value={item.title ?? ''}
                        onChange={(e) => {
                          const list = [...(formData.storySection.highlights || [])];
                          list[idx] = { ...list[idx], title: e.target.value };
                          setFormData((prev) => ({
                            ...prev,
                            storySection: { ...prev.storySection, highlights: list },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-4 space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Card Subtitle / Description</label>
                      <input
                        type="text"
                        value={item.desc ?? ''}
                        onChange={(e) => {
                          const list = [...(formData.storySection.highlights || [])];
                          list[idx] = { ...list[idx], desc: e.target.value };
                          setFormData((prev) => ({
                            ...prev,
                            storySection: { ...prev.storySection, highlights: list },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Icon</label>
                      <select
                        value={item.icon ?? 'Clock'}
                        onChange={(e) => {
                          const list = [...(formData.storySection.highlights || [])];
                          list[idx] = { ...list[idx], icon: e.target.value };
                          setFormData((prev) => ({
                            ...prev,
                            storySection: { ...prev.storySection, highlights: list },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                      >
                        {AVAILABLE_ICONS.map((ic) => (
                          <option key={ic} value={ic}>
                            {ic}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {(!formData.storySection.highlights || formData.storySection.highlights.length === 0) && (
                <div className="p-4 text-center border border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                  No highlight cards added. Click "Add Highlight Card" above to add one.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: 7 PILLARS OF CONVENIENCE                                        */}
      {/* ========================================================================= */}
      {activeSubtab === 'features' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#005f73]" />
                The 7 Pillars of In-Store Convenience
              </h3>
              <p className="text-xs text-slate-500">
                Architectural bento grid showcasing convenience store services, coffee, bakery, and car care.
              </p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    featuresSection: {
                      ...prev.featuresSection,
                      enabled: prev.featuresSection.enabled === false ? true : false,
                    },
                  }))
                }
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  formData.featuresSection.enabled !== false
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                    : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
                }`}
              >
                {formData.featuresSection.enabled !== false ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Active on Website</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden / Removed</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  const newId = `feat-${Date.now()}`;
                  setFormData((prev) => ({
                    ...prev,
                    featuresSection: {
                      ...prev.featuresSection,
                      features: [
                        ...(prev.featuresSection.features || []),
                        {
                          id: newId,
                          title: 'New Convenience Feature',
                          description: 'Feature details and customer benefits description.',
                          badge: 'Fresh Daily',
                          icon: 'Sparkles',
                        },
                      ],
                    },
                  }));
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#005f73] text-white rounded-xl text-xs font-bold hover:bg-[#071e26] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Pillar Card
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Small Tagline (Leave empty to remove)</label>
              <input
                type="text"
                value={formData.featuresSection.tagline ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featuresSection: { ...prev.featuresSection, tagline: e.target.value },
                  }))
                }
                placeholder="e.g. WHAT SETS US APART"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Section Title</label>
              <input
                type="text"
                value={formData.featuresSection.title ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featuresSection: { ...prev.featuresSection, title: e.target.value },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Section Subtitle / Description</label>
              <textarea
                rows={2}
                value={formData.featuresSection.subtitle ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featuresSection: { ...prev.featuresSection, subtitle: e.target.value },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {formData.featuresSection?.features?.map((feat, idx) => (
              <div
                key={feat.id || idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Pillar #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => {
                        const list = [...formData.featuresSection.features];
                        const temp = list[idx - 1];
                        list[idx - 1] = list[idx];
                        list[idx] = temp;
                        setFormData((prev) => ({
                          ...prev,
                          featuresSection: { ...prev.featuresSection, features: list },
                        }));
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={idx === formData.featuresSection.features.length - 1}
                      onClick={() => {
                        const list = [...formData.featuresSection.features];
                        const temp = list[idx + 1];
                        list[idx + 1] = list[idx];
                        list[idx] = temp;
                        setFormData((prev) => ({
                          ...prev,
                          featuresSection: { ...prev.featuresSection, features: list },
                        }));
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => {
                        const list = formData.featuresSection.features.filter((_, i) => i !== idx);
                        setFormData((prev) => ({
                          ...prev,
                          featuresSection: { ...prev.featuresSection, features: list },
                        }));
                      }}
                      className="p-1 text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Pillar Title</label>
                    <input
                      type="text"
                      value={feat.title ?? ''}
                      onChange={(e) => {
                        const list = [...formData.featuresSection.features];
                        list[idx] = { ...list[idx], title: e.target.value };
                        setFormData((prev) => ({
                          ...prev,
                          featuresSection: { ...prev.featuresSection, features: list },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Pillar Description</label>
                    <textarea
                      rows={2}
                      value={feat.description ?? ''}
                      onChange={(e) => {
                        const list = [...formData.featuresSection.features];
                        list[idx] = { ...list[idx], description: e.target.value };
                        setFormData((prev) => ({
                          ...prev,
                          featuresSection: { ...prev.featuresSection, features: list },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: FORECOURT & STOREFRONT GALLERY (3 FULL-WIDTH PHOTOS)             */}
      {/* ========================================================================= */}
      {activeSubtab === 'gallery' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#005f73]" />
                Forecourt &amp; Storefront Showcase (3 Full-Width Photos)
              </h3>
              <p className="text-xs text-slate-500">
                Full-width 3-image triptych displaying your forecourt canopy, pumps, and Londis storefront between 7 Pillars and Food Hygiene.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  gallerySection: {
                    ...prev.gallerySection,
                    enabled: prev.gallerySection?.enabled === false ? true : false,
                  },
                }))
              }
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
                formData.gallerySection?.enabled !== false
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                  : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
              }`}
            >
              {formData.gallerySection?.enabled !== false ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Active on Website</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hidden / Removed</span>
                </>
              )}
            </button>
          </div>

          {/* 3 Dedicated Photo Cards Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span>The 3 Panoramic Full-Width Photos</span>
              <span className="text-[10px] font-normal text-slate-500 lowercase">(displayed side-by-side on desktop)</span>
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((idx) => {
                const img = (formData.gallerySection?.images || DEFAULT_ABOUT_CMS.gallerySection.images)[idx] || {};
                const panelLabels = [
                  'Panel 01: Left Angle (Canopy & Store)',
                  'Panel 02: Center Angle (Pumps & Storefront)',
                  'Panel 03: Right Angle (Price Totem & Store)',
                ];

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-bold text-slate-800 font-founders uppercase tracking-wider">
                          {panelLabels[idx]}
                        </span>
                        <span className="text-[10px] font-bold text-[#005f73] bg-[#005f73]/10 px-2 py-0.5 rounded">
                          Photo {idx + 1} of 3
                        </span>
                      </div>

                      {/* Image Thumbnail Preview */}
                      <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-inner">
                        {img.url ? (
                          <img
                            src={img.url}
                            alt={img.alt || `Photo ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                            <ImageIcon className="w-8 h-8 mb-2 stroke-[1.5]" />
                            <span className="text-xs font-semibold">No Image Selected</span>
                            <span className="text-[10px] text-slate-400 mt-1">Upload a photo or paste a URL</span>
                          </div>
                        )}

                        {uploadingGalleryIdx === idx && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
                            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                            <span className="text-xs font-bold">Uploading photo...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image Controls */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      {/* Upload Button */}
                      <div>
                        <label className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-[#005f73] bg-slate-50 hover:bg-[#005f73]/5 text-slate-700 hover:text-[#005f73] text-xs font-bold cursor-pointer transition-colors shadow-2xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload From Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingGalleryIdx === idx}
                            onChange={(e) => handleGalleryImageUpload(e, idx)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Image URL Input */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Or Paste Image URL (Web / Cloud)</label>
                        <input
                          type="text"
                          value={img.url ?? ''}
                          onChange={(e) => {
                            const defaultImages = DEFAULT_ABOUT_CMS.gallerySection.images;
                            const currentImages = [
                              ...(formData.gallerySection?.images?.length
                                ? formData.gallerySection.images
                                : defaultImages),
                            ];
                            currentImages[idx] = {
                              ...(currentImages[idx] || {}),
                              url: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              gallerySection: { ...prev.gallerySection, images: currentImages },
                            }));
                          }}
                          placeholder="https://images.unsplash.com/... or image link"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                        />
                      </div>

                      {/* Reset to Default Button */}
                      <div className="pt-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const defaultImages = DEFAULT_ABOUT_CMS.gallerySection.images;
                            const currentImages = [
                              ...(formData.gallerySection?.images?.length
                                ? formData.gallerySection.images
                                : defaultImages),
                            ];
                            currentImages[idx] = { ...DEFAULT_ABOUT_CMS.gallerySection.images[idx] };
                            setFormData((prev) => ({
                              ...prev,
                              gallerySection: { ...prev.gallerySection, images: currentImages },
                            }));
                            toast.success(`Photo 0${idx + 1} reset to default`);
                          }}
                          className="text-[11px] font-medium text-slate-400 hover:text-slate-600 inline-flex items-center gap-1 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset Photo 0{idx + 1}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 5: 5-STAR FOOD HYGIENE & SAFETY                                    */}
      {/* ========================================================================= */}
      {activeSubtab === 'hygiene' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Official 5-Star Food Hygiene &amp; Safety Showcase
              </h3>
              <p className="text-xs text-slate-500">
                Food standards rating plaque, inspection ledger, and sanitation compliance protocols.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  hygieneSection: {
                    ...prev.hygieneSection,
                    enabled: prev.hygieneSection.enabled === false ? true : false,
                  },
                }))
              }
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
                formData.hygieneSection.enabled !== false
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                  : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
              }`}
            >
              {formData.hygieneSection.enabled !== false ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Active on Website</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hidden / Removed</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Section Title</label>
              <input
                type="text"
                value={formData.hygieneSection.title ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hygieneSection: { ...prev.hygieneSection, title: e.target.value },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Subtitle / Guarantee Headline</label>
              <input
                type="text"
                value={formData.hygieneSection.subtitle ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hygieneSection: { ...prev.hygieneSection, subtitle: e.target.value },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Hygiene & Safety Detail Description</label>
              <textarea
                rows={3}
                value={formData.hygieneSection.description ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hygieneSection: { ...prev.hygieneSection, description: e.target.value },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            {/* Showcase Image Upload */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Showcase Image (Certificate or Store Photo)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.hygieneSection.imageUrl ?? ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hygieneSection: { ...prev.hygieneSection, imageUrl: e.target.value },
                    }))
                  }
                  placeholder="https://... or upload image"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                />
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors">
                  {uploadingHygiene ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHygieneImageUpload}
                    className="hidden"
                    disabled={uploadingHygiene}
                  />
                </label>
                {formData.hygieneSection.imageUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hygieneSection: { ...prev.hygieneSection, imageUrl: '' },
                      }))
                    }
                    className="px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              {formData.hygieneSection.imageUrl && (
                <div className="mt-2 w-full max-w-xs h-36 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
                  <img
                    src={formData.hygieneSection.imageUrl}
                    alt="Hygiene Showcase Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Right-Side Standard Operating Protocols Manager */}
            <div className="md:col-span-2 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Right-Side Standard Operating Protocols Ledger
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure the linear specification ledger displayed on the right side of the Food Hygiene showcase.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newProt = {
                      id: `prot-${Date.now()}`,
                      tag: 'Operational Standard',
                      title: 'New Operating Protocol',
                      desc: 'Describe the hygiene procedure, monitoring standard, or sanitation routine here.',
                      icon: 'CheckCircle2',
                      status: 'Active Protocol',
                    };
                    setFormData((prev) => ({
                      ...prev,
                      hygieneSection: {
                        ...prev.hygieneSection,
                        protocols: [...(prev.hygieneSection?.protocols || []), newProt],
                      },
                    }));
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add Protocol
                </button>
              </div>

              {/* Protocols List */}
              <div className="space-y-4">
                {(formData.hygieneSection?.protocols || []).map((prot, idx) => (
                  <div
                    key={prot.id || idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        Protocol #{idx + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        {/* Move Up */}
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const list = [...(formData.hygieneSection?.protocols || [])];
                            const temp = list[idx - 1];
                            list[idx - 1] = list[idx];
                            list[idx] = temp;
                            setFormData((prev) => ({
                              ...prev,
                              hygieneSection: { ...prev.hygieneSection, protocols: list },
                            }));
                          }}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        {/* Move Down */}
                        <button
                          type="button"
                          disabled={idx === (formData.hygieneSection?.protocols || []).length - 1}
                          onClick={() => {
                            const list = [...(formData.hygieneSection?.protocols || [])];
                            const temp = list[idx + 1];
                            list[idx + 1] = list[idx];
                            list[idx] = temp;
                            setFormData((prev) => ({
                              ...prev,
                              hygieneSection: { ...prev.hygieneSection, protocols: list },
                            }));
                          }}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => {
                            const list = (formData.hygieneSection?.protocols || []).filter((_, i) => i !== idx);
                            setFormData((prev) => ({
                              ...prev,
                              hygieneSection: { ...prev.hygieneSection, protocols: list },
                            }));
                          }}
                          className="p-1 text-rose-500 hover:text-rose-700"
                          title="Delete Protocol"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-slate-700">Protocol Title</label>
                        <input
                          type="text"
                          value={prot.title ?? ''}
                          onChange={(e) => {
                            const list = [...(formData.hygieneSection?.protocols || [])];
                            list[idx] = { ...list[idx], title: e.target.value };
                            setFormData((prev) => ({
                              ...prev,
                              hygieneSection: { ...prev.hygieneSection, protocols: list },
                            }));
                          }}
                          placeholder="e.g. Sub-5°C Active Chilling & Dairy Governance"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Category Tag</label>
                        <input
                          type="text"
                          value={prot.tag ?? ''}
                          onChange={(e) => {
                            const list = [...(formData.hygieneSection?.protocols || [])];
                            list[idx] = { ...list[idx], tag: e.target.value };
                            setFormData((prev) => ({
                              ...prev,
                              hygieneSection: { ...prev.hygieneSection, protocols: list },
                            }));
                          }}
                          placeholder="e.g. Cold Chain Protocol"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-slate-700">Status Badge</label>
                        <input
                          type="text"
                          value={prot.status ?? ''}
                          onChange={(e) => {
                            const list = [...(formData.hygieneSection?.protocols || [])];
                            list[idx] = { ...list[idx], status: e.target.value };
                            setFormData((prev) => ({
                              ...prev,
                              hygieneSection: { ...prev.hygieneSection, protocols: list },
                            }));
                          }}
                          placeholder="e.g. Continuously Logged / Full Code Compliance"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">Icon</label>
                        <select
                          value={prot.icon ?? 'ShieldCheck'}
                          onChange={(e) => {
                            const list = [...(formData.hygieneSection?.protocols || [])];
                            list[idx] = { ...list[idx], icon: e.target.value };
                            setFormData((prev) => ({
                              ...prev,
                              hygieneSection: { ...prev.hygieneSection, protocols: list },
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                        >
                          {AVAILABLE_ICONS.map((ic) => (
                            <option key={ic} value={ic}>
                              {ic}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1 sm:col-span-3">
                        <label className="text-[11px] font-bold text-slate-700">Description</label>
                        <textarea
                          rows={2}
                          value={prot.desc ?? ''}
                          onChange={(e) => {
                            const list = [...(formData.hygieneSection?.protocols || [])];
                            list[idx] = { ...list[idx], desc: e.target.value };
                            setFormData((prev) => ({
                              ...prev,
                              hygieneSection: { ...prev.hygieneSection, protocols: list },
                            }));
                          }}
                          placeholder="Describe the operational process or standard..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {(formData.hygieneSection?.protocols || []).length === 0 && (
                  <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-500">No protocols configured yet.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          hygieneSection: {
                            ...prev.hygieneSection,
                            protocols: DEFAULT_ABOUT_CMS.hygieneSection.protocols,
                          },
                        }));
                      }}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                    >
                      Load Default Protocols
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
