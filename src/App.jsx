import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout'; 
import Overview from './pages/Overview';
import CMS from './pages/CMS';
import Ledger from './pages/Ledger';
import Beneficiaries from './pages/Beneficiaries';
import Broadcast from './pages/Broadcast';
import AddBeneficiary from './pages/AddBeneficiary';
import Gallery from './pages/Gallery';

// Updated ProtectedRoute to respect the loading state
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    // Prevents redirecting to login before the AuthContext finishes checking the session
    if (loading) return <div>Loading...</div>; 
    if (!user) return <Navigate to="/login" />;
    return children;
};

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes wrapped in DashboardLayout */}
            <Route path="/" element={
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Overview />} />
                <Route path="cms" element={<CMS />} />
                <Route path="ledger" element={<Ledger />} />
                <Route path="beneficiaries" element={<Beneficiaries />} />
                <Route path="broadcast" element={<Broadcast />} />
                <Route path="add-beneficiary" element={<AddBeneficiary />} />
                <Route path="gallery" element={<Gallery />} />
            </Route>
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;