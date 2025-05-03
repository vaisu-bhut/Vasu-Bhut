
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
      { name: "Python", logo: "/public/assets/Tools/Programming/Python.svg" },
      { name: "JavaScript", logo: "/public/assets/Tools/Programming/Javascript.svg" },
      { name: "TypeScript", logo: "/public/assets/Tools/Programming/Typescript.svg" },
      { name: "Java", logo: "/public/assets/Tools/Programming/Java.svg" },
      { name: "C++", logo: "/public/assets/Tools/Programming/C++.svg" },
    ]
  },
  {
    name: "Frontend",
    skills: [
      { name: "ReactJS", logo: "/public/assets/Tools/Frontend/ReactJs.svg" },
      { name: "NextJS", logo: "/public/assets/Tools/Frontend/NextJs.svg" },
      { name: "HTML", logo: "/public/assets/Tools/Frontend/Html.svg" },
      { name: "CSS", logo: "/public/assets/Tools/Frontend/Css.svg" },
      { name: "SCSS", logo: "/public/assets/Tools/Frontend/Sass.svg" },
      { name: "Tailwind CSS", logo: "/public/assets/Tools/Frontend/Tailwind.svg" },
      { name: "Material UI", logo: "/public/assets/Tools/Frontend/MaterialUI.svg" },
      { name: "Shadcn UI", logo: "/public/assets/Tools/Frontend/shadcn.png" },
      { name: "Radix UI", logo: "/public/assets/Tools/Frontend/radix.png" },
      { name: "Bootstrap", logo: "/public/assets/Tools/Frontend/Bootstrap.svg" },
      { name: "Redux", logo: "/public/assets/Tools/Frontend/Redux.svg" }
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "NodeJS", logo: "/public/assets/Tools/Backend/Nodejs.svg" },
      { name: "ExpressJS", logo: "/public/assets/Tools/Backend/Expressjs.png" },
      { name: "FastAPI", logo: "/public/assets/Tools/Backend/FastAPI.svg" },
      { name: "REST API", logo: "/public/assets/Tools/Backend/RestAPI.svg" },
      { name: "WebSockets", logo: "/public/assets/Tools/Backend/Websockets.png" },
      { name: "Database Design", logo: "/public/assets/Tools/Backend/DatabaseDesign.svg" },
    ]
  },
  {
    name: "Database",
    skills: [
      { name: "MongoDB", logo: "/public/assets/Tools/Database/MongoDB.svg" },
      { name: "MySQL", logo: "/public/assets/Tools/Database/MySQL.svg" },
      { name: "PostgreSQL", logo: "/public/assets/Tools/Database/PostGreSQL.svg" },
      { name: "DynamoDB", logo: "/public/assets/Tools/Database/DynamoDB.svg" }
    ]
  },
  {
    name: "ML & Data",
    skills: [
      { name: "Scikit-learn", logo: "/public/assets/Tools/ML&Data/Scikit.svg" },
      { name: "Pandas", logo: "/public/assets/Tools/ML&Data/pandas.svg" },
      { name: "NumPy", logo: "/public/assets/Tools/ML&Data/numpy.svg" },
      { name: "XGBoost", logo: "/public/assets/Tools/ML&Data/XGBoost.png" },
      { name: "LightGBM", logo: "/public/assets/Tools/ML&Data/lightgbm.svg" },
      { name: "PyTorch", logo: "/public/assets/Tools/ML&Data/pytorch.svg" },
      { name: "Apache Spark", logo: "/public/assets/Tools/ML&Data/spark.svg" },
      { name: "Feature Engineering", logo: "/public/assets/Tools/ML&Data/feature.svg" },
      { name: "Fine Tuning", logo: "/public/assets/Tools/ML&Data/fine-tuning.png" },
      { name: "Prompt Engineering", logo: "/public/assets/Tools/ML&Data/prompt-engineering.svg" },
      { name: "Ploty", logo: "/public/assets/Tools/ML&Data/ploty.svg" },
      { name: "MatPlotlib", logo: "/public/assets/Tools/ML&Data/Matplotlib.svg" },
    ]
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Git/GitHub", logo: "/public/assets/Tools/Tools/git.svg" },
      { name: "Docker", logo: "/public/assets/Tools/Tools/docker.svg" },
      { name: "AWS S3", logo: "/public/assets/Tools/Tools/s3.svg" },
      { name: "AWS EC2", logo: "/public/assets/Tools/Tools/ec2.svg" },
      { name: "AWS CloudFront", logo: "/public/assets/Tools/Tools/cloudfront.svg" },
      { name: "AWS Route53", logo: "/public/assets/Tools/Tools/route53.svg" },
      { name: "Vercel", logo: "/public/assets/Tools/Tools/vercel.png" },
      { name: "Netlify", logo: "/public/assets/Tools/Tools/netlify.png" },
      { name: "Render", logo: "/public/assets/Tools/Tools/render.jpeg" },
      { name: "Apache Airflow", logo: "/public/assets/Tools/Tools/airflow.svg" }
    ]
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
              onClick={() => setActiveCategory(category.name)}
              className={cn(
                "py-2 px-4 rounded-lg transition-all duration-300 flex-1 min-w-[120px] sm:min-w-0 text-sm sm:text-base whitespace-nowrap",
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

        {/* Skills Grid with Logos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {skillCategories
              .find(category => category.name === activeCategory)?.skills
              .map((skill, index) => (
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
      </div>
    </section>
  );
};

export default Skills;
