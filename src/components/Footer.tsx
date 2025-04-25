
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-8">
      <div className="container max-w-5xl text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Date Night Adventures. All rights reserved.</p>
        <p className="mt-1">Choose your perfect date experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
