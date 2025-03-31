
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import MoodTracker from '@/components/MoodTracker';
import AdviceCard from '@/components/AdviceCard';
import BreathingExercise from '@/components/BreathingExercise';
import SimpleGame from '@/components/SimpleGame';
import ProgressTracker from '@/components/ProgressTracker';
import QuizCard from '@/components/QuizCard';
import ConfidenceExercise from '@/components/ConfidenceExercise';
import { getRandomAdvice } from '@/utils/adviceData';
import { getRandomQuiz } from '@/utils/quizData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Brain, BookHeart, Calendar, MessageCircle } from 'lucide-react';

// Import new components
import SmartReminders from '@/components/SmartReminders';
import ChatStickers from '@/components/ChatStickers';
import MemoryPatchGame from '@/components/MemoryPatchGame';
import VisualMoodTracker from '@/components/VisualMoodTracker';

const Index = () => {
  const [advice, setAdvice] = useState(() => getRandomAdvice(3));
  const [randomQuiz, setRandomQuiz] = useState(() => getRandomQuiz());
  
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
        
        {/* Daily Check-in Section */}
        <section id="check-in" className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">{getGreeting()}</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <MoodTracker />
              <VisualMoodTracker />
            </div>
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
        
        {/* Smart Reminders Section */}
        <section id="reminders" className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Smart Reminders</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <SmartReminders />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Stay on Track</h3>
              <p className="text-muted-foreground">
                Smart Reminders help you keep track of your tasks, goals, and motivational activities. 
                Set reminders for important events, practice sessions, or self-care activities.
              </p>
              <p className="text-muted-foreground">
                Omexa will help you manage your time and priorities, ensuring you stay focused on 
                your personal growth journey.
              </p>
            </div>
          </div>
        </section>
        
        {/* Interactive Companion Section */}
        <section id="companion" className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Interactive Companion</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Express Yourself</h3>
              <p className="text-muted-foreground">
                Make your conversations with Omexa more lively and expressive with Chat Stickers and Reactions.
              </p>
              <p className="text-muted-foreground">
                These interactive elements help create a more personalized and engaging experience, 
                making your journey with Omexa more enjoyable.
              </p>
            </div>
            <ChatStickers />
          </div>
        </section>
        
        {/* Activities Section */}
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
        
        {/* Relax Section */}
        <section id="relax" className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <BookHeart className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Relax & Recharge</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <BreathingExercise />
            <SimpleGame />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
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
