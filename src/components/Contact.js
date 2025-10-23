import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been received.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 md:px-20 overflow-hidden"
    >
      <h2 className="text-4xl font-bold mb-12 text-center animate-slideIn">
        Contact Me
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-start gap-10 relative z-10">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full md:w-1/2 bg-gray-800 p-8 rounded-2xl shadow-lg animate-fadeIn"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="mb-4 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="mb-4 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="mb-4 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="5"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-1/3 animate-fadeIn">
          <p className="text-lg font-semibold">Connect with me:</p>
          <div className="flex space-x-6 text-3xl text-white">
            <a
              href="https://github.com/shivam-work74"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/shivam-kumar-88057b377/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:shivam.work7488@gmail.com"
              className="hover:text-red-500 transition"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://instagram.com/shivmmm_74"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className="absolute w-72 h-72 bg-purple-500 opacity-20 rounded-full top-10 left-10 animate-blob animation-delay-2000"></span>
        <span className="absolute w-96 h-96 bg-pink-500 opacity-20 rounded-full top-64 right-20 animate-blob animation-delay-4000"></span>
      </div>

      <style>{`
        @keyframes fadeIn { from {opacity:0;} to{opacity:1;} }
        .animate-fadeIn { animation: fadeIn 1.5s ease-in-out forwards; }

        @keyframes slideIn { 0% { transform: translateY(20px); opacity:0;} 100% { transform: translateY(0); opacity:1;} }
        .animate-slideIn { animation: slideIn 1s ease-out forwards; }

        @keyframes blob { 0%,100%{transform: translate(0,0) scale(1);} 33%{transform: translate(30px,-50px) scale(1.1);} 66%{transform: translate(-20px,20px) scale(0.9);} }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default Contact;
