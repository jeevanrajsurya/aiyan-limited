import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import {
  Layout,
  Save,
  RotateCcw,
  Upload,
  ExternalLink,
  Smartphone,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  Film,
  Lock,
  Mail,
  Plus,
  ChevronUp,
  ChevronDown,
  Sparkles,
  RefreshCw,
  Pin,
  Play,
  Briefcase,
  GripVertical,
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || '/';

export const DEFAULT_REELS = [
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

export const DEFAULT_PINNED_CARDS = [
  {
    id: 'pin-confectionery-shelf',
    title: 'In-Store Confectionery & Sweet Shelf',
    description: '',
    buttonText: '',
    buttonLink: '',
    image: '/images/confectionery-shelf.png',
    order: 0,
    enabled: true,
  },
  {
    id: 'pin-race-fuels',
    title: 'Official Forecourt Fuel & Race Blends',
    description:
      'Engineered for maximum throttle response and engine protection across high-mileage journeys, road trips, and everyday commutes.',
    buttonText: 'GET MOTOR FUELS',
    buttonLink: '/our-products',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
    order: 1,
    enabled: true,
  },
  {
    id: 'pin-shell-tin',
    title: 'Take the Lead with Vintage Lubricants',
    description:
      'Authentic collectible oil cans, Castrol pourers, and Shell Retinax tins curated directly from classic British service stations.',
    buttonText: 'EXPLORE COLLECTIBLES',
    buttonLink: '/our-products',
    image:
      'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=1200&q=80',
    order: 1,
    enabled: true,
  },
  {
    id: 'pin-forecourt-savings',
    title: 'Forecourt Pay: Shift Into Everyday Savings',
    description:
      'Unlock instant price reductions per litre, Costa Express loyalty stamps, and special store combo discounts every time you fill up.',
    buttonText: 'VIEW REWARDS',
    buttonLink: '/our-products',
    image:
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    order: 2,
    enabled: true,
  },
  {
    id: 'pin-norton-sign',
    title: 'Classic Motoring Enamel Signs & Badges',
    description:
      'Historic AA garage plaques, authentic petroleum roadside advertising, and museum-grade memorabilia spanning the golden era of motoring.',
    buttonText: 'DISCOVER RELICS',
    buttonLink: '/our-products',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    order: 3,
    enabled: true,
  },
  {
    id: 'pin-convenience-store',
    title: 'Artisan Food & Chilled Beverages',
    description:
      'Freshly prepared morning bakery, gourmet sandwiches, and chilled refreshment ready whenever you need a quick pit stop.',
    buttonText: 'BROWSE IN-STORE',
    buttonLink: '/our-products',
    image:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    order: 4,
    enabled: true,
  },
];

export const DEFAULT_RUNNING_PRODUCTS = [
  {
    id: 'prod-shell-rotella',
    title: 'Shell Rotella Oil Jug',
    image: '/images/running-products/shell-rotella-can.png',
    link: '/our-products',
  },
  {
    id: 'prod-castrol-pourer',
    title: 'Castrol Vintage Oil Pourer',
    image: '/images/running-products/castrol-green-pourer.png',
    link: '/our-products',
  },
  {
    id: 'prod-racing-helmet',
    title: 'Classic Racing Helmet on Stand',
    image: '/images/running-products/vintage-racing-helmet.png',
    link: '/our-products',
  },
  {
    id: 'prod-burmah-helmet',
    title: 'Burmah Classic Red Helmet',
    image: '/images/running-products/burmah-red-helmet.png',
    link: '/our-products',
  },
  {
    id: 'prod-mobil-pump',
    title: 'Mobil Super Special Miniature Dispenser',
    image: '/images/running-products/mobil-vintage-pump.png',
    link: '/our-products',
  },
  {
    id: 'prod-castrol-bottle',
    title: 'Castrol Vintage Glass Oil Bottle',
    image: '/images/running-products/castrol-glass-bottle.png',
    link: '/our-products',
  },
];

export const DEFAULT_NEWSLETTER_POSITIONS = [
  'Store Associate / Cashier',
  'Forecourt Attendant',
  'Barista / Food Specialist',
  'Shift Supervisor',
  'Assistant Store Manager',
  'General Inquiry / Community',
];

export const DEFAULT_HOMEPAGE_CMS = {
  hero: {
    enabled: true,
    bgMediaUrl: '/uploads/hero-station-ref.png',
    textColor: 'white',
    overlayStyle: 'dark',
    headlineLine1: 'The fuel that lets you GO GO GO.',
    headlineLine2: 'The app that lets you SAVE SAVE SAVE.',
    buttonText: 'Download the app',
    buttonLink: 'https://onelink.to/xpxtfg',
  },
  pinnedProducts: {
    enabled: true,
    title: 'You can be part of Fergus & Gibbs history.',
    description:
      "Get in touch if you have rusty relics, tins, pourers, signs or old items for sale. We're always buying!",
    autoPlayEnabled: true,
    autoPlayInterval: 5,
    cards: DEFAULT_PINNED_CARDS,
    runningProductsEnabled: true,
    runningProductsSpeed: 'normal',
    runningProducts: DEFAULT_RUNNING_PRODUCTS,
  },
  specialtyApp: {
    enabled: true,
    title: 'Fresh Food. Cold Drinks.<br />Everyday Savings.',
    description:
      'Stop by our convenient forecourt store anytime for freshly baked artisan pastries, Costa barista coffee, chilled beverages, lunch combos, and everyday travel essentials on the go.',
    ctaText: 'Explore In-Store Products',
    ctaLink: '/our-products',
    storeHandle: 'aiyanlimited',
    storeAvatar: 'AL',
    phoneDetailsText: 'Details →',
    phoneDetailsLink: '/our-products',
    feature1Title: 'Daily Fresh Meal Deals',
    feature1Desc: 'Artisan sandwiches, warm paninis, and combo deals made fresh every morning.',
    feature2Title: 'Costa Express Barista Coffee',
    feature2Desc: '100% Arabica bean-to-cup hot espresso, lattes, and cappuccinos anytime day or night.',
    feature3Title: '24/7 Forecourt Convenience',
    feature3Desc: 'Chilled drinks, snacks, groceries, car care, and travel necessities ready when you need them.',
    reels: DEFAULT_REELS,
  },
  newsletter: {
    enabled: true,
    title: 'Get emails you actually like.',
    description:
      'With special offers and out-of-this-world trip ideas, our emails put adventure on the agenda.',
    buttonText: 'Submit',
    termsText:
      'By clicking Submit you agree to our Privacy Statement and Terms & Conditions. This site is protected by reCAPTCHA.',
    positions: DEFAULT_NEWSLETTER_POSITIONS,
  },
};

// Reusable Image & Media Uploader with Fallback, Preview, and Explicit Removal
function MediaField({ label, value, defaultValue, onChange, hint, isVideo = false, allowMedia = false }) {
  const [uploading, setUploading] = useState(false);
  const isRemoved = value === '' || value === 'none';
  const isDefault = value === undefined || value === null || value === defaultValue;
  const isCustom = Boolean(value && value !== defaultValue);

  const isVideoField =
    !allowMedia && isVideo
      ? true
      : isVideo ||
        label?.toLowerCase().includes('video') ||
        (typeof value === 'string' &&
          (value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.mov')));

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImage(file);
      onChange(res.url);
      toast.success(`${label} uploaded successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const previewSrc = isRemoved ? '' : (value || defaultValue);
  const displaySrc = previewSrc?.startsWith('http')
    ? previewSrc
    : `${API_ORIGIN}${previewSrc}`;

  const isVideoPreview =
    isVideoField ||
    previewSrc?.endsWith('.mp4') ||
    previewSrc?.endsWith('.webm') ||
    previewSrc?.endsWith('.mov');

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-slate-800 block">{label}</label>
          {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            isRemoved
              ? 'bg-rose-100 text-rose-800 border border-rose-300'
              : isDefault
              ? 'bg-slate-200 text-slate-700'
              : 'bg-amber-100 text-amber-800 border border-amber-300'
          }`}
        >
          {isRemoved
            ? isVideoField
              ? 'No Video (Removed)'
              : 'No Image (Removed)'
            : isDefault
            ? 'Default Asset'
            : isVideoField
            ? 'Custom Video'
            : 'Custom Asset'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Preview Box */}
        <div className="w-28 h-20 bg-slate-900 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center shrink-0 relative group">
          {isRemoved ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-950 p-2 text-center">
              {isVideoField ? (
                <Film className="w-6 h-6 opacity-40 mb-1" />
              ) : (
                <ImageIcon className="w-6 h-6 opacity-40 mb-1" />
              )}
              <span className="text-[10px] font-semibold">
                {isVideoField ? 'Video Removed' : 'Image Removed'}
              </span>
            </div>
          ) : isVideoPreview ? (
            <video src={displaySrc} className="w-full h-full object-cover" muted loop autoPlay />
          ) : (
            <img
              src={displaySrc}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = defaultValue?.startsWith('http')
                  ? defaultValue
                  : `${API_ORIGIN}${defaultValue || ''}`;
              }}
            />
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-2 w-full">
          <input
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              isRemoved
                ? isVideoField
                  ? '(Video removed / empty)'
                  : '(Image removed / empty)'
                : defaultValue
            }
            className="w-full text-xs font-mono px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
          />

          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors">
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#016839]" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-[#016839]" />
              )}
              <span>
                {uploading
                  ? isVideoField
                    ? 'Uploading Video...'
                    : 'Uploading...'
                  : allowMedia
                  ? 'Upload Image / Video'
                  : isVideoField
                  ? 'Upload Video'
                  : 'Upload New Image'}
              </span>
              <input
                type="file"
                className="hidden"
                accept={
                  allowMedia || isVideoField
                    ? 'image/*,video/mp4,video/webm,video/quicktime,video/*'
                    : 'image/*'
                }
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>

            {!isRemoved && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title={isVideoField ? 'Remove video from website' : 'Remove image from website'}
              >
                <Trash2 className="w-3 h-3" /> {allowMedia ? 'Remove Media' : isVideoField ? 'Remove Video' : 'Remove Image'}
              </button>
            )}

            {(isCustom || isRemoved) && (
              <button
                type="button"
                onClick={() => onChange(defaultValue)}
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Reset to default asset"
              >
                <RotateCcw className="w-3 h-3" /> Reset Default
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Section & Card Visibility / Enabled Toggle Header
function CardVisibilityToggle({ enabled = true, onChange, title, subtitle }) {
  const isEnabled = enabled !== false;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 mb-4 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">{title}</h4>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isEnabled
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-rose-100 text-rose-800 border border-rose-300'
            }`}
          >
            {isEnabled ? 'Active on Website' : 'Hidden / Removed'}
          </span>
        </div>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!isEnabled)}
        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
          isEnabled
            ? 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50 shadow-sm'
            : 'bg-[#016839] text-white border-[#016839] hover:bg-[#014d28] shadow-sm'
        }`}
      >
        {isEnabled ? (
          <>
            <EyeOff className="w-3.5 h-3.5" />
            <span>Hide / Remove Card</span>
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5" />
            <span>Show / Restore Card</span>
          </>
        )}
      </button>
    </div>
  );
}

// Reusable Reel Item Editor for Smartphone Feed Showcase
function ReelItemEditor({
  reel,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImage(file);
      onUpdate('image', res.url);
      toast.success(`Reel #${index + 1} media uploaded successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to upload media');
    } finally {
      setUploading(false);
    }
  };

  const previewSrc = reel.image || '';
  const displaySrc = previewSrc.startsWith('http')
    ? previewSrc
    : `${API_ORIGIN}${previewSrc}`;

  const isVideo =
    /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(previewSrc) ||
    reel.mediaType === 'video';

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-4">
      {/* Card Header with index, title preview, reordering and delete */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-[#005f73]/10 text-[#005f73] text-xs font-black flex items-center justify-center">
            #{index + 1}
          </span>
          <span className="text-xs font-bold text-slate-800 line-clamp-1">
            {reel.title || `Product Reel ${index + 1}`}
          </span>
          {reel.badge && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">
              {reel.badge}
            </span>
          )}
          {isVideo && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 shrink-0">
              🎬 Video
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
            title="Move Up in Feed"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
            title="Move Down in Feed"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            disabled={total <= 1}
            className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 disabled:opacity-30 disabled:hover:bg-transparent ml-1 cursor-pointer transition-colors"
            title={total <= 1 ? 'Feed must keep at least 1 reel' : 'Delete Reel'}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left: Thumbnail / Video Preview & Upload */}
        <div className="md:col-span-4 flex flex-col items-center gap-2">
          <div className="w-full h-40 bg-slate-900 rounded-lg overflow-hidden border border-slate-200 relative flex items-center justify-center shadow-inner group">
            {previewSrc ? (
              isVideo ? (
                <video
                  src={displaySrc}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={displaySrc}
                  alt={reel.title || 'Product'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80';
                  }}
                />
              )
            ) : (
              <div className="text-center p-3 text-slate-400">
                <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-40" />
                <span className="text-[10px]">No media set</span>
              </div>
            )}
            {/* Live price pill overlay */}
            <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              {reel.price || 'Special Deal'}
            </div>
          </div>

          {/* Upload button — accepts both image & video */}
          <label className="w-full cursor-pointer inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#016839]" />
            ) : (
              <Upload className="w-3.5 h-3.5 text-[#016839]" />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload Photo or Video'}</span>
            <input
              type="file"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          <p className="text-[10px] text-slate-400 text-center leading-snug">
            JPG / PNG / WebP for photos · MP4 / WebM / MOV for videos
          </p>
        </div>

        {/* Right: Product Reel Content & Metrics */}
        <div className="md:col-span-8 space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Product Title
            </label>
            <input
              type="text"
              value={reel.title || ''}
              onChange={(e) => onUpdate('title', e.target.value)}
              placeholder="e.g. Costa Express Barista Coffee"
              className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Price / Offer Pill
              </label>
              <input
                type="text"
                value={reel.price || ''}
                onChange={(e) => onUpdate('price', e.target.value)}
                placeholder="e.g. £2.45 or £4.99 Deal"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Badge / Tagline
              </label>
              <input
                type="text"
                value={reel.badge || ''}
                onChange={(e) => onUpdate('badge', e.target.value)}
                placeholder="e.g. Fresh Brew, Ice Cold"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Category / Hashtags
              </label>
              <input
                type="text"
                value={reel.tag || ''}
                onChange={(e) => onUpdate('tag', e.target.value)}
                placeholder="e.g. #CostaCoffee #Forecourt"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Initial Likes Counter
              </label>
              <input
                type="number"
                value={reel.initialLikes ?? 1200}
                onChange={(e) =>
                  onUpdate('initialLikes', parseInt(e.target.value, 10) || 0)
                }
                placeholder="1420"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Media URL / Path (auto-filled after upload)
            </label>
            <input
              type="text"
              value={reel.image || ''}
              onChange={(e) => onUpdate('image', e.target.value)}
              placeholder="https://... or /uploads/..."
              className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Custom Product Redirect Link (optional)
            </label>
            <input
              type="text"
              value={reel.link || reel.buttonLink || ''}
              onChange={(e) => {
                onUpdate('link', e.target.value);
                onUpdate('buttonLink', e.target.value);
              }}
              placeholder="/our-products (defaults to section link)"
              className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
            />
            <p className="text-[10px] text-slate-400 mt-0.5">
              Overrides the phone's default "Details" redirect link for this item.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3D Blue Pushpin SVG for Admin Preview
function AdminBluePushPin({ className = 'w-6 h-8' }) {
  return (
    <svg
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-[1px_3px_4px_rgba(0,0,0,0.3)] pointer-events-none select-none ${className}`}
    >
      <ellipse cx="16" cy="38" rx="2.5" ry="1.2" fill="rgba(0,0,0,0.4)" />
      <line
        x1="16"
        y1="26"
        x2="16"
        y2="37"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 26 C10 24 13 22.5 16 22.5 C19 22.5 22 24 22 26 L23 28 C23 29.2 20 30.2 16 30.2 C12 30.2 9 29.2 9 28 Z"
        fill="#0284c7"
      />
      <path
        d="M13.5 15 C13.5 15 13 19.5 12.2 23.5 C14 24.2 18 24.2 19.8 23.5 C19 19.5 18.5 15 18.5 15 Z"
        fill="#0369a1"
      />
      <ellipse cx="16" cy="11.5" rx="7.5" ry="8.5" fill="#0284c7" />
      <ellipse
        cx="13.2"
        cy="8.5"
        rx="3.2"
        ry="4.2"
        fill="#ffffff"
        fillOpacity="0.75"
        transform="rotate(-22 13.2 8.5)"
      />
    </svg>
  );
}

// Reusable Pinned Polaroid Card Editor
// Dynamic Carousel Card Editor with Drag-and-Drop, Image Upload, and Full CMS Fields
function PinnedCardEditor({
  card,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImage(file);
      onUpdate('image', res.url);
      toast.success(`Card #${index + 1} image uploaded successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const previewSrc = card.image || '';
  const displaySrc = previewSrc.startsWith('http')
    ? previewSrc
    : `${API_ORIGIN}${previewSrc}`;

  const isEnabled = card.enabled !== false;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, index)}
      onDragOver={(e) => onDragOver && onDragOver(e, index)}
      onDrop={(e) => onDrop && onDrop(e, index)}
      onDragEnd={onDragEnd}
      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-xs ${
        isDragging
          ? 'opacity-40 border-dashed border-[#005f73]'
          : isDragOver
          ? 'border-t-4 border-t-[#005f73] border-slate-300 shadow-md'
          : 'border-slate-200 hover:border-slate-300'
      } ${!isEnabled ? 'bg-slate-50/60' : ''}`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600 rounded"
            title="Drag to reorder card"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <span className="w-6 h-6 rounded-md bg-[#005f73] text-white text-xs font-black flex items-center justify-center shrink-0">
            #{index + 1}
          </span>
          <span className="text-xs font-bold text-slate-800 truncate max-w-[200px] sm:max-w-xs">
            {card.title || 'Untitled Slide'}
          </span>
          {!isEnabled && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
              Disabled
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Card Visibility Toggle */}
          <button
            type="button"
            onClick={() => onUpdate('enabled', !isEnabled)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer border ${
              isEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
            }`}
            title={isEnabled ? 'Visible in Carousel' : 'Hidden from Carousel'}
          >
            {isEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{isEnabled ? 'Active' : 'Hidden'}</span>
          </button>

          {/* Reorder Buttons */}
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer transition-colors"
            title="Move Up"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer transition-colors"
            title="Move Down"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={onRemove}
            disabled={total <= 1}
            className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 disabled:opacity-30 cursor-pointer transition-colors ml-1"
            title="Delete Card"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content Form */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Image Preview & Upload (5 cols) */}
        <div className="md:col-span-5 space-y-2.5">
          <div className="w-full aspect-[3/4] max-h-60 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-200 shadow-inner flex items-center justify-center">
            {previewSrc ? (
              <img
                src={displaySrc}
                alt={`Card ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=600&q=80';
                }}
              />
            ) : (
              <ImageIcon className="w-6 h-6 text-slate-500 opacity-40" />
            )}
          </div>

          <label className="w-full cursor-pointer inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#005f73]" />
            ) : (
              <Upload className="w-3.5 h-3.5 text-[#005f73]" />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              Image URL / Path
            </label>
            <input
              type="text"
              value={card.image || ''}
              onChange={(e) => onUpdate('image', e.target.value)}
              placeholder="https://... or /uploads/..."
              className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:bg-white focus:ring-1 focus:ring-[#005f73]"
            />
          </div>
        </div>

        {/* Right Column: Title & Information (7 cols) */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3 bg-sky-50/80 border border-sky-200/80 rounded-xl text-[11px] text-[#005f73] font-medium leading-relaxed">
            <span className="font-bold text-slate-900 block mb-0.5">Tall Visual Image Showcase</span>
            On the website homepage, this card is displayed in tall portrait proportions with <strong>zero text inside</strong>, giving 100% full-bleed visual focus to your uploaded photo.
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Card Label / Reference Title
            </label>
            <input
              type="text"
              value={card.title || ''}
              onChange={(e) => onUpdate('title', e.target.value)}
              placeholder="e.g. In-Store Confectionery & Treats"
              className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Card Description Text
            </label>
            <textarea
              rows={2}
              value={card.description || ''}
              onChange={(e) => onUpdate('description', e.target.value)}
              placeholder="Detailed description shown when this card is in the center active position..."
              className="w-full text-xs font-normal px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Button CTA Text
              </label>
              <input
                type="text"
                value={card.buttonText || ''}
                onChange={(e) => onUpdate('buttonText', e.target.value)}
                placeholder="e.g. EXPLORE DETAILS"
                className="w-full text-xs font-medium px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Button Link URL
              </label>
              <input
                type="text"
                value={card.buttonLink || card.link || ''}
                onChange={(e) => {
                  onUpdate('buttonLink', e.target.value);
                  onUpdate('link', e.target.value);
                }}
                placeholder="/our-products or https://..."
                className="w-full text-xs font-medium px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Running Product Item Editor for Full-Width Marquee
function RunningProductItemEditor({
  item,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImage(file);
      onUpdate('image', res.url);
      toast.success(`Product #${index + 1} image uploaded successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const previewSrc = item.image || '';
  const displaySrc = previewSrc.startsWith('http')
    ? previewSrc
    : previewSrc.startsWith('/uploads')
    ? `${API_ORIGIN}${previewSrc}`
    : previewSrc;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3">
      <div className="flex items-center gap-3">
        {/* Cutout Product Preview on pure white square with border */}
        <div className="shrink-0 w-24 h-24 bg-white border border-slate-200 rounded-lg p-2 flex items-center justify-center relative shadow-inner">
          {previewSrc ? (
            <img
              src={displaySrc}
              alt={item.title || `Product ${index + 1}`}
              className="max-h-full max-w-full object-contain drop-shadow-md"
              onError={(e) => {
                e.currentTarget.src =
                  '/images/running-products/shell-rotella-can.png';
              }}
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-400 opacity-40" />
          )}
        </div>

        {/* Action Controls + Upload */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center justify-between">
            <span className="w-6 h-6 rounded-md bg-[#005f73] text-white text-xs font-black flex items-center justify-center shrink-0">
              #{index + 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onUpdate('enabled', item.enabled === false ? true : false)}
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md border transition-all cursor-pointer mr-1 ${
                  item.enabled !== false
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-rose-50 text-rose-700 border-rose-300'
                }`}
                title={item.enabled !== false ? 'Product is active in ticker' : 'Product is hidden from ticker'}
              >
                {item.enabled !== false ? (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>Hidden</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onMoveUp}
                disabled={index === 0}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer transition-colors"
                title="Move Up / Left"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onMoveDown}
                disabled={index === total - 1}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer transition-colors"
                title="Move Down / Right"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onRemove}
                disabled={total <= 1}
                className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 disabled:opacity-30 cursor-pointer transition-colors ml-1"
                title="Delete Product"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <label className="w-full cursor-pointer inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#005f73]" />
            ) : (
              <Upload className="w-3.5 h-3.5 text-[#005f73]" />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload Product Image'}</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Image URL, Title & Link */}
      <div className="space-y-2 pt-1 border-t border-slate-100">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Image Path or URL
          </label>
          <input
            type="text"
            value={item.image || ''}
            onChange={(e) => onUpdate('image', e.target.value)}
            placeholder="/images/running-products/... or /uploads/..."
            className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-1 focus:ring-[#005f73]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Product Title / Label
            </label>
            <input
              type="text"
              value={item.title || ''}
              onChange={(e) => onUpdate('title', e.target.value)}
              placeholder="e.g. Shell Rotella Oil Jug"
              className="w-full text-xs font-medium px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800 focus:ring-1 focus:ring-[#005f73]"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Destination Link (Optional)
            </label>
            <input
              type="text"
              value={item.link || ''}
              onChange={(e) => onUpdate('link', e.target.value)}
              placeholder="/our-products"
              className="w-full text-xs font-medium px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-800 focus:ring-1 focus:ring-[#005f73]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePageCmsTab() {
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState(DEFAULT_HOMEPAGE_CMS);
  const [draggedCardIndex, setDraggedCardIndex] = useState(null);
  const [dragOverCardIndex, setDragOverCardIndex] = useState(null);

  // Fetch current setting from backend
  const { data: cmsSetting, isLoading } = useQuery({
    queryKey: ['admin-homepage-cms'],
    queryFn: () => getSettingByKey('homepage'),
  });

  // Populate data when loaded
  useEffect(() => {
    if (cmsSetting?.value) {
      setFormData({
        hero: {
          enabled: cmsSetting.value.hero?.enabled !== false,
          bgMediaUrl:
            cmsSetting.value.hero?.bgMediaUrl !== undefined
              ? cmsSetting.value.hero.bgMediaUrl
              : cmsSetting.value.hero?.bgImageUrl !== undefined
              ? cmsSetting.value.hero.bgImageUrl
              : cmsSetting.value.hero?.videoUrl !== undefined
              ? cmsSetting.value.hero.videoUrl
              : DEFAULT_HOMEPAGE_CMS.hero.bgMediaUrl,
          textColor: cmsSetting.value.hero?.textColor || DEFAULT_HOMEPAGE_CMS.hero.textColor,
          overlayStyle:
            cmsSetting.value.hero?.overlayStyle || DEFAULT_HOMEPAGE_CMS.hero.overlayStyle,
          headlineLine1:
            cmsSetting.value.hero?.headlineLine1 !== undefined
              ? cmsSetting.value.hero.headlineLine1
              : DEFAULT_HOMEPAGE_CMS.hero.headlineLine1,
          headlineLine2:
            cmsSetting.value.hero?.headlineLine2 !== undefined
              ? cmsSetting.value.hero.headlineLine2
              : DEFAULT_HOMEPAGE_CMS.hero.headlineLine2,
          buttonText:
            cmsSetting.value.hero?.buttonText !== undefined
              ? cmsSetting.value.hero.buttonText
              : DEFAULT_HOMEPAGE_CMS.hero.buttonText,
          buttonLink:
            cmsSetting.value.hero?.buttonLink !== undefined
              ? cmsSetting.value.hero.buttonLink
              : DEFAULT_HOMEPAGE_CMS.hero.buttonLink,
        },
        pinnedProducts: {
          enabled: cmsSetting.value.pinnedProducts?.enabled !== false,
          title:
            typeof cmsSetting.value.pinnedProducts?.title === 'string'
              ? cmsSetting.value.pinnedProducts.title
              : DEFAULT_HOMEPAGE_CMS.pinnedProducts.title,
          description:
            typeof cmsSetting.value.pinnedProducts?.description === 'string'
              ? cmsSetting.value.pinnedProducts.description
              : DEFAULT_HOMEPAGE_CMS.pinnedProducts.description,
          autoPlayEnabled:
            cmsSetting.value.pinnedProducts?.autoPlayEnabled !== false,
          autoPlayInterval:
            Number(cmsSetting.value.pinnedProducts?.autoPlayInterval) || 5,
          cards:
            Array.isArray(cmsSetting.value.pinnedProducts?.cards) &&
            cmsSetting.value.pinnedProducts.cards.length > 0
              ? cmsSetting.value.pinnedProducts.cards.map((c, i) => ({
                  ...c,
                  id: c.id || `card-${i}-${Date.now()}`,
                  title: c.title || 'Featured Forecourt Product',
                  description: c.description || c.subtitle || '',
                  buttonText: c.buttonText || 'EXPLORE DETAILS',
                  buttonLink: c.buttonLink || c.link || '/our-products',
                  order: typeof c.order === 'number' ? c.order : i,
                  enabled: c.enabled !== false,
                }))
              : DEFAULT_HOMEPAGE_CMS.pinnedProducts.cards,
          runningProductsEnabled:
            cmsSetting.value.pinnedProducts?.runningProductsEnabled !== false,
          runningProductsSpeed:
            cmsSetting.value.pinnedProducts?.runningProductsSpeed || 'normal',
          runningProducts:
            Array.isArray(cmsSetting.value.pinnedProducts?.runningProducts) &&
            cmsSetting.value.pinnedProducts.runningProducts.length > 0
              ? cmsSetting.value.pinnedProducts.runningProducts
              : DEFAULT_RUNNING_PRODUCTS,
        },
        specialtyApp: {
          enabled: cmsSetting.value.specialtyApp?.enabled !== false,
          title:
            typeof cmsSetting.value.specialtyApp?.title === 'string'
              ? cmsSetting.value.specialtyApp.title
              : typeof cmsSetting.value.specialtyApp?.leftTitle === 'string'
              ? cmsSetting.value.specialtyApp.leftTitle
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.title,
          description:
            typeof cmsSetting.value.specialtyApp?.description === 'string'
              ? cmsSetting.value.specialtyApp.description
              : typeof cmsSetting.value.specialtyApp?.leftDescription === 'string'
              ? cmsSetting.value.specialtyApp.leftDescription
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.description,
          ctaText:
            typeof cmsSetting.value.specialtyApp?.ctaText === 'string'
              ? cmsSetting.value.specialtyApp.ctaText
              : typeof cmsSetting.value.specialtyApp?.leftCtaText === 'string'
              ? cmsSetting.value.specialtyApp.leftCtaText
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.ctaText,
          ctaLink:
            typeof cmsSetting.value.specialtyApp?.ctaLink === 'string'
              ? cmsSetting.value.specialtyApp.ctaLink
              : typeof cmsSetting.value.specialtyApp?.leftCtaLink === 'string'
              ? cmsSetting.value.specialtyApp.leftCtaLink
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.ctaLink,
          feature1Title:
            typeof cmsSetting.value.specialtyApp?.feature1Title === 'string'
              ? cmsSetting.value.specialtyApp.feature1Title
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.feature1Title,
          feature1Desc:
            typeof cmsSetting.value.specialtyApp?.feature1Desc === 'string'
              ? cmsSetting.value.specialtyApp.feature1Desc
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.feature1Desc,
          feature2Title:
            typeof cmsSetting.value.specialtyApp?.feature2Title === 'string'
              ? cmsSetting.value.specialtyApp.feature2Title
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.feature2Title,
          feature2Desc:
            typeof cmsSetting.value.specialtyApp?.feature2Desc === 'string'
              ? cmsSetting.value.specialtyApp.feature2Desc
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.feature2Desc,
          feature3Title:
            typeof cmsSetting.value.specialtyApp?.feature3Title === 'string'
              ? cmsSetting.value.specialtyApp.feature3Title
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.feature3Title,
          feature3Desc:
            typeof cmsSetting.value.specialtyApp?.feature3Desc === 'string'
              ? cmsSetting.value.specialtyApp.feature3Desc
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.feature3Desc,
          storeHandle:
            typeof cmsSetting.value.specialtyApp?.storeHandle === 'string'
              ? cmsSetting.value.specialtyApp.storeHandle
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.storeHandle,
          storeAvatar:
            typeof cmsSetting.value.specialtyApp?.storeAvatar === 'string'
              ? cmsSetting.value.specialtyApp.storeAvatar
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.storeAvatar,
          phoneDetailsText:
            typeof cmsSetting.value.specialtyApp?.phoneDetailsText === 'string'
              ? cmsSetting.value.specialtyApp.phoneDetailsText
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.phoneDetailsText,
          phoneDetailsLink:
            typeof cmsSetting.value.specialtyApp?.phoneDetailsLink === 'string'
              ? cmsSetting.value.specialtyApp.phoneDetailsLink
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.phoneDetailsLink,
          reels:
            Array.isArray(cmsSetting.value.specialtyApp?.reels) &&
            cmsSetting.value.specialtyApp.reels.length > 0
              ? cmsSetting.value.specialtyApp.reels
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.reels,
        },
        newsletter: {
          enabled: cmsSetting.value.newsletter?.enabled !== false,
          title:
            typeof cmsSetting.value.newsletter?.title === 'string'
              ? cmsSetting.value.newsletter.title
              : DEFAULT_HOMEPAGE_CMS.newsletter.title,
          description:
            typeof cmsSetting.value.newsletter?.description === 'string'
              ? cmsSetting.value.newsletter.description
              : DEFAULT_HOMEPAGE_CMS.newsletter.description,
          buttonText:
            typeof cmsSetting.value.newsletter?.buttonText === 'string'
              ? cmsSetting.value.newsletter.buttonText
              : DEFAULT_HOMEPAGE_CMS.newsletter.buttonText,
          termsText:
            typeof cmsSetting.value.newsletter?.termsText === 'string'
              ? cmsSetting.value.newsletter.termsText
              : DEFAULT_HOMEPAGE_CMS.newsletter.termsText,
          positions:
            Array.isArray(cmsSetting.value.newsletter?.positions) &&
            cmsSetting.value.newsletter.positions.length > 0
              ? cmsSetting.value.newsletter.positions
              : DEFAULT_NEWSLETTER_POSITIONS,
        },
      });
    }
  }, [cmsSetting]);

  // Mutation to save CMS settings
  const saveMutation = useMutation({
    mutationFn: async (updatedData) => {
      if (updatedData.hero) {
        const isVid = /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(updatedData.hero.bgMediaUrl || '');
        updatedData.hero.bgImageUrl = isVid ? '' : (updatedData.hero.bgMediaUrl || '');
        updatedData.hero.videoUrl = isVid ? (updatedData.hero.bgMediaUrl || '') : '';
      }
      await updateSetting('homepage', updatedData);
      // Also update 'hero' key for backward compatibility
      if (updatedData.hero) {
        await updateSetting('hero', {
          headline: `${updatedData.hero.headlineLine1} ${updatedData.hero.headlineLine2}`,
          subheadline: updatedData.hero.buttonText,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-homepage-cms'] });
      toast.success('Home page CMS settings saved! Customer site updated.');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save settings');
    },
  });

  const handleResetAll = () => {
    if (
      window.confirm(
        'Are you sure you want to reset ALL home page images and text to the original pristine Conoco defaults?'
      )
    ) {
      setFormData(DEFAULT_HOMEPAGE_CMS);
      saveMutation.mutate(DEFAULT_HOMEPAGE_CMS);
    }
  };

  // Smartphone In-Store Reels Management Handlers
  const handleUpdateReel = (index, field, val) => {
    const currentReels = formData.specialtyApp?.reels || DEFAULT_REELS;
    const nextReels = [...currentReels];
    nextReels[index] = { ...nextReels[index], [field]: val };
    setFormData({
      ...formData,
      specialtyApp: { ...formData.specialtyApp, reels: nextReels },
    });
  };

  const handleAddReel = () => {
    const currentReels = formData.specialtyApp?.reels || DEFAULT_REELS;
    const newReel = {
      id: `reel-${Date.now()}`,
      category: 'In-Store',
      title: 'New In-Store Special',
      price: '£2.99',
      badge: 'Special',
      tag: '#ForecourtStore #Special',
      image:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80',
      initialLikes: 500,
      commentsCount: 20,
    };
    setFormData({
      ...formData,
      specialtyApp: { ...formData.specialtyApp, reels: [...currentReels, newReel] },
    });
    toast.success('New product reel added! Customize its image and title below.');
  };

  const handleRemoveReel = (index) => {
    const currentReels = formData.specialtyApp?.reels || DEFAULT_REELS;
    if (currentReels.length <= 1) {
      toast.error('The smartphone feed must keep at least 1 product reel.');
      return;
    }
    const nextReels = currentReels.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      specialtyApp: { ...formData.specialtyApp, reels: nextReels },
    });
    toast.success('Reel removed.');
  };

  const handleMoveReel = (index, direction) => {
    const currentReels = formData.specialtyApp?.reels || DEFAULT_REELS;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= currentReels.length) return;
    const nextReels = [...currentReels];
    const temp = nextReels[index];
    nextReels[index] = nextReels[targetIndex];
    nextReels[targetIndex] = temp;
    setFormData({
      ...formData,
      specialtyApp: { ...formData.specialtyApp, reels: nextReels },
    });
  };

  const handleResetReels = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all smartphone product reels to the original 5 in-store items?'
      )
    ) {
      setFormData({
        ...formData,
        specialtyApp: { ...formData.specialtyApp, reels: DEFAULT_REELS },
      });
      toast.success('Smartphone reels reset to defaults. Click "Save All Changes" to publish.');
    }
  };

  // Pinned Products / Dynamic Carousel Handlers
  const handleUpdatePinnedCard = (index, field, val) => {
    const currentCards = formData.pinnedProducts?.cards || DEFAULT_PINNED_CARDS;
    const nextCards = [...currentCards];
    nextCards[index] = { ...nextCards[index], [field]: val };
    setFormData({
      ...formData,
      pinnedProducts: { ...formData.pinnedProducts, cards: nextCards },
    });
  };

  const handleAddPinnedCard = () => {
    const currentCards = formData.pinnedProducts?.cards || DEFAULT_PINNED_CARDS;
    const newCard = {
      id: `card-${Date.now()}`,
      title: 'New Featured Forecourt Slide',
      description:
        'Highlight your latest premium fuels, vintage relics, convenience snacks, or promotional offerings.',
      buttonText: 'EXPLORE DETAILS',
      buttonLink: '/our-products',
      image:
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      order: currentCards.length,
      enabled: true,
    };
    setFormData({
      ...formData,
      pinnedProducts: {
        ...formData.pinnedProducts,
        cards: [...currentCards, newCard],
      },
    });
    toast.success('New carousel slide added! Fill in the title, description, and photo.');
  };

  const handleRemovePinnedCard = (index) => {
    const currentCards = formData.pinnedProducts?.cards || DEFAULT_PINNED_CARDS;
    if (currentCards.length <= 1) {
      toast.error('You must keep at least 1 card in the carousel.');
      return;
    }
    const nextCards = currentCards.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      pinnedProducts: { ...formData.pinnedProducts, cards: nextCards },
    });
    toast.success('Card removed.');
  };

  const handleMovePinnedCard = (index, direction) => {
    const currentCards = formData.pinnedProducts?.cards || DEFAULT_PINNED_CARDS;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= currentCards.length) return;
    const nextCards = [...currentCards];
    const temp = nextCards[index];
    nextCards[index] = nextCards[targetIndex];
    nextCards[targetIndex] = temp;
    setFormData({
      ...formData,
      pinnedProducts: { ...formData.pinnedProducts, cards: nextCards },
    });
  };

  // Drag and Drop reordering for cards
  const handleDragStartCard = (e, index) => {
    setDraggedCardIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOverCard = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCardIndex !== index) {
      setDragOverCardIndex(index);
    }
  };

  const handleDropCard = (e, targetIndex) => {
    e.preventDefault();
    if (draggedCardIndex === null || draggedCardIndex === targetIndex) {
      setDraggedCardIndex(null);
      setDragOverCardIndex(null);
      return;
    }
    const currentCards = formData.pinnedProducts?.cards || DEFAULT_PINNED_CARDS;
    const nextCards = [...currentCards];
    const [movedCard] = nextCards.splice(draggedCardIndex, 1);
    nextCards.splice(targetIndex, 0, movedCard);
    setFormData({
      ...formData,
      pinnedProducts: { ...formData.pinnedProducts, cards: nextCards },
    });
    setDraggedCardIndex(null);
    setDragOverCardIndex(null);
    toast.success('Card reordered successfully.');
  };

  const handleDragEndCard = () => {
    setDraggedCardIndex(null);
    setDragOverCardIndex(null);
  };

  const handleResetPinnedCards = () => {
    if (
      window.confirm(
        'Reset carousel cards to the default featured forecourt items?'
      )
    ) {
      setFormData({
        ...formData,
        pinnedProducts: {
          ...formData.pinnedProducts,
          cards: DEFAULT_PINNED_CARDS,
        },
      });
      toast.success('Carousel cards reset to default.');
    }
  };

  // Running Products Marquee Handlers
  const handleUpdateRunningProduct = (index, field, val) => {
    const currentList =
      formData.pinnedProducts?.runningProducts || DEFAULT_RUNNING_PRODUCTS;
    const nextList = currentList.map((item, idx) =>
      idx === index ? { ...item, [field]: val } : item
    );
    setFormData({
      ...formData,
      pinnedProducts: { ...formData.pinnedProducts, runningProducts: nextList },
    });
  };

  const handleAddRunningProduct = () => {
    const currentList =
      formData.pinnedProducts?.runningProducts || DEFAULT_RUNNING_PRODUCTS;
    const newItem = {
      id: `prod-custom-${Date.now()}`,
      title: 'New Vintage Relic',
      image: '/images/running-products/shell-rotella-can.png',
      link: '/our-products',
    };
    setFormData({
      ...formData,
      pinnedProducts: {
        ...formData.pinnedProducts,
        runningProducts: [...currentList, newItem],
      },
    });
    toast.success('New running product added! Upload its image and set title.');
  };

  const handleRemoveRunningProduct = (index) => {
    const currentList =
      formData.pinnedProducts?.runningProducts || DEFAULT_RUNNING_PRODUCTS;
    if (currentList.length <= 1) {
      toast.error('You must keep at least 1 product in the running marquee.');
      return;
    }
    const nextList = currentList.filter((_, idx) => idx !== index);
    setFormData({
      ...formData,
      pinnedProducts: { ...formData.pinnedProducts, runningProducts: nextList },
    });
  };

  const handleMoveRunningProduct = (index, direction) => {
    const currentList =
      formData.pinnedProducts?.runningProducts || DEFAULT_RUNNING_PRODUCTS;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;
    const nextList = [...currentList];
    const temp = nextList[index];
    nextList[index] = nextList[targetIndex];
    nextList[targetIndex] = temp;
    setFormData({
      ...formData,
      pinnedProducts: { ...formData.pinnedProducts, runningProducts: nextList },
    });
  };

  const handleResetRunningProducts = () => {
    if (
      window.confirm(
        'Reset running products to the 6 vintage relics from the reference image?'
      )
    ) {
      setFormData({
        ...formData,
        pinnedProducts: {
          ...formData.pinnedProducts,
          runningProducts: DEFAULT_RUNNING_PRODUCTS,
        },
      });
      toast.success('Running products reset to reference defaults.');
    }
  };

  // Newsletter Positions Management Handlers
  const [newPositionInput, setNewPositionInput] = useState('');

  const handleAddPosition = () => {
    const trimmed = newPositionInput.trim();
    if (!trimmed) {
      toast.error('Please enter a position title');
      return;
    }
    const current = formData.newsletter?.positions || DEFAULT_NEWSLETTER_POSITIONS;
    if (current.includes(trimmed)) {
      toast.error('This position is already in the list');
      return;
    }
    setFormData({
      ...formData,
      newsletter: {
        ...formData.newsletter,
        positions: [...current, trimmed],
      },
    });
    setNewPositionInput('');
    toast.success(`Position "${trimmed}" added! Click "Save All Changes" to publish.`);
  };

  const handleUpdatePosition = (idx, newName) => {
    const current = [...(formData.newsletter?.positions || DEFAULT_NEWSLETTER_POSITIONS)];
    current[idx] = newName;
    setFormData({
      ...formData,
      newsletter: {
        ...formData.newsletter,
        positions: current,
      },
    });
  };

  const handleRemovePosition = (idx) => {
    const current = formData.newsletter?.positions || DEFAULT_NEWSLETTER_POSITIONS;
    if (current.length <= 1) {
      toast.error('You must keep at least 1 position in the dropdown list.');
      return;
    }
    const updated = current.filter((_, i) => i !== idx);
    setFormData({
      ...formData,
      newsletter: {
        ...formData.newsletter,
        positions: updated,
      },
    });
    toast.success('Position removed.');
  };

  const handleMovePosition = (idx, direction) => {
    const current = [...(formData.newsletter?.positions || DEFAULT_NEWSLETTER_POSITIONS)];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= current.length) return;
    const temp = current[idx];
    current[idx] = current[targetIdx];
    current[targetIdx] = temp;
    setFormData({
      ...formData,
      newsletter: {
        ...formData.newsletter,
        positions: current,
      },
    });
  };

  const handleResetPositions = () => {
    setFormData({
      ...formData,
      newsletter: {
        ...formData.newsletter,
        positions: DEFAULT_NEWSLETTER_POSITIONS,
      },
    });
    toast.success('Positions reset to reference defaults.');
  };

  const sections = [
    { id: 'hero',            label: '1. Hero & Video Banner',                      icon: Layout },
    { id: 'marquee',         label: '2. Running Products Marquee (Below Hero)',     icon: Play },
    { id: 'specialty',       label: '3. In-Store Showcase & 3D Phone',             icon: Smartphone },
    { id: 'pinnedProducts',  label: '4. Pinned Products & Heritage Carousel',      icon: Pin },
    { id: 'newsletter',      label: '5. Newsletter & Community Sign-up',            icon: Mail },
  ];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#016839] flex items-center justify-center font-bold">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Home Page CMS &amp; Image Manager
              </h2>
              <p className="text-xs text-slate-500">
                Upload &amp; customize images, headlines, and buttons. Built-in fail-safe protection ensures missing or deleted assets safely fall back to default Conoco visuals.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={CLIENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Site
          </a>

          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3.5 py-2.5 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All Defaults
          </button>

          <button
            type="button"
            onClick={() => saveMutation.mutate(formData)}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saveMutation.isPending ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#016839]' : 'text-slate-400'}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: HERO & VIDEO BANNER */}
      {activeSection === 'hero' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">Hero Section Content &amp; Video</h3>
            <p className="text-xs text-slate-500">
              Customize the full-width hero headlines, call-to-action button, and looping background MP4 video. Empty fields will remain cleanly empty on the customer site without collapsing the layout.
            </p>
          </div>

          <CardVisibilityToggle
            title="Hero Section Visibility"
            subtitle="Enable, disable, or remove the entire hero banner from the home page"
            enabled={formData.hero.enabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero, enabled: val },
              })
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#016839]">
                  Text Content &amp; Button
                </span>
                <span className="text-[11px] text-slate-400">Optional (leave blank to hide)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Headline Line 1 (Fuel Callout)
                </label>
                <input
                  type="text"
                  value={formData.hero.headlineLine1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, headlineLine1: e.target.value },
                    })
                  }
                  placeholder="The fuel that lets you GO GO GO."
                  className="w-full text-sm font-semibold px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#016839] bg-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty if you do not want to display line 1</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Headline Line 2 (App Callout)
                </label>
                <input
                  type="text"
                  value={formData.hero.headlineLine2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, headlineLine2: e.target.value },
                    })
                  }
                  placeholder="The app that lets you SAVE SAVE SAVE."
                  className="w-full text-sm font-semibold px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#016839] bg-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty if you do not want to display line 2</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.hero.buttonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, buttonText: e.target.value },
                      })
                    }
                    placeholder="Download the app"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#016839] bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide button</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Button Target Link
                  </label>
                  <input
                    type="text"
                    value={formData.hero.buttonLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, buttonLink: e.target.value },
                      })
                    }
                    placeholder="https://onelink.to/xpxtfg"
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#016839] bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">URL or relative route</p>
                </div>
              </div>
            </div>

            {/* Right Column: Unified Hero Media & Color/Tint Controls matching Image 3 */}
            <div className="lg:col-span-5 space-y-4">
              <MediaField
                label="Hero Background Media (Image or Video)"
                allowMedia={true}
                value={formData.hero.bgMediaUrl}
                defaultValue={DEFAULT_HOMEPAGE_CMS.hero.bgMediaUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, bgMediaUrl: val },
                  })
                }
                hint="Upload any high-res photo (.png, .jpg, .webp) or looping background video (.mp4, .webm). Empty field displays sleek petroleum backdrop."
              />

              {/* Text Color & Overlay Style matching user reference Image 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
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
                          name="heroTextColor"
                          value={opt.id}
                          checked={(formData.hero.textColor || 'white') === opt.id}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, textColor: e.target.value },
                            }))
                          }
                          className="text-[#016839] focus:ring-[#016839] accent-[#016839]"
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
                          name="heroOverlayStyle"
                          value={tint.id}
                          checked={(formData.hero.overlayStyle || 'dark') === tint.id}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, overlayStyle: e.target.value },
                            }))
                          }
                          className="text-[#016839] focus:ring-[#016839] accent-[#016839]"
                        />
                        <span className="font-medium">{tint.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* SECTION 2: RUNNING PRODUCTS MARQUEE (STANDALONE — BELOW HERO) */}
      {activeSection === 'marquee' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Running Products Marquee
            </h3>
            <p className="text-xs text-slate-500">
              Full-width right-to-left endless ticker of vintage product images displayed directly below the Hero section. Manage products, images, links, and animation speed here.
            </p>
          </div>

          <CardVisibilityToggle
            title="Running Products Marquee Visibility"
            subtitle="Enable, disable, or remove the entire running products marquee ticker from the home page"
            enabled={formData.pinnedProducts?.runningProductsEnabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                pinnedProducts: {
                  ...formData.pinnedProducts,
                  runningProductsEnabled: val,
                },
              })
            }
          />

          {/* Marquee Settings */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#005f73] text-white flex items-center justify-center shadow-xs">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Running Products Marquee</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Right &rarr; Left Ticker
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Displayed immediately below the Hero section as a full-width moving tape.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleResetRunningProducts}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Reset to the 6 default relics"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </div>

            {/* Status & Speed */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">Ticker Status:</span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    formData.pinnedProducts?.runningProductsEnabled !== false
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {formData.pinnedProducts?.runningProductsEnabled !== false
                    ? 'Active on Website'
                    : 'Hidden / Removed'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">Animation Speed:</span>
                <select
                  value={formData.pinnedProducts?.runningProductsSpeed || 'normal'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pinnedProducts: {
                        ...formData.pinnedProducts,
                        runningProductsSpeed: e.target.value,
                      },
                    })
                  }
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-1 focus:ring-[#005f73]"
                >
                  <option value="slow">Slow (45s loop)</option>
                  <option value="normal">Normal (30s loop)</option>
                  <option value="fast">Fast (18s loop)</option>
                </select>
              </div>
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(formData.pinnedProducts?.runningProducts || DEFAULT_RUNNING_PRODUCTS).map((item, idx) => (
                <RunningProductItemEditor
                  key={item.id || `run-editor-${idx}`}
                  item={item}
                  index={idx}
                  total={(formData.pinnedProducts?.runningProducts || DEFAULT_RUNNING_PRODUCTS).length}
                  onUpdate={(field, val) => handleUpdateRunningProduct(idx, field, val)}
                  onRemove={() => handleRemoveRunningProduct(idx)}
                  onMoveUp={() => handleMoveRunningProduct(idx, 'up')}
                  onMoveDown={() => handleMoveRunningProduct(idx, 'down')}
                />
              ))}
            </div>

            {/* Add Product */}
            <button
              type="button"
              onClick={handleAddRunningProduct}
              className="w-full py-3 border-2 border-dashed border-[#005f73]/40 hover:border-[#005f73] hover:bg-[#005f73]/5 text-[#005f73] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer bg-white"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Running Product / Relic</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: IN-STORE SHOWCASE & PHONE FEED */}
      {activeSection === 'specialty' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">
              In-Store Products Showcase &amp; 3D Cross Phone
            </h3>
            <p className="text-xs text-slate-500">
              Manage the 3D cross-tilted smartphone showcase section. The left-side angled phone displays your interactive in-store product reels feed. On the right, customize the main headlines, description, in-store feature highlights, and CTA button below.
            </p>
          </div>

          <CardVisibilityToggle
            title="In-Store Showcase Visibility"
            subtitle="Enable or disable the in-store products showcase and phone reels on the home page"
            enabled={formData.specialtyApp.enabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                specialtyApp: { ...formData.specialtyApp, enabled: val },
              })
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left Box: Main Section Headlines & CTA */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#016839]">
                  Main Section Headlines &amp; CTA
                </span>
                <span className="text-[11px] text-slate-400">Right Column on Home</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Main Title</label>
                <input
                  type="text"
                  value={formData.specialtyApp.title ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: {
                        ...formData.specialtyApp,
                        title: e.target.value,
                        leftTitle: e.target.value,
                      },
                    })
                  }
                  placeholder="Fresh Food. Cold Drinks.<br />Everyday Savings."
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">HTML tags like &lt;br /&gt; are supported</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={formData.specialtyApp.description ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: {
                        ...formData.specialtyApp,
                        description: e.target.value,
                        leftDescription: e.target.value,
                      },
                    })
                  }
                  placeholder="Stop by our convenient forecourt store anytime for freshly baked artisan pastries, Costa barista coffee, chilled beverages, lunch combos, and everyday travel essentials on the go."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Descriptive overview of in-store products and services</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.specialtyApp.ctaText ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialtyApp: {
                          ...formData.specialtyApp,
                          ctaText: e.target.value,
                          leftCtaText: e.target.value,
                        },
                      })
                    }
                    placeholder="Explore In-Store Products"
                    className="w-full text-xs px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    CTA Target Link
                  </label>
                  <input
                    type="text"
                    value={formData.specialtyApp.ctaLink ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialtyApp: {
                          ...formData.specialtyApp,
                          ctaLink: e.target.value,
                          leftCtaLink: e.target.value,
                        },
                      })
                    }
                    placeholder="/our-products"
                    className="w-full text-xs font-mono px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                </div>
              </div>
            </div>

            {/* Right Box: In-Store Highlights (3 Feature Cards) */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#016839]">
                  In-Store Highlights (3 Features)
                </span>
                <span className="text-[11px] text-slate-400">Cards</span>
              </div>

              {/* Feature 1 */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#005f73]/10 text-[#005f73] text-[10px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <label className="text-xs font-bold text-slate-800">Feature 1</label>
                </div>
                <input
                  type="text"
                  value={formData.specialtyApp.feature1Title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, feature1Title: e.target.value },
                    })
                  }
                  placeholder="Daily Fresh Meal Deals"
                  className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <textarea
                  rows="2"
                  value={formData.specialtyApp.feature1Desc || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, feature1Desc: e.target.value },
                    })
                  }
                  placeholder="Artisan sandwiches, warm paninis, and combo deals made fresh every morning."
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#005f73]/10 text-[#005f73] text-[10px] font-bold flex items-center justify-center">
                    2
                  </span>
                  <label className="text-xs font-bold text-slate-800">Feature 2</label>
                </div>
                <input
                  type="text"
                  value={formData.specialtyApp.feature2Title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, feature2Title: e.target.value },
                    })
                  }
                  placeholder="Costa Express Barista Coffee"
                  className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <textarea
                  rows="2"
                  value={formData.specialtyApp.feature2Desc || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, feature2Desc: e.target.value },
                    })
                  }
                  placeholder="100% Arabica bean-to-cup hot espresso, lattes, and cappuccinos anytime day or night."
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#005f73]/10 text-[#005f73] text-[10px] font-bold flex items-center justify-center">
                    3
                  </span>
                  <label className="text-xs font-bold text-slate-800">Feature 3</label>
                </div>
                <input
                  type="text"
                  value={formData.specialtyApp.feature3Title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, feature3Title: e.target.value },
                    })
                  }
                  placeholder="24/7 Forecourt Convenience"
                  className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <textarea
                  rows="2"
                  value={formData.specialtyApp.feature3Desc || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, feature3Desc: e.target.value },
                    })
                  }
                  placeholder="Chilled drinks, snacks, groceries, car care, and travel necessities ready when you need them."
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SMARTPHONE OVERLAY: PROFILE HANDLE & "DETAILS" BUTTON LINK SETTINGS        */}
          {/* ========================================================================= */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#005f73]/10 text-[#005f73] flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight">
                    Smartphone Profile &amp; "Details" Button Settings
                  </h4>
                  <p className="text-xs text-slate-500">
                    Customize the username/handle and "Details" action button appearing at the bottom-left inside the phone frame.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Phone Left Bottom
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Store Handle / Name
                </label>
                <input
                  type="text"
                  value={formData.specialtyApp.storeHandle ?? 'aiyanlimited'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, storeHandle: e.target.value },
                    })
                  }
                  placeholder="aiyanlimited"
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
                />
                <p className="text-[10px] text-slate-400 mt-1">Shown next to the blue verified badge</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Avatar Badge Initials
                </label>
                <input
                  type="text"
                  value={formData.specialtyApp.storeAvatar ?? 'AL'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, storeAvatar: e.target.value },
                    })
                  }
                  placeholder="AL"
                  maxLength={6}
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
                />
                <p className="text-[10px] text-slate-400 mt-1">Circular badge text (e.g. AL)</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  "Details" Button Label
                </label>
                <input
                  type="text"
                  value={formData.specialtyApp.phoneDetailsText ?? 'Details →'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, phoneDetailsText: e.target.value },
                    })
                  }
                  placeholder="Details →"
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
                />
                <p className="text-[10px] text-slate-400 mt-1">Button text inside the phone</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  "Details" Redirect Link
                </label>
                <input
                  type="text"
                  value={formData.specialtyApp.phoneDetailsLink ?? '/our-products'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, phoneDetailsLink: e.target.value },
                    })
                  }
                  placeholder="/our-products"
                  className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
                />
                <p className="text-[10px] text-slate-400 mt-1">Target page when user clicks "Details"</p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SMARTPHONE PRODUCT REELS MANAGER                                          */}
          {/* ========================================================================= */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
            {/* Reels Manager Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#005f73] text-white flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight">
                    Smartphone Product Reels Feed (Left Column)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {(formData.specialtyApp?.reels || DEFAULT_REELS).length} Active Reels
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Manage the scrollable product reels inside the smartphone frame. Visitors see these items smoothly auto-scroll upward in an infinite loop. You can upload custom product photos, edit titles, prices, tags, and initial likes.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={handleResetReels}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  title="Reset reels to the 5 default in-store items"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset 5 Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddReel}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#016839] hover:bg-[#014d28] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product Reel</span>
                </button>
              </div>
            </div>

            {/* List of Reels */}
            <div className="space-y-4">
              {(formData.specialtyApp?.reels || DEFAULT_REELS).map((reel, idx) => (
                <ReelItemEditor
                  key={reel.id || `reel-${idx}`}
                  reel={reel}
                  index={idx}
                  total={(formData.specialtyApp?.reels || DEFAULT_REELS).length}
                  onUpdate={(field, val) => handleUpdateReel(idx, field, val)}
                  onRemove={() => handleRemoveReel(idx)}
                  onMoveUp={() => handleMoveReel(idx, -1)}
                  onMoveDown={() => handleMoveReel(idx, 1)}
                />
              ))}
            </div>

            {/* Bottom Add Reel Helper */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleAddReel}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#016839] hover:text-white bg-white hover:bg-[#016839] border-2 border-dashed border-[#016839]/40 hover:border-[#016839] px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Another Product Reel to Smartphone Feed</span>
              </button>
            </div>

            {/* Phone Frame Info Note */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 text-xs text-slate-500">
              <div className="w-10 h-16 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center shrink-0 relative">
                <img
                  src="/uploads/Phone-frame-bottom.png"
                  alt="Frame"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-700">Display Information:</span>
                <p>
                  Reels automatically transition from bottom to top every 3.8s in an unbroken, infinite upward scroll. Customers can also drag vertically, click, or tap the heart icon to like products live. All uploaded photos scale seamlessly to fill the vertical frame.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: PINNED PRODUCTS & HERITAGE CAROUSEL */}
      {activeSection === 'pinnedProducts' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Pinned Products &amp; Heritage Board (Dynamic Carousel)
            </h3>
            <p className="text-xs text-slate-500">
              Configure your dynamic 3-card center-prominent carousel. On desktop, 3 cards are visually displayed at a time (previous, center active, next) with smooth physical scale transitions and infinite looping. Add unlimited cards, reorder via drag-and-drop, customize photos, descriptions, and CTA links.
            </p>
          </div>

          <CardVisibilityToggle
            title="Carousel Section Visibility"
            subtitle="Enable or disable the pinned products carousel on the home page"
            enabled={formData.pinnedProducts?.enabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                pinnedProducts: { ...formData.pinnedProducts, enabled: val },
              })
            }
          />

          {/* Section Headline & Description */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#005f73]">
                Section Headline &amp; Description (Optional)
              </span>
              <span className="text-[11px] text-slate-400">Displayed Above the Carousel</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={formData.pinnedProducts?.title ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pinnedProducts: { ...formData.pinnedProducts, title: e.target.value },
                  })
                }
                placeholder="You can be part of Fergus & Gibbs history."
                className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
              />
              <p className="text-[11px] text-slate-400 mt-1">HTML tags supported for line breaks</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Sub-Headline / Description Text
              </label>
              <textarea
                rows={2}
                value={formData.pinnedProducts?.description ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pinnedProducts: { ...formData.pinnedProducts, description: e.target.value },
                  })
                }
                placeholder="Get in touch if you have rusty relics, tins, pourers, signs or old items for sale. We're always buying!"
                className="w-full text-xs font-medium px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#005f73]"
              />
            </div>
          </div>

          {/* Carousel Timing & Auto-Play Controls */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#005f73]">
                Carousel Timing &amp; Auto-Play
              </span>
              <span className="text-[11px] text-slate-400">Desktop, Tablet &amp; Mobile</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between bg-white p-3.5 rounded-lg border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-800">Auto-Play Enabled</p>
                  <p className="text-[11px] text-slate-400">Automatically advances slides (pauses on hover)</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.pinnedProducts?.autoPlayEnabled !== false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pinnedProducts: {
                        ...formData.pinnedProducts,
                        autoPlayEnabled: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-[#005f73] rounded border-slate-300 focus:ring-[#005f73] cursor-pointer"
                />
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Slide Rotation Interval
                </label>
                <select
                  value={formData.pinnedProducts?.autoPlayInterval || 5}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pinnedProducts: {
                        ...formData.pinnedProducts,
                        autoPlayInterval: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 focus:ring-2 focus:ring-[#005f73]"
                >
                  <option value={3}>3 Seconds (Fast)</option>
                  <option value={4}>4 Seconds</option>
                  <option value={5}>5 Seconds (Recommended)</option>
                  <option value={7}>7 Seconds (Relaxed)</option>
                  <option value={10}>10 Seconds (Slow)</option>
                </select>
              </div>
            </div>
          </div>

          {/* DYNAMIC CAROUSEL CARDS MANAGER */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#005f73] text-white flex items-center justify-center">
                  <Pin className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-slate-900 tracking-tight">
                  Carousel Cards (Unlimited)
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  {(formData.pinnedProducts?.cards || DEFAULT_PINNED_CARDS).length} Total Cards
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {(formData.pinnedProducts?.cards || DEFAULT_PINNED_CARDS).filter((c) => c.enabled !== false).length} Active
                </span>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleResetPinnedCards}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Reset to default forecourt showcase cards"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddPinnedCard}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#005f73] hover:bg-[#071e26] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Slide</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Drag by the handle (<GripVertical className="w-3 h-3 inline text-slate-400" />) or use arrows to reorder. Exactly 3 cards are presented on desktop at once; the carousel seamlessly rotates through all active cards.
            </p>

            {/* Card List */}
            <div className="space-y-3.5">
              {(formData.pinnedProducts?.cards || DEFAULT_PINNED_CARDS).map((card, idx) => (
                <PinnedCardEditor
                  key={card.id || `pin-editor-${idx}`}
                  card={card}
                  index={idx}
                  total={(formData.pinnedProducts?.cards || DEFAULT_PINNED_CARDS).length}
                  isDragging={draggedCardIndex === idx}
                  isDragOver={dragOverCardIndex === idx}
                  onDragStart={handleDragStartCard}
                  onDragOver={handleDragOverCard}
                  onDrop={handleDropCard}
                  onDragEnd={handleDragEndCard}
                  onUpdate={(field, val) => handleUpdatePinnedCard(idx, field, val)}
                  onRemove={() => handleRemovePinnedCard(idx)}
                  onMoveUp={() => handleMovePinnedCard(idx, -1)}
                  onMoveDown={() => handleMovePinnedCard(idx, 1)}
                />
              ))}
            </div>

            {/* Add Card Button */}
            <button
              type="button"
              onClick={handleAddPinnedCard}
              className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-[#005f73] hover:text-[#005f73] text-slate-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer bg-white hover:bg-sky-50/40 mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Another Carousel Slide</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: NEWSLETTER & COMMUNITY SIGN-UP */}
      {activeSection === 'newsletter' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#016839]" /> 4. Newsletter &amp; Community Sign-up
                </h3>
                <p className="text-xs text-slate-500">
                  Control the headline, subtitle copy, button text, and privacy terms shown in the footer newsletter block.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    newsletter: {
                      ...formData.newsletter,
                      enabled: formData.newsletter?.enabled === false ? true : false,
                    },
                  })
                }
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  formData.newsletter?.enabled !== false
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                    : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
                }`}
              >
                {formData.newsletter?.enabled !== false ? (
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

            <div className="space-y-5 max-w-3xl">
              {/* Title / Headline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Headline / Title
                </label>
                <input
                  type="text"
                  value={formData.newsletter?.title !== undefined ? formData.newsletter.title : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter: {
                        ...formData.newsletter,
                        title: e.target.value,
                      },
                    })
                  }
                  placeholder="Get emails you actually like."
                  className="w-full text-xs font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove headline</p>
              </div>

              {/* Subtitle / Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description / Subtitle
                </label>
                <textarea
                  rows={3}
                  value={formData.newsletter?.description !== undefined ? formData.newsletter.description : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter: {
                        ...formData.newsletter,
                        description: e.target.value,
                      },
                    })
                  }
                  placeholder="With special offers and out-of-this-world trip ideas, our emails put adventure on the agenda."
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove description</p>
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Submit Button Text
                </label>
                <input
                  type="text"
                  value={formData.newsletter?.buttonText !== undefined ? formData.newsletter.buttonText : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter: {
                        ...formData.newsletter,
                        buttonText: e.target.value,
                      },
                    })
                  }
                  placeholder="Submit"
                  className="w-full sm:w-64 text-xs font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
              </div>

              {/* Terms / Disclaimer */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Terms &amp; Privacy Disclaimer
                </label>
                <textarea
                  rows={2}
                  value={formData.newsletter?.termsText !== undefined ? formData.newsletter.termsText : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter: {
                        ...formData.newsletter,
                        termsText: e.target.value,
                      },
                    })
                  }
                  placeholder="By clicking Submit you agree to our Privacy Statement and Terms & Conditions. This site is protected by reCAPTCHA."
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove disclaimer</p>
              </div>

              {/* Position Options (Dropdown in Form) */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#016839]" />
                      Position Options (Dropdown in Form)
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Add, edit inline, reorder, or remove job positions available in the newsletter &amp; career signup dropdown.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetPositions}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <RefreshCw className="w-3 h-3 text-slate-500" />
                    Reset to Defaults
                  </button>
                </div>

                {/* Add new position input */}
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={newPositionInput}
                    onChange={(e) => setNewPositionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPosition();
                      }
                    }}
                    placeholder="e.g. Forecourt Attendant, Shift Supervisor, Barista..."
                    className="flex-1 text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839] placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddPosition}
                    className="px-4 py-2.5 bg-[#016839] hover:bg-[#01522e] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Position
                  </button>
                </div>

                {/* Positions list */}
                <div className="space-y-2">
                  {(formData.newsletter?.positions || DEFAULT_NEWSLETTER_POSITIONS).map((pos, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5 hover:border-slate-300 transition-colors"
                    >
                      <div className="w-6 text-center text-xs font-bold text-slate-400 shrink-0">
                        {idx + 1}.
                      </div>
                      <input
                        type="text"
                        value={pos}
                        onChange={(e) => handleUpdatePosition(idx, e.target.value)}
                        className="flex-1 text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#016839]"
                      />
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMovePosition(idx, -1)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                          title="Move up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === (formData.newsletter?.positions || DEFAULT_NEWSLETTER_POSITIONS).length - 1}
                          onClick={() => handleMovePosition(idx, 1)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                          title="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemovePosition(idx)}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors ml-1 cursor-pointer"
                          title="Delete position"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
