import UserDashboard from '../components/user/UserDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  );
}