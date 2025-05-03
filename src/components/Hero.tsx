import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import AnimatedCube from "./AnimatedCube";
import { Github, Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        element.style.transform = `translate3d(${offsetX * 30}px, ${
          offsetY * 30
        }px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="md:w-3/5 animate-fade-in">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary animate-pulse-slow">
                Software Developer
              </span>
              <span
                className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary/10 text-secondary animate-pulse-slow"
                style={{ animationDelay: "1s" }}
              >
                Data Scientist
              </span>
              <span
                className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary animate-pulse-slow"
                style={{ animationDelay: "2s" }}
              >
                Data Engineer
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-glow">Hi, I'm </span>
              <span className="gradient-text">Vasu Bhut</span>
            </h1>

            <p
              className="text-lg md:text-xxl text-muted-foreground mb-8 max-w-xl parallax-element"
              data-speed="0.5"
            >
              <span className="block">
                Boston-based full-stack developer and Northeastern MSIS student;
              </span>
              <span className="block">
                Skilled in MERN, Python, cloud, and big-data tooling;
              </span>
              <span className="block">
                Builds secure, scalable products with rigorous CI/CD;
              </span>
              <span className="block">
                Recharges on the badminton court and in Clash Royale Arena;
              </span>
            </p>

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
            className="relative md:w-2/5 flex justify-center parallax-element"
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
              src="/assets/profile.png" // adjust path if needed
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
