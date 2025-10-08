import { useState } from 'react';
import { Rider } from './types';
import RiderForm from './forms/RiderForm';
import api from '@/hooks/api';

interface RidersTabProps {
  riders: Rider[];
  loading: boolean;
  onRidersUpdate: (riders: Rider[]) => void;
}

export default function RidersTab({ riders, loading, onRidersUpdate }: RidersTabProps) {
  const [editingRider, setEditingRider] = useState<Rider | null>(null);

  const addRider = async (riderData: any) => {
    try {
      const response = await api.post('/raiders', riderData);
      onRidersUpdate([...riders, response.data.data]);
      alert('Rider added successfully!');
    } catch (error) {
      console.error('Error adding rider:', error);
      alert('Failed to add rider');
    }
  };

  const updateRider = async (riderData: any) => {
    if (!editingRider) return;

    try {
      await api.put(`/raiders/${editingRider._id}`, riderData);
      
      onRidersUpdate(riders.map(rider => 
        rider._id === editingRider._id 
          ? { ...rider, ...riderData }
          : rider
      ));

      setEditingRider(null);
      alert('Rider updated successfully!');
    } catch (error) {
      console.error('Error updating rider:', error);
      alert('Failed to update rider');
    }
  };

  const deleteRider = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rider?')) return;
    
    try {
      await api.delete(`/raiders/${id}`);
      onRidersUpdate(riders.filter(r => r._id !== id));
      alert('Rider deleted successfully!');
    } catch (error) {
      console.error('Error deleting rider:', error);
      alert('Failed to delete rider');
    }
  };

  const toggleRiderStatus = async (rider: Rider) => {
    try {
      const newStatus = rider.status === 'available' ? 'offline' : 'available';
      await api.put(`/raiders/${rider._id}`, { status: newStatus });
      
      onRidersUpdate(riders.map(r => 
        r._id === rider._id ? { ...r, status: newStatus } : r
      ));
    } catch (error) {
      console.error('Error updating rider status:', error);
      alert('Failed to update rider status');
    }
  };

  const cancelEdit = () => {
    setEditingRider(null);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading riders...</div>;
  }

  return (
    <div>
      <h2>👥 Manage Riders</h2>
      
      <RiderForm 
        onSubmit={editingRider ? updateRider : addRider}
        editingRider={editingRider}
        onCancel={cancelEdit}
      />

      <div style={{ display: 'grid', gap: '15px' }}>
        {riders.map(rider => (
          <div key={rider._id} style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{rider.name}</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                    ID: {rider.raiderId} • {rider.email}
                  </p>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                    📞 {rider.phone}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    padding: '2px 8px',
                    backgroundColor: 
                      rider.status === 'available' ? '#28a745' : 
                      rider.status === 'on-delivery' ? '#ffc107' : '#6c757d',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '12px',
                    display: 'inline-block',
                    marginBottom: '5px'
                  }}>
                    {rider.status}
                  </span>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                    ⭐ {rider.rating} • 🚚 {rider.totalDeliveries} deliveries
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                <div>
                  <strong>Vehicle:</strong> {rider.vehicle.type} • {rider.vehicle.color}
                </div>
                <div>
                  <strong>Plate:</strong> {rider.vehicle.plateNumber}
                </div>
                <div>
                  <strong>Joined:</strong> {new Date(rider.joinedDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Last Active:</strong> {new Date(rider.lastActive).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginLeft: '15px' }}>
              <button
                onClick={() => setEditingRider(rider)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#ffc107',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => toggleRiderStatus(rider)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: rider.status === 'available' ? '#6c757d' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {rider.status === 'available' ? 'Set Offline' : 'Set Available'}
              </button>
              <button
                onClick={() => deleteRider(rider._id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}