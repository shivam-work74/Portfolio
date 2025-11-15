import React, { Suspense } from "react";
import { lazy } from "react";
import SkillsEnhanced from "../components/Skills";
import ProjectsEnhanced from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";

// Lazy load heavy components
const ChatBot = lazy(() => import("../components/ChatBot"));

const Home = () => {
  return (
    <div className="scroll-smooth bg-gray-900">
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <ProjectsEnhanced />
      </div>
      <div id="skills">
        <SkillsEnhanced />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Suspense fallback={<div>Loading assistant...</div>}>
        <ChatBot />
      </Suspense>
    </div>
  );
};

export default Home;
