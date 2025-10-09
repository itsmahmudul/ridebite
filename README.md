RideBite Frontend 🚗🍕
A modern food delivery and ride-sharing platform built with Next.js, TypeScript, and Tailwind CSS.

🌟 Features
🍕 Food Delivery
Browse restaurants and menus

Place food orders with real-time tracking

Restaurant management for admins

Menu item management

🚗 Ride Sharing
Book rides with different vehicle types

Real-time ride tracking

Driver management for admins

Ride history and status updates

👥 User Management
Role-based access (Admin/User)

User registration and authentication

Personal dashboards

Order and ride history

🎯 Admin Features
Complete restaurant management

Menu item management

Rider/driver management

User management and role assignment

Platform analytics

🛠 Tech Stack
Framework: Next.js 14 with App Router

Language: TypeScript

Styling: Tailwind CSS

Authentication: Firebase Auth

Backend: Express.js with MongoDB

State Management: React Context

HTTP Client: Axios

📦 Project Structure
text
ridebite-frontend/
├── app/
│   ├── admin/                 # Admin dashboard pages
│   │   ├── page.tsx
│   │   ├── users/
│   │   ├── restaurants/
│   │   └── riders/
│   ├── dashboard/             # User dashboard
│   ├── login/                 # Authentication pages
│   ├── signup/
│   └── layout.tsx
├── components/
│   ├── admin/                 # Admin components
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLayout.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── forms/             # Admin forms
│   ├── user/                  # User components
│   │   └── UserDashboard.tsx
│   ├── ProtectedRoute.tsx     # Route protection
│   └── Navbar.tsx
├── contexts/
│   └── AuthContext.tsx        # Authentication context
├── hooks/
│   ├── api.ts                 # API configuration
│   └── useAdminData.ts        # Admin data hook
├── types/
│   ├── auth.ts                # Authentication types
│   └── firestore.ts           # Firestore data types
└── lib/
    └── firebase.ts            # Firebase configuration
🚀 Getting Started
Prerequisites
Node.js 18+

npm or yarn

Firebase project

MongoDB database

Installation
Clone the repository

bash
git clone <repository-url>
cd ridebite-frontend
Install dependencies

bash
npm install
# or
yarn install
Environment Setup
Create a .env.local file in the root directory:

env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api
Firebase Setup

Create a Firebase project

Enable Authentication (Email/Password)

Create Firestore Database

Update security rules

Run the development server

bash
npm run dev
# or
yarn dev
Open your browser
Navigate to http://localhost:3000

🔐 Authentication
The app uses Firebase Authentication with the following features:

Email/Password authentication

Role-based access control

Protected routes

Automatic token management

User Roles
Admin: Full access to all features

User: Can place orders and book rides

🎨 Components Overview
Core Components
Navbar: Responsive navigation with auth state

ProtectedRoute: Route protection wrapper

AuthContext: Global authentication state

Admin Components
AdminLayout: Admin dashboard layout

AdminSidebar: Navigation sidebar

AdminDashboard: Main admin interface

Form Components: CRUD operations for restaurants, menu items, riders

User Components
UserDashboard: Personal user dashboard

Order/Ride History: User activity tracking

📱 Pages
Public Pages
/ - Landing page

/login - User login

/signup - User registration

Protected Pages
/dashboard - User dashboard

/admin - Admin dashboard

/admin/users - User management

/admin/restaurants - Restaurant management

/admin/riders - Rider management

🔄 API Integration
The frontend communicates with a Express.js backend:

typescript
// Example API call
const response = await api.get('/api/restaurants');
const restaurants = response.data.data;
Key Endpoints
GET /api/restaurants - Get all restaurants

POST /api/orders - Place new order

POST /api/rides - Book new ride

GET /api/raiders - Get all riders (admin)

🎯 Key Features Implementation
Role-Based Dashboard
typescript
// Automatically redirects based on user role
const getDashboardLink = () => {
  return user?.role === 'admin' ? '/admin' : '/dashboard';
};
Real-time Data
Live order status updates

Ride tracking

Admin dashboard statistics

Responsive Design
Mobile-first approach

Tailwind CSS for styling

Responsive navigation

🔧 Custom Hooks
useAdminData
typescript
const { restaurants, menuItems, loading } = useAdminData('restaurants');
useAuth
typescript
const { user, login, logout } = useAuth();
🛡 Security Features
Route protection

Role-based access control

Input validation

XSS protection

CSRF protection

📊 Performance Optimizations
Image optimization

Code splitting

Lazy loading

Efficient re-renders

Optimized API calls

🚀 Deployment
Vercel (Recommended)
bash
npm run build
vercel --prod
Other Platforms
Netlify

AWS Amplify

Railway

🐛 Troubleshooting
Common Issues
Firebase Auth Errors

Check Firebase configuration

Verify Auth is enabled

Check security rules

API Connection Issues

Verify backend is running

Check CORS configuration

Verify API URL in environment variables

Build Errors

Clear node_modules and reinstall

Check TypeScript types

Verify all environment variables

🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

📄 License
This project is licensed under the MIT License.

👥 Team
Your Name - Full Stack Developer

📞 Support
For support, email your-email@example.com or create an issue in the repository.

Built with ❤️ using Next.js and TypeScript