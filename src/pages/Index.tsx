
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import MoodTracker from '@/components/MoodTracker';
import AdviceCard from '@/components/AdviceCard';
import { getRandomAdvice } from '@/utils/adviceData';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, BookHeart, Calendar, MessageCircle } from 'lucide-react';
import OmexaChat from '@/components/OmexaChat';

const Index = () => {
  const [advice, setAdvice] = React.useState(() => getRandomAdvice(3));
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  useEffect(() => {
    document.title = "Omexa - Your AI Companion";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-6 mx-auto max-w-6xl">
        {/* Hero Section */}
        <section id="home" className="mb-12 text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient-shift">
            Welcome to Omexa
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI companion for personal growth, confidence building, and everyday wellbeing.
          </p>
        </section>
        
        {/* Feature Cards */}
        <section className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/chat" className="block">
            <div className="bg-muted/50 hover:bg-muted/80 transition-colors rounded-lg p-6 h-full border">
              <MessageCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Personal Chat</h3>
              <p className="text-muted-foreground">
                Talk to Omexa about anything - your AI companion is here to support and motivate you.
              </p>
            </div>
          </Link>
          
          <Link to="/reminders" className="block">
            <div className="bg-muted/50 hover:bg-muted/80 transition-colors rounded-lg p-6 h-full border">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Smart Reminders</h3>
              <p className="text-muted-foreground">
                Set reminders for important events, practice sessions, or self-care activities.
              </p>
            </div>
          </Link>
          
          <Link to="/activities" className="block">
            <div className="bg-muted/50 hover:bg-muted/80 transition-colors rounded-lg p-6 h-full border">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Activities</h3>
              <p className="text-muted-foreground">
                Build confidence, quiz yourself, play memory games, and track your progress.
              </p>
            </div>
          </Link>
          
          <Link to="/relax" className="block">
            <div className="bg-muted/50 hover:bg-muted/80 transition-colors rounded-lg p-6 h-full border">
              <BookHeart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Relax & Recharge</h3>
              <p className="text-muted-foreground">
                Breathing exercises and simple games to help you relax and recharge.
              </p>
            </div>
          </Link>
        </section>
        
        {/* Daily Check-in Section */}
        <section id="check-in" className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">{getGreeting()}</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <MoodTracker />
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Personalized For You</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {advice.map((item) => (
                  <AdviceCard 
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    tags={item.tags}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Chat Preview */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Quick Chat</h2>
            </div>
            <Button asChild>
              <Link to="/chat">Full Chat Experience</Link>
            </Button>
          </div>
          
          <OmexaChat />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/b892df5e-8b69-44ce-9072-53a4ed452941.png" 
                alt="Omexa" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-lg font-bold">Omexa</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your companion for personal growth and wellbeing
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
