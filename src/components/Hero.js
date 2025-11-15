import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

// --- Mouse position hook (This is stable) ---
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
};

// --- Framer Motion variants (These are fine) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const Hero = () => {
  const { x, y } = useMousePosition();

  return (
    <section
      id="home"
      // Using default 'bg-gray-900' and 'text-gray-100'
      className="relative min-h-screen flex justify-center items-center bg-gray-900 text-gray-100 overflow-hidden pt-24" // <-- Kept the pt-24 padding
      style={{
        // --- NEW MOUSE EFFECT (using 'emerald' green) ---
        background: `
          radial-gradient(
            600px circle at ${x}px ${y}px, 
            rgba(16, 185, 129, 0.15), /* <-- FIXED: Using default 'emerald' color */
            transparent 80%
          ),
          #111827 /* <-- bg-gray-900 */
        `,
      }}
    >
      {/* --- Subtle Grid Background --- */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      
      {/* --- Content Container --- */}
      <div className="relative z-20 flex flex-col items-center text-center p-4 max-w-4xl mx-auto">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            // FIXED: Using 'text-emerald-500'
            className="text-lg md:text-xl text-emerald-500 font-medium mb-4"
            variants={itemVariants}
          >
            👋 Hi, I'm Shivam Kumar
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
            variants={itemVariants}
          >
            I Build <span className="text-green bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500"> {/* <-- FIXED: 'emerald' to 'sky' gradient */}
              Modern
            </span>{' '}
            Web Experiences
          </motion.h1>

          <motion.p
            // Using default 'text-gray-400'
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl"
            variants={itemVariants}
          >
            As a Full-Stack Developer, I specialize in turning complex ideas 
            into responsive, high-performance applications that users love.
          </motion.p>

          {/* --- "Shiny" Button with NEW Colors --- */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mb-10"
            variants={itemVariants}
          >
            <a
              href="#projects"
              className="group relative inline-block text-lg font-medium"
            >
              {/* FIXED: 'emerald'/'sky' gradient */}
              <span 
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 via-sky-500 to-emerald-500 opacity-75 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl animate-border-spin" 
              />
              
              {/* This is the actual button content */}
              <span className="relative flex items-center justify-center px-8 py-3 bg-gray-800 rounded-lg shadow-lg"> {/* Using 'bg-gray-800' */}
                View My Work
                <HiOutlineArrowNarrowRight className="ml-2 transition-transform transform group-hover:translate-x-1" />
              </span>
            </a>

            {/* Secondary Button (Simpler) */}
            <motion.a
              href="#contact"
              className="group relative flex items-center justify-center px-8 py-3 bg-gray-800 rounded-lg font-bold text-lg text-gray-300 shadow-lg hover:bg-gray-700"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-8 items-center"
            variants={itemVariants}
          >
            <a
              href="https://github.com/shivam-work74" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-100 transition-all"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-8 h-8" />
            </a>
            <a
              href="https://linkedin.com/in/your-profile" // <-- IMPORTANT: Add your link
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-emerald-500 transition-all" // FIXED: Hover to 'emerald'
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-10 animate-bounce">
        <svg
          className="w-8 h-8 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;