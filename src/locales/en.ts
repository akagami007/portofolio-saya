export const en = {
  hero: {
    greeting: "Hi, I'm",
    name: "Stefan Cornelius",
    role: "Fullstack Developer & Quality Assurance Engineer",
    description: "I bridge the gap between Fullstack Development and holistic Quality Assurance. I design scalable, innovative application architectures while securing every release through a combination of meticulous manual testing, end-to-end (E2E) automation, and comprehensive test reporting documentation. This unified approach not only accelerates product launch cycles but also provides full transparency to stakeholders, ensuring that every line of code delivers peak performance and a flawless user experience.",
    viewWork: "View My Work",
    hireMe: "Hire Me"
  },
  about: {
    title: "About Me",
    p1: "With a unique dual-focus on both Fullstack Development and Quality Assurance, I don't just write code—I engineer resilient systems. My approach combines the creative problem-solving of frontend/backend development with the meticulous, edge-case-hunting mindset of a QA engineer.",
    p2: "Whether working with freelance clients to bring their vision to life, or collaborating in a team to build enterprise software, I prioritize maintainability, performance, and bulletproof reliability.",
    coreCompetencies: "Core Competencies",
    frontend: "Frontend (React, Next.js, 3D)",
    backend: "Backend (Node.js, SQL, APIs)",
    qa: "QA & E2E Testing (Playwright, Cypress)"
  },
  experience: {
    title: "Work Experience",
    description: "A chronological journey of my professional career.",
    items: [
      {
        id: 1,
        role: "Quality Assurance Tester",
        company: "PT Infosys Solusi Terpadu",
        period: "Apr 2022 - Present",
        description: "Spearheaded comprehensive end-to-end testing strategies for high-impact mobile and web applications. Engineered meticulous test scenarios and structured testing documentation to ensure bulletproof software releases, drastically reducing post-deployment bugs and elevating overall user satisfaction."
      },
      {
        id: 2,
        role: "Pega Developer",
        company: "PT Asuransi Sinar Mas",
        period: "Feb 2021 - Feb 2022",
        description: "Designed and implemented robust enterprise-scale workflow solutions using the Pega platform. Streamlined complex business rules into seamless automated processes, accelerating internal operational efficiency and ensuring secure, highly-available insurance architectures."
      }
    ]
  },
  projects: {
    title: "Project Gallery",
    description: "A showcase of my recent work across Fullstack Development and Quality Assurance. Swipe or drag to explore the projects in 3D space.",
    dragHint: "← Drag to rotate gallery, Click to view details →",
    viewRepo: "View Repository",
    technologies: "Technologies",
    items: [
      {
        id: 1,
        title: "E-Commerce",
        desc: "Next.js & Stripe",
        image: "/projects/1.jpg",
        github: "https://github.com/",
        longDesc: "A high-performance full-stack e-commerce platform designed for modern retail. Features a responsive storefront, secure checkout flow via Stripe, and a custom dashboard for inventory management.",
        tags: ["Next.js", "Stripe", "Tailwind CSS", "TypeScript"]
      },
      {
        id: 2,
        title: "QA Manual & Automation",
        desc: "Playwright, Cypress & Katalon",
        image: "/projects/2.jpg",
        github: "https://github.com/",
        longDesc: "A comprehensive quality assurance suite encompassing both manual testing methodologies and automated E2E testing pipelines. Designed to ensure zero-defect releases across complex web applications.",
        tags: ["Playwright", "Cypress", "Katalon", "E2E Testing"]
      },
      {
        id: 3,
        title: "CMS OpenTrip",
        desc: "Next.js & Postgresql",
        image: "/projects/CMS OpenTrip.png",
        github: "https://github.com/",
        longDesc: "A custom Content Management System tailored specifically for the OpenTrip platform. It empowers administrators to seamlessly manage tour packages, bookings, user roles, and financial reports.",
        tags: ["Next.js", "PostgreSQL", "Prisma", "Admin Panel"]
      },
      {
        id: 4,
        title: "OpenTrip",
        desc: "Next.js & Express",
        image: "/projects/OpenTrip.png",
        github: "https://github.com/",
        longDesc: "The main customer-facing portal for booking travel experiences. Powered by a robust Next.js frontend and an Express backend API, offering real-time tour availability and secure user authentication.",
        tags: ["Next.js", "Express.js", "REST API", "Node.js"]
      },
      {
        id: 5,
        title: "Kilau Kebaya",
        desc: "Next.js, Laravel, & Postgresql",
        image: "/projects/KilauKebaya.png",
        github: "https://github.com/",
        longDesc: "An elegant and modern web application for a premium kebaya boutique. Integrates a beautiful Next.js storefront with a solid Laravel backend API to handle complex product variations and orders.",
        tags: ["Next.js", "Laravel", "PostgreSQL", "E-Commerce"]
      },
      {
        id: 6,
        title: "Coffeshop",
        desc: "Next.js & TailwindCSS",
        image: "/projects/6.jpg",
        github: "https://github.com/akagami007/kopi-kita.git",
        longDesc: "A visually striking landing page and digital menu for a local coffeeshop. Features a pixel-perfect design, smooth micro-animations, and is built purely with Next.js and Tailwind CSS for maximum performance.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "UI/UX"]
      }
    ]
  },
  socials: {
    title: "Connect With Me",
    description: "Find me on my social media or reach out directly."
  },
  contact: {
    title: "Let's Work Together",
    description: "Have a freelance project in mind or looking for a Fullstack/QA engineer? Let's start a chat below."
  },
  chat: {
    botName: "Stefan (Virtual)",
    step1: "Hi there! Thanks for visiting my portfolio. What's your name?",
    step2: "Nice to meet you, {name}! Could I get your email address so I can get back to you later?",
    invalidEmail: "Hmm, that email format looks a bit off. Could you try typing it again?",
    step3: "Awesome! Finally, what would you like to chat about? Please select an option below or type your own message.",
    step4: "Preparing your message for WhatsApp...",
    success: "Done! WhatsApp should open automatically in a moment. If it doesn't, you can send it manually.",
    error: "An error occurred. Please try again or contact me via LinkedIn!",
    inputPlaceholderName: "Type your name...",
    inputPlaceholderEmail: "Type your email...",
    inputPlaceholderMessage: "Type your message here...",
    sendButton: "Send",
    optionJob: "Job Offer",
    optionFreelance: "Freelance Project"
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with Next.js, Three.js, and Playwright."
  },
  nav: {
    about: "About",
    skills: "Skills",
    caseStudies: "Case Studies",
    contact: "Contact Me"
  }
};

export type Dictionary = typeof en;
