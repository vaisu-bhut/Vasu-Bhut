import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import AnimatedCube from "./AnimatedCube";
import { Github, Mail, Linkedin } from "lucide-react";

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

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
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
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl parallax-element"
              data-speed="0.5"
            >
              A passionate full-stack developer with a master's degree in
              Information Systems from Northeastern University. Specializing in
              creating responsive web applications with modern technologies.
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
            className="md:w-2/5 flex justify-center parallax-element"
            data-speed="-0.8"
          >
            <img
              src="/public/assets/profile.png" // update path
              alt="Profile picture"
              className="w-52 h-52 md:w-72 md:h-72 object-contain levitate"
            />
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
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
