
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Shuffle } from 'lucide-react';

const SimpleGame: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const possibleColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  const initializeGame = () => {
    // Create a pair of each color
    let gameColors = [...possibleColors, ...possibleColors];
    
    // Shuffle the array
    for (let i = gameColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameColors[i], gameColors[j]] = [gameColors[j], gameColors[i]];
    }
    
    setColors(gameColors);
    setSelectedIndices([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsComplete(false);
    setGameStarted(true);
  };

  const handleCardClick = (index: number) => {
    // Do nothing if already selected or matched
    if (
      selectedIndices.includes(index) ||
      selectedIndices.length >= 2 ||
      matchedPairs * 2 === colors.length
    ) {
      return;
    }

    // Add the clicked card to selected indices
    const newSelectedIndices = [...selectedIndices, index];
    setSelectedIndices(newSelectedIndices);

    // If we have selected two cards
    if (newSelectedIndices.length === 2) {
      setMoves(moves + 1);
      
      // Check if they match
      const [firstIndex, secondIndex] = newSelectedIndices;
      if (colors[firstIndex] === colors[secondIndex]) {
        // Found a match
        setTimeout(() => {
          setMatchedPairs(matchedPairs + 1);
          setSelectedIndices([]);
          
          // Check for game completion
          if (matchedPairs + 1 === colors.length / 2) {
            setIsComplete(true);
            toast.success('Congratulations! You completed the game!');
          } else {
            toast.success('You found a match!');
          }
        }, 600);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setSelectedIndices([]);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (index: number) => {
    return selectedIndices.includes(index) || isCardMatched(index);
  };

  const isCardMatched = (index: number) => {
    if (selectedIndices.length !== 2) return false;
    
    const [firstIndex, secondIndex] = selectedIndices;
    return colors[firstIndex] === colors[secondIndex] && 
           (index === firstIndex || index === secondIndex);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Memory Match</CardTitle>
        <CardDescription>
          Find matching pairs of colors to complete the game. A simple game to help clear your mind.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {gameStarted ? (
          <>
            <div className="flex justify-between mb-4">
              <div>Moves: {moves}</div>
              <div>Pairs: {matchedPairs}/{colors.length/2}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`h-20 rounded-md cursor-pointer transition-all duration-300 transform ${
                    isCardFlipped(index) ? 'rotate-y-180' : 'bg-gray-300'
                  } ${isCardFlipped(index) ? color : ''}`}
                ></div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="mb-4">Click start to begin the memory game.</p>
            <p className="text-muted-foreground">
              Find matching pairs of colors to complete the game.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={initializeGame}
          className="gap-2"
        >
          {gameStarted ? <Shuffle size={16} /> : null}
          {gameStarted ? "Restart Game" : "Start Game"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimpleGame;
