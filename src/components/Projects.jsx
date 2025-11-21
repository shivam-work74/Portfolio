import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaGamepad } from 'react-icons/fa';

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

// --- Project Data ---
const projectsData = [
  {
    id: 1,
    title: "Cine-Match",
    description: "An interesting and unique Tinder-like swiping app for movies.",
    github: "https://github.com/shivam-work74/CineMatch.git",
    demo: "https://cine-match-sable.vercel.app/",
    image: "/cinematch.png",
    tags: ["React", "API"],
    category: "Entertainment"
  },
  {
    id: 2,
    title: "Learn-Sphere",
    description: "A comprehensive learning platform for all your educational needs.",
    github: "https://github.com/shivam-work74/learn-sphere.git",
    demo: "https://learn-sphere-seven-pi.vercel.app/",
    image: "/learnsphere.png",
    tags: ["React", "API"],
    category: "Education"
  },
  {
    id: 3,
    title: "Resume Builder",
    description: "AI-powered resume builder that saves you time and effort.",
    github: "https://github.com/shivam-work74/Resume-builder.git",
    demo: "https://resume-builder-liart-theta.vercel.app/",
    image: "/resume.png",
    tags: ["React", "AI", "Tailwind"],
    category: "Productivity"
  },
  {
    id: 4,
    title: "Domineering Game",
    description: "Say goodbye to boredom with this engaging mini game.",
    github: "https://github.com/shivam-work74/Domineering-game.git",
    demo: "https://domineering-game.vercel.app/",
    image: "/domineering.png",
    tags: ["JavaScript", "Game"],
    category: "Gaming"
  },
  {
    id: 5,
    title: "Tic-Tac-Toe",
    description: "A classic mini game to help you relax and unwind.",
    github: "https://github.com/shivam-work74/Tic_Tac_Toe.git",
    demo: "https://tic-tac-dwr560aso-shivam-s-projects-6c11e3bb.vercel.app",
    image: "/tic.png",
    tags: ["React", "Game"],
    category: "Gaming"
  },
  {
    id: 6,
    title: "Story Forge",
    description: "A unique story-based game that you need to experience.",
    github: "https://github.com/shivam-work74/Story-Forge.git",
    demo: "https://story-forge-olive.vercel.app/",
    image: "/storyforge.png",
    tags: ["React", "Game", "Tailwind"],
    category: "Gaming"
  },
  {
    id: 7,
    title: "Diamond Thief",
    description: "An interactive gaming experience.",
    github: "https://github.com/shivam-work74/DIAMOND-THIEF.git",
    demo: "https://diamond-thief.vercel.app/",
    image: "/quiz.png",
    tags: ["React", "Game"],
    category: "Gaming"
  },
  {
    id: 8,
    title: "Profile Viewer",
    description: "GitHub profile search and viewer application.",
    github: "https://github.com/shivam-work74/Profile-Viewer",
    demo: "https://githubprofile-viewer-ou0shu4sf-shivam-s-projects-6c11e3bb.vercel.app",
    image: "/profile.png",
    tags: ["React", "API"],
    category: "Utility"
  },
  {
    id: 9,
    title: "Fool's Fortune",
    description: "An interesting and unique card game.",
    github: "https://github.com/shivam-work74/Fools-Fortune.git",
    demo: "https://fools-fortune-rqzq.vercel.app/",
    image: "/fortune.png",
    tags: ["React", "API"],
    category: "Gaming"
  }
];

// --- Unique Categories ---
const categoriesData = ["All", ...new Set(projectsData.map(project => project.category).filter(Boolean))];

// --- Framer Motion variants ---
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
  exit: { opacity: 0, scale: 0.9 },
};

const Projects = () => {
  const { x, y } = useMousePosition();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  // --- Filter Logic ---
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-cyber-black text-white py-24 overflow-hidden border-t border-neon-green/20 font-gaming"
      style={{
        background: `
          radial-gradient(
            600px circle at ${x}px ${y}px, 
            rgba(0, 255, 65, 0.05),
            transparent 80%
          ),
          #0a0a0a
        `,
      }}
    >
      {/* --- Static Grid Background --- */}
      <div
        className="absolute inset-0 z-10 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        {/* --- Section Title --- */}
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-neon-green text-sm tracking-[0.3em] uppercase mb-2 border border-neon-green px-3 py-1 rounded-full bg-cyber-black/50 backdrop-blur-sm">
            System Operations
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white text-center glitch-effect" data-text="DEPLOYED MISSIONS">
            DEPLOYED MISSIONS
          </h3>
        </motion.div>

        {/* --- Filters --- */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-wrap justify-center items-center space-x-2 bg-cyber-gray/50 rounded-none skew-x-[-10deg] border border-neon-blue/30 p-2 backdrop-blur-sm">
            {categoriesData.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative z-10 flex items-center px-4 py-2 text-sm font-bold tracking-wider transition-all duration-300 uppercase skew-x-[10deg] ${selectedCategory === category
                    ? 'text-cyber-black'
                    : 'text-gray-400 hover:text-neon-blue'
                  }`}
              >
                {category}
                {selectedCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-neon-green shadow-[0_0_15px_var(--neon-green)] z-[-1]"
                    layoutId="projectPill"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* --- Projects Grid --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="bg-cyber-gray/30 backdrop-blur-md border border-neon-blue/20 rounded-xl overflow-hidden group hover:border-neon-green hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative w-full h-52 overflow-hidden border-b border-neon-blue/20">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-cyber-black/80 flex justify-center items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyber-black bg-neon-green hover:bg-white p-3 rounded-none transform rotate-45 shadow-[0_0_10px_var(--neon-green)] transition-all hover:scale-110"
                      aria-label="View demo"
                    >
                      <FaExternalLinkAlt className="-rotate-45" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyber-black bg-neon-blue hover:bg-white p-3 rounded-none transform rotate-45 shadow-[0_0_10px_var(--neon-blue)] transition-all hover:scale-110"
                      aria-label="View GitHub"
                    >
                      <FaGithub className="-rotate-45" />
                    </a>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Container */}
                <div className="p-6 relative">
                  <div className="absolute top-0 right-0 bg-neon-blue/10 px-3 py-1 text-xs text-neon-blue border-bl border-neon-blue/30">
                    ID: {project.id.toString().padStart(3, '0')}
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-neon-green transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-4 h-16 text-sm leading-relaxed">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 border border-neon-blue/30 text-neon-blue font-mono uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;