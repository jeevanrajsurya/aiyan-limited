import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createAppointment } from '../api/appointments';
import { useAuth } from '../context/AuthContext';

const SERVICE_TYPES = ['Fuel card setup', 'Bulk order collection', 'General enquiry'];
const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'];

export default function Appointments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ serviceType: SERVICE_TYPES[0], date: '', timeSlot: TIME_SLOTS[0], notes: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      toast('Please sign in to book an appointment');
      navigate('/sign-in');
      return;
    }
    setSubmitting(true);
    try {
      await createAppointment(form);
      toast.success('Appointment booked!');
      navigate('/account/bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-3xl font-semibold text-ink mb-2">Book an appointment</h1>
      <p className="text-ink/60 mb-8">Choose a service, date, and time that works for you.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Service</label>
          <select
            value={form.serviceType}
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
            className="w-full border border-brand-200 rounded-lg px-3 py-2"
          >
            {SERVICE_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Date</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-brand-200 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Time</label>
          <select
            value={form.timeSlot}
            onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
            className="w-full border border-brand-200 rounded-lg px-3 py-2"
          >
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Notes (optional)</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            className="w-full border border-brand-200 rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          {submitting ? 'Booking…' : 'Book appointment'}
        </button>
      </form>
    </div>
  );
}
