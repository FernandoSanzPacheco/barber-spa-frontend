import { useState } from 'react';
import BarbersManager from '../../components/admin/BarbersManager';
import ServicesManager from '../../components/admin/ServicesManager';
import AppointmentsManager from '../../components/admin/AppointmentsManager';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('appointments');

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">
                Panel de Gestión {isAdmin() ? '(Administrador)' : '(Recepción)'}
            </h1>
            
            <div className="flex space-x-1 mb-6 border-b border-gray-300">
                <button 
                    onClick={() => setActiveTab('appointments')} 
                    className={`px-4 py-2 font-medium ${activeTab === 'appointments' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-500'}`}>
                    Citas
                </button>
                
                {/* Solo Admin ve pestañas de mantenimiento */}
                {isAdmin() && (
                    <>
                        <button 
                            onClick={() => setActiveTab('barbers')} 
                            className={`px-4 py-2 font-medium ${activeTab === 'barbers' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-500'}`}>
                            Barberos
                        </button>
                        <button 
                            onClick={() => setActiveTab('services')} 
                            className={`px-4 py-2 font-medium ${activeTab === 'services' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-500'}`}>
                            Servicios
                        </button>
                    </>
                )}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                {activeTab === 'appointments' && <AppointmentsManager />}
                {activeTab === 'barbers' && isAdmin() && <BarbersManager />}
                {activeTab === 'services' && isAdmin() && <ServicesManager />}
            </div>
        </div>
    );
};

export default AdminDashboard;