import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Get user initials for avatar
  const userInitials = user?.email ? user.email.charAt(0).toUpperCase() : '';
  const userName = user?.email ? user.email.split('@')[0] : 'Guest';

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* Placeholder Logo */}
              <img src="/vite.svg" alt="Snowbird Supply & Sync Logo" className="h-8 w-8" />
              <span className="font-bold text-xl text-gray-900">
                Snowbird Supply & Sync
              </span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/packages"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/packages')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Packages
              </Link>

              <Link
                to="/scheduler"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/scheduler')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Schedule
              </Link>

              <Link to="/checkout" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              <div className="flex items-center space-x-2">
                {/* User Avatar/Initials Bubble */}
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                  {userInitials}
                </div>
                <span className="text-sm text-gray-700 hidden sm:inline">{userName}</span>
                <button
                  onClick={logout}
                  className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
