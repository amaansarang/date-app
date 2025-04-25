
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'amazayn') {
      navigate('/admin-dashboard');
    } else {
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
            Welcome Back Sir
          </h1>
          <div className="mt-4 text-blue-500 animate-glow">
            <div className="w-16 h-16 border-4 border-current rounded-full border-t-transparent animate-spin mx-auto"></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-blue-500 focus:outline-none"
            placeholder="Enter Access Code"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Access Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
