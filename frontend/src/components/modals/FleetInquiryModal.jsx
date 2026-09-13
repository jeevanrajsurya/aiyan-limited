import { useState } from 'react';
import { X, Building2, CheckCircle2, Loader2, CreditCard } from 'lucide-react';
import { createInquiry } from '../../api/forecourt';
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
    subject: 'B2B Commercial Fuel Card Application',
    message: '',
  });

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.companyName) {
      toast.error('Please enter name, email, and company name');
      return;
    }

    try {
      setLoading(true);
      await createInquiry({
        ...form,
        message: form.message || `Commercial Fuel Card Application for ${form.companyName} (${form.fleetSize})`,
      });
      setSuccess(true);
      toast.success('Fleet inquiry submitted!');
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
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Application Received!</h3>
            <p className="text-sm text-slate-600">
              Our B2B Commercial Accounts team is setting up your business profile for{' '}
              <strong>{form.companyName}</strong>. We will send credit terms and weekly VAT billing options to{' '}
              <strong>{form.email}</strong> shortly.
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
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Apply for B2B Commercial Fuel Account</h3>
                <p className="text-xs text-slate-500">Dedicated fleet pricing, zero card fees, and weekly VAT invoicing</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. David Miller"
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Company Name *</label>
                <input
                  type="text"
                  required
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  placeholder="e.g. Tyneside Couriers Ltd"
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Business Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="accounts@company.co.uk"
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+44 191 000 0000"
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Fleet Size / Monthly Fuel Spend</label>
              <select
                value={form.fleetSize}
                onChange={(e) => setForm({ ...form, fleetSize: e.target.value })}
                className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500 font-medium"
              >
                <option value="1 - 4 Vehicles (Sole Trader / Taxi)">1 - 4 Vehicles (Sole Trader / Taxi)</option>
                <option value="5 - 15 Vehicles (Local Fleet)">5 - 15 Vehicles (Local Fleet)</option>
                <option value="16 - 50 Vehicles (Commercial Logistics)">16 - 50 Vehicles (Commercial Logistics)</option>
                <option value="50+ Vehicles / Heavy Haulage">50+ Vehicles / Heavy Haulage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Special Requirements (Optional)</label>
              <textarea
                rows="2"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="e.g. We require AdBlue on pump and multi-card pin authorization..."
                className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-teal-400 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin text-teal-400" /> : 'Request Fleet Fuel Card Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
