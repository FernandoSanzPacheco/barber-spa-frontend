import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [form, setForm] = useState({ name: '', description: '', price: '', duration: '', imageUrl: '' });

    useEffect(() => { loadServices(); }, []);

    const loadServices = async () => {
        try {
            const res = await api.get('/Services');
            setServices(res.data);
        } catch (e) { toast.error("Error cargando servicios"); }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...form, price: parseFloat(form.price), duration: parseInt(form.duration) };
            
            if (isEditing) {
                await api.put(`/Services/${currentId}`, payload);
                toast.success("Servicio actualizado");
            } else {
                await api.post('/Services', payload);
                toast.success("Servicio creado");
            }
            resetForm();
            loadServices();
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error al guardar");
        }
    };

    const handleEdit = (service) => {
        setForm(service);
        setCurrentId(service.id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar servicio?")) return;
        try {
            await api.delete(`/Services/${id}`);
            toast.success("Servicio eliminado");
            loadServices();
        } catch (error) {
            toast.error(error.response?.data?.detail || "No se puede eliminar (¿Tiene citas?)");
        }
    };

    const resetForm = () => {
        setForm({ name: '', description: '', price: '', duration: '', imageUrl: '' });
        setIsEditing(false);
        setCurrentId(null);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow border">
                <h3 className="font-bold text-lg mb-4">{isEditing ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="name" placeholder="Nombre Servicio" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
                    <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" required />
                    <div className="grid grid-cols-2 gap-2">
                        <input name="price" type="number" step="0.01" placeholder="Precio (S/.)" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" required />
                        <input name="duration" type="number" placeholder="Minutos" value={form.duration} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <input name="imageUrl" placeholder="URL Imagen" value={form.imageUrl} onChange={handleChange} className="w-full border p-2 rounded" />
                    
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-slate-900 text-white py-2 rounded hover:bg-slate-700">{isEditing ? 'Actualizar' : 'Crear'}</button>
                        {isEditing && <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-800 px-4 rounded">Cancelar</button>}
                    </div>
                </form>
            </div>

            <div className="md:col-span-2 bg-white p-6 rounded shadow border overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="p-2">Servicio</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Duración</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(s => (
                            <tr key={s.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{s.name}</td>
                                <td className="p-2">S/.{s.price}</td>
                                <td className="p-2">{s.duration} min</td>
                                <td className="p-2 flex gap-2">
                                    <button onClick={() => handleEdit(s)} className="text-blue-600 text-sm">Editar</button>
                                    <button onClick={() => handleDelete(s.id)} className="text-red-600 text-sm">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServicesManager;