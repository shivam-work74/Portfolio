import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import useStore from '../store';
import { achievements } from '../constants/data';
import soundManager from '../utils/SoundManager';

const AchievementToast = () => {
    const unlockedAchievements = useStore((state) => state.unlockedAchievements);
    const [queue, setQueue] = useState([]);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        // Find newly unlocked achievements that aren't in the queue or being shown
        const newAchievements = unlockedAchievements.filter(id =>
            !queue.find(a => a.id === id) && (!current || current.id !== id)
        );

        if (newAchievements.length > 0) {
            const achievementData = achievements.find(a => a.id === newAchievements[0]);
            if (achievementData) {
                setQueue(prev => [...prev, achievementData]);
            }
        }
    }, [unlockedAchievements, queue, current]);

    useEffect(() => {
        if (!current && queue.length > 0) {
            const next = queue[0];
            setCurrent(next);
            setQueue(prev => prev.slice(1));
            soundManager.playAchievement();

            const timer = setTimeout(() => {
                setCurrent(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [current, queue]);

    return (
        <div className="fixed bottom-10 right-10 z-[100] pointer-events-none">
            <AnimatePresence>
                {current && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        className="bg-studio-black border border-international-orange/30 p-4 rounded-lg flex items-center gap-4 shadow-2xl backdrop-blur-md"
                    >
                        <div className="w-12 h-12 bg-international-orange/20 rounded-full flex items-center justify-center text-international-orange">
                            <HiOutlineBadgeCheck size={28} />
                        </div>
                        <div>
                            <h4 className="font-mono text-[10px] text-international-orange tracking-[0.2em] uppercase mb-1">
                                Achievement Unlocked
                            </h4>
                            <h3 className="font-display text-lg font-bold text-white">
                                {current.title}
                            </h3>
                            <p className="font-mono text-[10px] text-gray-500">
                                {current.description}
                            </p>
                        </div>

                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                            animate={{ x: ['100%', '-100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AchievementToast;
