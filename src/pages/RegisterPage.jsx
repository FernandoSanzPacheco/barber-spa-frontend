import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Las contraseñas no coinciden');
        }

        try {
            // Elimina confirmPassword antes de enviar a la API
            const { confirmPassword, ...dataToSend } = formData;
            await register(dataToSend);
            toast.success('¡Cuenta creada exitosamente!');
            navigate('/');
        } catch (error) {
            toast.error(error.toString());
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-6">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Crear Cuenta</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                name="firstName"
                                type="text"
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Apellido</label>
                            <input
                                name="lastName"
                                type="text"
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            name="phone"
                            type="tel"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-3 px-4 rounded-md font-bold hover:bg-slate-800 transition mt-4"
                    >
                        REGISTRARSE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;