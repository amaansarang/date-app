
import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 bg-slate-900">
      <div className="container max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="text-blue-500 h-6 w-6" />
          <h1 className="font-poppins text-xl font-bold text-white">The Date App</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
