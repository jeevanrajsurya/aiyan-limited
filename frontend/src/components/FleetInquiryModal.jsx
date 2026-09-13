import { useState } from 'react';
import { X, Building2, CreditCard, CheckCircle2, Loader2, Shield } from 'lucide-react';
import { submitInquiry } from '../api/client';
import toast from 'react-hot-toast';

export default function FleetInquiryModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    fleetSize: '5 - 15 Vehicles',
    inquiryType: 'FLEET_FUEL_CARD',
    subject: 'Application for B2B Commercial Fuel Account',
    message: '',
  });

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await submitInquiry(form);
      setSuccess(true);
      toast.success('Fleet inquiry submitted!');
    } catch (err) {
      toast.error('Submission failed. Please call our B2B team.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#f0f9fa] text-[#005f73] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Fleet Application Received</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you for applying. Our commercial fleet director will contact you with wholesale pricing terms and VAT credit account details within 24 business hours.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold text-sm rounded-full transition-all shadow-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                <CreditCard className="w-3.5 h-3.5" /> B2B Fleet Fuel Solutions
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Open Commercial Fuel Account</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Save on petrol, diesel, and EV charging with consolidated weekly VAT invoicing for your UK fleet.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Harrison"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tyneside Logistics Ltd"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="fleet@company.co.uk"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Business Telephone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0191 500 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Fleet Size (Vehicles / Vans)</label>
                <select
                  value={form.fleetSize}
                  onChange={(e) => setForm({ ...form, fleetSize: e.target.value })}
                  className="w-full text-xs border rounded-xl px-3 py-2.5 mt-1 bg-slate-50"
                >
                  <option value="1 - 4 Vehicles (Small Business)">1 - 4 Vehicles (Small Business)</option>
                  <option value="5 - 15 Vehicles (Local Fleet)">5 - 15 Vehicles (Local Fleet)</option>
                  <option value="16 - 50 Vehicles (Commercial Transport)">16 - 50 Vehicles (Commercial Transport)</option>
                  <option value="50+ Vehicles (Enterprise Logistics)">50+ Vehicles (Enterprise Logistics)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Fuel Requirements / Notes</label>
                <textarea
                  rows="3"
                  placeholder="Monthly estimated litres, preferred payment terms (Direct Debit), or specific card network needs..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold text-sm rounded-full shadow-lg shadow-teal-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : 'Request Fleet Terms & Card Setup'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
