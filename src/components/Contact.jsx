import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, 
  FaGithub, FaLinkedin, FaGlobe 
} from 'react-icons/fa';

// --- Mouse position hook (Copied from About.js) ---
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

// --- 1. NEW: Reusable 3D Tilt Card (Replaces 'react-parallax-tilt') ---
const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="w-full bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-xl"
    >
      <div style={{ transform: 'translateZ(25px)' }} className="p-8">
        {children}
      </div>
    </motion.div>
  );
};

// --- Framer Motion variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const Contact = () => {
  const { x, y } = useMousePosition();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // --- Your sendEmail function (Unchanged) ---
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_qnjfq2h", // Your Service ID
        "template_mtox47d", // Your Template ID
        form.current,
        "kQru7H3y0RE44yE9g" // Your Public Key
      )
      .then(
        () => {
          setSuccess(true);
          setLoading(false);
          form.current.reset();
        },
        () => {
          setSuccess(false);
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-gray-900 text-gray-100 py-24 overflow-hidden border-t border-gray-800"
      style={{
        // --- 2. NEW: Mouse Glow Background ---
        background: `
          radial-gradient(
            600px circle at ${x}px ${y}px, 
            rgba(16, 185, 129, 0.15),
            transparent 80%
          ),
          #111827
        `,
      }}
    >
      {/* --- 3. NEW: Static Grid Background --- */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      
      <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-12">
        {/* --- Section Title --- */}
        <motion.h2 
          className="text-lg font-mono text-emerald-400 mb-2 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {''}
        </motion.h2>
        <motion.h3 
          className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Get In Touch
        </motion.h3>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* --- LEFT: Contact Info (in new TiltCard) --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TiltCard>
              <h3 className="text-3xl font-bold mb-6 text-emerald-400">
                Contact Details
              </h3>
              <ul className="space-y-6 mb-8">
                <li className="flex items-center gap-4">
                  <FaEnvelope className="text-emerald-400 text-2xl" />
                  <span className="text-gray-300 text-lg">shivam.work7488@gmail.com</span>
                </li>
                <li className="flex items-center gap-4">
                  <FaPhoneAlt className="text-emerald-400 text-2xl" />
                  <span className="text-gray-300 text-lg">+91 7488445603</span>
                </li>
                <li className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-emerald-400 text-2xl" />
                  <span className="text-gray-300 text-lg">India</span>
                </li>
              </ul>
              {/* --- 4. NEW: Themed Social Links --- */}
              <div className="flex gap-6 text-3xl">
                <a
                  href="https://github.com/shivam-work74" // <-- Fixed link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/shivam-kumar-88057b377/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-500 transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://shivam-work-profile.vercel.app/" // <-- Link to your site
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <FaGlobe />
                </a>
              </div>
            </TiltCard>
          </motion.div>
          
          {/* --- RIGHT: Contact Form (in new TiltCard) --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TiltCard>
              <h3 className="text-3xl font-bold mb-6 text-sky-400">
                Send a Message
              </h3>
              <form ref={form} onSubmit={sendEmail} className="space-y-5">
                {/* --- 5. NEW: Themed Inputs --- */}
                <motion.input
                  variants={itemVariants}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                />
                <motion.input
                  variants={itemVariants}
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                />
                <motion.input
                  variants={itemVariants}
                  type="text"
                  name="title"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <motion.textarea
                  variants={itemVariants}
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                ></motion.textarea>

                {/* --- 6. NEW: "Shiny" Submit Button --- */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={loading}
                  className="group relative w-full text-lg font-medium disabled:opacity-50"
                >
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 via-sky-500 to-emerald-500 opacity-75 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl animate-border-spin" />
                  <span className="relative flex items-center justify-center w-full px-8 py-3 bg-gray-800 rounded-lg shadow-lg">
                    {loading ? "Sending..." : "Send Message 🚀"}
                  </span>
                </motion.button>
              </form>
              
              {/* --- Themed Success/Error Messages --- */}
              <AnimatePresence>
                {success === true && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-green-400 font-medium"
                  >
                    ✅ Message sent successfully!
                  </motion.p>
                )}
                {success === false && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-red-400 font-medium"
                  >
                    ❌ Failed to send message. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;