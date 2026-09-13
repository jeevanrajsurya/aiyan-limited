import { useState } from 'react';
import { X, Calendar, Clock, Car, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { submitValetBooking } from '../api/client';
import toast from 'react-hot-toast';

export default function ValetBookingModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    vehicleReg: '',
    vehicleType: 'Sedan / Coupe',
    serviceTier: 'Touchless Express Wash ($12.00)',
    bookingDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 - 11:00',
    notes: '',
  });

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.vehicleReg || !form.customerName || !form.email || !form.phone) {
      toast.error('Please complete all required fields');
      return;
    }

    try {
      setLoading(true);
      await submitValetBooking(form);
      setSuccess(true);
      toast.success('Car wash appointment booked!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking submission failed. Please call us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#f0f9fa] text-[#005f73] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Slot Reserved Successfully!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              A confirmation email has been dispatched to <strong>{form.email}</strong>. Please arrive 5 minutes before your time slot at our Houston Forecourt Auto Spa Bay.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 font-mono">
              License Plate: <span className="font-bold bg-white border border-slate-300 text-slate-950 px-2.5 py-0.5 rounded shadow-xs">{form.vehicleReg.toUpperCase()}</span> • {form.timeSlot}
            </div>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold text-sm rounded-xl transition-all shadow-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#005f73] uppercase tracking-wider">Forecourt Car Wash &amp; Auto Spa</span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">Book Car Wash &amp; Detailing Slot</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Reserve your express soft-cloth wash and interior detailing slot at S&amp;B Conoco.
              </p>
            </div>

            {/* Vehicle Registration Plate Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                US Vehicle License Plate *
              </label>
              <div className="mt-1 flex items-center bg-white border-2 border-slate-300 rounded-xl px-3 py-2 shadow-inner focus-within:border-[#005f73]">
                <div className="bg-[#161616] text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-2 uppercase">
                  USA
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. TX 789-ABC"
                  value={form.vehicleReg}
                  onChange={(e) => setForm({ ...form, vehicleReg: e.target.value.toUpperCase() })}
                  className="bg-transparent font-mono font-black text-lg text-slate-950 uppercase tracking-widest w-full focus:outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Service Tier & Vehicle Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Vehicle Size</label>
                <select
                  value={form.vehicleType}
                  onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                  className="w-full text-xs font-medium border rounded-xl px-3 py-2.5 mt-1 bg-slate-50 focus:ring-2 focus:ring-[#005f73]"
                >
                  <option value="Sedan / Coupe">Sedan / Compact Coupe</option>
                  <option value="SUV / Crossover">SUV / Crossover / Minivan</option>
                  <option value="Truck / Large Commercial">Pickup Truck / Full-Size Van</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Wash Package</label>
                <select
                  value={form.serviceTier}
                  onChange={(e) => setForm({ ...form, serviceTier: e.target.value })}
                  className="w-full text-xs font-medium border rounded-xl px-3 py-2.5 mt-1 bg-slate-50 focus:ring-2 focus:ring-[#005f73]"
                >
                  <option value="Touchless Express Wash ($12.00)">Touchless Express Wash ($12.00)</option>
                  <option value="Super Soft-Cloth + Triple Foam ($18.00)">Super Soft-Cloth + Triple Foam ($18.00)</option>
                  <option value="Ultimate Wash + Ceramic Shield ($25.00)">Ultimate Wash + Ceramic Shield ($25.00)</option>
                  <option value="Full Interior Detail & Shampoo ($45.00)">Full Interior Detail &amp; Shampoo ($45.00)</option>
                </select>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Booking Date</label>
                <input
                  type="date"
                  required
                  value={form.bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
                  className="w-full text-xs border rounded-xl px-3 py-2 mt-1 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Time Slot</label>
                <select
                  value={form.timeSlot}
                  onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                  className="w-full text-xs font-medium border rounded-xl px-3 py-2 mt-1 bg-slate-50"
                >
                  <option value="08:00 - 09:00">08:00 - 09:00</option>
                  <option value="09:00 - 10:00">09:00 - 10:00</option>
                  <option value="10:00 - 11:00">10:00 - 11:00</option>
                  <option value="11:00 - 12:00">11:00 - 12:00</option>
                  <option value="12:00 - 13:00">12:00 - 13:00</option>
                  <option value="13:00 - 14:00">13:00 - 14:00</option>
                  <option value="14:00 - 15:00">14:00 - 15:00</option>
                  <option value="15:00 - 16:00">15:00 - 16:00</option>
                  <option value="16:00 - 17:00">16:00 - 17:00</option>
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Miller"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Contact Telephone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(281) 555-0199"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full text-xs border rounded-xl px-3 py-2 mt-1"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white font-bold text-sm rounded-full shadow-lg shadow-teal-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" /> Processing Booking...
                </>
              ) : (
                'Confirm Car Wash Booking'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
