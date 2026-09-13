import api from './axios';

export const applyForJob = (formData) =>
  api
    .post('/jobs/apply', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);
