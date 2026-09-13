import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MyAccount() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ink mb-2">My account</h1>
      <p className="text-ink/60 mb-8">Welcome back, {user?.name}.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/account/orders" className="border border-brand-100 rounded-2xl p-6 hover:border-brand-300 transition-colors">
          <p className="font-semibold text-ink">Orders</p>
          <p className="text-sm text-ink/60 mt-1">View your order history</p>
        </Link>
        <Link to="/account/bookings" className="border border-brand-100 rounded-2xl p-6 hover:border-brand-300 transition-colors">
          <p className="font-semibold text-ink">Bookings</p>
          <p className="text-sm text-ink/60 mt-1">View your appointments</p>
        </Link>
      </div>

      <div className="mt-10 border border-brand-100 rounded-2xl p-6">
        <p className="font-semibold text-ink mb-3">Account details</p>
        <dl className="text-sm space-y-1 text-ink/70">
          <div className="flex gap-2"><dt className="w-20 text-ink/40">Name</dt><dd>{user?.name}</dd></div>
          <div className="flex gap-2"><dt className="w-20 text-ink/40">Email</dt><dd>{user?.email}</dd></div>
          {user?.phone && <div className="flex gap-2"><dt className="w-20 text-ink/40">Phone</dt><dd>{user.phone}</dd></div>}
        </dl>
      </div>
    </div>
  );
}
