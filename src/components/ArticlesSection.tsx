
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Heart, ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  category: string;
  readTime: number;
  imageUrl?: string;
}

const articlesData: Article[] = [
  {
    id: '1',
    title: '10 Quick Ways to Calm Anxiety Before a Presentation',
    description: 'Practical techniques to manage anxiety and nervousness before public speaking engagements.',
    source: 'Wellness Today',
    url: '/articles/anxiety-management',
    category: 'anxiety',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1582488718447-c1fd36645c46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
  },
  {
    id: '2',
    title: 'The Science Behind Stage Fright and How to Overcome It',
    description: 'Understanding the physiological and psychological components of stage fright to better manage it.',
    source: 'Psychology Insights',
    url: '/articles/stage-fright',
    category: 'anxiety',
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '3',
    title: 'Finding Joy in Small Moments',
    description: 'Learning to appreciate the little things in life can significantly improve overall happiness and wellbeing.',
    source: 'Positive Psychology',
    url: '/articles/finding-joy',
    category: 'sad',
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1523950704592-ee4866469b4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  {
    id: '4',
    title: 'Building a Lasting Confidence Mindset',
    description: 'Strategies to develop a solid foundation of self-confidence that persists through challenges.',
    source: 'Leadership Today',
    url: '/articles/confidence-mindset',
    category: 'confident',
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1507529793261-3b0b2a0ee0f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '5',
    title: 'Daily Habits for Improved Mental Wellbeing',
    description: 'Simple yet effective habits you can incorporate into your daily routine to boost mental health.',
    source: 'Health Magazine',
    url: '/articles/daily-habits',
    category: 'general',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '6',
    title: 'Breathing Techniques for Instant Calm',
    description: 'Learn powerful breathing exercises that can calm your nervous system in minutes.',
    source: 'Mindful Magazine',
    url: '/articles/breathing-techniques',
    category: 'anxiety',
    readTime: 3,
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
  }
];

interface ArticlesSectionProps {
  filter?: string;
  limit?: number;
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ filter, limit = 6 }) => {
  const navigate = useNavigate();
  
  const filteredArticles = filter 
    ? articlesData.filter(article => article.category === filter)
    : articlesData;
  
  const displayArticles = filteredArticles.slice(0, limit);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-medium">Recommended Articles</h3>
        </div>
        
        {filter && (
          <Badge variant="outline" className="capitalize">{filter}</Badge>
        )}
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayArticles.map((article) => (
          <Card 
            key={article.id} 
            className="overflow-hidden hover:shadow-md transition-all group cursor-pointer"
            onClick={() => navigate(article.url)}
          >
            {article.imageUrl && (
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <Badge variant="secondary" className="capitalize">
                    {article.category}
                  </Badge>
                </div>
              </div>
            )}
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-xs">
                <Clock className="h-3 w-3" />
                {article.readTime} min read
                <span className="inline-block mx-1">•</span>
                {article.source}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-2">
              <p className="text-muted-foreground text-sm line-clamp-2">
                {article.description}
              </p>
            </CardContent>
            
            <CardFooter className="pt-0 flex justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs flex items-center gap-1 hover:text-primary"
                onClick={(e) => { 
                  e.stopPropagation();
                  // Like functionality would go here
                }}
              >
                <Heart className="h-3 w-3" />
                Save
              </Button>
              
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(article.url, '_blank');
                  }}
                >
                  <ExternalLink className="h-3 w-3" />
                  Read
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Share functionality would go here
                  }}
                >
                  <Share2 className="h-3 w-3" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredArticles.length > limit && (
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/articles')}
          >
            View All Articles
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticlesSection;
