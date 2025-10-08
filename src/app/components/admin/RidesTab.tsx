import { Ride } from './types';

interface RidesTabProps {
  rides: Ride[];
  loading: boolean;
}

export default function RidesTab({ rides, loading }: RidesTabProps) {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading rides...</div>;
  }

  return (
    <div>
      <h2>🚗 All Rides</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {rides.map(ride => (
          <div key={ride._id} style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ margin: 0 }}>{ride.customerName}</h4>
              <span style={{
                padding: '2px 8px',
                backgroundColor: ride.status === 'completed' ? '#28a745' : '#ffc107',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {ride.status}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
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
                <strong>Booked:</strong> {new Date(ride.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}