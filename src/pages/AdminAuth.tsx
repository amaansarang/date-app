
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const AdminAuth = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'amazayn') {
      navigate('/admin-dashboard');
    } else {
      setPassword('');
      toast.error("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-slate-800/50 p-8 rounded-lg border border-blue-500/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg animate-pulse"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
              Welcome Back Sir
            </h1>
            <div className="mt-4">
              <div className="w-16 h-16 mx-auto">
                <div className="w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-slate-800/80 text-white border border-blue-500/30 focus:border-blue-500 focus:outline-none backdrop-blur-sm"
                placeholder="Enter Access Code"
              />
              <div className="absolute inset-0 bg-blue-500/5 rounded animate-pulse pointer-events-none"></div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">Access Admin</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
