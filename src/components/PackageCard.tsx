import React, { useState } from 'react';
import { Package } from '../types';
import { Plus, Minus, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PackageCardProps {
  package: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
  const [expanded, setExpanded] = useState(false);
  const { addItem, items, updateQuantity } = useCart();
  
  const cartItem = items.find(item => item.packageId === pkg.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem(pkg);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(pkg.id, newQuantity);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ease-in-out">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{pkg.icon}</div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{pkg.name}</h3>
              <p className="text-gray-600 text-sm">{pkg.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">${pkg.price}</div>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-4"
        >
          <span className="text-sm font-medium">
            {expanded ? 'Hide' : 'View'} package contents
          </span>
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {expanded && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Package includes:</h4>
            <ul className="space-y-2">
              {pkg.items.map(item => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} {item.quantity > 1 && `(${item.quantity})`}
                  </span>
                  <span className="text-gray-900 font-medium">${item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between">
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 ease-in-out hover:scale-103 active:scale-97 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="flex-1 flex items-center justify-between bg-gray-50 rounded-lg p-2 transition-all duration-200 ease-in-out">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                className="w-10 h-10 bg-white hover:bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-900">{quantity}</span>
                <span className="text-sm text-gray-600">in cart</span>
              </div>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="w-10 h-10 bg-white hover:bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
