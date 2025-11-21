import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes, FaHome, FaUser, FaCode, FaTools, FaEnvelope, FaGamepad } from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'MISSION: HOME', section: 'home', icon: <FaHome /> },
    { name: 'INTEL: ABOUT', section: 'about', icon: <FaUser /> },
    { name: 'OPERATIONS: PROJECTS', section: 'projects', icon: <FaCode /> },
    { name: 'ARCADE: GAMES', section: 'game-hub', icon: <FaGamepad /> },
    { name: 'ARSENAL: SKILLS', section: 'skills', icon: <FaTools /> },
    { name: 'COMMS: CONTACT', section: 'contact', icon: <FaEnvelope /> },
  ];

  return (
    <>
      {/* --- Scroll Progress Bar --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green to-neon-blue z-50 shadow-[0_0_10px_var(--neon-green)]"
        style={{ scaleX, originX: 0 }}
      />

      {/* --- Desktop Navigation --- */}
      <motion.nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 font-gaming ${scrolled
          ? 'bg-cyber-black/90 glass-panel border-b border-neon-green/30 py-3'
          : 'bg-transparent py-4'
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              spy={true}
              onSetActive={() => setActiveLink('home')}
              className="text-3xl font-extrabold tracking-wider cursor-pointer flex items-center gap-2"
            >
              <span className="text-neon-green glitch-effect" data-text="SHIVAM">
                SHIVAM
              </span>
              <span className="text-neon-pink text-sm border border-neon-pink px-1 rounded">.DEV_OP</span>
            </ScrollLink>
          </motion.div>

          {/* --- ENHANCED: Desktop Menu (Cyberpunk Style) --- */}
          <div className="hidden md:flex items-center space-x-1 bg-cyber-gray/50 rounded-none skew-x-[-10deg] border border-neon-blue/30 p-1 backdrop-blur-sm">
            {navItems.map((item) => (
              <motion.div key={item.name} whileTap={{ scale: 0.95 }} className="relative skew-x-[10deg]">
                <ScrollLink
                  to={item.section}
                  smooth={true}
                  duration={500}
                  offset={-96}
                  spy={true}
                  onSetActive={() => setActiveLink(item.section)}
                  className={`relative z-10 flex items-center px-4 py-2 text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer uppercase ${activeLink === item.section
                    ? 'text-cyber-black'
                    : 'text-gray-400 hover:text-neon-blue'
                    }`}
                >
                  <span className="mr-2 text-xs opacity-70">{item.icon}</span>
                  {item.name.split(': ')[1]}
                </ScrollLink>

                {activeLink === item.section && (
                  <motion.div
                    className="absolute inset-0 bg-neon-green shadow-[0_0_15px_var(--neon-green)] z-0"
                    layoutId="activePill"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden text-neon-green cursor-pointer z-50 hover:text-neon-blue transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-cyber-black/90 backdrop-blur-md z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-4/5 bg-cyber-gray border-l border-neon-green shadow-[0_0_30px_rgba(0,255,65,0.2)] z-30 md:hidden p-8 font-gaming"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full pt-20">
                <div className="flex flex-col space-y-6 flex-grow">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ScrollLink
                        to={item.section}
                        smooth={true}
                        duration={500}
                        offset={-96}
                        onClick={() => setIsOpen(false)}
                        onSetActive={() => setActiveLink(item.section)}
                        className={`flex items-center text-xl font-bold uppercase tracking-widest transition duration-300 cursor-pointer border-l-4 pl-4 ${activeLink === item.section
                          ? 'border-neon-green text-neon-green shadow-[inset_10px_0_20px_-10px_rgba(0,255,65,0.3)]'
                          : 'border-transparent text-gray-400 hover:text-white hover:border-neon-blue'
                          }`}
                      >
                        <span className="mr-4 text-sm">{item.icon}</span>
                        {item.name}
                      </ScrollLink>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-8 border-t border-gray-800">
                  <p className="text-gray-500 text-xs tracking-widest uppercase">
                    System Status: Online <span className="inline-block w-2 h-2 bg-neon-green rounded-full animate-pulse ml-2"></span>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;