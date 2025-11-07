
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold gradient-text">
              Vasu Bhut
            </a>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Software Engineer | Cloud & DevOps | ML/AI & Automation
            </p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://github.com/vaisu-bhut" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-background hover:bg-primary/20 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/vasubhut" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-background hover:bg-primary/20 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="mailto:bhut.v@northeastern.edu" 
              className="flex items-center justify-center h-10 w-10 rounded-full bg-background hover:bg-primary/20 transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vasu Bhut. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <a 
              href="#home"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
