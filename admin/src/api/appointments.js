import api from './axios';

export const getAllAppointments = () => api.get('/appointments').then((r) => r.data);
export const updateAppointmentStatus = (id, status) =>
  api.patch(`/appointments/${id}/status`, { status }).then((r) => r.data);
