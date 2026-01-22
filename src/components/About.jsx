import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { aboutData } from '../constants/data';
import { FaFingerprint, FaGlobeAmericas, FaClock, FaCircle } from 'react-icons/fa';

// 3D Tilt Card Component
const TiltCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-full h-[600px] cursor-pointer group"
    >
      <div className="w-full h-full bg-carbon border border-white/10 relative overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-international-orange/50">
        {/* Holographic Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

        {children}
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center bg-transparent text-white relative overflow-hidden py-24">

      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Digital Identity Card */}
          <div className="lg:col-span-5 relative">
            <TiltCard>
              <img
                src={aboutData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-700"
              />

              {/* HUD Overlay */}
              <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10">
                <FaFingerprint className="text-white/30 text-4xl group-hover:text-international-orange/80 transition-colors" />
                <div className="font-mono text-[10px] text-international-orange border border-international-orange/30 px-2 py-1 bg-black/50 backdrop-blur-sm">
                  ID: {aboutData.id}
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-md border-t border-white/10 p-6 z-10">
                <h3 className="font-display text-4xl font-bold uppercase tracking-tighter mb-1">{aboutData.name}</h3>
                <p className="font-mono text-xs text-international-orange tracking-widest uppercase mb-4">{aboutData.role}</p>

                <div className="flex gap-6 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <FaGlobeAmericas /> India
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <FaClock /> Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Background Decor */}
            <div className="absolute -z-10 -right-10 -bottom-10 w-64 h-64 bg-international-orange/10 blur-[100px] rounded-full" />
          </div>

          {/* Right Column: The Manifesto & Log */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-2 h-2 rounded-full bg-international-orange animate-pulse" />
                <h2 className="font-mono text-sm text-international-orange tracking-[0.2em] uppercase">
                  System Manifesto
                </h2>
              </div>

              <div className="relative border-l border-white/10 pl-8 ml-3 space-y-12">
                <div className="relative">
                  <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-carbon border border-international-orange/50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-international-orange rounded-full" />
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
                    Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Digital Future</span>
                  </h3>
                  <div className="prose prose-invert prose-lg text-gray-400 font-light leading-relaxed">
                    {aboutData.description}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  {aboutData.stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-4 hover:bg-white/10 transition-colors group">
                      <div className="font-display text-2xl font-bold text-white mb-1 group-hover:text-international-orange transition-colors">
                        {stat.value}
                      </div>
                      <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a
                  href="/resume.pdf"
                  download="Resume_Shivam_Sharma.pdf"
                  className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-international-orange hover:text-white transition-all duration-300 inline-block text-center"
                >
                  Download CV
                </a>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:border-international-orange hover:text-international-orange transition-all duration-300 inline-block text-center cursor-pointer"
                >
                  View Logs
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
