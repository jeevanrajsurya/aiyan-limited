import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import {
  Compass,
  Save,
  RotateCcw,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  Globe,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || '/';

export const DEFAULT_NAVIGATION_CMS = {
  topBar: {
    enabled: true,
    locationText: 'Unitedstates',
    phoneNumber: '+91 87789-98453',
    phoneLink: 'tel:+918778998453',
  },
  navbar: {
    enabled: true,
    logoUrl: '/uploads/conoco-default.png',
    links: [
      { name: 'Home', to: '/' },
      { name: 'About', to: '/about' },
      { name: 'Our Products', to: '/store' },
      { name: 'Contact', to: '/contact' },
    ],
    showCtaButton: false,
    ctaButtonText: 'Contact Us',
    ctaButtonLink: '/contact',
  },
  footer: {
    enabled: true,
    logoUrl: '/uploads/tribrand-white-reg-mark.png',
    col1Title: '',
    col1Links: [
      { name: 'About Us', to: '/about' },
      { name: 'Contact Us', to: '/contact' },
    ],
    col2Title: '',
    col2Links: [
      { name: 'Email Newsletter', to: '/#newsletter' },
      { name: 'Accessibility Statement', to: '/about' },
    ],
    legalLinks: [
      { name: 'Cookies Settings', to: '#cookies' },
      { name: 'Terms & Conditions', to: '/about' },
      { name: 'Privacy Statement', to: '/about' },
      { name: 'California Supply Disclosure', to: '/about' },
      { name: 'Admin Portal', to: import.meta.env.VITE_ADMIN_URL || '#' },
    ],
    instagramUrl: 'https://www.instagram.com/conoco',
    facebookUrl: 'https://www.facebook.com/conoco',
    youtubeUrl: 'https://youtube.com/playlist?list=PLhZANlfVQtQeQq02_i-P-FzxJk8lOKgX-',
    copyrightText:
      'Conoco® and its respective logos are registered trademarks owned by Phillips 66 Company. KickBack and its respective logos are registered trademarks of KickBack Points, LLC. Other products and logos mentioned herein may be trademarks of their respective owners.\n©2026 Phillips 66 Company. All rights reserved.',
  },
};

// Reusable Image & Media Uploader with Fallback, Preview, and Explicit Removal
function MediaField({ label, value, defaultValue, onChange, hint, allowClear = true }) {
  const [uploading, setUploading] = useState(false);
  const isRemoved = value === '' || value === 'none';
  const isDefault = value === undefined || value === null || value === defaultValue;
  const isCustom = Boolean(value && value !== defaultValue);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImage(file);
      onChange(res.url);
      toast.success(`${label} uploaded successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const previewSrc = isRemoved ? '' : (value || defaultValue);
  const displaySrc = previewSrc?.startsWith('http')
    ? previewSrc
    : `${API_ORIGIN}${previewSrc}`;

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
            ? 'No Image (Removed)'
            : isDefault
            ? 'Default Conoco Asset'
            : 'Custom Asset'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-28 h-16 bg-slate-900 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center shrink-0 p-1">
          {isRemoved ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-950 p-1 text-center">
              <ImageIcon className="w-5 h-5 opacity-40 mb-0.5" />
              <span className="text-[9px] font-semibold">Image Removed</span>
            </div>
          ) : (
            <img
              src={displaySrc}
              alt={label}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                if (defaultValue) {
                  e.currentTarget.src = defaultValue.startsWith('http')
                    ? defaultValue
                    : `${API_ORIGIN}${defaultValue}`;
                }
              }}
            />
          )}
        </div>

        <div className="flex-1 space-y-2 w-full">
          <input
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={isRemoved ? '(Image removed / empty)' : defaultValue}
            className="w-full text-xs font-mono px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
          />

          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors">
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#016839]" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-[#016839]" />
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

            {!isRemoved && allowClear && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Remove image from website"
              >
                <Trash2 className="w-3 h-3" /> Remove Image
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
            <span>Hide / Remove</span>
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5" />
            <span>Show / Restore</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function NavbarFooterTab() {
  const queryClient = useQueryClient();
  const [activeSubTab, setActiveSubTab] = useState('navbar');
  const [formData, setFormData] = useState(DEFAULT_NAVIGATION_CMS);

  // Fetch navigation setting
  const { data: navSetting } = useQuery({
    queryKey: ['admin-navigation-setting'],
    queryFn: () => getSettingByKey('navigation'),
  });

  useEffect(() => {
    if (navSetting?.value) {
      setFormData({
        topBar: { ...DEFAULT_NAVIGATION_CMS.topBar, ...(navSetting.value.topBar || {}) },
        navbar: {
          ...DEFAULT_NAVIGATION_CMS.navbar,
          ...(navSetting.value.navbar || {}),
          links:
            navSetting.value.navbar?.links !== undefined
              ? navSetting.value.navbar.links
              : DEFAULT_NAVIGATION_CMS.navbar.links,
        },
        footer: {
          ...DEFAULT_NAVIGATION_CMS.footer,
          ...(navSetting.value.footer || {}),
          col1Links:
            navSetting.value.footer?.col1Links !== undefined
              ? navSetting.value.footer.col1Links
              : DEFAULT_NAVIGATION_CMS.footer.col1Links,
          col2Links:
            navSetting.value.footer?.col2Links !== undefined
              ? navSetting.value.footer.col2Links
              : DEFAULT_NAVIGATION_CMS.footer.col2Links,
          legalLinks:
            navSetting.value.footer?.legalLinks !== undefined
              ? navSetting.value.footer.legalLinks
              : DEFAULT_NAVIGATION_CMS.footer.legalLinks,
        },
      });
    }
  }, [navSetting]);

  const saveMutation = useMutation({
    mutationFn: (updatedData) => updateSetting('navigation', updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-navigation-setting'] });
      toast.success('Navbar & Footer settings saved successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save navigation settings');
    },
  });

  const handleResetAll = () => {
    if (
      window.confirm(
        'Reset all Navbar, Top Utility Bar, and Footer links & settings to the pristine original Conoco defaults?'
      )
    ) {
      setFormData(DEFAULT_NAVIGATION_CMS);
      saveMutation.mutate(DEFAULT_NAVIGATION_CMS);
    }
  };

  // Helper to add/remove links
  const addNavLink = () => {
    setFormData({
      ...formData,
      navbar: {
        ...formData.navbar,
        links: [...(formData.navbar.links || []), { name: 'New Link', to: '/about' }],
      },
    });
  };

  const removeNavLink = (index) => {
    setFormData({
      ...formData,
      navbar: {
        ...formData.navbar,
        links: formData.navbar.links.filter((_, i) => i !== index),
      },
    });
  };

  const updateNavLink = (index, field, val) => {
    const updated = [...(formData.navbar.links || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({
      ...formData,
      navbar: { ...formData.navbar, links: updated },
    });
  };

  // Helper for footer column links
  const addFooterLink = (col) => {
    const key = col === 1 ? 'col1Links' : 'col2Links';
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        [key]: [...(formData.footer[key] || []), { name: 'New Page', to: '/about' }],
      },
    });
  };

  const removeFooterLink = (col, index) => {
    const key = col === 1 ? 'col1Links' : 'col2Links';
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        [key]: formData.footer[key].filter((_, i) => i !== index),
      },
    });
  };

  const updateFooterLink = (col, index, field, val) => {
    const key = col === 1 ? 'col1Links' : 'col2Links';
    const updated = [...(formData.footer[key] || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({
      ...formData,
      footer: { ...formData.footer, [key]: updated },
    });
  };

  // Helper for bottom legal links
  const addLegalLink = () => {
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        legalLinks: [
          ...(formData.footer.legalLinks || []),
          { name: 'New Legal Link', to: '/about' },
        ],
      },
    });
  };

  const removeLegalLink = (index) => {
    setFormData({
      ...formData,
      footer: {
        ...formData.footer,
        legalLinks: (formData.footer.legalLinks || []).filter((_, i) => i !== index),
      },
    });
  };

  const updateLegalLink = (index, field, val) => {
    const updated = [...(formData.footer.legalLinks || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({
      ...formData,
      footer: { ...formData.footer, legalLinks: updated },
    });
  };

  const subTabs = [
    { id: 'navbar', label: '1. Main Navbar', icon: LinkIcon },
    { id: 'footer', label: '2. Footer & Social Links', icon: Compass },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#016839] flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Navbar &amp; Footer CMS
              </h2>
              <p className="text-xs text-slate-500">
                Manage logos, menus, contact info, social links, and footer columns dynamically across the entire website.
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
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

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#84d400]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: MAIN FLOATING NAVBAR */}
      {activeSubTab === 'navbar' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <CardVisibilityToggle
            enabled={formData.navbar.enabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                navbar: { ...formData.navbar, enabled: val },
              })
            }
            title="Main Floating Navbar Card"
            subtitle="Manage brand logo, menu links, and call-to-action button."
          />

          {formData.navbar.enabled !== false && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Logo and CTA */}
              <div className="space-y-4">
                <MediaField
                  label="Navbar Brand Logo"
                  value={formData.navbar.logoUrl}
                  defaultValue={DEFAULT_NAVIGATION_CMS.navbar.logoUrl}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      navbar: { ...formData.navbar, logoUrl: val },
                    })
                  }
                  hint="Main brand insignia shown on the left. Click 'Remove Image' to show the brand as clean typography instead."
                />

                {/* CTA Button Controls */}
                <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Station Finder CTA Button
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        The green rounded pill button on the far right of the navbar.
                      </p>
                    </div>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.navbar.showCtaButton !== false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            navbar: { ...formData.navbar, showCtaButton: e.target.checked },
                          })
                        }
                        className="w-3.5 h-3.5 text-[#016839] rounded focus:ring-[#016839]"
                      />
                      <span className="text-[11px] font-bold text-slate-600">
                        {formData.navbar.showCtaButton !== false ? 'Enabled' : 'Hidden'}
                      </span>
                    </label>
                  </div>

                  {formData.navbar.showCtaButton !== false && (
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          CTA Button Label
                        </label>
                        <input
                          type="text"
                          value={formData.navbar.ctaButtonText ?? ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              navbar: { ...formData.navbar, ctaButtonText: e.target.value },
                            })
                          }
                          placeholder="Contact Us"
                          className="w-full text-xs px-3 py-2 border rounded-xl bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          CTA Target Link
                        </label>
                        <input
                          type="text"
                          value={formData.navbar.ctaButtonLink ?? ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              navbar: { ...formData.navbar, ctaButtonLink: e.target.value },
                            })
                          }
                          placeholder="/contact"
                          className="w-full text-xs font-mono px-3 py-2 border rounded-xl bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Menu Items Manager */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Navigation Menu Links</h4>
                    <p className="text-[11px] text-slate-500">
                      Links rendered horizontally on desktop &amp; inside the mobile drawer
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addNavLink}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#016839] bg-[#e8f7ee] hover:bg-[#e8f7ee]/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Link
                  </button>
                </div>

                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                  {(formData.navbar.links || []).map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs"
                    >
                      <div className="w-5 text-center text-xs font-bold text-slate-400">
                        {idx + 1}
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => updateNavLink(idx, 'name', e.target.value)}
                          placeholder="Link Label"
                          className="text-xs font-semibold px-2.5 py-1.5 border rounded bg-slate-50 focus:bg-white"
                        />
                        <input
                          type="text"
                          value={link.to}
                          onChange={(e) => updateNavLink(idx, 'to', e.target.value)}
                          placeholder="/path"
                          className="text-xs font-mono px-2.5 py-1.5 border rounded bg-slate-50 focus:bg-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNavLink(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        title="Remove link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {(!formData.navbar.links || formData.navbar.links.length === 0) && (
                    <div className="p-4 text-center text-xs text-slate-400 bg-white border border-dashed rounded-lg">
                      No menu links configured. Click "Add Link" to create one.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: FOOTER & SOCIAL LINKS */}
      {activeSubTab === 'footer' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <CardVisibilityToggle
            enabled={formData.footer.enabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                footer: { ...formData.footer, enabled: val },
              })
            }
            title="Site Footer"
            subtitle="Control visibility of the entire footer across all pages."
          />

          {formData.footer.enabled !== false && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Logo & Legal */}
              <div className="space-y-4">
                <MediaField
                  label="Footer Tri-Brand Logo"
                  value={formData.footer.logoUrl}
                  defaultValue={DEFAULT_NAVIGATION_CMS.footer.logoUrl}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      footer: { ...formData.footer, logoUrl: val },
                    })
                  }
                  hint="White tri-brand logo (Phillips 66, Petrol, 76). Click 'Remove Image' to hide."
                />

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Copyright Notice &amp; Legal Disclaimer
                  </label>
                  <textarea
                    rows="3"
                    value={formData.footer.copyrightText ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        footer: { ...formData.footer, copyrightText: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3 py-2 border rounded-xl"
                  />
                </div>

                {/* Social URLs */}
                <div className="space-y-2 pt-2 border-t">
                  <span className="text-xs font-bold text-slate-800 block">Social Media Links</span>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] text-slate-500 uppercase font-semibold">
                        Instagram URL
                      </label>
                      {formData.footer.instagramUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              footer: { ...formData.footer, instagramUrl: '' },
                            })
                          }
                          className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formData.footer.instagramUrl ?? ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: { ...formData.footer, instagramUrl: e.target.value },
                        })
                      }
                      placeholder="https://www.instagram.com/conoco (Leave blank to hide)"
                      className="w-full text-xs font-mono px-2.5 py-1.5 border rounded-lg"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] text-slate-500 uppercase font-semibold">
                        Facebook URL
                      </label>
                      {formData.footer.facebookUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              footer: { ...formData.footer, facebookUrl: '' },
                            })
                          }
                          className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formData.footer.facebookUrl ?? ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: { ...formData.footer, facebookUrl: e.target.value },
                        })
                      }
                      placeholder="https://www.facebook.com/conoco (Leave blank to hide)"
                      className="w-full text-xs font-mono px-2.5 py-1.5 border rounded-lg"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] text-slate-500 uppercase font-semibold">
                        YouTube URL
                      </label>
                      {formData.footer.youtubeUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              footer: { ...formData.footer, youtubeUrl: '' },
                            })
                          }
                          className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formData.footer.youtubeUrl ?? ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: { ...formData.footer, youtubeUrl: e.target.value },
                        })
                      }
                      placeholder="https://youtube.com/... (Leave blank to hide)"
                      className="w-full text-xs font-mono px-2.5 py-1.5 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Middle: Nav Columns */}
              <div className="space-y-4">
                {/* Column 1 */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Footer Column 1</span>
                    <button
                      type="button"
                      onClick={() => addFooterLink(1)}
                      className="text-[11px] font-bold text-[#016839] hover:underline cursor-pointer"
                    >
                      + Add Link
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                      Column 1 Heading (Leave blank for no heading)
                    </label>
                    <input
                      type="text"
                      value={formData.footer.col1Title ?? ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: { ...formData.footer, col1Title: e.target.value },
                        })
                      }
                      placeholder="e.g. About & Forecourt (or leave blank)"
                      className="text-xs font-bold px-2 py-1.5 border rounded-lg bg-white w-full mb-2"
                    />
                  </div>

                  <div className="space-y-2">
                    {(formData.footer.col1Links || []).map((link, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => updateFooterLink(1, idx, 'name', e.target.value)}
                          placeholder="Label"
                          className="text-xs font-semibold px-2 py-1 border rounded bg-white flex-1"
                        />
                        <input
                          type="text"
                          value={link.to}
                          onChange={(e) => updateFooterLink(1, idx, 'to', e.target.value)}
                          placeholder="/path"
                          className="text-xs font-mono px-2 py-1 border rounded bg-white flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeFooterLink(1, idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="Delete link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Footer Column 2</span>
                    <button
                      type="button"
                      onClick={() => addFooterLink(2)}
                      className="text-[11px] font-bold text-[#016839] hover:underline cursor-pointer"
                    >
                      + Add Link
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                      Column 2 Heading (Leave blank for no heading)
                    </label>
                    <input
                      type="text"
                      value={formData.footer.col2Title ?? ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footer: { ...formData.footer, col2Title: e.target.value },
                        })
                      }
                      placeholder="e.g. Services & Rewards (or leave blank)"
                      className="text-xs font-bold px-2 py-1.5 border rounded-lg bg-white w-full mb-2"
                    />
                  </div>

                  <div className="space-y-2">
                    {(formData.footer.col2Links || []).map((link, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => updateFooterLink(2, idx, 'name', e.target.value)}
                          placeholder="Label"
                          className="text-xs font-semibold px-2 py-1 border rounded bg-white flex-1"
                        />
                        <input
                          type="text"
                          value={link.to}
                          onChange={(e) => updateFooterLink(2, idx, 'to', e.target.value)}
                          placeholder="/path"
                          className="text-xs font-mono px-2 py-1 border rounded bg-white flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeFooterLink(2, idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="Delete link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Legal Links Manager (Full Width Card) */}
              <div className="lg:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Bottom Legal &amp; Policy Links
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {(formData.footer.legalLinks || []).length} Links
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Links displayed at the bottom of the footer (split across two columns on desktop matching Conoco reference). Add, edit, or remove any link below.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addLegalLink}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#016839] bg-[#e8f7ee] hover:bg-[#e8f7ee]/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Legal Link
                  </button>
                </div>

                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {(formData.footer.legalLinks || []).map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs"
                    >
                      <div className="w-6 text-center text-xs font-bold text-slate-400">
                        {idx + 1}
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">
                            Link Label
                          </label>
                          <input
                            type="text"
                            value={link.name}
                            onChange={(e) => updateLegalLink(idx, 'name', e.target.value)}
                            placeholder="e.g. Terms & Conditions"
                            className="text-xs font-semibold px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">
                            Target Path or URL
                          </label>
                          <input
                            type="text"
                            value={link.to}
                            onChange={(e) => updateLegalLink(idx, 'to', e.target.value)}
                            placeholder="/about, #cookies, or https://..."
                            className="text-xs font-mono px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white w-full"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLegalLink(idx)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer self-center"
                        title="Delete legal link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {(!formData.footer.legalLinks || formData.footer.legalLinks.length === 0) && (
                    <div className="p-6 text-center text-xs text-slate-400 bg-white border border-dashed rounded-xl">
                      No legal links configured. Click "Add Legal Link" to add one.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
