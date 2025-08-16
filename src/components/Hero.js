import React from "react";
import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5, FaJs } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden text-white px-4"
    >
      {/* Animated Background Blobs */}
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
        <span className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full top-10 left-10 animate-blob animation-delay-2000"></span>
        <span className="absolute w-96 h-96 bg-purple-500 opacity-20 rounded-full top-64 left-64 animate-blob animation-delay-4000"></span>
        <span className="absolute w-80 h-80 bg-pink-500 opacity-20 rounded-full top-48 left-32 animate-blob animation-delay-6000"></span>
      </div>

      {/* Main Content */}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 animate-slideIn relative overflow-hidden">
        Hi, I'm Shivam Kumar
        <span className="absolute w-full h-1 bg-white opacity-10 top-1/2 left-0 animate-shine"></span>
      </h1>

      <p className="text-lg md:text-2xl mb-8 text-center max-w-3xl animate-fadeIn">
        MCA Student | Full-Stack Developer | Problem Solver  
        <br />I create interactive and professional web experiences.
      </p>

      {/* Floating Tech Icons */}
      <div className="flex space-x-6 mb-8 animate-fadeIn">
        <FaReact className="text-blue-400 text-4xl hover:scale-125 transition-transform" />
        <FaNodeJs className="text-green-400 text-4xl hover:scale-125 transition-transform" />
        <FaHtml5 className="text-orange-500 text-4xl hover:scale-125 transition-transform" />
        <FaCss3Alt className="text-blue-600 text-4xl hover:scale-125 transition-transform" />
        <FaJs className="text-yellow-400 text-4xl hover:scale-125 transition-transform" />
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-10 animate-bounce">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn { 0% { transform: translateY(-50px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-slideIn { animation: slideIn 1s ease-out forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 2s ease-in-out; }

        @keyframes blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-50px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.9); } }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }

        @keyframes shine { 0% { transform: translateX(-100%); opacity: 0; } 50% { transform: translateX(100%); opacity: 0.2; } 100% { transform: translateX(100%); opacity: 0; } }
        .animate-shine { animation: shine 2.5s infinite; }

        @keyframes bounce { 0%,100%{transform: translateY(0);} 50%{transform: translateY(-10px);} }
        .animate-bounce { animation: bounce 2s infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
