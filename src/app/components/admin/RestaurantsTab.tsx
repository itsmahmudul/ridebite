import { useState } from 'react';
import { Restaurant } from './types';
import RestaurantForm from './forms/RestaurantForm';
import api from '@/hooks/api';

interface RestaurantsTabProps {
  restaurants: Restaurant[];
  loading: boolean;
  onRestaurantsUpdate: (restaurants: Restaurant[]) => void;
}

export default function RestaurantsTab({ restaurants, loading, onRestaurantsUpdate }: RestaurantsTabProps) {
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  const addRestaurant = async (restaurantData: any) => {
    try {
      const response = await api.post('/restaurants', restaurantData);
      onRestaurantsUpdate([...restaurants, response.data.data]);
      alert('Restaurant added successfully!');
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Failed to add restaurant');
    }
  };

  const deleteRestaurant = async (id: string) => {
    if (!confirm('Are you sure you want to delete this restaurant?')) return;
    
    try {
      await api.delete(`/restaurants/${id}`);
      onRestaurantsUpdate(restaurants.filter(r => r._id !== id));
      alert('Restaurant deleted successfully!');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete restaurant');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading restaurants...</div>;
  }

  return (
    <div>
      <h2>🍕 Manage Restaurants</h2>
      
      <RestaurantForm 
        onSubmit={addRestaurant} 
        editingRestaurant={editingRestaurant}
      />

      <div style={{ display: 'grid', gap: '15px' }}>
        {restaurants.map(restaurant => (
          <div key={restaurant._id} style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{restaurant.name}</h4>
              <p style={{ margin: 0, color: '#666' }}>{restaurant.cuisine} • {restaurant.deliveryTime}</p>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{restaurant.address}</p>
            </div>
            <button
              onClick={() => deleteRestaurant(restaurant._id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}