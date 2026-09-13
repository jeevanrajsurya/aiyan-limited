import { createContext, useContext, useEffect, useState } from 'react';
import { fetchMe, loginAdmin, logoutAdmin } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then((data) => setUser(data.user?.role === 'ADMIN' ? data.user : null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await loginAdmin({ email, password });
    if (data.user.role !== 'ADMIN') {
      await logoutAdmin();
      throw new Error('This account does not have admin access');
    }
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    await logoutAdmin();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
