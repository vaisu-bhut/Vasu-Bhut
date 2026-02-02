import { useEffect, useRef, useState } from "react";
import { Github, Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

type RoleType = "SDE" | "Cloud" | "LLM";

interface RoleContent {
  title: string;
  badge: string;
  lines: string[];
}

const roleContents: Record<RoleType, RoleContent> = {
  SDE: {
    title: "Software Development Engineer",
    badge: "Software Development Engineer",
    lines: [
      "🚀 Boston-based engineer building scalable apps with React Native, Next.js, and Node.js;",
      "📈 Boosted organic traffic by 20% through SEO optimization and responsive design;",
      "🔐 Architected secure RESTful APIs with JWT auth, RBAC, and rate limiting;",
    ],
  },
  Cloud: {
    title: "DevOps/Cloud Engineer",
    badge: "DevOps/Cloud Engineer",
    lines: [
      "☁️ Engineered auto-scaling multi-cloud infrastructure (GCP/AWS) using Terraform;",
      "⚡ Reduced latency by 30% and costs by 70% by migrating to AWS serverless;",
      "🔄 Built CI/CD pipelines for zero-downtime deployments and automated healing;",
      "🛡️ Designed production-grade VPCs with granular security and observability;",
    ],
  },
  LLM: {
    title: "LLM/ML Engineer",
    badge: "LLM/ML Engineer",
    lines: [
      "🤖 Architected RAG systems with Vertex AI, Neo4j, and LLM orchestration;",
      "🎯 Fine-tuned GPT-3.5 achieving 40% higher response quality;",
      "🧠 Developed agentic AI workflows with multi-step reasoning using LangGraph;",
      "🔬 Built scalable ML infrastructure for vector search and real-time inference;",
    ],
  },
};

// Custom LeetCode Icon
const LeetCodeIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    {/* Scaled and centered content to match Lucide's stroke weight visual */}
    <path
      d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
      transform="scale(0.7) translate(5, 5)"
    />
  </svg>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRole, setActiveRole] = useState<RoleType>("SDE");
  const roles: RoleType[] = ["SDE", "Cloud", "LLM"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      const elements = container.querySelectorAll(".parallax-element");
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.getAttribute("data-speed") || "0");
        const offsetX = x * speed;
        const offsetY = y * speed;
        element.style.transform = `translate3d(${offsetX * 30}px, ${offsetY * 30
          }px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Auto-rotate roles every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole((current) => {
        const currentIndex = roles.indexOf(current);
        const nextIndex = (currentIndex + 1) % roles.length;
        return roles[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.15),rgba(30,30,40,0)_60%)]"></div>

      <div className="absolute top-[-50%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"></div>
      <div className="absolute bottom-[-30%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-accent/5 to-primary/5 blur-3xl"></div>

      <div className="container mx-auto px-6 md:py-32 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-3/5 animate-fade-in">
            <div className="mb-3 flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`inline-block py-1 px-3 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer hover:scale-105 ${activeRole === role
                    ? "bg-primary/20 text-primary ring-2 ring-primary/50"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {roleContents[role].badge}
                </button>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-glow">Hi, I'm </span>
              <span className="gradient-text">Vasu Bhut</span>
            </h1>

            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xxl text-muted-foreground mb-8 parallax-element"
              data-speed="0.5"
            >
              {roleContents[activeRole].lines.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </motion.div>

            <div className="flex gap-4 items-center mb-8">
              <a
                href="https://github.com/vaisu-bhut"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-12 w-12 rounded-full bg-muted hover:bg-primary/20 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/vasubhut"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-12 w-12 rounded-full bg-muted hover:bg-primary/20 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:bhut.v@northeastern.edu"
                className="flex items-center justify-center h-12 w-12 rounded-full bg-muted hover:bg-primary/20 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://leetcode.com/u/vaisu-bhut/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-12 w-12 rounded-full bg-muted hover:bg-primary/20 transition-colors duration-300"
                aria-label="LeetCode"
              >
                <LeetCodeIcon size={20} />
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-md bg-transparent border border-primary text-primary font-medium transition-transform hover:scale-105 hover:bg-primary/10"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div
            className="relative md:w-2/5 hidden md:flex justify-center parallax-element"
            data-speed="-0.8"
          >
            {/* animated gradient blob */}
            <motion.div
              initial={{ scale: 0.9, rotate: 0 }}
              animate={{ scale: 1.05, rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <svg
                viewBox="0 0 200 200"
                className="w-72 h-72 md:w-96 md:h-96 blur-2xl opacity-70"
              >
                <defs>
                  <linearGradient
                    id="blobGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#7b3fe4" />
                    <stop offset="100%" stopColor="#ff67d2" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#blobGrad)"
                  d="M43.8,-64.2C54.6,-56,60,-43.5,65.1,-30.7C70.2,-17.9,74.9,-4.9,73.4,7.2C71.9,19.3,64.3,30.5,55.2,40.2C46.1,49.8,35.5,58,23.7,63.8C11.8,69.6,-1.2,73,-12.6,70.7C-24.1,68.4,-33.9,60.3,-44,51C-54,41.6,-64.3,31,-68.8,18.4C-73.4,5.8,-72.2,-9.9,-67,-25.4C-61.9,-40.9,-52.8,-56.1,-40.1,-64.2C-27.4,-72.3,-13.7,-73.3,0.6,-74.1C14.8,-74.9,29.6,-75.7,43.8,-64.2Z"
                  transform="translate(100 100)"
                />
              </svg>
            </motion.div>

            {/* profile image floats gently */}
            <img
              src="/assets/Profile.png" // adjust path if needed
              alt="Profile picture"
              className="relative z-10 w-52 h-52 md:w-72 md:h-72 object-cover rounded-2xl levitate"
            />
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce-slow"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
