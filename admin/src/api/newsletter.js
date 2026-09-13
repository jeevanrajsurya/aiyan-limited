import api from './axios';

export const getNewsletterSubmissions = (params) =>
  api.get('/newsletter/admin', { params }).then((r) => r.data);

export const updateNewsletterStatus = (id, data) =>
  api.put(`/newsletter/${id}/status`, data).then((r) => r.data);

export const deleteNewsletterSubmission = (id) =>
  api.delete(`/newsletter/${id}`).then((r) => r.data);
