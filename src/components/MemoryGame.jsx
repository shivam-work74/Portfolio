import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaTimes, FaBrain, FaUser, FaUserFriends, FaReact, FaNodeJs, FaPython,
    FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaDocker, FaGitAlt, FaLinux
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiGraphql, SiNextdotjs } from 'react-icons/si';

// --- Game Constants ---
const ICONS = [
    FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJs,
    FaDatabase, FaDocker, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql
];

const MemoryGame = ({ onClose }) => {
    const [mode, setMode] = useState('menu'); // menu, solo, pvp
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);

    // Solo State
    const [timer, setTimer] = useState(0);
    const [gameActive, setGameActive] = useState(false);

    // PvP State
    const [turn, setTurn] = useState(1); // Player 1 or 2
    const [scores, setScores] = useState({ 1: 0, 2: 0 });

    // --- Game Logic ---
    const initializeGame = () => {
        // Select 8 pairs (16 cards) for a 4x4 grid
        const selectedIcons = ICONS.sort(() => 0.5 - Math.random()).slice(0, 8);
        const deck = [...selectedIcons, ...selectedIcons]
            .sort(() => 0.5 - Math.random())
            .map((icon, index) => ({ id: index, icon }));

        setCards(deck);
        setFlipped([]);
        setSolved([]);
        setTimer(0);
        setScores({ 1: 0, 2: 0 });
        setTurn(1);
        setDisabled(false);
        setGameActive(true);
    };

    const handleCardClick = (id) => {
        if (disabled || flipped.includes(id) || solved.includes(id)) return;

        if (flipped.length === 0) {
            setFlipped([id]);
            return;
        }

        if (flipped.length === 1) {
            setDisabled(true);
            setFlipped([...flipped, id]);
            // Pass the first ID and the current ID to checkMatch
            checkMatch(flipped[0], id);
        }
    };

    const checkMatch = (firstId, secondId) => {
        const firstCard = cards.find(c => c.id === firstId);
        const secondCard = cards.find(c => c.id === secondId);

        if (firstCard.icon === secondCard.icon) {
            // Match!
            setSolved(prev => [...prev, firstId, secondId]);
            setFlipped([]);
            setDisabled(false);

            if (mode === 'pvp') {
                setScores(prev => ({ ...prev, [turn]: prev[turn] + 1 }));
                // Keep turn
            }
        } else {
            // No Match
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
                if (mode === 'pvp') {
                    setTurn(prev => (prev === 1 ? 2 : 1));
                }
            }, 1000);
        }
    };

    // Timer for Solo
    useEffect(() => {
        let interval;
        if (mode === 'solo' && gameActive && solved.length < cards.length) {
            interval = setInterval(() => setTimer(prev => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [mode, gameActive, solved, cards]);

    // --- Render Helpers ---
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const isGameOver = cards.length > 0 && solved.length === cards.length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
            <div className="relative bg-gray-900 border-2 border-neon-blue rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.3)] max-w-4xl w-full max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
                    <div className="flex items-center gap-4">
                        <FaBrain className="text-neon-blue text-2xl animate-pulse" />
                        <h2 className="text-xl font-bold text-white font-gaming tracking-wider">NEURAL NEXUS</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center min-h-[400px]">

                    {/* --- MENU MODE --- */}
                    {mode === 'menu' && (
                        <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl">
                            <button
                                onClick={() => { setMode('solo'); initializeGame(); }}
                                className="group relative p-8 bg-gray-800/50 border border-neon-green/30 rounded-2xl hover:bg-gray-800 hover:border-neon-green transition-all text-left"
                            >
                                <div className="absolute top-4 right-4 text-neon-green opacity-20 group-hover:opacity-100 transition-opacity">
                                    <FaUser size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors">SOLO RUN</h3>
                                <p className="text-gray-400">Time Attack Mode. Clear the neural network as fast as possible.</p>
                            </button>

                            <button
                                onClick={() => { setMode('pvp'); initializeGame(); }}
                                className="group relative p-8 bg-gray-800/50 border border-neon-blue/30 rounded-2xl hover:bg-gray-800 hover:border-neon-blue transition-all text-left"
                            >
                                <div className="absolute top-4 right-4 text-neon-blue opacity-20 group-hover:opacity-100 transition-opacity">
                                    <FaUserFriends size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">PvP LINK</h3>
                                <p className="text-gray-400">2-Player Hotseat. Compete to hack the most data nodes.</p>
                            </button>
                        </div>
                    )}

                    {/* --- GAME MODE --- */}
                    {(mode === 'solo' || mode === 'pvp') && (
                        <div className="w-full max-w-3xl">

                            {/* Game Stats Bar */}
                            <div className="flex justify-between items-center mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                {mode === 'solo' ? (
                                    <div className="text-2xl font-mono text-neon-green">
                                        TIME: {formatTime(timer)}
                                    </div>
                                ) : (
                                    <div className="flex gap-8 w-full justify-around">
                                        <div className={`flex items-center gap-2 ${turn === 1 ? 'text-neon-green scale-110 font-bold' : 'text-gray-500'} transition-all`}>
                                            <FaUser /> P1 SCORE: {scores[1]}
                                        </div>
                                        <div className={`flex items-center gap-2 ${turn === 2 ? 'text-neon-blue scale-110 font-bold' : 'text-gray-500'} transition-all`}>
                                            <FaUser /> P2 SCORE: {scores[2]}
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={() => setMode('menu')}
                                    className="text-sm text-gray-400 hover:text-white underline"
                                >
                                    Quit Match
                                </button>
                            </div>

                            {/* Game Grid */}
                            {!isGameOver ? (
                                <div className="grid grid-cols-4 gap-4 aspect-square max-w-[500px] mx-auto">
                                    {cards.map((card) => {
                                        const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
                                        const isSolved = solved.includes(card.id);

                                        return (
                                            <motion.button
                                                key={card.id}
                                                onClick={() => handleCardClick(card.id)}
                                                className={`relative w-full h-full rounded-xl perspective-1000 transition-all duration-300 ${isSolved ? 'opacity-50 cursor-default' : 'hover:scale-105'
                                                    }`}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div className={`w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                                                    {/* Front (Hidden) */}
                                                    <div className={`absolute inset-0 bg-gray-800 border-2 ${mode === 'pvp' && turn === 1 ? 'border-neon-green/30 hover:border-neon-green' : 'border-neon-blue/30 hover:border-neon-blue'} rounded-xl flex items-center justify-center backface-hidden`}>
                                                        <FaBrain className="text-gray-600 text-2xl" />
                                                    </div>

                                                    {/* Back (Revealed) */}
                                                    <div className={`absolute inset-0 bg-gray-700 border-2 ${isSolved ? 'border-neon-green bg-neon-green/10' : 'border-white'} rounded-xl flex items-center justify-center rotate-y-180 backface-hidden`}>
                                                        <card.icon className={`text-4xl ${isSolved ? 'text-neon-green' : 'text-white'}`} />
                                                    </div>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            ) : (
                                /* --- GAME OVER SCREEN --- */
                                <div className="text-center py-10">
                                    <h3 className="text-4xl font-bold text-white mb-4">SYSTEM HACKED!</h3>

                                    {mode === 'solo' ? (
                                        <p className="text-xl text-gray-300 mb-8">
                                            Clear Time: <span className="text-neon-green font-mono text-2xl">{formatTime(timer)}</span>
                                        </p>
                                    ) : (
                                        <div className="mb-8">
                                            <p className="text-xl text-gray-300 mb-2">
                                                {scores[1] > scores[2] ? (
                                                    <span className="text-neon-green font-bold">PLAYER 1 WINS!</span>
                                                ) : scores[2] > scores[1] ? (
                                                    <span className="text-neon-blue font-bold">PLAYER 2 WINS!</span>
                                                ) : (
                                                    <span className="text-white font-bold">IT'S A DRAW!</span>
                                                )}
                                            </p>
                                            <p className="text-gray-400">
                                                {scores[1]} - {scores[2]}
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={initializeGame}
                                        className="px-8 py-3 bg-neon-blue text-black font-bold rounded-full hover:bg-white transition-all"
                                    >
                                        PLAY AGAIN
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MemoryGame;
