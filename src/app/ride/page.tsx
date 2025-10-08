'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/hooks/api';

interface RideFormData {
    customerName: string;
    pickup: string;
    destination: string;
    vehicleType: 'car' | 'bike' | 'auto' | '';
}

interface RideConfirmation {
    _id: string;
    customerName: string;
    pickup: string;
    destination: string;
    vehicleType: 'car' | 'bike' | 'auto';
    driverName: string;
    fare: number;
    estimatedArrival: string;
    status: string;
    createdAt: string;
}

export default function RidesPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<RideFormData>({
        customerName: '',
        pickup: '',
        destination: '',
        vehicleType: ''
    });
    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState<RideConfirmation | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/rides', formData);
            setConfirmation(response.data.data);
        } catch (error) {
            console.error('Error booking ride:', error);
            alert('Failed to book ride. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatArrivalTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMinutes = Math.round((date.getTime() - now.getTime()) / 60000);
        return `${diffMinutes} minutes`;
    };

    if (confirmation) {
        return (
            <div style={{
                padding: '40px 20px',
                maxWidth: '500px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚗</div>
                    <h1 style={{
                        margin: '0 0 16px 0',
                        fontSize: '32px',
                        color: '#28a745'
                    }}>
                        Ride Confirmed!
                    </h1>

                    <div style={{
                        textAlign: 'left',
                        backgroundColor: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '8px',
                        margin: '20px 0'
                    }}>
                        <h3 style={{ margin: '0 0 16px 0', textAlign: 'center' }}>Ride Details</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 'bold' }}>Driver:</span>
                            <span>{confirmation.driverName}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 'bold' }}>Vehicle:</span>
                            <span>
                                {confirmation.vehicleType === 'car' && '🚗 Car'}
                                {confirmation.vehicleType === 'bike' && '🏍️ Bike'}
                                {confirmation.vehicleType === 'auto' && '🛺 Auto'}
                            </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 'bold' }}>Pickup:</span>
                            <span>{confirmation.pickup}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 'bold' }}>Destination:</span>
                            <span>{confirmation.destination}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 'bold' }}>Estimated Fare:</span>
                            <span style={{ color: '#ff6b00', fontWeight: 'bold', fontSize: '18px' }}>
                                ${confirmation.fare}
                            </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 'bold' }}>Arrival Time:</span>
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                                {formatArrivalTime(confirmation.estimatedArrival)}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button
                            onClick={() => setConfirmation(null)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Book Another Ride
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: '#ff6b00',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            padding: '40px 20px',
            maxWidth: '500px',
            margin: '0 auto'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    margin: '0 0 30px 0',
                    fontSize: '32px',
                    color: '#333'
                }}>
                    🚗 Book a Ride
                </h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '16px'
                            }}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Pickup Location
                        </label>
                        <input
                            type="text"
                            name="pickup"
                            value={formData.pickup}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '16px'
                            }}
                            placeholder="Enter pickup address"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Destination
                        </label>
                        <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '16px'
                            }}
                            placeholder="Enter destination address"
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Vehicle Type
                        </label>
                        <select
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '16px',
                                backgroundColor: 'white'
                            }}
                        >
                            <option value="">Select vehicle type</option>
                            <option value="car">🚗 Car (Comfortable 4-seater)</option>
                            <option value="bike">🏍️ Bike (Fast & Economical)</option>
                            <option value="auto">🛺 Auto (Traditional 3-wheeler)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '15px',
                            backgroundColor: loading ? '#ccc' : '#ff6b00',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {loading ? 'Booking Ride...' : 'Book Ride'}
                    </button>
                </form>

                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>💰 Fare Estimates</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '14px' }}>
                        <div>🚗 Car: $8-25</div>
                        <div>🏍️ Bike: $3-12</div>
                        <div>🛺 Auto: $5-15</div>
                    </div>
                </div>
            </div>
        </div>
    );
}