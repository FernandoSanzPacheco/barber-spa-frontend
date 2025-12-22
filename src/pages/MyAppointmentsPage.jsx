import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const MyAppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const response = await api.get('/Appointments/my-appointments');
            setAppointments(response.data);
        } catch (error) {
            toast.error('Error al cargar tus citas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCancel = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas cancelar esta cita?")) return;

        try {
            await api.put(`/Appointments/${id}/cancel`);
            toast.success('Cita cancelada');
            fetchAppointments(); // Recargar la lista
        } catch (error) {
            toast.error('No se pudo cancelar la cita');
        }
    };

    if (loading) return <div className="text-center mt-10">Cargando historial...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 tracking-tight border-b pb-4">MIS CITAS</h2>

            {appointments.length === 0 ? (
                <div className="text-center p-10 bg-gray-50 rounded border border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">No tienes citas programadas aún.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="bg-white border border-gray-200 p-6 rounded flex flex-col md:flex-row justify-between items-center gap-4">
                            
                            {/* Informacion de la cita */}
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider 
                                        ${apt.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 
                                          apt.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {apt.status === 'Scheduled' ? 'PROGRAMADA' : 
                                         apt.status === 'Cancelled' ? 'CANCELADA' : apt.status}
                                    </span>
                                    <span className="text-sm text-gray-400 font-mono">ID: #{apt.id}</span>
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-900">{apt.serviceName}</h3>
                                <p className="text-gray-600 text-sm">
                                    <span className="font-semibold">Barbero:</span> {apt.barberName}
                                </p>
                                <p className="text-gray-600 text-sm mt-1">
                                    {/* Formatear fecha */}
                                    {new Date(apt.appointmentDate).toLocaleString('es-ES', { 
                                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                                    })}
                                </p>
                            </div>

                            {/* Acciones */}
                            {apt.status === 'Scheduled' && (
                                <div>
                                    <button 
                                        onClick={() => handleCancel(apt.id)}
                                        className="text-red-600 hover:text-red-800 font-bold text-sm border border-red-200 hover:bg-red-50 px-4 py-2 rounded transition"
                                    >
                                        CANCELAR CITA
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAppointmentsPage;