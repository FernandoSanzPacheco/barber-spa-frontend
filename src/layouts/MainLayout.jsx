import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast'; // Para las notificaciones

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            
            {/* Contenedor principal */}
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-gray-400 py-6 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Barber Spa - Todos los derechos reservados.</p>
            </footer>

            {/* alertas flotantes */}
            <Toaster position="top-center" />
        </div>
    );
};

export default MainLayout;