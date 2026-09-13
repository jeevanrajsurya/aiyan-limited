import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  TrendingDown,
  FileText,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  Send,
  Loader2,
  Building,
  Phone,
  Mail,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { submitInquiry } from '../api/client';

export default function Fleet() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    fleetSize: '6-15 Vehicles',
    monthlyVolume: '2,500 - 5,000 Gallons',
    notes: '',
  });

  const rebateTiers = [
    { volume: '500 - 2,499 Gallons / Mo', rebate: '3.0¢ / Gallon', highlight: false },
    { volume: '2,500 - 4,999 Gallons / Mo', rebate: '4.5¢ / Gallon', highlight: false },
    { volume: '5,000 - 9,999 Gallons / Mo', rebate: '6.0¢ / Gallon', highlight: true, badge: 'Popular Tier' },
    { volume: '10,000+ Gallons / Mo', rebate: '7.0¢ / Gallon', highlight: false, badge: 'Enterprise' },
  ];

  const fleetPillars = [
    {
      title: 'High-Flow Satellite Diesel',
      description:
        'Dual-dispensing master and satellite nozzles pumping up to 40 gallons per minute. Fill both saddle tanks simultaneously in under 5 minutes.',
      icon: Truck,
    },
    {
      title: 'Bulk DEF at Commercial Island',
      description:
        'ISO-certified Diesel Exhaust Fluid dispensed directly at the lane nozzle. Eliminate awkward DEF plastic jugs, spillage, and driver downtime.',
      icon: ShieldCheck,
    },
    {
      title: 'Level 3 Itemized Tax Reporting',
      description:
        'Detailed transaction records capturing Driver ID, Vehicle Unit #, Odometer readings, fuel grade, taxes paid, and MPG analytics.',
      icon: FileText,
    },
    {
      title: 'Real-Time Fraud Prevention',
      description:
        'Set hard purchase rules: restrict cards to fuel-only, set daily gallon maximums, block weekend spending, and enforce driver PIN authorization.',
      icon: Lock,
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      toast.error('Please complete all required fields');
      return;
    }

    try {
      setSubmitting(true);
      await submitInquiry({
        name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        subject: `Commercial Fleet Inquiry - ${formData.companyName}`,
        inquiryType: 'COMMERCIAL_FLEET',
        message: `Company: ${formData.companyName}\nFleet Size: ${formData.fleetSize}\nEstimated Monthly Volume: ${formData.monthlyVolume}\nNotes: ${formData.notes}`,
      });
      setSubmitted(true);
      toast.success('Fleet inquiry submitted! Our commercial fleet specialist will contact you shortly.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to submit inquiry. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white space-y-12 pb-16">
      {/* 1. Forecourt Fleet Hero Banner with Heavy Transport Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl min-h-[460px] flex items-center bg-[#161616]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/40" />

          <div className="relative z-10 p-8 sm:p-14 max-w-2xl text-white space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#005f73]/30 border border-[#005f73]/60 text-white text-xs font-bold">
              <Truck className="w-4 h-4 text-[#94d2bd]" />
              Conoco Commercial Fleet Solutions
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-headings leading-tight text-white">
              Fleet Fueling Built for Peak Operational Velocity
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Cut fleet turnaround times, lock down unauthorized purchases, and earn tiered commercial volume rebates with high-speed satellite fueling.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#apply-form"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#92400e] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                Open Fleet Account <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#rebates"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-sm border border-white/20 transition-all inline-flex items-center gap-2"
              >
                View Rebate Tiers
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Forecourt Commercial Island Specifications */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#c9c9c9]/60 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#005f73] bg-[#005f73]/10 px-3.5 py-1 rounded-full border border-[#005f73]/20 inline-block">
              Heavy Duty Forecourt Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#161616]">
              Built for Fast Commercial Turnarounds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fleetPillars.map((pillar, idx) => (
              <div key={idx} className="bg-[#ebebef]/50 rounded-2xl p-6 border border-[#c9c9c9]/40 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-white text-[#005f73] shadow-sm flex items-center justify-center border border-[#c9c9c9]/40">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-[#161616]">{pillar.title}</h4>
                <p className="text-xs text-[#797979] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Rebate Tiers Section */}
      <div id="rebates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#005f73] bg-[#005f73]/10 px-3.5 py-1 rounded-full border border-[#005f73]/20 inline-block">
            Volume Fuel Rebates
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#161616]">
            The More You Pump, The More You Save
          </h2>
          <p className="text-sm text-[#797979]">
            Rebates are calculated automatically each month and credited directly against your commercial statement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rebateTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all border ${
                tier.highlight
                  ? 'bg-gradient-to-br from-[#071e26] via-[#005f73] to-[#0a424e] text-white shadow-xl ring-2 ring-cyan-500/30'
                  : 'bg-white text-[#161616] border-[#c9c9c9]/60 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                {tier.badge && (
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block ${
                      tier.highlight ? 'bg-[#d97706] text-white font-bold' : 'bg-[#005f73]/10 text-[#005f73]'
                    }`}
                  >
                    {tier.badge}
                  </span>
                )}
                <p className={`text-xs font-semibold ${tier.highlight ? 'text-white/80' : 'text-[#797979]'}`}>
                  {tier.volume}
                </p>
                <p className={`text-3xl font-black ${tier.highlight ? 'text-white' : 'text-[#161616]'}`}>
                  {tier.rebate}
                </p>
              </div>

              <div className={`mt-6 pt-3 border-t text-xs ${tier.highlight ? 'border-white/20 text-white/90' : 'border-[#ebebef] text-[#797979]'}`}>
                Credited monthly on statement
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Embedded Commercial Account Application Form */}
      <div id="apply-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl sm:rounded-4xl p-8 sm:p-12 border border-[#c9c9c9]/60 shadow-xl space-y-8">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#005f73] bg-[#005f73]/10 px-3.5 py-1 rounded-full border border-[#005f73]/20 inline-block">
              Fast Commercial Onboarding
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#161616]">
              Apply for Your Commercial Fleet Account
            </h3>
            <p className="text-xs sm:text-sm text-[#797979]">
              Fill out the form below. A dedicated Conoco B2B fleet account executive will review your application and establish your corporate credit line within 24 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#005f73]/10 border border-[#005f73]/30 rounded-3xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-[#161616]">Fleet Application Submitted!</h4>
              <p className="text-xs sm:text-sm text-[#797979] max-w-md mx-auto">
                Thank you, <span className="font-semibold text-[#161616]">{formData.contactName}</span>. Your application for <span className="font-semibold text-[#161616]">{formData.companyName}</span> has been received. Our team will contact you at <span className="font-semibold text-[#161616]">{formData.email}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#071e26] hover:bg-[#005f73] text-white text-xs font-bold transition-all"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#161616]">Company / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Logistics LLC"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9c9c9] text-xs focus:outline-none focus:ring-2 focus:ring-[#005f73] bg-white text-[#161616]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#161616]">Primary Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robert Miller"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9c9c9] text-xs focus:outline-none focus:ring-2 focus:ring-[#005f73] bg-white text-[#161616]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#161616]">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="robert@apexlogistics.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9c9c9] text-xs focus:outline-none focus:ring-2 focus:ring-[#005f73] bg-white text-[#161616]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#161616]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(281) 555-0144"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9c9c9] text-xs focus:outline-none focus:ring-2 focus:ring-[#005f73] bg-white text-[#161616]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#161616]">Fleet Size</label>
                  <select
                    value={formData.fleetSize}
                    onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9c9c9] text-xs focus:outline-none focus:ring-2 focus:ring-[#005f73] bg-white text-[#161616]"
                  >
                    <option>1 - 5 Vehicles</option>
                    <option>6 - 15 Vehicles</option>
                    <option>16 - 50 Vehicles</option>
                    <option>50+ Vehicles (Enterprise)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#161616]">Estimated Monthly Gallons</label>
                  <select
                    value={formData.monthlyVolume}
                    onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c9c9c9] text-xs focus:outline-none focus:ring-2 focus:ring-[#005f73] bg-white text-[#161616]"
                  >
                    <option>Under 1,000 Gallons</option>
                    <option>1,000 - 2,499 Gallons</option>
                    <option>2,500 - 4,999 Gallons</option>
                    <option>5,000 - 9,999 Gallons</option>
                    <option>10,000+ Gallons</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#161616]">Specific Fleet Needs / Comments (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your vehicle types (box trucks, diesel haulers, vans), tax exemption status, or specialized fuel card control requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c9c9c9] text-xs focus:outline-none focus:ring-2 focus:ring-[#005f73] bg-white text-[#161616]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Commercial Fleet Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

