
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const HeartGame = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let animationId: number;
    let jumping = false;
    let dinoY = 150;
    let velocity = 0;
    let obstacleX = canvas.width;
    const gravity = 0.6;
    const jumpForce = -12;

    const drawDino = () => {
      ctx.fillStyle = 'green';
      ctx.fillRect(50, dinoY, 30, 30);
    };

    const drawObstacle = () => {
      ctx.fillStyle = 'red';
      ctx.fillRect(obstacleX, 160, 20, 20);
    };

    const checkCollision = () => {
      const dinoBox = { x: 50, y: dinoY, width: 30, height: 30 };
      const obstacleBox = { x: obstacleX, y: 160, width: 20, height: 20 };

      return (
        dinoBox.x < obstacleBox.x + obstacleBox.width &&
        dinoBox.x + dinoBox.width > obstacleBox.x &&
        dinoBox.y < obstacleBox.y + obstacleBox.height &&
        dinoBox.y + dinoBox.height > obstacleBox.y
      );
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Ground
      ctx.fillStyle = '#666';
      ctx.fillRect(0, 180, canvas.width, 2);

      // Score
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, 10, 30);

      if (jumping) {
        velocity += gravity;
        dinoY += velocity;

        if (dinoY > 150) {
          dinoY = 150;
          jumping = false;
          velocity = 0;
        }
      }

      obstacleX -= 5;
      if (obstacleX < -20) {
        obstacleX = canvas.width;
        setScore(s => s + 1);
      }

      drawDino();
      drawObstacle();

      if (checkCollision()) {
        setGameOver(true);
        return;
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    const handleJump = () => {
      if (!jumping) {
        jumping = true;
        velocity = jumpForce;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        handleJump();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      handleJump();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouch);
    gameLoop();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(animationId);
    };
  }, [isOpen, gameOver]);

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Dino Runner Game 🦖</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="bg-slate-900 rounded-lg"
          />
          {gameOver && (
            <div className="text-center mt-4">
              <p className="text-xl mb-2">Game Over! Score: {score}</p>
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Play Again
              </button>
            </div>
          )}
          <p className="text-center mt-4 text-sm text-slate-300">
            Press Space/Up Arrow or tap screen to jump
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
