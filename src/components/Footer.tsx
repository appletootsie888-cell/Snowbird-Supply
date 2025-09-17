import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">SS</span>
              </div>
              <span className="font-semibold text-gray-900">Snowbird Supply & Sync</span>
            </div>
            <p className="text-gray-600 text-sm">
              Making your seasonal move to Florida seamless and stress-free.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Pre-arrival Shopping</li>
              <li>Home Setup Packages</li>
              <li>Delivery & Pickup</li>
              <li>Seasonal Storage</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Walmart Supercenter Estero</li>
              <li>20351 Grande Oak Shoppes Blvd</li>
              <li>Estero, FL 33928</li>
              <li>(239) 495-7368</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © 2025 Snowbird Supply & Sync. A concept for Walmart Estero.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;