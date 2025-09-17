import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const deliveryFee = 9.99; // Mock delivery fee
  const tax = total * 0.07; // 7% tax
  const finalTotal = total + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    if (!user || items.length === 0) return;

    setLoading(true);
    
    try {
      // Mock order creation - in real app, this would save to Supabase
      const mockOrder = {
        userId: user.id,
        items: items,
        deliveryMethod: 'pickup' as const,
        timeSlot: {
          id: 'mock-slot',
          time: '10:00 AM - 11:00 AM',
          available: true,
          date: '2025-01-28'
        },
        total: finalTotal,
        status: 'confirmed' as const
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart and navigate to success
      clearCart();
      navigate('/success', { 
        state: { orderId: 'ORD-' + Date.now().toString().slice(-6) }
      });
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some packages to get started.</p>
          <button
            onClick={() => navigate('/packages')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Browse Packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Review your order before confirming</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Items</h2>
            
            {items.map(item => (
              <div key={item.packageId} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{item.package.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.package.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.package.description}</p>
                      <p className="text-lg font-bold text-blue-600">${item.package.price}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.packageId)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(item.packageId, item.quantity - 1)}
                      className="w-8 h-8 bg-white hover:bg-gray-100 rounded-md flex items-center justify-center transition-colors"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.packageId, item.quantity + 1)}
                      className="w-8 h-8 bg-white hover:bg-gray-100 rounded-md flex items-center justify-center transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.package.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Pickup Details</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Date:</strong> Tomorrow</p>
                    <p><strong>Time:</strong> 10:00 AM - 11:00 AM</p>
                    <p><strong>Location:</strong> Walmart Estero</p>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>
                    {loading ? 'Processing...' : 'Confirm My Arrival Order'}
                  </span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  This is a demo - no payment will be processed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;