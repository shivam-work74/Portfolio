import React from "react";
import {
  FaDownload,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-200">
      {/* Top spacing for fixed navbar */}
      <div className="pt-24"></div>

      {/* Hero / Intro */}
      <section className="relative max-w-6xl mx-auto px-6">
        {/* Soft background glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 -left-24 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="absolute top-40 -right-24 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
        </div>

        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-fadeUp">
            About Me
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 leading-relaxed animate-fadeUp delay-150">
            I’m <span className="text-gray-200 font-semibold">Shivam Kumar</span> — an
            MCA student and full-stack developer who builds clean, fast, and
            modern web apps with React, Node.js, and Tailwind. I care about
            elegant UX, performance, and a maintainable codebase.
          </p>
        </div>

        {/* Profile card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-1">
            <div className="relative group h-full">
              {/* Glow border */}
              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-90 blur transition-all duration-500"></div>

              <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 h-full">
                <div className="w-full aspect-square overflow-hidden rounded-xl mb-4">
                  {/* Put your image at public/profile.jpg */}
                  <img
                    src="/profile.jpg"
                    alt="Shivam Kumar"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>

                <h3 className="text-2xl font-semibold">Shivam Kumar</h3>
                <p className="text-sm text-gray-400 mt-1">
                  MCA Student • Full-Stack Developer
                </p>

                <div className="flex items-center gap-2 mt-4 text-gray-300">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span>India</span>
                </div>

                <div className="flex gap-3 mt-6">
                  {/* Put your resume at public/resume.pdf */}
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition shadow-lg text-white text-sm"
                  >
                    <FaDownload /> Resume
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/10 text-sm"
                  >
                    <FaEnvelope /> Contact
                  </a>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                    <p className="text-2xl font-bold text-white">15+</p>
                    <p className="text-[11px] text-gray-400">Projects</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                    <p className="text-2xl font-bold text-white">8+</p>
                    <p className="text-[11px] text-gray-400">Techs</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                    <p className="text-2xl font-bold text-white">2+</p>
                    <p className="text-[11px] text-gray-400">Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio + Highlights */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 lg:p-8 h-full">
              <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
              <p className="text-gray-300 leading-relaxed">
                I craft responsive, accessible interfaces and robust backends.
                I love shipping features that delight users and make teams move
                faster. My current stack:{" "}
                <span className="text-blue-400 font-medium">
                  React, Node.js, Express, Tailwind, REST APIs
                </span>
                . Comfortable with Git, deployments, and debugging.
              </p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "React",
                  "Node.js",
                  "Express",
                  "JavaScript (ES6+)",
                  "Tailwind CSS",
                  "REST API",
                  "Git & GitHub",
                  "Vercel",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Achievements */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <FaAward className="text-pink-400" />
                    <h4 className="font-semibold">What I’m proud of</h4>
                  </div>
                  <ul className="list-disc ml-6 text-gray-300 space-y-1 text-sm">
                    <li>Shipped multiple full-stack projects on Vercel</li>
                    <li>Built clean UI systems with Tailwind</li>
                    <li>Strong problem solving & debugging</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <FaEnvelope className="text-blue-400" />
                    <h4 className="font-semibold">Open to</h4>
                  </div>
                  <ul className="list-disc ml-6 text-gray-300 space-y-1 text-sm">
                    <li>Internships / Freelance</li>
                    <li>Frontend & Full-stack roles</li>
                    <li>Collaborations on cool ideas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">Journey</h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-60" />

            <ul className="space-y-8">
              {[
                {
                  icon: <FaBriefcase />,
                  title: "Full-Stack Projects",
                  time: "2024 — Present",
                  desc:
                    "Built and deployed resume builder, games, and learning platforms with React/Node. Focused on performance, UI polish, and clean architecture.",
                },
                {
                  icon: <FaGraduationCap />,
                  title: "Master of Computer Applications (MCA)",
                  time: "Current",
                  desc:
                    "Deepening CS fundamentals, software engineering practices, and applied development.",
                },
                {
                  icon: <FaGraduationCap />,
                  title: "Bachelor’s (B.Sc / BCA or similar)",
                  time: "Past",
                  desc:
                    "Foundations in programming, data structures, and web technologies.",
                },
                {
                  icon: <FaGraduationCap />,
                  title: "Intermediate (Class 12th)",
                  time: "Completed",
                  desc:
                    "Studied Physics, Chemistry, Mathematics; strengthened logical reasoning and analytical skills.",
                },
                {
                  icon: <FaGraduationCap />,
                  title: "Matriculation (Class 10th)",
                  time: "Completed",
                  desc:
                    "Built a strong academic foundation and developed early interest in technology.",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                    i % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-3 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white ring-4 ring-purple-500/40" />

                  {/* Card */}
                  <div
                    className={`w-full sm:w-[45%] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 hover:bg-white/10 transition ${
                      i % 2 === 0 ? "sm:ml-[55%]" : "sm:mr-[55%]"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-purple-300 mb-1">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs uppercase tracking-wider">
                        {item.time}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-300 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-16" />
      </section>

      {/* Local animations */}
      <style>{`
        .animate-fadeUp {
          animation: fadeUp .7s ease both;
        }
        .delay-150 { animation-delay: .15s; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
