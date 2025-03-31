import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Smile, 
  Send, 
  Mic, 
  Image as ImageIcon, 
  AlertTriangle, 
  Phone, 
  Heart, 
  Newspaper, 
  HelpCircle, 
  ThumbsUp,
  MessageCircle,
  UserCircle,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types for our chat messages
interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'omexa';
  timestamp: Date;
  attachment?: string;
  isEmergency?: boolean;
  sticker?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  suggestions?: string[];
  articles?: Article[];
}

interface Article {
  title: string;
  url: string;
  source: string;
}

// Sample articles based on different moods/topics
const moodBasedArticles = {
  anxious: [
    { title: "10 Quick Ways to Calm Anxiety Before a Presentation", url: "#", source: "Wellness Today" },
    { title: "The Science Behind Stage Fright and How to Overcome It", url: "#", source: "Psychology Insights" },
    { title: "Breathing Techniques for Instant Calm", url: "#", source: "Mindful Magazine" }
  ],
  confident: [
    { title: "How to Maintain Confidence During Challenging Situations", url: "#", source: "Success Weekly" },
    { title: "Building a Lasting Confidence Mindset", url: "#", source: "Leadership Today" },
    { title: "Stories of Confidence: How People Overcame Their Fears", url: "#", source: "Inspiration Daily" }
  ],
  sad: [
    { title: "Finding Joy in Small Moments", url: "#", source: "Positive Psychology" },
    { title: "Healthy Ways to Process Difficult Emotions", url: "#", source: "Mental Health Journal" },
    { title: "The Power of Connection When Feeling Down", url: "#", source: "Community Care" }
  ],
  general: [
    { title: "Daily Habits for Improved Mental Wellbeing", url: "#", source: "Health Magazine" },
    { title: "The Science of Happiness: Latest Research", url: "#", source: "Science Daily" },
    { title: "How Meaningful Conversations Impact Our Brain", url: "#", source: "Neuroscience Today" }
  ]
};

// Helper function to analyze text sentiment (simplified version)
const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  const positiveWords = ['happy', 'great', 'good', 'excellent', 'amazing', 'love', 'excited', 'joy', 'wonderful', 'fantastic'];
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'worried', 'scared', 'nervous', 'anxious', 'afraid', 'stressed', 'depressed', 'angry', 'upset'];
  
  const lowerText = text.toLowerCase();
  
  const positiveMatches = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeMatches = negativeWords.filter(word => lowerText.includes(word)).length;
  
  if (positiveMatches > negativeMatches) return 'positive';
  if (negativeMatches > positiveMatches) return 'negative';
  return 'neutral';
};

// Detect if emergency keywords are present
const detectEmergency = (text: string): boolean => {
  const emergencyWords = [
    'help me', 'emergency', 'crisis', 'suicide', 'hurt myself', 'abuse',
    'assault', 'violence', 'danger', 'threatened', 'unsafe', 'scared for my life'
  ];
  
  const lowerText = text.toLowerCase();
  return emergencyWords.some(word => lowerText.includes(word));
};

// Get appropriate response based on input and sentiment
const getOmexaResponse = (
  text: string, 
  sentiment: 'positive' | 'negative' | 'neutral'
): { text: string; suggestions?: string[]; articles?: Article[]; sticker?: string } => {
  
  // Check for specific situations
  if (text.toLowerCase().includes('stage fright') || text.toLowerCase().includes('presentation') || text.toLowerCase().includes('public speaking')) {
    return {
      text: "I understand how nerve-wracking public speaking can be! 🎤 Remember that even professional speakers get nervous. Try visualizing a successful presentation, practice deep breathing, and remember that the audience wants you to succeed! Would you like some specific exercises to try?",
      suggestions: [
        "Practice deep breathing for 5 minutes before going on stage",
        "Try the 3-3-3 grounding exercise to calm nerves",
        "Visualize yourself delivering a great presentation",
        "Remember that mild nervousness can actually improve your performance!"
      ],
      articles: moodBasedArticles.anxious,
      sticker: "encouragement"
    };
  }
  
  if (text.toLowerCase().includes('interview') || text.toLowerCase().includes('job')) {
    return {
      text: "Interviews can be challenging, but you've got this! 💪 Remember to prepare examples of your achievements, research the company, and practice common questions. Your skills and experiences are valuable! Would you like some interview preparation tips?",
      suggestions: [
        "Research the company thoroughly before the interview",
        "Prepare STAR (Situation, Task, Action, Result) examples for common questions",
        "Practice in front of a mirror or with a friend",
        "Remember to ask thoughtful questions to the interviewer"
      ],
      articles: moodBasedArticles.confident,
      sticker: "confidence"
    };
  }
  
  // Responses based on sentiment
  if (sentiment === 'positive') {
    return {
      text: "I'm so happy to hear you're doing well! 🌟 Your positive energy is contagious. What's been the highlight of your day so far?",
      suggestions: [
        "Share your happiness with someone else today",
        "Take a moment to appreciate what's going well",
        "Build on this positive momentum for your goals"
      ],
      articles: moodBasedArticles.confident,
      sticker: "happiness"
    };
  } else if (sentiment === 'negative') {
    return {
      text: "I'm sorry to hear you're feeling this way. 💜 It's completely okay to have these feelings, and you're not alone. Would it help to talk more about what's going on?",
      suggestions: [
        "Take a few deep breaths to ground yourself",
        "Consider doing something small that normally brings you joy",
        "Be gentle with yourself right now"
      ],
      articles: moodBasedArticles.sad,
      sticker: "support"
    };
  } else {
    return {
      text: "Thanks for sharing that with me! I'm here to chat whenever you need. 😊 Is there anything specific you'd like advice or support with today?",
      articles: moodBasedArticles.general,
      sticker: "friendly"
    };
  }
};

// Stickers and emojis for different contexts
const chatStickers = {
  happiness: "😄",
  support: "🤗",
  confidence: "💪",
  encouragement: "🌟",
  friendly: "👋",
  emergency: "⚠️",
  thinking: "🤔",
  advice: "💡"
};

const OmexaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hi there! I'm Omexa, your personal companion and motivator. How are you feeling today? 😊",
      sender: 'omexa',
      timestamp: new Date(),
      sentiment: 'positive'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim() === '' && !imageUrl) return;
    
    const sentiment = analyzeSentiment(inputText);
    const isEmergency = detectEmergency(inputText);
    
    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      attachment: imageUrl || undefined,
      sentiment
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setImageUrl(null);
    
    // Check for emergency
    if (isEmergency) {
      setIsEmergencyMode(true);
      
      // Add emergency response after a short delay
      setTimeout(() => {
        const emergencyResponse: ChatMessage = {
          id: Date.now() + 1,
          text: "I notice your message contains concerning language. If you're in immediate danger or crisis, please reach out for professional help. Would you like me to provide emergency contact resources? Remember, it's okay to ask for help. 🧡",
          sender: 'omexa',
          timestamp: new Date(),
          isEmergency: true,
          sticker: chatStickers.emergency,
          suggestions: [
            "Call emergency services (911) if you're in immediate danger",
            "National Crisis Helpline: 988 (call or text)",
            "Crisis Text Line: Text HOME to 741741"
          ]
        };
        setMessages(prev => [...prev, emergencyResponse]);
      }, 500);
      
      return;
    }
    
    // Generate Omexa response based on message and sentiment
    setTimeout(() => {
      const response = getOmexaResponse(inputText, sentiment);
      const omexaMessage: ChatMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'omexa',
        timestamp: new Date(),
        sticker: response.sticker ? chatStickers[response.sticker as keyof typeof chatStickers] : undefined,
        suggestions: response.suggestions,
        articles: response.articles
      };
      
      setMessages(prev => [...prev, omexaMessage]);
    }, 1000);
  };
  
  // Handle file upload for images
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.includes('image')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageUrl(event.target.result as string);
        toast({
          title: "Image attached",
          description: "Ready to send with your message"
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Toggle voice recording (simulated)
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "I've analyzed your tone and am here to help."
      });
      
      // Simulate voice recognition with a positive sentiment
      setInputText("I'm feeling good about my progress today, but I'm a bit nervous about my presentation tomorrow.");
    } else {
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "I'm listening to your tone to better understand how you feel."
      });
    }
  };
  
  // Handle emergency assistance
  const handleEmergencyAssistance = (type: 'counseling' | 'police') => {
    setIsEmergencyMode(false);
    
    if (type === 'counseling') {
      const omexaMessage: ChatMessage = {
        id: Date.now(),
        text: "I've provided some counseling resources below. Remember that trained professionals are available 24/7 to help you through difficult situations. You don't have to face this alone. 💜",
        sender: 'omexa',
        timestamp: new Date(),
        suggestions: [
          "National Suicide Prevention Lifeline: 988",
          "Crisis Text Line: Text HOME to 741741",
          "SAMHSA's National Helpline: 1-800-662-4357",
          "National Alliance on Mental Illness Helpline: 1-800-950-NAMI (6264)"
        ]
      };
      setMessages(prev => [...prev, omexaMessage]);
    } else {
      const omexaMessage: ChatMessage = {
        id: Date.now(),
        text: "If you're in immediate danger, please call emergency services at 911. Your safety is the top priority. I'm here to support you through this. 🧡",
        sender: 'omexa',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, omexaMessage]);
    }
  };
  
  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="text-primary" size={20} />
          Omexa Chat
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="self-center mb-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="articles">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex-1 overflow-hidden p-2">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        } ${message.isEmergency ? 'border-l-4 border-red-500' : ''}`}
                      >
                        {message.sender === 'omexa' && (
                          <div className="flex items-center gap-2 mb-1">
                            <Smile className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Omexa</span>
                          </div>
                        )}
                        
                        <div className="whitespace-pre-wrap">
                          {message.sticker && <span className="text-2xl mr-2">{message.sticker}</span>}
                          {message.text}
                        </div>
                        
                        {message.attachment && (
                          <div className="mt-2">
                            <img 
                              src={message.attachment} 
                              alt="Attached" 
                              className="max-w-full rounded-md"
                            />
                          </div>
                        )}
                        
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-sm font-medium">Suggestions:</p>
                            <ul className="text-sm space-y-1">
                              {message.suggestions.map((suggestion, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <ThumbsUp className="h-4 w-4 shrink-0 mt-0.5" />
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {message.articles && message.articles.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium flex items-center gap-1">
                              <Newspaper className="h-4 w-4" />
                              Recommended readings:
                            </p>
                            <div className="text-sm mt-1 space-y-1">
                              {message.articles.slice(0, 2).map((article, idx) => (
                                <a 
                                  key={idx} 
                                  href={article.url} 
                                  className="block hover:underline text-blue-600 dark:text-blue-400"
                                >
                                  {article.title} ({article.source})
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-1 text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="articles" className="flex-1 overflow-y-auto">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4 p-2">
                  <h3 className="font-medium">Helpful Resources</h3>
                  
                  {/* Group articles by category */}
                  {Object.entries(moodBasedArticles).map(([category, articles]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium capitalize">{category} Resources:</h4>
                      <div className="grid gap-2">
                        {articles.map((article, idx) => (
                          <Card key={idx} className="p-3">
                            <div className="flex gap-2">
                              <Newspaper className="h-5 w-5 text-primary shrink-0" />
                              <div>
                                <h5 className="font-medium text-sm">{article.title}</h5>
                                <p className="text-xs text-muted-foreground">{article.source}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        {isEmergencyMode ? (
          <div className="w-full space-y-3">
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-900">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-700 dark:text-red-400">Emergency Support</h4>
                  <p className="text-sm text-red-600 dark:text-red-300">Would you like me to connect you with immediate support?</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 border-red-200 hover:bg-red-50" 
                onClick={() => handleEmergencyAssistance('counseling')}
              >
                <Phone className="mr-2 h-4 w-4" /> 
                Counseling Resources
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1" 
                onClick={() => handleEmergencyAssistance('police')}
              >
                <AlertTriangle className="mr-2 h-4 w-4" /> 
                Emergency Services
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full" 
              onClick={() => setIsEmergencyMode(false)}
            >
              Continue chatting instead
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-2">
            {imageUrl && (
              <div className="relative w-16 h-16">
                <img 
                  src={imageUrl} 
                  alt="Upload preview" 
                  className="w-full h-full object-cover rounded-md"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-background"
                  onClick={() => setImageUrl(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-10 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="outline" 
                  size="icon"
                  className={isRecording ? "bg-red-100 text-red-600 border-red-200" : ""}
                  onClick={handleToggleRecording}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="relative"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileUpload}
                  />
                  <ImageIcon className="h-4 w-4" />
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                type="button" 
                onClick={handleSendMessage}
                disabled={inputText.trim() === '' && !imageUrl}
              >
                <Send className="mr-2 h-4 w-4" /> Send
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default OmexaChat;
