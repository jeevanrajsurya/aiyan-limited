import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/products', label: 'Products' },
  { to: '/orders', label: 'Orders' },
  { to: '/appointments', label: 'Appointments' },
  { to: '/jobs', label: 'Job applications' },
  { to: '/messages', label: 'Messages' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-60 shrink-0 bg-ink text-white min-h-screen flex flex-col">
      <div className="px-6 py-6">
        <p className="font-semibold text-lg">S&amp;B Admin</p>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-500 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-white/10 text-sm">
        <p className="text-white/60 mb-2">{user?.name}</p>
        <button onClick={logout} className="text-white/80 hover:text-white font-medium">
          Sign out
        </button>
      </div>
    </aside>
  );
}
