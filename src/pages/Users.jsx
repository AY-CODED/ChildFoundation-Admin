// src/pages/Users.jsx
import { useState, useEffect } from "react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const baseURL = "https://childfoundation-backend.onrender.com/api";

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${baseURL}/users`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                const sortedUsers = [...data].sort((a, b) => {
                    if (a.email === "admin@ymch.com") return -1;
                    if (b.email === "admin@ymch.com") return 1;
                    return 0;
                });
                setUsers(sortedUsers);
                setLoading(false);
            } else {
                setError("Failed to load users.");
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to load users.");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`${baseURL}/users/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== id)
                );
                alert("User deleted successfully.");
            } else {
                alert("Failed to delete user.");
            }
        } catch (err) {
            alert("Failed to delete user.");
        }
    };

    if (loading) {
        return (
            <div className="p-6 text-center text-lg">
                Loading users...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Registered Users
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={`border-b hover:bg-gray-100 ${
                                        user.email === "admin@ymch.com"
                                            ? "bg-blue-50"
                                            : ""
                                    }`}
                                >
                                    <td className="px-6 py-4 font-semibold">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 font-semibold">
                                        {user.username || user.fullname || user.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {user.email === "admin@ymch.com" ? (
                                            <button
                                                disabled
                                                className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
                                            >
                                                Protected
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-6 text-center text-gray-500"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}