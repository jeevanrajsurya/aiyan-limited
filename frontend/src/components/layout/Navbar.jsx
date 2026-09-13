import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { SafeImage } from '../../utils/imageHelper';
import { useCart } from '../../context/CartContext';

const defaultNavLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Our Products', to: '/store' },
  { name: 'Contact', to: '/contact' },
];

export default function Navbar({ navigationData, onOpenValetModal, onOpenFleetModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const cartCount = items?.length || 0;

  // Active link helper
  const isLinkActive = (linkTo) => {
    if (!linkTo) return false;
    const cleanTo = linkTo.split('#')[0].split('?')[0];
    if (cleanTo === '/') {
      return location.pathname === '/';
    }
    if (cleanTo === '/store' || cleanTo === '/our-products' || cleanTo === '/products') {
      return (
        location.pathname.startsWith('/store') ||
        location.pathname.startsWith('/our-products') ||
        location.pathname === '/products'
      );
    }
    if (cleanTo === '/about') {
      return location.pathname.startsWith('/about');
    }
    if (cleanTo === '/contact') {
      return location.pathname.startsWith('/contact');
    }
    return location.pathname.startsWith(cleanTo);
  };

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Navbar Dynamic Settings
  const showNavbar = navigationData?.navbar?.enabled !== false;
  const logoUrl = navigationData?.navbar?.logoUrl;
  const hasLogoImage = logoUrl !== '' && logoUrl !== 'none';
  const baseLinks =
    navigationData?.navbar?.links && navigationData.navbar.links.length > 0
      ? navigationData.navbar.links
      : defaultNavLinks;

  // Ensure Contact is a standard text link like all other items
  const hasContact = baseLinks.some(
    (l) => l.to === '/contact' || l.name?.toLowerCase().includes('contact')
  );
  const navLinks = hasContact
    ? baseLinks
    : [...baseLinks, { name: 'Contact', to: '/contact' }];

  if (!showNavbar) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md text-[#161616] border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center shrink-0 min-w-[160px] sm:min-w-[200px]">
          {hasLogoImage ? (
            <SafeImage
              src={logoUrl || '/uploads/conoco-default.png'}
              defaultFallback="/uploads/conoco-default.png"
              alt="Petrol"
              className="h-11 sm:h-13 md:h-14 max-h-[56px] w-auto object-contain hover:scale-[1.02] transition-transform drop-shadow-sm"
            />
          ) : (
            <span className="font-gotham text-2xl sm:text-3xl font-black tracking-tight text-[#071e26]">
              Petrol<span className="text-[#f59e0b]">®</span>
            </span>
          )}
        </Link>

        {/* Right: Desktop Nav Links & 3 Action Icons (Search, Cart, User) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <nav className="flex items-center gap-5 xl:gap-7">
            {navLinks.map((link, idx) => {
              const active = isLinkActive(link.to);
              return (
                <NavLink
                  key={link.to || idx}
                  to={link.to}
                  className={`font-gotham text-[14px] xl:text-[15px] transition-colors duration-200 cursor-pointer ${
                    active
                      ? 'text-[#f59e0b] font-bold'
                      : 'text-slate-700 hover:text-[#f59e0b] font-medium'
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* 3 Right Action Icons: Search, Cart, Account */}
          <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200/80">
            <Link
              to="/our-products"
              aria-label="Search"
              title="Search Products"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-700 hover:text-[#005f73] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              title="Shopping Cart"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-700 hover:text-[#005f73] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#005f73] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              title="User Account"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-700 hover:text-[#005f73] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Header: 3 Action Icons + Hamburger toggle */}
        <div className="lg:hidden flex items-center gap-1">
          <Link
            to="/our-products"
            aria-label="Search"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-700 hover:text-[#005f73] hover:bg-slate-100 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-700 hover:text-[#005f73] hover:bg-slate-100 transition-all cursor-pointer relative"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#005f73] text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-700 hover:text-[#005f73] hover:bg-slate-100 transition-all cursor-pointer"
          >
            <User className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-[#f59e0b] transition-colors cursor-pointer ml-1"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 pt-4 pb-6 space-y-2 shadow-2xl max-w-7xl mx-4 sm:mx-8 mt-2 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200 text-[#161616]">
          {navLinks.map((link, idx) => {
            const active = isLinkActive(link.to);
            return (
              <div key={link.to || idx}>
                <NavLink
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-gotham text-base py-2 transition-colors ${
                    active
                      ? 'text-[#f59e0b] font-bold'
                      : 'text-slate-700 font-medium hover:text-[#f59e0b]'
                  }`}
                >
                  {link.name}
                </NavLink>
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
