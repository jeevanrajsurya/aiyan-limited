import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Sign in failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ebebef] px-4 font-sans">
      <div className="w-full max-w-sm bg-white border border-[#c9c9c9]/60 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center border-2 border-[#016839] bg-white rounded-full px-3 py-1 shadow-sm mx-auto">
            <span className="text-[#016839] font-black text-base lowercase">aiyan</span>
          </div>
          <h1 className="text-xl font-black text-[#161616]">Aiyan Limited CMS</h1>
          <p className="text-xs text-[#797979]">Sign in to manage fuel, C-store &amp; forecourt operations.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#161616] mb-1">Admin Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@aiyanlimited.com"
              className="w-full border border-[#c9c9c9] rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#161616] mb-1">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full border border-[#c9c9c9] rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-full bg-[#016839] hover:bg-[#014d28] text-white text-xs font-bold shadow-md disabled:opacity-50 transition-all"
          >
            {submitting ? 'Signing In…' : 'Sign In to Station Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
