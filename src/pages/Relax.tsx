
import React from 'react';
import Navigation from '@/components/Navigation';
import BreathingExercise from '@/components/BreathingExercise';
import SimpleGame from '@/components/SimpleGame';
import { BookHeart } from 'lucide-react';

const Relax = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container px-4 py-6 mx-auto max-w-6xl animate-fade-in">
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
    </div>
  );
};

export default Relax;
