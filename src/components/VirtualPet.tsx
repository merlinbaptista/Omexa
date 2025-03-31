
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, Coffee, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PetStats {
  happiness: number;
  energy: number;
  growth: number;
  lastInteraction: string;
}

const defaultStats: PetStats = {
  happiness: 70,
  energy: 80,
  growth: 10,
  lastInteraction: new Date().toISOString()
};

const VirtualPet: React.FC = () => {
  const [petName, setPetName] = useState('Biscuit');
  const [stats, setStats] = useState<PetStats>(defaultStats);
  const [level, setLevel] = useState(1);
  const { toast } = useToast();

  // Load saved pet stats from localStorage on mount
  useEffect(() => {
    const savedPet = localStorage.getItem('omexaPet');
    const savedPetName = localStorage.getItem('omexaPetName');
    
    if (savedPet) {
      setStats(JSON.parse(savedPet));
    }
    
    if (savedPetName) {
      setPetName(savedPetName);
    }
    
    // Calculate level based on growth
    if (savedPet) {
      const parsedStats = JSON.parse(savedPet);
      setLevel(Math.floor(parsedStats.growth / 10) + 1);
    }
  }, []);

  // Save pet stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('omexaPet', JSON.stringify(stats));
    localStorage.setItem('omexaPetName', petName);
  }, [stats, petName]);

  // Decay stats over time (simulate pet needs attention)
  useEffect(() => {
    const lastInteraction = new Date(stats.lastInteraction);
    const now = new Date();
    const hoursSinceLastInteraction = Math.floor((now.getTime() - lastInteraction.getTime()) / (1000 * 60 * 60));
    
    if (hoursSinceLastInteraction > 6) {
      // Decay happiness and energy if it's been more than 6 hours
      setStats(prev => ({
        ...prev,
        happiness: Math.max(prev.happiness - hoursSinceLastInteraction, 10),
        energy: Math.max(prev.energy - hoursSinceLastInteraction, 10),
        lastInteraction: now.toISOString()
      }));
    }
  }, []);

  const playWithPet = () => {
    if (stats.energy < 20) {
      toast({
        title: `${petName} is too tired!`,
        description: "Try feeding them first to restore energy.",
        variant: "destructive"
      });
      return;
    }
    
    setStats(prev => ({
      ...prev,
      happiness: Math.min(prev.happiness + 15, 100),
      energy: Math.max(prev.energy - 10, 0),
      growth: Math.min(prev.growth + 2, 100),
      lastInteraction: new Date().toISOString()
    }));
    
    toast({
      title: `${petName} loves playing with you!`,
      description: "Their happiness increased."
    });
    
    updateLevel();
  };

  const feedPet = () => {
    setStats(prev => ({
      ...prev,
      happiness: Math.min(prev.happiness + 5, 100),
      energy: Math.min(prev.energy + 20, 100),
      growth: Math.min(prev.growth + 1, 100),
      lastInteraction: new Date().toISOString()
    }));
    
    toast({
      title: `${petName} enjoyed their meal!`,
      description: "Their energy has been restored."
    });
    
    updateLevel();
  };

  const restPet = () => {
    setStats(prev => ({
      ...prev,
      energy: 100,
      lastInteraction: new Date().toISOString()
    }));
    
    toast({
      title: `${petName} is well rested now!`,
      description: "Their energy is fully restored."
    });
  };

  const updateLevel = () => {
    const newLevel = Math.floor(stats.growth / 10) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      toast({
        title: "Level Up!",
        description: `${petName} has grown to level ${newLevel}!`,
        variant: "default"
      });
    }
  };

  // Determine pet emoji based on level
  const getPetEmoji = () => {
    if (level < 3) return "🐣"; // Baby
    if (level < 6) return "🐥"; // Young
    if (level < 8) return "🐤"; // Teen
    return "🐔"; // Adult
  };

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="text-amber-400" />
          Your Virtual Pet
        </CardTitle>
        <CardDescription>
          Take care of {petName} to help them grow!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl mb-2 animate-bounce">
            {getPetEmoji()}
          </div>
          <div className="text-lg font-medium">{petName}</div>
          <div className="text-xs text-muted-foreground">Level {level}</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-sm">Happiness</span>
            </div>
            <span className="text-xs">{stats.happiness}%</span>
          </div>
          <Progress value={stats.happiness} className="h-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-amber-600" />
              <span className="text-sm">Energy</span>
            </div>
            <span className="text-xs">{stats.energy}%</span>
          </div>
          <Progress value={stats.energy} className="h-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm">Growth</span>
            </div>
            <span className="text-xs">{stats.growth}%</span>
          </div>
          <Progress value={stats.growth} className="h-2" />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2">
        <Button onClick={playWithPet} size="sm" variant="outline" className="flex-1">
          Play
        </Button>
        <Button onClick={feedPet} size="sm" variant="outline" className="flex-1">
          Feed
        </Button>
        <Button onClick={restPet} size="sm" variant="outline" className="flex-1">
          Rest
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VirtualPet;
