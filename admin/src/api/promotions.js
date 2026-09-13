import api from './axios';

export const getPromotionsAdmin = () => api.get('/promotions/admin').then((r) => r.data);
export const createPromotion = (data) => api.post('/promotions', data).then((r) => r.data);
export const updatePromotion = (id, data) => api.put(`/promotions/${id}`, data).then((r) => r.data);
export const deletePromotion = (id) => api.delete(`/promotions/${id}`).then((r) => r.data);
