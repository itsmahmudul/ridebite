'use client';

import { useState } from 'react';
import { TabType } from './types';
import { useAdminData } from '@/hooks/useAdminData';
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
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        🛠️ Admin Dashboard
      </h1>

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