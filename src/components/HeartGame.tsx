import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Square = '❤️' | '⭐' | null;

export const HeartGame = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [isHeartNext, setIsHeartNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: Square[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = isHeartNext ? '❤️' : '⭐';
    setSquares(newSquares);
    setIsHeartNext(!isHeartNext);

    const gameWinner = checkWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newSquares.every(square => square !== null)) {
      setWinner('draw');
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsHeartNext(true);
    setWinner(null);
  };

  const renderSquare = (i: number) => (
    <button
      className={`w-20 h-20 border-2 border-pink-400 text-3xl flex items-center justify-center 
        ${!squares[i] && !winner ? 'hover:bg-pink-100/10' : ''}`}
      onClick={() => handleClick(i)}
    >
      {squares[i]}
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Love & Stars Game 💝</DialogTitle>
        </DialogHeader>
        <div className="p-4 flex flex-col items-center gap-4">
          {!winner && (
            <p className="text-lg mb-2">
              Next player: {isHeartNext ? '❤️' : '⭐'}
            </p>
          )}
          <div className="grid grid-cols-3 gap-1 bg-pink-400/20 p-2 rounded-lg">
            {Array(9).fill(null).map((_, i) => (
              <div key={i}>{renderSquare(i)}</div>
            ))}
          </div>
          {winner && (
            <div className="text-center mt-4">
              <p className="text-xl mb-4">
                {winner === 'draw' 
                  ? "It's a draw! 💝" 
                  : `Winner: ${winner} 🎉`}
              </p>
              <Button 
                onClick={handleRestart}
                className="bg-pink-600 hover:bg-pink-700"
              >
                Play Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};