import { useState } from 'react';
import { Restaurant } from '../types';

interface RestaurantFormProps {
  onSubmit: (data: any) => Promise<void>;
  editingRestaurant?: Restaurant | null;
}

export default function RestaurantForm({ onSubmit, editingRestaurant }: RestaurantFormProps) {
  const [formData, setFormData] = useState({
    name: editingRestaurant?.name || '',
    cuisine: editingRestaurant?.cuisine || '',
    image: editingRestaurant?.image || '',
    deliveryTime: editingRestaurant?.deliveryTime || '',
    rating: editingRestaurant?.rating || 0,
    address: editingRestaurant?.address || '',
    isOpen: editingRestaurant?.isOpen ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    if (!editingRestaurant) {
      setFormData({
        name: '',
        cuisine: '',
        image: '',
        deliveryTime: '',
        rating: 0,
        address: '',
        isOpen: true
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px'
    }}>
      <h3>{editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="text"
          placeholder="Cuisine Type"
          value={formData.cuisine}
          onChange={(e) => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="text"
          placeholder="Delivery Time"
          value={formData.deliveryTime}
          onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={formData.rating}
          onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <button type="submit" style={{
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        {editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
      </button>
    </form>
  );
}