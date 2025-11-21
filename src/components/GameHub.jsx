import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaBrain, FaPlay, FaTrophy } from 'react-icons/fa';
import MiniGame from './MiniGame';
import MemoryGame from './MemoryGame';

const GameHub = () => {
    const [activeGame, setActiveGame] = useState(null);

    const games = [
        {
            id: 'cyber-defense',
            title: 'CYBER DEFENSE',
            description: 'Defend the codebase from incoming bugs in this Space Invaders-style shooter.',
            icon: <FaGamepad className="text-5xl text-neon-blue" />,
            color: 'neon-blue',
            component: MiniGame
        },
        {
            id: 'neural-nexus',
            title: 'NEURAL NEXUS',
            description: 'Test your memory protocols. Match tech stack icons in Solo or PvP modes.',
            icon: <FaBrain className="text-5xl text-neon-pink" />,
            color: 'neon-pink',
            component: MemoryGame
        }
    ];

    return (
        <section id="game-hub" className="py-20 relative overflow-hidden min-h-screen flex items-center">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-cyber-black opacity-90 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-pink to-neon-green glitch-effect" data-text="CYBER ARCADE">
                        CYBER ARCADE
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-gaming">
                        <span className="text-neon-green mr-2">&gt;</span>
                        Select a simulation to test your skills.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            className={`glass-panel p-8 rounded-2xl border border-${game.color}/30 hover:border-${game.color} transition-all duration-300 group relative overflow-hidden`}
                        >
                            {/* Hover Glow */}
                            <div className={`absolute inset-0 bg-${game.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                            <div className="flex flex-col items-center text-center">
                                <div className={`mb-6 p-6 rounded-full bg-gray-900/50 border border-${game.color}/20 group-hover:border-${game.color} group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300`}>
                                    {game.icon}
                                </div>

                                <h3 className={`text-3xl font-bold mb-4 text-white group-hover:text-${game.color} transition-colors font-gaming`}>
                                    {game.title}
                                </h3>

                                <p className="text-gray-400 mb-8 min-h-[3rem]">
                                    {game.description}
                                </p>

                                <button
                                    onClick={() => setActiveGame(game.id)}
                                    className={`group relative px-8 py-3 bg-transparent border border-${game.color} text-${game.color} font-bold uppercase tracking-widest hover:bg-${game.color} hover:text-black transition-all duration-300 clip-path-polygon flex items-center gap-2`}
                                >
                                    <FaPlay className="text-sm" />
                                    Initialize
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* High Score Teaser */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-gray-500 text-sm uppercase tracking-widest border border-gray-800 px-4 py-2 rounded-full bg-black/30">
                        <FaTrophy className="text-yellow-500" />
                        <span>Scores saved to local memory</span>
                    </div>
                </motion.div>
            </div>

            {/* Game Modals */}
            <AnimatePresence>
                {activeGame === 'cyber-defense' && (
                    <MiniGame onClose={() => setActiveGame(null)} />
                )}
                {activeGame === 'neural-nexus' && (
                    <MemoryGame onClose={() => setActiveGame(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default GameHub;
