import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaUniversity, FaLaptopCode, FaCode, FaDownload, FaGithub, FaLinkedin, FaInstagram, FaTerminal } from "react-icons/fa";

const profileImage = "/profile.jpg"; // Ensure this exists in public/

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

// ------------------- 3D Tilt Card with Holographic Effect -------------------
const TiltImageCard = () => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const glareX = useTransform(xSpring, [-0.5, 0.5], ["-100%", "200%"]);
  const glareY = useTransform(ySpring, [-0.5, 0.5], ["-100%", "200%"]);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  return (
    <div className="relative perspective-1000">
      {/* Floating Tech Stats */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -left-12 top-10 z-0 hidden md:flex flex-col gap-2"
      >
        <div className="bg-cyber-black/80 border border-neon-green/30 p-2 rounded text-[10px] font-mono text-neon-green backdrop-blur-sm">
          <div>STATUS: ONLINE</div>
          <div className="w-full h-1 bg-gray-800 mt-1 rounded-full overflow-hidden">
            <div className="h-full bg-neon-green w-3/4 animate-pulse"></div>
          </div>
        </div>
        <div className="bg-cyber-black/80 border border-neon-blue/30 p-2 rounded text-[10px] font-mono text-neon-blue backdrop-blur-sm">
          <div>CLASS: DEV</div>
          <div>LVL: 25</div>
        </div>
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX, rotateY }}
        className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 z-10"
      >
        {/* Holographic Border Frame */}
        <div className="absolute -inset-4 border-2 border-neon-green/20 rounded-3xl z-0 pointer-events-none"></div>
        <div className="absolute -inset-4 border border-neon-blue/20 rounded-3xl z-0 pointer-events-none scale-95"></div>

        {/* Corner Accents */}
        <div className="absolute -top-5 -left-5 w-8 h-8 border-t-2 border-l-2 border-neon-green rounded-tl-lg"></div>
        <div className="absolute -top-5 -right-5 w-8 h-8 border-t-2 border-r-2 border-neon-green rounded-tr-lg"></div>
        <div className="absolute -bottom-5 -left-5 w-8 h-8 border-b-2 border-l-2 border-neon-blue rounded-bl-lg"></div>
        <div className="absolute -bottom-5 -right-5 w-8 h-8 border-b-2 border-r-2 border-neon-blue rounded-br-lg"></div>

        <div className="absolute inset-0 rounded-2xl bg-gray-900 shadow-[0_0_50px_rgba(0,255,65,0.15)] overflow-hidden border border-gray-700 group">
          <img
            src={profileImage}
            alt="Shivam Kumar"
            className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
          />

          {/* Scanning Line Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/10 to-transparent h-[20%] w-full animate-scanline pointer-events-none"></div>

          {/* Shiny glare */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3), transparent 50%)`,
              mixBlendMode: "overlay",
            }}
          />

          {/* Overlay Tech Text */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-neon-green font-mono text-xs">ID: SHIVAM_KUMAR</p>
            <p className="text-neon-blue font-mono text-[10px]">ROLE: FULL_STACK_ARCHITECT</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ------------------- Floating Background Elements -------------------
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-neon-green/10 bg-neon-green/5 backdrop-blur-sm rounded-lg"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, Math.random() * -100],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: Math.random() * 50 + 20,
            height: Math.random() * 50 + 20,
          }}
        />
      ))}
    </div>
  );
};

// ------------------- Framer Motion variants -------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

// ------------------- About Section -------------------
const About = () => {
  const { x, y } = useMousePosition();

  const info = [
    { icon: <FaUniversity />, text: "MCA Student", sub: "Mastering Architecture" },
    { icon: <FaLaptopCode />, text: "Full-Stack Dev", sub: "Building Digital Worlds" },
    { icon: <FaCode />, text: "Problem Solver", sub: "Debugging Reality" },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center bg-cyber-black text-gray-100 overflow-hidden pt-24 font-gaming"
    >
      {/* --- Dynamic Background --- */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 255, 65, 0.05), transparent 40%),
            radial-gradient(800px circle at ${window.innerWidth - x}px ${window.innerHeight - y}px, rgba(0, 243, 255, 0.05), transparent 40%)
          `
        }}
      />

      {/* Cyber Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>

      <FloatingElements />

      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-6 md:p-20">

        {/* LEFT - 3D Image */}
        <motion.div
          className="flex justify-center items-center h-[450px] order-2 lg:order-1"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <TiltImageCard />
        </motion.div>

        {/* RIGHT - Text */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
            <FaTerminal className="text-neon-green animate-pulse" />
            <span className="text-neon-green font-mono text-sm tracking-widest">SYSTEM_INITIALIZED</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-gaming"
            variants={itemVariants}
          >
            HELLO, I'M <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-white to-neon-blue animate-text-shimmer bg-[length:200%_auto]">
              SHIVAM KUMAR
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="relative mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-blue opacity-30 blur-lg rounded-lg"></div>
            <h2 className="relative text-2xl md:text-3xl font-bold text-white">
              <span className="text-neon-blue">&lt;</span> Full-Stack Developer <span className="text-neon-blue">/&gt;</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed font-sans"
            variants={itemVariants}
          >
            As a <span className="text-neon-green">Level 25</span> MCA student, I specialize in crafting high-performance digital experiences.
            My mission is to turn complex algorithms into seamless, user-centric interfaces.
          </motion.p>

          {/* --- Info Boxes --- */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full"
          >
            {info.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, borderColor: 'var(--neon-green)' }}
                className="bg-gray-900/60 border border-gray-700 p-4 rounded-xl backdrop-blur-md flex flex-col items-center lg:items-start transition-colors group"
              >
                <div className="text-neon-blue text-2xl mb-2 group-hover:text-neon-green transition-colors">{item.icon}</div>
                <span className="text-white font-bold text-sm font-gaming tracking-wide">{item.text}</span>
                <span className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">{item.sub}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* --- Action Buttons --- */}
          <motion.div
            className="flex flex-wrap gap-6 items-center justify-center lg:justify-start"
            variants={itemVariants}
          >
            <a
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gray-900 font-gaming border-2 border-neon-green rounded-lg hover:bg-neon-green hover:text-black focus:outline-none ring-offset-2 focus:ring-2 ring-neon-green"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-900"></span>
              <FaDownload className="mr-2 group-hover:animate-bounce" />
              Download Resume
            </a>

            <div className="flex gap-4">
              <a href="https://github.com/shivam-work74" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"><FaGithub size={24} /></a>
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue hover:scale-110 transition-all duration-300"><FaLinkedin size={24} /></a>
              <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-pink hover:scale-110 transition-all duration-300"><FaInstagram size={24} /></a>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
