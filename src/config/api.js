const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Log API URL on load (helps with debugging)
console.log('API Configuration:', {
  API_URL,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
});

export const api = {
  get: async (endpoint) => {
    const url = `${API_URL}${endpoint}`;
    console.log('GET:', url);
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        console.error('GET Error:', url, error);
        throw new Error(error.error || `Request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('GET Success:', url, data);
      return data;
    } catch (error) {
      console.error('GET Failed:', url, error);
      throw error;
    }
  },
  
  post: async (endpoint, data) => {
    const url = `${API_URL}${endpoint}`;
    console.log('POST:', url, data);
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        console.error('POST Error:', url, error);
        throw new Error(error.error || `Request failed: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('POST Success:', url, result);
      return result;
    } catch (error) {
      console.error('POST Failed:', url, error);
      throw error;
    }
  },
  
  put: async (endpoint, data) => {
    const url = `${API_URL}${endpoint}`;
    console.log('PUT:', url, data);
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        console.error('PUT Error:', url, error);
        throw new Error(error.error || `Request failed: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('PUT Success:', url, result);
      return result;
    } catch (error) {
      console.error('PUT Failed:', url, error);
      throw error;
    }
  },
  
  delete: async (endpoint) => {
    const url = `${API_URL}${endpoint}`;
    console.log('DELETE:', url);
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: response.statusText }));
        console.error('DELETE Error:', url, error);
        throw new Error(error.error || `Request failed: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('DELETE Success:', url, result);
      return result;
    } catch (error) {
      console.error('DELETE Failed:', url, error);
      throw error;
    }
  }
};

export { API_URL };
