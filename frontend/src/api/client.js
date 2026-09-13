import api from './axios';
import {
  fallbackSettings,
  fallbackFuelPrices,
  fallbackServices,
  fallbackPromotions,
  fallbackAboutCms,
} from '../data/forecourtData';
import { fallbackOurProductsCms } from '../data/ourProductsData';
import { fallbackCardsRewardsCms } from '../data/cardsRewardsData';

// Fetch Live Fuel Prices with offline fallback
export async function getLiveFuelPrices() {
  try {
    const res = await api.get('/fuel-prices');
    return res.data?.fuelPrices?.length ? res.data.fuelPrices : fallbackFuelPrices;
  } catch (err) {
    console.warn('Backend offline, using fallback fuel prices:', err.message);
    return fallbackFuelPrices;
  }
}

const CACHE_PREFIX = 'sb_cache_v2_';

// Synchronously retrieve cached site settings from localStorage for instant initial render (no flicker)
export function getCachedSiteSettings() {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}site_settings`);
    return cached ? JSON.parse(cached) : fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}

// Fetch All Site CMS Settings
export async function getSiteSettings() {
  try {
    const res = await api.get('/settings');
    const settings = res.data?.settings || fallbackSettings;
    try {
      if (res.data?.settings) {
        localStorage.setItem(`${CACHE_PREFIX}site_settings`, JSON.stringify(res.data.settings));
      }
    } catch (_) {}
    return settings;
  } catch (err) {
    console.warn('Backend offline, using fallback settings:', err.message);
    const cached = getCachedSiteSettings();
    return cached || fallbackSettings;
  }
}

// Synchronously retrieve cached contact page cms from localStorage (zero flicker on refresh)
export function getCachedContactSettings() {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}contact_page_cms`);
    return cached ? JSON.parse(cached) : fallbackSettings.contact_page_cms;
  } catch {
    return fallbackSettings.contact_page_cms;
  }
}

// Fetch Contact Page CMS Settings
export async function getContactPageSettings() {
  try {
    const res = await api.get('/settings/contact_page_cms');
    let val = res.data?.value;
    if (!val) return getCachedContactSettings() || fallbackSettings.contact_page_cms;
    if (typeof val === 'string') {
      try {
        val = JSON.parse(val);
      } catch (e) {
        return getCachedContactSettings() || fallbackSettings.contact_page_cms;
      }
    }
    try { localStorage.setItem(`${CACHE_PREFIX}contact_page_cms`, JSON.stringify(val)); } catch (_) {}
    return val;
  } catch (err) {
    return getCachedContactSettings() || fallbackSettings.contact_page_cms;
  }
}

// Synchronously retrieve cached about page settings from localStorage for instant initial render (zero flicker)
export function getCachedAboutSettings() {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}about_cms`);
    return cached ? JSON.parse(cached) : fallbackAboutCms;
  } catch {
    return fallbackAboutCms;
  }
}

// Fetch About Page CMS Settings
export async function getAboutPageSettings() {
  try {
    const res = await api.get('/settings/about_page_cms');
    let val = res.data?.value;
    if (!val) return getCachedAboutSettings() || fallbackAboutCms;
    if (typeof val === 'string') {
      try {
        val = JSON.parse(val);
      } catch (e) {
        return getCachedAboutSettings() || fallbackAboutCms;
      }
    }
    try {
      localStorage.setItem(`${CACHE_PREFIX}about_cms`, JSON.stringify(val));
    } catch (_) {}
    return val;
  } catch (err) {
    console.warn('Backend offline, using cached about settings:', err.message);
    return getCachedAboutSettings() || fallbackAboutCms;
  }
}

// Synchronously retrieve cached our products cms from localStorage (zero flicker on refresh)
export function getCachedOurProductsSettings() {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}our_products_cms`);
    return cached ? JSON.parse(cached) : fallbackOurProductsCms;
  } catch {
    return fallbackOurProductsCms;
  }
}

// Fetch Our Products Page CMS Settings
export async function getOurProductsPageSettings() {
  try {
    const res = await api.get('/settings/our_products_cms');
    let val = res.data?.value;
    if (!val) return getCachedOurProductsSettings() || fallbackOurProductsCms;
    if (typeof val === 'string') {
      try {
        val = JSON.parse(val);
      } catch (e) {
        console.error('Error parsing our_products_cms:', e);
        return getCachedOurProductsSettings() || fallbackOurProductsCms;
      }
    }
    try { localStorage.setItem(`${CACHE_PREFIX}our_products_cms`, JSON.stringify(val)); } catch (_) {}
    return val;
  } catch (err) {
    return getCachedOurProductsSettings() || fallbackOurProductsCms;
  }
}

// Synchronously retrieve cached cards & rewards cms from localStorage (zero flicker on refresh)
export function getCachedCardsRewardsSettings() {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}cards_rewards_cms`);
    return cached ? JSON.parse(cached) : fallbackCardsRewardsCms;
  } catch {
    return fallbackCardsRewardsCms;
  }
}

// Fetch Cards & Rewards Page CMS Settings
export async function getCardsRewardsPageSettings() {
  try {
    const res = await api.get('/settings/cards_rewards_cms');
    let val = res.data?.value;
    if (!val) return getCachedCardsRewardsSettings() || fallbackCardsRewardsCms;
    if (typeof val === 'string') {
      try {
        val = JSON.parse(val);
      } catch (e) {
        console.error('Error parsing cards_rewards_cms:', e);
        return getCachedCardsRewardsSettings() || fallbackCardsRewardsCms;
      }
    }
    try { localStorage.setItem(`${CACHE_PREFIX}cards_rewards_cms`, JSON.stringify(val)); } catch (_) {}
    return val;
  } catch (err) {
    return getCachedCardsRewardsSettings() || fallbackCardsRewardsCms;
  }
}

// Fetch Forecourt Services
export async function getForecourtServices(category) {
  try {
    const res = await api.get('/services', { params: { category } });
    return res.data?.services?.length ? res.data.services : fallbackServices;
  } catch (err) {
    console.warn('Backend offline, using fallback services:', err.message);
    return fallbackServices;
  }
}

// Fetch Store Promotions
export async function getStorePromotions() {
  try {
    const res = await api.get('/promotions');
    return res.data?.promotions?.length ? res.data.promotions : fallbackPromotions;
  } catch (err) {
    console.warn('Backend offline, using fallback promotions:', err.message);
    return fallbackPromotions;
  }
}

// Submit Inquiry / B2B Fleet Card Application
export async function submitInquiry(data) {
  return api.post('/inquiries', data).then((r) => r.data);
}

// Submit Valet / Car Wash Slot Booking
export async function submitValetBooking(data) {
  return api.post('/valet-bookings', data).then((r) => r.data);
}

// Submit Job Application with CV
export async function submitJobApplication(formData) {
  return api.post('/jobs/apply', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
}

// Submit Newsletter & Community Subscription with optional Resume
export async function submitNewsletterSubscription(formData) {
  return api.post('/newsletter/subscribe', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
}

