import { useState, useEffect } from 'react';
import { api } from '../config/api';

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const items = await api.get(`/${collectionName}`);
      setData(items);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Increased interval from 5s to 30s to reduce load
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [collectionName]);

  const addItem = async (item) => {
    const newItem = await api.post(`/${collectionName}`, item);
    setData(prev => [...prev, newItem]);
    return newItem;
  };

  const updateItem = async (id, updates) => {
    const updatedItem = await api.put(`/${collectionName}/${id}`, updates);
    setData(prev => prev.map(item => item._id === id ? updatedItem : item));
    return updatedItem;
  };

  const deleteItem = async (id) => {
    await api.delete(`/${collectionName}/${id}`);
    setData(prev => prev.filter(item => item._id !== id));
  };

  return { data, loading, addItem, updateItem, deleteItem, refetch: fetchData };
};
