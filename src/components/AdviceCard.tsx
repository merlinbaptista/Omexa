
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface AdviceCardProps {
  title: string;
  description: string;
  tags: string[];
  readMoreUrl?: string;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ 
  title, 
  description, 
  tags, 
  readMoreUrl = "#" 
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
          <a href={readMoreUrl}>
            Read more <ArrowRight size={16} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdviceCard;
