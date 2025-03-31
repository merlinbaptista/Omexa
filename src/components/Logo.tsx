
import React from 'react';
import { cn } from '@/lib/utils';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/logo.png" 
        alt="Omexa" 
        className="h-10 w-auto animate-float"
      />
      <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Omexa
      </span>
    </div>
  );
};

export default Logo;
