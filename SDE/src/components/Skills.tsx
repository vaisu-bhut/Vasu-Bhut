
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    logo: string;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    skills: [
      { name: "Python", logo: "/assets/Tools/Programming/Python.svg" },
      { name: "JavaScript", logo: "/assets/Tools/Programming/Javascript.svg" },
      { name: "TypeScript", logo: "/assets/Tools/Programming/Typescript.svg" },
      { name: "SQL", logo: "/assets/Tools/Programming/SQL.svg" },
      { name: "C++", logo: "/assets/Tools/Programming/C++.svg" }
    ]
  },
  {
    name: "Frontend",
    skills: [
      { name: "ReactJS/React Native", logo: "/assets/Tools/Frontend/ReactJs.svg" },
      { name: "NextJS", logo: "/assets/Tools/Frontend/NextJs.svg" },
      { name: "HTML", logo: "/assets/Tools/Frontend/Html.svg" },
      { name: "CSS", logo: "/assets/Tools/Frontend/Css.svg" },
      { name: "SCSS", logo: "/assets/Tools/Frontend/Sass.svg" },
      { name: "Tailwind CSS", logo: "/assets/Tools/Frontend/Tailwind.svg" },
      { name: "Material UI", logo: "/assets/Tools/Frontend/MaterialUI.svg" },
      { name: "Shadcn UI", logo: "/assets/Tools/Frontend/shadcn.png" },
      { name: "Radix UI", logo: "/assets/Tools/Frontend/radix.png" },
      { name: "Bootstrap", logo: "/assets/Tools/Frontend/Bootstrap.svg" },
      { name: "Streamlit", logo: "/assets/Tools/Frontend/Streamlit.svg" }
    ]
  },
  {
    name: "Backend & Databases",
    skills: [
      { name: "NodeJS", logo: "/assets/Tools/Backend/Nodejs.svg" },
      { name: "ExpressJS", logo: "/assets/Tools/Backend/Expressjs.png" },
      { name: "FastAPI", logo: "/assets/Tools/Backend/FastAPI.svg" },
      { name: "REST API", logo: "/assets/Tools/Backend/RestAPI.svg" },
      { name: "WebSockets", logo: "/assets/Tools/Backend/Websockets.png" },
      { name: "Database Design", logo: "/assets/Tools/Backend/DatabaseDesign.svg" },
      { name: "MongoDB", logo: "/assets/Tools/Backend/MongoDB.svg" },
      { name: "MySQL", logo: "/assets/Tools/Backend/MySQL.svg" },
      { name: "PostgreSQL", logo: "/assets/Tools/Backend/PostGreSQL.svg" },
      { name: "Neo4J", logo: "/assets/Tools/Backend/Neo4J.svg" },
      { name: "ChromaDB", logo: "/assets/Tools/Backend/ChromaDB.svg" },
      { name: "QdrantDB", logo: "/assets/Tools/Backend/QdrantDB.svg" },
    ]
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "AWS VPC", logo: "/assets/Tools/Tools/VPC.svg" },
      { name: "AWS EC2", logo: "/assets/Tools/Tools/ec2.svg" },
      { name: "AWS IAM", logo: "/assets/Tools/Tools/Iam.svg" },
      { name: "AWS RDS", logo: "/assets/Tools/Tools/RDS.svg" },
      { name: "AWS S3", logo: "/assets/Tools/Tools/s3.svg" },
      { name: "AWS SNS", logo: "/assets/Tools/Tools/SNS.svg" },
      { name: "AWS SQS", logo: "/assets/Tools/Tools/SQS.svg" },
      { name: "AWS CloudFront", logo: "/assets/Tools/Tools/cloudfront.svg" },
      { name: "AWS Route53", logo: "/assets/Tools/Tools/route53.svg" },
      { name: "AWS API Gateway", logo: "/assets/Tools/Tools/APIGateway.svg" },
      { name: "AWS Lambda", logo: "/assets/Tools/Tools/Lambda.svg" },
      { name: "AWS Cloudwatch", logo: "/assets/Tools/Tools/Cloudwatch.svg" },
      { name: "Equivalent GCP Services", logo: "/assets/Tools/Tools/GCP.svg" },
      { name: "Docker", logo: "/assets/Tools/Tools/docker.svg" },
      // { name: "Kubernates", logo: "/assets/Tools/Tools/Kubernetes.svg" },
      { name: "CI/CD", logo: "/assets/Tools/Tools/CiCd.png" },
      { name: "GitHub Actions", logo: "/assets/Tools/Tools/Github.png" },
      { name: "Vercel", logo: "/assets/Tools/Tools/vercel.png" },
      { name: "Netlify", logo: "/assets/Tools/Tools/netlify.png" },
      { name: "Git/GitHub", logo: "/assets/Tools/Tools/git.svg" },
      { name: "Postman", logo: "/assets/Tools/Frontend/Postman.svg" },
      { name: "Jira", logo: "/assets/Tools/Frontend/Jira.svg" },
      { name: "Jest", logo: "/assets/Tools/Frontend/Jest.svg" },
    ]
  },
  {
    name: "DS & ML",
    skills: [
      { name: "Scikit-learn", logo: "/assets/Tools/ML&Data/Scikit.svg" },
      { name: "Pandas", logo: "/assets/Tools/ML&Data/pandas.svg" },
      { name: "NumPy", logo: "/assets/Tools/ML&Data/numpy.svg" },
      { name: "XGBoost", logo: "/assets/Tools/ML&Data/XGBoost.png" },
      { name: "LightGBM", logo: "/assets/Tools/ML&Data/lightgbm.svg" },
      { name: "PyTorch", logo: "/assets/Tools/ML&Data/pytorch.svg" },
      { name: "Feature Engineering", logo: "/assets/Tools/ML&Data/feature.svg" },
      { name: "Ploty", logo: "/assets/Tools/ML&Data/ploty.svg" },
      { name: "Data Modelling", logo: "/assets/Tools/ML&Data/DataModelling.png" },
    ]
  },
  {
    name: "AI/LLM & Automation",
    skills: [
      { name: "LangChain/Graph", logo: "/assets/Tools/AI_LLM/Langhain.svg" },
      { name: "Prompt Engineering", logo: "/assets/Tools/AI_LLM/PromptEngineering.png" },
      { name: "RAG", logo: "/assets/Tools/AI_LLM/RAG.png" },
      { name: "Vertex AI", logo: "/assets/Tools/AI_LLM/Vertex.webp" },
      { name: "ADK by Google", logo: "/assets/Tools/AI_LLM/ADK.webp" },
      { name: "n8n Workflows", logo: "/assets/Tools/AI_LLM/n8n.svg" },

    ]
  },
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

const tabVariants = {
  inactive: { 
    backgroundImage: 'linear-gradient(to right, transparent, transparent)',
    scale: 0.95,
    opacity: 0.7
  },
  active: { 
    backgroundImage: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))',
    scale: 1,
    opacity: 1
  },
  hover: {
    scale: 1.03,
    transition: { duration: 0.2 }
  }
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].name);
  const [showAll, setShowAll] = useState(false);

  const currentSkills = skillCategories.find(category => category.name === activeCategory)?.skills || [];
  // On mobile (< sm breakpoint), show 8 skills initially. On larger screens, show all
  const skillsToShow = showAll ? currentSkills : currentSkills;

  return (
    <section id="skills" className="page-section bg-background relative">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>

      <div className="section-container">
        <h2 className="section-title">Technical Skills</h2>

        {/* Category Tabs - Updated Design */}
        <div className="bg-muted/30 p-2 rounded-xl flex flex-wrap mb-8 overflow-x-auto no-scrollbar">
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => {
                setActiveCategory(category.name);
                setShowAll(false);
              }}
              className={cn(
                "py-2 px-4 rounded-lg transition-all duration-300 flex-1 min-w-[140px] sm:min-w-0 text-sm sm:text-base whitespace-nowrap",
                activeCategory === category.name 
                  ? "text-primary-foreground font-medium shadow-md"
                  : "text-muted-foreground hover:bg-muted/80"
              )}
              variants={tabVariants}
              initial="inactive"
              animate={activeCategory === category.name ? "active" : "inactive"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid with Logos - Mobile shows limited, Desktop shows all */}
        <AnimatePresence mode="wait">
          {/* Desktop view - show all skills */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {currentSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                className="bg-muted/50 rounded-lg border border-muted p-4 flex flex-col items-center justify-center h-32 text-center card-hover group"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <motion.img 
                    src={skill.logo} 
                    alt={skill.name}
                    className="h-12 w-12 mb-3"
                    animate={{ rotate: [0, 0, 10, -10, 0], scale: [1, 1.1, 1.1, 1, 1] }}
                    transition={{ 
                      duration: 2,
                      ease: "easeInOut",
                      times: [0, 0.2, 0.5, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    whileHover={{ scale: 1.2 }}
                  />
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">
                    {skill.name}
                  </div>
                  <div className="w-8 h-0.5 bg-primary/50 mx-auto mt-2 transform origin-left transition-transform group-hover:scale-x-150"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile view - show limited skills with expand */}
          <motion.div
            key={`${activeCategory}-mobile`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-4 sm:hidden"
          >
            {(showAll ? currentSkills : currentSkills.slice(0, 8)).map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                className="bg-muted/50 rounded-lg border border-muted p-4 flex flex-col items-center justify-center h-32 text-center card-hover group"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <motion.img 
                    src={skill.logo} 
                    alt={skill.name}
                    className="h-12 w-12 mb-3"
                    animate={{ rotate: [0, 0, 10, -10, 0], scale: [1, 1.1, 1.1, 1, 1] }}
                    transition={{ 
                      duration: 2,
                      ease: "easeInOut",
                      times: [0, 0.2, 0.5, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    whileHover={{ scale: 1.2 }}
                  />
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">
                    {skill.name}
                  </div>
                  <div className="w-8 h-0.5 bg-primary/50 mx-auto mt-2 transform origin-left transition-transform group-hover:scale-x-150"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More / View Less Button - Only on mobile when more than 8 skills */}
        {currentSkills.length > 8 && (
          <motion.div
            className="flex justify-center mt-8 sm:hidden"
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
                  className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
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

export default Skills;
