import Profile from "./models/Profile.js"
import Project from "./models/Project.js"
import User from "./models/User.js"

export const seedResumeData = async () => {
  try {
    const existingProfile = await Profile.findOne()
    const profileData = {
      fullName: "Prithiviraj Elumalai",
      title: "Full Stack Developer | Node.js | Laravel | Next.js | Distributed Web Platforms",
      bio: "Full Stack Developer with 3+ years of experience engineering secure web applications, high-traffic government portals, and mobile backends. Specialized in transforming highly complex government regulations, multi-tier approvals, and statutory forms into seamless, user-friendly digital workflows. Expert in handling multi-tenant Role-Based Access Controls (RBAC), end-to-end payment gateway integrations, and data pipeline optimizations (70% latency reduction).",
      aboutMe: "Full Stack Developer with 3+ years of experience engineering secure web applications, high-traffic government portals, and mobile backends. Specialized in transforming highly complex government regulations, multi-tier approvals, and statutory forms into seamless, user-friendly digital workflows. Expert in handling multi-tenant Role-Based Access Controls (RBAC), end-to-end payment gateway integrations, and data pipeline optimizations (70% latency reduction). Holds a Master of Computer Applications (MCA) from Veer Narmad South Gujarat University (2020-2022). Deeply proficient in Node.js, Express.js, Laravel 12 (PHP 8.3), Next.js, React.js, PostgreSQL, MongoDB, Redis, and AWS cloud infrastructure. Experienced with PKI Cryptography (PKCS#7, SHA-256) and Hardware DSC Tokens for digital certification. Languages known: English (Professional), Tamil (Native), Hindi (Conversational), and Gujarati (Conversational).",
      avatar: "/images/user.jpg",
      experience: [
        {
          position: "Full Stack Developer",
          company: "Prakhar Software Solutions Pvt. Ltd.",
          duration: "Mar 2023 – Present",
          description: "Daman, DNH&DD - Leading development of high-traffic e-Governance portals, payment gateways, and cryptographic security systems.",
        },
        {
          position: "MERN Stack Developer (Intern)",
          company: "Script India",
          duration: "Jan 2022 – Jun 2022",
          description: "Vapi, Gujarat - Developed modular REST APIs with Express.js and MongoDB, achieving a 25% application response time improvement through deep query tuning and unit testing.",
        },
      ],
      education: [
        {
          degree: "Master of Computer Applications (MCA)",
          institution: "Veer Narmad South Gujarat University",
          year: "2020 – 2022",
          description: "Advanced computing, software engineering, distributed systems, and database architectures.",
        },
      ],
      skills: [
        // Backend
        { name: "Node.js", category: "BACK-END", icon: '<i class="devicon-nodejs-plain colored"></i>' },
        { name: "Express.js", category: "BACK-END", icon: '<i class="devicon-express-original"></i>' },
        { name: "Laravel 12 (PHP 8.3)", category: "BACK-END", icon: '<i class="devicon-laravel-plain colored"></i>' },
        { name: "Next.js (App Router)", category: "BACK-END", icon: '<i class="devicon-nextjs-original"></i>' },
        { name: "RESTful APIs", category: "BACK-END", icon: '<i class="fa-solid fa-network-wired" style="color: #3b82f6;"></i>' },
        
        // Frontend
        { name: "React.js", category: "FRONT-END", icon: '<i class="devicon-react-original colored"></i>' },
        { name: "Next.js", category: "FRONT-END", icon: '<i class="devicon-nextjs-plain"></i>' },
        { name: "TypeScript", category: "FRONT-END", icon: '<i class="devicon-typescript-plain colored"></i>' },
        { name: "JavaScript (ES6+)", category: "FRONT-END", icon: '<i class="devicon-javascript-plain colored"></i>' },
        { name: "Tailwind CSS", category: "FRONT-END", icon: '<i class="devicon-tailwindcss-plain colored"></i>' },
        { name: "Vite", category: "FRONT-END", icon: '<i class="devicon-vitejs-plain colored"></i>' },

        // Database
        { name: "PostgreSQL", category: "DATABASE", icon: '<i class="devicon-postgresql-plain colored"></i>' },
        { name: "MongoDB", category: "DATABASE", icon: '<i class="devicon-mongodb-plain colored"></i>' },
        { name: "MySQL", category: "DATABASE", icon: '<i class="devicon-mysql-plain colored"></i>' },
        { name: "Redis", category: "DATABASE", icon: '<i class="devicon-redis-plain colored"></i>' },
        { name: "Drizzle ORM", category: "DATABASE", icon: '<i class="devicon-drizzle-plain colored"></i>' },

        // Security & Crypto
        { name: "PKI Cryptography (PKCS#7)", category: "SECURITY", icon: '<i class="fa-solid fa-key" style="color: #f59e0b;"></i>' },
        { name: "Hardware DSC Tokens", category: "SECURITY", icon: '<i class="fa-solid fa-shield-halved" style="color: #10b981;"></i>' },
        { name: "AES Encryption", category: "SECURITY", icon: '<i class="fa-solid fa-lock" style="color: #6366f1;"></i>' },
        { name: "JWT & RBAC", category: "SECURITY", icon: '<i class="fa-solid fa-user-shield" style="color: #ec4899;"></i>' },

        // Cloud & DevOps
        { name: "AWS (EC2, S3, Lambda)", category: "CLOUD", icon: '<i class="devicon-amazonwebservices-plain-wordmark colored"></i>' },
        { name: "Docker", category: "CLOUD", icon: '<i class="devicon-docker-plain colored"></i>' },
        { name: "Vercel", category: "CLOUD", icon: '<i class="devicon-vercel-plain"></i>' },
        { name: "Git & GitHub", category: "CLOUD", icon: '<i class="devicon-git-plain colored"></i>' },
        { name: "CI/CD & PM2", category: "CLOUD", icon: '<i class="fa-solid fa-gears" style="color: #06b6d4;"></i>' },
        { name: "Linux Runtime", category: "CLOUD", icon: '<i class="devicon-linux-plain"></i>' },
      ],
      socialLinks: {
        github: "https://github.com/Prithiviraj69",
        linkedin: "https://linkedin.com/in/prithiviraj-elumalai",
        email: "prithvirajmudiliyar@gmail.com",
        whatsapp: "919033666173",
      },
      resumeUrl: "/docs/Prithiviraj_Elumalai_Resume.pdf",
    }

    if (existingProfile) {
      await Profile.findByIdAndUpdate(existingProfile._id, profileData)
    } else {
      await Profile.create(profileData)
    }

    // Projects
    await Project.deleteMany({})

    const projectsData = [
      {
        title: "Digital Labour Compliance & Regulatory Portal (New Labour Codes)",
        slug: "digital-labour-compliance-portal",
        category: "Government",
        coverImage: "/images/projects/labour-compliance.svg",
        technologies: ["Node.js", "Express.js", "MongoDB", "PKI Cryptography", "SBIePay", "Redis", "Cyber Treasury"],
        techStack: ["Node.js", "Express.js", "MongoDB", "PKI Cryptography", "SBIePay", "Redis", "Cyber Treasury"],
        description: "Enterprise e-Governance website built to simplify and digitize all factory registrations, licensing, and compliance matrices under the 4 New Labour Codes. Re-engineered dense manual paperwork into interactive multi-step online forms. Integrated SBIePay Payment Gateway & Cyber Treasury module with real-time transaction reconciliation. Implemented Hardware PKI DSC Signing Suite (Watchdata ProxKey) with secure public QR verification.",
        featured: true,
      },
      {
        title: "National Career Service (NCS - MoLE) Gateway",
        slug: "ncs-mole-gateway",
        category: "Government",
        coverImage: "/images/projects/ncs-gateway.svg",
        technologies: ["Node.js", "Express.js", "Redis", "HMAC-SHA256", "REST APIs", "SSO"],
        techStack: ["Node.js", "Express.js", "Redis", "HMAC-SHA256", "REST APIs", "SSO"],
        description: "A robust digital integration bridge linking local UT employment exchange systems with the central Government of India network. Designed secure Outgoing and Callback Partner Single Sign-On (SSO) architectures utilizing HMAC-SHA256 tokens for verified payload transfer. Automated continuous background data pipeline to push approved enterprise profiles into the central NCS database, and built a faceted Redis-cached job search filtering that slashed external API latency by 40%.",
        featured: true,
      },
      {
        title: "Department Main Portal (labourdnhdd.in)",
        slug: "department-main-portal",
        category: "Web Portal",
        coverImage: "/images/projects/labourdnhdd.svg",
        technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Tailwind CSS", "CMS"],
        techStack: ["Node.js", "Express.js", "MongoDB", "EJS", "Tailwind CSS", "CMS"],
        demoUrl: "https://labourdnhdd.in",
        description: "The central Single-Window Information and Resource website serving as the primary digital gateway for the entire department. Built core portal framework with a custom Content Management System (CMS) to seamlessly streamline public access to live announcements, gazettes, tenders, and statutory downloadable forms.",
        featured: true,
      },
      {
        title: "Local-First Collaborative Document Editor",
        slug: "collaborative-document-editor",
        category: "Next.js & AI",
        coverImage: "/images/projects/doc-editor.svg",
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Gemini AI", "SSE", "IndexedDB"],
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Gemini AI", "SSE", "IndexedDB"],
        githubUrl: "https://github.com/Prithiviraj69",
        description: "Built a Notion-style, offline-first editor writing instantly to IndexedDB with background data batching sync. Integrated a deterministic diff3Merge conflict resolution engine, fractional indexing, and context-aware Gemini AI side-chat autocomplete capabilities.",
        featured: true,
      },
      {
        title: "BOCW & Cess Management Portal",
        slug: "bocw-cess-management-portal",
        category: "Enterprise",
        coverImage: "/images/projects/bocw-cess.svg",
        technologies: ["Laravel 12", "PHP 8.3", "MySQL", "RBAC", "Encryption", "Tailwind CSS"],
        techStack: ["Laravel 12", "PHP 8.3", "MySQL", "RBAC", "Encryption", "Tailwind CSS"],
        description: "A localized cloud management platform customized to handle complex construction project tracking, cess tax assessments, and financial tallies. Designed a simplified 4-step online layout submission workflow managed via unified district dashboards secured by rigorous multi-tenant Role-Based Access Controls (RBAC) and client-side encryption.",
        featured: false,
      },
      {
        title: "BOCW Digital Labour Chowk (Mobile App Backend)",
        slug: "bocw-digital-labour-chowk",
        category: "Mobile Backend",
        coverImage: "/images/projects/labour-chowk.svg",
        technologies: ["Node.js", "MongoDB", "Firebase", "SMS OTP", "GPS Location Mapping", "Push Messaging"],
        techStack: ["Node.js", "MongoDB", "Firebase", "SMS OTP", "GPS Location Mapping", "Push Messaging"],
        description: "A location-based digital marketplace mobile application designed to connect daily-wage construction workers directly with local contractors. Engineered high-concurrency Node.js/MongoDB backend with built-in SMS OTP verification, real-time GPS/Firebase location mapping for instant discovery, and dynamic push messaging.",
        featured: false,
      },
      {
        title: "e-Shram Department Microsite",
        slug: "e-shram-microsite",
        category: "Web Portal",
        coverImage: "/images/projects/eshram.svg",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        description: "A dedicated informational and service-access platform built specifically to support unorganized workers and laborers. Developed user interface for localized scheme discovery and Common Service Centre (CSC) locators backed by a custom CMS framework for autonomous updates.",
        featured: false,
      },
    ]

    await Project.insertMany(projectsData)

    // Ensure default admin user exists
    const adminUser = await User.findOne({ role: "admin" })
    if (!adminUser) {
      await User.create({
        name: "Prithiviraj Elumalai",
        email: "prithvirajmudiliyar@gmail.com",
        password: "AdminPassword@123",
        role: "admin",
      })
      console.log("Default admin created: prithvirajmudiliyar@gmail.com / AdminPassword@123")
    }

    console.log("Resume data seeded successfully into database!")
  } catch (err) {
    console.error("Error seeding resume data:", err)
  }
}
