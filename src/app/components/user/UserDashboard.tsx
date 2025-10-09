'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { useRouter } from 'next/navigation';

interface Order {
    id: string;
    userId: string;
    restaurantName: string;
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
    createdAt: Timestamp;
    items?: OrderItem[];
}

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Ride {
    id: string;
    userId: string;
    pickup: string;
    destination: string;
    fare: number;
    status: 'requested' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
    createdAt: Timestamp;
    driverName?: string;
    vehicleType?: string;
}

interface User {
    uid: string;
    name: string;
    email: string;
    createdAt?: string;
}

export default function UserDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [rides, setRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) fetchUserData();
    }, [user]);

    const fetchUserData = async () => {
        try {
            const ordersQuery = query(
                collection(db, 'orders'),
                where('userId', '==', user?.uid),
                orderBy('createdAt', 'desc'),
                limit(5)
            );
            const ordersSnapshot = await getDocs(ordersQuery);
            const ordersData: Order[] = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
            setOrders(ordersData);

            const ridesQuery = query(
                collection(db, 'rides'),
                where('userId', '==', user?.uid),
                orderBy('createdAt', 'desc'),
                limit(5)
            );
            const ridesSnapshot = await getDocs(ridesQuery);
            const ridesData: Ride[] = ridesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ride));
            setRides(ridesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string, type: 'order' | 'ride') => {
        const statusColors = {
            order: {
                pending: 'bg-yellow-100 text-yellow-800',
                confirmed: 'bg-blue-100 text-blue-800',
                preparing: 'bg-orange-100 text-orange-800',
                'out-for-delivery': 'bg-purple-100 text-purple-800',
                delivered: 'bg-green-100 text-green-800',
                cancelled: 'bg-red-100 text-red-800'
            },
            ride: {
                requested: 'bg-yellow-100 text-yellow-800',
                accepted: 'bg-blue-100 text-blue-800',
                'in-progress': 'bg-orange-100 text-orange-800',
                completed: 'bg-green-100 text-green-800',
                cancelled: 'bg-red-100 text-red-800'
            }
        };
        const statusMap = type === 'order' ? statusColors.order : statusColors.ride;
        return statusMap[status as keyof typeof statusMap] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex">
                <div className="w-64 bg-white p-6 shadow-md">Loading...</div>
                <div className="flex-1 animate-pulse p-8">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-orange-500">RideBite</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-orange-100 transition-colors"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => router.push('/food')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-orange-100 transition-colors"
                    >
                        Food
                    </button>
                    <button
                        onClick={() => router.push('/ride')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-orange-100 transition-colors"
                    >
                        Make a Ride
                    </button>
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={() => { logout(); router.push('/login'); }}
                        className="w-full px-3 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user?.name}!</h1>
                <p className="text-gray-600 mb-8">Here is your activity</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
                        <p className="text-3xl font-bold text-orange-500 mt-2">{orders.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">Rides Taken</h3>
                        <p className="text-3xl font-bold text-blue-500 mt-2">{rides.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">Member Since</h3>
                        <p className="text-xl font-bold text-green-500 mt-2">
                            {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
                        </p>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-600">No orders yet</p>
                    ) : (
                        <div className="space-y-3">
                            {orders.map((order: Order) => (
                                <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="font-medium text-gray-800">{order.restaurantName}</p>
                                        <p className="text-sm text-gray-600">${order.total.toFixed(2)}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded capitalize ${getStatusColor(order.status, 'order')}`}>
                                        {order.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Rides */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Rides</h2>
                    {rides.length === 0 ? (
                        <p className="text-gray-600">No rides yet</p>
                    ) : (
                        <div className="space-y-3">
                            {rides.map((ride: Ride) => (
                                <div key={ride.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="font-medium text-gray-800">{ride.pickup} → {ride.destination}</p>
                                        <p className="text-sm text-gray-600">${ride.fare.toFixed(2)}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded capitalize ${getStatusColor(ride.status, 'ride')}`}>
                                        {ride.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
