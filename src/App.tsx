
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Activities from "./pages/Activities";
import Relax from "./pages/Relax";
import Chat from "./pages/Chat";
import Reminders from "./pages/Reminders";
import NotFound from "./pages/NotFound";
import AuthScreen from "./components/AuthScreen";

const queryClient = new QueryClient();

interface UserProfile {
  name: string;
  age: number;
  joinedAt: string;
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Check if user has already authenticated before
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleAuthComplete = (name: string, age: number) => {
    setUserProfile({
      name,
      age,
      joinedAt: new Date().toISOString()
    });
    setIsAuthenticated(true);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {!isAuthenticated && (
          <AuthScreen onComplete={handleAuthComplete} />
        )}
        
        <div className="bg-gradient-animation min-h-screen">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index userProfile={userProfile} />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/relax" element={<Relax />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/reminders" element={<Reminders />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
