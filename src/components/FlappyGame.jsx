import React from 'react';

const FlappyGame = ({ onClose }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-white">
            <h2 className="text-3xl font-bold mb-4">GRAVITY GLITCH</h2>
            <p className="mb-4">Gravity Systems Stable (No Data).</p>
            <button
                onClick={onClose}
                className="px-6 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
            >
                Abort
            </button>
        </div>
    );
};

export default FlappyGame;
