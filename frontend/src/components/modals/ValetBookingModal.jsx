import { useState } from 'react';
import { X, Car, Calendar, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { createValetBooking } from '../../api/forecourt';
import toast from 'react-hot-toast';

export default function ValetBookingModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    vehicleReg: '',
    vehicleType: 'Hatchback/Saloon',
    serviceTier: 'Express Snow Foam Wash (£12.00)',
    bookingDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 - 11:00',
    notes: '',
  });

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.customerName || !form.email || !form.phone || !form.vehicleReg) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await createValetBooking(form);
      setSuccess(true);
      toast.success('Valeting appointment booked!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking submission failed');
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
            <h3 className="text-2xl font-black text-slate-900">Appointment Confirmed!</h3>
            <p className="text-sm text-slate-600">
              We have reserved your slot for vehicle{' '}
              <strong className="font-mono bg-amber-200 px-2 py-0.5 rounded text-slate-950">
                {form.vehicleReg.toUpperCase()}
              </strong>
              . A confirmation email has been dispatched to <strong>{form.email}</strong>.
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
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Book Jet Wash & Valeting Bay</h3>
                <p className="text-xs text-slate-500">Reserved slot with zero queueing at Cleadon Forecourt</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  placeholder="e.g. John Smith"
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Phone Number *</label>
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
                placeholder="john@example.co.uk"
                className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* UK Registration Plate input */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">UK Vehicle Reg Plate *</label>
                <input
                  type="text"
                  required
                  value={form.vehicleReg}
                  onChange={(e) => setForm({ ...form, vehicleReg: e.target.value.toUpperCase() })}
                  placeholder="e.g. AB21 CDE"
                  className="w-full text-xs font-mono font-bold tracking-wider px-3 py-2.5 bg-amber-100 border border-amber-300 text-slate-950 rounded-xl mt-1 focus:ring-2 focus:ring-amber-500 uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Vehicle Type</label>
                <select
                  value={form.vehicleType}
                  onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Hatchback/Saloon">Hatchback / Saloon</option>
                  <option value="SUV/4x4">SUV / 4x4 / Estate</option>
                  <option value="Van/Commercial">Commercial Van</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Valeting Tier</label>
              <select
                value={form.serviceTier}
                onChange={(e) => setForm({ ...form, serviceTier: e.target.value })}
                className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500 font-semibold"
              >
                <option value="Express Snow Foam Wash (£12.00)">Express Snow Foam Wash (£12.00)</option>
                <option value="Mini Valet (Wash + Polish + Internal Vacuum) (£25.00)">
                  Mini Valet (Wash + Polish + Internal Vacuum) (£25.00)
                </option>
                <option value="Full Valet Deluxe (Upholstery Shampoo + Hand Wax) (£55.00)">
                  Full Valet Deluxe (Upholstery Shampoo + Hand Wax) (£55.00)
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={form.bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Time Slot</label>
                <select
                  value={form.timeSlot}
                  onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 border rounded-xl mt-1 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="08:00 - 09:00">08:00 - 09:00</option>
                  <option value="09:00 - 10:00">09:00 - 10:00</option>
                  <option value="10:00 - 11:00">10:00 - 11:00</option>
                  <option value="11:00 - 12:00">11:00 - 12:00</option>
                  <option value="13:00 - 14:00">13:00 - 14:00</option>
                  <option value="14:00 - 15:00">14:00 - 15:00</option>
                  <option value="15:00 - 16:00">15:00 - 16:00</option>
                  <option value="16:00 - 17:00">16:00 - 17:00</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-teal-600/30 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Valet Slot Reservation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
