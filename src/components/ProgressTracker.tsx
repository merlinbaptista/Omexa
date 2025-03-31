
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

interface ActivityProps {
  name: string;
  completed: number;
  total: number;
  lastCompleted: string;
  streak: number;
}

const ProgressTracker: React.FC = () => {
  const activities: ActivityProps[] = [
    {
      name: "Daily Check-ins",
      completed: 5,
      total: 7,
      lastCompleted: "Today",
      streak: 5,
    },
    {
      name: "Breathing Exercises",
      completed: 3,
      total: 7,
      lastCompleted: "Yesterday",
      streak: 3,
    },
    {
      name: "Confidence Boosters",
      completed: 2,
      total: 5,
      lastCompleted: "3 days ago",
      streak: 0,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Your Progress
        </CardTitle>
        <CardDescription>
          Track your wellness journey with Omexa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{activity.name}</span>
                <span className="text-sm text-muted-foreground">
                  {activity.completed}/{activity.total}
                </span>
              </div>
              <Progress value={(activity.completed / activity.total) * 100} />
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Last: {activity.lastCompleted}</span>
                </div>
                <Badge variant={activity.streak > 0 ? "default" : "outline"}>
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.streak > 0 
                    ? `${activity.streak} day streak!` 
                    : "No streak"
                  }
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
