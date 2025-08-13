import React from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";

const skills = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "React", icon: <FaReact className="text-blue-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Database", icon: <FaDatabase className="text-indigo-500" /> },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative w-full py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 md:px-20 overflow-hidden"
    >
      <h2 className="text-4xl font-bold mb-12 text-center animate-slideIn">
        My Skills
      </h2>

      <div className="flex flex-wrap justify-center gap-10 relative z-10">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-110 transform transition duration-500 animate-fadeIn"
          >
            <div className="text-6xl mb-3">{skill.icon}</div>
            <p className="text-white font-semibold">{skill.name}</p>
          </div>
        ))}
      </div>

      {/* Optional floating blobs for animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className="absolute w-64 h-64 bg-pink-500 opacity-20 rounded-full top-20 left-10 animate-blob animation-delay-2000"></span>
        <span className="absolute w-80 h-80 bg-blue-500 opacity-20 rounded-full top-64 right-20 animate-blob animation-delay-4000"></span>
      </div>

      <style>{`
        @keyframes fadeIn { from {opacity:0;} to{opacity:1;} }
        .animate-fadeIn { animation: fadeIn 1.5s ease-in-out forwards; }

        @keyframes slideIn { 0% { transform: translateY(20px); opacity:0;} 100% { transform: translateY(0); opacity:1;} }
        .animate-slideIn { animation: slideIn 1s ease-out forwards; }

        @keyframes blob { 0%,100%{transform: translate(0,0) scale(1);} 33%{transform: translate(30px,-50px) scale(1.1);} 66%{transform: translate(-20px,20px) scale(0.9);} }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default Skills;
