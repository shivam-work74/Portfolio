import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Tilt from "react-parallax-tilt";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

const ContactPage = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_qnjfq2h", // ✅ Your Service ID
        "template_mtox47d", // ✅ Your Template ID
        form.current,
        "kQru7H3y0RE44yE9g" // ✅ Your Public Key
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
      className="relative w-full py-24 bg-gradient-to-br from-gray-900 via-black to-purple-950 text-white px-6 md:px-20 overflow-hidden"
    >
      {/* Background glowing orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>

      {/* Section Title */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 animate-slideIn">
          Let’s Connect
        </h2>
        <div className="h-1 w-40 bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 mx-auto mt-3 rounded-full animate-underline"></div>
        <p className="text-gray-400 mt-4 text-lg">
          I’d love to hear from you. Feel free to reach out for projects,
          collaborations, or just a friendly hello 👋
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 relative z-10">
        {/* Contact Info */}
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-lg shadow-xl hover:scale-105 transition-transform duration-500"
        >
          <h3 className="text-2xl font-bold mb-6 text-pink-400">
            Contact Details
          </h3>
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <FaEnvelope className="text-pink-400 text-2xl" />
              <span className="text-gray-300">shivam.work7488@gmail.com</span>
            </li>
            <li className="flex items-center gap-4">
              <FaPhoneAlt className="text-pink-400 text-2xl" />
              <span className="text-gray-300">+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-pink-400 text-2xl" />
              <span className="text-gray-300">India</span>
            </li>
          </ul>

          {/* Social Links */}
          <div className="mt-8 flex gap-6 text-2xl">
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              <FaGlobe />
            </a>
          </div>
        </Tilt>

        {/* Contact Form */}
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-lg shadow-xl hover:scale-105 transition-transform duration-500"
        >
          <h3 className="text-2xl font-bold mb-6 text-purple-400">
            Send a Message
          </h3>
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message 🚀"}
            </button>
          </form>

          {success === true && (
            <p className="mt-4 text-green-400 font-medium">
              ✅ Message sent successfully!
            </p>
          )}
          {success === false && (
            <p className="mt-4 text-red-400 font-medium">
              ❌ Failed to send message. Please try again.
            </p>
          )}
        </Tilt>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn { animation: slideIn 1s ease-out forwards; }
        @keyframes underline {
          0% { width: 0; }
          100% { width: 10rem; }
        }
        .animate-underline { animation: underline 1s ease forwards; }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }
        .animate-pulse-slow { animation: pulseSlow 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default ContactPage;
