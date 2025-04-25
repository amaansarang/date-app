
import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4">
      <div className="container max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="text-date-pink h-6 w-6 fill-date-pink" />
          <h1 className="font-playfair text-xl font-bold">Date Night Adventures</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
