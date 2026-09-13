import { Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CareersSection({ onOpenJobModal }) {
  const openings = [
    {
      title: 'Forecourt Customer Assistant / Cashier',
      type: 'Full Time & Part Time',
      shifts: 'Morning / Afternoon Rotations',
      desc: 'Provide friendly customer service on our fuel tills, restock store essentials, and maintain high forecourt standards.',
    },
    {
      title: 'Store Shift Supervisor',
      type: 'Full Time (40h)',
      shifts: 'Day Shifts',
      desc: 'Oversee daily store operations, inventory management for Costa Express and fresh bakery, and team leadership.',
    },
    {
      title: 'Night Shift Forecourt Attendant',
      type: 'Permanent Nights',
      shifts: '22:00 - 06:00',
      desc: 'Manage night window customer transactions, forecourt security, and overnight fuel tanker intake.',
    },
  ];

  return (
    <section id="careers" className="py-16 text-[#161616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9fa] border border-[#005f73]/20 text-[#005f73] text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" /> Join Our Forecourt Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#161616] mt-2 tracking-tight">
              Careers on the Forecourt
            </h2>
            <p className="text-xs sm:text-sm text-[#797979] mt-1 max-w-lg">
              We offer competitive UK hourly wages, paid training, staff discounts on store products, and a friendly team environment.
            </p>
          </div>

          <button
            onClick={onOpenJobModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all shadow-md self-start md:self-auto cursor-pointer"
          >
            Submit General Application <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {openings.map((job, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl sm:rounded-4xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all flex flex-col justify-between hover:border-[#005f73]/40"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="bg-amber-500/15 text-[#d97706] px-2 py-0.5 rounded-full">{job.type}</span>
                  <span className="text-[#797979]">{job.shifts}</span>
                </div>
                <h3 className="text-lg font-black text-[#161616] mt-3 tracking-tight">{job.title}</h3>
                <p className="text-xs text-[#797979] mt-2 leading-relaxed">{job.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={onOpenJobModal}
                  className="w-full py-2.5 bg-[#ebebef] hover:bg-[#005f73] hover:text-white text-[#161616] text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

