import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Filter } from 'lucide-react';
import { seasonalPackages } from '../data/packages';
import PackageCard from '../components/PackageCard';
import { useCart } from '../context/CartContext';

const PackagesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const categories = [
    { value: 'all', label: 'All Packages' },
    { value: 'essentials', label: 'Home Essentials' },
    { value: 'beach', label: 'Beach & Recreation' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'pharmacy', label: 'Health & Wellness' }
  ];

  const filteredPackages = selectedCategory === 'all' 
    ? seasonalPackages 
    : seasonalPackages.filter(pkg => pkg.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seasonal Packages
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated packages designed specifically for seasonal Florida residents. 
            Each package includes everything you need to settle in comfortably.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {itemCount > 0 && (
            <button
              onClick={() => navigate('/scheduler')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 ease-in-out hover:scale-103 active:scale-97 flex items-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Continue with {itemCount} item{itemCount !== 1 ? 's' : ''}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600">Try selecting a different category or browse all packages.</p>
          </div>
        )}

        {itemCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg z-50 lg:static lg:p-0 lg:bg-transparent lg:shadow-none lg:z-auto">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-200 ease-in-out hover:scale-103 active:scale-97 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>View Cart ({itemCount})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesPage;
