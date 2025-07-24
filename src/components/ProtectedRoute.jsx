import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const adminKey = sessionStorage.getItem('admin-key');
  if (adminKey !== import.meta.env.VITE_ADMIN_KEY) {
    return <Navigate to="/not-found" replace />;
  }
  return children;
}

export default ProtectedRoute;