import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import {
  DollarSign,
  TrendingUp,
  Wallet,
  Activity,
  Calendar
} from "lucide-react";

import api from "../services/api";

export default function Ledger() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/donations")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  const total = data.reduce((sum, item) => sum + Number(item.amount), 0);

  const average =
    data.length > 0 ? (total / data.length).toFixed(2) : 0;

  const highest =
    data.length > 0
      ? Math.max(...data.map((d) => Number(d.amount)))
      : 0;

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Financial Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor donations and financial performance.
        </p>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p>Total Donations</p>

              <h2 className="text-3xl font-bold mt-2">
                ₦{total.toLocaleString()}
              </h2>
            </div>

            <DollarSign size={40} />
          </div>
        </div>

        <div className="rounded-3xl bg-white shadow-lg p-6">
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Average Donation
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₦{average}
              </h2>
            </div>

            <Wallet className="text-green-600" size={40} />
          </div>
        </div>

        <div className="rounded-3xl bg-white shadow-lg p-6">
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Highest Donation
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₦{highest.toLocaleString()}
              </h2>
            </div>

            <TrendingUp className="text-orange-500" size={40} />
          </div>
        </div>

        <div className="rounded-3xl bg-white shadow-lg p-6">
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Transactions
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {data.length}
              </h2>
            </div>

            <Activity className="text-purple-600" size={40} />
          </div>
        </div>

      </div>

      {/* Chart */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-2xl font-bold">
              Donation Trends
            </h2>

            <p className="text-gray-500">
              Financial activity over time
            </p>
          </div>

          <Calendar className="text-blue-600" />
        </div>

        {loading ? (
          <div className="h-96 flex justify-center items-center">
            <div className="animate-pulse text-gray-400">
              Loading Chart...
            </div>
          </div>
        ) : (
          <div className="h-96">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                />

                <YAxis />

                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                />

                <Bar
                  dataKey="amount"
                  radius={[8, 8, 0, 0]}
                  fill="#2563eb"
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        )}
      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold">
            Recent Donations
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-left p-4">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="p-4">
                  {item.date}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  ₦{Number(item.amount).toLocaleString()}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}