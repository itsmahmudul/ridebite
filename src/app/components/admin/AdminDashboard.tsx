'use client';

import { useState } from 'react';
import { TabType } from './types';
import { useAdminData } from '@/hooks/useAdminData';
import { useAuth } from '../../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import RestaurantsTab from './RestaurantsTab';
import MenuTab from './MenuTab';
import RidesTab from './RidesTab';
import RidersTab from './RidersTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('restaurants');
  const {
    restaurants,
    menuItems,
    rides,
    riders,
    loading,
    setRestaurants,
    setMenuItems,
    setRides,
    setRiders,
    refetch
  } = useAdminData(activeTab);

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'restaurants':
        return (
          <RestaurantsTab
            restaurants={restaurants}
            loading={loading}
            onRestaurantsUpdate={setRestaurants}
          />
        );
      case 'menu':
        return (
          <MenuTab
            menuItems={menuItems}
            restaurants={restaurants}
            loading={loading}
            onMenuItemsUpdate={setMenuItems}
          />
        );
      case 'rides':
        return <RidesTab rides={rides} loading={loading} />;
      case 'riders':
        return (
          <RidersTab
            riders={riders}
            loading={loading}
            onRidersUpdate={setRiders}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333', margin: 0 }}>
          🛠️ Admin Dashboard
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: '#666' }}>Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        {(['restaurants', 'menu', 'rides', 'riders'] as TabType[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === tab ? '#ff6b00' : '#f8f9fa',
              color: activeTab === tab ? 'white' : '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {renderActiveTab()}
    </div>
  );
}