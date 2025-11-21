import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTasks, FaPlus, FaCheck, FaTrash, FaUserAstronaut } from 'react-icons/fa';

const TaskShowcase = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Infiltrate Cyber Base', assignee: 'Agent X', status: 'pending', priority: 'high' },
        { id: 2, title: 'Hack Mainframe', assignee: 'Ghost', status: 'completed', priority: 'critical' },
        { id: 3, title: 'Extract Data Core', assignee: 'Viper', status: 'pending', priority: 'medium' },
    ]);

    const [newTask, setNewTask] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const task = {
            id: Date.now(),
            title: newTask,
            assignee: 'Recruit',
            status: 'pending',
            priority: 'medium'
        };

        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleStatus = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <section id="mission-control" className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-cyber-black opacity-90 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue glitch-effect" data-text="MISSION CONTROL">
                        MISSION CONTROL
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        <span className="text-neon-pink mr-2">&gt;</span>
                        Assign objectives and track squad progress in real-time.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {/* Task Input Panel */}
                    <motion.div
                        className="glass-panel p-6 mb-8 border border-neon-green/30 rounded-lg relative overflow-hidden group"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-neon-green"></div>
                        <form onSubmit={addTask} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Initialize new objective..."
                                    className="w-full bg-cyber-gray/50 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-neon-green focus:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all font-gaming tracking-wider"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-green opacity-50">
                                    <FaTasks />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-neon-green/10 border border-neon-green text-neon-green px-8 py-3 rounded font-bold uppercase tracking-widest hover:bg-neon-green hover:text-cyber-black transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                            >
                                <FaPlus className="text-sm" /> Assign
                            </button>
                        </form>
                    </motion.div>

                    {/* Task List */}
                    <div className="space-y-4">
                        <AnimatePresence>
                            {tasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0, x: -100 }}
                                    className={`glass-panel p-4 border-l-4 rounded-r-lg flex items-center justify-between group hover:bg-white/5 transition-all ${task.status === 'completed'
                                            ? 'border-l-neon-blue border-gray-800 opacity-70'
                                            : 'border-l-neon-pink border-gray-700'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => toggleStatus(task.id)}
                                            className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${task.status === 'completed'
                                                    ? 'bg-neon-blue border-neon-blue text-cyber-black'
                                                    : 'border-gray-500 hover:border-neon-pink'
                                                }`}
                                        >
                                            {task.status === 'completed' && <FaCheck size={12} />}
                                        </button>

                                        <div>
                                            <h3 className={`font-bold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
                                                {task.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <FaUserAstronaut className="text-neon-blue" />
                                                    {task.assignee}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded text-xs uppercase ${task.priority === 'high' || task.priority === 'critical'
                                                        ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                                                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
                                    >
                                        <FaTrash />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TaskShowcase;
