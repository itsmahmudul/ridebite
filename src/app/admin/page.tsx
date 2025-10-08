import AdminDashboard from '@/app/components/admin/AdminDashboard';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}