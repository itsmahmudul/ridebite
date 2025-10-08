'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Add this import
import api from '@/hooks/api';
import Image from 'next/image';

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  image: string;
  deliveryTime: string;
  rating: number;
  address: string;
  isOpen: boolean;
  createdAt: string;
}

export default function FoodPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants');
        setRestaurants(response.data.data);
      } catch (err) {
        setError('Failed to load restaurants');
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/food/${restaurantId}`);
  };

  // ... loading and error states remain the same

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        color: '#333',
        fontSize: '2.5rem'
      }}>
        🍕 Food Delivery Restaurants
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px 0'
      }}>
        {restaurants.map(restaurant => (
          <div
            key={restaurant._id}
            onClick={() => handleRestaurantClick(restaurant._id)} // Add click handler
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              backgroundColor: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Image 
              src={restaurant.image} 
              alt={restaurant.name}
              width={300}
              height={160}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '12px'
              }}
            />
            <div>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '18px', 
                color: '#333',
                fontWeight: '600'
              }}>
                {restaurant.name}
              </h3>
              <p style={{ 
                margin: '4px 0', 
                color: '#666', 
                fontSize: '14px' 
              }}>
                {restaurant.cuisine}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '8px'
              }}>
                <span style={{ 
                  color: '#ff6b00', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  ⭐ {restaurant.rating}
                </span>
                <span style={{ 
                  color: '#666', 
                  fontSize: '14px' 
                }}>
                  {restaurant.deliveryTime}
                </span>
              </div>
              <p style={{ 
                margin: '8px 0 0 0', 
                color: '#888', 
                fontSize: '12px' 
              }}>
                {restaurant.address}
              </p>
            </div>
          </div>
        ))}
      </div>

      {restaurants.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#666'
        }}>
          No restaurants found.
        </div>
      )}
    </div>
  );
}