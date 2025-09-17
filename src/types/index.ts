export interface User {
  id: string;
  email: string;
  isReturningSnowbird?: boolean;
}

export interface ArrivalPlan {
  id?: string;
  userId: string;
  arrivalDate: string;
  departureDate: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt?: string;
}

export interface PackageItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  items: PackageItem[];
  category: 'essentials' | 'beach' | 'groceries' | 'pharmacy';
  icon: string;
}

export interface CartItem {
  packageId: string;
  package: Package;
  quantity: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  date: string;
}

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  deliveryMethod: 'pickup' | 'delivery';
  timeSlot: TimeSlot;
  total: number;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt?: string;
}