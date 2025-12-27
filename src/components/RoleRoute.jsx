import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <div>Cargando permisos...</div>;
  
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }

  // Si el rol no esta en la lista permitida, redirigir al home
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;