import api from './axios';

export const getApplicationsAdmin = (params) => api.get('/jobs/admin', { params }).then((r) => r.data);
export const updateApplicationStatus = (id, data) => api.put(`/jobs/${id}/status`, data).then((r) => r.data);
export const deleteApplication = (id) => api.delete(`/jobs/${id}`).then((r) => r.data);
