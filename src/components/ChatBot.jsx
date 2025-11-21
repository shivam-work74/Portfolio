import React, { useState } from "react";
import { Chatbot } from "react-chatbot-kit";
import { FaRobot, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Simple chatbot configuration
const config = {
  botName: "ShivamBot",
  initialMessages: [
    { message: "Hello! I'm Shivam's AI assistant. How can I help you today?", sender: "bot" },
    { message: "You can ask me about Shivam's projects, skills, or experience!", sender: "bot" }
  ],
  state: {},
  widgetRegistry: {}
};

// Custom message parser
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      actions.handleHello();
    } else if (lowerCaseMessage.includes("project") || lowerCaseMessage.includes("work")) {
      actions.handleProjects();
    } else if (lowerCaseMessage.includes("skill") || lowerCaseMessage.includes("know")) {
      actions.handleSkills();
    } else if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("email")) {
      actions.handleContact();
    } else if (lowerCaseMessage.includes("thank")) {
      actions.handleThanks();
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

// Custom action provider
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const message = createChatBotMessage("Hi there! I'm here to help you learn more about Shivam and his work.");
    updateState(message);
  };

  const handleProjects = () => {
    const message = createChatBotMessage(
      "Shivam has worked on many interesting projects including Cine-Match (a movie swiping app), Learn-Sphere (a learning platform), and several games like Tic-Tac-Toe and Diamond-Thief. Would you like to know more about any specific project?",
      {
        widget: "projects",
      }
    );
    updateState(message);
  };

  const handleSkills = () => {
    const message = createChatBotMessage(
      "Shivam is skilled in React, JavaScript, Node.js, HTML, CSS, and databases. He's a full-stack developer with over 4 years of experience. Want to know more about any specific skill?",
      {
        widget: "skills",
      }
    );
    updateState(message);
  };

  const handleContact = () => {
    const message = createChatBotMessage(
      "You can contact Shivam via email at shivam.work7488@gmail.com or connect with him on LinkedIn, GitHub, or Instagram. Would you like me to provide the links?",
      {
        widget: "contact",
      }
    );
    updateState(message);
  };

  const handleThanks = () => {
    const message = createChatBotMessage("You're welcome! Is there anything else I can help you with?");
    updateState(message);
  };

  const handleDefault = () => {
    const message = createChatBotMessage(
      "I'm not sure I understand. You can ask me about Shivam's projects, skills, or how to contact him!"
    );
    updateState(message);
  };

  const updateState = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
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
            handleThanks,
            handleDefault,
          },
        });
      })}
    </div>
  );
};

// Custom components for widgets
const ProjectsWidget = () => {
  return (
    <div className="text-sm">
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <li>Cine-Match - Movie swiping app</li>
        <li>Learn-Sphere - Learning platform</li>
        <li>RESUME-BUILDER - AI-powered resume builder</li>
        <li>Several games - Tic-Tac-Toe, Diamond-Thief</li>
      </ul>
    </div>
  );
};

const SkillsWidget = () => {
  return (
    <div className="text-sm">
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <li>React & JavaScript - Expert</li>
        <li>Node.js - Advanced</li>
        <li>HTML/CSS - Expert</li>
        <li>Database - Intermediate</li>
      </ul>
    </div>
  );
};

const ContactWidget = () => {
  return (
    <div className="text-sm">
      <ul className="list-disc pl-5 space-y-1 mt-2">
        <li>Email: shivam.work7488@gmail.com</li>
        <li>LinkedIn: linkedin.com/in/shivam-kumar-88057b377</li>
        <li>GitHub: github.com/shivam-work74</li>
        <li>Instagram: @shivmmm_74</li>
      </ul>
    </div>
  );
};

// Register widgets
config.widgets = [
  {
    widgetName: "projects",
    widgetFunc: (props) => <ProjectsWidget {...props} />,
  },
  {
    widgetName: "skills",
    widgetFunc: (props) => <SkillsWidget {...props} />,
  },
  {
    widgetName: "contact",
    widgetFunc: (props) => <ContactWidget {...props} />,
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-80 h-96 flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-2xl flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaRobot className="text-white" />
                  <h3 className="text-white font-bold">Shivam's Assistant</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition"
                >
                  <FaTimes />
                </button>
              </div>
              
              {/* Chat Container */}
              <div className="flex-grow">
                <Chatbot
                  config={config}
                  messageParser={MessageParser}
                  actionProvider={ActionProvider}
                />
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
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            <FaRobot className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;