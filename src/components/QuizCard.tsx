
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  text: string;
}

interface QuizCardProps {
  question: string;
  description?: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  description,
  options,
  correctOptionId,
  explanation,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedOptionId === correctOptionId;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "p-3 rounded-md border cursor-pointer transition-all",
                selectedOptionId === option.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50",
                isSubmitted && option.id === correctOptionId
                  ? "border-green-500 bg-green-50"
                  : "",
                isSubmitted && selectedOptionId === option.id && !isCorrect
                  ? "border-red-500 bg-red-50"
                  : ""
              )}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex justify-between items-center">
                <span>{option.text}</span>
                {isSubmitted && option.id === correctOptionId && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {isSubmitted && selectedOptionId === option.id && !isCorrect && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>

        {isSubmitted && (
          <div className={cn(
            "p-4 rounded-md text-sm",
            isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          )}>
            <p className="font-medium mb-1">
              {isCorrect ? "Correct!" : "Not quite."}
            </p>
            <p>{explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedOptionId}
            className="w-full"
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            onClick={handleReset}
            variant="outline" 
            className="w-full"
          >
            Try Another Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
