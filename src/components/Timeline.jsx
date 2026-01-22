import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { timelineData } from '../constants/data';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import soundManager from '../utils/SoundManager';

const TimelineItem = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex items-center justify-between mb-24 w-full ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onMouseEnter={() => soundManager.playHover()}
                className={`w-full md:w-[45%] bg-carbon border border-white/10 p-8 relative group hover:border-international-orange/50 transition-colors duration-500 shadow-2xl`}
            >
                {/* Connector Line (to dot) */}
                <div className={`hidden md:block absolute top-1/2 -mt-[1px] w-8 h-[2px] bg-white/10 group-hover:bg-international-orange/50 transition-colors duration-500 ${isEven ? 'left-full' : 'right-full'}`} />

                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-international-orange/10 rounded-full text-international-orange">
                        {item.type === 'education' ? <FaGraduationCap size={20} /> : <FaBriefcase size={20} />}
                    </div>
                    <span className="font-mono text-[10px] text-international-orange tracking-[0.2em] uppercase">
                        {item.year}
                    </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-international-orange transition-colors">
                    {item.title}
                </h3>
                <h4 className="font-mono text-sm text-gray-400 mb-4 tracking-tighter uppercase font-bold">
                    {item.company}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">
                    {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-mono text-gray-500 border border-white/5 px-2 py-1 bg-white/[0.02]">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-international-orange/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-international-orange/50" />
            </motion.div>

            {/* Path Dot */}
            <div className="absolute left-1/2 -ml-3 md:ml-0 md:transform md:-translate-x-1/2 flex items-center justify-center z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-6 h-6 rounded-full bg-studio-black border-2 border-white/10 flex items-center justify-center group-hover:border-international-orange transition-colors duration-500"
                >
                    <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-international-orange animate-pulse" />
                </motion.div>
            </div>

            {/* Empty space for the other side */}
            <div className="hidden md:block w-[45%]" />
        </div>
    );
};

const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.5]);

    return (
        <section id="timeline" ref={containerRef} className="py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 mb-6"
                    >
                        <span className="w-8 h-[1px] bg-international-orange" />
                        <span className="font-mono text-xs text-international-orange tracking-[0.3em] uppercase italic">
                            Journey Log
                        </span>
                        <span className="w-8 h-[1px] bg-international-orange" />
                    </motion.div>
                    <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tighter">
                        NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">PATHWAY</span>
                    </h2>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* The Path (Neural Line) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5" />
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] bg-international-orange origin-top"
                        style={{ scaleY, filter: `drop-shadow(0 0 8px #FF4F00)` }}
                    />

                    {/* Glowing Aura for the path */}
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-8 bg-international-orange/20 blur-xl pointer-events-none"
                        style={{ scaleY, opacity: glowOpacity }}
                    />

                    {/* Timeline Items */}
                    <div className="relative z-10">
                        {timelineData.map((item, index) => (
                            <TimelineItem key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
