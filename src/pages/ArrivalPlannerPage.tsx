import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrivalPlan } from '../types';
import toast from 'react-hot-toast'; // Import toast
import SkeletonLoader from '../components/SkeletonLoader'; // Import SkeletonLoader

const ArrivalPlannerPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    arrivalDate: '',
    departureDate: '',
    address: '',
    city: 'Estero',
    state: 'FL',
    zipCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.arrivalPlan) {
      setFormData({
        arrivalDate: user.arrivalPlan.arrivalDate,
        departureDate: user.arrivalPlan.departureDate,
        address: user.arrivalPlan.address,
        city: user.arrivalPlan.city,
        state: user.arrivalPlan.state,
        zipCode: user.arrivalPlan.zipCode
      });
    }
  }, [user?.arrivalPlan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to save an arrival plan.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const arrivalPlan: Omit<ArrivalPlan, 'id' | 'createdAt'> = {
        userId: user.id,
        arrivalDate: formData.arrivalDate,
        departureDate: formData.departureDate,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      };

      const { error: upsertError } = await supabase
        .from('arrival_plans')
        .upsert({
          user_id: arrivalPlan.userId,
          arrival_date: arrivalPlan.arrivalDate,
          departure_date: arrivalPlan.departureDate,
          address: arrivalPlan.address,
          city: arrivalPlan.city,
          state: arrivalPlan.state,
          zip_code: arrivalPlan.zipCode
        }, { onConflict: 'user_id' }); // Use onConflict to update if plan already exists

      if (upsertError) {
        throw upsertError;
      }
      toast.success('Arrival plan saved successfully!');
      navigate('/packages');
    } catch (err: any) {
      console.error('Error saving arrival plan:', err);
      setError(err.message || 'An unexpected error occurred while saving your plan.');
      toast.error(err.message || 'Failed to save arrival plan.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.arrivalDate && formData.departureDate && 
                     formData.address && formData.zipCode;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Plan Your Arrival
            </h1>
            <p className="text-gray-600">
              Tell us when you're coming and where you'll be staying so we can prepare everything perfectly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Arrival Date
                </label>
                <input
                  type="date"
                  id="arrivalDate"
                  name="arrivalDate"
                  required
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date
                </label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  required
                  value={formData.departureDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Paradise Lane"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="33928"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="hidden">
              <input type="text" name="state" value={formData.state} readOnly />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Browse our curated seasonal packages</li>
                <li>• Schedule pickup or delivery</li>
                <li>• We'll have everything ready when you arrive</li>
              </ul>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg z-50 lg:static lg:p-0 lg:bg-transparent lg:shadow-none lg:z-auto">
              {loading ? (
                <SkeletonLoader type="text" className="w-full h-12" />
              ) : (
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Continue to Packages</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArrivalPlannerPage;
