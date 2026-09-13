import api from './axios';

export const getProducts = (params) => api.get('/products', { params }).then((r) => r.data);
export const createProduct = (payload) => api.post('/products', payload).then((r) => r.data);
export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload).then((r) => r.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then((r) => r.data);
export const getCategories = () => api.get('/categories').then((r) => r.data);
export const createCategory = (payload) => api.post('/categories', payload).then((r) => r.data);
