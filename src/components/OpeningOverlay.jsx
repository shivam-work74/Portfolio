import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/index';
import soundManager from '../utils/SoundManager';
import { FaFingerprint, FaLock, FaMicrochip } from 'react-icons/fa';

const OpeningOverlay = () => {
    const hasStarted = useStore((state) => state.hasStarted);
    const setStarted = useStore((state) => state.setStarted);
    const [bootStep, setBootStep] = useState(0); // 0: Init, 1: Scanning, 2: Access Granted
    const [progress, setProgress] = useState(0);

    // Boot Sequence Logic
    useEffect(() => {
        if (hasStarted) return;

        // Step 0: Progress Bar (0 to 100)
        let progressInterval;
        if (bootStep === 0) {
            progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setBootStep(1);
                        return 100;
                    }
                    return prev + 2; // Speed of load
                });
            }, 30);
        }

        // Step 1: Scanning Delay
        if (bootStep === 1) {
            const timer = setTimeout(() => {
                setBootStep(2);
            }, 2000);
            return () => clearTimeout(timer);
        }

        return () => clearInterval(progressInterval);
    }, [hasStarted, bootStep]);

    const unlockAchievement = useStore((state) => state.unlockAchievement);

    const handleInitialize = () => {
        soundManager.init();
        soundManager.playClick();
        soundManager.playAmbient();
        unlockAchievement(6); // Architect Initialized
        setStarted(true);
    };

    if (hasStarted) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden cursor-wait">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            <AnimatePresence mode="wait">

                {/* STAGE 0: SYSTEM LOADER */}
                {bootStep === 0 && (
                    <motion.div
                        key="boot"
                        className="flex flex-col items-center w-full max-w-md px-6"
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FaMicrochip className="text-4xl text-international-orange mb-8 animate-pulse" />
                        <div className="font-mono text-xs text-international-orange mb-2 tracking-widest w-full flex justify-between">
                            <span>LOADING_ASSETS</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-international-orange"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="mt-4 font-mono text-[10px] text-gray-600 text-left w-full h-20 overflow-hidden">
                            <p>&gt; MOUNTING_COMPONENT: HERO_CORE</p>
                            <p>&gt; PRELOADING_TEXTURES: NEURAL_VOID</p>
                            <p className={progress > 50 ? "text-white" : "text-transparent"}> &gt; ESTABLISHING_UPLINK... OK</p>
                            <p className={progress > 80 ? "text-white" : "text-transparent"}> &gt; OPTIMIZING_SHADER_CACHE... OK</p>
                        </div>
                    </motion.div>
                )}

                {/* STAGE 1: IDENTITY SCAN */}
                {bootStep === 1 && (
                    <motion.div
                        key="scan"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center relative"
                    >
                        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-2 border-international-orange rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 border-b-2 border-white/20 rounded-full"
                            />
                            <FaFingerprint className="text-6xl text-international-orange animate-pulse" />
                        </div>
                        <h2 className="font-display text-2xl text-white tracking-widest uppercase mb-2">
                            Verifying Identity
                        </h2>
                        <span className="font-mono text-xs text-international-orange animate-pulse">
                            BIOMETRIC_SCAN_IN_PROGRESS...
                        </span>
                    </motion.div>
                )}

                {/* STAGE 2: ACCESS GRANTED (BUTTON) */}
                {bootStep === 2 && (
                    <motion.div
                        key="access"
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center z-50 cursor-auto"
                    >
                        <div className="mb-8 p-4 border border-green-500/30 bg-green-500/10 rounded-full">
                            <FaLock className="text-4xl text-green-500" />
                        </div>

                        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                            ACCESS GRANTED
                        </h1>
                        <p className="font-mono text-gray-400 text-sm mb-12 tracking-widest uppercase">
                            Secure Connection Established
                        </p>

                        <button
                            onClick={handleInitialize}
                            className="group relative px-12 py-5 bg-transparent border border-white/20 overflow-hidden hover:border-international-orange transition-colors duration-500"
                        >
                            <div className="absolute inset-0 bg-international-orange transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10 font-mono text-sm font-bold text-white tracking-[0.3em] uppercase group-hover:text-black transition-colors">
                                [ Initialize_System ]
                            </span>
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Footer */}
            <div className="absolute bottom-10 left-0 w-full text-center">
                <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
                    Secure Gateway v9.0.1
                </span>
            </div>

        </div>
    );
};

export default OpeningOverlay;
