import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Layout,
  ShoppingBag,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Compass,
  MailCheck,
  Mail,
  Info,
} from 'lucide-react';

import HomePageCmsTab from '../tabs/HomePageCmsTab';
import NavbarFooterTab from '../tabs/NavbarFooterTab';
import NewsletterSubmissionsTab from '../tabs/NewsletterSubmissionsTab';
import GeneralSettingsTab from '../tabs/GeneralSettingsTab';
import ContactPageCmsTab from '../tabs/ContactPageCmsTab';
import AboutPageCmsTab from '../tabs/AboutPageCmsTab';
import OurProductsCmsTab from '../tabs/OurProductsCmsTab';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('homepage');

  const navigation = [
    { id: 'homepage', label: 'Home Page CMS & Images', icon: Layout },
    { id: 'about_page', label: 'About Us Page CMS', icon: Info },
    { id: 'contact_page', label: 'Contact Us Page CMS', icon: Mail },
    { id: 'our_products_page', label: 'Our Products Page CMS', icon: ShoppingBag },
    { id: 'nav_footer', label: 'Navbar & Footer CMS', icon: Compass },
    { id: 'newsletter', label: 'Newsletter & Resumes CRM', icon: MailCheck },
    { id: 'settings', label: 'Station Master Settings', icon: Settings },
  ];

  return (
    <div className="h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - Fixed height, never scrolls with page */}
      <aside className="w-full md:w-72 h-auto md:h-screen bg-slate-950 text-white p-5 flex flex-col justify-between shrink-0 shadow-xl border-r border-slate-800 z-30 select-none">
        <div className="space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="flex items-center justify-center border-2 border-[#005f73] bg-white rounded-full px-2.5 py-0.5 shadow-sm">
              <span className="text-[#005f73] font-black text-sm lowercase">aiyan</span>
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white leading-tight">Aiyan Limited</h1>
              <p className="text-[11px] text-[#0a9396] font-semibold uppercase tracking-wider">Station CMS Admin</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white shadow-md shadow-cyan-950/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Footer & Quick Links - Always fixed at bottom of sidebar */}
        <div className="pt-4 border-t border-slate-800 space-y-3 shrink-0">
          <a
            href={import.meta.env.VITE_CLIENT_URL || '/'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-[#0a9396] bg-slate-900/50 hover:bg-slate-900 rounded-lg border border-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Live Customer Site
            </span>
            <ChevronRight className="w-3 h-3" />
          </a>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-[#d97706]">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200 leading-tight">
                  {user?.name || 'Aiyan Limited Admin'}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {user?.email || 'admin@aiyanlimited.com'}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane - Only this container scrolls */}
      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-10 max-w-7xl mx-auto w-full">
        {activeTab === 'homepage' && <HomePageCmsTab />}
        {activeTab === 'about_page' && <AboutPageCmsTab />}
        {activeTab === 'contact_page' && <ContactPageCmsTab />}
        {activeTab === 'our_products_page' && <OurProductsCmsTab />}
        {activeTab === 'nav_footer' && <NavbarFooterTab />}
        {activeTab === 'newsletter' && <NewsletterSubmissionsTab />}
        {activeTab === 'settings' && <GeneralSettingsTab />}
      </main>
    </div>
  );
}
