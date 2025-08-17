import React, { useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaDatabase,
  FaJava,
  FaAndroid,
  FaBrain,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiCplusplus } from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";

const skills = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: 95, category: "Frontend" },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" />, level: 90, category: "Frontend" },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, level: 88, category: "Frontend" },
  { name: "React.js", icon: <FaReact className="text-blue-400" />, level: 85, category: "Frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, level: 82, category: "Frontend" },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: 80, category: "Backend" },
  { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, level: 78, category: "Backend" },
  { name: "SQL / Databases", icon: <FaDatabase className="text-indigo-400" />, level: 75, category: "Backend" },

  // Advanced Skills (Circular charts)
  { name: "Java", icon: <FaJava className="text-red-600" />, level: 80, category: "Languages", circular: true },
  { name: "C++", icon: <SiCplusplus className="text-blue-600" />, level: 70, category: "Languages" },
  { name: "Python", icon: <FaPython className="text-yellow-400" />, level: 65, category: "Languages" },
  { name: "Data Structures & Algorithms", icon: <FaBrain className="text-purple-400" />, level: 75, category: "Core CS", circular: true },
  { name: "Advanced Data Structures", icon: <FaBrain className="text-pink-500" />, level: 70, category: "Core CS", circular: true },
  { name: "Artificial Intelligence", icon: <GiArtificialIntelligence className="text-green-400" />, level: 60, category: "Core CS", circular: true },
  { name: "Data Mining", icon: <FaDatabase className="text-yellow-500" />, level: 65, category: "Core CS", circular: true },
  { name: "Android Development", icon: <FaAndroid className="text-green-500" />, level: 72, category: "Development", circular: true },

  { name: "Git & GitHub", icon: <FaGitAlt className="text-red-500" />, level: 85, category: "Tools" },
];

const categories = ["All", "Frontend", "Backend", "Languages", "Core CS", "Development", "Tools"];

const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative w-full py-24 bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white px-6 md:px-20 overflow-hidden"
    >
      {/* Background glowing orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>

      {/* Section Title */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 animate-slideIn">
          Tech Stack & Expertise
        </h2>
        <div className="h-1 w-40 bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 mx-auto mt-3 rounded-full animate-underline"></div>
        <p className="text-gray-400 mt-4 text-lg">
          The technologies and tools I excel at
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-4 mb-12 relative z-10">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
              activeCategory === cat
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                : "border-gray-600 text-gray-300 hover:border-pink-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="group bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:scale-105 hover:-translate-y-2 transition transform duration-500 opacity-0 translate-y-10 animate-fadeUp"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex items-center gap-4 mb-6 justify-center">
              <span className="text-5xl">{skill.icon}</span>
            </div>
            <h3 className="text-center text-xl font-bold text-white mb-6 group-hover:text-pink-400 transition">
              {skill.name}
            </h3>

            {/* If circular skill → Radial Progress with hover glow + spin */}
            {skill.circular ? (
              <div className="relative flex justify-center items-center">
                <svg className="w-28 h-28 transform -rotate-90 group-hover:animate-spin-slow">
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * (1 - skill.level / 100)}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out drop-shadow-glow"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-xl font-bold">{skill.level}%</span>
              </div>
            ) : (
              // Default Progress Bar
              <>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-md shadow-pink-400/40 animate-grow"
                    style={{ width: `${skill.level}%`, animationDelay: `${index * 0.3}s` }}
                  ></div>
                </div>
                <p className="text-gray-300 mt-2 text-sm text-center">
                  {skill.level}% Proficiency
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 1s ease forwards; }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn { animation: slideIn 1s ease-out forwards; }
        @keyframes underline {
          0% { width: 0; }
          100% { width: 10rem; }
        }
        .animate-underline { animation: underline 1s ease forwards; }
        @keyframes grow {
          0% { width: 0; }
          100% { width: inherit; }
        }
        .animate-grow { animation: grow 1.5s ease-out forwards; }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }
        .animate-pulse-slow { animation: pulseSlow 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }

        /* Glow + Slow Spin */
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.8));
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsPage;
