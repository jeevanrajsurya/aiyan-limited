import { useState } from 'react';
import toast from 'react-hot-toast';
import { sendContactMessage } from '../api/contact';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendContactMessage(form);
      toast.success("Message sent — we'll get back to you soon.");
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send message');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-3xl font-semibold text-ink mb-2">Contact us</h1>
      <p className="text-ink/60 mb-8">Have a question? Send us a message.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-brand-200 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-brand-200 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Message</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-brand-200 rounded-lg px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          {submitting ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </div>
  );
}
