import React from "react";
import { FaUniversity, FaLaptopCode, FaCode } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 md:px-20 relative overflow-hidden"
    >
      {/* Floating Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <span className="absolute w-48 h-48 bg-blue-500 opacity-10 rounded-full top-10 left-10 animate-blob animation-delay-2000"></span>
        <span className="absolute w-64 h-64 bg-purple-500 opacity-10 rounded-full top-64 right-20 animate-blob animation-delay-4000"></span>
      </div>

      {/* Left Side - Profile */}
      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
        <div className="w-64 h-64 bg-gray-800 rounded-full shadow-lg animate-fadeIn"></div>
      </div>

      {/* Right Side - Text */}
      <div className="md:w-1/2 md:pl-12 flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slideIn">
          About Me
        </h2>
        <p className="text-lg md:text-xl mb-4 animate-fadeIn">
          I am <span className="text-blue-400 font-semibold">Shivam Kumar</span>, an MCA student and Full-Stack Developer passionate about creating visually appealing and interactive websites.
        </p>
        <p className="text-lg md:text-xl mb-6 animate-fadeIn delay-200">
          I specialize in <span className="text-purple-400 font-semibold">React, Node.js, Tailwind CSS</span> and love building professional web applications that are responsive, functional, and modern.
        </p>

        {/* Key Points */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-center space-x-3 animate-fadeIn delay-400">
            <FaUniversity className="text-blue-400 text-2xl" />
            <span>Bachelor's & MCA Student</span>
          </div>
          <div className="flex items-center space-x-3 animate-fadeIn delay-600">
            <FaLaptopCode className="text-purple-400 text-2xl" />
            <span>Full-Stack Development</span>
          </div>
          <div className="flex items-center space-x-3 animate-fadeIn delay-800">
            <FaCode className="text-pink-400 text-2xl" />
            <span>Problem Solving & Learning</span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn { 0% { transform: translateX(-50px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        .animate-slideIn { animation: slideIn 1s ease-out forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 2s ease-in-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }

        @keyframes blob { 0%,100%{transform: translate(0,0) scale(1);} 33%{transform: translate(30px,-50px) scale(1.1);} 66%{transform: translate(-20px,20px) scale(0.9);} }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default About;
