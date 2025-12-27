import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Helpers de Roles (Basado en los strings del Backend)
    const isAdmin = () => user?.role === 'Admin';
    const isReceptionist = () => user?.role === 'Receptionist';
    const isClient = () => user?.role === 'Client';

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            
            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
            setLoading(false);
        };
        checkLogin();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/Auth/login', { email, password });
            // El backend devuelve: { token, id, email, fullName, role }
            const { token, ...userData } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            
            setUser(userData);
            setIsAuthenticated(true);
            return true; 
        } catch (error) {
            console.error(error);
            throw error.response?.data?.detail || "Error al iniciar sesión";
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/Auth/register', userData);
            const { token, ...newUserData } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(newUserData));
            
            setUser(newUserData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
            throw error.response?.data?.detail || "Error al registrarse";
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            register, 
            logout, 
            isAuthenticated, 
            loading,
            isAdmin,   
            isReceptionist,
            isClient    
        }}>
            {children}
        </AuthContext.Provider>
    );
};