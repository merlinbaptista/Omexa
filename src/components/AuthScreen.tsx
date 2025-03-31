
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { Google } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Please enter a valid age',
  }),
});

interface AuthScreenProps {
  onComplete: (name: string, age: number) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onComplete }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Save to localStorage for persistence
    localStorage.setItem('userProfile', JSON.stringify({
      name: values.name,
      age: Number(values.age),
      joinedAt: new Date().toISOString(),
    }));
    
    toast({
      title: "Welcome to Omexa!",
      description: `It's wonderful to meet you, ${values.name}!`,
    });
    
    onComplete(values.name, Number(values.age));
  };

  const handleGoogleSignIn = () => {
    setIsSigningIn(true);
    // Simulate Google sign-in process
    setTimeout(() => {
      setIsSigningIn(false);
      toast({
        title: "Google Sign-In Simulated",
        description: "This would connect to Google in a real application.",
      });
      // Use a placeholder name and age
      onComplete("Friend", 25);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo className="scale-110" />
            </div>
            <CardTitle className="text-2xl">Welcome to Omexa</CardTitle>
            <CardDescription>
              Your personal AI companion for growth and wellbeing
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Age</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Get Started
                </Button>
              </form>
            </Form>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleSignIn} 
              disabled={isSigningIn}
            >
              <Google className="mr-2 h-4 w-4" />
              {isSigningIn ? "Signing in..." : "Sign in with Google"}
            </Button>
          </CardContent>
          
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
