"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Determine which dashboard to show based on user role
  const getDashboardLink = () => {
    if (user?.role === 'admin') {
      return '/admin';
    } else {
      return '/dashboard'; // Regular user dashboard
    }
  };

  const getDashboardLabel = () => {
    if (user?.role === 'admin') {
      return 'Admin Dashboard';
    } else {
      return 'My Dashboard';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 group"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-lg group-hover:bg-orange-600 transition-colors">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 32 32" 
              fill="none" 
              className="text-white"
            >
              <path 
                d="M8 12l8-8 8 8M4 20h24M8 20v8h16v-8" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
              <circle cx="10" cy="26" r="2" fill="currentColor"/>
              <circle cx="22" cy="26" r="2" fill="currentColor"/>
              <path d="M12 16h8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
            RideBite
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/food" 
            className="font-medium text-gray-600 hover:text-orange-500 transition-colors relative group"
          >
            Food
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/ride" 
            className="font-medium text-gray-600 hover:text-orange-500 transition-colors relative group"
          >
            Ride
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/about" 
            className="font-medium text-gray-600 hover:text-orange-500 transition-colors relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/contact" 
            className="font-medium text-gray-600 hover:text-orange-500 transition-colors relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            // Show when user is logged in
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Welcome, {user.name}
                </span>
                {user.role === 'admin' && (
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full font-medium">
                    Admin
                  </span>
                )}
              </div>
              <Link 
                href={getDashboardLink()}
                className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md"
              >
                {getDashboardLabel()}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            // Show when user is not logged in
            <div className="flex items-center space-x-4">
              <Link 
                href="/login"
                className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="px-6 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span 
              className={`block h-0.5 w-6 bg-gray-700 transition-all ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span 
              className={`block h-0.5 w-6 bg-gray-700 transition-all ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span 
              className={`block h-0.5 w-6 bg-gray-700 transition-all ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto py-4 px-6 space-y-4">
            <Link 
              href="/food" 
              className="block py-3 text-gray-700 hover:text-orange-500 font-medium transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Food
            </Link>
            <Link 
              href="/ride" 
              className="block py-3 text-gray-700 hover:text-orange-500 font-medium transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ride
            </Link>
            <Link 
              href="/about" 
              className="block py-3 text-gray-700 hover:text-orange-500 font-medium transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block py-3 text-gray-700 hover:text-orange-500 font-medium transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 space-y-3">
              {user ? (
                // Mobile menu when user is logged in
                <>
                  <div className="text-center py-2 text-sm text-gray-600 border-b border-gray-100">
                    <div className="flex items-center justify-center space-x-2">
                      <span>Welcome, {user.name}</span>
                      {user.role === 'admin' && (
                        <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <Link 
                    href={getDashboardLink()}
                    className="block w-full text-center py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getDashboardLabel()}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Mobile menu when user is not logged in
                <>
                  <Link 
                    href="/login"
                    className="block w-full text-center py-3 text-gray-600 hover:text-orange-500 transition-colors font-medium border border-gray-200 rounded-lg hover:border-orange-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup"
                    className="block w-full text-center py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}