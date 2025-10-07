'use client';

import { useState, useEffect } from 'react';

const slides = [
    {
        id: 1,
        title: "Welcome to RideBite",
        subtitle: "Food Delivery & Ride Sharing",
        description: "Your one-stop platform for delicious food and comfortable rides",
        bgGradient: "from-blue-600 to-purple-700",
        accentColor: "text-yellow-300"
    },
    {
        id: 2,
        title: "🍕 Food Delivery",
        subtitle: "Order from top restaurants",
        description: "Fresh meals delivered to your doorstep in minutes",
        bgGradient: "from-orange-500 to-red-500",
        accentColor: "text-white"
    },
    {
        id: 3,
        title: "🚗 Ride Sharing",
        subtitle: "Safe & Affordable Rides",
        description: "Comfortable transportation with trusted drivers",
        bgGradient: "from-green-500 to-blue-600",
        accentColor: "text-yellow-300"
    }
];

export default function SimpleHeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-96 overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide
                            ? 'opacity-100 transform translate-x-0'
                            : 'opacity-0 transform translate-x-full'
                        }`}
                >
                    <div className={`bg-gradient-to-r ${slide.bgGradient} text-white py-20 h-full flex items-center justify-center`}>
                        <div className="max-w-7xl mx-auto px-4 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {slide.title}
                            </h1>
                            <h2 className={`text-2xl md:text-3xl mb-4 font-semibold ${slide.accentColor}`}>
                                {slide.subtitle}
                            </h2>
                            <p className="text-xl max-w-2xl mx-auto">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-white scale-125'
                                : 'bg-white bg-opacity-50'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}