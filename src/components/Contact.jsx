import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt,
  FaGithub, FaLinkedin, FaGlobe, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaSatellite
} from 'react-icons/fa';

// --- Mouse position hook ---
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

// --- Holographic Globe Component ---
const HolographicGlobe = () => {
  return (
    <div className="relative w-48 h-48 mx-auto mb-8 opacity-80">
      <div className="absolute inset-0 rounded-full border-2 border-neon-blue/30 animate-[spin_10s_linear_infinite]"></div>
      <div className="absolute inset-2 rounded-full border border-neon-green/20 animate-[spin_15s_linear_infinite_reverse]"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-neon-blue/10 to-transparent backdrop-blur-sm"></div>

      {/* Scanning Line */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="w-full h-1 bg-neon-green/50 absolute top-0 animate-[scan_3s_linear_infinite]"></div>
      </div>

      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FaGlobe className="text-6xl text-neon-blue animate-pulse" />
      </div>
    </div>
  );
};

// --- 3D Tilt Card ---
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

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
      className={`relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>

      {/* Holographic Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-green rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-green rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue rounded-br-lg"></div>
    </motion.div>
  );
};

const Contact = () => {
  const { x, y } = useMousePosition();
  const form = useRef();
  const [status, setStatus] = useState('idle'); // idle, encrypting, sending, success, error
  const [progress, setProgress] = useState(0);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('encrypting');

    // Simulate Encryption Sequence
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('sending');

        // Actual Send
        emailjs
          .sendForm(
            "service_qnjfq2h",
            "template_mtox47d",
            form.current,
            "kQru7H3y0RE44yE9g"
          )
          .then(
            () => {
              setStatus('success');
              form.current.reset();
              setTimeout(() => {
                setStatus('idle');
                setProgress(0);
              }, 5000);
            },
            () => {
              setStatus('error');
              setTimeout(() => setStatus('idle'), 3000);
            }
          );
      }
    }, 50);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-cyber-black text-gray-100 py-24 overflow-hidden font-gaming"
    >
      {/* --- Dynamic Background --- */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(800px circle at ${x}px ${y}px, rgba(0, 255, 65, 0.03), transparent 40%),
            radial-gradient(600px circle at ${window.innerWidth - x}px ${window.innerHeight - y}px, rgba(0, 243, 255, 0.03), transparent 40%)
          `
        }}
      />

      {/* Cyber Grid & Floating Particles */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-mono mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
            SYSTEM STATUS: ONLINE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            ESTABLISH <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">UPLINK</span>
          </motion.h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Initiate secure transmission sequence. All frequencies are open for collaboration.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* --- LEFT: Holographic Info Terminal --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard className="p-8 h-full">
              <HolographicGlobe />

              <div className="space-y-8">
                <div className="group flex items-center gap-6 p-4 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-neon-green/50 transition-all duration-300">
                  <div className="p-4 rounded-lg bg-gray-900 text-neon-green text-2xl group-hover:scale-110 transition-transform">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-mono uppercase tracking-wider">Secure Channel</h4>
                    <p className="text-lg text-white font-medium">shivam.work7488@gmail.com</p>
                  </div>
                </div>

                <div className="group flex items-center gap-6 p-4 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-neon-blue/50 transition-all duration-300">
                  <div className="p-4 rounded-lg bg-gray-900 text-neon-blue text-2xl group-hover:scale-110 transition-transform">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-mono uppercase tracking-wider">Voice Link</h4>
                    <p className="text-lg text-white font-medium">+91 7488445603</p>
                  </div>
                </div>

                <div className="group flex items-center gap-6 p-4 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-neon-pink/50 transition-all duration-300">
                  <div className="p-4 rounded-lg bg-gray-900 text-neon-pink text-2xl group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 font-mono uppercase tracking-wider">Base Coordinates</h4>
                    <p className="text-lg text-white font-medium">India</p>
                  </div>
                </div>
              </div>

              {/* Social Frequency Bar */}
              <div className="mt-10 pt-8 border-t border-gray-700/50 flex justify-between items-center">
                <span className="text-xs font-mono text-gray-500">CONNECT_VIA:</span>
                <div className="flex gap-4">
                  {[
                    { icon: <FaGithub />, href: "https://github.com/shivam-work74", color: "hover:text-white" },
                    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/shivam-kumar-88057b377/", color: "hover:text-sky-400" },
                    { icon: <FaGlobe />, href: "https://shivam-work-profile.vercel.app/", color: "hover:text-neon-green" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-900 rounded-lg text-gray-400 transition-all duration-300 hover:scale-110 ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* --- RIGHT: Transmission Console (Form) --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard className="p-8 relative overflow-hidden">

              {/* Status Overlay for Transmission */}
              <AnimatePresence>
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-gray-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                  >
                    {status === 'encrypting' && (
                      <>
                        <FaSatellite className="text-5xl text-neon-blue animate-bounce mb-6" />
                        <h3 className="text-xl font-mono text-neon-blue mb-2">ENCRYPTING DATA PACKETS...</h3>
                        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-neon-blue"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 font-mono">{progress}% COMPLETED</p>
                      </>
                    )}

                    {status === 'sending' && (
                      <>
                        <FaPaperPlane className="text-5xl text-neon-green animate-pulse mb-6" />
                        <h3 className="text-xl font-mono text-neon-green">TRANSMITTING TO SERVER...</h3>
                      </>
                    )}

                    {status === 'success' && (
                      <>
                        <FaCheckCircle className="text-6xl text-neon-green mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">TRANSMISSION COMPLETE</h3>
                        <p className="text-gray-400">Your message has been successfully uplinked.</p>
                      </>
                    )}

                    {status === 'error' && (
                      <>
                        <FaExclamationCircle className="text-6xl text-red-500 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">UPLINK FAILED</h3>
                        <p className="text-gray-400">Signal lost. Please re-attempt transmission.</p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-neon-green">{'>>'}</span>
                COMPOSE MESSAGE
              </h3>

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500 ml-1">USER_ID (NAME)</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green outline-none transition-all font-mono placeholder-gray-600"
                      placeholder="ENTER NAME"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500 ml-1">RETURN_ADDRESS (EMAIL)</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green outline-none transition-all font-mono placeholder-gray-600"
                      placeholder="ENTER EMAIL"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500 ml-1">SUBJECT_LINE</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all font-mono placeholder-gray-600"
                    placeholder="ENTER SUBJECT"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500 ml-1">DATA_PAYLOAD (MESSAGE)</label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-neon-pink focus:ring-1 focus:ring-neon-pink outline-none transition-all font-mono placeholder-gray-600 resize-none"
                    placeholder="ENTER MESSAGE CONTENT..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-lg bg-neon-green/10 border border-neon-green/50 px-8 py-4 transition-all hover:bg-neon-green/20"
                >
                  <div className="absolute inset-0 flex items-center justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20"></div>
                  </div>
                  <span className="flex items-center justify-center gap-2 text-neon-green font-bold font-mono tracking-wider">
                    <FaPaperPlane /> INITIATE TRANSMISSION
                  </span>
                </button>
              </form>

            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;