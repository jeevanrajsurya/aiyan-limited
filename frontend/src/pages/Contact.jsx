import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Mail,
  PhoneCall,
  Building2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getContactPageSettings, submitInquiry, getCachedContactSettings } from '../api/client';
import { fallbackSettings } from '../data/forecourtData';
import { resolveImageUrl } from '../utils/imageHelper';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // Form state (must be declared before any early return — rules of hooks)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [optInNewsletter, setOptInNewsletter] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const { data: cmsData, isLoading: cmsLoading } = useQuery({
    queryKey: ['contact-page-cms'],
    queryFn: getContactPageSettings,
    initialData: getCachedContactSettings,
    initialDataUpdatedAt: 0,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  });

  // Prevent flash of uninitialized/fallback layout on cold start (no cache yet)
  if (cmsLoading && !cmsData) {
    return <div className="min-h-screen bg-white" />;
  }

  const cms = cmsData || fallbackSettings.contact_page_cms;



  async function handleSubmit(e) {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Please enter your first and last name');
      return;
    }
    if (!email.trim() || !message.trim()) {
      toast.error('Please fill in your email address and message');
      return;
    }

    try {
      setLoading(true);
      await submitInquiry({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: `Contact Form Submission from ${firstName.trim()} ${lastName.trim()}`,
        optInNewsletter,
        message: message.trim(),
      });

      setSuccess(true);
      toast.success('Your message has been received! Our team will respond shortly.');
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          'Failed to submit message. Please call us directly.'
      );
    } finally {
      setLoading(false);
    }
  }

  const handleResetForm = () => {
    setSuccess(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setOptInNewsletter(false);
  };

  // Hero settings
  const hero = cms.hero || {};
  const rawHeroBgMedia = (hero.bgMediaUrl || hero.bgImageUrl || '').trim();
  const heroBgMedia = resolveImageUrl(rawHeroBgMedia, '');
  const isVideo =
    hero.bgMediaType === 'video' ||
    /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(heroBgMedia);
  const isWhiteText = (hero.textColor || 'white') !== 'dark';
  const overlayStyle = hero.overlayStyle || 'gradient';

  const line1 =
    (hero.headlineLine1 || hero.title || "We're Here Whenever You Need Us.").trim();
  const line2 =
    (hero.headlineLine2 || hero.subtitle || 'Stop by our 24/7 Forecourt or drop us a line below.').trim();
  const ctaText =
    (hero.buttonText || hero.ctaPrimaryText || 'Get In Touch').trim();
  const ctaLink =
    (hero.buttonLink || hero.ctaPrimaryLink || '#contact-form').trim();

  // Helper to format Conoco/Homepage-style bold headline accent text
  const renderHeadlineSpan = (text, defaultHighlight) => {
    if (!text) return null;

    // 1. Support markdown bold **text** for custom highlights from admin
    if (/\*\*(.*?)\*\*/.test(text)) {
      const segments = text.split(/(\*\*.*?\*\*)/g);
      return (
        <>
          {segments.map((seg, i) => {
            if (seg.startsWith('**') && seg.endsWith('**')) {
              const inner = seg.slice(2, -2);
              return (
                <strong
                  key={i}
                  className={`font-black italic uppercase tracking-normal ${
                    isWhiteText ? 'text-amber-400' : 'text-[#005f73]'
                  }`}
                >
                  {inner}
                </strong>
              );
            }
            return seg;
          })}
        </>
      );
    }

    // 2. Default highlight matching
    if (defaultHighlight) {
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
    }

    return text;
  };

  // Office & Map details (Strict conditional rendering: if left blank in admin, it will NOT display)
  const defaultOffice = {
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
  };

  const hasOfficeData = Boolean(cms?.officeDetails);
  const office = cms?.officeDetails || defaultOffice;

  const officeBadge = hasOfficeData
    ? (office.badge !== undefined ? (office.badge?.trim() || '') : defaultOffice.badge)
    : defaultOffice.badge;
  const officeHeading = hasOfficeData ? (office.heading?.trim() || '') : defaultOffice.heading;
  const officeSubheading = hasOfficeData ? (office.subheading?.trim() || '') : defaultOffice.subheading;
  const officeCompanyName = hasOfficeData ? (office.companyName?.trim() || '') : defaultOffice.companyName;
  const officeAddress = hasOfficeData ? (office.address?.trim() || '') : defaultOffice.address;
  const officeEmail = hasOfficeData ? (office.email?.trim() || '') : defaultOffice.email;
  const officePhone = hasOfficeData ? (office.phone?.trim() || '') : defaultOffice.phone;
  const officeHoursTitle = hasOfficeData ? (office.hoursTitle?.trim() || '') : defaultOffice.hoursTitle;
  const officeHoursText = hasOfficeData ? (office.hoursText?.trim() || '') : defaultOffice.hoursText;
  const officeSchedule = (hasOfficeData
    ? (Array.isArray(office.schedule) ? office.schedule : [])
    : defaultOffice.schedule
  ).filter((row) => row && (row.day?.trim() || row.hours?.trim()));
  const mapEmbedUrl = hasOfficeData ? (office.mapEmbedUrl?.trim() || '') : defaultOffice.mapEmbedUrl;
  const hasOfficeLeftContent = Boolean(
    officeBadge ||
    officeHeading ||
    officeSubheading ||
    officeCompanyName ||
    officeAddress ||
    officeEmail ||
    officePhone ||
    officeHoursTitle ||
    officeHoursText ||
    officeSchedule.length > 0
  );

  // Form settings & Left-side media (Image or Video, or Empty = Centered Form)
  const rawSideMedia =
    cms.formSettings?.sideMediaUrl !== undefined
      ? cms.formSettings.sideMediaUrl
      : cms.formSettings?.sideImageUrl;
  const sideMediaUrl = rawSideMedia ? resolveImageUrl(rawSideMedia.trim(), '') : '';
  const hasSideMedia = Boolean(sideMediaUrl && sideMediaUrl.trim() !== '');
  const sideMediaType = cms.formSettings?.sideMediaType || 'auto';
  const isSideVideo =
    hasSideMedia &&
    (sideMediaType === 'video' ||
      /\.(mp4|webm|mov|m4v|ogg)$/i.test(sideMediaUrl));
  const optInText = cms.formSettings?.optInText;
  const disclaimerText = cms.formSettings?.disclaimerText;

  return (
    <div className="min-h-screen bg-white text-[#161616] font-sans">
      {/* ========================================================================= */}
      {/* 1. FULL-WIDTH HERO SECTION (Edge-to-edge, Full-Screen like Home Hero)    */}
      {/* ========================================================================= */}
      {hero.enabled !== false && (
        <section className="relative w-full min-h-screen h-screen flex items-center overflow-hidden bg-[#071e26] border-none">
          {/* Background Media: Video or High-Res Image (Full Bleed Edge-to-Edge) */}
          {heroBgMedia ? (
            isVideo ? (
              <video
                src={heroBgMedia}
                poster={hero.posterUrl ? resolveImageUrl(hero.posterUrl) : undefined}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
              />
            ) : !/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(heroBgMedia) ? (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none scale-105"
                style={{ backgroundImage: `url(${heroBgMedia})` }}
              />
            ) : null
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#071e26] via-[#005f73] to-[#071e26] z-0" />
          )}

          {/* Ambient Overlays based on CMS selection */}
          {overlayStyle === 'warm' && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-amber-600/20 z-[1] pointer-events-none" />
          )}
          {overlayStyle === 'gradient' && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-[1] pointer-events-none" />
          )}
          {overlayStyle === 'dark' && (
            <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />
          )}

          {/* Seamless Bottom Gradient Fade into Content Below (Pure White Transition) */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-[2]" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-[3]" />

          {/* Hero Banner Content — Left-Aligned Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28 flex flex-col items-start justify-center text-left space-y-6 sm:space-y-8">
            <div className="max-w-3xl space-y-3 sm:space-y-4">
              {line1 && (
                <h1
                  className={`font-gotham text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] ${
                    isWhiteText ? 'text-white drop-shadow-2xl' : 'text-[#161616] drop-shadow-sm'
                  }`}
                >
                  {renderHeadlineSpan(line1, 'Whenever You Need Us\\.?')}
                </h1>
              )}

              {line2 && (
                <p
                  className={`font-gotham text-base sm:text-xl md:text-2xl font-medium tracking-wide max-w-2xl ${
                    isWhiteText ? 'text-white/90 drop-shadow-lg' : 'text-[#161616]/90 drop-shadow-xs'
                  }`}
                >
                  {renderHeadlineSpan(line2, 'drop us a line below\\.?')}
                </p>
              )}
            </div>

            {/* CTA Pill Button */}
            {ctaText && (
              <div className="pt-2 sm:pt-4">
                <a
                  href={ctaLink || '#contact-form'}
                  className={`inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full font-gotham font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-2xl hover:scale-105 cursor-pointer ${
                    isWhiteText
                      ? 'border-2 border-white/80 bg-white/10 hover:bg-[#f59e0b] hover:border-[#f59e0b] hover:text-[#071e26] backdrop-blur-md text-white hover:shadow-amber-500/25'
                      : 'border-2 border-[#161616] bg-[#161616]/10 hover:bg-[#161616] hover:text-white text-[#161616]'
                  }`}
                >
                  <span>{ctaText}</span>
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
      )}

      {/* ========================================================================= */}
      {/* 2. OFFICE DETAILS & INTERACTIVE MAP (Professional Petrol Retail Design)    */}
      {/* ========================================================================= */}
      {office.enabled !== false && (hasOfficeLeftContent || Boolean(mapEmbedUrl)) && (
        <section className="w-full bg-white py-16 sm:py-24 border-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 ${Boolean(mapEmbedUrl) && hasOfficeLeftContent ? 'lg:grid-cols-12 gap-8 lg:gap-12 items-stretch' : 'max-w-4xl mx-auto'}`}>

              {/* Left Column: Premium Contact Information Card */}
              {hasOfficeLeftContent && (
                <div className={`${mapEmbedUrl ? 'lg:col-span-5' : 'w-full'} flex flex-col justify-between`}>
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_35px_-12px_rgba(0,95,115,0.08)] relative overflow-hidden h-full flex flex-col justify-between">
                    {/* Top Accent Gradient Bar */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#005f73] via-[#0a9396] to-[#f59e0b]" />

                    <div>
                      {/* Section Badge (Editable/Removable via Admin CMS) */}
                      {officeBadge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f9fa] border border-[#005f73]/20 text-[#005f73] text-[11px] font-bold uppercase tracking-wider mb-4">
                          <MapPin className="w-3.5 h-3.5 text-[#005f73]" />
                          <span>{officeBadge}</span>
                        </div>
                      )}

                      {/* Heading & Subheading */}
                      {officeHeading && (
                        <h2 className="font-gotham text-2xl sm:text-3xl font-black text-[#071e26] tracking-tight leading-snug">
                          {officeHeading}
                        </h2>
                      )}

                      {officeSubheading && (
                        <p className="font-gotham text-sm text-slate-600 leading-relaxed mt-2.5 mb-2">
                          {officeSubheading}
                        </p>
                      )}

                      {/* Contact Detail Cards */}
                      <div className="space-y-3 mt-4">

                        {/* Company Card */}
                        {officeCompanyName && (
                          <div className="group bg-slate-50/60 hover:bg-[#f0f9fa]/50 rounded-2xl p-4 border border-slate-200/70 hover:border-[#005f73]/30 transition-all duration-300 flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-white text-[#005f73] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform mt-0.5">
                              <Building2 className="w-4 h-4 text-[#005f73]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                Company
                              </span>
                              <p className="font-gotham text-sm font-semibold text-slate-800 leading-relaxed">
                                {officeCompanyName}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Address Card */}
                        {officeAddress && (
                          <div className="group bg-slate-50/60 hover:bg-[#f0f9fa]/50 rounded-2xl p-4 border border-slate-200/70 hover:border-[#005f73]/30 transition-all duration-300 flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-white text-[#005f73] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform mt-0.5">
                              <MapPin className="w-4 h-4 text-[#005f73]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                Physical Address
                              </span>
                              <p className="font-gotham text-sm font-semibold text-slate-800 leading-relaxed">
                                {officeAddress}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Email Card */}
                        {officeEmail && (
                          <a
                            href={`mailto:${officeEmail}`}
                            className="group bg-slate-50/60 hover:bg-[#f0f9fa]/50 rounded-2xl p-4 border border-slate-200/70 hover:border-[#005f73]/30 transition-all duration-300 flex items-center gap-3.5 cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white text-[#005f73] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform">
                              <Mail className="w-4 h-4 text-[#005f73]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                Email Inquiries
                              </span>
                              <p className="font-gotham text-sm font-semibold text-[#005f73] group-hover:text-[#0a9396] transition-colors truncate">
                                {officeEmail}
                              </p>
                            </div>
                          </a>
                        )}

                        {/* Phone Card */}
                        {officePhone && (
                          <a
                            href={`tel:${officePhone.replace(/[^0-9+]/g, '')}`}
                            className="group bg-slate-50/60 hover:bg-[#f0f9fa]/50 rounded-2xl p-4 border border-slate-200/70 hover:border-[#005f73]/30 transition-all duration-300 flex items-center gap-3.5 cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white text-[#005f73] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform">
                              <PhoneCall className="w-4 h-4 text-[#d97706]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                Customer Care &amp; Direct Phone
                              </span>
                              <p className="font-gotham text-sm font-bold text-slate-900 group-hover:text-[#005f73] transition-colors">
                                {officePhone}
                              </p>
                            </div>
                          </a>
                        )}

                        {/* Hours & Weekly Schedule Card */}
                        {(officeHoursTitle || officeHoursText || officeSchedule.length > 0) && (
                          <div className="bg-slate-50/60 rounded-2xl border border-slate-200/70 overflow-hidden transition-all duration-300">
                            <button
                              type="button"
                              onClick={() => officeSchedule.length > 0 && setShowSchedule(!showSchedule)}
                              className={`w-full p-4 flex items-center justify-between gap-3.5 text-left transition-colors ${
                                officeSchedule.length > 0 ? 'hover:bg-[#f0f9fa]/50 cursor-pointer' : 'cursor-default'
                              }`}
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-white text-[#005f73] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs">
                                  <Clock className="w-4 h-4 text-[#005f73]" />
                                </div>
                                <div className="min-w-0">
                                  {officeHoursTitle && (
                                    <div className="mb-0.5">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        {officeHoursTitle}
                                      </span>
                                    </div>
                                  )}
                                  {officeHoursText && (
                                    <p className="font-gotham text-sm font-semibold text-slate-800">
                                      {officeHoursText}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {officeSchedule.length > 0 && (
                                <div className="flex items-center gap-1 text-xs font-bold text-[#005f73] shrink-0">
                                  <span className="text-[11px] hidden sm:inline">
                                    {showSchedule ? 'Hide' : 'Full Week'}
                                  </span>
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-300 ${
                                      showSchedule ? 'rotate-180 text-[#d97706]' : ''
                                    }`}
                                  />
                                </div>
                              )}
                            </button>

                            {/* Expandable Weekly Schedule Table */}
                            {showSchedule && officeSchedule.length > 0 && (
                              <div className="px-4 pb-4 pt-1 border-t border-slate-200/60 bg-white/70 space-y-2">
                                <div className="divide-y divide-slate-100 rounded-xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs mt-2">
                                  {officeSchedule.map((row, i) => (
                                    <div
                                      key={i}
                                      className="flex justify-between items-center px-3.5 py-2.5 text-xs hover:bg-slate-50 transition-colors"
                                    >
                                      <span className="font-bold text-slate-800">{row.day}</span>
                                      <span className="font-mono text-slate-600 font-semibold">{row.hours}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Right Column: Embedded Google Map */}
              {mapEmbedUrl && (
                <div className={`${hasOfficeLeftContent ? 'lg:col-span-7' : 'w-full'} flex flex-col`}>
                  <div className="w-full h-full min-h-[420px] sm:min-h-[480px] rounded-3xl overflow-hidden shadow-[0_10px_35px_-12px_rgba(0,0,0,0.08)] border border-slate-200/90 bg-slate-100 relative group">
                    <iframe
                      title="Office Location Map"
                      src={mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full min-h-[420px] sm:min-h-[480px]"
                    />
                    {/* Floating Map Pill Badge */}
                    <div className="absolute top-4 right-4 z-10 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-xs font-bold text-[#005f73]">
                        <MapPin className="w-3.5 h-3.5 text-[#d97706]" />
                        <span>Interactive Map</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. INQUIRY & FEEDBACK FORM (Original Structure with Attendant Image)      */}
      {/* ========================================================================= */}
      {cms.formSettings?.enabled !== false && (
        <section id="contact-form" className="w-full bg-white py-16 sm:py-24 scroll-mt-12 relative overflow-hidden border-none">
          {/* ========================================================================= */}
          {/* UNIQUE ARCHITECTURAL BACKGROUND DESIGN (Brand Petrol Flow, Dot Grid & Glow)*/}
          {/* ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0">
            {/* Micro-technical geometric dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#005f73_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035]" />

            {/* Ambient Petrol Brand Glow Orbs */}
            <div className="absolute -left-28 top-1/4 w-[520px] h-[520px] bg-gradient-to-br from-[#0a9396]/[0.08] via-[#005f73]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-28 bottom-1/4 w-[480px] h-[480px] bg-gradient-to-tl from-[#f59e0b]/[0.06] via-[#005f73]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-10 w-[360px] h-[360px] bg-gradient-to-t from-[#005f73]/[0.03] to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Precision Flow Ribbons & Speed Vector Curves */}
            <svg
              className="absolute inset-0 w-full h-full object-cover"
              viewBox="0 0 1440 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="contactRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#005f73" stopOpacity="0" />
                  <stop offset="25%" stopColor="#005f73" stopOpacity="0.22" />
                  <stop offset="60%" stopColor="#0a9396" stopOpacity="0.25" />
                  <stop offset="85%" stopColor="#f59e0b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="contactRibbonGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0a9396" stopOpacity="0" />
                  <stop offset="40%" stopColor="#005f73" stopOpacity="0.18" />
                  <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#005f73" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Top Kinetic Wave */}
              <path
                d="M-80,260 C260,120 540,360 880,210 C1140,100 1340,240 1520,180"
                stroke="url(#contactRibbonGrad1)"
                strokeWidth="2"
                fill="none"
              />
              {/* Speed Dashed Accent Path */}
              <path
                d="M-80,300 C270,160 550,400 890,250 C1150,140 1350,275 1520,220"
                stroke="#0a9396"
                strokeWidth="1.5"
                strokeDasharray="8 12"
                strokeOpacity="0.25"
                fill="none"
              />
              {/* Lower Dynamic Flow Wave */}
              <path
                d="M-60,540 C320,440 620,680 980,510 C1220,390 1380,520 1500,470"
                stroke="url(#contactRibbonGrad2)"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Heading */}
          <div className="max-w-3xl mx-auto mb-12 sm:mb-14 text-center">
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-[#005f73] mb-2 font-founders">
              Customer Support &amp; Inquiries
            </span>
            <h2 className="font-gotham text-3xl sm:text-4xl font-bold text-[#161616] tracking-tight">
              Inquiry &amp; Feedback Form
            </h2>
            <p className="font-gotham text-base sm:text-lg text-[#686e77] mt-2">
              Your car knows and we&#8217;d like to know too. Drop us a line below.
            </p>
          </div>

          {success ? (
            <div className="bg-white rounded-[24px] p-12 sm:p-16 text-center space-y-6 max-w-2xl mx-auto border border-slate-200 shadow-sm">
              <div className="w-16 h-16 bg-[#f0f9fa] text-[#005f73] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-[#161616]">Message Sent!</h3>
                <p className="text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out. Our customer service team has received your message and will respond promptly.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetForm}
                className="h-[48px] px-8 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-founders font-semibold text-[18px] transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-900/20"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div
              className={`mx-auto flex flex-col ${
                hasSideMedia
                  ? 'max-w-5xl lg:max-w-[1020px] xl:max-w-[1100px] lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-2 xl:gap-4 relative'
                  : 'max-w-3xl items-center justify-center'
              }`}
            >
              {/* Foreground Left-side Media (Image or Looping Video) */}
              {hasSideMedia && (
                <div className="relative z-10 shrink-0 w-full sm:w-auto max-w-[400px] sm:max-w-[480px] lg:max-w-[540px] xl:max-w-[600px] flex justify-center lg:justify-end items-center lg:-mr-8 xl:-mr-12 pointer-events-none mb-6 lg:mb-0">
                  {isSideVideo ? (
                    <video
                      src={sideMediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto max-h-[540px] sm:max-h-[620px] lg:max-h-[700px] xl:max-h-[750px] rounded-[28px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.14)] select-none"
                    />
                  ) : (
                    <img
                      src={sideMediaUrl}
                      alt="Aiyan Limited Customer Support"
                      className={`w-full h-auto max-h-[540px] sm:max-h-[620px] lg:max-h-[700px] xl:max-h-[750px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.14)] select-none transition-transform ${
                        sideMediaUrl?.includes('attendant') ? 'scale-x-[-1]' : ''
                      }`}
                    />
                  )}
                </div>
              )}

              {/* Form Container (Centered if no media, or side-by-side if media exists) */}
              <div
                className={`relative z-0 w-full ${
                  hasSideMedia
                    ? 'max-w-[560px] lg:max-w-[580px] xl:max-w-[620px] flex-1 lg:pl-2'
                    : 'max-w-[620px] mx-auto'
                }`}
              >
                <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-[0_15px_45px_-10px_rgba(0,95,115,0.08)] relative overflow-hidden">
                  {/* Top Accent Gradient Bar matching Section 2 Card */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#005f73] via-[#0a9396] to-[#f59e0b]" />

                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 text-left">
                  {/* Row 1: First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label
                        htmlFor="contact-fname"
                        className="block text-[14px] sm:text-[15px] font-semibold text-[#161616] mb-1.5"
                      >
                        First Name{' '}
                        <span className="italic font-normal text-[#686e77] text-[13px] ml-1">
                          required
                        </span>
                      </label>
                      <input
                        id="contact-fname"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full h-[48px] sm:h-[50px] px-4 rounded-xl border border-slate-300 text-[15px] sm:text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#005f73] focus:ring-2 focus:ring-[#005f73]/20 transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-lname"
                        className="block text-[14px] sm:text-[15px] font-semibold text-[#161616] mb-1.5"
                      >
                        Last Name{' '}
                        <span className="italic font-normal text-[#686e77] text-[13px] ml-1">
                          required
                        </span>
                      </label>
                      <input
                        id="contact-lname"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full h-[48px] sm:h-[50px] px-4 rounded-xl border border-slate-300 text-[15px] sm:text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#005f73] focus:ring-2 focus:ring-[#005f73]/20 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[14px] sm:text-[15px] font-semibold text-[#161616] mb-1.5"
                      >
                        Email{' '}
                        <span className="italic font-normal text-[#686e77] text-[13px] ml-1">
                          required
                        </span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-[48px] sm:h-[50px] px-4 rounded-xl border border-slate-300 text-[15px] sm:text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#005f73] focus:ring-2 focus:ring-[#005f73]/20 transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-[14px] sm:text-[15px] font-semibold text-[#161616] mb-1.5"
                      >
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01913001506"
                        className="w-full h-[48px] sm:h-[50px] px-4 rounded-xl border border-slate-300 text-[15px] sm:text-[16px] text-[#161616] bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#005f73] focus:ring-2 focus:ring-[#005f73]/20 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[14px] sm:text-[15px] font-semibold text-[#161616] mb-1.5"
                    >
                      Message{' '}
                      <span className="italic font-normal text-[#686e77] text-[13px] ml-1">
                        required
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your query or feedback in detail..."
                      className="w-full min-h-[140px] sm:min-h-[160px] p-4 rounded-xl border border-slate-300 text-[15px] sm:text-[16px] text-[#161616] bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#005f73] focus:ring-2 focus:ring-[#005f73]/20 transition-all resize-y shadow-2xs"
                    />
                  </div>

                  {/* Row 4: Opt-in Checkbox */}
                  {Boolean(cms?.formSettings?.optInText && cms.formSettings.optInText.trim()) && (
                    <div className="pt-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={optInNewsletter}
                          onChange={(e) => setOptInNewsletter(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-[#005f73] focus:ring-[#005f73] mt-0.5 cursor-pointer accent-[#005f73]"
                        />
                        <span className="text-[13px] sm:text-[14px] text-[#161616] leading-snug font-normal">
                          {cms.formSettings.optInText}
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Row 5: Submit Button & Legal Disclaimer */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-[48px] sm:h-[52px] px-9 sm:px-11 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-founders font-semibold text-[18px] transition-all inline-flex items-center justify-center gap-2.5 group disabled:opacity-50 cursor-pointer shadow-lg shadow-cyan-900/20 hover:scale-[1.02]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            <path
                              d="M3.33331 7.99998L12.6666 7.99998M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </button>

                    {Boolean(
                      cms?.formSettings?.disclaimerText && cms.formSettings.disclaimerText.trim()
                    ) && (
                      <div className="text-[12px] text-[#686e77] leading-[18px] pt-1">
                        <p>{cms.formSettings.disclaimerText}</p>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>
      )}
    </div>
  );
}

