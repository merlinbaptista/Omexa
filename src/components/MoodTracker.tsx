
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Meh, Frown, ThumbsUp, Coffee, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface MoodOption {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const moods: MoodOption[] = [
    { icon: <Smile size={28} />, label: "Happy", value: "happy" },
    { icon: <Meh size={28} />, label: "Okay", value: "okay" },
    { icon: <Frown size={28} />, label: "Down", value: "down" },
    { icon: <ThumbsUp size={28} />, label: "Confident", value: "confident" },
    { icon: <Coffee size={28} />, label: "Tired", value: "tired" },
    { icon: <Heart size={28} />, label: "Loved", value: "loved" },
  ];

  const handleMoodSelect = (value: string) => {
    setSelectedMood(value);
  };

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Mood selection required",
        description: "Please select how you're feeling today.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitted(true);
    toast({
      title: "Daily check-in complete!",
      description: "Thanks for sharing how you're feeling today.",
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-bounce-in">
      <CardHeader>
        <CardTitle className="text-xl">
          {isSubmitted ? "Thanks for checking in!" : `${getGreeting()}! How are you feeling today?`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood.value}
                variant={selectedMood === mood.value ? "default" : "outline"}
                className={cn(
                  "flex flex-col h-20 gap-1",
                  selectedMood === mood.value ? "bg-primary/90" : ""
                )}
                onClick={() => handleMoodSelect(mood.value)}
              >
                {mood.icon}
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-lg font-medium">
              {selectedMood === "happy" && "It's great to see you happy!"}
              {selectedMood === "okay" && "Having an okay day is perfectly fine."}
              {selectedMood === "down" && "I'm here for you on the tougher days."}
              {selectedMood === "confident" && "That confidence will take you far!"}
              {selectedMood === "tired" && "Remember to take breaks and rest well."}
              {selectedMood === "loved" && "That warm feeling is so important!"}
            </p>
            <p className="mt-2 text-muted-foreground">Check back tomorrow for your next daily check-in!</p>
          </div>
        )}
      </CardContent>
      {!isSubmitted && (
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={!selectedMood}
          >
            Submit
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MoodTracker;
