
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, Heart, Star, Check, MessageCircle } from 'lucide-react';

const stickers = [
  { icon: <Smile className="h-6 w-6 text-yellow-500" />, label: "Smile", color: "bg-yellow-100" },
  { icon: <Heart className="h-6 w-6 text-red-500" />, label: "Love", color: "bg-red-100" },
  { icon: <Star className="h-6 w-6 text-blue-500" />, label: "Star", color: "bg-blue-100" },
  { icon: <Check className="h-6 w-6 text-green-500" />, label: "Done", color: "bg-green-100" },
  { icon: <MessageCircle className="h-6 w-6 text-purple-500" />, label: "Chat", color: "bg-purple-100" }
];

interface StickerProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onSelect: () => void;
}

const Sticker: React.FC<StickerProps> = ({ icon, label, color, onSelect }) => {
  return (
    <div 
      className={`${color} rounded-full p-3 cursor-pointer hover:scale-110 transition-transform`}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center">
        {icon}
      </div>
    </div>
  );
};

const StickerMessage: React.FC<{ label: string, icon: React.ReactNode, onRemove: () => void }> = ({ label, icon, onRemove }) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg border bg-card animate-bounce-in mb-2">
      {icon}
      <span>{label} sticker sent!</span>
      <Button variant="ghost" size="sm" className="ml-auto h-6 w-6 p-0" onClick={onRemove}>
        <X size={14} />
      </Button>
    </div>
  );
};

const ChatStickers: React.FC = () => {
  const [sentStickers, setSentStickers] = useState<Array<{ id: number, label: string, icon: React.ReactNode }>>([]);

  const handleSendSticker = (label: string, icon: React.ReactNode) => {
    const newSticker = { id: Date.now(), label, icon };
    setSentStickers([...sentStickers, newSticker]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setSentStickers(prev => prev.filter(s => s.id !== newSticker.id));
    }, 3000);
  };

  const removeSticker = (id: number) => {
    setSentStickers(prev => prev.filter(s => s.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smile className="text-primary" size={20} />
          Chat Stickers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sentStickers.length > 0 && (
            <div className="space-y-2 mb-4">
              {sentStickers.map(sticker => (
                <StickerMessage 
                  key={sticker.id} 
                  label={sticker.label} 
                  icon={sticker.icon} 
                  onRemove={() => removeSticker(sticker.id)} 
                />
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-5 gap-2">
            {stickers.map((sticker) => (
              <Sticker 
                key={sticker.label}
                icon={sticker.icon}
                label={sticker.label}
                color={sticker.color}
                onSelect={() => handleSendSticker(sticker.label, sticker.icon)}
              />
            ))}
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-2">
            Click on a sticker to send it
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatStickers;
