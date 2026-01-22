import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from '../constants/data';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Card = ({ i, project, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Brightness/Opacity fade for depth simulation
  // Cards behind will get darker
  const filter = useTransform(progress, range, ["brightness(100%)", "brightness(50%)"]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          filter,
          top: `calc(${i * 25}px)`
        }}
        className="flex flex-col relative w-[1000px] h-[600px] rounded-3xl p-12 origin-top bg-[#1a1a1a] border border-white/10 overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.7)]"
      >
        {/* Card Header (Project Title & Category) */}
        <div className="absolute top-12 left-12 z-20 pointer-events-none">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-international-orange animate-pulse"></span>
            <span className="font-mono text-xs text-international-orange tracking-widest uppercase">
              {project.category}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-none">
            {project.title}
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex h-full mt-24 gap-12 group">

          {/* Left: Description & Tech & Links */}
          <div className="w-[40%] flex flex-col justify-between z-20">
            <div>
              <p className="font-sans text-gray-400 text-sm leading-relaxed mb-8 border-l border-white/10 pl-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-international-orange group-hover:border-international-orange/50 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-international-orange transition-colors"
                style={{ pointerEvents: 'auto' }}
              >
                <FaGithub size={16} /> Source_Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-international-orange transition-colors"
                style={{ pointerEvents: 'auto' }}
              >
                <FaExternalLinkAlt size={16} /> Live_Demo
              </a>
            </div>
          </div>

          {/* Right: Image Visual */}
          <div className="relative w-[60%] h-full rounded-xl overflow-hidden bg-black border border-white/5 mx-auto">
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </motion.div>
    </div>
  )
}

const Projects = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section id="projects" className="relative bg-transparent pt-24 pb-48">

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-12 sticky top-10 z-0">
        <h2 className="text-sm font-mono text-international-orange tracking-widest uppercase mb-4">
          The Archive
        </h2>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white">
          SELECTED<br />WORKS
        </h1>
      </div>

      <div ref={container} className="w-full relative z-10">
        {
          projectsData.map((project, i) => {
            // "Stacking" Logic:
            // Slower range start (0.25) ensures previous cards linger and scale down physically
            const targetScale = 1 - ((projectsData.length - i) * 0.05);

            return (
              <Card
                key={i}
                i={i}
                project={project}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            )
          })
        }
      </div>
    </section>
  );
};

export default Projects;