import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await api.post('/auth/register', { email, password });
            setMessage(response.data);
            // Automatically redirect to login after 2 seconds
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
                <div className="text-center">
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Create Admin Account</h2>
                    <p className="mt-2 text-sm text-gray-500">Register a new foundation administrator</p>
                </div>

                {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>}
                {message && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md">{message}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email" required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password" required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
                    >
                        Register Account
                    </button>
                </form>

                <div className="text-sm text-center text-gray-500">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in here</Link>
                </div>
            </div>
        </div>
    );
}