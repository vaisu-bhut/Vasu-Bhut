
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

type ProjectCategory = 'All' | 'Data Science' | 'Data Engineering' | 'Software Development';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  details: string[];
  category: ProjectCategory | 'All';
  liveDemoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

const projectsData: Project[] = [
  {
    title: "Loan Approval Prediction",
    category: "Data Science",
    description: "A machine learning model for predicting loan approvals with high accuracy.",
    technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "NumPy"],
    details: [
      "Built a loan approval predictor using synthetic financial data, achieving ROC-AUC = 0.96037 (currently top on Kaggle leaderboard)",
      "Feature engineering techniques like debt-to-income ratio calculation and XGBoost tuned with RandomizedSearchCV",
      "Addressed synthetic data challenges by cross-validating with the original dataset, ensuring robustness against distribution shifts",
      "Deployed Scikit-learn pipelines for reproducible preprocessing"
    ],
    githubUrl: "https://github.com/bhut-vasu"
  },
  {
    title: "AI-Powered Web Scraper",
    category: "Data Engineering",
    description: "A web scraping API with FastAPI and Playwright that extracts structured content from any URL.",
    technologies: ["Python", "FastAPI", "Playwright", "BeautifulSoup", "WebSockets"],
    details: [
      "Developed a web scraping API with FastAPI and Playwright, extracting structured content from any public URL",
      "Support for recursive crawling and JavaScript rendering",
      "Implemented real-time data streaming via WebSockets",
      "Built a user-friendly frontend interface for non-technical users"
    ],
    githubUrl: "https://github.com/bhut-vasu"
  },
  {
    title: "Podcast Listening Analysis",
    category: "Data Engineering",
    description: "A scalable data pipeline for predicting podcast listening duration with advanced analytics.",
    technologies: ["Python", "Apache Spark", "Scikit-learn", "Apache Airflow", "Docker"],
    details: [
      "Built a scalable data pipeline using PySpark and Spark-XGBoost to predict podcast listening duration",
      "Advanced feature engineering including sentiment scores and ad density analysis",
      "Containerized workflow with Docker and orchestrated via Apache Airflow",
      "Enabled reproducible, one-command execution on local machines without cloud dependencies"
    ],
    githubUrl: "https://github.com/bhut-vasu"
  },
  {
    title: "AI-Powered Personalized Health Assistant",
    category: "Data Science",
    description: "An AI-driven health assistant that provides personalized fitness and nutrition recommendations.",
    technologies: ["Python", "OpenAI API", "LangChain", "LangGraph", "Streamlit"],
    details: [
      "Engineered an AI-driven health assistant using fine-tuned GPT-3.5-Turbo",
      "Utilized LangChain/LangGraph workflows for personalized recommendations",
      "Enhanced security with a custom PromptDefender class, achieving 91% success rate in blocking prompt injection attacks",
      "Designed an interactive user experience enabling profile management and real-time health guidance"
    ],
    githubUrl: "https://github.com/bhut-vasu"
  },
  {
    title: "ArcFit Fitness",
    category: "Software Development",
    description: "A responsive fitness website with BMI calculator and class scheduling",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Express", "Nodemailer"],
    details: [
      "Built a responsive SPA showcasing Hero banners, BMI calculator, trainer & testimonial carousels",
      "Added a lightweight Node/Express backend with Nodemailer for contact form submissions"
    ],
    liveDemoUrl: "https://arcfit.vasubhut.com",
    githubUrl: "https://github.com/bhut-vasu",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "UberOla – Car Rental Booking",
    category: "Software Development",
    description: "A full-stack MERN car rental booking platform",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    details: [
      "Full-stack MERN app for browsing vehicle models and booking rides",
      "Mobile-first UI with collapsible sidebar for desktop and bottom-bar for mobile"
    ],
    liveDemoUrl: "https://uberola.vasubhut.com",
    githubUrl: "https://github.com/bhut-vasu",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "OpenAI Article Summarizer",
    category: "Software Development",
    description: "Web app that summarizes articles using AI",
    technologies: ["React", "Redux Toolkit", "Tailwind CSS", "RapidAPI"],
    details: [
      "Uses RTK Query to hit RapidAPI's extractor endpoint for article summaries",
      "Features localStorage-based caching and instant copy-to-clipboard UX"
    ],
    liveDemoUrl: "https://summarizer.vasubhut.com",
    githubUrl: "https://github.com/bhut-vasu",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0aWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Texty – Text Converter & Analyzer",
    category: "Software Development",
    description: "Text utility app with real-time metrics and transformations",
    technologies: ["React 17", "JavaScript", "Bootstrap 5", "HTML5/CSS3"],
    details: [
      "One-click text transformations and live metrics calculation",
      "Lightweight React hooks-based UI with Bootstrap styling"
    ],
    liveDemoUrl: "https://texty.vasubhut.com",
    githubUrl: "https://github.com/bhut-vasu",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "JustYours E-Commerce Store",
    category: "Software Development",
    description: "E-commerce platform with category-based browsing",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "CSS"],
    details: [
      "Single-page React storefront with Express API and MongoDB Atlas",
      "Newsletter capture & automated email workflow with Nodemailer"
    ],
    liveDemoUrl: "https://justyours.vasubhut.com",
    githubUrl: "https://github.com/bhut-vasu",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "SnakeMania",
    category: "Software Development",
    description: "Browser-based Snake game with audio effects",
    technologies: ["HTML5", "CSS3", "JavaScript", "HTML5 Audio API"],
    details: [
      "CSS-Grid board with smooth animation using requestAnimationFrame",
      "Audio effects and localStorage for persistent high scores"
    ],
    liveDemoUrl: "https://snakemania.vasubhut.com",
    githubUrl: "https://github.com/bhut-vasu",
    imageUrl: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25ha2UlMjBnYW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "TheRichMindset Blog",
    category: "Software Development",
    description: "Responsive multi-page self-improvement blog",
    technologies: ["HTML5", "CSS3", "Bootstrap 5", "Tailwind CSS", "JavaScript"],
    details: [
      "Features carousel hero, animated navbar, and card-style article grid",
      "Styled with Bootstrap 5 components and Tailwind utility classes"
    ],
    liveDemoUrl: "https://mindset.vasubhut.com",
    githubUrl: "https://github.com/bhut-vasu",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  }
];

// Framer motion animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('All');
  const [showAll, setShowAll] = useState(false);
  
  // Filter projects based on active tab
  const filteredProjects = activeTab === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeTab);

  // Determine how many projects to show based on showAll state
  const projectsToShow = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  return (
    <section id="projects" className="page-section relative overflow-hidden bg-background/50">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
      
      <div className="section-container">
        <h2 className="section-title">Projects</h2>
        
        {/* Project tabs - updated design */}
        <div className="bg-muted/30 p-2 rounded-xl flex flex-wrap mb-8">
          {(['All', 'Data Science', 'Data Engineering', 'Software Development'] as ProjectCategory[]).map((category) => (
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
            project.category === "Software Development" ? (
              // Software Development Projects - Card Layout
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-muted/30 rounded-xl border border-border overflow-hidden card-hover"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Image Preview */}
                  <div className="relative h-48 md:h-full overflow-hidden">
                    <img 
                      src={project.imageUrl || "https://via.placeholder.com/300x200"} 
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
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      {project.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground mb-2">{detail}</p>
                      ))}
                    </div>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-pill">{tech}</span>
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
            ) : (
              // Data Science & Data Engineering Projects - Detailed Layout
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-muted/30 rounded-xl border border-border overflow-hidden p-6 card-hover"
              >
                <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold gradient-text mb-1">{project.title}</h3>
                      <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>
                    
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 md:mt-0 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center gap-2 self-start"
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  
                  <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3 mb-6"
                  >
                    {project.details.map((detail, idx) => (
                      <motion.li 
                        key={idx} 
                        variants={itemVariants}
                        className="flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                        <p className="text-muted-foreground">{detail}</p>
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, idx) => (
                      <motion.span 
                        key={idx} 
                        className="tech-pill"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
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
                {showAll ? 'View Less' : 'View More'}
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
                  className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"/>
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
