
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Heart, Frown, Meh, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface MoodEntry {
  date: string;
  mood: 'happy' | 'loved' | 'okay' | 'down';
  notes?: string;
}

const mockMoodData: MoodEntry[] = [
  { date: '2023-07-01', mood: 'happy' },
  { date: '2023-07-02', mood: 'happy' },
  { date: '2023-07-03', mood: 'down' },
  { date: '2023-07-04', mood: 'okay' },
  { date: '2023-07-05', mood: 'loved' },
  { date: '2023-07-06', mood: 'okay' },
  { date: '2023-07-07', mood: 'happy' },
  { date: '2023-07-08', mood: 'down' },
  { date: '2023-07-09', mood: 'okay' },
  { date: '2023-07-10', mood: 'happy' },
  { date: '2023-07-11', mood: 'loved' },
  { date: '2023-07-12', mood: 'happy' },
  { date: '2023-07-13', mood: 'okay' },
  { date: '2023-07-14', mood: 'down' },
];

const getMoodIcon = (mood: string) => {
  switch (mood) {
    case 'happy':
      return <Smile className="h-5 w-5 text-yellow-500" />;
    case 'loved':
      return <Heart className="h-5 w-5 text-red-500" />;
    case 'okay':
      return <Meh className="h-5 w-5 text-blue-500" />;
    case 'down':
      return <Frown className="h-5 w-5 text-gray-500" />;
    default:
      return <Meh className="h-5 w-5 text-gray-400" />;
  }
};

const getMoodColor = (mood: string) => {
  switch (mood) {
    case 'happy':
      return 'bg-yellow-100 border-yellow-300';
    case 'loved':
      return 'bg-red-100 border-red-300';
    case 'okay':
      return 'bg-blue-100 border-blue-300';
    case 'down':
      return 'bg-gray-100 border-gray-300';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const VisualMoodTracker: React.FC = () => {
  const [isLoading] = useState(false);
  const [moodData] = useState<MoodEntry[]>(mockMoodData);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity size={20} className="text-primary" />
          Mood Tracker
        </CardTitle>
        <CardDescription>
          Visual representation of your daily mood patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-[100px] w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1">
              {moodData.slice(-14).map((entry, index) => (
                <div 
                  key={index} 
                  className={`rounded-md p-2 border ${getMoodColor(entry.mood)} flex flex-col items-center aspect-square`}
                >
                  <div className="mb-1">
                    {getMoodIcon(entry.mood)}
                  </div>
                  <span className="text-xs font-medium">
                    {new Date(entry.date).getDate()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-around pt-2">
              <div className="flex items-center">
                <Smile className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-xs">Happy</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-xs">Loved</span>
              </div>
              <div className="flex items-center">
                <Meh className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-xs">Okay</span>
              </div>
              <div className="flex items-center">
                <Frown className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-xs">Down</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualMoodTracker;
