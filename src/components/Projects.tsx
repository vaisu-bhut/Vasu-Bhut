import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

type ProjectCategory =
  | "Software Development"
  | "DS & ML"
  | "AI/LLM & Automation";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  details: string[];
  category: ProjectCategory | "Software Development";
  liveDemoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  playStoreUrl?: string;
}

const projectsData: Project[] = [
  {
  title: "PetPulse: AI-Powered Pet Guardian System",
  category: "Software Development",
  description: "Autonomous pet monitoring system using Gemini 3 Pro for behavioral analysis, Prometheus/Grafana for anomaly detection, and Rust/Axum backend deployed on GCP Kubernetes.",
  tech: ["Rust", "Axum", "Gemini 3 Pro", "Kubernetes", "PostgreSQL", "Prometheus", "Grafana", "Next.js"],
  liveLink: "https://www.petpulse.clestiq.com/",
  githubLink: "https://github.com/orgs/Clestiq-PetPulse/repositories",
  features: [
    "Marathon agent with 8+ hour autonomous monitoring",
    "Real-time anomaly detection comparing patterns to learned baselines",
    "Email/SMS alerts with AI-generated evidence summaries",
    "One-tap user-reviewed emergency responses"
  ]
},
  {
    title: "Clestiq Shield - AI Security Gateway Platform",
    category: "Software Development",
    description:
      "An enterprise security gateway that protects LLM applications from prompt injection, data leakage, and hallucinations—risks that direct SDK calls cannot prevent",
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Terraform",
      "GCP (GKE, CloudSQL, Secret Manager, VPC)",
      "Docker",
      "Kubernetes",
      "Redis",
      "PostgreSQL",
      "Datadog",
      "Gemini AI"
    ],
    details: [
      "Architected security gateway with 4 FastAPI microservices—Gateway (orchestration, rate limiting), Sentinel (input validation), Guardian (output validation), and Eagle-Eye (IAM)—processing LLM requests through a secure validation pipeline",
      "Engineered Sentinel service detecting 12+ threat patterns (SQL injection, XSS, jailbreaks) via regex and Gemini AI with PII redaction achieving 95%+ accuracy; Guardian performs hallucination detection and toxicity filtering with configurable per-tenant safety thresholds",
      "Deployed auto-scaling GKE cluster (2-8 nodes) via Terraform IaC with CloudSQL PostgreSQL 15 (HA, private IP), Redis rate limiter handling 1000+ req/min, VPC firewall rules, and Secret Manager for credential rotation",
      "Implemented Datadog APM with distributed tracing across services, custom DogStatsD metrics (threats_blocked, latency_p99, token_usage), and tiered alerting (P1 DDoS, P2 abnormal token usage, P3 exposed API keys) triggering PagerDuty and Slack notifications",
      "Built Next.js 15 dashboard with Eagle-Eye IAM service enabling multi-tenant API key management, real-time usage analytics with quota enforcement, and role-based access control for application and user management"
    ],
    liveDemoUrl: "https://www.shield.clestiq.com",
    githubUrl: "https://github.com/orgs/ClestiqShield/repositories",
    imageUrl: "/assets/Projects/ClestiqShield.png",
  },
  {
    title: "Splitlyr - Expense Sharing Platform",
    category: "Software Development",
    description:
      "A mobile-first expense splitting app that helps friends and groups track shared costs, automatically calculate who owes whom, and settle balances seamlessly",
    technologies: [
      "React Native",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Terraform",
      "GCP (Compute Engine, Load Balancer, VPC, Cloud DNS)",
      "Docker",
      "Kubernetes",
      "TypeScript"
    ],
    details: [
      "Built cross-platform mobile app (iOS/Android) enabling users to create expense groups, split bills with custom ratios, track settlements, and manage friend networks with real-time balance calculations",
      "Implemented offline-capable expense tracking with automatic sync, contact integration for easy friend addition, and intelligent expense splitting algorithms for equal, percentage-based, and custom splits",
      "Engineered auto-scaling GCP infrastructure using Terraform IaC with CPU-based instance groups (2-10 VMs), global HTTPS load balancer with managed SSL certificates, and VPC networking for high availability",
      "Developed production-ready REST API with JWT authentication, role-based access control, and MongoDB database architecture optimized for complex relationship queries and balance aggregations across multiple expenses"
    ],
    liveDemoUrl: "https://www.splitlyr.clestiq.com",
    githubUrl: "https://github.com/vaisu-bhut/CoinBreakr",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.clestiq.splitlyr.app",
    imageUrl: "/assets/Projects/Splitlyr.png",
  },
  {
    title: "DataAlchemist - AI-Powered Data Cleaning Platform",
    category: "AI/LLM & Automation",
    description:
      "An intelligent support platform that cleans messy datasets, discovers hidden relationships in data, and automatically resolves support tickets using AI-powered chat interface",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Neo4j",
      "Terraform",
      "GCP (Cloud Run, Vertex AI, Cloud Monitoring)",
      "Docker",
      "RAG Architecture",
      "LLM Integration"
    ],
    details: [
      "Created AI chat interface that analyzes uploaded datasets, automatically detects and fixes data quality issues (duplicates, missing values, inconsistencies), and suggests optimal data transformations",
      "Built relationship discovery engine using Neo4j graph database to map connections between data entities, visualize complex relationships, and uncover hidden patterns across datasets",
      "Implemented RAG-based support system that searches historical tickets and chat logs to find similar issues, generates contextual responses using LLM, and escalates to human agents when confidence is low",
      "Engineered hybrid cloud infrastructure on GCP with Terraform managing Cloud Run serverless deployment, Vertex AI embeddings for semantic search, and automated CI/CD pipeline for zero-downtime deployments"
    ],
    liveDemoUrl: "https://dataalchemist.clestiq.com",
    githubUrl: "https://github.com/vaisu-bhut/dataalchemist",
    imageUrl: "",
  },
  {
    title: "SnakeMania",
    category: "Software Development",
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
    title: "Loan Approval Prediction",
    category: "DS & ML",
    description:
      "A machine learning model for predicting loan approvals with high accuracy.",
    technologies: [
      "Python",
      "Scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy",
      "Feature Engineering",
      "Hyperparameter Tuning",
      "Cross-Validation",
    ],
    details: [
      "Built a loan approval predictor using synthetic financial data, achieving ROC-AUC = 0.96037 (currently top on Kaggle leaderboard)",
      "Feature engineering techniques like debt-to-income ratio calculation and XGBoost tuned with RandomizedSearchCV",
      "Addressed synthetic data challenges by cross-validating with the original dataset, ensuring robustness against distribution shifts",
      "Deployed Scikit-learn pipelines for reproducible preprocessing",
    ],
    githubUrl: "https://github.com/vaisu-bhut/Loan-Prediction",
  },
  {
    title: "AI-Powered Web Scraper",
    category: "DS & ML",
    description:
      "A web scraping API with FastAPI and Playwright that extracts structured content from any URL.",
    technologies: ["Python", "FastAPI", "WebSockets", "lxml"],
    details: [
      "Developed a web scraping API with FastAPI and Playwright, extracting structured content from any public URL",
      "Support for recursive crawling and JavaScript rendering",
      "Implemented real-time data streaming via WebSockets",
      "Built a user-friendly frontend interface for non-technical users",
    ],
    githubUrl: "https://github.com/vaisu-bhut/Project-Information",
  },
  {
    title: "Podcast Listening Analysis",
    category: "DS & ML",
    description:
      "A scalable data pipeline for predicting podcast listening duration with advanced analytics.",
    technologies: [
      "Python",
      "Apache Spark",
      "Scikit-learn",
      "XGBoost",
      "Apache Airflow",
      "Ploty",
      "Docker",
      "Parquet",
    ],
    details: [
      "Built a scalable data pipeline using PySpark and Spark-XGBoost to predict podcast listening duration",
      "Advanced feature engineering including sentiment scores and ad density analysis",
      "Containerized workflow with Docker and orchestrated via Apache Airflow",
      "Enabled reproducible, one-command execution on local machines without cloud dependencies",
    ],
    githubUrl: "https://github.com/vaisu-bhut/Podcast-Listening-Analysis",
  },
  {
    title: "AI-Powered Personalized Health Assistant",
    category: "AI/LLM & Automation",
    description:
      "An AI-driven health assistant that provides personalized fitness and nutrition recommendations.",
    technologies: [
      "Python",
      "OpenAI API",
      "LangChain",
      "LangGraph",
      "Streamlit",
      "Pandas",
      "NumPy",
    ],
    details: [
      "Engineered an AI-driven health assistant using fine-tuned GPT-3.5-Turbo",
      "Utilized LangChain/LangGraph workflows for personalized recommendations",
      "Enhanced security with a custom PromptDefender class, achieving 91% success rate in blocking prompt injection attacks",
      "Designed an interactive user experience enabling profile management and real-time health guidance",
    ],
    githubUrl: "https://github.com/vaisu-bhut/Health-Assistant",
    liveDemoUrl: "https://github.com/vaisu-bhut/Health-Assistant/blob/main/HealthAssistant_Code/Team5_Health_Assistant.ipynb",
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
  const [activeTab, setActiveTab] = useState<ProjectCategory>("Software Development");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter projects based on active tab
  const filteredProjects = projectsData.filter((project) => project.category === activeTab);

  // Determine how many projects to show based on screen size and showAll state
  const defaultProjectCount = isMobile ? 2 : 4;
  
  const projectsToShow = showAll
    ? filteredProjects
    : filteredProjects.slice(0, defaultProjectCount);

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
            "Software Development",
            "DS & ML",
            "AI/LLM & Automation",
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
              <div className={`grid grid-cols-1 ${project.imageUrl ? 'md:grid-cols-3' : ''} gap-4`}>
                {/* Image Preview - only show if imageUrl exists */}
                {project.imageUrl && (
                  <div className="relative h-auto md:h-full overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                )}

                {/* Project Info */}
                <div className={`p-6 ${project.imageUrl ? 'md:col-span-2' : ''}`}>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4 space-y-2">
                    {project.details.map((detail, i) => (
                      <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <p>{detail}</p>
                      </div>
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
                  <div className="flex flex-wrap gap-3 mt-4">
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
                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-600/10 hover:bg-green-600/20 text-green-600 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        Play Store
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
        {filteredProjects.length > defaultProjectCount && (
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
                  className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""
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
