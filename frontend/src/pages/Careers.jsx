import { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  Users,
  ShieldCheck,
  Heart,
  Award,
  ArrowRight,
  Coffee,
  Sparkles,
} from 'lucide-react';
import JobApplyModal from '../components/JobApplyModal';

export default function Careers({ onOpenJob }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const jobs = [
    {
      id: 'cashier',
      title: 'Forecourt Customer Service & Cashier',
      type: 'Full-Time / Part-Time (Flexible Shifts)',
      pay: '$16.00 - $18.50 / hour',
      location: 'S&B Petrol Forecourt, Houston, TX',
      description:
        'We are seeking friendly, reliable Customer Service Associates to join our front-line team. Responsibilities include greeting motorists, operating point-of-sale registers, brewing fresh Arabica coffee, restocking C-store shelves, and maintaining a sparkling clean forecourt.',
      requirements: [
        'Previous retail, customer service, or cashier experience preferred',
        'Strong communication skills and welcoming attitude toward drivers',
        'Comfortable working flexible day, evening, or weekend shifts',
        'Punctual, dependable, and proud of maintaining clean store standards',
      ],
    },
    {
      id: 'shift-lead',
      title: 'Forecourt Operations Shift Lead',
      type: 'Full-Time (Day / Evening Shifts)',
      pay: '$19.00 - $22.50 / hour',
      location: 'S&B Petrol Forecourt, Houston, TX',
      description:
        'Help lead daily forecourt and convenience store operations. Supervise cashiers, coordinate fresh bakery deliveries, ensure fuel dispenser safety protocols, perform cash reconciliations, and uphold exceptional customer satisfaction.',
      requirements: [
        '1+ years supervisory experience in retail, convenience, or fuel forecourts',
        'Working knowledge of POS systems, cash handling, and inventory stocking',
        'Excellent problem-solving skills and ability to motivate team members',
        'High school diploma or GED required',
      ],
    },
    {
      id: 'night-lead',
      title: 'Overnight Forecourt & C-Store Supervisor',
      type: 'Full-Time Night Shift (10:00 PM - 06:00 AM)',
      pay: '$20.00 - $23.00 / hour + Night Premium',
      location: 'S&B Petrol Forecourt, Houston, TX',
      description:
        'Supervise overnight forecourt operations, monitor automated fuel island systems, ensure security protocol adherence, receive morning bakery/grocery deliveries, and brew early morning bean-to-cup coffee for commuter traffic.',
      requirements: [
        'Demonstrated reliability and punctuality for overnight shifts',
        'Familiarity with fuel forecourt safety and emergency shutoff protocols',
        'Ability to work independently with strong personal accountability',
      ],
    },
    {
      id: 'car-wash',
      title: 'Car Wash & Detail Bay Specialist',
      type: 'Full-Time (07:00 AM - 03:30 PM)',
      pay: '$16.50 - $19.00 / hour + Tips',
      location: 'S&B Petrol Forecourt Auto Spa, Houston, TX',
      description:
        'Manage operations at our touchless soft-cloth car wash tunnel. Guide customer vehicles into the wash bay, monitor chemical levels (ceramic sealants, tri-color foam), perform hand towel dry finish, and maintain air/vacuum islands.',
      requirements: [
        'Enthusiasm for automobiles and vehicle presentation',
        'Attention to detail and physically active, outdoors-friendly mindset',
        'Valid US driver license with clean driving record',
      ],
    },
  ];

  const benefits = [
    {
      title: 'Competitive Pay & Bonuses',
      description: 'Above-market hourly rates ($16-$23/hr) plus night shift differentials and holiday bonus pay.',
      icon: DollarSign,
    },
    {
      title: '401(k) Retirement with Match',
      description: 'Company 401(k) retirement plan with up to 4% dollar-for-dollar employer matching contribution.',
      icon: ShieldCheck,
    },
    {
      title: 'Comprehensive Health Insurance',
      description: 'Medical, dental, and vision insurance options for all full-time forecourt associates.',
      icon: Heart,
    },
    {
      title: 'Paid Time Off (PTO)',
      description: 'Accrue paid vacation days and sick leave starting from your first 90 days of employment.',
      icon: Clock,
    },
    {
      title: 'Employee Forecourt Discount',
      description: 'Generous employee discount on gasoline fill-ups plus 25% off all C-store food and coffee.',
      icon: Coffee,
    },
    {
      title: 'Career Advancement Pathway',
      description: 'Over 70% of our Shift Leads and Assistant Managers were promoted directly from within.',
      icon: Award,
    },
  ];

  function handleApply(jobTitle) {
    if (onOpenJob) {
      onOpenJob(jobTitle);
    } else {
      setSelectedJob(jobTitle);
      setModalOpen(true);
    }
  }

  return (
    <div className="bg-white space-y-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl min-h-[460px] flex items-center bg-[#161616]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />

          <div className="relative z-10 p-8 sm:p-14 max-w-2xl text-white space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#005f73]/30 border border-[#005f73]/60 text-white text-xs font-bold">
              <Users className="w-4 h-4 text-[#94d2bd]" />
              Join Our Forecourt Family
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Build Your Career on the Forecourt.
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              We offer competitive compensation, comprehensive health benefits, 401(k) matching, and a friendly, supportive team environment. Whether you are seeking flexible shifts or long-term management advancement, we would love to have you.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#openings"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                View Open Positions <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#005f73] bg-[#005f73]/10 px-3.5 py-1 rounded-full border border-[#005f73]/20 inline-block">
            Why Work With Us
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#161616]">
            Benefits Designed to Support You &amp; Your Family
          </h2>
          <p className="text-sm text-[#797979]">
            We invest in our associates with competitive pay packages and real opportunities for professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#c9c9c9]/60 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#005f73]/10 text-[#005f73] flex items-center justify-center">
                <b.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#161616]">{b.title}</h3>
              <p className="text-xs sm:text-sm text-[#797979] leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#005f73] bg-[#005f73]/10 px-3.5 py-1 rounded-full border border-[#005f73]/20 inline-block">
            Current Openings
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#161616]">
            Find Your Role with S&B Petrol
          </h2>
          <p className="text-sm text-[#797979]">
            Apply online in under 3 minutes. Our hiring manager reviews all applications promptly.
          </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c9c9c9]/60 shadow-sm hover:shadow-lg transition-all space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#161616]">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#797979] mt-2">
                    <span className="flex items-center gap-1 text-[#161616] font-semibold bg-[#ebebef] px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-[#005f73]" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1 text-[#d97706] font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
                      <DollarSign className="w-3.5 h-3.5" /> {job.pay}
                    </span>
                    <span className="flex items-center gap-1 text-[#797979]">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job.title)}
                  className="px-6 py-3 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#071e26] hover:to-[#005f73] text-white font-bold text-xs rounded-full shadow-md transition-all shrink-0 inline-flex items-center gap-2 self-start sm:self-auto"
                >
                  Apply for this Role <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#797979] leading-relaxed pt-2 border-t border-[#ebebef]">
                {job.description}
              </p>

              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold text-[#161616] uppercase tracking-wide">Candidate Qualifications:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {job.requirements.map((req, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 text-xs text-[#161616]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#005f73] shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <JobApplyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialJobTitle={selectedJob}
      />
    </div>
  );
}
