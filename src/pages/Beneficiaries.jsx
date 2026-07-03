import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Loader2 } from 'lucide-react';

export default function Beneficiaries() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBeneficiaries();
    }, []);

    const navigate = useNavigate();

    const fetchBeneficiaries = async () => {
        try {
            // This calls your Spring Boot GET /api/beneficiaries endpoint
            const response = await api.get('/beneficiaries');
            setBeneficiaries(response.data);
        } catch (err) {
            setError('Failed to load beneficiaries. Please try again.');
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Beneficiary CRM</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage program enrollments and medical/educational needs.</p>
                </div>
                <button 
                onClick={() => navigate('/add-beneficiary')} 
                className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                >
                <Plus className="w-5 h-5" />
                    Add Beneficiary
                </button>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 text-red-700 bg-red-100 border border-red-200 rounded-md">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            ) : (
                /* Data Table */
                <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Age</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Specific Needs</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {beneficiaries.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                        No beneficiaries found. Click "Add Beneficiary" to enroll someone.
                                    </td>
                                </tr>
                            ) : (
                                beneficiaries.map((person) => (
                                    <tr key={person.id} className="transition-colors hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{person.name}</td>
                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{person.age}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                person.programStatus === 'ACTIVE' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {person.programStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{person.medicalOrEducationalNeeds}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}