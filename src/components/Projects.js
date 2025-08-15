import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
{
  title: "RESUME-BUILDER",
  description: "AI-powered resume builder that saves and worth your time.",
  github: "https://github.com/shivam-work74/Resume-builder.git",
  demo: "https://resume-builder-liart-theta.vercel.app/", 
},
,
  {
    title: "DevTinder",
    description: "Developer matchmaking platform.",
    github: "https://github.com/shivam-work74/DevTinder",
    demo: "https://shivam-devtinder.vercel.app",
  },
  {
    title: "Tic-Tac-Toe",
    description: "just a mini game to make you stressfree.",
    github: "https://github.com/shivam-work74/Tic_Tac_Toe.git",
    demo: "https://tic-tac-dwr560aso-shivam-s-projects-6c11e3bb.vercel.app",
  },
  {
    title: "EduDev",
    description: "Educational platform for learning web development.",
    github: "https://github.com/shivam-work74/EduDev",
    demo: "https://shivam-edudev.vercel.app",
  },
  {
    title: "Quick Quiz",
    description: "Interactive quiz application.",
    github: "https://github.com/shivam-work74/Quick-Quiz",
    demo: "https://quick-quiz-tau.vercel.app/~",
  },
  {
    title: "Profile Viewer",
    description: "GitHub profile search and viewer app.",
    github: "https://github.com/shivam-work74/Profile-Viewer",
    demo: "https://githubprofile-viewer-ou0shu4sf-shivam-s-projects-6c11e3bb.vercel.app",
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

      <h2 className="text-4xl font-bold mb-12 text-center animate-slideIn">
        My Projects
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-700 animate-fadeIn"
          >
            <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex space-x-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-600 transition"
              >
                <FaGithub /> <span>Code</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-purple-400 hover:text-purple-600 transition"
              >
                <FaExternalLinkAlt /> <span>Demo</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from {opacity:0;} to{opacity:1;} }
        .animate-fadeIn { animation: fadeIn 1.5s ease-in-out forwards; }

        @keyframes slideIn { 0% { transform: translateY(20px); opacity:0;} 100% { transform: translateY(0); opacity:1;} }
        .animate-slideIn { animation: slideIn 1s ease-out forwards; }

        @keyframes blob { 0%,100%{transform: translate(0,0) scale(1);} 33%{transform: translate(30px,-50px) scale(1.1);} 66%{transform: translate(-20px,20px) scale(0.9);} }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </section>
  );
};

export default Projects;
