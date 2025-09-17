import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Store, Clock, ArrowRight } from 'lucide-react';
import TimeSlotSelector from '../components/TimeSlotSelector';
import { TimeSlot } from '../types';
import { useCart } from '../context/CartContext';

const SchedulerPage = () => {
  const { itemCount, deliveryMethod, selectedTimeSlot, setDeliveryMethod, setSelectedTimeSlot } = useCart();
  const navigate = useNavigate();

  // Mock time slots - in a real app, these would come from an API
  const mockTimeSlots: TimeSlot[] = [
    // Today
    { id: '1', time: '9:00 AM - 10:00 AM', available: true, date: '2025-01-27' },
    { id: '2', time: '10:00 AM - 11:00 AM', available: false, date: '2025-01-27' },
    { id: '3', time: '2:00 PM - 3:00 PM', available: true, date: '2025-01-27' },
    { id: '4', time: '3:00 PM - 4:00 PM', available: true, date: '2025-01-27' },
    
    // Tomorrow
    { id: '5', time: '8:00 AM - 9:00 AM', available: true, date: '2025-01-28' },
    { id: '6', time: '9:00 AM - 10:00 AM', available: true, date: '2025-01-28' },
    { id: '7', time: '11:00 AM - 12:00 PM', available: true, date: '2025-01-28' },
    { id: '8', time: '1:00 PM - 2:00 PM', available: false, date: '2025-01-28' },
    { id: '9', time: '3:00 PM - 4:00 PM', available: true, date: '2025-01-28' },
    
    // Day after tomorrow
    { id: '10', time: '9:00 AM - 10:00 AM', available: true, date: '2025-01-29' },
    { id: '11', time: '10:00 AM - 11:00 AM', available: true, date: '2025-01-29' },
    { id: '12', time: '2:00 PM - 3:00 PM', available: true, date: '2025-01-29' },
  ];

  const handleContinue = () => {
    if (selectedTimeSlot) {
      navigate('/checkout');
    }
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty!</h2>
          <p className="text-gray-600 mb-6">Add some packages first before scheduling your pickup or delivery.</p>
          <button
            onClick={() => navigate('/packages')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 ease-in-out hover:scale-103 active:scale-97"
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Schedule Your Order
            </h1>
            <p className="text-gray-600">
              Choose how you'd like to receive your {itemCount} item{itemCount !== 1 ? 's' : ''}.
            </p>
          </div>

          {/* Delivery Method Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              How would you like to receive your order?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ease-in-out hover:scale-103 active:scale-97 ${
                  deliveryMethod === 'pickup'
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    deliveryMethod === 'pickup' ? 'bg-blue-600' : 'bg-gray-100'
                  }`}>
                    <Store className={`h-6 w-6 ${
                      deliveryMethod === 'pickup' ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Store Pickup</h3>
                    <p className="text-sm text-gray-600">Pick up at Walmart Estero</p>
                    <p className="text-sm font-medium text-green-600">Free</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ease-in-out hover:scale-103 active:scale-97 ${
                  deliveryMethod === 'delivery'
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    deliveryMethod === 'delivery' ? 'bg-blue-600' : 'bg-gray-100'
                  }`}>
                    <Truck className={`h-6 w-6 ${
                      deliveryMethod === 'delivery' ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Home Delivery</h3>
                    <p className="text-sm text-gray-600">Delivered to your address</p>
                    <p className="text-sm font-medium text-blue-600">$9.99</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="mb-8">
            <TimeSlotSelector
              timeSlots={mockTimeSlots}
              selectedSlot={selectedTimeSlot}
              onSlotSelect={setSelectedTimeSlot}
              deliveryMethod={deliveryMethod}
            />
          </div>

          {/* Information Box */}
          {deliveryMethod === 'pickup' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">Pickup Information</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Location:</strong> Walmart Supercenter Estero</p>
                <p><strong>Address:</strong> 20351 Grande Oak Shoppes Blvd, Estero, FL 33928</p>
                <p><strong>Instructions:</strong> Use the Online Grocery Pickup area on the east side of the store</p>
              </div>
            </div>
          )}

          {deliveryMethod === 'delivery' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-green-900 mb-2">Delivery Information</h3>
              <div className="text-sm text-green-800 space-y-1">
                <p><strong>Service area:</strong> Estero and surrounding areas</p>
                <p><strong>Instructions:</strong> Someone 18+ must be present to receive the delivery</p>
                <p><strong>Contact-free:</strong> Available upon request</p>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg z-50 lg:static lg:p-0 lg:bg-transparent lg:shadow-none lg:z-auto">
            <button
              onClick={handleContinue}
              disabled={!selectedTimeSlot}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 ease-in-out hover:scale-103 active:scale-97 flex items-center justify-center space-x-2"
            >
              <span>Continue to Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerPage;
