import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { contactData } from '../constants/data';
import { FaPaperPlane, FaTerminal, FaWifi, FaCircle } from 'react-icons/fa';
import soundManager from '../utils/SoundManager';

const TerminalInput = ({ label, name, type = "text", placeholder, required = false }) => (
  <div className="mb-6">
    <label className="block font-mono text-xs text-international-orange mb-2 uppercase tracking-widest pl-2 border-l-2 border-international-orange">
      {label} {required && '*'}
    </label>
    <div className="relative group">
      {type === 'textarea' ? (
        <textarea
          name={name}
          rows="4"
          onMouseEnter={() => soundManager.playHover()}
          onFocus={() => soundManager.playClick()}
          className="w-full bg-black/50 border border-white/10 p-4 font-mono text-sm text-gray-300 focus:text-white focus:outline-none focus:border-international-orange/50 focus:bg-white/5 transition-all resize-none"
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          onMouseEnter={() => soundManager.playHover()}
          onFocus={() => soundManager.playClick()}
          className="w-full bg-black/50 border border-white/10 p-4 font-mono text-sm text-gray-300 focus:text-white focus:outline-none focus:border-international-orange/50 focus:bg-white/5 transition-all"
          placeholder={placeholder}
          required={required}
        />
      )}
      {/* Blinking Cursor element for decor */}
      <div className="absolute top-4 right-4 w-2 h-4 bg-international-orange animate-pulse opacity-0 group-focus-within:opacity-50 pointer-events-none" />
    </div>
  </div>
);

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      contactData.emailjs.serviceId,
      contactData.emailjs.templateId,
      formRef.current,
      contactData.emailjs.publicKey
    ).then(
      () => {
        setLoading(false);
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus(''), 5000);
      },
      (error) => {
        setLoading(false);
        setStatus('error');
        console.error(error);
      }
    );
  };

  return (
    <section id="contact" className="min-h-screen py-24 bg-transparent flex items-center relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-2 leading-none">
              UPLINK<br />PROTOCOL
            </h2>
            <p className="font-mono text-international-orange tracking-widest uppercase text-sm mt-4">
                    // Secure Transmission Line
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 mt-8 md:mt-0 font-mono text-xs text-gray-500">
            <div className="flex items-center gap-2 text-green-500">
              <FaWifi className="animate-pulse" />
              <span>CONNECTION STABLE</span>
            </div>
            <div>SERVER_TIME: {time}</div>
            <div>LATENCY: 24ms</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Details (Terminal Output Style) */}
          <div className="font-mono text-sm space-y-6 text-gray-400">
            <div className="bg-black/40 border border-white/5 p-6 rounded-sm">
              <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <p className="mb-2"><span className="text-green-500">guest@portfolio:~$</span> cat contact_info.json</p>
              <p className="text-white">{'{'}</p>
              <div className="pl-4 space-y-2">
                <p>"status": "<span className="text-green-400">Open for Opportunities</span>",</p>
                <p>"email": "<span className="text-international-orange hover:underline cursor-pointer">{contactData.email}</span>",</p>
                <p>"location": "{contactData.address}",</p>
                <p>"phone": "{contactData.phone}"</p>
              </div>
              <p className="text-white">{'}'}</p>
              <p className="mt-4"><span className="text-green-500">guest@portfolio:~$</span> <span className="animate-pulse">_</span></p>
            </div>

            <div className="p-6 border-l-2 border-white/10">
              <h3 className="font-display text-white text-xl mb-2">Ready to Collaborate?</h3>
              <p>Initiate the transmission protocol to establish a direct line of communication. Response expected within 24 operational hours.</p>
            </div>
          </div>

          {/* Form (Command Line Input) */}
          <div className="bg-carbon border border-white/10 p-8 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-international-orange via-purple-500 to-international-orange opacity-50" />

            <div className="flex items-center gap-3 mb-8 text-white/50">
              <FaTerminal />
              <span className="font-mono text-xs uppercase tracking-widest">Input Transmission Data</span>
            </div>

            <form ref={formRef} onSubmit={sendEmail} className="relative">
              <TerminalInput
                label="Identity_Key (Name)"
                name="name"
                placeholder="Enter your name or organization ID"
                required
              />

              <TerminalInput
                label="Return_Address (Email)"
                name="email"
                type="email"
                placeholder="name@domain.com"
                required
              />

              <TerminalInput
                label="Payload_Data (Message)"
                name="message"
                type="textarea"
                placeholder="Describe your project parameters..."
                required
              />

              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="w-full mt-4 px-8 py-4 bg-white text-black font-mono font-bold uppercase tracking-widest hover:bg-international-orange hover:text-white transition-all duration-300 flex justify-center items-center gap-3 group"
              >
                {loading ? (
                  <>
                    <FaWifi className="animate-spin" />
                    Uplinking...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    Execute Transmission
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-500/10 border border-green-500 text-green-500 font-mono text-xs text-center"
                >
                  &gt; TRANSMISSION_SUCCESSFUL: Handshake established.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500 text-red-500 font-mono text-xs text-center"
                >
                  &gt; ERROR_404: Transmission failed. Please retry.
                </motion.div>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;