import { useState } from 'react';
import { X, Briefcase, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { submitJobApplication } from '../../api/forecourt';
import toast from 'react-hot-toast';

export default function JobApplyModal({ isOpen, onClose, defaultPosition = 'Forecourt Customer Assistant' }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: defaultPosition,
    experience: '1-2 years retail / customer service',
    availability: 'Full-Time (Flexible Shifts)',
    coverNote: '',
  });

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error('Please enter name, email, and phone');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(form).forEach((k) => formData.append(k, form[k]));
      if (file) formData.append('resume', file);

      await submitJobApplication(formData);
      setSuccess(true);
      toast.success('Job application submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Application Submitted!</h3>
            <p className="text-sm text-slate-600">
              Thank you, <strong>{form.name}</strong>. Our Forecourt Operations Manager will review your details for the{' '}
              <strong>{form.position}</strong> vacancy and contact you for an interview.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Apply for Position</h3>
                <p className="text-xs text-slate-500">Join our dynamic team at S&B Petroleum Cleadon</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Applied Role</label>
              <input
                type="text"
                readOnly
                value={form.position}
                className="w-full text-xs px-3 py-2.5 bg-slate-100 border rounded-xl mt-1 font-semibold text-slate-800 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Phone *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+44 7700 900123"
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Email Address *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="sarah@example.co.uk"
                className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Availability</label>
                <select
                  value={form.availability}
                  onChange={(e) => setForm({ ...form, availability: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Full-Time (Flexible Shifts)">Full-Time (Flexible)</option>
                  <option value="Part-Time (Morning / Day)">Part-Time (Day)</option>
                  <option value="Part-Time (Night / Weekend)">Part-Time (Nights)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Upload CV (PDF/DOC)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  className="w-full text-xs px-2 py-2 border rounded-xl mt-1 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:bg-teal-50 file:text-teal-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Brief Cover Note / Introduction</label>
              <textarea
                rows="2"
                value={form.coverNote}
                onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                placeholder="Tell us a little about your customer service or retail experience..."
                className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
