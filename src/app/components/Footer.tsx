export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white text-gray-800 mt-20 shadow-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl mr-3 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">RB</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">RideBite</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-md text-lg leading-relaxed">
              Your ultimate destination for food delivery and ride services.
              Experience convenience at your fingertips.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.24 14.865 3.75 13.714 3.75 12.417s.49-2.448 1.376-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.886.875 1.376 2.026 1.376 3.323s-.49 2.448-1.376 3.323c-.875.807-2.026 1.297-3.323 1.297z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Food Delivery
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Ride Sharing
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Express Delivery
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Groceries
              </a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Help Center
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact Us
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                FAQ
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Partnership
              </a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} <span className="font-semibold text-orange-500">RideBite</span>. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors duration-200">Cookie Policy</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors duration-200">Sitemap</a>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 mb-4 text-sm font-medium">DOWNLOAD OUR APP</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center space-x-3 transition-all duration-300 shadow-md hover:shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.924 17.315c-.542.964-1.279 1.823-2.201 2.577-.871.715-1.775 1.108-2.723 1.108-.946 0-1.562-.337-1.854-1.011-.299-.674-.223-1.494.225-2.461.447-.967 1.079-1.827 1.896-2.577.817-.75 1.656-1.172 2.516-1.266.861-.094 1.416.135 1.667.686.25.551.191 1.297-.176 2.238zM8.858 7.091c-.542.964-1.279 1.823-2.201 2.577-.871.715-1.775 1.108-2.723 1.108-.946 0-1.562-.337-1.854-1.011-.299-.674-.223-1.494.225-2.461.447-.967 1.079-1.827 1.896-2.577.817-.75 1.656-1.172 2.516-1.266.861-.094 1.416.135 1.667.686.25.551.191 1.297-.176 2.238z" />
              </svg>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </a>
            <a href="#" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center space-x-3 transition-all duration-300 shadow-md hover:shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.863 2.658L16.802 8.99l-2.303 2.303-8.636-8.635z" />
              </svg>
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}