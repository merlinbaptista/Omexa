
import React from 'react';
import { cn } from '@/lib/utils';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/lovable-uploads/b892df5e-8b69-44ce-9072-53a4ed452941.png" 
        alt="Omexa" 
        className="h-10 w-auto"
      />
      <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Omexa
      </span>
    </div>
  );
};

export default Logo;
