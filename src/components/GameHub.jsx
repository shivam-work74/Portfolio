import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gamesData } from '../constants/data';
import { FaGamepad, FaMicrochip, FaDna, FaShieldAlt, FaRocket } from 'react-icons/fa';

// Import game components
import MiniGame from './MiniGame'; // Cyber Defense
import MemoryGame from './MemoryGame'; // Neural Nexus
import SnakeGame from './SnakeGame'; // Cyber Serpent
import FlappyGame from './FlappyGame'; // Gravity Glitch

const GameIcon = ({ id }) => {
    switch (id) {
        case 'cyber-defense': return <FaShieldAlt size={40} />;
        case 'neural-nexus': return <FaMicrochip size={40} />;
        case 'cyber-serpent': return <FaDna size={40} />;
        case 'gravity-glitch': return <FaRocket size={40} />;
        default: return <FaGamepad size={40} />;
    }
}

const LabCard = ({ game, index, setActiveGame }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative h-[400px] bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden hover:border-international-orange/50 transition-all duration-500"
        >
            {/* Holographic Scanline */}
            <div className="absolute top-0 left-0 w-full h-1 bg-international-orange/50 shadow-[0_0_20px_rgba(255,79,0,0.5)] transform -translate-y-full group-hover:translate-y-[400px] transition-transform duration-[1.5s] ease-linear pointer-events-none z-20" />

            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500" />

            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="text-white/20 group-hover:text-international-orange transition-colors duration-500">
                            <GameIcon id={game.id} />
                        </div>
                        <div className="font-mono text-[10px] text-international-orange border border-international-orange/30 px-2 py-1 bg-black/50">
                            VER. 1.0.{index}
                        </div>
                    </div>

                    <h3 className="font-display text-3xl font-bold text-white mb-2 leading-none group-hover:translate-x-2 transition-transform duration-300">
                        {game.title}
                    </h3>
                    <div className="w-12 h-1 bg-white/10 group-hover:bg-international-orange transition-colors duration-300 mb-4" />

                    <p className="font-sans text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {game.description}
                    </p>
                </div>

                <button
                    onClick={() => setActiveGame(game.id)}
                    className="w-full py-4 border-t border-white/10 flex justify-between items-center group-hover:border-international-orange/30 transition-colors"
                >
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                        [Initialize]
                    </span>
                    <FaGamepad className="text-gray-600 group-hover:text-international-orange transition-colors" />
                </button>
            </div>

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-international-orange transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-international-orange transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-international-orange transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-international-orange transition-colors" />

        </motion.div>
    )
}

const GameHub = () => {
    const [activeGame, setActiveGame] = useState(null);

    const closeModal = () => setActiveGame(null);

    const getGameComponent = (id) => {
        switch (id) {
            case 'cyber-defense': return <MiniGame onClose={closeModal} />;
            case 'neural-nexus': return <MemoryGame onClose={closeModal} />;
            case 'cyber-serpent': return <SnakeGame onClose={closeModal} />;
            case 'gravity-glitch': return <FlappyGame onClose={closeModal} />;
            default: return null;
        }
    };

    return (
        <section id="game-hub" className="min-h-screen py-24 bg-transparent flex items-center relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
                    <div>
                        <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-2 leading-none">
                            R&D<br />LAB
                        </h2>
                        <p className="font-mono text-international-orange tracking-widest uppercase text-sm mt-4">
                            // Experimental Simulations
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 max-w-sm text-right">
                        <p className="font-sans text-sm text-gray-400">
                            Access authorized experiments. Test cognitive reflexes and problem-solving algorithms in a controlled environment.
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {gamesData.map((game, i) => (
                        <LabCard
                            key={game.id}
                            game={game}
                            index={i}
                            setActiveGame={setActiveGame}
                        />
                    ))}
                </div>

            </div>

            {/* Game Modal - Simulation Chamber */}
            <AnimatePresence>
                {activeGame && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal} />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative z-50 w-full max-w-6xl h-[85vh] bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
                        >
                            {/* Terminal Header */}
                            <div className="h-12 border-b border-white/10 bg-black/50 flex items-center justify-between px-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    </div>
                                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                                        RUNNING_PROCESS: {activeGame.toUpperCase()}
                                    </span>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="font-mono text-xs text-red-500 hover:text-white uppercase tracking-widest transition-colors"
                                >
                                    [TERMINATE_PROCESS_X]
                                </button>
                            </div>

                            {/* Game Viewport */}
                            <div className="flex-1 relative bg-grid-pattern bg-[length:30px_30px] opacity-100">
                                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                                {getGameComponent(activeGame)}
                            </div>

                            {/* Footer Status */}
                            <div className="h-8 border-t border-white/10 bg-black/50 flex items-center px-6 gap-6">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest">
                                    SIMULATION ACTIVE
                                </span>
                                <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest ml-auto">
                                    CPU: 12% | MEM: 405MB
                                </span>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default GameHub;
