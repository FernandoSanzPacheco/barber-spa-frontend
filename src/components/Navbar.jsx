import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    // Extraemos los nuevos helpers
    const { user, logout, isAuthenticated, isAdmin, isReceptionist, isClient } = useAuth();
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
                        
                        {/* Links para Cliente */}
                        {isAuthenticated && isClient() && (
                            <Link to="/appointments" className="hover:text-blue-400 transition">Mis Citas</Link>
                        )}

                        {/* Link para Staff (Admin o Recepcionist) */}
                        {isAuthenticated && (isAdmin() || isReceptionist()) && (
                            <Link to="/admin" className="text-yellow-400 font-bold hover:text-yellow-300 transition border border-yellow-400 px-3 py-1 rounded">
                                {isAdmin() ? 'Panel Admin' : 'Recepción'}
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-gray-300 hidden md:inline">Hola, {user?.fullName}</span>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition">
                                    Salir
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-blue-400 font-medium text-sm">Ingresar</Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition">
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