'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/hooks/api';

interface OrderData {
    orderId: string;
    orderNumber: string;
    estimatedDelivery: string;
    totalAmount: number;
}

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId) {
                try {
                    const response = await api.get(`/orders/${orderId}`);
                    setOrder(response.data.data);
                } catch (error) {
                    console.error('Error fetching order:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-lg text-gray-600">
                Loading order details...
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex justify-center items-center h-64 text-lg text-red-500">
                Order not found.
            </div>
        );
    }

    return (
        <div className="px-5 py-10 max-w-2xl mx-auto text-center">
            <div className="bg-white p-10 rounded-xl shadow-lg">
                <div className="text-6xl mb-5">✅</div>
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Order Confirmed!
                </h1>

                <div className="text-left bg-gray-50 p-5 rounded-lg my-5">
                    <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-bold">{order.orderId}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Estimated Delivery:</span>
                        <span className="text-orange-500 font-bold">
                            {new Date(order.estimatedDelivery).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-bold text-lg">
                            ${order.totalAmount.toFixed(2)}
                        </span>
                    </div>
                </div>

                <p className="text-gray-600 mb-8">
                    Thank you for your order! Your food is being prepared and will be delivered to you soon.
                </p>

                <button
                    onClick={() => window.location.href = '/food'}
                    className="px-6 py-3 bg-orange-500 text-white border-none rounded-lg cursor-pointer text-lg font-bold hover:bg-orange-600 transition-colors"
                >
                    Order Again
                </button>
            </div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-64 text-lg text-gray-600">
                Loading...
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
}