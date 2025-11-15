import React, { Suspense, lazy } from 'react'; 
import Navbar from './components/Navbar'; 
import Hero from './components/Hero'; 

// Lazy load our sections
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
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
    <div className="bg-gray-900">
      <Navbar />
      <Hero />
      
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Projects /> 
        <Skills />
        <Contact /> {/* <-- 2. ADD IT HERE */}
      </Suspense>
    </div>
  );
}

export default App;