import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import RoleRoute from './components/RoleRoute';

// Pages Publicas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';

// Pages Cliente
import NewAppointmentPage from './pages/NewAppointmentPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';

// Pages Admin/Recep
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            {/* Rutas Publicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/services" element={<ServicesPage />} />

            {/* Rutas Cliente */}
            <Route path="/appointments" element={
              <RoleRoute allowedRoles={['Client']}>
                <MyAppointmentsPage />
              </RoleRoute>
            }/>
            
            <Route path="/appointments/new" element={
              <RoleRoute allowedRoles={['Client']}>
                <NewAppointmentPage />
              </RoleRoute>
            }/>

            {/* Rutas Administracion y Recepcion */}
            <Route path="/admin" element={
              <RoleRoute allowedRoles={['Admin', 'Receptionist']}>
                <AdminDashboard />
              </RoleRoute>
            }/>

          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;