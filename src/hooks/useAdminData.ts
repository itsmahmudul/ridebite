import { useState, useEffect } from 'react';
import api from './api';
import { Restaurant, MenuItem, Ride, Rider, TabType } from '../app/components/admin/types';

export const useAdminData = (activeTab: TabType) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [rides, setRides] = useState<Ride[]>([]);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'restaurants':
          const restaurantsRes = await api.get('/restaurants');
          setRestaurants(restaurantsRes.data.data);
          break;
        case 'menu':
          const menuRes = await api.get('/menu-items');
          setMenuItems(menuRes.data.data);
          const restRes = await api.get('/restaurants');
          setRestaurants(restRes.data.data);
          break;
        case 'rides':
          const ridesRes = await api.get('/rides');
          setRides(ridesRes.data.data);
          break;
        case 'riders':
          const ridersRes = await api.get('/raiders');
          setRiders(ridersRes.data.data);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    restaurants,
    menuItems,
    rides,
    riders,
    loading,
    setRestaurants,
    setMenuItems,
    setRides,
    setRiders,
    refetch: loadData
  };
};