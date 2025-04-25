import React from 'react';
import { Heart, Instagram } from 'lucide-react';
const Header: React.FC = () => {
  return <header className="w-full py-4 bg-slate-900">
      <div className="container max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="text-blue-500 h-6 w-6" />
          <h1 className="font-poppins text-xl text-white font-normal flex items-baseline gap-2">
            The Date App
            <span className="text-xs text-gray-400">By Amaan</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://instagram.com/amaaannsarang" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="/admin"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Admin
          </a>
        </div>
      </div>
    </header>;
};
export default Header;