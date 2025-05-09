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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-slate-900/50 p-8 rounded-lg border border-blue-500/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-lg animate-[pulse_1.5s_ease-in-out_infinite]"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2">
              <div className="w-4 h-16 bg-blue-500 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
              <div className="w-4 h-16 bg-cyan-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-16 bg-blue-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 relative">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-slate-800/80 text-cyan-400 border border-cyan-500/30 focus:border-cyan-500 focus:outline-none backdrop-blur-sm placeholder-cyan-600/50"
                placeholder="Enter Access Code"
              />
              <div className="cyber-line"></div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-cyan-600/20 text-cyan-400 rounded hover:bg-cyan-700/30 transition-colors relative overflow-hidden group border border-cyan-500/50"
            >
              <span className="relative z-10">Access Admin</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;