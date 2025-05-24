import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

type ProjectCategory =
  | "All"
  | "MERN Stack"
  | "Java Swing"
  | "Basic Web Development";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  details: string[];
  category: ProjectCategory | "All";
  liveDemoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

const projectsData: Project[] = [
  {
    title: "Conlieve - Network Management Companion",
    category: "MERN Stack",
    description:
      "A platform that optimizes, priorities and specializes Network",
    technologies: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS (S3, CloudFront, Lambda, API Gateway)",
    ],
    details: [
      "Deployed as a serverless Progressive Web App using AWS S3, and Lambda for high availability and global scalability",
      "Built dynamic dashboards with interactive charts to visualize relationship growth, communication frequency, and engagement trends",
      "Implemented secure, tag-based contact profiles with reminders and note-keeping features to streamline personal and professional networking",
      "Ensured fast, mobile-first  performance through optimized design, SSR caching strategies, and lazy-loaded components"
    ],
    liveDemoUrl: "https://connect.vasubhut.com",
    githubUrl: "https://github.com/vaisu-bhut/Project-Connect",
    imageUrl: "/assets/Projects/Conlieve.png",
  },
  {
    title: "Drug Development Lifecycle Management System (ReguPharm)",
    category: "Java Swing",
    description:
      "The Drug Development Lifecycle Management System serves as a centralized platform to streamline and manage the complex processes from discovery to approval",
    technologies: ["Java", "Swing", "SQLite", "NetBeans"],
    details: [
      "Architected a full-stack Java application to streamline FDA-compliant drug development workflows, enabling real-time collaboration across 8+ roles (Research Scientists, Clinical Researchers, FDA Officers) and reducing manual tracking errors",
      "Designed a role-based access control (RBAC) system using Java Swing for frontend dashboards and SQLite for secure data storage, ensuring compliance with regulatory standards (FDA, GLP)",
      "Implemented modular Java backend with dedicated classes for drug composition tracking, inspection records, and automated report generation, improving data retrieval speed by 25%",
      "Integrated real-time status updates via a centralized dashboard, allowing stakeholders to monitor drug approval stages (discovery, trials, inspections) and address bottlenecks proactively",
    ],
    liveDemoUrl: "",
    githubUrl: "",
    imageUrl: "/assets/Projects/ReguPharm.png",
  },
  {
    title: "ArcFit Fitness",
    category: "MERN Stack",
    description:
      "A responsive fitness website with BMI calculator and class scheduling",
    technologies: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Nodemailer",
    ],
    details: [
      "Built a responsive SPA showcasing Hero banners, BMI calculator, trainer & testimonial carousels",
      "Added a lightweight Node/Express backend with Nodemailer for contact form submissions",
    ],
    liveDemoUrl: "https://arcfit.vasubhut.com",
    githubUrl: "https://github.com/vaisu-bhut/ArcFit",
    imageUrl: "/assets/Projects/ArcFit.png",
  },
  {
    title: "UberOla – Car Rental Booking",
    category: "MERN Stack",
    description: "A full-stack MERN car rental booking platform",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    details: [
      "Full-stack MERN app for browsing vehicle models and booking rides",
      "Mobile-first UI with collapsible sidebar for desktop and bottom-bar for mobile",
    ],
    liveDemoUrl: "https://uberola.vasubhut.com",
    githubUrl: "https://github.com/vaisu-bhut/UberOla",
    imageUrl: "/assets/Projects/UberOla.png",
  },
  {
    title: "OpenAI Article Summarizer",
    category: "MERN Stack",
    description: "Web app that summarizes articles using AI",
    technologies: ["React", "Redux Toolkit", "Tailwind CSS", "RapidAPI"],
    details: [
      "Uses RTK Query to hit RapidAPI's extractor endpoint for article summaries",
      "Features localStorage-based caching and instant copy-to-clipboard UX",
    ],
    liveDemoUrl: "https://theai.vasubhut.com",
    githubUrl: "https://github.com/vaisu-bhut/Theai",
    imageUrl: "/assets/Projects/TheAI.png",
  },
  {
    title: "Texty – Text Converter & Analyzer",
    category: "Basic Web Development",
    description: "Text utility app with real-time metrics and transformations",
    technologies: ["React 17", "JavaScript", "Bootstrap 5", "HTML5/CSS3"],
    details: [
      "One-click text transformations and live metrics calculation",
      "Lightweight React hooks-based UI with Bootstrap styling",
    ],
    liveDemoUrl: "https://texty.vasubhut.com",
    githubUrl: "https://github.com/vaisu-bhut/Texty",
    imageUrl: "/assets/Projects/Texty.png",
  },
  {
    title: "JustYours E-Commerce Store",
    category: "MERN Stack",
    description: "E-commerce platform with category-based browsing",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "CSS"],
    details: [
      "Single-page React storefront with Express API and MongoDB Atlas",
      "Newsletter capture & automated email workflow with Nodemailer",
    ],
    liveDemoUrl: "https://justyours.vasubhut.com",
    githubUrl: "https://github.com/vaisu-bhut/JustYours",
    imageUrl: "/assets/Projects/JustYours.png",
  },
  {
    title: "SnakeMania",
    category: "Basic Web Development",
    description: "Browser-based Snake game with audio effects",
    technologies: ["HTML5", "CSS3", "JavaScript", "HTML5 Audio API"],
    details: [
      "CSS-Grid board with smooth animation using requestAnimationFrame",
      "Audio effects and localStorage for persistent high scores",
    ],
    liveDemoUrl: "https://snakemania.vasubhut.com",
    githubUrl: "https://github.com/vaisu-bhut/SnakeMania",
    imageUrl: "/assets/Projects/SnakeMania.png",
  },
  {
    title: "TheRichMindset Blog",
    category: "Basic Web Development",
    description: "Responsive multi-page self-improvement blog",
    technologies: [
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "Tailwind CSS",
      "JavaScript",
    ],
    details: [
      "Features carousel hero, animated navbar, and card-style article grid",
      "Styled with Bootstrap 5 components and Tailwind utility classes",
    ],
    liveDemoUrl: "https://therichmindset.vasubhut.com",
    githubUrl: "https://github.com/vaisu-bhut/TheRichMindset",
    imageUrl: "/assets/Projects/TheRichMindset.png",
  },
];

// Framer motion animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("All");
  const [showAll, setShowAll] = useState(false);

  // Filter projects based on active tab
  const filteredProjects =
    activeTab === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeTab);

  // Determine how many projects to show based on showAll state
  const projectsToShow = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  return (
    <section
      id="projects"
      className="page-section relative overflow-hidden bg-background/50"
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>

      <div className="section-container">
        <h2 className="section-title">Projects</h2>

        {/* Project tabs - updated design */}
        <div className="bg-muted/30 py-2 px-3 rounded-xl flex flex-wrap mb-8">
          {([
            "All",
            "MERN Stack",
            "Java Swing",
            "Basic Web Development",
          ] as ProjectCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveTab(category);
                setShowAll(false); // Reset showAll when changing tabs
              }}
              className={cn(
                "py-2 px-4 rounded-lg transition-all duration-300 flex-1 min-w-[120px] sm:min-w-0",
                activeTab === category
                  ? "bg-primary text-primary-foreground shadow-md font-medium"
                  : "bg-transparent text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project list with different layouts based on category */}
        <div className="space-y-12">
          {projectsToShow.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-muted/30 rounded-xl border border-border overflow-hidden card-hover"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Image Preview */}
                <div className="relative h-auto md:h-full overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 md:col-span-2">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    {project.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground mb-2">
                        {detail}
                      </p>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm font-medium transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More / View Less Button - animated */}
        {filteredProjects.length > 4 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-6 py-3 overflow-hidden rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {showAll ? "View Less" : "View More"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
