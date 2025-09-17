import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'; // Import toast

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isReturningSnowbird, setIsReturningSnowbird] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = isLogin 
        ? await login(email, password)
        : await register(email, password, isReturningSnowbird);

      if (error) {
        setError(error.message);
        toast.error(error.message); // Show error toast
      } else {
        toast.success(isLogin ? 'Signed in successfully!' : 'Account created!'); // Show success toast
        navigate('/planner');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred'); // Show unexpected error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            {/* Placeholder Logo */}
            <img src="/vite.svg" alt="Snowbird Supply & Sync Logo" className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Snowbird Supply</h1>
              <p className="text-blue-600 font-medium">& Sync</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome back!' : 'Get started'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin 
              ? 'Sign in to manage your seasonal arrival'
              : 'Create your account to plan your Florida season'
            }
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div className="flex items-center">
                <input
                  id="returning-snowbird"
                  name="returning-snowbird"
                  type="checkbox"
                  checked={isReturningSnowbird}
                  onChange={(e) => setIsReturningSnowbird(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="returning-snowbird" className="ml-2 block text-sm text-gray-900">
                  I'm a returning snowbird to the area
                </label>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              {isLogin 
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>This is a concept demo for Walmart Estero</p>
          <p>Use any email and password (min 6 characters) to test</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
