import { useState, useEffect } from 'react';
import { Rider } from '../types';

interface RiderFormData {
  name: string;
  email: string;
  phone: string;
  vehicle: {
    type: 'bike' | 'car' | 'scooter' | 'auto';
    plateNumber: string;
    color: string;
  };
  status: 'available' | 'on-delivery' | 'offline';
}

interface RiderFormProps {
  onSubmit: (data: RiderFormData) => Promise<void>;
  editingRider?: Rider | null;
  onCancel?: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  vehicleType: 'bike' | 'car' | 'scooter' | 'auto';
  plateNumber: string;
  vehicleColor: string;
  status: 'available' | 'on-delivery' | 'offline';
}

export default function RiderForm({ onSubmit, editingRider, onCancel }: RiderFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    vehicleType: 'bike',
    plateNumber: '',
    vehicleColor: '',
    status: 'available'
  });

  useEffect(() => {
    if (editingRider) {
      setFormData({
        name: editingRider.name,
        email: editingRider.email,
        phone: editingRider.phone,
        vehicleType: editingRider.vehicle.type as 'bike' | 'car' | 'scooter' | 'auto',
        plateNumber: editingRider.vehicle.plateNumber,
        vehicleColor: editingRider.vehicle.color,
        status: editingRider.status
      });
    }
  }, [editingRider]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const riderData: RiderFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vehicle: {
        type: formData.vehicleType,
        plateNumber: formData.plateNumber,
        color: formData.vehicleColor
      },
      status: formData.status
    };

    await onSubmit(riderData);

    if (!editingRider) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleType: 'bike',
        plateNumber: '',
        vehicleColor: '',
        status: 'available'
      });
    }
  };

  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'bike' | 'car' | 'scooter' | 'auto';
    setFormData(prev => ({ ...prev, vehicleType: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'available' | 'on-delivery' | 'offline';
    setFormData(prev => ({ ...prev, status: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-5 rounded-lg mb-8 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {editingRider ? 'Edit Rider' : 'Add New Rider'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Rider Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <select
          value={formData.vehicleType}
          onChange={handleVehicleTypeChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="scooter">Scooter</option>
          <option value="auto">Auto Rickshaw</option>
        </select>

        <input
          type="text"
          placeholder="Vehicle Plate Number"
          value={formData.plateNumber}
          onChange={(e) => setFormData(prev => ({ ...prev, plateNumber: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="text"
          placeholder="Vehicle Color"
          value={formData.vehicleColor}
          onChange={(e) => setFormData(prev => ({ ...prev, vehicleColor: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <select
          value={formData.status}
          onChange={handleStatusChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="available">Available</option>
          <option value="offline">Offline</option>
          <option value="on-delivery">On Delivery</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className={`px-6 py-2 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${editingRider
              ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500'
              : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            }`}
        >
          {editingRider ? 'Update Rider' : 'Add Rider'}
        </button>

        {editingRider && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}