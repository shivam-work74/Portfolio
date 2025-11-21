import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaTimes, FaTrophy, FaUndo } from 'react-icons/fa';

// --- Game Constants ---
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SIZE = 40;
const BULLET_SIZE = 8;
const ENEMY_SIZE = 30;
const PLAYER_SPEED = 7;
const BULLET_SPEED = 10;
const ENEMY_SPEED_BASE = 2;
const SPAWN_RATE = 1500; // ms

const MiniGame = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('start'); // start, playing, gameover
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem('cyberDefenseHighScore') || '0')
    );
    const [lives, setLives] = useState(3);

    // Game State Refs (for loop performance)
    const playerRef = useRef({ x: GAME_WIDTH / 2, width: PLAYER_SIZE, height: PLAYER_SIZE });
    const bulletsRef = useRef([]);
    const enemiesRef = useRef([]);
    const keysRef = useRef({});
    const frameIdRef = useRef(null);
    const lastSpawnTimeRef = useRef(0);
    const scoreRef = useRef(0);

    // --- Input Handling ---
    useEffect(() => {
        const handleKeyDown = (e) => (keysRef.current[e.code] = true);
        const handleKeyUp = (e) => (keysRef.current[e.code] = false);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // --- Game Loop ---
    const update = useCallback((time) => {
        if (gameState !== 'playing') return;

        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        // Clear Canvas
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // --- Player Logic ---
        if (keysRef.current['ArrowLeft'] || keysRef.current['KeyA']) {
            playerRef.current.x = Math.max(0, playerRef.current.x - PLAYER_SPEED);
        }
        if (keysRef.current['ArrowRight'] || keysRef.current['KeyD']) {
            playerRef.current.x = Math.min(GAME_WIDTH - PLAYER_SIZE, playerRef.current.x + PLAYER_SPEED);
        }

        // Shoot
        if (keysRef.current['Space'] && !keysRef.current.spaceLocked) {
            bulletsRef.current.push({
                x: playerRef.current.x + PLAYER_SIZE / 2 - BULLET_SIZE / 2,
                y: GAME_HEIGHT - PLAYER_SIZE,
                width: BULLET_SIZE,
                height: BULLET_SIZE * 2,
            });
            keysRef.current.spaceLocked = true; // Prevent rapid fire
        }
        if (!keysRef.current['Space']) keysRef.current.spaceLocked = false;

        // --- Bullets Logic ---
        ctx.fillStyle = '#00ff41'; // Neon Green
        bulletsRef.current.forEach((b, i) => {
            b.y -= BULLET_SPEED;
            ctx.fillRect(b.x, b.y, b.width, b.height);
            // Remove off-screen
            if (b.y < 0) bulletsRef.current.splice(i, 1);
        });

        // --- Enemy Logic ---
        // Spawn
        if (time - lastSpawnTimeRef.current > Math.max(500, SPAWN_RATE - scoreRef.current * 10)) {
            enemiesRef.current.push({
                x: Math.random() * (GAME_WIDTH - ENEMY_SIZE),
                y: -ENEMY_SIZE,
                width: ENEMY_SIZE,
                height: ENEMY_SIZE,
                type: Math.random() > 0.8 ? 'bug' : 'error', // 20% chance for 'bug' (harder?)
            });
            lastSpawnTimeRef.current = time;
        }

        // Update & Draw Enemies
        enemiesRef.current.forEach((e, i) => {
            e.y += ENEMY_SPEED_BASE + scoreRef.current * 0.01;

            // Draw Enemy (Simple Shapes for now, could be icons)
            ctx.fillStyle = e.type === 'bug' ? '#ff00ff' : '#ff3333'; // Magenta or Red
            ctx.beginPath();
            ctx.arc(e.x + ENEMY_SIZE / 2, e.y + ENEMY_SIZE / 2, ENEMY_SIZE / 2, 0, Math.PI * 2);
            ctx.fill();

            // Game Over Check
            if (e.y > GAME_HEIGHT) {
                enemiesRef.current.splice(i, 1);
                setLives(prev => {
                    const newLives = prev - 1;
                    if (newLives <= 0) endGame();
                    return newLives;
                });
            }

            // Collision with Player
            if (
                e.x < playerRef.current.x + playerRef.current.width &&
                e.x + e.width > playerRef.current.x &&
                e.y < GAME_HEIGHT &&
                e.y + e.height > GAME_HEIGHT - playerRef.current.height
            ) {
                endGame();
            }
        });

        // --- Collision Detection (Bullets vs Enemies) ---
        bulletsRef.current.forEach((b, bIdx) => {
            enemiesRef.current.forEach((e, eIdx) => {
                if (
                    b.x < e.x + e.width &&
                    b.x + b.width > e.x &&
                    b.y < e.y + e.height &&
                    b.y + b.height > e.y
                ) {
                    // Hit!
                    bulletsRef.current.splice(bIdx, 1);
                    enemiesRef.current.splice(eIdx, 1);
                    scoreRef.current += 10;
                    setScore(scoreRef.current);
                }
            });
        });

        // --- Draw Player ---
        ctx.fillStyle = '#00f3ff'; // Neon Blue
        // Simple Triangle Ship
        ctx.beginPath();
        ctx.moveTo(playerRef.current.x + PLAYER_SIZE / 2, GAME_HEIGHT - PLAYER_SIZE);
        ctx.lineTo(playerRef.current.x + PLAYER_SIZE, GAME_HEIGHT);
        ctx.lineTo(playerRef.current.x, GAME_HEIGHT);
        ctx.closePath();
        ctx.fill();

        frameIdRef.current = requestAnimationFrame(update);
    }, [gameState]);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setLives(3);
        scoreRef.current = 0;
        bulletsRef.current = [];
        enemiesRef.current = [];
        playerRef.current.x = GAME_WIDTH / 2;
        lastSpawnTimeRef.current = performance.now();
        frameIdRef.current = requestAnimationFrame(update);
    };

    const endGame = () => {
        setGameState('gameover');
        cancelAnimationFrame(frameIdRef.current);
        if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current);
            localStorage.setItem('cyberDefenseHighScore', scoreRef.current.toString());
        }
    };

    // Cleanup
    useEffect(() => {
        return () => cancelAnimationFrame(frameIdRef.current);
    }, []);

    // Re-trigger loop when state changes to playing
    useEffect(() => {
        if (gameState === 'playing') {
            frameIdRef.current = requestAnimationFrame(update);
        }
    }, [gameState, update]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
            <div className="relative bg-gray-900 border-2 border-neon-green rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.3)] max-w-4xl w-full">

                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
                    <div className="flex items-center gap-4">
                        <FaGamepad className="text-neon-green text-2xl" />
                        <h2 className="text-xl font-bold text-white font-gaming tracking-wider">CYBER DEFENSE PROTOCOL</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Game Area */}
                <div className="relative bg-black aspect-[4/3] w-full max-h-[60vh] sm:max-h-[70vh]">
                    <canvas
                        ref={canvasRef}
                        width={GAME_WIDTH}
                        height={GAME_HEIGHT}
                        className="w-full h-full object-contain block"
                    />

                    {/* UI Overlay */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between text-white font-mono text-lg pointer-events-none">
                        <div>SCORE: <span className="text-neon-green">{score}</span></div>
                        <div className="flex items-center gap-2">
                            <FaTrophy className="text-yellow-400" />
                            HI-SCORE: {highScore}
                        </div>
                        <div className="text-red-500">LIVES: {'♥'.repeat(lives)}</div>
                    </div>

                    {/* Start Screen */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-center p-6">
                            <h3 className="text-4xl md:text-6xl font-bold text-neon-green mb-4 glitch-effect" data-text="DEFEND THE SYSTEM">DEFEND THE SYSTEM</h3>
                            <p className="text-gray-300 mb-8 max-w-md">
                                Bugs are attacking the codebase! Use <span className="text-white font-bold">Arrow Keys</span> to move and <span className="text-white font-bold">Spacebar</span> to deploy hotfixes.
                            </p>
                            <button
                                onClick={startGame}
                                className="px-8 py-3 bg-neon-green text-black font-bold rounded-full hover:bg-white hover:scale-105 transition-all"
                            >
                                INITIALIZE DEFENSE
                            </button>
                        </div>
                    )}

                    {/* Game Over Screen */}
                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/80 text-center p-6">
                            <h3 className="text-5xl font-bold text-white mb-2">SYSTEM CRITICAL</h3>
                            <p className="text-xl text-red-200 mb-6">The bugs have taken over.</p>

                            <div className="text-3xl font-mono mb-8">
                                FINAL SCORE: <span className="text-white">{score}</span>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={startGame}
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-red-900 font-bold rounded-full hover:bg-gray-200 transition-all"
                                >
                                    <FaUndo /> RETRY
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all"
                                >
                                    EXIT
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Controls (Visible only on touch devices usually, but good for testing) */}
                <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-center gap-8 md:hidden">
                    <button
                        className="p-4 bg-gray-700 rounded-full active:bg-neon-green/50"
                        onTouchStart={() => keysRef.current['ArrowLeft'] = true}
                        onTouchEnd={() => keysRef.current['ArrowLeft'] = false}
                    >
                        ⬅️
                    </button>
                    <button
                        className="p-4 bg-red-500/20 border border-red-500 rounded-full active:bg-red-500/50"
                        onTouchStart={() => keysRef.current['Space'] = true}
                        onTouchEnd={() => keysRef.current['Space'] = false}
                    >
                        🔥 FIRE
                    </button>
                    <button
                        className="p-4 bg-gray-700 rounded-full active:bg-neon-green/50"
                        onTouchStart={() => keysRef.current['ArrowRight'] = true}
                        onTouchEnd={() => keysRef.current['ArrowRight'] = false}
                    >
                        ➡️
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MiniGame;
