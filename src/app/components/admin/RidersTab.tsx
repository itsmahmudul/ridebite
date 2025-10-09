import { useState } from 'react';
import { Rider } from './types';
import RiderForm from './forms/RiderForm';
import api from '@/hooks/api';

interface RidersTabProps {
  riders: Rider[];
  loading: boolean;
  onRidersUpdate: (riders: Rider[]) => void;
}

interface RiderFormData {
  name: string;
  email: string;
  phone: string;
  raiderId: string;
  vehicle: {
    type: string;
    color: string;
    plateNumber: string;
  };
  status: 'available' | 'offline' | 'on-delivery';
  rating: number;
  totalDeliveries: number;
  joinedDate: string;
  lastActive: string;
}

interface StatusUpdateData {
  status: 'available' | 'offline' | 'on-delivery';
}

export default function RidersTab({
  riders,
  loading,
  onRidersUpdate,
}: RidersTabProps) {
  const [editingRider, setEditingRider] = useState<Rider | null>(null);

  const addRider = async (riderData: RiderFormData): Promise<void> => {
    try {
      const response = await api.post('/raiders', riderData);
      onRidersUpdate([...riders, response.data.data]);
      alert('✅ Rider added successfully!');
    } catch (error) {
      console.error('Error adding rider:', error);
      alert('❌ Failed to add rider');
    }
  };

  const updateRider = async (riderData: RiderFormData): Promise<void> => {
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

  const deleteRider = async (id: string): Promise<void> => {
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

  const toggleRiderStatus = async (rider: Rider): Promise<void> => {
    try {
      const newStatus: 'available' | 'offline' = rider.status === 'available' ? 'offline' : 'available';
      const statusUpdate: StatusUpdateData = { status: newStatus };

      await api.put(`/raiders/${rider._id}`, statusUpdate);

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

  const handleFormSubmit = async (riderData: RiderFormData): Promise<void> => {
    if (editingRider) {
      await updateRider(riderData);
    } else {
      await addRider(riderData);
    }
  };

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
        onSubmit={handleFormSubmit}
        editingRider={editingRider}
        onCancel={cancelEdit}
      />

      {/* Riders List */}
      <div className="grid gap-4 mt-8">
        {riders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No riders found. Add your first rider above.
          </div>
        ) : (
          riders.map((rider) => (
            <div
              key={rider._id}
              className="border border-gray-200 p-5 rounded-lg flex justify-between items-start shadow-sm hover:shadow-md transition-shadow bg-white"
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
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium mb-1 ${rider.status === 'available'
                          ? 'bg-green-600'
                          : rider.status === 'on-delivery'
                            ? 'bg-yellow-500'
                            : 'bg-gray-500'
                        }`}
                    >
                      {rider.status.charAt(0).toUpperCase() + rider.status.slice(1)}
                    </span>
                    <p className="text-xs text-gray-500">
                      ⭐ {rider.rating.toFixed(1)} • 🚚 {rider.totalDeliveries} deliveries
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <strong className="w-20">Vehicle:</strong>
                    <span>{rider.vehicle.type} • {rider.vehicle.color}</span>
                  </div>
                  <div className="flex items-center">
                    <strong className="w-16">Plate:</strong>
                    <span className="font-mono">{rider.vehicle.plateNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <strong className="w-20">Joined:</strong>
                    <span>{new Date(rider.joinedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <strong className="w-24">Last Active:</strong>
                    <span>{new Date(rider.lastActive).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 ml-4 min-w-[120px]">
                <button
                  onClick={() => setEditingRider(rider)}
                  className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-md transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleRiderStatus(rider)}
                  className={`px-3 py-2 text-white text-sm rounded-md transition-colors font-medium ${rider.status === 'available'
                      ? 'bg-gray-600 hover:bg-gray-700'
                      : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                  {rider.status === 'available' ? 'Set Offline' : 'Set Available'}
                </button>
                <button
                  onClick={() => deleteRider(rider._id)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}