import { useState, useEffect } from 'react';
import { Rider } from '../types';

interface RiderFormProps {
  onSubmit: (data: any) => Promise<void>;
  editingRider?: Rider | null;
  onCancel?: () => void;
}

export default function RiderForm({ onSubmit, editingRider, onCancel }: RiderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: 'bike' as 'bike' | 'car' | 'scooter' | 'auto',
    plateNumber: '',
    vehicleColor: '',
    status: 'available' as 'available' | 'on-delivery' | 'offline'
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
    const riderData = {
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

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px'
    }}>
      <h3>{editingRider ? 'Edit Rider' : 'Add New Rider'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Rider Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <select
          value={formData.vehicleType}
          onChange={(e) => setFormData(prev => ({ ...prev, vehicleType: e.target.value as any }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="scooter">Scooter</option>
          <option value="auto">Auto</option>
        </select>
        <input
          type="text"
          placeholder="Plate Number"
          value={formData.plateNumber}
          onChange={(e) => setFormData(prev => ({ ...prev, plateNumber: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="text"
          placeholder="Vehicle Color"
          value={formData.vehicleColor}
          onChange={(e) => setFormData(prev => ({ ...prev, vehicleColor: e.target.value }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            status: e.target.value as 'available' | 'on-delivery' | 'offline'
          }))}
          required
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="available">Available</option>
          <option value="offline">Offline</option>
          <option value="on-delivery">On Delivery</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: editingRider ? '#ffc107' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          {editingRider ? 'Update Rider' : 'Add Rider'}
        </button>
        {editingRider && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}