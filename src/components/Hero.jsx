import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaGamepad } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

// --- Mouse position hook ---
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

// --- Typing Animation Component ---
const TypingText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        if (index === text.length) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayedText}<span className="animate-pulse">_</span></span>;
};

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
      className="relative min-h-screen flex justify-center items-center text-white overflow-hidden pt-24 font-gaming"
      style={{
        background: `
          radial-gradient(
            600px circle at ${x}px ${y}px, 
            rgba(0, 255, 65, 0.1),
            transparent 80%
          )
        `,
      }}
    >

      {/* --- Content Container --- */}
      <div className="relative z-20 flex flex-col items-center text-center p-4 max-w-5xl mx-auto">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-lg md:text-xl text-neon-green font-medium mb-4 tracking-widest uppercase border border-neon-green px-4 py-1 rounded-full bg-cyber-black/50 backdrop-blur-sm"
            variants={itemVariants}
          >
            <span className="mr-2">System Initialized</span>
            <span className="inline-block w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight glitch-effect"
            data-text="LEVEL UP YOUR WEB EXPERIENCE"
            variants={itemVariants}
          >
            LEVEL UP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-blue to-neon-pink">
              YOUR WEB EXPERIENCE
            </span>
          </motion.h1>

          <motion.div
            className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl h-20"
            variants={itemVariants}
          >
            <span className="text-neon-blue">&gt; </span>
            <TypingText text="Initializing Full-Stack Protocols..." delay={1000} />
          </motion.div>

          {/* --- Buttons --- */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mb-10"
            variants={itemVariants}
          >
            <a
              href="#projects"
              className="group relative inline-block text-lg font-bold tracking-wider uppercase"
            >
              <span
                className="absolute inset-0 bg-neon-green opacity-50 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl"
              />
              <span className="relative flex items-center justify-center px-8 py-3 bg-cyber-black border border-neon-green text-neon-green hover:bg-neon-green hover:text-cyber-black transition-all duration-300 clip-path-polygon">
                <FaGamepad className="mr-2" />
                Start Mission
                <HiOutlineArrowNarrowRight className="ml-2 transition-transform transform group-hover:translate-x-1" />
              </span>
            </a>

            <motion.a
              href="#contact"
              className="group relative flex items-center justify-center px-8 py-3 bg-transparent border border-neon-blue text-neon-blue font-bold text-lg tracking-wider uppercase hover:bg-neon-blue/10 hover:shadow-[0_0_15px_var(--neon-blue)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Base
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
              className="text-gray-500 hover:text-neon-green transition-all transform hover:scale-110"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-8 h-8" />
            </a>
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-neon-blue transition-all transform hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-10 animate-bounce text-neon-green">
        <svg
          className="w-8 h-8"
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