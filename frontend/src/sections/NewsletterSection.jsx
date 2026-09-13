import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Upload, FileText, X, Loader2, ChevronDown } from 'lucide-react';
import { submitNewsletterSubscription } from '../api/client';

export const DEFAULT_NEWSLETTER_POSITIONS = [
  'Store Associate / Cashier',
  'Forecourt Attendant',
  'Barista / Food Specialist',
  'Shift Supervisor',
  'Assistant Store Manager',
  'General Inquiry / Community',
];

export default function NewsletterSection({ newsletterData }) {
  const [newsletter, setNewsletter] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: '',
    position: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (newsletterData?.enabled === false) {
    return null;
  }

  const newsletterTitle =
    newsletterData?.title !== undefined
      ? newsletterData.title
      : 'Get emails you actually like.';
  const newsletterDesc =
    newsletterData?.description !== undefined
      ? newsletterData.description
      : 'With special offers and out-of-this-world trip ideas, our emails put adventure on the agenda.';
  const newsletterBtnText =
    newsletterData?.buttonText !== undefined
      ? newsletterData.buttonText
      : 'Submit';
  const newsletterTerms =
    newsletterData?.termsText !== undefined
      ? newsletterData.termsText
      : 'By clicking Submit you agree to our Privacy Statement and Terms & Conditions. This site is protected by reCAPTCHA.';

  const positions =
    Array.isArray(newsletterData?.positions) && newsletterData.positions.length > 0
      ? newsletterData.positions
      : DEFAULT_NEWSLETTER_POSITIONS;

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!newsletter.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!newsletter.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletter.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!newsletter.phone.trim()) {
      errors.phone = 'Mobile number is required';
    } else {
      const cleanDigits = newsletter.phone.replace(/[\s\-\+\(\)]/g, '');
      if (cleanDigits.length < 7) {
        errors.phone = 'Please enter a valid mobile number (min 7 digits)';
      }
    }
    if (!newsletter.position.trim()) {
      errors.position = 'Please select an application position';
    }

    if (resumeFile) {
      const allowed = ['.pdf', '.doc', '.docx'];
      const ext = '.' + resumeFile.name.split('.').pop().toLowerCase();
      if (!allowed.includes(ext)) {
        errors.resume = 'Only PDF, DOC, or DOCX files are allowed';
      } else if (resumeFile.size > 10 * 1024 * 1024) {
        errors.resume = 'File size cannot exceed 10MB';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix the highlighted fields');
      return;
    }

    try {
      setSubmitting(true);
      setFormErrors({});

      const formData = new FormData();
      formData.append('firstName', newsletter.firstName.trim());
      if (newsletter.lastName.trim()) formData.append('lastName', newsletter.lastName.trim());
      formData.append('email', newsletter.email.trim().toLowerCase());
      formData.append('phone', newsletter.phone.trim());
      if (newsletter.position.trim()) formData.append('position', newsletter.position.trim());
      if (newsletter.zip.trim()) formData.append('zip', newsletter.zip.trim());
      if (resumeFile) formData.append('resume', resumeFile);

      await submitNewsletterSubscription(formData);

      setSubmitted(true);
      toast.success('Thank you! Your details and resume have been received.');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Submission failed. Please try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="w-full bg-white py-14 sm:py-20 border-none transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(newsletterTitle || newsletterDesc) && (
          <div className="max-w-3xl mb-6 sm:mb-8">
            {newsletterTitle ? (
              <h2 className="font-founders text-2xl sm:text-3xl font-black text-[#161616] tracking-tight leading-tight">
                {newsletterTitle}
              </h2>
            ) : null}
            {newsletterDesc ? (
              <p className="font-gotham text-sm sm:text-base text-[#444444] leading-relaxed mt-1.5">
                {newsletterDesc}
              </p>
            ) : null}
          </div>
        )}

        {submitted ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3 max-w-2xl">
            <p className="text-2xl font-black">🎉 You are all set!</p>
            <p className="text-sm sm:text-base text-emerald-800 leading-relaxed font-gotham">
              Your contact details and resume have been successfully received by our management team. We look forward to connecting with you soon.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setNewsletter({ firstName: '', lastName: '', email: '', phone: '', zip: '', position: '' });
                setResumeFile(null);
                setFormErrors({});
              }}
              className="inline-block mt-3 text-sm font-bold text-[#005f73] hover:underline cursor-pointer"
            >
              Submit another response →
            </button>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 sm:gap-y-7">
              {/* 1. First Name */}
              <div>
                <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                  First Name <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                </label>
                <input
                  type="text"
                  value={newsletter.firstName}
                  onChange={(e) => {
                    setNewsletter({ ...newsletter, firstName: e.target.value });
                    if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: null });
                  }}
                  className={`w-full bg-white border ${
                    formErrors.firstName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-gray-400 focus:border-[#005f73] focus:ring-1 focus:ring-[#005f73]'
                  } rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none`}
                />
                {formErrors.firstName && (
                  <p className="text-xs text-rose-600 font-medium mt-1.5">{formErrors.firstName}</p>
                )}
              </div>

              {/* 2. Last Name */}
              <div>
                <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                  Last Name <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                </label>
                <input
                  type="text"
                  value={newsletter.lastName}
                  onChange={(e) => setNewsletter({ ...newsletter, lastName: e.target.value })}
                  className="w-full bg-white border border-gray-400 focus:border-[#005f73] focus:ring-1 focus:ring-[#005f73] rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none"
                />
              </div>

              {/* 3. Email */}
              <div>
                <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                  Email <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                </label>
                <input
                  type="email"
                  value={newsletter.email}
                  onChange={(e) => {
                    setNewsletter({ ...newsletter, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                  }}
                  className={`w-full bg-white border ${
                    formErrors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-gray-400 focus:border-[#005f73] focus:ring-1 focus:ring-[#005f73]'
                  } rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none`}
                />
                {formErrors.email && (
                  <p className="text-xs text-rose-600 font-medium mt-1.5">{formErrors.email}</p>
                )}
              </div>

              {/* 4. Mobile Number */}
              <div>
                <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                  Mobile Number <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                </label>
                <input
                  type="tel"
                  value={newsletter.phone}
                  onChange={(e) => {
                    setNewsletter({ ...newsletter, phone: e.target.value });
                    if (formErrors.phone) setFormErrors({ ...formErrors, phone: null });
                  }}
                  placeholder="+44 7700 900077"
                  className={`w-full bg-white border ${
                    formErrors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-gray-400 focus:border-[#005f73] focus:ring-1 focus:ring-[#005f73]'
                  } rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none`}
                />
                {formErrors.phone && (
                  <p className="text-xs text-rose-600 font-medium mt-1.5">{formErrors.phone}</p>
                )}
              </div>

              {/* 5. Position Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                  Position <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                </label>
                <div className="relative">
                  <select
                    value={newsletter.position}
                    onChange={(e) => {
                      setNewsletter({ ...newsletter, position: e.target.value });
                      if (formErrors.position) setFormErrors({ ...formErrors, position: null });
                    }}
                    className={`w-full bg-white border ${
                      formErrors.position
                        ? 'border-rose-500 ring-1 ring-rose-500'
                        : 'border-gray-400 focus:border-[#005f73] focus:ring-1 focus:ring-[#005f73]'
                    } rounded-lg h-12 px-4 pr-10 text-base text-[#161616] outline-none transition-colors appearance-none cursor-pointer`}
                  >
                    <option value="">Select a position...</option>
                    {positions.map((pos, idx) => (
                      <option key={idx} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                {formErrors.position && (
                  <p className="text-xs text-rose-600 font-medium mt-1.5">{formErrors.position}</p>
                )}
              </div>

              {/* 6. Zip Code */}
              <div>
                <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                  Zip Code <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                </label>
                <input
                  type="text"
                  value={newsletter.zip}
                  onChange={(e) => setNewsletter({ ...newsletter, zip: e.target.value })}
                  className="w-full bg-white border border-gray-400 focus:border-[#005f73] focus:ring-1 focus:ring-[#005f73] rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none"
                />
              </div>

              {/* 7. Resume Upload (Full-Width Below) */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                  Upload Resume <span className="font-normal italic text-slate-500 text-xs ml-1.5">(optional .pdf, .doc)</span>
                </label>
                {resumeFile ? (
                  <div className="w-full bg-cyan-50 border border-[#0a9396]/40 rounded-lg h-12 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText className="w-4 h-4 text-[#005f73] shrink-0" />
                      <span className="font-semibold text-sm text-slate-900 truncate">{resumeFile.name}</span>
                      <span className="text-xs text-[#0a9396] shrink-0">
                        ({(resumeFile.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="p-1 hover:bg-cyan-200 rounded-md text-slate-800 transition-colors shrink-0"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="w-full bg-white hover:bg-slate-50 border border-gray-400 hover:border-[#005f73] rounded-lg h-12 px-4 flex items-center justify-between cursor-pointer transition-colors group">
                    <span className="text-slate-500 text-sm sm:text-base group-hover:text-slate-700 truncate">
                      Attach candidate resume (.pdf, .doc, max 10MB)
                    </span>
                    <Upload className="w-4 h-4 text-slate-500 group-hover:text-[#005f73] shrink-0 ml-2" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          setResumeFile(f);
                          if (formErrors.resume) setFormErrors({ ...formErrors, resume: null });
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                )}
                {formErrors.resume && (
                  <p className="text-xs text-rose-600 font-medium mt-1.5">{formErrors.resume}</p>
                )}
              </div>
            </div>

            {/* Left-Aligned Submit Button */}
            {newsletterBtnText ? (
              <div className="pt-6 sm:pt-7">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] disabled:opacity-60 text-white font-gotham text-base font-bold px-9 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>{newsletterBtnText}</span>
                      <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                        <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            ) : null}

            {/* Disclaimer Terms Text */}
            {newsletterTerms && newsletterTerms.trim() !== '' ? (
              <div className="mt-8 text-xs text-slate-600 leading-relaxed max-w-2xl font-gotham whitespace-pre-line">
                <p>{newsletterTerms}</p>
              </div>
            ) : null}
          </form>
        )}
      </div>
    </section>
  );
}
