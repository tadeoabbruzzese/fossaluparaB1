import React from 'react';
import { LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const getNavigationClass = (path: string) => {
    return location.pathname === path
      ? 'bg-primary-100 text-primary-500 dark:bg-primary-800 dark:text-white'
      : 'text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800';
  };

  return (
    <header className="bg-white dark:bg-primary-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/admin" className="flex items-center">
              <span className="text-xl font-heading font-semibold text-primary-500 dark:text-white">
                Admin Dashboard
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <nav className="hidden md:flex items-center space-x-2 mr-4">
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium ${getNavigationClass('/admin')}`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/reviews"
                className={`px-3 py-2 rounded-md text-sm font-medium ${getNavigationClass('/admin/reviews')}`}
              >
                Reviews
              </Link>
              <Link
                to="/admin/pricing"
                className={`px-3 py-2 rounded-md text-sm font-medium ${getNavigationClass('/admin/pricing')}`}
              >
                Pricing
              </Link>
              <Link
                to="/admin/gallery"
                className={`px-3 py-2 rounded-md text-sm font-medium ${getNavigationClass('/admin/gallery')}`}
              >
                Gallery
              </Link>
            </nav>

            <Button
              variant="outline"
              size="sm"
              icon={<LogOut size={16} />}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 dark:border-primary-800">
        <div className="grid grid-cols-4 divide-x divide-gray-200 dark:divide-primary-800">
          <Link
            to="/admin"
            className={`text-center py-3 text-xs font-medium ${
              location.pathname === '/admin'
                ? 'bg-primary-50 text-primary-500 dark:bg-primary-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/reviews"
            className={`text-center py-3 text-xs font-medium ${
              location.pathname === '/admin/reviews'
                ? 'bg-primary-50 text-primary-500 dark:bg-primary-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Reviews
          </Link>
          <Link
            to="/admin/pricing"
            className={`text-center py-3 text-xs font-medium ${
              location.pathname === '/admin/pricing'
                ? 'bg-primary-50 text-primary-500 dark:bg-primary-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/admin/gallery"
            className={`text-center py-3 text-xs font-medium ${
              location.pathname === '/admin/gallery'
                ? 'bg-primary-50 text-primary-500 dark:bg-primary-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Gallery
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;