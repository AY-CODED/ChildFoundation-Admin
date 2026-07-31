import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// 1. Import the Users icon (it is already in your import list)
import { LayoutDashboard, FileText, Wallet, Users, Mail, LogOut } from 'lucide-react';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    // { name: 'CMS', path: '/cms', icon: FileText },
    // { name: 'Ledger', path: '/ledger', icon: Wallet },
    // { name: 'Beneficiaries', path: '/beneficiaries', icon: Users },
    // 2. Add the 'Registered Users' link here
    { name: 'Image Upload', path: '/ImageUpload', icon: FileText }, // Add the Image Upload link
    { name: 'Registered Users', path: '/users', icon: Users }, 
    { name: 'Broadcast', path: '/broadcast', icon: Mail },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-white border-r shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            YMCH Admin
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition-colors rounded-lg hover:bg-red-50 font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}