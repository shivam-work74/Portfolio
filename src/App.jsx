import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load our sections
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const TaskShowcase = lazy(() => import('./components/TaskShowcase'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact')); // <-- 1. IMPORT IT

// A simple loading "spinner"
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="bg-cyber-black min-h-screen text-white font-gaming bg-grid-pattern relative overflow-x-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-cyber-black pointer-events-none"></div>
      <Navbar />
      <Hero />

      <Suspense fallback={<SectionLoader />}>
        <About />
        <Projects />
        <TaskShowcase />
        <Skills />
        <Contact />
      </Suspense>
    </div>
  );
}

export default App;