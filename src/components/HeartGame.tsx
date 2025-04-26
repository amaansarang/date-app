
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Memory Game Types and Constants
type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const EMOJIS = ['❤️', '💖', '💝', '💗', '💓', '💞'];

// Word Game Constants
const WORDS = ['LOVE', 'HEART', 'SWEET', 'KISS', 'HUG', 'DATE'];

export const HeartGame = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // Memory Game States
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Word Game States
  const [currentGame, setCurrentGame] = useState<'memory' | 'word'>('memory');
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [isWordGameWon, setIsWordGameWon] = useState(false);

  const initializeMemoryGame = () => {
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

  const initializeWordGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setIsWordGameWon(false);
  };

  useEffect(() => {
    initializeMemoryGame();
    initializeWordGame();
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

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.has(letter)) return;
    
    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }

    if (word.split('').every(l => newGuessedLetters.has(l))) {
      setIsWordGameWon(true);
    }
  };

  const renderWordGame = () => {
    const maxWrongGuesses = 6;
    const availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    return (
      <div className="space-y-4">
        <div className="text-center text-2xl font-bold space-x-2">
          {word.split('').map((letter, index) => (
            <span key={index} className="inline-block w-8 border-b-2 border-white">
              {guessedLetters.has(letter) ? letter : ' '}
            </span>
          ))}
        </div>
        <div className="text-center">
          <p>Wrong guesses: {wrongGuesses} / {maxWrongGuesses}</p>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {availableLetters.map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterGuess(letter)}
              disabled={guessedLetters.has(letter) || isWordGameWon || wrongGuesses >= maxWrongGuesses}
              className={`p-2 rounded ${
                guessedLetters.has(letter)
                  ? 'bg-gray-600'
                  : 'bg-pink-600 hover:bg-pink-700'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
        {(isWordGameWon || wrongGuesses >= maxWrongGuesses) && (
          <div className="text-center">
            <p className={isWordGameWon ? "text-green-400" : "text-red-400"}>
              {isWordGameWon ? "You won! 🎉" : "Game Over! The word was: " + word}
            </p>
            <Button
              onClick={initializeWordGame}
              className="mt-2 bg-pink-600 hover:bg-pink-700"
            >
              Play Again
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Secret Heart Games 💝</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-2 mb-4">
          <Button
            onClick={() => setCurrentGame('memory')}
            className={`${currentGame === 'memory' ? 'bg-pink-600' : 'bg-slate-700'}`}
          >
            Memory Game
          </Button>
          <Button
            onClick={() => setCurrentGame('word')}
            className={`${currentGame === 'word' ? 'bg-pink-600' : 'bg-slate-700'}`}
          >
            Word Game
          </Button>
        </div>
        {currentGame === 'memory' ? (
          <>
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
              <Button onClick={initializeMemoryGame} className="bg-pink-600 hover:bg-pink-700">
                Reset Game
              </Button>
            </div>
          </>
        ) : (
          renderWordGame()
        )}
      </DialogContent>
    </Dialog>
  );
};
