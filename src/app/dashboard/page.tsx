import { useAuth } from '../../../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            My Dashboard
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}!</h2>
            <p className="text-gray-600">This is your personal dashboard where you can:</p>
            <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
              <li>View your order history</li>
              <li>Track current deliveries</li>
              <li>Manage your profile</li>
              <li>View your favorite restaurants</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}