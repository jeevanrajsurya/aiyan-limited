import api from './axios';

export const getMessages = () => api.get('/contact').then((r) => r.data);
