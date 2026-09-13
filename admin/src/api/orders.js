import api from './axios';

export const getAllOrders = () => api.get('/orders').then((r) => r.data);
export const updateOrderStatus = (id, status) => api.patch(`/orders/${id}/status`, { status }).then((r) => r.data);
