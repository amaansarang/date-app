import React, { useState } from 'react';
import { Heart, Instagram } from 'lucide-react';
import { HeartGame } from './HeartGame';

const Header: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return <header className="w-full py-4 bg-slate-900">
      <div className="container max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart 
            className="text-blue-500 h-6 w-6 cursor-pointer hover:text-pink-500 transition-colors" 
            onClick={() => setIsGameOpen(true)}
          />
          <HeartGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
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
        </div>
      </div>
    </header>;
};
export default Header;