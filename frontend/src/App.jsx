import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSiteSettings, getCachedSiteSettings } from './api/client';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import About from './pages/About';
import FuelServices from './pages/FuelServices';
import Store from './pages/Store';
import OurProducts from './pages/OurProducts';
import Rewards from './pages/Rewards';
import Fleet from './pages/Fleet';
import CardsRewards from './pages/CardsRewards';
import CreditCardsPage from './pages/cards/CreditCardsPage';
import KickBackPage from './pages/cards/KickBackPage';
import GiftCardsPage from './pages/cards/GiftCardsPage';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import SignIn from './pages/account/SignIn';
import MyAccount from './pages/account/MyAccount';

import ValetBookingModal from './components/ValetBookingModal';
import FleetInquiryModal from './components/FleetInquiryModal';
import JobApplyModal from './components/JobApplyModal';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isValetOpen, setIsValetOpen] = useState(false);
  const [isFleetOpen, setIsFleetOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [activeJobTitle, setActiveJobTitle] = useState(null);

  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: getSiteSettings,
    initialData: getCachedSiteSettings,
  });

  const handleOpenJob = (jobTitle) => {
    setActiveJobTitle(jobTitle || null);
    setIsJobOpen(true);
  };

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-white font-body text-[#161616]">
      <ScrollToTop />
      <Navbar
        navigationData={settings?.navigation}
        onOpenValetModal={() => setIsValetOpen(true)}
        onOpenFleetModal={() => setIsFleetOpen(true)}
      />

      <main className="flex-1 bg-white pt-[64px] sm:pt-[72px]">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onOpenValet={() => setIsValetOpen(true)}
                onOpenFleet={() => setIsFleetOpen(true)}
                onOpenJob={handleOpenJob}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/fuel-services"
            element={
              <FuelServices
                onOpenValet={() => setIsValetOpen(true)}
                onOpenFleet={() => setIsFleetOpen(true)}
              />
            }
          />
          <Route path="/our-products" element={<OurProducts />} />
          <Route path="/store" element={<OurProducts />} />
          <Route path="/products" element={<OurProducts />} />


          {/* Cards & Rewards Hub & Dedicated Subpages */}
          <Route path="/cards-rewards" element={<CardsRewards />} />
          <Route path="/cards" element={<CardsRewards />} />

          <Route path="/credit-cards" element={<CreditCardsPage />} />
          <Route path="/cards-rewards/credit-cards" element={<CreditCardsPage />} />

          <Route path="/kickback" element={<KickBackPage />} />
          <Route path="/cards-rewards/kickback" element={<KickBackPage />} />

          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/cards-rewards/gift-cards" element={<GiftCardsPage />} />

          <Route
            path="/rewards"
            element={<Rewards onOpenFleet={() => setIsFleetOpen(true)} />}
          />
          <Route path="/fleet" element={<Fleet />} />
          <Route
            path="/careers"
            element={<Careers onOpenJob={handleOpenJob} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/account" element={<MyAccount />} />
          {/* Wildcard fallback to Home */}
          <Route
            path="*"
            element={
              <Home
                onOpenValet={() => setIsValetOpen(true)}
                onOpenFleet={() => setIsFleetOpen(true)}
                onOpenJob={handleOpenJob}
              />
            }
          />
        </Routes>
      </main>

      <Footer
        footerData={settings?.navigation?.footer}
        onOpenValetModal={() => setIsValetOpen(true)}
        onOpenFleetModal={() => setIsFleetOpen(true)}
        onOpenJobModal={() => handleOpenJob()}
      />

      {/* Shared Forecourt Modals */}
      <ValetBookingModal
        isOpen={isValetOpen}
        onClose={() => setIsValetOpen(false)}
      />
      <FleetInquiryModal
        isOpen={isFleetOpen}
        onClose={() => setIsFleetOpen(false)}
      />
      <JobApplyModal
        isOpen={isJobOpen}
        onClose={() => {
          setIsJobOpen(false);
          setActiveJobTitle(null);
        }}
        initialJobTitle={activeJobTitle}
      />
    </div>
  );
}

