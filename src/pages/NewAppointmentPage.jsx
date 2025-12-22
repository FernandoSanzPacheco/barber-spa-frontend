import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NewAppointmentPage = () => {
    const navigate = useNavigate();
    
    // estados para llenar los selectores
    const [barbers, setBarbers] = useState([]);
    const [services, setServices] = useState([]);
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        barberId: '',
        serviceId: '',
        appointmentDate: '', // Fecha y hora juntas
        notes: ''
    });

    // Cargar datos al iniciar
    useEffect(() => {
        const loadData = async () => {
            try {
                const [barbersRes, servicesRes] = await Promise.all([
                    api.get('/Barbers'),
                    api.get('/Services')
                ]);
                setBarbers(barbersRes.data);
                setServices(servicesRes.data);
            } catch (error) {
                toast.error('Error cargando datos del sistema');
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviamos los datos al backend
            await api.post('/Appointments', formData);
            
            toast.success('¡Cita agendada con éxito!');
            navigate('/appointments'); // Redirigir a Mis Citas
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.detail || 'No se pudo agendar la cita');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">AGENDAR NUEVA CITA</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Selector de Barbero */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Selecciona tu Barbero
                        </label>
                        <select
                            name="barberId"
                            className="w-full p-3 border border-gray-300 rounded bg-white focus:border-slate-900 outline-none"
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Elige un profesional --</option>
                            {barbers.map(barber => (
                                <option key={barber.id} value={barber.id}>
                                    {barber.name} ({barber.specialty})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Selector de Servicio */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Selecciona el Servicio
                        </label>
                        <select
                            name="serviceId"
                            className="w-full p-3 border border-gray-300 rounded bg-white focus:border-slate-900 outline-none"
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Elige un servicio --</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - ${service.price} ({service.duration} min)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha y Hora */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Fecha y Hora
                        </label>
                        <input
                            type="datetime-local"
                            name="appointmentDate"
                            className="w-full p-3 border border-gray-300 rounded focus:border-slate-900 outline-none"
                            onChange={handleChange}
                            min={new Date().toISOString().slice(0, 16)} // Bloquear fechas pasadas
                            required
                        />
                    </div>

                    {/* Notas */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Notas Adicionales (Opcional)
                        </label>
                        <textarea
                            name="notes"
                            rows="3"
                            className="w-full p-3 border border-gray-300 rounded focus:border-slate-900 outline-none"
                            placeholder="Ej: Tengo la piel sensible..."
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 font-bold tracking-widest hover:bg-slate-800 transition rounded"
                    >
                        CONFIRMAR RESERVA
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewAppointmentPage;