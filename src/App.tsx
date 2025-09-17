import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import ArrivalPlannerPage from './pages/ArrivalPlannerPage';
import PackagesPage from './pages/PackagesPage';
import SchedulerPage from './pages/SchedulerPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import ProgressStepper from './components/ProgressStepper'; // New import
import SkeletonLoader from './components/SkeletonLoader'; // New import
import { AnimatePresence, motion } from 'framer-motion'; // New import
import { Toaster } from 'react-hot-toast'; // New import

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          {/* Replaced spinner with SkeletonLoader */}
          <SkeletonLoader type="avatar" className="mx-auto mb-4" />
          <SkeletonLoader type="text" className="w-32 mx-auto" />
        </div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation(); // For Framer Motion page transitions

  // Define paths where the ProgressStepper should be visible
  const showStepperPaths = ['/planner', '/packages', '/scheduler', '/checkout', '/success'];
  const shouldShowStepper = user && showStepperPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans"> {/* Added font-sans */}
      <Toaster position="top-right" reverseOrder={false} /> {/* Toaster component */}
      {user && <Navbar />}
      {shouldShowStepper && <ProgressStepper />} {/* Render ProgressStepper */}
      <main className="flex-1">
        <AnimatePresence mode="wait"> {/* Framer Motion AnimatePresence */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full" // Ensure motion.div takes full height for proper layout
          >
            <Routes location={location}> {/* Pass location to Routes for AnimatePresence */}
              <Route path="/login" element={user ? <Navigate to="/planner" /> : <LoginPage />} />
              <Route 
                path="/planner" 
                element={
                  <ProtectedRoute>
                    <ArrivalPlannerPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/packages" 
                element={
                  <ProtectedRoute>
                    <PackagesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/scheduler" 
                element={
                  <ProtectedRoute>
                    <SchedulerPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/success" 
                element={
                  <ProtectedRoute>
                    <SuccessPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {user && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
