import { useState } from 'react';
import { Rider } from './types';
import RiderForm from './forms/RiderForm';
import api from '@/hooks/api';

interface RidersTabProps {
  riders: Rider[];
  loading: boolean;
  onRidersUpdate: (riders: Rider[]) => void;
}

export default function RidersTab({
  riders,
  loading,
  onRidersUpdate,
}: RidersTabProps) {
  const [editingRider, setEditingRider] = useState<Rider | null>(null);

  const addRider = async (riderData: any) => {
    try {
      const response = await api.post('/raiders', riderData);
      onRidersUpdate([...riders, response.data.data]);
      alert('✅ Rider added successfully!');
    } catch (error) {
      console.error('Error adding rider:', error);
      alert('❌ Failed to add rider');
    }
  };

  const updateRider = async (riderData: any) => {
    if (!editingRider) return;

    try {
      await api.put(`/raiders/${editingRider._id}`, riderData);
      onRidersUpdate(
        riders.map((rider) =>
          rider._id === editingRider._id ? { ...rider, ...riderData } : rider
        )
      );
      setEditingRider(null);
      alert('✅ Rider updated successfully!');
    } catch (error) {
      console.error('Error updating rider:', error);
      alert('❌ Failed to update rider');
    }
  };

  const deleteRider = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rider?')) return;

    try {
      await api.delete(`/raiders/${id}`);
      onRidersUpdate(riders.filter((r) => r._id !== id));
      alert('🗑️ Rider deleted successfully!');
    } catch (error) {
      console.error('Error deleting rider:', error);
      alert('❌ Failed to delete rider');
    }
  };

  const toggleRiderStatus = async (rider: Rider) => {
    try {
      const newStatus = rider.status === 'available' ? 'offline' : 'available';
      await api.put(`/raiders/${rider._id}`, { status: newStatus });

      onRidersUpdate(
        riders.map((r) =>
          r._id === rider._id ? { ...r, status: newStatus } : r
        )
      );
    } catch (error) {
      console.error('Error updating rider status:', error);
      alert('❌ Failed to update rider status');
    }
  };

  const cancelEdit = () => setEditingRider(null);

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-600 text-lg">
        Loading riders...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        👥 Manage Riders
      </h2>

      {/* Rider Form */}
      <RiderForm
        onSubmit={editingRider ? updateRider : addRider}
        editingRider={editingRider}
        onCancel={cancelEdit}
      />

      {/* Riders List */}
      <div className="grid gap-4 mt-8">
        {riders.map((rider) => (
          <div
            key={rider._id}
            className="border border-gray-200 p-5 rounded-lg flex justify-between items-start shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Rider Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {rider.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    ID: {rider.raiderId} • {rider.email}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">📞 {rider.phone}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-xs mb-1 ${rider.status === 'available'
                        ? 'bg-green-600'
                        : rider.status === 'on-delivery'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }`}
                  >
                    {rider.status}
                  </span>
                  <p className="text-xs text-gray-500">
                    ⭐ {rider.rating} • 🚚 {rider.totalDeliveries} deliveries
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <div>
                  <strong>Vehicle:</strong> {rider.vehicle.type} •{' '}
                  {rider.vehicle.color}
                </div>
                <div>
                  <strong>Plate:</strong> {rider.vehicle.plateNumber}
                </div>
                <div>
                  <strong>Joined:</strong>{' '}
                  {new Date(rider.joinedDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Last Active:</strong>{' '}
                  {new Date(rider.lastActive).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => setEditingRider(rider)}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded-md transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => toggleRiderStatus(rider)}
                className={`px-3 py-1 text-white text-xs rounded-md transition-colors ${rider.status === 'available'
                    ? 'bg-gray-600 hover:bg-gray-700'
                    : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {rider.status === 'available' ? 'Set Offline' : 'Set Available'}
              </button>
              <button
                onClick={() => deleteRider(rider._id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md transition-colors"
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
