'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function Services() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 60,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15,
                duration: 0.8
            }
        }
    };

    const iconVariants: Variants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                delay: 0.3
            }
        }
    };

    const buttonVariants: Variants = {
        hover: {
            scale: 1.02,
            y: -2,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.98,
            y: 0
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    className="text-5xl font-bold text-center mb-20 text-slate-800"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    What would you like to do today?
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Food Delivery Card */}
                    <motion.div
                        className="group relative"
                        variants={cardVariants}
                    >
                        <div className="relative h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 hover:shadow-3xl transition-all duration-500">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-80"></div>

                            {/* Content */}
                            <div className="relative z-10 p-8 h-full flex flex-col">
                                {/* Icon & Header */}
                                <div className="text-center mb-8">
                                    <motion.div
                                        className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                                        variants={iconVariants}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <span className="text-4xl">🍕</span>
                                    </motion.div>
                                    <h3 className="text-4xl font-bold text-slate-800 mb-4">
                                        Food Delivery
                                    </h3>
                                    <p className="text-xl text-slate-600 leading-relaxed">
                                        Order from your favorite restaurants and get delicious food delivered to your doorstep in minutes.
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="space-y-3 mb-8 flex-1">
                                    <div className="flex items-center text-slate-700">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                        <span>Fast delivery in 30-45 minutes</span>
                                    </div>
                                    <div className="flex items-center text-slate-700">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                        <span>100+ restaurant partners</span>
                                    </div>
                                    <div className="flex items-center text-slate-700">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                        <span>Live order tracking</span>
                                    </div>
                                </div>

                                {/* Button */}
                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="mt-auto"
                                >
                                    <Link
                                        href="/food"
                                        className="block w-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-center py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            Order Food
                                            <span className="group-hover:translate-x-1 transition-transform duration-200">🚀</span>
                                        </span>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-200 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
                        </div>
                    </motion.div>

                    {/* Ride Sharing Card */}
                    <motion.div
                        className="group relative"
                        variants={cardVariants}
                    >
                        <div className="relative h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 hover:shadow-3xl transition-all duration-500">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-80"></div>

                            {/* Content */}
                            <div className="relative z-10 p-8 h-full flex flex-col">
                                {/* Icon & Header */}
                                <div className="text-center mb-8">
                                    <motion.div
                                        className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                                        variants={iconVariants}
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                    >
                                        <span className="text-4xl">🚗</span>
                                    </motion.div>
                                    <h3 className="text-4xl font-bold text-slate-800 mb-4">
                                        Ride Sharing
                                    </h3>
                                    <p className="text-xl text-slate-600 leading-relaxed">
                                        Book a comfortable ride to your destination with our reliable and safe ride-sharing service.
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="space-y-3 mb-8 flex-1">
                                    <div className="flex items-center text-slate-700">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                        <span>Arrival in 5-10 minutes</span>
                                    </div>
                                    <div className="flex items-center text-slate-700">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                        <span>Verified & trained drivers</span>
                                    </div>
                                    <div className="flex items-center text-slate-700">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                        <span>24/7 availability</span>
                                    </div>
                                </div>

                                {/* Button */}
                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="mt-auto"
                                >
                                    <Link
                                        href="/ride"
                                        className="block w-full bg-gradient-to-r from-blue-500 to-green-600 text-white text-center py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            Book a Ride
                                            <span className="group-hover:translate-x-1 transition-transform duration-200">✨</span>
                                        </span>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 -translate-x-16 opacity-20"></div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-200 rounded-full translate-y-12 translate-x-12 opacity-30"></div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}