
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCubeProps {
  className?: string;
}

const AnimatedCube = ({ className }: AnimatedCubeProps) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    
    let animationX = 0;
    let animationY = 0;
    let requestId: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cube.getBoundingClientRect();
      const cubeX = rect.left + rect.width / 2;
      const cubeY = rect.top + rect.height / 2;
      
      // Calculate mouse position relative to center of cube
      const mouseX = e.clientX - cubeX;
      const mouseY = e.clientY - cubeY;
      
      // Normalize values and limit rotation
      const rotateY = mouseX / (rect.width / 2) * 25; // max 25 degrees
      const rotateX = -mouseY / (rect.height / 2) * 25; // max 25 degrees
      
      // Use requestAnimationFrame for smooth animation
      if (requestId) cancelAnimationFrame(requestId);
      
      requestId = requestAnimationFrame(() => {
        // Smooth transition between current animation values and target values
        animationX += (rotateX - animationX) * 0.1;
        animationY += (rotateY - animationY) * 0.1;
        
        cube.style.transform = `rotateX(${animationX}deg) rotateY(${animationY}deg)`;
      });
    };
    
    // Reset rotation when not hovering
    const handleMouseLeave = () => {
      const resetAnimation = () => {
        animationX *= 0.9;
        animationY *= 0.9;
        
        if (Math.abs(animationX) > 0.01 || Math.abs(animationY) > 0.01) {
          cube.style.transform = `rotateX(${animationX}deg) rotateY(${animationY}deg)`;
          requestId = requestAnimationFrame(resetAnimation);
        } else {
          cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
          requestId = null;
        }
      };
      
      if (requestId) cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(resetAnimation);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    cube.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cube.removeEventListener('mouseleave', handleMouseLeave);
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, []);
  
  return (
    <div className={cn("relative w-40 h-40 perspective-800", className)} ref={cubeRef}>
      <div className="w-full h-full transform-style-3d rotate-y-45 rotate-x-45 transition-transform duration-300">
        <div className="absolute w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm transform translate-z-20 flex items-center justify-center rounded-md">
          <span className="text-4xl gradient-text font-bold">V</span>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm transform translate-z-20 rotate-y-90 flex items-center justify-center rounded-md">
          <span className="text-4xl gradient-text font-bold">A</span>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm transform translate-z-20 rotate-y-180 flex items-center justify-center rounded-md">
          <span className="text-4xl gradient-text font-bold">S</span>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm transform translate-z-20 rotate-y-270 flex items-center justify-center rounded-md">
          <span className="text-4xl gradient-text font-bold">U</span>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm transform translate-z-20 rotate-x-90 flex items-center justify-center rounded-md">
          <span className="text-3xl gradient-text font-bold">DEV</span>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-tr from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm transform translate-z-20 rotate-x-270 flex items-center justify-center rounded-md">
          <span className="text-xl gradient-text font-bold">2025</span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCube;
