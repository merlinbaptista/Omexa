
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Brain, 
  Heart, 
  Activity,
  User,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarContent, 
  MenubarItem, 
  MenubarSeparator 
} from '@/components/ui/menubar';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { 
      icon: <Home size={20} />, 
      label: "Home", 
      href: "/" 
    },
    { 
      icon: <MessageCircle size={20} />, 
      label: "Chat", 
      href: "/chat" 
    },
    { 
      icon: <Calendar size={20} />, 
      label: "Reminders", 
      href: "/reminders" 
    },
    { 
      icon: <Brain size={20} />, 
      label: "Activities", 
      href: "/activities" 
    },
    { 
      icon: <Heart size={20} />, 
      label: "Relax", 
      href: "/relax" 
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
              variant={location.pathname === item.href ? "default" : "ghost"}
              size="sm"
              asChild
              className="gap-2"
            >
              <Link to={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
          
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer">
                <Activity size={20} />
                <span className="ml-2">More</span>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link to="/progress" className="flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Progress</span>
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Settings</MenubarItem>
                <MenubarItem>Help & Support</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        
        {/* Profile Button */}
        <Button variant="ghost" size="icon" className="rounded-full">
          <User size={20} />
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-around pt-2">
        {navItems.map((item) => (
          <Link 
            key={item.label}
            to={item.href}
            className={cn(
              "flex flex-col items-center text-xs",
              location.pathname === item.href
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
