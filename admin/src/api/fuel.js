import api from './axios';

export const getFuelPricesAdmin = () => api.get('/fuel-prices/admin').then((r) => r.data);
export const updateFuelPrice = (id, data) => api.put(`/fuel-prices/${id}`, data).then((r) => r.data);
export const createFuelPrice = (data) => api.post('/fuel-prices', data).then((r) => r.data);
export const deleteFuelPrice = (id) => api.delete(`/fuel-prices/${id}`).then((r) => r.data);
