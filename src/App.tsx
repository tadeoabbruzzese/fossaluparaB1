import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PricingProvider } from './contexts/PricingContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ValetParkingPopup from './components/home/ValetParkingPopup';

// Pages
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminReviewsPage from './pages/AdminReviewsPage';
import AdminPricingPage from './pages/AdminPricingPage';
import AdminGalleryPage from './pages/AdminGalleryPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ParkingInfoPage from './pages/ParkingInfoPage';
import HikingTrailsPage from './pages/HikingTrailsPage';
import LocalAttractionsPage from './pages/LocalAttractionsPage';
import TouristEventsPage from './pages/TouristEventsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [showValetPopup, setShowValetPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowValetPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <PricingProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="/parking-info" element={<ParkingInfoPage />} />
            <Route path="/hiking-trails" element={<HikingTrailsPage />} />
            <Route path="/local-attractions" element={<LocalAttractionsPage />} />
            <Route path="/tourist-events" element={<TouristEventsPage />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviewsPage /></ProtectedRoute>} />
            <Route path="/admin/pricing" element={<ProtectedRoute><AdminPricingPage /></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute><AdminGalleryPage /></ProtectedRoute>} />
            
            {/* Redirect /admin to /admin/dashboard if logged in */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {showValetPopup && <ValetParkingPopup onClose={() => setShowValetPopup(false)} />}
        </PricingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;