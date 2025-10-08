'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/hooks/api';

interface OrderData {
    orderId: string;
    orderNumber: string;
    estimatedDelivery: string;
    totalAmount: number;
}

export default function OrderConfirmationPage() {
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
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                fontSize: '18px',
                color: '#666'
            }}>
                Loading order details...
            </div>
        );
    }

    if (!order) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                fontSize: '18px',
                color: 'red'
            }}>
                Order not found.
            </div>
        );
    }

    return (
        <div style={{
            padding: '40px 20px',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
                <h1 style={{
                    margin: '0 0 16px 0',
                    fontSize: '32px',
                    color: '#28a745'
                }}>
                    Order Confirmed!
                </h1>

                <div style={{
                    textAlign: 'left',
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '8px',
                    margin: '20px 0'
                }}>
                    <h3 style={{ margin: '0 0 16px 0' }}>Order Details</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Order ID:</span>
                        <span style={{ fontWeight: 'bold' }}>{order.orderId}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Estimated Delivery:</span>
                        <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>
                            {new Date(order.estimatedDelivery).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Total Amount:</span>
                        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            ${order.totalAmount.toFixed(2)}
                        </span>
                    </div>
                </div>

                <p style={{ color: '#666', marginBottom: '30px' }}>
                    Thank you for your order! Your food is being prepared and will be delivered to you soon.
                </p>

                <button
                    onClick={() => window.location.href = '/food'}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#ff6b00',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    Order Again
                </button>
            </div>
        </div>
    );
}