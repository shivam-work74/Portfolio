import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../constants/data';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-studio-black/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
          }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex justify-between items-center font-display">

          {/* Logo */}
          <a href="#home" className="text-xl font-bold tracking-tighter mix-blend-difference z-50">
            SHIVAM<span className="text-international-orange">.ARc</span>
          </a>

          {/* Desktop Menu - Minimal Text Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.section}`}
                className="text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative group"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-international-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button - Magnetic */}
          <button
            className="md:hidden z-50 text-white mix-blend-difference"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1.5">
              <span className={`block w-8 h-[2px] bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-8 h-[2px] bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-8 h-[2px] bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-carbon z-40 flex items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.section}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-display font-bold text-white hover:text-international-orange transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;