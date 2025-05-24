
import { useEffect } from 'react';
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);
    
    // Add smooth scrolling to all anchor links
    const handleAnchorClick = function(e: Event) {
      e.preventDefault();
      const target = this.getAttribute('href');
      if (target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
          // Close mobile menu if open (by removing .open class from any element that has it)
          document.querySelectorAll('.mobile-menu.open').forEach(menu => {
            menu.classList.remove('open');
          });
          
          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    // Apply event listeners
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      // Clean up event listeners
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
