/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Digital Architect Palette
        'studio-black': '#050505',
        'carbon': '#1a1a1a',
        'vapor': '#f0f0f0',
        'alabaster': '#fafafa',
        'international-orange': '#FF4F00',
        'electric-indigo': '#4F46E5',
        'architect-gray': '#D4D4D4',

        // Legacy support (to prevent crashes before full migration)
        'cyber-black': '#050505',
        'neon-green': '#FF4F00', // Remapped to orange
        'neon-blue': '#4F46E5',  // Remapped to indigo
        'neon-pink': '#f0f0f0',  // Remapped to vapor
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], // Body
        'display': ['Syne', 'Space Grotesk', 'sans-serif'], // Headlines
        'mono': ['JetBrains Mono', 'monospace'], // Technical details
        'gaming': ['Syne', 'sans-serif'], // Remapped legacy
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
        'dot-pattern': "radial-gradient(#1a1a1a 1px, transparent 1px)",
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
};
