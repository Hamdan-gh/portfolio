import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Auth init - token exists:', !!token);
    
    if (token) {
      api.get('/auth/me')
        .then(userData => {
          console.log('User authenticated:', userData);
          setUser(userData);
        })
        .catch((error) => {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    console.log('Login attempt for:', email);
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        console.log('User logged in:', response.user);
        return response;
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  const logout = async () => {
    console.log('Logging out');
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
