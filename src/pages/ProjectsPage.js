import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "RESUME-BUILDER",
    description: "AI-powered resume builder that saves and worth your time.",
    github: "https://github.com/shivam-work74/Resume-builder.git",
    demo: "https://resume-builder-liart-theta.vercel.app/",
    image: "/resume.png",
    tags: ["React", "AI", "Web App"],
    category: "Web App",
  },
  {
    title: "Domineering Game",
    description: "Say your boredom goodbye bcs here is the mini game you needed.",
    github: "https://github.com/shivam-work74/Domineering-game.git",
    demo: "https://domineering-game.vercel.app/",
    image: "/domineering.png",
    tags: ["JavaScript", "Game"],
    category: "Game",
  },
  {
    title: "Tic-Tac-Toe",
    description: "Just a mini game to make you stressfree.",
    github: "https://github.com/shivam-work74/Tic_Tac_Toe.git",
    demo: "https://tic-tac-dwr560aso-shivam-s-projects-6c11e3bb.vercel.app",
    image: "/tic.png",
    tags: ["React", "Game"],
    category: "Game",
  },
  {
     title: "Story-Forge",
    description: "A unique type of stor based game you need to take a look.",
    github: "https://github.com/shivam-work74/Story-Forge.git",
    demo: "https://story-forge-olive.vercel.app/",
    image: "/storyforge.png",
    tags: ["React", "Game", "Tailwind"],
    category: "Game",
  },
{
    title: "Diamond-Thief",
    description: "Interactive gaming experience.",
    github: "https://github.com/shivam-work74/DIAMOND-THIEF.git",
    demo: "https://diamond-thief.vercel.app/",
    image: "/quiz.png",
    tags: ["React", "Game"],
    category: "Game",
  },
  {
    title: "Profile Viewer",
    description: "GitHub profile search and viewer app.",
    github: "https://github.com/shivam-work74/Profile-Viewer",
    demo: "https://githubprofile-viewer-ou0shu4sf-shivam-s-projects-6c11e3bb.vercel.app",
    image: "/profile.png",
    tags: ["React", "API", "Web App"],
    category: "Web App",
  },
  {
    title: "Fools-Fortune",
    description: "A interesting and unique game of cards.",
    github: "https://github.com/shivam-work74/Fools-Fortune.git",
    demo: "https://fools-fortune-rqzq.vercel.app/",
    image: "/fortune.png",
    tags: ["React", "API"],
  },
];

const categories = ["All", "Game", "Web App", "Education"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="projects"
      className="relative w-full py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 md:px-20 overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:40px_40px] animate-grid"></div>

      {/* Section Title */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-5xl font-extrabold tracking-tight inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-slideIn">
          My Projects
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full animate-underline"></div>
      </div>

      {/* Search Bar + Filter Buttons */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-14">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-white/10 text-gray-200 placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition shadow-md ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-purple-500/40"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-xl opacity-0 translate-y-10 animate-fadeUp"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Project Image */}
              {project.image && (
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center gap-6 opacity-0 group-hover:opacity-100 transition duration-500">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-blue-500 hover:bg-blue-600 p-3 rounded-full shadow-lg transition transform hover:rotate-6"
                    >
                      <FaExternalLinkAlt />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-gray-700 hover:bg-gray-800 p-3 rounded-full shadow-lg transition transform hover:-rotate-6"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-blue-300 group-hover:text-purple-400 transition">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No projects found 🚫
          </p>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 1s ease forwards;
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 1s ease-out forwards;
        }
        @keyframes underline {
          0% { width: 0; }
          100% { width: 8rem; }
        }
        .animate-underline {
          animation: underline 1s ease forwards;
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .animate-grid {
          animation: gridMove 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Projects;

