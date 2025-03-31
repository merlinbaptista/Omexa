
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ['🐱', '🐶', '🦄', '🦊', '🐼', '🐢', '🦁', '🐘'];

const MemoryPatchGame: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  
  const initializeGame = () => {
    const duplicatedEmojis = [...emojis, ...emojis];
    const shuffledEmojis = duplicatedEmojis.sort(() => Math.random() - 0.5);
    
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
  };
  
  useEffect(() => {
    initializeGame();
  }, []);
  
  useEffect(() => {
    // Check if game is complete
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameComplete(true);
    }
  }, [cards]);
  
  useEffect(() => {
    // Check for matches when two cards are flipped
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Match found
        setCards(prevCards => 
          prevCards.map((card, index) => 
            index === firstIndex || index === secondIndex
              ? { ...card, isMatched: true }
              : card
          )
        );
      }
      
      // Reset flipped cards after a delay
      const timer = setTimeout(() => {
        setFlippedCards([]);
        setCards(prevCards => 
          prevCards.map((card, index) => 
            !card.isMatched ? { ...card, isFlipped: false } : card
          )
        );
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [flippedCards, cards]);
  
  const handleCardClick = (index: number) => {
    // Ignore if card is already flipped or matched
    if (cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) {
      return;
    }
    
    // Flip the card
    setCards(prevCards => 
      prevCards.map((card, i) => 
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    
    // Add to flipped cards
    setFlippedCards(prev => [...prev, index]);
    
    // Increment moves if this is the second card flipped
    if (flippedCards.length === 1) {
      setMoves(prev => prev + 1);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain size={20} className="text-primary" />
          Memory Patch Game
        </CardTitle>
        <CardDescription>
          Find matching pairs to improve your memory and focus
        </CardDescription>
      </CardHeader>
      <CardContent>
        {gameComplete ? (
          <div className="text-center py-8 space-y-4">
            <h3 className="text-xl font-bold">Game Complete! 🎉</h3>
            <p>You completed the game in {moves} moves.</p>
            <Button onClick={initializeGame}>Play Again</Button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`
                  aspect-square flex items-center justify-center text-2xl
                  rounded-md cursor-pointer transition-all duration-300 
                  ${card.isFlipped || card.isMatched 
                    ? 'bg-primary/10 rotate-0' 
                    : 'bg-primary text-primary-foreground rotate-y-180'}
                  ${card.isMatched ? 'opacity-50' : 'opacity-100'}
                `}
                onClick={() => handleCardClick(index)}
              >
                {(card.isFlipped || card.isMatched) && card.emoji}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <p className="text-sm">Moves: {moves}</p>
        <Button variant="outline" size="sm" onClick={initializeGame}>
          Reset Game
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemoryPatchGame;
