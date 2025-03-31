
import React from 'react';
import Navigation from '@/components/Navigation';
import SmartReminders from '@/components/SmartReminders';
import { Calendar } from 'lucide-react';

const Reminders = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-6 mx-auto max-w-6xl">
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
      </main>
    </div>
  );
};

export default Reminders;
