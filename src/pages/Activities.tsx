
import React from 'react';
import Navigation from '@/components/Navigation';
import ConfidenceExercise from '@/components/ConfidenceExercise';
import QuizCard from '@/components/QuizCard';
import MemoryPatchGame from '@/components/MemoryPatchGame';
import ProgressTracker from '@/components/ProgressTracker';
import { getRandomQuiz } from '@/utils/quizData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain } from 'lucide-react';

const Activities = () => {
  const [randomQuiz, setRandomQuiz] = React.useState(() => getRandomQuiz());

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-6 mx-auto max-w-6xl">
        <section id="activities" className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Activities & Exercises</h2>
          </div>
          
          <Tabs defaultValue="confidence" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="confidence">Confidence Building</TabsTrigger>
              <TabsTrigger value="quiz">Quiz Yourself</TabsTrigger>
              <TabsTrigger value="memory">Memory Games</TabsTrigger>
              <TabsTrigger value="progress">Track Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="confidence" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <ConfidenceExercise />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Why This Works</h3>
                  <p className="text-muted-foreground">
                    This exercise uses evidence-based techniques from cognitive behavioral therapy to help reframe negative thoughts, build on your existing strengths, and visualize success.
                  </p>
                  <p className="text-muted-foreground">
                    Regular practice of these exercises can help reduce anxiety about public speaking and performance situations by creating new neural pathways.
                  </p>
                  <Button className="mt-2">Try Another Exercise</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="quiz" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <QuizCard 
                  question={randomQuiz.question}
                  description={randomQuiz.description}
                  options={randomQuiz.options}
                  correctOptionId={randomQuiz.correctOptionId}
                  explanation={randomQuiz.explanation}
                />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Learn Through Reflection</h3>
                  <p className="text-muted-foreground">
                    These quizzes help you explore concepts related to confidence, mindset, and emotional wellbeing.
                  </p>
                  <p className="text-muted-foreground">
                    Each question is designed to make you reflect on helpful strategies and approaches that can support your personal growth.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Button variant="outline" onClick={() => setRandomQuiz(getRandomQuiz('confidence'))}>
                      Confidence Questions
                    </Button>
                    <Button variant="outline" onClick={() => setRandomQuiz(getRandomQuiz('mindset'))}>
                      Mindset Questions
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="memory" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <MemoryPatchGame />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Boost Cognitive Function</h3>
                  <p className="text-muted-foreground">
                    Memory games help improve focus, concentration, and cognitive abilities.
                  </p>
                  <p className="text-muted-foreground">
                    Regular practice can enhance your short-term memory and help you stay mentally sharp,
                    which contributes to better performance in presentations, interviews, and daily tasks.
                  </p>
                  <Button className="mt-2">Try Different Game</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="progress">
              <div className="grid gap-6 md:grid-cols-2">
                <ProgressTracker />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Your Journey Matters</h3>
                  <p className="text-muted-foreground">
                    Tracking your progress helps reinforce positive habits and provides motivation to continue your personal growth journey.
                  </p>
                  <p className="text-muted-foreground">
                    Omexa helps you visualize your consistency and improvement over time, making it easier to stay committed to your wellbeing.
                  </p>
                  <Button className="mt-2">View Detailed Stats</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Activities;
