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
import { FaHome } from 'react-icons/fa'; // ✅ Home icon from react-icons

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 p-4 flex flex-row lg:flex-col items-center lg:items-stretch justify-between lg:justify-start gap-3 overflow-x-auto">
        {/* Title */}
        <div className="flex items-center justify-between w-full lg:mb-6">
          <h1 className="text-lg font-semibold text-gray-800 whitespace-nowrap">
            🛠️ Admin Dashboard
          </h1>
        </div>

        {/* Tabs + Home */}
        <div className="flex flex-row lg:flex-col gap-3 w-full">
          {/* Home Button */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-md font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
          >
            <FaHome className="text-gray-700" />
            <span className="capitalize">Home</span>
          </button>

          {/* Tab Buttons */}
          {(['restaurants', 'menu', 'rides', 'riders'] as TabType[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Logout (desktop only) */}
        <button
          onClick={handleLogout}
          className="hidden lg:block mt-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <span className="text-gray-600 text-sm">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Active Tab Content */}
        <div>{renderActiveTab()}</div>
      </main>
    </div>
  );
}
