import React from "react";
<<<<<<< HEAD
import { FaUniversity, FaLaptopCode, FaCode, FaDownload } from "react-icons/fa";
=======
import { FaUniversity, FaLaptopCode, FaCode } from "react-icons/fa";
>>>>>>> afd3417bbe3f2c91fc5f508111db94cf566de4ab

const About = () => {
  return (
    <section
      id="about"
<<<<<<< HEAD
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 md:px-20 py-20 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className="absolute w-80 h-80 bg-blue-500 opacity-10 rounded-full top-20 left-10 blur-3xl"></span>
        <span className="absolute w-96 h-96 bg-purple-500 opacity-10 rounded-full bottom-20 right-20 blur-3xl"></span>
      </div>

      {/* Left: Profile image card */}
      <div className="md:w-1/2 flex justify-center relative mb-12 md:mb-0">
        <div className="relative group">
          {/* Gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse"></div>

          {/* Image card */}
          <div className="relative w-72 h-72 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl">
            <img
              src="/profile.jpg" // <-- put your profile image in /public/profile.jpg
              alt="Shivam Kumar"
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>

      {/* Right: About text */}
      <div className="md:w-1/2 md:pl-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 animate-slideUp">
          About Me
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-4 animate-fadeIn">
          Hi, I’m <span className="text-blue-400 font-semibold">Shivam Kumar</span>, 
          an <span className="text-purple-400">MCA student</span> and 
          passionate <span className="text-pink-400">Full-Stack Developer</span>.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed mb-8 animate-fadeIn delay-200">
          I focus on creating <span className="text-blue-400">modern, responsive, and scalable</span> web applications 
          using React, Node.js, and Tailwind CSS. My goal is to combine 
          clean design with powerful functionality to deliver 
          professional results.
        </p>

        {/* Resume Button */}
        <a
          href="/resume.pdf" // <-- put your resume file in /public/resume.pdf
          download
          className="inline-flex items-center px-6 py-3 mb-10 rounded-xl font-medium text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition transform hover:scale-105 shadow-lg"
        >
          <FaDownload className="mr-2 text-white" />
          Download Resume
        </a>

        {/* Highlighted Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl shadow-lg hover:scale-105 transition">
            <FaUniversity className="text-blue-400 text-3xl mb-2" />
            <span className="text-gray-300 text-sm">MCA Student</span>
          </div>
          <div className="flex flex-col items-center bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl shadow-lg hover:scale-105 transition">
            <FaLaptopCode className="text-purple-400 text-3xl mb-2" />
            <span className="text-gray-300 text-sm">Full-Stack Dev</span>
          </div>
          <div className="flex flex-col items-center bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl shadow-lg hover:scale-105 transition">
            <FaCode className="text-pink-400 text-3xl mb-2" />
            <span className="text-gray-300 text-sm">Problem Solver</span>
=======
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
>>>>>>> afd3417bbe3f2c91fc5f508111db94cf566de4ab
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
<<<<<<< HEAD
        @keyframes fadeIn { from {opacity:0; transform: translateY(20px);} to{opacity:1; transform: translateY(0);} }
        .animate-fadeIn { animation: fadeIn 1.5s ease-in-out forwards; }
        .delay-200 { animation-delay: 0.2s; }

        @keyframes slideUp { from {opacity:0; transform: translateY(40px);} to{opacity:1; transform: translateY(0);} }
        .animate-slideUp { animation: slideUp 1s ease-out forwards; }
=======
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
>>>>>>> afd3417bbe3f2c91fc5f508111db94cf566de4ab
      `}</style>
    </section>
  );
};

export default About;
