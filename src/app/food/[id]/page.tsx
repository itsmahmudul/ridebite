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

interface OrderData {
  orderId: string;
  _id: string;
  restaurantId: string;
  items: CartItem[];
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  totalAmount: number;
  status: string;
  createdAt: string;
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
      } catch (error) {
        console.error('Error fetching data:', error);
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
      <div className="flex justify-center items-center h-50vh text-lg text-gray-600">
        Loading restaurant...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center h-50vh text-lg text-red-500">
        Restaurant not found.
      </div>
    );
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      {/* Restaurant Header */}
      <div className="flex gap-5 mb-8 p-5 bg-white rounded-xl shadow-md">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          width={200}
          height={150}
          className="rounded-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="m-0 mb-2 text-2xl font-bold text-gray-800">
            {restaurant.name}
          </h1>
          <p className="my-1 text-gray-600 text-base">
            {restaurant.cuisine}
          </p>
          <div className="flex gap-5 mt-3">
            <span className="text-orange-500 font-bold">
              ⭐ {restaurant.rating}
            </span>
            <span className="text-gray-600">
              🕒 {restaurant.deliveryTime}
            </span>
            <span className="text-gray-600">
              📍 {restaurant.address}
            </span>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="p-4 bg-gray-50 rounded-lg min-w-48">
          <div className="flex justify-between mb-2">
            <span>Items: {getTotalItems()}</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            disabled={cart.length === 0}
            className={`w-full py-3 px-4 text-white border-none rounded-lg cursor-pointer text-base font-bold ${cart.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600'
              }`}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {menu.map(item => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-xl p-4 bg-white transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={280}
              height={140}
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <h3 className="m-0 mb-2 text-lg font-semibold text-gray-800">
              {item.name}
            </h3>
            <p className="m-0 mb-2 text-gray-600 text-sm min-h-10">
              {item.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-orange-500 font-bold text-lg">
                ${item.price.toFixed(2)}
              </span>
              <button
                onClick={() => addToCart(item)}
                className="py-2 px-4 bg-orange-500 text-white border-none rounded-lg cursor-pointer text-sm hover:bg-orange-600"
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
          onOrderPlaced={(orderData: OrderData) => {
            router.push(`/order-confirmation?orderId=${orderData.orderId || orderData._id}`);
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
  onOrderPlaced: (orderData: OrderData) => void;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-11/12 max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="m-0 mb-5 text-xl font-bold">Checkout</h2>

        {/* Order Summary */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
          {cart.map(item => (
            <div key={item._id} className="flex justify-between items-center py-2 border-b border-gray-200">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-600">
                  ${item.price.toFixed(2)} ×
                  <button
                    onClick={() => onQuantityChange(item._id, item.quantity - 1)}
                    className="mx-2 py-0.5 px-2 bg-gray-200 rounded hover:bg-gray-300"
                  >-</button>
                  {item.quantity}
                  <button
                    onClick={() => onQuantityChange(item._id, item.quantity + 1)}
                    className="mx-2 py-0.5 px-2 bg-gray-200 rounded hover:bg-gray-300"
                  >+</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => onRemoveItem(item._id)}
                  className="text-red-500 border-none bg-transparent cursor-pointer hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Delivery Address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
            className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-600 text-white border-none rounded-lg cursor-pointer hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            className={`flex-1 py-3 px-4 text-white border-none rounded-lg ${placingOrder
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 cursor-pointer'
              }`}
          >
            {placingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}