import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';
import NewAppointmentPage from './pages/NewAppointmentPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/services" element={<ServicesPage />} />

            {/* Privadas */}
            <Route path="/appointments" element={
                <PrivateRoute>
                    <MyAppointmentsPage />
                </PrivateRoute>
            } />
            <Route path="/appointments/new" element={
                <PrivateRoute>
                    <NewAppointmentPage />
                </PrivateRoute>
            } />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;