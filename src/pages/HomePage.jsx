import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="space-y-12">
            {/* Bienvenida */}
            <div className="text-center space-y-4 py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">
                    BARBERÍA & SPA
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Tu estilo, nuestro compromiso. Reserva tu cita en segundos y vive la experiencia.
                </p>
                <div className="pt-4">
                    <Link 
                        to="/appointments/new" 
                        className="bg-slate-900 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-slate-800 transition shadow-lg"
                    >
                        RESERVAR CITA AHORA
                    </Link>
                </div>
            </div>

            {/* Secciones */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Servicios */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Nuestros Servicios</h3>
                    <p className="text-gray-600 mb-6">
                        Desde cortes clásicos hasta tratamientos completos de SPA. Descubre todo lo que tenemos para ti.
                    </p>
                    <Link to="/services" className="text-blue-600 font-bold hover:underline">
                        Ver Servicios &rarr;
                    </Link>
                </div>

                {/* Promociones */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Promociones SPA</h3>
                    <p className="text-gray-600 mb-6">
                        Paquetes especiales de Manicure, Pedicure y Masajes relajantes a precios increíbles.
                    </p>
                    <button className="text-blue-600 font-bold hover:underline cursor-not-allowed opacity-50">
                        Próximamente
                    </button>
                </div>

                {/* Ubicación */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Horarios & Ubicación</h3>
                    <p className="text-gray-600">
                        <strong>Lunes a Domingo:</strong> 10:00 AM - 9:00 PM
                    </p>
                    <p className="text-gray-600 mt-2">
                        Av. Argentina 123, Lima
                    </p>
                    <p className="text-gray-600 mt-2">
                        WhatsApp: 958152960
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;