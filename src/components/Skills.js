import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaPython, FaJava, FaGit, FaDocker, FaAws,
  FaTrophy, FaStar, FaMedal, FaCode, FaServer, FaMobile
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiRedis, SiKubernetes, SiJest, SiExpress } from 'react-icons/si';

// --- Mouse position hook (Copied from About.js) ---
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

// --- Floating Particle Component ---
const FloatingParticle = ({ delay, duration, size }) => {
  const particleVariants = {
    initial: { 
      x: Math.random() * 100, 
      y: Math.random() * 100,
      opacity: 0,
      scale: 0
    },
    animate: { 
      x: Math.random() * 100 - 50, 
      y: Math.random() * 100 - 50,
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 ${size}`}
      variants={particleVariants}
      initial="initial"
      animate="animate"
    />
  );
};

// --- Unique Animated Skill Badge ---
const AnimatedSkillBadge = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.5} 
            duration={3} 
            size={i % 2 === 0 ? "w-2 h-2" : "w-1 h-1"} 
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-4xl"
              animate={{ 
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.2 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              {skill.icon}
            </motion.div>
            <h3 className="text-xl font-bold text-gray-100">{skill.name}</h3>
          </div>
          <motion.span 
            className="text-2xl font-bold text-emerald-400"
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              textShadow: isHovered ? "0 0 8px rgba(16, 185, 129, 0.7)" : "none"
            }}
            transition={{ duration: 0.3 }}
          >
            {skill.level}%
          </motion.span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-emerald-500 to-sky-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut",
              delay: index * 0.1 
            }}
          />
        </div>
        
        {/* Pulsing glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.4), transparent 70%)',
              mixBlendMode: 'overlay'
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

// --- Your Data (with updated icons) ---
const skillsData = [
  // Frontend Skills
  { 
    name: "HTML5", 
    icon: <FaHtml5 className="text-emerald-400" />, 
    level: 95, 
    category: "Frontend"
  },
  { 
    name: "CSS3", 
    icon: <FaCss3Alt className="text-emerald-400" />, 
    level: 90, 
    category: "Frontend"
  },
  { 
    name: "JavaScript", 
    icon: <FaJs className="text-emerald-400" />, 
    level: 85, 
    category: "Frontend"
  },
  { 
    name: "TypeScript", 
    icon: <SiTypescript className="text-emerald-400" />, 
    level: 80, 
    category: "Frontend"
  },
  { 
    name: "React", 
    icon: <FaReact className="text-emerald-400" />, 
    level: 85, 
    category: "Frontend"
  },
  { 
    name: "Tailwind CSS", 
    icon: <SiTailwindcss className="text-emerald-400" />, 
    level: 90, 
    category: "Frontend"
  },
  
  // Backend Skills
  { 
    name: "Node.js", 
    icon: <FaNodeJs className="text-blue-400" />, 
    level: 80, 
    category: "Backend"
  },
  { 
    name: "Express.js", 
    icon: <SiExpress className="text-blue-400" />, 
    level: 75, 
    category: "Backend"
  },
  { 
    name: "Python", 
    icon: <FaPython className="text-blue-400" />, 
    level: 70, 
    category: "Backend"
  },
  { 
    name: "Java", 
    icon: <FaJava className="text-blue-400" />, 
    level: 65, 
    category: "Backend"
  },
  
  // Database Skills
  { 
    name: "MongoDB", 
    icon: <SiMongodb className="text-purple-400" />, 
    level: 75, 
    category: "Database"
  },
  { 
    name: "PostgreSQL", 
    icon: <SiPostgresql className="text-purple-400" />, 
    level: 70, 
    category: "Database"
  },
  { 
    name: "Redis", 
    icon: <SiRedis className="text-purple-400" />, 
    level: 65, 
    category: "Database"
  },
  
  // DevOps & Tools
  { 
    name: "Git", 
    icon: <FaGit className="text-orange-400" />, 
    level: 85, 
    category: "DevOps"
  },
  { 
    name: "Docker", 
    icon: <FaDocker className="text-orange-400" />, 
    level: 70, 
    category: "DevOps"
  },
  { 
    name: "Kubernetes", 
    icon: <SiKubernetes className="text-orange-400" />, 
    level: 60, 
    category: "DevOps"
  },
  { 
    name: "AWS", 
    icon: <FaAws className="text-orange-400" />, 
    level: 65, 
    category: "DevOps"
  },
  
  // Testing & Others
  { 
    name: "Jest", 
    icon: <SiJest className="text-yellow-400" />, 
    level: 75, 
    category: "Testing"
  },
  { 
    name: "Unit Testing", 
    icon: <FaCode className="text-yellow-400" />, 
    level: 70, 
    category: "Testing"
  }
];

const achievements = [
  { id: 1, title: "Frontend Master", description: "Completed 50+ React projects", icon: <FaTrophy />, unlocked: true },
  { id: 2, title: "JavaScript Ninja", description: "Solved 100+ coding challenges", icon: <FaStar />, unlocked: true },
  { id: 3, title: "Full Stack Developer", description: "Built 20+ full stack applications", icon: <FaMedal />, unlocked: false },
  { id: 4, title: "DevOps Pro", description: "Deployed 15+ applications to cloud", icon: <FaServer />, unlocked: true },
  { id: 5, title: "Mobile Developer", description: "Created 5+ mobile applications", icon: <FaMobile />, unlocked: false },
];

// --- Framer Motion variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  exit: { opacity: 0, y: -20 },
};

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
      className="relative min-h-screen bg-gray-900 text-gray-100 py-24 overflow-hidden border-t border-gray-800"
      style={{
        // --- 1. NEW: Mouse Glow Background ---
        background: `
          radial-gradient(
            600px circle at ${x}px ${y}px, 
            rgba(16, 185, 129, 0.15),
            transparent 80%
          ),
          #111827
        `,
      }}
    >
      {/* --- 2. NEW: Static Grid Background --- */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      
      <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-12">
        {/* --- Section Title --- */}
        <motion.h2 
          className="text-lg font-mono text-emerald-400 mb-2 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {''}
        </motion.h2>
        <motion.h3 
          className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          My Technical Arsenal
        </motion.h3>

        {/* --- 3. NEW: "Sliding Pill" Toggle for View --- */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full p-2 border border-gray-700/50">
            {['Skills', 'Achievements'].map((v) => (
              <motion.button
                key={v}
                onClick={() => setView(v.toLowerCase())}
                className={`relative z-10 flex items-center px-6 py-2 rounded-full transition-colors duration-300 ${
                  view === v.toLowerCase()
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {v}
                {view === v.toLowerCase() && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg z-[-1]"
                    layoutId="viewPill"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* --- Main Content Area --- */}
        <AnimatePresence mode="wait">
          {view === 'skills' ? (
            // --- SKILLS VIEW ---
            <motion.div
              key="skills"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* --- 4. NEW: "Sliding Pill" for Categories --- */}
              <div className="flex justify-center mb-12">
                <div className="flex flex-wrap justify-center items-center space-x-2 bg-gray-800/50 rounded-full p-2 border border-gray-700/50">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`relative z-10 flex items-center px-4 py-2 rounded-full transition-colors duration-300 ${
                        activeCategory === category
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                      {activeCategory === category && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600/80 to-sky-600/80 shadow-lg z-[-1]"
                          layoutId="categoryPill"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* --- 5. NEW: Animated Skills Grid with Unique Effects --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                  {filteredSkills.map((skill, index) => (
                    <AnimatedSkillBadge key={skill.name} skill={skill} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            // --- ACHIEVEMENTS VIEW --- with enhanced animations
            <motion.div
              key="achievements"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {achievements.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden ${
                    item.unlocked
                      ? 'bg-emerald-900/20 border-emerald-500/30'
                      : 'bg-gray-800/30 border-gray-700/50'
                  }`}
                >
                  {/* Achievement glow effect */}
                  {item.unlocked && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      animate={{
                        background: [
                          'radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.2), transparent 70%)',
                          'radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.2), transparent 70%)',
                          'radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.2), transparent 70%)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div 
                      className={`text-3xl p-3 rounded-xl ${
                        item.unlocked 
                          ? "bg-emerald-500/20 text-emerald-400" 
                          : "bg-gray-700 text-gray-500"
                      }`}
                      whileHover={{ rotate: item.unlocked ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${
                        item.unlocked ? "text-emerald-400" : "text-gray-500"
                      }`}>
                        {item.title}
                      </h3>
                      <p className={item.unlocked ? "text-gray-300" : "text-gray-600"}>
                        {item.description}
                      </p>
                      {!item.unlocked && (
                        <div className="mt-3 text-sm text-gray-600 italic">
                          (Locked)
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;