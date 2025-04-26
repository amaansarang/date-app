import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const HeartGame = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [target] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const handleGuess = () => {
    const numGuess = parseInt(guess);
    setAttempts(prev => prev + 1);

    if (numGuess === target) {
      setMessage(`🎉 You got it in ${attempts + 1} tries! The number was ${target}`);
      setGameWon(true);
    } else if (numGuess < target) {
      setMessage('Try a higher number! ⬆️');
    } else {
      setMessage('Try a lower number! ⬇️');
    }
    setGuess('');
  };

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Secret Heart Number Game 💝</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <p className="text-center">Guess a number between 1 and 100</p>
          <div className="flex gap-2">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess"
              className="bg-slate-700"
              disabled={gameWon}
            />
            <Button 
              onClick={handleGuess}
              disabled={!guess || gameWon}
              className="bg-pink-600 hover:bg-pink-700"
            >
              Guess
            </Button>
          </div>
          {message && (
            <p className="text-center text-lg">{message}</p>
          )}
          {gameWon && (
            <Button 
              onClick={resetGame}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Play Again
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};