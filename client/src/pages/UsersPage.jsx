import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const userId = user._id;

  useEffect(() => {
    api
      .get("/api/v1/users/all")
      .then((res) => setUsers(res.data.users))
      .catch((err) => alert("Access Denied"));
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete user?")) {
      await api.delete(`/api/v1/users/delete/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="w-full border-collapse border">
        <thead className="bg-red-500">
          <tr>
            <th className="border p-2 text-white">S.No.</th>
            <th className="border p-2 text-white">Name</th>
            <th className="border p-2 text-white">Email</th>
            <th className="border p-2 text-white">Role</th>
            {user.role === "admin" && (
              <th className="border p-2 text-white">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u._id}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2 text-center">{u.name}</td>
              <td className="border p-2 text-center">{u.email}</td>
              <td className="border p-2 text-center">{u.role}</td>
              {user.role === "admin" && userId !== u._id && (
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 text-white px-4 py-2 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
