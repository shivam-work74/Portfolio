import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { heroData } from '../constants/data';
import { FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-20"
    >
      {/* Background Text Texture */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-display font-bold whitespace-nowrap animate-spin-slow">
          ARCHITECTURE
        </span>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center flex flex-col items-center max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col items-center"
        >
          <span className="text-sm font-mono tracking-[0.3em] text-international-orange uppercase mb-4 block">
            {heroData.subtitle}
          </span>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tighter mb-8 mix-blend-difference">
            {heroData.title.split(' ').map((word, i) => (
              <span key={i} className="block hover:text-outline hover:text-transparent transition-all duration-500 cursor-default">
                {word}
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-400 font-sans max-w-lg text-lg leading-relaxed mb-12"
        >
          {heroData.typingText[0]}
        </motion.p>

        {/* Call to Action */}
        <div className="flex gap-6">
          <a href="#projects" className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-xs overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Data</span>
            <div className="absolute inset-0 bg-carbon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
          <a href="#contact" className="group relative px-8 py-4 border border-white/20 text-white font-bold tracking-widest uppercase text-xs hover:bg-white/5 transition-colors">
            <span>Contact</span>
          </a>
        </div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 mix-blend-difference"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <FaArrowDown className="text-xs" />
      </motion.div>

    </header>
  );
};

export default Hero;