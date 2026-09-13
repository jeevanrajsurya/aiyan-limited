import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import {
  Mail,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Phone,
  ExternalLink,
  HelpCircle,
  Layout,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Upload,
  Video,
  Image as ImageIcon,
  X,
  MapPin,
  Map,
  Eye,
  EyeOff,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DEFAULT_CONTACT_CMS = {
  hero: {
    enabled: true,
    headlineLine1: "We're Here Whenever You Need Us.",
    headlineLine2: "Stop by our 24/7 Forecourt or drop us a line below.",
    buttonText: 'Get In Touch',
    buttonLink: '#contact-form',
    title: "We're Here Whenever You Need Us.",
    subtitle: "Stop by our 24/7 Forecourt or drop us a line below.",
    bgMediaUrl: '',
    bgMediaType: 'auto',
    textColor: 'white',
    overlayStyle: 'gradient',
  },
  officeDetails: {
    enabled: true,
    badge: 'Station & Office Location',
    heading: 'Better yet, see us in person!',
    subheading: 'We love our customers, so feel free to visit during normal business hours.',
    companyName: 'Aiyan Limited',
    address: 'SR6 7PQ, Sunderland, Tyne and Wear, England, United Kingdom',
    email: 'info@aiyanlimited.com',
    phone: '01913001506',
    hoursTitle: 'Hours',
    hoursText: 'Open today 06:00 – 23:00',
    schedule: [
      { day: 'Monday – Friday', hours: '06:00 – 23:00' },
      { day: 'Saturday', hours: '06:00 – 23:00' },
      { day: 'Sunday', hours: '06:00 – 23:00' },
    ],
    mapEmbedUrl:
      'https://maps.google.com/maps?q=SR6+7PQ,+Sunderland,+Tyne+and+Wear,+United+Kingdom&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  formSettings: {
    enabled: true,
    sideMediaUrl: '',
    sideImageUrl: '',
    sideMediaType: 'auto',
    optInText:
      'Sign up for email updates from Aiyan Limited and a chance to win promo items each quarter.',
    disclaimerText:
      'By clicking the SUBMIT button you agree to the Privacy Statement and Terms & Conditions.',
  },
};

export default function ContactPageCmsTab() {
  const queryClient = useQueryClient();
  const [activeSubtab, setActiveSubtab] = useState('hero');
  const [formData, setFormData] = useState(DEFAULT_CONTACT_CMS);
  const [uploadingHeroMedia, setUploadingHeroMedia] = useState(false);
  const [uploadingSideImage, setUploadingSideImage] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['cms-contact-page'],
    queryFn: () => getSettingByKey('contact_page_cms'),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data?.value) {
      setFormData({
        hero: {
          enabled: data.value.hero?.enabled !== false,
          headlineLine1:
            data.value.hero?.headlineLine1 ||
            data.value.hero?.title ||
            DEFAULT_CONTACT_CMS.hero.headlineLine1,
          headlineLine2:
            data.value.hero?.headlineLine2 ||
            data.value.hero?.subtitle ||
            DEFAULT_CONTACT_CMS.hero.headlineLine2,
          buttonText:
            data.value.hero?.buttonText ||
            DEFAULT_CONTACT_CMS.hero.buttonText,
          buttonLink:
            data.value.hero?.buttonLink ||
            DEFAULT_CONTACT_CMS.hero.buttonLink,
          title:
            data.value.hero?.title !== undefined
              ? data.value.hero.title
              : DEFAULT_CONTACT_CMS.hero.title,
          subtitle:
            data.value.hero?.subtitle !== undefined
              ? data.value.hero.subtitle
              : DEFAULT_CONTACT_CMS.hero.subtitle,
          bgMediaUrl: data.value.hero?.bgMediaUrl || '',
          bgMediaType: data.value.hero?.bgMediaType || 'auto',
          textColor: data.value.hero?.textColor || 'white',
          overlayStyle: data.value.hero?.overlayStyle || 'gradient',
        },
        officeDetails: {
          enabled: data.value.officeDetails?.enabled !== false,
          badge: data.value.officeDetails?.badge ?? DEFAULT_CONTACT_CMS.officeDetails.badge,
          heading: data.value.officeDetails?.heading ?? DEFAULT_CONTACT_CMS.officeDetails.heading,
          subheading: data.value.officeDetails?.subheading ?? DEFAULT_CONTACT_CMS.officeDetails.subheading,
          companyName: data.value.officeDetails?.companyName ?? DEFAULT_CONTACT_CMS.officeDetails.companyName,
          address: data.value.officeDetails?.address ?? DEFAULT_CONTACT_CMS.officeDetails.address,
          email: data.value.officeDetails?.email ?? DEFAULT_CONTACT_CMS.officeDetails.email,
          phone: data.value.officeDetails?.phone ?? DEFAULT_CONTACT_CMS.officeDetails.phone,
          hoursTitle: data.value.officeDetails?.hoursTitle ?? DEFAULT_CONTACT_CMS.officeDetails.hoursTitle,
          hoursText: data.value.officeDetails?.hoursText ?? DEFAULT_CONTACT_CMS.officeDetails.hoursText,
          schedule: Array.isArray(data.value.officeDetails?.schedule)
            ? data.value.officeDetails.schedule
            : (data.value.officeDetails?.schedule === undefined ? DEFAULT_CONTACT_CMS.officeDetails.schedule : []),
          mapEmbedUrl: data.value.officeDetails?.mapEmbedUrl ?? DEFAULT_CONTACT_CMS.officeDetails.mapEmbedUrl,
        },
        formSettings: {
          enabled: data.value.formSettings?.enabled !== false,
          sideMediaUrl:
            data.value.formSettings?.sideMediaUrl !== undefined
              ? data.value.formSettings.sideMediaUrl
              : (data.value.formSettings?.sideImageUrl || ''),
          sideImageUrl:
            data.value.formSettings?.sideImageUrl ||
            data.value.formSettings?.sideMediaUrl ||
            '',
          sideMediaType: data.value.formSettings?.sideMediaType || 'auto',
          optInText:
            data.value.formSettings?.optInText !== undefined
              ? data.value.formSettings.optInText
              : DEFAULT_CONTACT_CMS.formSettings.optInText,
          disclaimerText:
            data.value.formSettings?.disclaimerText !== undefined
              ? data.value.formSettings.disclaimerText
              : DEFAULT_CONTACT_CMS.formSettings.disclaimerText,
        },
      });
    }
  }, [data]);

  const handleHeroMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingHeroMedia(true);
      const res = await uploadImage(file);
      const isVid =
        file.type.startsWith('video/') ||
        /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);
      setFormData((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          bgMediaUrl: res.url,
          bgMediaType: isVid ? 'video' : 'image',
          textColor: 'white',
        },
      }));
      toast.success('Hero media uploaded successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload hero media');
    } finally {
      setUploadingHeroMedia(false);
    }
  };

  const handleSideMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingSideImage(true);
      const res = await uploadImage(file);
      const isVid =
        file.type.startsWith('video/') ||
        /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);
      setFormData((prev) => ({
        ...prev,
        formSettings: {
          ...prev.formSettings,
          sideMediaUrl: res.url,
          sideImageUrl: res.url,
          sideMediaType: isVid ? 'video' : 'image',
        },
      }));
      toast.success(isVid ? 'Side video uploaded successfully!' : 'Side image uploaded successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload side media');
    } finally {
      setUploadingSideImage(false);
    }
  };

  const saveMutation = useMutation({
    mutationFn: (updatedData) =>
      updateSetting('contact_page_cms', updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-contact-page'] });
      toast.success('Contact page settings saved successfully!');
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || 'Failed to save contact settings'
      );
    },
  });

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Reset all Contact Us settings to the clean 3-section defaults?'
      )
    ) {
      setFormData(DEFAULT_CONTACT_CMS);
      saveMutation.mutate(DEFAULT_CONTACT_CMS);
    }
  };

  const isHeroVideo =
    formData.hero.bgMediaType === 'video' ||
    /\.(mp4|webm|mov|m4v|ogg)$/i.test(formData.hero.bgMediaUrl || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading Contact CMS settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#005f73]" />
            <h2 className="text-xl font-bold text-slate-900">
              Contact Us Page CMS
            </h2>
            <span className="text-[10px] font-bold bg-[#f0f9fa] text-[#005f73] border border-[#005f73]/30 px-2 py-0.5 rounded-full uppercase">
              3 Sections
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Control the Full-Width Hero, Office Details &amp; Interactive Map (Nayara Style), and Inquiry Form with Side Image.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Subtab Navigation (Exactly 3) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'hero', label: '1. Full-Width Hero', icon: Layout },
          { id: 'office', label: '2. Office Details & Interactive Map', icon: MapPin },
          { id: 'form', label: '3. Inquiry Form & Side Image', icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubtab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubtab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* SUBTAB 1: FULL-WIDTH HERO                                             */}
      {/* ===================================================================== */}
      {activeSubtab === 'hero' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layout className="w-4 h-4 text-[#005f73]" /> 1. Full-Width Hero Banner
              </h3>
              <p className="text-xs text-slate-500">
                Full-width edge-to-edge header supporting background video or images, headline, subtitle, and breadcrumbs.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, enabled: formData.hero.enabled === false ? true : false },
                })
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Text & Style fields */}
            <div className="space-y-4">
              {/* Headline Line 1 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Headline Line 1 (Main Fuel / Brand Callout)
                </label>
                <input
                  type="text"
                  value={formData.hero.headlineLine1 ?? formData.hero.title ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: {
                        ...formData.hero,
                        headlineLine1: e.target.value,
                        title: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. We're Here Whenever You Need Us."
                  className="w-full text-xs font-semibold px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#005f73]"
                />
              </div>

              {/* Headline Line 2 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Headline Line 2 (Secondary Subtitle / App Callout)
                </label>
                <textarea
                  rows="2"
                  value={formData.hero.headlineLine2 ?? formData.hero.subtitle ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: {
                        ...formData.hero,
                        headlineLine2: e.target.value,
                        subtitle: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. Stop by our 24/7 Forecourt or drop us a line below."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#005f73]"
                />
              </div>

              {/* Button Text & Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.hero.buttonText ?? 'Get In Touch'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, buttonText: e.target.value },
                      })
                    }
                    placeholder="e.g. Get In Touch"
                    className="w-full text-xs font-semibold px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#005f73]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Button Target Link
                  </label>
                  <input
                    type="text"
                    value={formData.hero.buttonLink ?? '#contact-form'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, buttonLink: e.target.value },
                      })
                    }
                    placeholder="e.g. #contact-form"
                    className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#005f73]"
                  />
                </div>
              </div>

              {/* Hero Text Color & Background Gradient Tint (Standardized Card) */}
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
                          name="contactHeroTextColor"
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
                          name="contactHeroOverlayStyle"
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
            </div>

            {/* Right: Background Media Uploader */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Hero Background Media (Image or MP4 Video)
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      hero: {
                        ...formData.hero,
                        bgMediaUrl: DEFAULT_CONTACT_CMS.hero.bgMediaUrl,
                        bgMediaType: DEFAULT_CONTACT_CMS.hero.bgMediaType,
                      },
                    })
                  }
                  className="text-xs text-[#005f73] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Default Media
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.hero.bgMediaUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, bgMediaUrl: e.target.value },
                    })
                  }
                  placeholder="https://.../video.mp4 or image url"
                  className="flex-1 text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl"
                />
                <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/webm"
                    onChange={handleHeroMediaUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Media preview */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center">
                {formData.hero.bgMediaUrl ? (
                  <>
                    {isHeroVideo ? (
                      <video
                        src={formData.hero.bgMediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={formData.hero.bgMediaUrl}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          hero: { ...formData.hero, bgMediaUrl: '' },
                        })
                      }
                      className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-lg transition-all cursor-pointer"
                      title="Remove media"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="text-center text-slate-400 text-xs">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                    <span>No custom background uploaded (uses brand petrol gradient)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 2: OFFICE DETAILS & MAP                                        */}
      {/* ===================================================================== */}
      {activeSubtab === 'office' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#005f73]" /> 2. Office Details &amp; Interactive Map
              </h3>
              <p className="text-xs text-slate-500">
                Configure your office location details, contact info, opening hours, and interactive Google Map.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  officeDetails: {
                    ...formData.officeDetails,
                    enabled: formData.officeDetails.enabled === false ? true : false,
                  },
                })
              }
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
                formData.officeDetails.enabled !== false
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                  : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
              }`}
            >
              {formData.officeDetails.enabled !== false ? (
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Office Details Form */}
            <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#005f73] uppercase pb-2 border-b border-slate-200">
                <MapPin className="w-4 h-4 text-[#005f73]" />
                <span>Office Location &amp; Visit Details</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location Pill Badge (e.g. Station &amp; Office Location)
                </label>
                <input
                  type="text"
                  value={formData.officeDetails.badge ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      officeDetails: {
                        ...formData.officeDetails,
                        badge: e.target.value,
                      },
                    })
                  }
                  placeholder="Station & Office Location (Leave empty to remove)"
                  className="w-full text-xs font-medium px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Small pill badge displayed above the heading. Clear this input to remove it from the live site.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={formData.officeDetails.heading || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      officeDetails: {
                        ...formData.officeDetails,
                        heading: e.target.value,
                      },
                    })
                  }
                  placeholder="Better yet, see us in person!"
                  className="w-full text-xs font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subheading
                </label>
                <textarea
                  rows="2"
                  value={formData.officeDetails.subheading || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      officeDetails: {
                        ...formData.officeDetails,
                        subheading: e.target.value,
                      },
                    })
                  }
                  placeholder="We love our customers, so feel free to visit during normal business hours."
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Business Name
                </label>
                <input
                  type="text"
                  value={formData.officeDetails.companyName || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      officeDetails: {
                        ...formData.officeDetails,
                        companyName: e.target.value,
                      },
                    })
                  }
                  placeholder="Aiyan Limited"
                  className="w-full text-xs font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Address
                </label>
                <textarea
                  rows="2"
                  value={formData.officeDetails.address || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      officeDetails: {
                        ...formData.officeDetails,
                        address: e.target.value,
                      },
                    })
                  }
                  placeholder="SR6 7PQ, Sunderland, Tyne and Wear, England, United Kingdom"
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.officeDetails.email || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        officeDetails: {
                          ...formData.officeDetails,
                          email: e.target.value,
                        },
                      })
                    }
                    placeholder="info@aiyanlimited.com"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.officeDetails.phone || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        officeDetails: {
                          ...formData.officeDetails,
                          phone: e.target.value,
                        },
                      })
                    }
                    placeholder="01913001506"
                    className="w-full text-xs font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hours Label
                  </label>
                  <input
                    type="text"
                    value={formData.officeDetails.hoursTitle || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        officeDetails: {
                          ...formData.officeDetails,
                          hoursTitle: e.target.value,
                        },
                      })
                    }
                    placeholder="Hours"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hours Text
                  </label>
                  <input
                    type="text"
                    value={formData.officeDetails.hoursText || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        officeDetails: {
                          ...formData.officeDetails,
                          hoursText: e.target.value,
                        },
                      })
                    }
                    placeholder="Open today 06:00 – 23:00"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                  />
                </div>
              </div>

              {/* Expandable Weekly Hours Schedule List */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-800">
                      Weekly Schedule Dropdown ({formData.officeDetails.schedule?.length || 0} Rows)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Edit the day & time rows shown when visitors click the hours dropdown.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.officeDetails.schedule || [];
                      setFormData({
                        ...formData,
                        officeDetails: {
                          ...formData.officeDetails,
                          schedule: [...current, { day: 'Monday – Friday', hours: '06:00 – 23:00' }],
                        },
                      });
                    }}
                    className="px-2.5 py-1.5 bg-[#005f73] hover:bg-[#0a9396] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Row
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.officeDetails.schedule || []).map((row, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                      <input
                        type="text"
                        value={row.day || ''}
                        onChange={(e) => {
                          const list = [...(formData.officeDetails.schedule || [])];
                          list[rIdx] = { ...list[rIdx], day: e.target.value };
                          setFormData({
                            ...formData,
                            officeDetails: { ...formData.officeDetails, schedule: list },
                          });
                        }}
                        placeholder="e.g. Monday – Friday"
                        className="flex-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white"
                      />
                      <input
                        type="text"
                        value={row.hours || ''}
                        onChange={(e) => {
                          const list = [...(formData.officeDetails.schedule || [])];
                          list[rIdx] = { ...list[rIdx], hours: e.target.value };
                          setFormData({
                            ...formData,
                            officeDetails: { ...formData.officeDetails, schedule: list },
                          });
                        }}
                        placeholder="e.g. 06:00 – 23:00"
                        className="flex-1 text-xs font-mono px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const list = (formData.officeDetails.schedule || []).filter((_, idx) => idx !== rIdx);
                          setFormData({
                            ...formData,
                            officeDetails: { ...formData.officeDetails, schedule: list },
                          });
                        }}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {(!formData.officeDetails.schedule || formData.officeDetails.schedule.length === 0) && (
                    <p className="text-xs text-slate-400 italic py-1">
                      No schedule rows configured. The schedule dropdown will be hidden on the live website.
                    </p>
                  )}
                </div>
              </div>

              <div className="p-3 bg-cyan-50/70 border border-cyan-200/60 rounded-xl text-[11px] text-[#005f73] leading-relaxed">
                💡 <strong>Dynamic Field Rule:</strong> Any field you leave blank (empty Address, Phone, Email, Hours, or Map URL) will automatically be hidden from the website output.
              </div>
            </div>

            {/* Right Column: Google Map Embed URL & Preview */}
            <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase pb-2 border-b border-slate-200">
                  <Map className="w-4 h-4 text-[#005f73]" />
                  <span>Google Map Embed URL</span>
                </div>
                <input
                  type="text"
                  value={formData.officeDetails.mapEmbedUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      officeDetails: {
                        ...formData.officeDetails,
                        mapEmbedUrl: e.target.value,
                      },
                    })
                  }
                  placeholder="https://maps.google.com/maps?q=...&output=embed"
                  className="w-full text-xs font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                />
                <p className="text-[11px] text-slate-500">
                  Paste any standard Google Maps embed URL here. It displays interactively in the right column of Section 2.
                </p>
              </div>

              {/* Map Preview */}
              <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-inner">
                {formData.officeDetails.mapEmbedUrl ? (
                  <iframe
                    title="Google Map Preview"
                    src={formData.officeDetails.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No map embed URL provided
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 3: INQUIRY FORM & SIDE IMAGE                                   */}
      {/* ===================================================================== */}
      {activeSubtab === 'form' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#005f73]" /> 3. Inquiry Form &amp; Left-Side Image
              </h3>
              <p className="text-xs text-slate-500">
                Configure the left-side brand image, inquiry dropdown topics, and form disclaimers.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  formSettings: {
                    ...formData.formSettings,
                    enabled: formData.formSettings.enabled === false ? true : false,
                  },
                })
              }
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
                formData.formSettings.enabled !== false
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                  : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
              }`}
            >
              {formData.formSettings.enabled !== false ? (
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Form Side Media (Image or Looping Video) */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#005f73]" /> Left-Side Media (Image or Looping Video)
                </label>
                {/* Media Type Selector */}
                <div className="flex items-center gap-1 bg-white border border-slate-200 p-0.5 rounded-lg text-[11px] font-semibold">
                  {[
                    { id: 'auto', label: 'Auto' },
                    { id: 'image', label: 'Image' },
                    { id: 'video', label: 'Video' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          formSettings: {
                            ...formData.formSettings,
                            sideMediaType: t.id,
                          },
                        })
                      }
                      className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                        (formData.formSettings.sideMediaType || 'auto') === t.id
                          ? 'bg-[#005f73] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                Displays on the left alongside the Inquiry Form. Supports high-res photos or looping MP4/WebM videos. <strong>Leave blank to center the form neatly.</strong>
              </p>

              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={formData.formSettings.sideMediaUrl ?? formData.formSettings.sideImageUrl ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      formSettings: {
                        ...formData.formSettings,
                        sideMediaUrl: e.target.value,
                        sideImageUrl: e.target.value,
                      },
                    })
                  }
                  placeholder="Paste image/video URL or upload (leave empty to center form)"
                  className="flex-1 min-w-[200px] text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl bg-white"
                />
                <label className="px-3.5 py-2 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all">
                  {uploadingSideImage ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading…</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Media</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleSideMediaUpload}
                    disabled={uploadingSideImage}
                    className="hidden"
                  />
                </label>
                {(formData.formSettings.sideMediaUrl || formData.formSettings.sideImageUrl) && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        formSettings: {
                          ...formData.formSettings,
                          sideMediaUrl: '',
                          sideImageUrl: '',
                        },
                      })
                    }
                    className="px-3 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0"
                    title="Clear media to center form"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear (Center Form)</span>
                  </button>
                )}
              </div>

              {/* Media Preview or Center Form Notice */}
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-2">
                {(formData.formSettings.sideMediaUrl || formData.formSettings.sideImageUrl) ? (
                  ((formData.formSettings.sideMediaType === 'video') ||
                  /\.(mp4|webm|mov|m4v|ogg)$/i.test(formData.formSettings.sideMediaUrl || formData.formSettings.sideImageUrl || '')) ? (
                    <video
                      src={formData.formSettings.sideMediaUrl || formData.formSettings.sideImageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={formData.formSettings.sideMediaUrl || formData.formSettings.sideImageUrl}
                      alt="Side Media Preview"
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <div className="text-center p-6 space-y-2 text-slate-400">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <Layout className="w-5 h-5 text-[#005f73]" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">No Left-Side Media Configured</p>
                    <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                      The Inquiry Form will be <strong>centered neatly</strong> in the middle of the Contact Us page.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Form Settings & Disclaimers */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#005f73]" /> Form Settings &amp; Disclaimers
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Newsletter Opt-in Checkbox Label
                </label>
                <input
                  type="text"
                  value={formData.formSettings.optInText ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      formSettings: {
                        ...formData.formSettings,
                        optInText: e.target.value,
                      },
                    })
                  }
                  placeholder="Leave blank to hide opt-in checkbox"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  If left blank, the opt-in newsletter checkbox will not be shown on the form.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Privacy Statement / Terms Disclaimer
                </label>
                <textarea
                  rows="4"
                  value={formData.formSettings.disclaimerText ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      formSettings: {
                        ...formData.formSettings,
                        disclaimerText: e.target.value,
                      },
                    })
                  }
                  placeholder="By clicking SUBMIT you agree to our Terms..."
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#005f73]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Displayed beneath the submit button.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

