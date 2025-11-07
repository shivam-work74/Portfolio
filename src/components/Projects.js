import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
   {
    title: "Cine-Match",
    description: "A interesting and unique tinder alike swipping for movies app.",
    github: "https://github.com/shivam-work74/CineMatch.git",
    demo: "https://cine-match-sable.vercel.app/",
    image: "/cinematch.png",
    tags: ["React", "API"],
  },
  {
    title: "RESUME-BUILDER",
    description: "AI-powered resume builder that saves and worth your time.",
    github: "https://github.com/shivam-work74/Resume-builder.git",
    demo: "https://resume-builder-liart-theta.vercel.app/",
    image: "/resume.png",
    tags: ["React", "AI", "Tailwind"],
  },
  {
    title: "domineering-game",
    description: "Say your boredom goodbye bcs here is the mini game you needed.",
    github: "https://github.com/shivam-work74/Domineering-game.git",
    demo: "https://domineering-game.vercel.app/",
    image: "/domineering.png",
    tags: ["JavaScript", "Game"],
  },
  {
    title: "Tic-Tac-Toe",
    description: "Just a mini game to make you stressfree.",
    github: "https://github.com/shivam-work74/Tic_Tac_Toe.git",
    demo: "https://tic-tac-dwr560aso-shivam-s-projects-6c11e3bb.vercel.app",
    image: "/tic.png",
    tags: ["React", "Game"],
  },
  {
    title: "Story-Forge",
    description: "A unique type of stor based game you need to take a look.",
    github: "https://github.com/shivam-work74/Story-Forge.git",
    demo: "https://story-forge-olive.vercel.app/",
    image: "/storyforge.png",
    tags: ["React", "game", "Tailwind"],
  },
  {
    title: "Diamond-Thief",
    description: "Interactive gaming experience.",
    github: "https://github.com/shivam-work74/DIAMOND-THIEF.git",
    demo: "https://diamond-thief.vercel.app/",
    image: "/quiz.png",
    tags: ["React", "Game"],
  },
  {
    title: "Profile Viewer",
    description: "GitHub profile search and viewer app.",
    github: "https://github.com/shivam-work74/Profile-Viewer",
    demo: "https://githubprofile-viewer-ou0shu4sf-shivam-s-projects-6c11e3bb.vercel.app",
    image: "/profile.png",
    tags: ["React", "API"],
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

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative w-full py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 md:px-20 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full top-10 left-10 animate-blob animation-delay-2000"></span>
        <span className="absolute w-96 h-96 bg-purple-500 opacity-20 rounded-full top-64 right-20 animate-blob animation-delay-4000"></span>
        <span className="absolute w-80 h-80 bg-pink-500 opacity-20 rounded-full top-32 left-64 animate-blob animation-delay-6000"></span>
      </div>

      {/* Section Title */}
      <h2 className="text-4xl font-bold mb-12 text-center animate-slideIn">
        My Projects
      </h2>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative group bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden opacity-0 translate-y-8 animate-card"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {/* Project Image */}
            {project.image && (
              <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 flex justify-center items-center gap-6 opacity-0 group-hover:opacity-100 transition duration-500">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-blue-500 hover:bg-blue-600 p-3 rounded-full shadow-lg transition"
                  >
                    <FaExternalLinkAlt />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-gray-700 hover:bg-gray-800 p-3 rounded-full shadow-lg transition"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            )}

            {/* Project Info */}
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags &&
                project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-card {
          animation: fadeSlideUp 1s ease forwards;
        }

        @keyframes slideIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 1s ease-out forwards;
        }

        @keyframes blob {
          0%,100%{transform: translate(0,0) scale(1);}
          33%{transform: translate(30px,-50px) scale(1.1);}
          66%{transform: translate(-20px,20px) scale(0.9);}
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </section>
  );
};

export default Projects;
