import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaTrophy, FaPlay, FaRedo } from 'react-icons/fa';

// --- Constants ---
const GRID_SIZE = 20;
const CELL_SIZE = 20; // px
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 50;

const SnakeGame = ({ onClose }) => {
    // Game State
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem('snakeHighScore') || '0')
    );
    const [isPaused, setIsPaused] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [speed, setSpeed] = useState(INITIAL_SPEED);

    const gameLoopRef = useRef();
    const directionRef = useRef('RIGHT'); // Ref to prevent rapid key presses causing self-collision

    // --- Game Logic ---

    const generateFood = useCallback(() => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    }, []);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(generateFood());
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
        setGameOver(false);
        setScore(0);
        setSpeed(INITIAL_SPEED);
        setGameStarted(true);
        setIsPaused(false);
    };

    const moveSnake = useCallback(() => {
        if (gameOver || isPaused || !gameStarted) return;

        setSnake((prevSnake) => {
            const newHead = { ...prevSnake[0] };

            switch (direction) {
                case 'UP':
                    newHead.y -= 1;
                    break;
                case 'DOWN':
                    newHead.y += 1;
                    break;
                case 'LEFT':
                    newHead.x -= 1;
                    break;
                case 'RIGHT':
                    newHead.x += 1;
                    break;
                default:
                    break;
            }

            // Check Collisions
            if (
                newHead.x < 0 ||
                newHead.x >= GRID_SIZE ||
                newHead.y < 0 ||
                newHead.y >= GRID_SIZE ||
                prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
            ) {
                setGameOver(true);
                if (score > highScore) {
                    setHighScore(score);
                    localStorage.setItem('snakeHighScore', score.toString());
                }
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Check Food
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore((s) => s + 10);
                setFood(generateFood());
                setSpeed((s) => Math.max(MIN_SPEED, s - SPEED_INCREMENT));
                // Don't pop tail (grow)
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver, isPaused, gameStarted, score, highScore, generateFood]);

    // Game Loop
    useEffect(() => {
        gameLoopRef.current = setInterval(moveSnake, speed);
        return () => clearInterval(gameLoopRef.current);
    }, [moveSnake, speed]);

    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) return;

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    if (directionRef.current !== 'DOWN') {
                        setDirection('UP');
                        directionRef.current = 'UP';
                    }
                    break;
                case 'ArrowDown':
                case 's':
                    if (directionRef.current !== 'UP') {
                        setDirection('DOWN');
                        directionRef.current = 'DOWN';
                    }
                    break;
                case 'ArrowLeft':
                case 'a':
                    if (directionRef.current !== 'RIGHT') {
                        setDirection('LEFT');
                        directionRef.current = 'LEFT';
                    }
                    break;
                case 'ArrowRight':
                case 'd':
                    if (directionRef.current !== 'LEFT') {
                        setDirection('RIGHT');
                        directionRef.current = 'RIGHT';
                    }
                    break;
                case ' ':
                    if (!gameStarted) resetGame();
                    else setIsPaused((p) => !p);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStarted, gameOver]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
            <div className="relative bg-gray-900 border-2 border-neon-green rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.3)] max-w-2xl w-full flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-neon-green font-gaming tracking-wider animate-pulse">CYBER SERPENT</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-yellow-400">
                            <FaTrophy />
                            <span className="font-mono text-lg">{highScore}</span>
                        </div>
                        <div className="font-mono text-xl text-white">
                            SCORE: <span className="text-neon-green">{score}</span>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <FaTimes size={24} />
                        </button>
                    </div>
                </div>

                {/* Game Area */}
                <div className="p-8 flex justify-center bg-cyber-black relative">
                    {/* Grid Background */}
                    <div
                        className="relative bg-gray-800/50 border border-gray-700 shadow-inner"
                        style={{
                            width: GRID_SIZE * CELL_SIZE,
                            height: GRID_SIZE * CELL_SIZE,
                            backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)',
                            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
                        }}
                    >
                        {/* Snake */}
                        {snake.map((segment, i) => (
                            <div
                                key={i}
                                className="absolute bg-neon-green shadow-[0_0_10px_var(--neon-green)]"
                                style={{
                                    width: CELL_SIZE - 2,
                                    height: CELL_SIZE - 2,
                                    left: segment.x * CELL_SIZE + 1,
                                    top: segment.y * CELL_SIZE + 1,
                                    borderRadius: i === 0 ? '4px' : '2px',
                                    opacity: 1 - i / (snake.length + 5) // Fade tail
                                }}
                            />
                        ))}

                        {/* Food */}
                        <div
                            className="absolute bg-neon-pink rounded-full shadow-[0_0_15px_var(--neon-pink)] animate-pulse"
                            style={{
                                width: CELL_SIZE - 4,
                                height: CELL_SIZE - 4,
                                left: food.x * CELL_SIZE + 2,
                                top: food.y * CELL_SIZE + 2,
                            }}
                        />

                        {/* Overlays */}
                        {!gameStarted && !gameOver && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                                <FaPlay className="text-6xl text-neon-green mb-4 animate-bounce" />
                                <p className="text-white font-gaming text-xl mb-2">PRESS SPACE TO START</p>
                                <p className="text-gray-400 text-sm">Use Arrow Keys or WASD to Move</p>
                            </div>
                        )}

                        {isPaused && gameStarted && !gameOver && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                <h3 className="text-4xl font-bold text-white tracking-widest">PAUSED</h3>
                            </div>
                        )}

                        {gameOver && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                                <h3 className="text-4xl font-bold text-red-500 mb-2 glitch-effect" data-text="SYSTEM FAILURE">SYSTEM FAILURE</h3>
                                <p className="text-gray-300 mb-6">Final Score: <span className="text-neon-green font-mono text-xl">{score}</span></p>
                                <button
                                    onClick={resetGame}
                                    className="flex items-center gap-2 px-6 py-3 bg-neon-green text-black font-bold rounded-full hover:bg-white transition-all hover:scale-105"
                                >
                                    <FaRedo /> REBOOT SYSTEM
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Controls (Visible only on small screens) */}
                <div className="md:hidden p-4 bg-gray-800 grid grid-cols-3 gap-2 max-w-[200px] mx-auto mb-4">
                    <div />
                    <button className="bg-gray-700 p-4 rounded text-white active:bg-neon-green active:text-black" onClick={() => setDirection('UP')}><FaPlay className="-rotate-90" /></button>
                    <div />
                    <button className="bg-gray-700 p-4 rounded text-white active:bg-neon-green active:text-black" onClick={() => setDirection('LEFT')}><FaPlay className="rotate-180" /></button>
                    <button className="bg-gray-700 p-4 rounded text-white active:bg-neon-green active:text-black" onClick={() => setDirection('DOWN')}><FaPlay className="rotate-90" /></button>
                    <button className="bg-gray-700 p-4 rounded text-white active:bg-neon-green active:text-black" onClick={() => setDirection('RIGHT')}><FaPlay /></button>
                </div>

            </div>
        </motion.div>
    );
};

export default SnakeGame;
