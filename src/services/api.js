import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // This proxies to localhost:8080 via Vite
    withCredentials: true, // CRITICAL: This ensures your JWT cookie is sent!
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;