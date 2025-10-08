import { useState } from 'react';
import { MenuItem, Restaurant } from './types';
import api from '@/hooks/api';

interface MenuTabProps {
  menuItems: MenuItem[];
  restaurants: Restaurant[];
  loading: boolean;
  onMenuItemsUpdate: (menuItems: MenuItem[]) => void;
}

export default function MenuTab({ menuItems, restaurants, loading, onMenuItemsUpdate }: MenuTabProps) {
  const [newMenuItem, setNewMenuItem] = useState({
    restaurantId: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    isAvailable: true
  });

  const addMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/menu-items', newMenuItem);
      onMenuItemsUpdate([...menuItems, response.data.data]);
      setNewMenuItem({
        restaurantId: '',
        name: '',
        description: '',
        price: 0,
        image: '',
        category: '',
        isAvailable: true
      });
      alert('Menu item added successfully!');
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item');
    }
  };

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    
    try {
      await api.delete(`/menu-items/${id}`);
      onMenuItemsUpdate(menuItems.filter(m => m._id !== id));
      alert('Menu item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading menu items...</div>;
  }

  return (
    <div>
      <h2>🍔 Manage Menu Items</h2>
      
      <form onSubmit={addMenuItem} style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h3>Add New Menu Item</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
          <select
            value={newMenuItem.restaurantId}
            onChange={(e) => setNewMenuItem(prev => ({ ...prev, restaurantId: e.target.value }))}
            required
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Select Restaurant</option>
            {restaurants.map(restaurant => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Item Name"
            value={newMenuItem.name}
            onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
            required
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Description"
            value={newMenuItem.description}
            onChange={(e) => setNewMenuItem(prev => ({ ...prev, description: e.target.value }))}
            required
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={newMenuItem.price}
            onChange={(e) => setNewMenuItem(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
            required
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newMenuItem.image}
            onChange={(e) => setNewMenuItem(prev => ({ ...prev, image: e.target.value }))}
            required
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Category"
            value={newMenuItem.category}
            onChange={(e) => setNewMenuItem(prev => ({ ...prev, category: e.target.value }))}
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
          Add Menu Item
        </button>
      </form>

      <div style={{ display: 'grid', gap: '15px' }}>
        {menuItems.map(item => (
          <div key={item._id} style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
              <p style={{ margin: 0, color: '#666' }}>${item.price} • {item.category}</p>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{item.description}</p>
            </div>
            <button
              onClick={() => deleteMenuItem(item._id)}
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