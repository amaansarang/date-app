
import React from 'react';
import { Triangle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-8">
      <div className="container max-w-5xl text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <a 
            href="/admin"
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <Triangle className="h-8 w-8 text-blue-500 rotate-180 animate-pulse hover:text-blue-400" />
          </a>
          <div className="text-center">
            <p>© {new Date().getFullYear()} Mew Meow Records. All rights reserved.</p>
            <p className="mt-1">The Date App. By Amaan.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
