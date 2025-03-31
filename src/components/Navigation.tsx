
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { 
  Home, 
  Calendar, 
  Brain, 
  Heart, 
  Activity,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const Navigation: React.FC = () => {
  const navItems: NavItem[] = [
    { 
      icon: <Home size={20} />, 
      label: "Home", 
      href: "#home", 
      active: true 
    },
    { 
      icon: <Calendar size={20} />, 
      label: "Check-in", 
      href: "#check-in" 
    },
    { 
      icon: <Brain size={20} />, 
      label: "Activities", 
      href: "#activities" 
    },
    { 
      icon: <Heart size={20} />, 
      label: "Relax", 
      href: "#relax" 
    },
    { 
      icon: <Activity size={20} />, 
      label: "Progress", 
      href: "#progress" 
    },
  ];

  return (
    <div className="w-full px-4 py-4 bg-background/95 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              size="sm"
              asChild
              className="gap-2"
            >
              <a href={item.href}>
                {item.icon}
                {item.label}
              </a>
            </Button>
          ))}
        </div>
        
        {/* Profile Button */}
        <Button variant="ghost" size="icon" className="rounded-full">
          <User size={20} />
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-around pt-2">
        {navItems.map((item) => (
          <a 
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center text-xs",
              item.active 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
