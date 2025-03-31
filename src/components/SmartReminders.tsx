
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Check, Plus, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface Reminder {
  id: string;
  text: string;
  category: 'task' | 'goal' | 'motivation';
  completed: boolean;
}

const SmartReminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', text: 'Practice deep breathing for 5 minutes', category: 'motivation', completed: false },
    { id: '2', text: 'Prepare talking points for meeting', category: 'task', completed: false },
    { id: '3', text: 'Complete one public speaking exercise', category: 'goal', completed: true },
  ]);
  const [newReminder, setNewReminder] = useState('');
  const [category, setCategory] = useState<'task' | 'goal' | 'motivation'>('task');

  const addReminder = () => {
    if (!newReminder.trim()) return;
    
    const reminder: Reminder = {
      id: Date.now().toString(),
      text: newReminder,
      category,
      completed: false
    };
    
    setReminders([...reminders, reminder]);
    setNewReminder('');
    
    toast({
      title: "Reminder added",
      description: "Your new reminder has been added successfully.",
    });
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed } 
        : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'task': return 'bg-blue-100 text-blue-800';
      case 'goal': return 'bg-green-100 text-green-800';
      case 'motivation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock size={20} className="text-primary" />
          Smart Reminders
        </CardTitle>
        <CardDescription>
          Set reminders for tasks, goals, and motivational activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new reminder..."
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            className="flex-grow"
            onKeyDown={(e) => e.key === 'Enter' && addReminder()}
          />
          <Button onClick={addReminder} size="icon">
            <Plus size={16} />
          </Button>
        </div>
        
        <div className="flex gap-2 justify-start">
          <Badge 
            variant={category === 'task' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setCategory('task')}
          >
            Tasks
          </Badge>
          <Badge 
            variant={category === 'goal' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setCategory('goal')}
          >
            Goals
          </Badge>
          <Badge 
            variant={category === 'motivation' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setCategory('motivation')}
          >
            Motivation
          </Badge>
        </div>
        
        <div className="space-y-2 mt-4">
          {reminders.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No reminders yet. Add one above!</p>
          ) : (
            reminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className={`flex items-center justify-between p-3 rounded-md ${reminder.completed ? 'bg-muted/50' : 'bg-card'} border`}
              >
                <div className="flex gap-2 items-center flex-1">
                  <Switch 
                    checked={reminder.completed}
                    onCheckedChange={() => toggleReminder(reminder.id)}
                  />
                  <div className="flex-1">
                    <p className={`${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {reminder.text}
                    </p>
                    <Badge variant="outline" className={`text-xs mt-1 ${getCategoryColor(reminder.category)}`}>
                      {reminder.category}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => deleteReminder(reminder.id)}
                >
                  <X size={14} />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {reminders.filter(r => r.completed).length} of {reminders.length} completed
        </p>
      </CardFooter>
    </Card>
  );
};

export default SmartReminders;
