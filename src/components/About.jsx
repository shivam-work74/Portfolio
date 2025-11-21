import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaUniversity, FaLaptopCode, FaCode, FaDownload, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

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

// ------------------- 3D Tilt Card -------------------
const TiltImageCard = () => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const glareX = useTransform(xSpring, [-0.5, 0.5], ["-100%", "180%"]);
  const glareY = useTransform(ySpring, [-0.5, 0.5], ["-80%", "200%"]);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      className="relative w-80 h-80 md:w-96 md:h-96"
    >
      <div className="absolute inset-0 rounded-3xl border border-emerald-500/40 bg-gray-900 shadow-xl overflow-hidden">
        <img
          src={profileImage}
          alt="Shivam Kumar"
          className="w-full h-full object-cover rounded-3xl"
        />

        {/* Shiny glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.25), transparent 40%)`,
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </motion.div>
  );
};

// ------------------- Framer Motion variants -------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

// ------------------- About Section -------------------
const About = () => {
  const { x, y } = useMousePosition();
  
  const info = [
    { icon: <FaUniversity />, text: "MCA Student" },
    { icon: <FaLaptopCode />, text: "Full-Stack Developer" },
    { icon: <FaCode />, text: "Problem Solver" },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center bg-gray-900 text-gray-100 overflow-hidden pt-24"
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
      
      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center p-4 md:p-20">

        {/* LEFT - 3D Image */}
        <motion.div
          className="flex justify-center items-center h-96"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <TiltImageCard />
        </motion.div>

        {/* RIGHT - Text */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left"
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
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
            variants={itemVariants}
          >
            I'm a <span className="text-green bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500"> {/* <-- FIXED: 'emerald' to 'sky' gradient */}
              Full-Stack Developer
            </span>{' '}
          </motion.h1>

          <motion.p
            // Using default 'text-gray-400'
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl"
            variants={itemVariants}
          >
            As a Full-Stack Developer and MCA student, I specialize in turning complex ideas 
            into responsive, high-performance applications that users love.
          </motion.p>

          {/* --- "Shiny" Button with NEW Colors --- */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mb-10"
            variants={itemVariants}
          >
            <a
              href="/resume.pdf"
              download
              className="group relative inline-block text-lg font-medium"
            >
              {/* FIXED: 'emerald'/'sky' gradient */}
              <span 
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 via-sky-500 to-emerald-500 opacity-75 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl animate-border-spin" 
              />
              
              {/* This is the actual button content */}
              <span className="relative flex items-center justify-center px-8 py-3 bg-gray-800 rounded-lg shadow-lg"> {/* Using 'bg-gray-800' */}
                <FaDownload className="mr-2" />
                Download Resume
              </span>
            </a>
          </motion.div>

          {/* Info Boxes */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            {info.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-gray-800/60 p-5 rounded-xl shadow-lg backdrop-blur-md flex flex-col items-center sm:items-start"
              >
                <div className="text-emerald-400 text-3xl mb-2">{item.icon}</div>
                <span className="text-gray-200 font-medium">{item.text}</span>
              </motion.div>
            ))}
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
            <a
              href="https://instagram.com/your-profile" // <-- IMPORTANT: Add your link
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-500 transition-all"
              aria-label="Instagram Profile"
            >
              <FaInstagram className="w-8 h-8" />
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
