import api from './axios';

export const createOrder = (items) => api.post('/orders', { items }).then((r) => r.data);
export const getMyOrders = () => api.get('/orders/mine').then((r) => r.data);
