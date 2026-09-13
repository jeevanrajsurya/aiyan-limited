import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import {
  Save,
  RotateCcw,
  Layout,
  Grid,
  Sparkles,
  Upload,
  X,
  Plus,
  Trash2,
  ShoppingBag,
  Loader2,
  Image as ImageIcon,
  Eye,
  EyeOff,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Reusable Image & Video Upload Field with Live Preview
function ImageUploadInput({
  label,
  value,
  onChange,
  placeholder = 'Image URL or click Upload...',
  accept = 'image/*',
  isVideoSupported = false,
  className = '',
  previewHeight = 'h-28',
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImage(file);
      const url = res.url || res.secure_url;
      if (url) {
        onChange(url);
        toast.success('Image uploaded successfully!');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const isVideo = isVideoSupported && Boolean(value && /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(value));

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono bg-white focus:ring-2 focus:ring-[#005f73] focus:outline-none"
        />
        <label className="px-3.5 py-2 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all shadow-xs">
          {uploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          <span>{uploading ? 'Uploading...' : 'Upload'}</span>
          <input
            type="file"
            accept={isVideoSupported ? 'image/*,video/mp4,video/webm' : accept}
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {Boolean(value) && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title="Clear media"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Live Preview */}
      {Boolean(value && value.trim()) && (
        <div className={`relative mt-2 ${previewHeight} w-full max-w-md rounded-xl overflow-hidden border border-slate-200 bg-slate-900/5 flex items-center justify-center`}>
          {isVideo ? (
            <video src={value} className="w-full h-full object-cover" muted autoPlay loop playsInline />
          ) : (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export const DEFAULT_OUR_PRODUCTS_CMS = {
  hub: {
    hero: {
      enabled: true,
      headlineLine1: 'Quality You Can Taste & Trust.',
      headlineLine2: 'Artisan Coffee, Fresh Bakery & Everyday Essentials.',
      buttonText: 'Explore In-Store Range',
      buttonLink: '#products',
      bgMediaUrl:
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1920&q=80',
      bgMediaType: 'image',
      badgeText: 'Forecourt In-Store Range',
      title: 'Quality You Can Taste & Trust.',
      subtitle: 'Artisan Coffee, Fresh Bakery & Everyday Essentials.',
      textColor: 'white',
      overlayStyle: 'gradient',
    },
    intro: {
      enabled: true,
      headline:
        'We carry beverages fit for energizing, satisfying, warming up, cooling down or just plain quenching your thirst',
      body:
        'We’ve got your food solutions, too - whether it’s for on-the-go, at work or anywhere in-between… treat time, lunch time, anytime! We’ll supply the everyday necessities for your fridge, your family, your first aid kit or your traveling tool box. Fuel up, oil up and tidy up your car. One stop at S&B Forecourt and you’re ready to take on your day. No matter why you’re stopping or who you’re with, just come as you are…we’ll be here ready and waiting for you!',
    },
    actionCardsEnabled: true,
    actionCards: [
      {
        id: 'card-1',
        enabled: true,
        imageUrl:
          'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'card-2',
        enabled: true,
        imageUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'card-3',
        enabled: true,
        imageUrl:
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'card-4',
        enabled: true,
        imageUrl:
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'card-5',
        enabled: true,
        imageUrl:
          'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
};

export default function OurProductsCmsTab() {
  const queryClient = useQueryClient();
  const [activeMainTab, setActiveMainTab] = useState('hero'); // 'hero', 'cards'

  const { data: settingData, isLoading } = useQuery({
    queryKey: ['setting', 'our_products_cms'],
    queryFn: () => getSettingByKey('our_products_cms'),
  });

  const [formData, setFormData] = useState(DEFAULT_OUR_PRODUCTS_CMS);

  useEffect(() => {
    if (settingData && settingData.value) {
      try {
        const parsed = typeof settingData.value === 'string' ? JSON.parse(settingData.value) : settingData.value;
        setFormData({
          hub: {
            ...DEFAULT_OUR_PRODUCTS_CMS.hub,
            ...(parsed.hub || {}),
            hero: {
              ...DEFAULT_OUR_PRODUCTS_CMS.hub.hero,
              ...(parsed.hub?.hero || {}),
              enabled: parsed.hub?.hero?.enabled !== false,
            },
            intro: {
              ...DEFAULT_OUR_PRODUCTS_CMS.hub.intro,
              ...(parsed.hub?.intro || {}),
              enabled: parsed.hub?.intro?.enabled !== false,
            },
            actionCardsEnabled: parsed.hub?.actionCardsEnabled !== false,
            actionCards: Array.isArray(parsed.hub?.actionCards)
              ? parsed.hub.actionCards.map((c) => ({
                  ...c,
                  enabled: c?.enabled !== false,
                }))
              : DEFAULT_OUR_PRODUCTS_CMS.hub.actionCards,
          },
        });
      } catch (e) {
        console.error('Failed to parse our_products_cms setting:', e);
      }
    }
  }, [settingData]);

  const updateMutation = useMutation({
    mutationFn: (newData) => updateSetting('our_products_cms', JSON.stringify(newData)),
    onSuccess: () => {
      queryClient.invalidateQueries(['setting', 'our_products_cms']);
      queryClient.invalidateQueries(['our-products-cms']);
      toast.success('Our Products settings saved successfully!');
    },
    onError: (err) => {
      toast.error('Failed to save settings: ' + (err.message || 'Unknown error'));
    },
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all Our Products data to defaults? Any unsaved edits will be lost.')) {
      setFormData(DEFAULT_OUR_PRODUCTS_CMS);
      toast.success('Reset to default configuration. Click "Save Changes" to apply.');
    }
  };

  const handleAddCard = () => {
    setFormData((prev) => {
      const cards = [...(prev.hub.actionCards || [])];
      cards.push({
        id: `card-${Date.now()}`,
        enabled: true,
        imageUrl: '',
      });
      return { ...prev, hub: { ...prev.hub, actionCards: cards } };
    });
  };

  const handleToggleCardEnabled = (index) => {
    setFormData((prev) => {
      const cards = [...(prev.hub.actionCards || [])];
      const isCurrentlyEnabled = cards[index]?.enabled !== false;
      cards[index] = { ...cards[index], enabled: !isCurrentlyEnabled };
      return { ...prev, hub: { ...prev.hub, actionCards: cards } };
    });
  };

  const handleRemoveCard = (index) => {
    setFormData((prev) => {
      const cards = prev.hub.actionCards.filter((_, i) => i !== index);
      return { ...prev, hub: { ...prev.hub, actionCards: cards } };
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-16">
        <Loader2 className="w-8 h-8 animate-spin text-[#005f73]" />
      </div>
    );
  }

  const actionCards = formData.hub.actionCards || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-gotham">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
            <ShoppingBag className="w-6 h-6 text-[#005f73]" />
            Our Products CMS Manager
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload images and manage content for the Panoramic Hero and Product Feature Image Cards.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Default
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {[
          { id: 'hero', label: '1. Hub Hero & Intro Header', icon: Layout },
          { id: 'cards', label: `2. Product Feature Image Cards (${actionCards.length})`, icon: Grid },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMainTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 cursor-pointer ${
                isActive
                  ? 'border-[#005f73] text-[#005f73] bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: HUB HERO & INTRO */}
      {/* ========================================================================= */}
      {activeMainTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Hub Hero Banner</h3>
              <p className="text-xs text-slate-500">
                Customize the top panoramic hero banner of /our-products with custom background image or MP4 video.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  hub: {
                    ...prev.hub,
                    hero: {
                      ...prev.hub.hero,
                      enabled: prev.hub.hero?.enabled === false ? true : false,
                    },
                  },
                }))
              }
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
                formData.hub.hero?.enabled !== false
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                  : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
              }`}
            >
              {formData.hub.hero?.enabled !== false ? (
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Headline Line 1 (Fuel Callout) */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Headline Line 1 (Main Fuel / Brand Callout)</label>
              <input
                type="text"
                value={formData.hub.hero.headlineLine1 ?? formData.hub.hero.title ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      hero: { ...prev.hub.hero, headlineLine1: e.target.value, title: e.target.value },
                    },
                  }))
                }
                placeholder="e.g. Quality You Can Taste & Trust."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#005f73] focus:outline-none bg-white"
              />
            </div>

            {/* Headline Line 2 (Secondary Subtitle / App Callout) */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Headline Line 2 (Secondary Subtitle / App Callout)</label>
              <textarea
                rows={2}
                value={formData.hub.hero.headlineLine2 ?? formData.hub.hero.subtitle ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      hero: { ...prev.hub.hero, headlineLine2: e.target.value, subtitle: e.target.value },
                    },
                  }))
                }
                placeholder="e.g. Artisan Coffee, Fresh Bakery & Everyday Essentials."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#005f73] focus:outline-none"
              />
            </div>

            {/* Button Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Button Text</label>
              <input
                type="text"
                value={formData.hub.hero.buttonText ?? 'Explore In-Store Range'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      hero: { ...prev.hub.hero, buttonText: e.target.value },
                    },
                  }))
                }
                placeholder="e.g. Explore In-Store Range"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#005f73] focus:outline-none bg-white"
              />
            </div>

            {/* Button Target Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Button Target Link</label>
              <input
                type="text"
                value={formData.hub.hero.buttonLink ?? '#products'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      hero: { ...prev.hub.hero, buttonLink: e.target.value },
                    },
                  }))
                }
                placeholder="e.g. #products or /contact"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#005f73] focus:outline-none bg-white"
              />
            </div>

            {/* Optional Badge Text */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Badge Text (Optional Pill Tag)</label>
              <input
                type="text"
                value={formData.hub.hero.badgeText ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      hero: { ...prev.hub.hero, badgeText: e.target.value },
                    },
                  }))
                }
                placeholder="FORECOURT IN-STORE RANGE"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold uppercase focus:ring-2 focus:ring-[#005f73] focus:outline-none bg-white"
              />
            </div>

            {/* Hub Hero Background Image/Video Uploader with Reset Default */}
            <div className="md:col-span-2 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Hub Hero Background Media (Image or MP4 Video)</label>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      hub: {
                        ...prev.hub,
                        hero: {
                          ...prev.hub.hero,
                          bgMediaUrl: DEFAULT_OUR_PRODUCTS_CMS.hub.hero.bgMediaUrl,
                          bgMediaType: DEFAULT_OUR_PRODUCTS_CMS.hub.hero.bgMediaType,
                        },
                      },
                    }))
                  }
                  className="text-xs text-[#005f73] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Default Media
                </button>
              </div>
              <ImageUploadInput
                value={formData.hub.hero.bgMediaUrl ?? ''}
                onChange={(url) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      hero: {
                        ...prev.hub.hero,
                        bgMediaUrl: url,
                        bgMediaType: /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url) ? 'video' : 'image',
                      },
                    },
                  }))
                }
                placeholder="Upload background image or video (MP4)..."
                isVideoSupported={true}
                previewHeight="h-40"
              />
            </div>

            {/* Hero Text Color & Background Gradient Tint (Standardized Card) */}
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
                        name="productsHeroTextColor"
                        value={opt.id}
                        checked={(formData.hub.hero.textColor || 'white') === opt.id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hub: {
                              ...prev.hub,
                              hero: { ...prev.hub.hero, textColor: e.target.value },
                            },
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
                        name="productsHeroOverlayStyle"
                        value={tint.id}
                        checked={(formData.hub.hero.overlayStyle || 'gradient') === tint.id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hub: {
                              ...prev.hub,
                              hero: { ...prev.hub.hero, overlayStyle: e.target.value },
                            },
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

            <div className="md:col-span-2 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Intro Message Section</h3>
                <p className="text-xs text-slate-500">
                  Centered brand message displayed below the hero banner.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      intro: {
                        ...prev.hub.intro,
                        enabled: prev.hub.intro?.enabled === false ? true : false,
                      },
                    },
                  }))
                }
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
                  formData.hub.intro?.enabled !== false
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                    : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
                }`}
              >
                {formData.hub.intro?.enabled !== false ? (
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

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Intro Section Main Heading</label>
              <textarea
                rows={2}
                value={formData.hub.intro.headline ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      intro: { ...prev.hub.intro, headline: e.target.value },
                    },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#005f73] focus:outline-none bg-white"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Intro Section Body Copy</label>
              <textarea
                rows={4}
                value={formData.hub.intro.body ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      intro: { ...prev.hub.intro, body: e.target.value },
                    },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:ring-2 focus:ring-[#005f73] focus:outline-none bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PRODUCT FEATURE IMAGE CARDS */}
      {/* ========================================================================= */}
      {activeMainTab === 'cards' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#005f73]" />
                Product Feature Image Cards ({actionCards.length} Cards)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload and manage the showcase image for each product card on the website. Pure visual image display.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      actionCardsEnabled: prev.hub.actionCardsEnabled === false ? true : false,
                    },
                  }))
                }
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  formData.hub.actionCardsEnabled !== false
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                    : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
                }`}
              >
                {formData.hub.actionCardsEnabled !== false ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Section Active</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Section Hidden</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleAddCard}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#005f73] text-white hover:bg-[#0a9396] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Card</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {actionCards.map((card, idx) => (
              <div
                key={card.id || `card-${idx}`}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white font-black text-xs flex items-center justify-center shadow-xs">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-slate-800">
                      Product Card #{idx + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleCardEnabled(idx)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                        card.enabled !== false
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-rose-50 text-rose-700 border-rose-300'
                      }`}
                      title={card.enabled !== false ? 'Card is active on website' : 'Card is hidden from website'}
                    >
                      {card.enabled !== false ? (
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
                      onClick={() => handleRemoveCard(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Image Upload Field */}
                <div>
                  <ImageUploadInput
                    label="Upload Card Image"
                    value={card.imageUrl ?? ''}
                    onChange={(url) => {
                      setFormData((prev) => {
                        const cards = [...prev.hub.actionCards];
                        cards[idx] = { ...cards[idx], imageUrl: url };
                        return { ...prev, hub: { ...prev.hub, actionCards: cards } };
                      });
                    }}
                    placeholder="Upload image or enter URL..."
                    previewHeight="h-44"
                  />
                </div>
              </div>
            ))}
          </div>

          {actionCards.length === 0 && (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-500 mb-3">No cards currently configured.</p>
              <button
                type="button"
                onClick={handleAddCard}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#005f73] text-white hover:bg-[#0a9396] transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add First Card
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
