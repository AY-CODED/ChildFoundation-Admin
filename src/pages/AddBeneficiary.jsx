import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddBeneficiary() {
    const [formData, setFormData] = useState({ name: '', age: '', medicalOrEducationalNeeds: '', programStatus: 'ACTIVE' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/beneficiaries', formData);
            alert("Beneficiary added!");
            navigate('/beneficiaries');
        } catch (err) { alert("Failed to add"); }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Enroll New Beneficiary</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input className="w-full p-2 border rounded" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
                <input className="w-full p-2 border rounded" type="number" placeholder="Age" onChange={e => setFormData({...formData, age: e.target.value})} required />
                <input className="w-full p-2 border rounded" placeholder="Needs (e.g. Medical, Education)" onChange={e => setFormData({...formData, medicalOrEducationalNeeds: e.target.value})} />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Save Record</button>
            </form>
        </div>
    );
}