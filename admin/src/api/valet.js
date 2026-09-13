import api from './axios';

export const getValetBookingsAdmin = (params) => api.get('/valet-bookings/admin', { params }).then((r) => r.data);
export const updateValetBookingStatus = (id, data) => api.put(`/valet-bookings/${id}/status`, data).then((r) => r.data);
export const deleteValetBooking = (id) => api.delete(`/valet-bookings/${id}`).then((r) => r.data);
