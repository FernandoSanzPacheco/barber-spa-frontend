import { useEffect, useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const AppointmentsManager = () => {
    const { isAdmin } = useAuth(); // Para mostrar u ocultar boton eliminar
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusTranslations = {
            'Scheduled': 'PROGRAMADA',
            'Completed': 'COMPLETADA',
            'Cancelled': 'CANCELADA'
        };

    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async () => {
        try {
            // Llama al endpoint GET /api/Appointments (Protegido para Admin/Recep)
            const res = await api.get('/Appointments');
            setAppointments(res.data);
        } catch (e) { 
            toast.error("Error cargando todas las citas"); 
        } finally {
            setLoading(false);
        }
    };

    // Recepcionista/Admin puede cambiar estados
    const handleStatusChange = async (id, newStatus) => {
        try {
            // El backend espera un string en el body. Axios lo serializa a JSON.
            await api.put(`/Appointments/${id}/status`, JSON.stringify(newStatus), {
                 headers: { 'Content-Type': 'application/json' }
            });
            toast.success(`Cita marcada como ${newStatus}`);
            fetchAll();
        } catch (e) { toast.error("Error actualizando estado"); }
    };

    // Admin/Recep puede cancelar (logica de negocio aplicada en backend)
    const handleCancel = async (id) => {
        if(!window.confirm("¿Cancelar esta cita?")) return;
        try {
            await api.put(`/Appointments/${id}/cancel`);
            toast.success("Cita cancelada");
            fetchAll();
        } catch(e) { toast.error("Error cancelando"); }
    };

    // Solo admin puede borrar fisicamente
    const handleDelete = async (id) => {
        if(!window.confirm("¿ELIMINAR FÍSICAMENTE? Desaparecerá de la base de datos.")) return;
        try {
            await api.delete(`/Appointments/${id}`);
            toast.success("Eliminado definitivamente");
            fetchAll();
        } catch(e) { toast.error("Error eliminando"); }
    };

    if(loading) return <div>Cargando agenda...</div>;

    return (
        <div className="bg-white p-6 rounded shadow border">
            <h3 className="font-bold text-lg mb-4">Agenda Global</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-100 border-b">
                            <th className="p-3">ID</th>
                            <th className="p-3">Cliente</th>
                            <th className="p-3">Servicio / Barbero</th>
                            <th className="p-3">Fecha</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3 text-center">Gestión</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(apt => (
                            <tr key={apt.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-mono">{apt.id}</td>
                                <td className="p-3">{apt.clientName || 'Usuario ID: ' + apt.userId}</td>
                                <td className="p-3">
                                    <div className="font-bold">{apt.serviceName}</div>
                                    <div className="text-gray-500 text-xs">{apt.barberName}</div>
                                </td>
                                <td className="p-3">
                                    {new Date(apt.appointmentDate).toLocaleString()}
                                </td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold 
                                        ${apt.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 
                                          apt.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                                          'bg-blue-100 text-blue-800'}`}>
                                    
                                        {statusTranslations[apt.status] || apt.status}
                                    
                                    </span>
                                </td>
                                <td className="p-3 flex flex-col gap-1 items-center">
                                    {/* Botones de Flujo */}
                                    {apt.status === 'Scheduled' && (
                                        <>
                                            <button onClick={() => handleStatusChange(apt.id, 'Completed')} 
                                                className="bg-blue-600 text-white px-2 py-1 rounded text-xs w-full">
                                                Completar
                                            </button>
                                            <button onClick={() => handleCancel(apt.id)} 
                                                className="bg-yellow-500 text-white px-2 py-1 rounded text-xs w-full">
                                                Cancelar
                                            </button>
                                        </>
                                    )}
                                    
                                    {/* Botón rojo (Solo Admin) */}
                                    {isAdmin() && (
                                        <button onClick={() => handleDelete(apt.id)} 
                                            className="bg-red-600 text-white px-2 py-1 rounded text-xs w-full mt-1">
                                            Eliminar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentsManager;