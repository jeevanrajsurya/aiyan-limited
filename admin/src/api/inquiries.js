import api from './axios';

export const getInquiriesAdmin = (params) => api.get('/inquiries/admin', { params }).then((r) => r.data);
export const updateInquiryStatus = (id, data) => api.put(`/inquiries/${id}/status`, data).then((r) => r.data);
export const deleteInquiry = (id) => api.delete(`/inquiries/${id}`).then((r) => r.data);
