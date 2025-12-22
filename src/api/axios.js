import axios from 'axios';

const BASE_URL = 'http://localhost:5263/api'; 

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Antes de enviar cualquier peticion, revisa si hay un token guardadoy lo pega en la cabecera "Authorization"
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;