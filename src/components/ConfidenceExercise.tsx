
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, ArrowRight, MoveRight } from 'lucide-react';

interface Step {
  title: string;
  instruction: string;
  prompt?: string;
  placeholder?: string;
}

const ConfidenceExercise: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const steps: Step[] = [
    {
      title: "Identify Your Strengths",
      instruction: "List 3 things you're good at or proud of achieving.",
      placeholder: "I'm good at listening to others, I completed a challenging project last month..."
    },
    {
      title: "Challenge Negative Thoughts",
      instruction: "Write down a negative thought you have about public speaking or performing.",
      prompt: "When I think about speaking in front of others, I worry that...",
      placeholder: "I'll forget what to say, people will judge me..."
    },
    {
      title: "Reframe Your Thought",
      instruction: "Now, rewrite that thought in a more positive, realistic way.",
      prompt: "A more balanced way to think about this is...",
      placeholder: "I've prepared well and can refer to my notes if needed..."
    },
    {
      title: "Visualization",
      instruction: "Describe how you would confidently handle your next presentation or performance.",
      placeholder: "I'll arrive early to set up, take deep breaths before starting, focus on my message..."
    },
  ];

  const handleNextStep = () => {
    if (currentResponse.trim() === '') return;
    
    const newResponses = [...responses];
    newResponses[currentStep] = currentResponse;
    setResponses(newResponses);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentResponse('');
    } else {
      setIsComplete(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentResponse(responses[currentStep - 1] || '');
    }
  };

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentResponse(e.target.value);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setResponses([]);
    setCurrentResponse('');
    setIsComplete(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Confidence Builder</CardTitle>
        <CardDescription>
          Complete this step-by-step exercise to build your confidence and reduce stage fear.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isComplete ? (
          <div className="space-y-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span className="text-muted-foreground">{Math.round(((currentStep + 1) / steps.length) * 100)}% complete</span>
            </div>
            
            <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium">{steps[currentStep].title}</h3>
              <p className="text-muted-foreground mb-4">{steps[currentStep].instruction}</p>
              
              {steps[currentStep].prompt && (
                <p className="mb-2 text-sm font-medium">{steps[currentStep].prompt}</p>
              )}
              
              <Textarea
                value={currentResponse}
                onChange={handleResponseChange}
                placeholder={steps[currentStep].placeholder}
                className="min-h-32"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4 text-green-800 flex items-start gap-3 mb-6">
              <Check className="h-5 w-5 mt-0.5 text-green-600" />
              <div>
                <h3 className="font-medium">Exercise Completed!</h3>
                <p className="text-sm">Great job completing this confidence-building exercise!</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-sm font-medium">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{responses[index]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isComplete ? (
          <>
            <Button 
              variant="ghost" 
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button 
              onClick={handleNextStep}
              disabled={currentResponse.trim() === ''}
              className="gap-1"
            >
              {currentStep < steps.length - 1 ? (
                <>Next <ArrowRight size={16} /></>
              ) : (
                <>Complete <Check size={16} /></>
              )}
            </Button>
          </>
        ) : (
          <Button 
            onClick={handleReset} 
            className="w-full"
          >
            Start New Exercise
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ConfidenceExercise;
