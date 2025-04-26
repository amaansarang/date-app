
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const EMOJIS = ['❤️', '💖', '💝', '💗', '💓', '💞'];

export const HeartGame = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initializeCards = () => {
    const initialCards: Card[] = [...EMOJIS, ...EMOJIS].map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    })).sort(() => Math.random() - 0.5);
    setCards(initialCards);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeCards();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isMatched || cards[id].isFlipped) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        if (newCards.every(card => card.isMatched)) {
          setIsWon(true);
        }
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Secret Heart Game 💝</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2 p-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`h-16 rounded-lg text-2xl flex items-center justify-center transition-all duration-300 ${
                card.isFlipped || card.isMatched
                  ? 'bg-pink-600'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              disabled={isWon}
            >
              {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
            </button>
          ))}
        </div>
        <div className="text-center space-y-2">
          <p>Moves: {moves}</p>
          {isWon && <p className="text-green-400">You won! 🎉</p>}
          <Button onClick={initializeCards} className="bg-pink-600 hover:bg-pink-700">
            Reset Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
