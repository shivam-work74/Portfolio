import React from 'react';

const MemoryGame = ({ onClose }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-white">
            <h2 className="text-3xl font-bold mb-4">NEURAL NEXUS</h2>
            <p className="mb-4">Memory Matrix Offline.</p>
            <button
                onClick={onClose}
                className="px-6 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
            >
                Abort
            </button>
        </div>
    );
};

export default MemoryGame;
