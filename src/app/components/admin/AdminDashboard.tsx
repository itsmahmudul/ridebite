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
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          🛠️ Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">
            Welcome, {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 border-b-2 border-gray-200 pb-3">
        {(['restaurants', 'menu', 'rides', 'riders'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-md font-semibold capitalize transition-colors ${activeTab === tab
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div>{renderActiveTab()}</div>
    </div>
  );
}
