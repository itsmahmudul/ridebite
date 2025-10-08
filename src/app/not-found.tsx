'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Animated 404 Number */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        duration: 1
                    }}
                    className="mb-8"
                >
                    <h1 className="text-9xl font-bold text-gray-800">
                        4
                        <motion.span
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="inline-block text-blue-600"
                        >
                            0
                        </motion.span>
                        4
                    </h1>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                >
                    Oops! Page Not Found
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-xl text-gray-600 mb-12 max-w-md mx-auto leading-relaxed"
                >
                    The page you are looking for seems to have taken a wrong turn.
                    Lets get you back on track!
                </motion.p>

                {/* Animated Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="w-48 h-48 mx-auto relative">
                        {/* Car */}
                        <motion.div
                            animate={{
                                x: [-50, 50, -50],
                                rotate: [-5, 5, -5]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="text-6xl">🚗</div>
                        </motion.div>

                        {/* Lost sign */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute top-8 left-1/2 transform -translate-x-1/2"
                        >
                            <div className="text-4xl">🧭</div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    {/* Go Home Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                        >
                            <span>🏠</span>
                            Go Back Home
                        </Link>
                    </motion.div>

                    {/* Food Delivery Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/food"
                            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                        >
                            <span>🍕</span>
                            Order Food
                        </Link>
                    </motion.div>

                    {/* Ride Sharing Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/ride"
                            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                        >
                            <span>🚗</span>
                            Book a Ride
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Additional Help */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Need Help?
                    </h3>
                    <p className="text-gray-600 mb-4">
                        If you believe this is an error, contact our support team.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/contact"
                            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            Contact Support
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link
                            href="/help"
                            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            Help Center
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute top-20 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute bottom-20 left-20 w-10 h-10 bg-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute bottom-10 right-10 w-4 h-4 bg-green-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.6s' }}></div>
            </div>
        </div>
    );
}