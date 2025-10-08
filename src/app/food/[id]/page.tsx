'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/hooks/api';
import Image from 'next/image';

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  image: string;
  deliveryTime: string;
  rating: number;
  address: string;
  isOpen: boolean;
  createdAt: string;
}

interface MenuItem {
  _id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.id as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantResponse, menuResponse] = await Promise.all([
          api.get(`/restaurants/${restaurantId}`),
          api.get(`/restaurants/${restaurantId}/menu`)
        ]);
        
        setRestaurant(restaurantResponse.data.data);
        setMenu(menuResponse.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchData();
    }
  }, [restaurantId]);

  const addToCart = (menuItem: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === menuItem._id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...menuItem, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item._id !== itemId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

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
        Loading restaurant...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px',
        color: 'red'
      }}>
        Restaurant not found.
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Restaurant Header */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Image 
          src={restaurant.image} 
          alt={restaurant.name}
          width={200}
          height={150}
          style={{
            borderRadius: '8px',
            objectFit: 'cover'
          }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', color: '#333' }}>
            {restaurant.name}
          </h1>
          <p style={{ margin: '4px 0', color: '#666', fontSize: '16px' }}>
            {restaurant.cuisine}
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
            <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>
              ⭐ {restaurant.rating}
            </span>
            <span style={{ color: '#666' }}>
              🕒 {restaurant.deliveryTime}
            </span>
            <span style={{ color: '#666' }}>
              📍 {restaurant.address}
            </span>
          </div>
        </div>
        
        {/* Cart Summary */}
        <div style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          minWidth: '200px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Items: {getTotalItems()}</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            disabled={cart.length === 0}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: cart.length === 0 ? '#ccc' : '#ff6b00',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {menu.map(item => (
          <div
            key={item._id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '16px',
              backgroundColor: 'white',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Image 
              src={item.image} 
              alt={item.name}
              width={280}
              height={140}
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '12px'
              }}
            />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>
              {item.name}
            </h3>
            <p style={{ 
              margin: '0 0 8px 0', 
              color: '#666', 
              fontSize: '14px',
              minHeight: '40px'
            }}>
              {item.description}
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}>
              <span style={{ 
                color: '#ff6b00', 
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                ${item.price.toFixed(2)}
              </span>
              <button
                onClick={() => addToCart(item)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ff6b00',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          restaurant={restaurant}
          onClose={() => setShowCheckout(false)}
          onQuantityChange={updateQuantity}
          onRemoveItem={removeFromCart}
          onOrderPlaced={(orderData) => {
            router.push(`/order-confirmation?orderId=${orderData.orderId}`);
          }}
        />
      )}
    </div>
  );
}

// Checkout Modal Component
function CheckoutModal({ 
  cart, 
  restaurant, 
  onClose, 
  onQuantityChange, 
  onRemoveItem,
  onOrderPlaced 
}: {
  cart: CartItem[];
  restaurant: Restaurant;
  onClose: () => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onOrderPlaced: (orderData: any) => void;
}) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [placingOrder, setPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone) {
      alert('Please fill in all customer information');
      return;
    }

    setPlacingOrder(true);
    try {
      const orderData = {
        restaurantId: restaurant._id,
        items: cart,
        customerName: customerInfo.name,
        customerAddress: customerInfo.address,
        customerPhone: customerInfo.phone,
        totalAmount: getCartTotal()
      };

      const response = await api.post('/orders', orderData);
      onOrderPlaced(response.data.data);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{ margin: '0 0 20px 0' }}>Checkout</h2>
        
        {/* Order Summary */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item._id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #eee'
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  ${item.price.toFixed(2)} × 
                  <button 
                    onClick={() => onQuantityChange(item._id, item.quantity - 1)}
                    style={{ margin: '0 8px', padding: '2px 8px' }}
                  >-</button>
                  {item.quantity}
                  <button 
                    onClick={() => onQuantityChange(item._id, item.quantity + 1)}
                    style={{ margin: '0 8px', padding: '2px 8px' }}
                  >+</button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  onClick={() => onRemoveItem(item._id)}
                  style={{ 
                    color: 'red', 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer' 
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '16px',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Information */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Customer Information</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          />
          <input
            type="text"
            placeholder="Delivery Address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
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
            Cancel
          </button>
          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: placingOrder ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: placingOrder ? 'not-allowed' : 'pointer'
            }}
          >
            {placingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}