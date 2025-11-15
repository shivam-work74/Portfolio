import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// --- Mouse position hook (Copied from your About.js) ---
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

// --- Your Project Data (Unchanged) ---
const projectsData = [
    {
    id: 1,
    title: "Cine-Match",
    description: "An interesting and unique Tinder-like swiping app for movies.",
    github: "https://github.com/shivam-work74/CineMatch.git",
    demo: "https://cine-match-sable.vercel.app/",
    image: "/cinematch.png", // Make sure this image is in your /public folder
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

// --- Unique Categories (Unchanged) ---
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
      className="relative min-h-screen bg-gray-900 text-gray-100 py-24 overflow-hidden border-t border-gray-800"
      style={{
        // --- 1. NEW: Mouse Glow Background (Matches About.js) ---
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
      {/* --- 2. NEW: Static Grid Background (Matches About.js) --- */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
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
          What I've Built
        </motion.h3>
        
        {/* --- 3. NEW: "Sliding Pill" Filters (Matches Navbar.js) --- */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-wrap justify-center items-center space-x-2 bg-gray-800/50 rounded-full p-2 border border-gray-700/50">
            {categoriesData.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative z-10 flex items-center px-4 py-2 rounded-full transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg z-[-1]"
                    layoutId="projectPill" // The magic "sliding" animation
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* --- 4. NEW: Animated Projects Grid --- */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout // This tells framer-motion to animate layout changes
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout // This animates the card's position in the grid
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-xl overflow-hidden group"
              >
                {/* --- 5. NEW: Upgraded Card Design --- */}
                
                {/* Image Container */}
                <div className="relative w-full h-52 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  />
                  {/* Image Links Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-emerald-500 hover:bg-emerald-600 p-3 rounded-full shadow-lg transition transform hover:scale-110"
                      aria-label="View demo"
                    >
                      <FaExternalLinkAlt />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-gray-700 hover:bg-gray-800 p-3 rounded-full shadow-lg transition transform hover:scale-110"
                      aria-label="View GitHub"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-emerald-400">{project.title}</h3>
                  <p className="text-gray-400 mb-4 h-16">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-300 font-medium"
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