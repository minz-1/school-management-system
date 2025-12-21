
import React, { useState } from 'react';
import { GraduationCap, User } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await onLogin(username, password);

      if (!result || !result.success) {
        setError(result?.message || 'Login failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <div className="inline-flex p-3 bg-white/20 rounded-xl mb-4 text-white backdrop-blur-sm">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">EduNexus</h1>
          <p className="text-indigo-100">School Management System</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sign in</h2>
              <p className="text-sm text-gray-500">Use your school account</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Enter username ....."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder=" Enter password ....."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
          </form>

         
          <div className="text-xs text-gray-500 bg-slate-50 border border-dashed border-slate-200 rounded-lg p-3 space-y-1">
            <p className="font-semibold text-gray-700 mb-1">Demo Accounts:</p>
            <p>Admin → <code>admin@edu.pk / admin123</code></p>
            <p>Teacher → <code>hasan@edu.pk/ hasan123</code></p>
            <p>Student → <code>ali@edu.pk/ ali123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
