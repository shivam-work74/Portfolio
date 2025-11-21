import React, { useState, useEffect, useRef } from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import { FaRobot, FaTimes, FaTerminal, FaCode, FaEnvelope, FaTools, FaChevronRight, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. Configuration ---
const config = {
  botName: "SYSTEM_AI",
  initialMessages: [
    {
      message: "System Online. Identity Verified. Welcome to the Command Center.",
      sender: "bot",
      id: 1
    },
    {
      message: "I am the Portfolio Assistant. Select a protocol to initiate:",
      sender: "bot",
      id: 2,
      widget: "quickActions"
    }
  ],
  state: {},
  customStyles: {
    botMessageBox: {
      backgroundColor: "rgba(0, 255, 65, 0.05)",
      borderLeft: "2px solid var(--neon-green)",
      color: "#e0e0e0",
      fontFamily: "'Orbitron', sans-serif",
      fontSize: "0.85rem",
      borderRadius: "0 12px 12px 12px",
      padding: "12px",
      boxShadow: "0 2px 10px rgba(0, 255, 65, 0.05)",
    },
    chatButton: {
      backgroundColor: "var(--neon-green)",
    },
  },
  widgets: [], // Will be populated below
};

// --- 2. Message Parser ---
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lower = message.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi") || lower.includes("start")) {
      actions.handleHello();
    } else if (lower.includes("project") || lower.includes("work")) {
      actions.handleProjects();
    } else if (lower.includes("skill") || lower.includes("stack")) {
      actions.handleSkills();
    } else if (lower.includes("contact") || lower.includes("email")) {
      actions.handleContact();
    } else {
      actions.handleDefault();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: actions,
        });
      })}
    </div>
  );
};

// --- 3. Action Provider ---
const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const addMessageToState = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleHello = () => {
    const message = createChatBotMessage("Re-initializing protocols. How may I assist?", {
      widget: "quickActions",
    });
    addMessageToState(message);
  };

  const handleProjects = () => {
    const message = createChatBotMessage("Accessing Mission Logs... Displaying top-tier deployments:", {
      widget: "projectCards",
    });
    addMessageToState(message);
  };

  const handleSkills = () => {
    const message = createChatBotMessage("Scanning Arsenal... Proficiency levels retrieved:", {
      widget: "skillBars",
    });
    addMessageToState(message);
  };

  const handleContact = () => {
    const message = createChatBotMessage("Opening Secure Channels. Transmission ready:", {
      widget: "contactInfo",
    });
    addMessageToState(message);
  };

  const handleDefault = () => {
    const message = createChatBotMessage("Command Unknown. Please select a valid protocol:", {
      widget: "quickActions",
    });
    addMessageToState(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleProjects,
            handleSkills,
            handleContact,
            handleDefault,
          },
        });
      })}
    </div>
  );
};

// --- 4. Widgets ---

// Quick Actions
const QuickActions = (props) => {
  const options = [
    { text: "View Projects", handler: props.actionProvider.handleProjects, icon: <FaCode /> },
    { text: "Check Skills", handler: props.actionProvider.handleSkills, icon: <FaTools /> },
    { text: "Contact Me", handler: props.actionProvider.handleContact, icon: <FaEnvelope /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {options.map((option) => (
        <button
          key={option.text}
          onClick={option.handler}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-cyber-gray/60 border border-neon-blue/30 rounded hover:bg-neon-blue/10 hover:border-neon-blue hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all duration-300 group"
        >
          <span className="text-neon-blue group-hover:scale-110 transition-transform">{option.icon}</span>
          <span className="text-[10px] font-gaming uppercase tracking-wider text-gray-300 group-hover:text-white">{option.text}</span>
        </button>
      ))}
    </div>
  );
};

// Project Cards
const ProjectCards = () => {
  const projects = [
    { name: "Cine-Match", desc: "Movie Swiping App", link: "https://cine-match-sable.vercel.app/", tech: "React" },
    { name: "Learn-Sphere", desc: "EdTech Platform", link: "https://learn-sphere-seven-pi.vercel.app/", tech: "MERN" },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto py-3 px-1 scrollbar-thin scrollbar-thumb-neon-green/20 scrollbar-track-transparent">
      {projects.map((p) => (
        <a
          key={p.name}
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-[160px] bg-gray-900/80 border border-gray-700 rounded-lg overflow-hidden hover:border-neon-green hover:shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-all duration-300 group relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="p-3">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-neon-green text-xs font-bold font-gaming tracking-wide group-hover:text-white transition-colors">{p.name}</h4>
              <span className="text-[8px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-400 border border-gray-700">{p.tech}</span>
            </div>
            <p className="text-gray-400 text-[10px] mb-3 leading-relaxed">{p.desc}</p>
            <div className="flex items-center gap-1 text-[10px] text-neon-blue font-mono group-hover:translate-x-1 transition-transform">
              <span>Initialize</span> <FaChevronRight size={8} />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

// Skill Bars
const SkillBars = () => {
  const skills = [
    { name: "React", level: "95%" },
    { name: "Node.js", level: "85%" },
    { name: "Tailwind", level: "90%" },
  ];

  return (
    <div className="w-full bg-gray-900/40 p-3 rounded-lg border border-gray-800 backdrop-blur-sm">
      {skills.map((s, i) => (
        <div key={s.name} className="mb-3 last:mb-0">
          <div className="flex justify-between text-[10px] font-gaming tracking-wider mb-1.5">
            <span className="text-neon-pink">{s.name}</span>
            <span className="text-gray-400">{s.level}</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden relative">
            {/* Scanning line animation */}
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.5 }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: s.level }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-600 to-neon-pink shadow-[0_0_10px_var(--neon-pink)]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Contact Info
const ContactInfo = () => {
  return (
    <div className="bg-gray-900/90 border border-emerald-500/30 rounded p-3 relative overflow-hidden group hover:border-emerald-500 transition-colors">
      <div className="absolute top-0 right-0 p-1">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
      </div>
      <div className="text-xs font-mono text-gray-300 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500">{'>'}</span>
          <span className="text-gray-500">EMAIL:</span>
          <a href="mailto:shivam.work7488@gmail.com" className="text-white hover:text-emerald-400 transition-colors">shivam.work7488@gmail.com</a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-500">{'>'}</span>
          <span className="text-gray-500">STATUS:</span>
          <span className="text-emerald-400 bg-emerald-900/20 px-1 rounded">OPEN_TO_WORK</span>
        </div>
      </div>
    </div>
  );
};

// Register Widgets
config.widgets = [
  { widgetName: "quickActions", widgetFunc: (props) => <QuickActions {...props} /> },
  { widgetName: "projectCards", widgetFunc: (props) => <ProjectCards {...props} /> },
  { widgetName: "skillBars", widgetFunc: (props) => <SkillBars {...props} /> },
  { widgetName: "contactInfo", widgetFunc: (props) => <ContactInfo {...props} /> },
];

// --- 5. Main Component ---
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  // Typing simulation effect
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-gaming">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-4 perspective-1000 origin-bottom-right"
          >
            {/* HUD Container */}
            <div className="relative w-[350px] h-[600px] bg-cyber-black/90 border border-neon-green/30 rounded-xl shadow-[0_0_50px_rgba(0,255,65,0.1)] overflow-hidden backdrop-blur-xl flex flex-col">

              {/* Decorative HUD Elements */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-green/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"></div>

              {/* Corner Accents */}
              <svg className="absolute top-2 left-2 w-4 h-4 text-neon-green opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1h6M1 1v6" />
              </svg>
              <svg className="absolute top-2 right-2 w-4 h-4 text-neon-green opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 1h-6M23 1v6" />
              </svg>
              <svg className="absolute bottom-2 left-2 w-4 h-4 text-neon-blue opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 23h6M1 23v-6" />
              </svg>
              <svg className="absolute bottom-2 right-2 w-4 h-4 text-neon-blue opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 23h-6M23 23v-6" />
              </svg>

              {/* Header */}
              <div className="relative bg-gray-900/60 p-4 border-b border-gray-800 flex justify-between items-center z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-gray-800/80 border border-neon-green/30 flex items-center justify-center group-hover:border-neon-green transition-colors">
                      <FaTerminal className="text-neon-green text-sm group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-gray-900 animate-pulse"></span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-[0.15em] font-gaming">SYSTEM_AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-neon-green rounded-full"></span>
                      <p className="text-[9px] text-neon-green/60 uppercase tracking-wider font-mono">v2.0.4 // ONLINE</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all duration-300"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-grow relative z-10 overflow-hidden">
                {/* Scanlines */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] opacity-20"></div>

                {/* Custom Scrollbar & Chatbot Container */}
                <div className="h-full 
                  [&_.react-chatbot-kit-chat-container]:bg-transparent 
                  [&_.react-chatbot-kit-chat-inner-container]:bg-transparent 
                  [&_.react-chatbot-kit-chat-message-container]:overflow-y-auto 
                  [&_.react-chatbot-kit-chat-message-container]:scrollbar-thin 
                  [&_.react-chatbot-kit-chat-message-container]:scrollbar-thumb-gray-700 
                  [&_.react-chatbot-kit-chat-message-container]:scrollbar-track-transparent 
                  [&_.react-chatbot-kit-chat-message-container]:p-4
                  [&_.react-chatbot-kit-chat-input-container]:bg-gray-900/80 
                  [&_.react-chatbot-kit-chat-input-container]:border-t 
                  [&_.react-chatbot-kit-chat-input-container]:border-gray-800
                  [&_.react-chatbot-kit-chat-input-container]:p-3
                  [&_.react-chatbot-kit-chat-input]:bg-gray-800/50 
                  [&_.react-chatbot-kit-chat-input]:text-white 
                  [&_.react-chatbot-kit-chat-input]:font-mono 
                  [&_.react-chatbot-kit-chat-input]:text-xs 
                  [&_.react-chatbot-kit-chat-input]:border 
                  [&_.react-chatbot-kit-chat-input]:border-gray-700 
                  [&_.react-chatbot-kit-chat-input]:rounded 
                  [&_.react-chatbot-kit-chat-input]:placeholder-gray-600
                  [&_.react-chatbot-kit-chat-input]:focus:border-neon-green/50
                  [&_.react-chatbot-kit-chat-input]:focus:outline-none
                  [&_.react-chatbot-kit-chat-btn-send]:bg-neon-green 
                  [&_.react-chatbot-kit-chat-btn-send]:text-black 
                  [&_.react-chatbot-kit-chat-btn-send]:hover:bg-white
                  [&_.react-chatbot-kit-chat-btn-send]:rounded
                  [&_.react-chatbot-kit-chat-btn-send]:w-10
                  [&_.react-chatbot-kit-user-chat-message]:bg-neon-blue/10
                  [&_.react-chatbot-kit-user-chat-message]:text-neon-blue
                  [&_.react-chatbot-kit-user-chat-message]:border
                  [&_.react-chatbot-kit-user-chat-message]:border-neon-blue/30
                  [&_.react-chatbot-kit-user-chat-message]:rounded-tr-none
                  [&_.react-chatbot-kit-user-chat-message]:rounded-l-xl
                  [&_.react-chatbot-kit-user-chat-message]:rounded-br-xl
                  [&_.react-chatbot-kit-user-avatar-container]:hidden
                ">
                  <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                    placeholderText="> Enter system command..."
                  />
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="group relative w-16 h-16 flex items-center justify-center"
          >
            {/* Pulse Effect */}
            <div className="absolute inset-0 bg-neon-green/20 rounded-full animate-ping duration-[2s]"></div>
            <div className="absolute inset-0 bg-neon-blue/20 rounded-full animate-ping duration-[2s] delay-75"></div>

            {/* Main Button */}
            <div className="absolute inset-0 bg-cyber-black border-2 border-neon-green rounded-full shadow-[0_0_20px_var(--neon-green)] flex items-center justify-center z-10 overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_30px_var(--neon-green)] group-hover:border-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <FaRobot className="text-2xl text-neon-green group-hover:text-white group-hover:scale-110 transition-all duration-300" />
            </div>

            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-gray-900 z-20 shadow-lg">
              1
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;