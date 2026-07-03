import { useState, useEffect } from 'react';
import api from '../services/api';
import { Users, Wallet, FileText } from 'lucide-react';

export default function Overview() {
  const [stats, setStats] = useState({
    beneficiaries: 0,
    donations: 0,
    posts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bRes, dRes, pRes] = await Promise.all([
          api.get('/beneficiaries/count'),
          api.get('/donations/count'),
          api.get('/posts/count'),
        ]);

        setStats({
          beneficiaries: bRes.data,
          donations: dRes.data,
          posts: pRes.data,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };
    fetchStats();
  }, []);

  const statConfig = [
    {
      label: 'Total Beneficiaries',
      value: stats.beneficiaries,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      label: 'Total Donations',
      value: `$${stats.donations}`,
      icon: Wallet,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    {
      label: 'Published Posts',
      value: stats.posts,
      icon: FileText,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-base text-gray-600">
          A high-level summary of foundation activities
        </p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {statConfig.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`p-6 bg-white border ${stat.border} rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-extrabold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
