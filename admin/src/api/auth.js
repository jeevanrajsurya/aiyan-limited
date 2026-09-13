import api from './axios';

export const loginAdmin = (payload) => api.post('/auth/login', payload).then((r) => r.data);
export const logoutAdmin = () => api.post('/auth/logout').then((r) => r.data);
export const fetchMe = () => api.get('/auth/me').then((r) => r.data);
