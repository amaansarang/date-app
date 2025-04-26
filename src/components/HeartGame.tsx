
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Square = '🐱' | '🐾' | null;

export const HeartGame = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const checkWinner = (board: Square[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const cpuMove = (currentBoard: Square[]) => {
    // Get available moves
    const availableMoves = currentBoard
      .map((square, index) => square === null ? index : -1)
      .filter(index => index !== -1);

    if (availableMoves.length === 0) return;

    // Try to win
    for (const move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = '🐾';
      if (checkWinner(testBoard) === '🐾') {
        return move;
      }
    }

    // Block player win
    for (const move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = '🐱';
      if (checkWinner(testBoard) === '🐱') {
        return move;
      }
    }

    // Take center if available
    if (availableMoves.includes(4)) return 4;

    // Take random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const move = cpuMove(squares);
        if (move !== undefined) {
          const newSquares = squares.slice();
          newSquares[move] = '🐾';
          setSquares(newSquares);
          
          const gameWinner = checkWinner(newSquares);
          if (gameWinner) {
            setWinner(gameWinner);
          } else if (newSquares.every(square => square !== null)) {
            setWinner('draw');
          }
          setIsPlayerTurn(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, squares, winner]);

  const handleClick = (i: number) => {
    if (squares[i] || !isPlayerTurn || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = '🐱';
    setSquares(newSquares);

    const gameWinner = checkWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newSquares.every(square => square !== null)) {
      setWinner('draw');
    } else {
      setIsPlayerTurn(false);
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  const renderSquare = (i: number) => (
    <button
      className={`w-20 h-20 border-2 border-pink-400 text-3xl flex items-center justify-center 
        ${!squares[i] && !winner && isPlayerTurn ? 'hover:bg-pink-100/10' : ''}`}
      onClick={() => handleClick(i)}
    >
      {squares[i]}
    </button>
  );

  const getWinnerMessage = () => {
    if (winner === '🐱') return "You won! 🎉";
    if (winner === '🐾') return "The cat won! Try again! 😺";
    return "It's a draw! 😸";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Secret Kitty Tic Tac Toe 😺</DialogTitle>
        </DialogHeader>
        <div className="p-4 flex flex-col items-center gap-4">
          {!winner && (
            <p className="text-lg mb-2">
              {isPlayerTurn ? "Your turn! 🐱" : "Cat is thinking... 🐾"}
            </p>
          )}
          <div className="grid grid-cols-3 gap-1 bg-pink-400/20 p-2 rounded-lg">
            {Array(9).fill(null).map((_, i) => (
              <div key={i}>{renderSquare(i)}</div>
            ))}
          </div>
          {winner && (
            <div className="text-center mt-4">
              <p className="text-xl mb-4">{getWinnerMessage()}</p>
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
