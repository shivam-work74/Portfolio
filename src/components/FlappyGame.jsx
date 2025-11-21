import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaTrophy, FaPlay, FaRedo } from 'react-icons/fa';

// --- Constants ---
const GRAVITY = 0.6;
const JUMP_STRENGTH = -8;
const OBSTACLE_SPEED = 3;
const OBSTACLE_SPAWN_RATE = 1500; // ms
const GAP_SIZE = 150;
const BIRD_SIZE = 30;
const OBSTACLE_WIDTH = 50;

const FlappyGame = ({ onClose }) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem('gravityGlitchHighScore') || '0')
    );
    const [birdPos, setBirdPos] = useState(250);
    const [birdVelocity, setBirdVelocity] = useState(0);
    const [obstacles, setObstacles] = useState([]);

    const gameLoopRef = useRef();
    const obstacleSpawnerRef = useRef();
    const containerRef = useRef(null);

    // --- Game Logic ---

    const jump = useCallback(() => {
        if (!gameStarted) {
            setGameStarted(true);
        }
        if (!gameOver) {
            setBirdVelocity(JUMP_STRENGTH);
        }
    }, [gameStarted, gameOver]);

    const resetGame = () => {
        setGameStarted(false);
        setGameOver(false);
        setScore(0);
        setBirdPos(250);
        setBirdVelocity(0);
        setObstacles([]);
    };

    const checkCollision = useCallback((birdY, currentObstacles) => {
        const containerHeight = containerRef.current ? containerRef.current.clientHeight : 500;

        // Floor/Ceiling Collision
        if (birdY < 0 || birdY + BIRD_SIZE > containerHeight) {
            return true;
        }

        // Obstacle Collision
        for (const obstacle of currentObstacles) {
            const obstacleLeft = obstacle.x;
            const obstacleRight = obstacle.x + OBSTACLE_WIDTH;

            // Bird is within horizontal range of obstacle
            if (obstacleLeft < 100 + BIRD_SIZE && obstacleRight > 100) {
                // Bird is hitting top pipe OR bottom pipe
                if (birdY < obstacle.topHeight || birdY + BIRD_SIZE > obstacle.topHeight + GAP_SIZE) {
                    return true;
                }
            }
        }
        return false;
    }, []);

    const updateGame = useCallback(() => {
        if (!gameStarted || gameOver) return;

        setBirdPos((prevPos) => {
            const newPos = prevPos + birdVelocity;
            return newPos;
        });

        setBirdVelocity((prevVel) => prevVel + GRAVITY);

        setObstacles((prevObstacles) => {
            const newObstacles = prevObstacles
                .map((obs) => ({ ...obs, x: obs.x - OBSTACLE_SPEED }))
                .filter((obs) => obs.x + OBSTACLE_WIDTH > -100);

            // Score counting
            newObstacles.forEach(obs => {
                if (!obs.passed && obs.x + OBSTACLE_WIDTH < 100) {
                    obs.passed = true;
                    setScore(s => s + 1);
                }
            });

            return newObstacles;
        });

        if (checkCollision(birdPos, obstacles)) {
            setGameOver(true);
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('gravityGlitchHighScore', score.toString());
            }
        }
    }, [gameStarted, gameOver, birdVelocity, birdPos, obstacles, score, highScore, checkCollision]);

    // Game Loop
    useEffect(() => {
        gameLoopRef.current = setInterval(updateGame, 20);
        return () => clearInterval(gameLoopRef.current);
    }, [updateGame]);

    // Obstacle Spawner
    useEffect(() => {
        if (gameStarted && !gameOver) {
            obstacleSpawnerRef.current = setInterval(() => {
                const containerHeight = containerRef.current ? containerRef.current.clientHeight : 500;
                const minHeight = 50;
                const maxHeight = containerHeight - GAP_SIZE - minHeight;
                const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

                setObstacles((prev) => [
                    ...prev,
                    { x: containerRef.current ? containerRef.current.clientWidth : 800, topHeight, passed: false },
                ]);
            }, OBSTACLE_SPAWN_RATE);
        }
        return () => clearInterval(obstacleSpawnerRef.current);
    }, [gameStarted, gameOver]);

    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault(); // Prevent scrolling
                if (gameOver) resetGame();
                else jump();
            }
        };

        const handleTouch = (e) => {
            // Prevent default to stop zooming/scrolling on some devices
            // e.preventDefault(); 
            if (gameOver) resetGame();
            else jump();
        };

        window.addEventListener('keydown', handleKeyDown);
        // We'll attach touch/click to the container div for better control

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [jump, gameOver]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
            <div className="relative bg-gray-900 border-2 border-neon-blue rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.3)] max-w-4xl w-full flex flex-col h-[80vh] max-h-[600px]">

                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-neon-blue font-gaming tracking-wider animate-pulse">GRAVITY GLITCH</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-yellow-400">
                            <FaTrophy />
                            <span className="font-mono text-lg">{highScore}</span>
                        </div>
                        <div className="font-mono text-xl text-white">
                            SCORE: <span className="text-neon-blue">{score}</span>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <FaTimes size={24} />
                        </button>
                    </div>
                </div>

                {/* Game Area */}
                <div
                    ref={containerRef}
                    className="flex-grow relative bg-cyber-black overflow-hidden cursor-pointer"
                    onClick={gameOver ? resetGame : jump}
                    onTouchStart={gameOver ? resetGame : jump}
                    style={{
                        backgroundImage: `
               linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), 
               linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)
             `,
                        backgroundSize: '40px 40px'
                    }}
                >
                    {/* Parallax Background (Simplified) */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neon-blue/20 to-transparent" />
                    </div>

                    {/* Bird (Player) */}
                    <div
                        className="absolute left-[100px] w-[30px] h-[30px] bg-neon-blue shadow-[0_0_15px_var(--neon-blue)] rounded-full flex items-center justify-center"
                        style={{
                            top: birdPos,
                            transform: `rotate(${birdVelocity * 3}deg)`
                        }}
                    >
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                    </div>

                    {/* Obstacles */}
                    {obstacles.map((obs, i) => (
                        <React.Fragment key={i}>
                            {/* Top Pipe */}
                            <div
                                className="absolute bg-gray-800 border-b-4 border-neon-pink shadow-[0_10px_20px_rgba(255,0,255,0.2)]"
                                style={{
                                    left: obs.x,
                                    top: 0,
                                    width: OBSTACLE_WIDTH,
                                    height: obs.topHeight,
                                }}
                            />
                            {/* Bottom Pipe */}
                            <div
                                className="absolute bg-gray-800 border-t-4 border-neon-pink shadow-[0_-10px_20px_rgba(255,0,255,0.2)]"
                                style={{
                                    left: obs.x,
                                    top: obs.topHeight + GAP_SIZE,
                                    width: OBSTACLE_WIDTH,
                                    bottom: 0,
                                }}
                            />
                        </React.Fragment>
                    ))}

                    {/* Start Screen */}
                    {!gameStarted && !gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
                            <FaPlay className="text-6xl text-neon-blue mb-4 animate-bounce" />
                            <p className="text-white font-gaming text-xl mb-2">TAP OR SPACE TO JUMP</p>
                            <p className="text-gray-400 text-sm">Avoid the Firewalls</p>
                        </div>
                    )}

                    {/* Game Over Screen */}
                    {gameOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                            <h3 className="text-4xl font-bold text-red-500 mb-2 glitch-effect" data-text="CONNECTION LOST">CONNECTION LOST</h3>
                            <p className="text-gray-300 mb-6">Final Score: <span className="text-neon-blue font-mono text-xl">{score}</span></p>
                            <button
                                onClick={(e) => { e.stopPropagation(); resetGame(); }}
                                className="flex items-center gap-2 px-6 py-3 bg-neon-blue text-black font-bold rounded-full hover:bg-white transition-all hover:scale-105"
                            >
                                <FaRedo /> RECONNECT
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default FlappyGame;
