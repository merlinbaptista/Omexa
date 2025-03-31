
import React from 'react';
import Navigation from '@/components/Navigation';
import OmexaChat from '@/components/OmexaChat';
import { MessageCircle } from 'lucide-react';

const Chat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-6 mx-auto max-w-6xl">
        <section id="chat-assistant" className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Your Personal AI Companion</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Talk to Omexa</h3>
              <p className="text-muted-foreground">
                Omexa is here to support you through any situation, whether you need advice, 
                emotional support, or just a friendly chat. I can help with:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="h-4 w-4 mt-1 text-primary">✨</span>
                  <span>Daily motivation and confidence building</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-4 w-4 mt-1 text-primary">🧠</span>
                  <span>Advice for overcoming stage fright and anxiety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-4 w-4 mt-1 text-primary">❤️</span>
                  <span>Personalized resources and articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-4 w-4 mt-1 text-primary">📅</span>
                  <span>Emergency support when you need it most</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground italic">
                Try voice input by clicking the microphone button and speak naturally - Omexa will analyze your 
                tone and respond appropriately.
              </p>
            </div>
            
            <OmexaChat />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Chat;
