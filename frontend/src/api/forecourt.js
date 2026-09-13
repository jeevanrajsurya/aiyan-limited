import api from './axios';

export const getFuelPrices = () => api.get('/fuel-prices').then((r) => r.data);
export const getAllSettings = () => api.get('/settings').then((r) => r.data);
export const getServices = (params) => api.get('/services', { params }).then((r) => r.data);
export const getPromotions = () => api.get('/promotions').then((r) => r.data);
export const createInquiry = (data) => api.post('/inquiries', data).then((r) => r.data);
export const createValetBooking = (data) => api.post('/valet-bookings', data).then((r) => r.data);
export const submitJobApplication = (formData) =>
  api.post('/jobs/apply', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);
