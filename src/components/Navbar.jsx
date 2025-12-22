import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-slate-900 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    <Link to="/" className="text-xl font-bold tracking-wider">
                        BARBER SPA
                    </Link>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="hover:text-blue-400 transition">Inicio</Link>
                        <Link to="/services" className="hover:text-blue-400 transition">Servicios</Link>
                        {/* Solo si esta logueado */}
                        {isAuthenticated && (
                            <Link to="/appointments" className="hover:text-blue-400 transition">Mis Citas</Link>
                        )}
                    </div>

                    {/* Botones de accion */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-gray-300">Hola, {user?.fullName}</span>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-blue-400 font-medium text-sm">
                                    Iniciar Sesión
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;