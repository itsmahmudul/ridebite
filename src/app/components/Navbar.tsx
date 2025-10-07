"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-background text-foreground">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-foreground">
          RideBite
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/food" className="hover:text-orange-500 transition">
            Food
          </Link>
          <Link href="/ride" className="hover:text-orange-500 transition">
            Ride
          </Link>
          <Link href="/about" className="hover:text-orange-500 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-orange-500 transition">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-3">
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition">
            Login
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
