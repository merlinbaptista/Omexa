
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(0);

  // Phase durations in seconds
  const phaseDurations = {
    inhale: 4,
    hold: 7,
    exhale: 8,
  };

  // Total cycle duration
  const totalDuration = phaseDurations.inhale + phaseDurations.hold + phaseDurations.exhale;

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 0.1;
          
          // Determine the current phase based on timer
          if (newTimer < phaseDurations.inhale) {
            setPhase('inhale');
          } else if (newTimer < phaseDurations.inhale + phaseDurations.hold) {
            setPhase('hold');
          } else {
            setPhase('exhale');
          }
          
          // Calculate overall progress percentage
          const progressValue = (newTimer / totalDuration) * 100;
          setProgress(progressValue > 100 ? 100 : progressValue);
          
          // Reset timer after a complete cycle
          if (newTimer >= totalDuration) {
            return 0;
          }
          return newTimer;
        });
      }, 100);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  const toggleExercise = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimer(0);
      setPhase('inhale');
      setProgress(0);
    }
  };

  const getInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly through your nose...';
      case 'hold':
        return 'Hold your breath gently...';
      case 'exhale':
        return 'Exhale slowly through your mouth...';
    }
  };

  const getCircleSize = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-100';
      case 'hold':
        return 'scale-100';
      case 'exhale':
        return 'scale-90';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Calm Breathing</CardTitle>
        <CardDescription>
          Follow this guided breathing exercise to help reduce anxiety and promote relaxation.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-6">
          <div
            className={cn(
              "h-48 w-48 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center transition-all duration-1000",
              getCircleSize()
            )}
          >
            <div
              className={cn(
                "h-40 w-40 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40 flex items-center justify-center transition-all duration-1000",
                getCircleSize()
              )}
            >
              <div
                className={cn(
                  "h-32 w-32 rounded-full bg-gradient-to-r from-primary/60 to-secondary/60 flex items-center justify-center text-xl font-medium text-white transition-all duration-1000",
                  getCircleSize()
                )}
              >
                {phase}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg text-center mb-4">
          {isActive ? getInstructions() : "Press start to begin the breathing exercise"}
        </p>
        
        {isActive && (
          <Progress 
            value={progress} 
            className="w-full h-2 mb-4" 
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          onClick={toggleExercise}
          className="min-w-32"
        >
          {isActive ? "Stop" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BreathingExercise;
