import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaPython, FaJava, FaGit, FaDocker, FaAws,
  FaTrophy, FaStar, FaMedal, FaCode, FaServer, FaMobile, FaLock, FaUnlock
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiRedis, SiKubernetes, SiJest, SiExpress } from 'react-icons/si';

// --- Mouse position hook ---
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

// --- Floating Background Elements ---
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
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
            width: Math.random() * 40 + 10,
            height: Math.random() * 40 + 10,
          }}
        />
      ))}
    </div>
  );
};

// --- 3D Tilt Card for Skills ---
const TiltSkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative perspective-1000 group"
    >
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700 p-6 rounded-xl overflow-hidden group-hover:border-neon-green/50 transition-colors duration-300 shadow-lg">

        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ transform: "translateZ(20px)" }}></div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neon-green/30 group-hover:border-neon-green transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neon-green/30 group-hover:border-neon-green transition-colors"></div>

        <div className="relative z-10 flex flex-col gap-4" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-gray-800 rounded-lg border border-gray-700 group-hover:border-neon-green/30 transition-colors">
              <div className="text-3xl text-gray-300 group-hover:text-neon-green transition-colors group-hover:scale-110 duration-300">
                {skill.icon}
              </div>
            </div>
            <span className="text-neon-blue font-mono text-xs bg-neon-blue/10 px-2 py-1 rounded border border-neon-blue/20">
              LVL {skill.level}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white font-gaming tracking-wide mb-1 group-hover:text-neon-green transition-colors">{skill.name}</h3>
            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-green to-emerald-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Inventory Achievement Card ---
const AchievementCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`relative p-4 border-2 rounded-lg transition-all duration-300 group ${item.unlocked
          ? "bg-gray-900/80 border-neon-green/30 hover:border-neon-green hover:shadow-[0_0_15px_rgba(0,255,65,0.2)]"
          : "bg-gray-900/40 border-gray-800 grayscale opacity-70"
        }`}
    >
      {/* Locked Overlay */}
      {!item.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 rounded-lg">
          <FaLock className="text-3xl text-gray-500" />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg border ${item.unlocked ? "bg-neon-green/10 border-neon-green/20 text-neon-green" : "bg-gray-800 border-gray-700 text-gray-500"
          }`}>
          <div className="text-2xl">{item.icon}</div>
        </div>
        <div>
          <h4 className={`font-bold font-gaming text-sm mb-1 ${item.unlocked ? "text-white" : "text-gray-400"}`}>
            {item.title}
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Rarity Badge */}
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${item.unlocked ? "bg-neon-green animate-pulse" : "bg-red-500"}`}></div>
    </motion.div>
  );
};

// --- Data ---
const skillsData = [
  // Frontend
  { name: "HTML5", icon: <FaHtml5 />, level: 95, category: "Frontend" },
  { name: "CSS3", icon: <FaCss3Alt />, level: 90, category: "Frontend" },
  { name: "JavaScript", icon: <FaJs />, level: 85, category: "Frontend" },
  { name: "React", icon: <FaReact />, level: 85, category: "Frontend" },
  { name: "TypeScript", icon: <SiTypescript />, level: 80, category: "Frontend" },
  { name: "Tailwind", icon: <SiTailwindcss />, level: 90, category: "Frontend" },
  // Backend
  { name: "Node.js", icon: <FaNodeJs />, level: 80, category: "Backend" },
  { name: "Express", icon: <SiExpress />, level: 75, category: "Backend" },
  { name: "Python", icon: <FaPython />, level: 70, category: "Backend" },
  { name: "Java", icon: <FaJava />, level: 65, category: "Backend" },
  // Database
  { name: "MongoDB", icon: <SiMongodb />, level: 75, category: "Database" },
  { name: "PostgreSQL", icon: <SiPostgresql />, level: 70, category: "Database" },
  { name: "Redis", icon: <SiRedis />, level: 65, category: "Database" },
  // DevOps
  { name: "Git", icon: <FaGit />, level: 85, category: "DevOps" },
  { name: "Docker", icon: <FaDocker />, level: 70, category: "DevOps" },
  { name: "AWS", icon: <FaAws />, level: 65, category: "DevOps" },
];

const achievements = [
  { id: 1, title: "Frontend Master", description: "Completed 50+ React projects", icon: <FaTrophy />, unlocked: true },
  { id: 2, title: "JS Ninja", description: "Solved 100+ coding challenges", icon: <FaStar />, unlocked: true },
  { id: 3, title: "Full Stack Hero", description: "Built 20+ full stack apps", icon: <FaMedal />, unlocked: false },
  { id: 4, title: "Cloud Walker", description: "Deployed 15+ apps to cloud", icon: <FaServer />, unlocked: true },
  { id: 5, title: "App Wizard", description: "Created 5+ mobile apps", icon: <FaMobile />, unlocked: false },
];

// --- Main Component ---
const Skills = () => {
  const { x, y } = useMousePosition();
  const [view, setView] = useState('skills'); // 'skills' or 'achievements'
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ["All", ...new Set(skillsData.map(skill => skill.category))];
  const filteredSkills = activeCategory === "All"
    ? skillsData
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative min-h-screen bg-cyber-black text-gray-100 py-24 overflow-hidden font-gaming"
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

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-neon-green font-mono text-sm tracking-[0.2em] mb-2"
          >
            // SYSTEM_CAPABILITIES
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">ARSENAL</span>
          </motion.h3>
        </div>

        {/* View Toggle Pills */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-900/80 border border-gray-700 rounded-full p-1 backdrop-blur-sm">
            {['Skills', 'Achievements'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v.toLowerCase())}
                className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${view === v.toLowerCase() ? 'text-cyber-black' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {view === v.toLowerCase() && (
                  <motion.div
                    layoutId="viewPill"
                    className="absolute inset-0 bg-neon-green rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{v.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'skills' ? (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-1.5 rounded border text-xs font-mono transition-all duration-300 ${activeCategory === category
                        ? "bg-neon-blue/10 border-neon-blue text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                        : "bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-500"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                  <TiltSkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Inventory Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {achievements.map((item, index) => (
                  <AchievementCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Skills;