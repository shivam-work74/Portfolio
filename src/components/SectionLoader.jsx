import React from 'react';
import { motion } from 'framer-motion';

const SectionLoader = () => {
    return (
        <div className="flex items-center justify-center w-full py-20 bg-studio-black">
            <div className="relative w-16 h-16">
                <motion.div
                    className="absolute inset-0 border-2 border-international-orange rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute inset-4 border-2 border-white rounded-full"
                    animate={{ scale: [1, 0.8, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-500">
                    LOAD
                </div>
            </div>
        </div>
    );
};

export default SectionLoader;
