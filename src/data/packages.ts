import { Package } from '../types';

export const seasonalPackages: Package[] = [
  {
    id: 'home-essentials',
    name: 'Home Essentials Package',
    description: 'Everything you need to settle into your seasonal home',
    price: 89.99,
    category: 'essentials',
    icon: '🏠',
    items: [
      { id: '1', name: 'Bed Sheets Set (Queen)', quantity: 1, price: 24.99 },
      { id: '2', name: 'Towel Set (4 pieces)', quantity: 1, price: 19.99 },
      { id: '3', name: 'Basic Cookware Set', quantity: 1, price: 34.99 },
      { id: '4', name: 'Cleaning Supplies Kit', quantity: 1, price: 15.99 }
    ]
  },
  {
    id: 'beach-kit',
    name: 'Beach Essentials Kit',
    description: 'Perfect for enjoying Florida beaches and sunshine',
    price: 64.99,
    category: 'beach',
    icon: '🏖️',
    items: [
      { id: '5', name: 'Beach Umbrella', quantity: 1, price: 29.99 },
      { id: '6', name: 'Beach Chairs (Set of 2)', quantity: 1, price: 39.99 },
      { id: '7', name: 'Cooler Bag', quantity: 1, price: 19.99 },
      { id: '8', name: 'Beach Towels (Set of 2)', quantity: 1, price: 14.99 }
    ]
  },
  {
    id: 'grocery-starter',
    name: 'Grocery Starter Pack',
    description: 'Essential groceries to stock your kitchen on arrival',
    price: 124.99,
    category: 'groceries',
    icon: '🛒',
    items: [
      { id: '9', name: 'Fresh Produce Bundle', quantity: 1, price: 24.99 },
      { id: '10', name: 'Pantry Staples Kit', quantity: 1, price: 34.99 },
      { id: '11', name: 'Dairy & Eggs Pack', quantity: 1, price: 18.99 },
      { id: '12', name: 'Frozen Essentials', quantity: 1, price: 22.99 },
      { id: '13', name: 'Beverages Bundle', quantity: 1, price: 19.99 }
    ]
  },
  {
    id: 'pharmacy-basics',
    name: 'Pharmacy Basics',
    description: 'Essential health and wellness items for your stay',
    price: 45.99,
    category: 'pharmacy',
    icon: '💊',
    items: [
      { id: '14', name: 'First Aid Kit', quantity: 1, price: 12.99 },
      { id: '15', name: 'Sunscreen SPF 50', quantity: 2, price: 8.99 },
      { id: '16', name: 'Vitamins & Supplements', quantity: 1, price: 19.99 },
      { id: '17', name: 'Personal Care Bundle', quantity: 1, price: 15.99 }
    ]
  },
  {
    id: 'comfort-plus',
    name: 'Comfort Plus Package',
    description: 'Upgraded comfort items for longer stays',
    price: 149.99,
    category: 'essentials',
    icon: '✨',
    items: [
      { id: '18', name: 'Premium Bedding Set', quantity: 1, price: 49.99 },
      { id: '19', name: 'Air Purifier', quantity: 1, price: 39.99 },
      { id: '20', name: 'Coffee Maker & Supplies', quantity: 1, price: 29.99 },
      { id: '21', name: 'Luxury Bath Set', quantity: 1, price: 34.99 }
    ]
  }
];