import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Obtenemos los servicios desde API
                const response = await api.get('/Services');
                setServices(response.data);
            } catch (error) {
                toast.error('Error al cargar servicios');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return <div className="text-center mt-10 text-gray-500">Cargando catálogo...</div>;

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">NUESTROS SERVICIOS</h2>
                <p className="text-gray-500 mt-2">Calidad y estilo en cada detalle</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                            <span className="bg-slate-100 text-slate-800 px-3 py-1 text-sm font-semibold rounded">
                                ${service.price}
                            </span>
                        </div>
                        
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed h-20 overflow-hidden">
                            {service.description}
                        </p>

                        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                DURACIÓN: {service.duration} MIN
                            </span>
                            
                            <Link 
                                to="/appointments/new" 
                                className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline tracking-wide"
                            >
                                RESERVAR AHORA
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;