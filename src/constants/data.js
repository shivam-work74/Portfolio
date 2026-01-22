export const navItems = [
    { name: 'HOME', section: 'home' },
    { name: 'ABOUT', section: 'about' },
    { name: 'PROJECTS', section: 'projects' },
    { name: 'LAB', section: 'game-hub' },
    { name: 'SKILLS', section: 'skills' },
    { name: 'CERTS', section: 'certifications' }, // Added
    { name: 'CONTACT', section: 'contact' },
];

export const heroData = {
    title: "LEVEL UP YOUR WEB EXPERIENCE",
    subtitle: "Full-Stack Developer",
    typingText: ["Initializing Full-Stack Protocols...", "Architecting Digital Solutions...", "Deploying Creative Code..."],
    socialLinks: {
        github: "https://github.com/shivam-work74",
        linkedin: "https://linkedin.com/in/your-profile",
        instagram: "https://instagram.com/your-profile",
        website: "https://shivam-work-profile.vercel.app/"
    }
};

export const aboutData = {
    profileImage: "/profile.jpg",
    name: "SHIVAM KUMAR",
    role: "Full-Stack Architect",
    id: "SHIVAM_KUMAR",
    description: "As a Level 25 MCA student, I specialize in crafting high-performance digital experiences. My mission is to turn complex algorithms into seamless, user-centric interfaces.",
    stats: [
        { label: "MCA Student", value: "Mastering Architecture", icon: "FaUniversity" },
        { label: "Full-Stack Dev", value: "Building Digital Worlds", icon: "FaLaptopCode" },
        { label: "Problem Solver", value: "Debugging Reality", icon: "FaCode" },
    ]
};

export const projectsData = [
    {
        id: 1,
        title: "Cine-Match",
        description: "An interesting and unique Tinder-like swiping app for movies.",
        github: "https://github.com/shivam-work74/CineMatch.git",
        demo: "https://cine-match-sable.vercel.app/",
        image: "/cinematch.png",
        tags: ["React", "API"],
        category: "Entertainment"
    },
    {
        id: 2,
        title: "Learn-Sphere",
        description: "A comprehensive learning platform for all your educational needs.",
        github: "https://github.com/shivam-work74/learn-sphere.git",
        demo: "https://learn-sphere-seven-pi.vercel.app/",
        image: "/learnsphere.png",
        tags: ["React", "API"],
        category: "Education"
    },
    {
        id: 3,
        title: "Resume Builder",
        description: "AI-powered resume builder that saves you time and effort.",
        github: "https://github.com/shivam-work74/Resume-builder.git",
        demo: "https://resume-builder-liart-theta.vercel.app/",
        image: "/resume.png",
        tags: ["React", "AI", "Tailwind"],
        category: "Productivity"
    },
    {
        id: 4,
        title: "Domineering Game",
        description: "Say goodbye to boredom with this engaging mini game.",
        github: "https://github.com/shivam-work74/Domineering-game.git",
        demo: "https://domineering-game.vercel.app/",
        image: "/domineering.png",
        tags: ["JavaScript", "Game"],
        category: "Gaming"
    },
    {
        id: 5,
        title: "Tic-Tac-Toe",
        description: "A classic mini game to help you relax and unwind.",
        github: "https://github.com/shivam-work74/Tic_Tac_Toe.git",
        demo: "https://tic-tac-dwr560aso-shivam-s-projects-6c11e3bb.vercel.app",
        image: "/tic.png",
        tags: ["React", "Game"],
        category: "Gaming"
    },
    {
        id: 6,
        title: "Story Forge",
        description: "A unique story-based game that you need to experience.",
        github: "https://github.com/shivam-work74/Story-Forge.git",
        demo: "https://story-forge-olive.vercel.app/",
        image: "/storyforge.png",
        tags: ["React", "Game", "Tailwind"],
        category: "Gaming"
    },
    {
        id: 7,
        title: "Diamond Thief",
        description: "An interactive gaming experience.",
        github: "https://github.com/shivam-work74/DIAMOND-THIEF.git",
        demo: "https://diamond-thief.vercel.app/",
        image: "/quiz.png",
        tags: ["React", "Game"],
        category: "Gaming"
    },
    {
        id: 8,
        title: "Profile Viewer",
        description: "GitHub profile search and viewer application.",
        github: "https://github.com/shivam-work74/Profile-Viewer",
        demo: "https://githubprofile-viewer-ou0shu4sf-shivam-s-projects-6c11e3bb.vercel.app",
        image: "/profile.png",
        tags: ["React", "API"],
        category: "Utility"
    },
    {
        id: 9,
        title: "Fool's Fortune",
        description: "An interesting and unique card game.",
        github: "https://github.com/shivam-work74/Fools-Fortune.git",
        demo: "https://fools-fortune-rqzq.vercel.app/",
        image: "/fortune.png",
        tags: ["React", "API"],
        category: "Gaming"
    }
];

export const skillsData = [
    // Frontend
    { name: "HTML5", level: 95, category: "Frontend" },
    { name: "CSS3", level: 90, category: "Frontend" },
    { name: "JavaScript", level: 85, category: "Frontend" },
    { name: "React", level: 85, category: "Frontend" },
    { name: "TypeScript", level: 80, category: "Frontend" },
    { name: "Tailwind", level: 90, category: "Frontend" },
    // Backend
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Express", level: 75, category: "Backend" },
    { name: "Python", level: 70, category: "Backend" },
    { name: "Java", level: 65, category: "Backend" },
    // Database
    { name: "MongoDB", level: 75, category: "Database" },
    { name: "PostgreSQL", level: 70, category: "Database" },
    { name: "Redis", level: 65, category: "Database" },
    // DevOps
    { name: "Git", level: 85, category: "DevOps" },
    { name: "Docker", level: 70, category: "DevOps" },
    { name: "AWS", level: 65, category: "DevOps" },
];

export const achievements = [
    { id: 1, title: "Frontend Master", description: "Completed 50+ React projects", unlocked: true },
    { id: 2, title: "JS Ninja", description: "Solved 100+ coding challenges", unlocked: true },
    { id: 3, title: "Full Stack Hero", description: "Built 20+ full stack apps", unlocked: false },
    { id: 4, title: "Cloud Walker", description: "Deployed 15+ apps to cloud", unlocked: true },
    { id: 5, title: "App Wizard", description: "Created 5+ mobile apps", unlocked: false },
    { id: 6, title: "Architect Initialized", description: "Systems online. Welcome to the workspace.", unlocked: false },
    { id: 7, title: "Deep Diver", description: "Explored the depths of the digital interface.", unlocked: false },
    { id: 8, title: "Lab Technician", description: "Accessed the experimental Game Hub.", unlocked: false },
];

export const gamesData = [
    {
        id: 'cyber-defense',
        title: 'CYBER DEFENSE',
        description: 'Defend the codebase from incoming bugs in this Space Invaders-style shooter.',
        color: 'neon-blue'
    },
    {
        id: 'neural-nexus',
        title: 'NEURAL NEXUS',
        description: 'Test your memory protocols. Match tech stack icons in Solo or PvP modes.',
        color: 'neon-pink'
    },
    {
        id: 'cyber-serpent',
        title: 'CYBER SERPENT',
        description: 'Navigate the grid, collect data packets, and grow your system. Classic Snake evolved.',
        color: 'neon-green'
    },
    {
        id: 'gravity-glitch',
        title: 'GRAVITY GLITCH',
        description: 'Defy gravity and navigate through the firewall. One tap to jump, infinite challenge.',
        color: 'yellow-400'
    }
];

export const contactData = {
    email: "shivam.work7488@gmail.com",
    phone: "+91 7488445603",
    address: "India",
    emailjs: {
        serviceId: "service_qnjfq2h",
        templateId: "template_mtox47d",
        publicKey: "kQru7H3y0RE44yE9g"
    }
};

export const certificationsData = [
    {
        id: 1,
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2024",
        credentialId: "AWS-CSAA-24891",
        color: "#FF9900", // AWS Orange
        icon: "FaAws",
        pdf: "/certificates/demo_certificate.pdf"
    },
    {
        id: 2,
        title: "Meta Front-End Developer",
        issuer: "Meta",
        date: "2023",
        credentialId: "META-FE-88210",
        color: "#0668E1", // Meta Blue
        icon: "FaReact",
        pdf: "/certificates/demo_certificate.pdf"
    },
    {
        id: 3,
        title: "Professional Cloud Architect",
        issuer: "Google Cloud",
        date: "2024",
        credentialId: "GCP-PCA-99120",
        color: "#4285F4", // Google Blue
        icon: "FaGoogle",
        pdf: "/certificates/demo_certificate.pdf"
    },
    {
        id: 4,
        title: "Certified Kubernetes Administrator",
        issuer: "CNCF",
        date: "2023",
        credentialId: "CKA-22910-X",
        color: "#326CE5", // Kubernetes Blue
        icon: "FaDocker",
        pdf: "/certificates/demo_certificate.pdf"
    }
];

export const timelineData = [
    {
        id: 1,
        year: "2024 - PRESENT",
        title: "Master of Computer Applications",
        company: "Specialized in Full-Stack Architecture",
        description: "Focusing on advanced distributed systems, cloud infrastructure, and human-centric design protocols.",
        type: "education",
        tags: ["Distributed Systems", "Cloud Ops", "UX Architecture"]
    },
    {
        id: 2,
        year: "2023 - 2024",
        title: "Senior Web Developer",
        company: "Freelance / Digital Agency",
        description: "Architected high-scale web applications with React and Node.js. Optimized performance benchmarks by 40%.",
        type: "experience",
        tags: ["React", "Performance", "Optimization"]
    },
    {
        id: 3,
        year: "2022 - 2023",
        title: "Frontend Developer Intern",
        company: "Tech Start-up",
        description: "Collaborated on UI/UX redesigns and implemented complex animations using GSAP and Framer Motion.",
        type: "experience",
        tags: ["UI/UX", "GSAP", "Animation"]
    },
    {
        id: 4,
        year: "2019 - 2022",
        title: "Bachelor of Computer Applications",
        company: "University Degree",
        description: "Gained foundational knowledge in algorithms, database management, and early web technologies.",
        type: "education",
        tags: ["Algorithms", "DBMS", "Web Tech"]
    }
];
