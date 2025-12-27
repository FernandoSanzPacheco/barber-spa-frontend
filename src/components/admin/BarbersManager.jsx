import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const BarbersManager = () => {
    const [barbers, setBarbers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    // Estado inicial seguro
    const [form, setForm] = useState({ name: '', specialty: '', email: '', phone: '', imageUrl: '' });

    useEffect(() => { loadBarbers(); }, []);

    const loadBarbers = async () => {
        try {
            const res = await api.get('/Barbers');
            setBarbers(res.data);
            // Descomenta esto para ver que llega realmente del backend
            // console.log("Datos recibidos:", res.data); 
        } catch (e) { toast.error("Error cargando barberos"); }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/Barbers/${currentId}`, form);
                toast.success("Barbero actualizado");
            } else {
                await api.post('/Barbers', form);
                toast.success("Barbero creado");
            }
            resetForm();
            loadBarbers();
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error al guardar");
        }
    };

    const handleEdit = (barber) => {
        setForm({
            name: barber.name || '',
            specialty: barber.specialty || '',
            email: barber.email || '',
            phone: barber.phone || '',
            imageUrl: barber.imageUrl || ''
        });
        setCurrentId(barber.id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro? Si tiene citas asociadas, esto fallará.")) return;
        try {
            await api.delete(`/Barbers/${id}`);
            toast.success("Barbero eliminado");
            loadBarbers();
        } catch (error) {
            toast.error(error.response?.data?.detail || "No se pudo eliminar");
        }
    };

    const resetForm = () => {
        setForm({ name: '', specialty: '', email: '', phone: '', imageUrl: '' });
        setIsEditing(false);
        setCurrentId(null);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="bg-white p-6 rounded shadow border">
                <h3 className="font-bold text-lg mb-4">{isEditing ? 'Editar Barbero' : 'Nuevo Barbero'}</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
                    <input name="specialty" placeholder="Especialidad" value={form.specialty} onChange={handleChange} className="w-full border p-2 rounded" required />
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
                    <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
                    <input name="imageUrl" placeholder="URL Imagen" value={form.imageUrl} onChange={handleChange} className="w-full border p-2 rounded" />
                    
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-slate-900 text-white py-2 rounded hover:bg-slate-700">
                            {isEditing ? 'Actualizar' : 'Crear'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-800 px-4 rounded">Cancelar</button>
                        )}
                    </div>
                </form>
            </div>

            {/* Lista */}
            <div className="md:col-span-2 bg-white p-6 rounded shadow border overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Especialidad</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Teléfono</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barbers.map(b => (
                            <tr key={b.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{b.name}</td>
                                <td className="p-2">{b.specialty}</td>
                                <td className="p-2">{b.email}</td>
                                <td className="p-2">{b.phone}</td>
                                <td className="p-2 flex gap-2">
                                    <button onClick={() => handleEdit(b)} className="text-blue-600 hover:underline text-sm font-medium">Editar</button>
                                    <button onClick={() => handleDelete(b.id)} className="text-red-600 hover:underline text-sm font-medium">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BarbersManager;