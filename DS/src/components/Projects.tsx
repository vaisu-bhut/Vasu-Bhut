import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

type ProjectCategory = "All" | "Data Science" | "Data Engineering";

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
    title: "Loan Approval Prediction",
    category: "Data Science",
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
    category: "Data Engineering",
    description:
      "A web scraping API with FastAPI and Playwright that extracts structured content from any URL.",
    technologies: ["Python", "FastAPI", "BeautifulSoup", "WebSockets", "lxml"],
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
    category: "Data Engineering",
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
    category: "Data Science",
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
            "Data Science",
            "Data Engineering",
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
              className="bg-muted/30 rounded-xl border border-border overflow-hidden p-6 card-hover"
            >
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold gradient-text mb-1">
                      {project.title}
                    </h3>
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

                <p className="text-muted-foreground mb-6">
                  {project.description}
                </p>

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
