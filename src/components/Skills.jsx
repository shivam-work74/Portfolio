import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData, achievements } from '../constants/data';
import { FaTrophy, FaMedal, FaCode, FaServer, FaDatabase, FaCloud } from 'react-icons/fa';

// Maps categories to icons
const CategoryIcon = ({ category }) => {
  switch (category) {
    case 'Frontend': return <FaCode />;
    case 'Backend': return <FaServer />;
    case 'Database': return <FaDatabase />;
    case 'DevOps': return <FaCloud />;
    default: return <FaCode />;
  }
}

const SegmentedBar = ({ level, index }) => {
  const segments = 10;
  const activeSegments = Math.round((level / 100) * segments);

  return (
    <div className="flex gap-1 h-3 mt-4">
      {[...Array(segments)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: index * 0.05 + i * 0.05, duration: 0.3 }}
          className={`flex-1 rounded-[1px] transition-all duration-300 ${i < activeSegments
              ? 'bg-international-orange shadow-[0_0_8px_rgba(255,79,0,0.6)]'
              : 'bg-white/10'
            }`}
        />
      ))}
    </div>
  )
}

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 border border-white/5 p-6 hover:border-international-orange/50 transition-all duration-300 hover:bg-white/10"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-display font-bold text-lg text-white group-hover:text-international-orange transition-colors">
            {skill.name}
          </h3>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">
            Capacity: {skill.level}%
          </p>
        </div>
        <div className="text-white/20 group-hover:text-international-orange transition-colors">
          <CategoryIcon category={skill.category} />
        </div>
      </div>

      <SegmentedBar level={skill.level} index={index} />

      {/* Decoration */}
      <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1 h-1 bg-international-orange" />
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  const categories = Array.from(new Set(skillsData.map(s => s.category)));

  return (
    <section id="skills" className="min-h-screen py-24 bg-transparent relative">

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Sidebar / Header */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
            TECH<br />SPEC
          </h2>

          <div className="flex flex-col gap-2 border-l-2 border-white/5 pl-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-left font-mono text-xs uppercase tracking-widest py-3 transition-all flex items-center gap-3 ${activeTab === cat
                  ? 'text-international-orange translate-x-2'
                  : 'text-gray-500 hover:text-white'
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeTab === cat ? 'bg-international-orange' : 'bg-transparent border border-white/20'}`} />
                {cat}
              </button>
            ))}
            <div className="h-px w-10 bg-white/10 my-2" />
            <button
              onClick={() => setActiveTab('Achievements')}
              className={`text-left font-mono text-xs uppercase tracking-widest py-3 transition-all flex items-center gap-3 ${activeTab === 'Achievements'
                ? 'text-international-orange translate-x-2'
                : 'text-gray-500 hover:text-white'
                }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'Achievements' ? 'bg-international-orange' : 'bg-transparent border border-white/20'}`} />
              Achievements
            </button>
          </div>
        </div>

        {/* Content Area - HUD Style */}
        <div className="lg:col-span-9">
          <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-1 backdrop-blur-sm">
            {/* Header Bar */}
            <div className="flex justify-between items-center bg-black/40 p-4 border-b border-white/5 mb-1">
              <span className="font-mono text-xs text-international-orange uppercase tracking-widest">
                [System.View] :: {activeTab.toUpperCase()}
              </span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </div>

            {/* Main Grid */}
            <div className="p-8 min-h-[500px] bg-black/20">
              {activeTab === 'Achievements' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((ach) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      key={ach.id}
                      className={`relative p-6 border ${ach.unlocked ? 'border-international-orange/30 bg-international-orange/5' : 'border-dashed border-gray-800 opacity-50'} transition-all group hover:bg-international-orange/10`}
                    >
                      <div className="absolute top-0 right-0 p-2 text-white/5 font-display text-4xl font-bold group-hover:text-international-orange/10 transition-colors">
                        0{ach.id}
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${ach.unlocked ? 'bg-international-orange text-black' : 'bg-white/5 text-gray-500'}`}>
                          <FaTrophy size={20} />
                        </div>
                        <div>
                          <span className={`font-mono text-[10px] uppercase tracking-wider block ${ach.unlocked ? 'text-international-orange' : 'text-gray-600'}`}>
                            {ach.unlocked ? 'Unlocked' : 'Locked'}
                          </span>
                          <h4 className="font-bold text-white text-lg">{ach.title}</h4>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed border-t border-white/5 pt-4">
                        {ach.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillsData.filter(s => s.category === activeTab).map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="flex justify-between items-center bg-black/40 p-2 border-t border-white/5 mt-1">
              <span className="font-mono text-[10px] text-gray-600">
                MEMORY_USAGE: 45MB
              </span>
              <span className="font-mono text-[10px] text-gray-600">
                RENDER_TIME: 12ms
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;