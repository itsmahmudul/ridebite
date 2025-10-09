'use client';

import HeroSlider from './components/HeroSlider';
import Services from './components/Services';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider></HeroSlider>

      {/* Services Section */}
      <Services></Services>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-800">
            Why <span className="text-blue-600">Choose RideBite?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-blue-600">⚡</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                Fast Service
              </h3>
              <p className="text-gray-600 text-base">
                Experience lightning-fast deliveries and quick ride arrivals, every time.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-green-600">💰</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                Affordable Prices
              </h3>
              <p className="text-gray-600 text-base">
                Enjoy top-quality service that fits perfectly within your budget.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-purple-600">🔒</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                Safe & Secure
              </h3>
              <p className="text-gray-600 text-base">
                Your safety is our top priority—always reliable and trusted.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}