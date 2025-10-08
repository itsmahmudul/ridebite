export interface Restaurant {
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

export interface MenuItem {
  _id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
}

export interface Ride {
  _id: string;
  customerName: string;
  pickup: string;
  destination: string;
  vehicleType: string;
  driverName: string;
  fare: number;
  estimatedArrival: string;
  status: string;
  createdAt: string;
}

export interface Rider {
  _id: string;
  raiderId: string;
  name: string;
  email: string;
  phone: string;
  vehicle: {
    type: string;
    plateNumber: string;
    color: string;
  };
  status: 'available' | 'on-delivery' | 'offline';
  isActive: boolean;
  rating: number;
  totalDeliveries: number;
  joinedDate: string;
  lastActive: string;
}

export type TabType = 'restaurants' | 'menu' | 'rides' | 'riders';