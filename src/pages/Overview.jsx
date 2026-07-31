import { useState, useEffect } from "react";
import api from "../services/api";
import { Users } from "lucide-react";

export default function Overview() {
  const [stats, setStats] = useState({
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/users/count");

        setStats({
          users: res.data,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  const statConfig = [
    {
      label: "Total Users",
      value: stats.users,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statConfig.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl border ${stat.border} shadow-sm hover:shadow-md transition-shadow duration-300`}
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