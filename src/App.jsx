import React, { Suspense } from 'react';
import useStore from './store';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import GameHub from './components/GameHub';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import OpeningOverlay from './components/OpeningOverlay';
import SectionLoader from './components/SectionLoader';
import SmoothScroll from './components/SmoothScroll';
import Certifications from './components/Certifications';

// 3D Scene
import Scene from './canvas/Scene';



const App = () => {
  const hasStarted = useStore((state) => state.hasStarted);

  return (
    <div className="bg-studio-black min-h-screen text-white relative">


      <OpeningOverlay />

      {/* 3D Background - Persistent */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {hasStarted && (
        <SmoothScroll>
          {/* Navbar */}
          <Navbar />

          <main className="relative z-10 w-full">
            <Hero />

            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Skills />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Certifications />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <GameHub />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </main>

          {/* Floating Chatbot */}
          <ChatBot />
        </SmoothScroll>
      )}
    </div>
  );
}

export default App;