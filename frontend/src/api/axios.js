import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // send httpOnly cookies
});

// If an access token expires, try a silent refresh once, then retry the request
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await api.post('/auth/refresh');
        return api(original);
      } catch {
        // refresh failed — let the caller handle the 401 (e.g. redirect to sign in)
      }
    }
    return Promise.reject(error);
  }
);

export default api;
