
import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-8">
      <div className="container max-w-5xl text-sm text-muted-foreground">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p>© {new Date().getFullYear()} Mew Meow Records. All rights reserved.</p>
            <p className="mt-1">The Date App. By Amaan.</p>
          </div>
          <a 
            href="https://instagram.com/amaaannsarang" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
