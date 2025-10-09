import { Ride } from './types';

interface RidesTabProps {
  rides: Ride[];
  loading: boolean;
}

export default function RidesTab({ rides, loading }: RidesTabProps) {
  if (loading) {
    return (
      <div className="text-center py-5 text-gray-600">
        Loading rides...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">🚗 All Rides</h2>

      <div className="grid gap-4">
        {rides.map((ride) => (
          <div
            key={ride._id}
            className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-medium text-gray-800 m-0">
                {ride.customerName}
              </h4>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                  ride.status === 'completed'
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`}
              >
                {ride.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <strong>From:</strong> {ride.pickup}
              </div>
              <div>
                <strong>To:</strong> {ride.destination}
              </div>
              <div>
                <strong>Vehicle:</strong> {ride.vehicleType}
              </div>
              <div>
                <strong>Driver:</strong> {ride.driverName}
              </div>
              <div>
                <strong>Fare:</strong> ${ride.fare}
              </div>
              <div>
                <strong>Booked:</strong>{' '}
                {new Date(ride.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
