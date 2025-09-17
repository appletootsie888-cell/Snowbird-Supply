import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Phone, ArrowRight } from 'lucide-react';
import Confetti from 'react-confetti'; // Import Confetti
import { useWindowSize } from 'react-use'; // Optional: for dynamic confetti size

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || 'ORD-123456';
  const { width, height } = useWindowSize(); // For confetti dimensions

  const handleStartOver = () => {
    navigate('/packages');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Confetti
        width={width}
        height={height}
        recycle={false} // Confetti runs once
        numberOfPieces={200}
        tweenDuration={5000}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Your seasonal arrival order has been successfully placed.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 inline-block">
            <p className="text-blue-900">
              <strong>Order ID:</strong> <span className="font-mono">{orderId}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pickup Time</h3>
              <p className="text-sm text-gray-600">Tomorrow</p>
              <p className="text-sm font-medium text-gray-900">10:00 AM - 11:00 AM</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pickup Location</h3>
              <p className="text-sm text-gray-600">Walmart Supercenter</p>
              <p className="text-sm font-medium text-gray-900">Estero, FL</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
              <p className="text-sm text-gray-600">Questions?</p>
              <p className="text-sm font-medium text-gray-900">(239) 495-7368</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-green-900 mb-3">What's Next?</h3>
            <ul className="text-left text-sm text-green-800 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>We'll prepare your packages and have them ready for pickup</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>You'll receive a text notification when your order is ready</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Drive to the Online Grocery Pickup area at the store</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Our team will load everything into your vehicle</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleStartOver}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Browse More Packages</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <p className="text-sm text-gray-500">
              Thank you for choosing Snowbird Supply & Sync for your seasonal needs!
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Welcome to Florida! 🌴</h2>
            <p className="text-blue-100">
              This demo showcases how Walmart could revolutionize the snowbird experience 
              with pre-arrival shopping and seamless pickup services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
