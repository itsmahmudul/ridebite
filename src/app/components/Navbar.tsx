"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProtectedRideClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      router.push("/login?redirect=/ride");
    }
  };

  const getDashboardLink = () => (user?.role === "admin" ? "/admin" : "/dashboard");
  const getDashboardLabel = () => (user?.role === "admin" ? "Admin Dashboard" : "My Dashboard");

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">

      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-lg group-hover:bg-orange-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="text-white">
              <path
                d="M8 12l8-8 8 8M4 20h24M8 20v8h16v-8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
            RideBite
          </span>
        </Link>

        {/* Desktop Navigation */}
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
            onClick={handleProtectedRideClick}
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

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {user ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaUserCircle className="text-3xl text-gray-600 hover:text-orange-500 transition-colors" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden z-50"
                  >
                    <Link
                      href={getDashboardLink()}
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      {getDashboardLabel()}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-all ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
            />
          </div>
        </button>
      </div>
    </nav>
  );
}
