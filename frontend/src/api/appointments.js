import api from './axios';

export const createAppointment = (payload) => api.post('/appointments', payload).then((r) => r.data);
export const getMyAppointments = () => api.get('/appointments/mine').then((r) => r.data);
