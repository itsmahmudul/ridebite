import { useState } from 'react';
import { Restaurant } from '../types';

interface RestaurantFormData {
  name: string;
  cuisine: string;
  image: string;
  deliveryTime: string;
  rating: number;
  address: string;
  isOpen: boolean;
}

interface RestaurantFormProps {
  onSubmit: (data: RestaurantFormData) => Promise<void>;
  editingRestaurant?: Restaurant | null;
}

export default function RestaurantForm({ onSubmit, editingRestaurant }: RestaurantFormProps) {
  const [formData, setFormData] = useState<RestaurantFormData>({
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
    <form onSubmit={handleSubmit} className="bg-gray-50 p-5 rounded-lg mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="text"
          placeholder="Cuisine Type"
          value={formData.cuisine}
          onChange={(e) => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="text"
          placeholder="Delivery Time (e.g., 20-30 min)"
          value={formData.deliveryTime}
          onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating (0-5)"
          value={formData.rating}
          onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isOpen}
            onChange={(e) => setFormData(prev => ({ ...prev, isOpen: e.target.checked }))}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="ml-2 text-sm text-gray-700">Restaurant is open for business</span>
        </label>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
      </button>
    </form>
  );
}