import api from './axios';

export const getServicesAdmin = () => api.get('/services/admin').then((r) => r.data);
export const createService = (data) => api.post('/services', data).then((r) => r.data);
export const updateService = (id, data) => api.put(`/services/${id}`, data).then((r) => r.data);
export const deleteService = (id) => api.delete(`/services/${id}`).then((r) => r.data);
