import { useState } from 'react';
import { Restaurant } from './types';
import RestaurantForm from './forms/RestaurantForm';
import api from '@/hooks/api';

interface RestaurantsTabProps {
  restaurants: Restaurant[];
  loading: boolean;
  onRestaurantsUpdate: (restaurants: Restaurant[]) => void;
}

interface RestaurantFormData {
  name: string;
  cuisine: string;
  address: string;
  deliveryTime: string;
  rating: number;
  image: string;
  isOpen: boolean;
}

export default function RestaurantsTab({
  restaurants,
  loading,
  onRestaurantsUpdate,
}: RestaurantsTabProps) {
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null
  );

  const addRestaurant = async (restaurantData: RestaurantFormData) => {
    try {
      const response = await api.post('/restaurants', restaurantData);
      onRestaurantsUpdate([...restaurants, response.data.data]);
      alert('✅ Restaurant added successfully!');
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('❌ Failed to add restaurant');
    }
  };

  const deleteRestaurant = async (id: string) => {
    if (!confirm('Are you sure you want to delete this restaurant?')) return;

    try {
      await api.delete(`/restaurants/${id}`);
      onRestaurantsUpdate(restaurants.filter((r) => r._id !== id));
      alert('🗑️ Restaurant deleted successfully!');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('❌ Failed to delete restaurant');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-600 text-lg">
        Loading restaurants...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        🍕 Manage Restaurants
      </h2>

      {/* Restaurant Form */}
      <RestaurantForm
        onSubmit={addRestaurant}
        editingRestaurant={editingRestaurant}
      />

      {/* Restaurant List */}
      <div className="grid gap-4 mt-8">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="border border-gray-200 p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {restaurant.name}
              </h4>
              <p className="text-gray-600 text-sm">
                {restaurant.cuisine} • {restaurant.deliveryTime}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {restaurant.address}
              </p>
            </div>

            <button
              onClick={() => deleteRestaurant(restaurant._id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}