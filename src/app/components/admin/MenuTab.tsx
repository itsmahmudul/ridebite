import { useState } from 'react';
import { MenuItem, Restaurant } from './types';
import api from '@/hooks/api';

interface MenuTabProps {
  menuItems: MenuItem[];
  restaurants: Restaurant[];
  loading: boolean;
  onMenuItemsUpdate: (menuItems: MenuItem[]) => void;
}

export default function MenuTab({
  menuItems,
  restaurants,
  loading,
  onMenuItemsUpdate,
}: MenuTabProps) {
  const [newMenuItem, setNewMenuItem] = useState({
    restaurantId: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    isAvailable: true,
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
        isAvailable: true,
      });
      alert('✅ Menu item added successfully!');
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('❌ Failed to add menu item');
    }
  };

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      await api.delete(`/menu-items/${id}`);
      onMenuItemsUpdate(menuItems.filter((m) => m._id !== id));
      alert('🗑️ Menu item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('❌ Failed to delete menu item');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-600 text-lg">
        Loading menu items...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        🍔 Manage Menu Items
      </h2>

      {/* Add Menu Item Form */}
      <form
        onSubmit={addMenuItem}
        className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8"
      >
        <h3 className="text-lg font-medium mb-4 text-gray-700">
          Add New Menu Item
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <select
            value={newMenuItem.restaurantId}
            onChange={(e) =>
              setNewMenuItem((prev) => ({
                ...prev,
                restaurantId: e.target.value,
              }))
            }
            required
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Item Name"
            value={newMenuItem.name}
            onChange={(e) =>
              setNewMenuItem((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Description"
            value={newMenuItem.description}
            onChange={(e) =>
              setNewMenuItem((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            required
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={newMenuItem.price}
            onChange={(e) =>
              setNewMenuItem((prev) => ({
                ...prev,
                price: parseFloat(e.target.value),
              }))
            }
            required
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={newMenuItem.image}
            onChange={(e) =>
              setNewMenuItem((prev) => ({ ...prev, image: e.target.value }))
            }
            required
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Category"
            value={newMenuItem.category}
            onChange={(e) =>
              setNewMenuItem((prev) => ({ ...prev, category: e.target.value }))
            }
            required
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
        >
          Add Menu Item
        </button>
      </form>

      {/* Menu Items List */}
      <div className="grid gap-4">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h4>
              <p className="text-gray-600 text-sm">
                ${item.price} • {item.category}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {item.description}
              </p>
            </div>
            <button
              onClick={() => deleteMenuItem(item._id)}
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
