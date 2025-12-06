import React, { useState } from 'react';

const ROLES = ['admin', 'teacher', 'student'];

const AdminUserManagement = ({ users, setUsers }) => {
  const [form, setForm] = useState({
    username: '',
    fullName: '',
    password: '',
    role: 'teacher'
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const trimmedUsername = form.username.trim();
    const trimmedFullName = form.fullName.trim();

    if (!trimmedUsername || !trimmedFullName || !form.password) {
      setError('All fields are required.');
      return;
    }

    const exists = users.some(
      (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase()
    );
    if (exists) {
      setError('Username already exists.');
      return;
    }

    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    setUsers([
      ...users,
      {
        id: nextId,
        username: trimmedUsername,
        fullName: trimmedFullName,
        password: form.password,
        role: form.role
      }
    ]);

    setForm({
      username: '',
      fullName: '',
      password: '',
      role: 'teacher'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">User Accounts</h2>
          <p className="text-sm text-slate-500">
            Admin can create login credentials for teachers and students here.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm"
        >
          <h3 className="text-base font-semibold text-slate-900">Create New User</h3>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="e.g. teacher2"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Temporary password"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-indigo-700"
          >
            Create User
          </button>
        </form>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 mb-3">Existing Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-200">
                  <th className="py-2 pr-4">Username</th>
                  <th className="py-2 pr-4">Full Name</th>
                  <th className="py-2 pr-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 font-mono text-xs">{u.username}</td>
                    <td className="py-2 pr-4">{u.fullName}</td>
                    <td className="py-2 pr-4 capitalize">{u.role}</td>
                  </tr>
                ))}
                {!users.length && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-slate-400">
                      No users yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Passwords are stored only in memory for demo purposes. Do not use real passwords.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
