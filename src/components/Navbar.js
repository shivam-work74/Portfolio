import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes, FaHome, FaUser, FaCode, FaTools, FaEnvelope } from 'react-icons/fa';
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
    { name: 'Home', section: 'home', icon: <FaHome /> },
    { name: 'About', section: 'about', icon: <FaUser /> },
    { name: 'Projects', section: 'projects', icon: <FaCode /> },
    { name: 'Skills', section: 'skills', icon: <FaTools /> },
    { name: 'Contact', section: 'contact', icon: <FaEnvelope /> },
  ];

  return (
    <>
      {/* --- Scroll Progress Bar --- */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-sky-500 z-50"
        style={{ scaleX, originX: 0 }}
      />

      {/* --- Desktop Navigation --- */}
      <motion.nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-xl border-b border-gray-800 py-3' 
            : 'bg-gray-900/80 backdrop-blur-md py-4'
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
              className="text-3xl font-extrabold tracking-wider cursor-pointer"
            >
              <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
                
              </span>
              <span className="text-gray-300">.dev</span>
            </ScrollLink>
          </motion.div>

          {/* --- ENHANCED: Desktop Menu (with Sliding Pill) --- */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-800/50 rounded-full p-1 border border-gray-700/50">
            {navItems.map((item) => (
              <motion.div key={item.name} whileTap={{ scale: 0.95 }} className="relative">
                <ScrollLink
                  to={item.section}
                  smooth={true}
                  duration={500}
                  offset={-96} 
                  spy={true}
                  onSetActive={() => setActiveLink(item.section)}
                  className={`relative z-10 flex items-center px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeLink === item.section
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </ScrollLink>
                
                {activeLink === item.section && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg z-0"
                    layoutId="activePill"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Hamburger (Unchanged) */}
          <div className="md:hidden text-gray-200 cursor-pointer z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Menu (Unchanged) --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-lg z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-4/5 bg-gray-900/95 backdrop-blur-xl z-30 md:hidden p-8"
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
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ScrollLink
                        to={item.section}
                        smooth={true}
                        duration={500}
                        offset={-96} // Adjusted offset
                        onClick={() => setIsOpen(false)}
                        onSetActive={() => setActiveLink(item.section)}
                        className={`flex items-center text-2xl font-medium transition duration-300 cursor-pointer ${
                          activeLink === item.section
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <span className="mr-4">{item.icon}</span>
                        {item.name}
                      </ScrollLink>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-8 border-t border-gray-800">
                  <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Shivam Kumar.
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