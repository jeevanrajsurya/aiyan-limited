import { useState } from 'react';
import { X, Briefcase, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { submitJobApplication } from '../api/client';
import toast from 'react-hot-toast';

export default function JobApplyModal({ isOpen, onClose, defaultPosition }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: defaultPosition || 'Forecourt Customer Assistant',
    experience: '1 - 2 Years Customer Service',
    availability: 'Flexible / Full Time',
    coverNote: '',
  });
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      Object.keys(form).forEach((k) => fd.append(k, form[k]));
      if (file) fd.append('resume', file);

      await submitJobApplication(fd);
      setSuccess(true);
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit application.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative border border-slate-100">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full">
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you for applying to join our forecourt team. Our manager will review your details and contact you if shortlisted.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-teal-600 text-white font-bold text-sm rounded-xl"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Careers at S&B Petroleum</span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">Join Our Forecourt Team</h2>
              <p className="text-xs text-slate-500">Submit your application for immediate or upcoming shift vacancies.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.co.uk"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="07700 900123"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Desired Role</label>
                  <select
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1 bg-slate-50"
                  >
                    <option value="Forecourt Customer Assistant">Forecourt Cashier / Assistant</option>
                    <option value="Store Shift Supervisor">Store Shift Supervisor</option>
                    <option value="Night Shift Forecourt Attendant">Night Shift Attendant (24/7)</option>
                    <option value="Vehicle Valeting Specialist">Valeting Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Availability</label>
                  <select
                    value={form.availability}
                    onChange={(e) => setForm({ ...form, availability: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1 bg-slate-50"
                  >
                    <option value="Full Time (40 hrs/wk)">Full Time (40 hrs/wk)</option>
                    <option value="Part Time (Weekend Shifts)">Part Time (Weekends)</option>
                    <option value="Night Shifts (Rotational)">Night Shifts (Rotational)</option>
                    <option value="Flexible Student Hours">Flexible Hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Attach CV / Resume (PDF, DOCX)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-xs border border-dashed rounded-xl p-2.5 mt-1 bg-slate-50 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Short Introduction / Experience</label>
                <textarea
                  rows="2"
                  placeholder="Tell us about your previous retail/forecourt experience..."
                  value={form.coverNote}
                  onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                  className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold text-sm rounded-full shadow-lg shadow-teal-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : 'Submit Job Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
