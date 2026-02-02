import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  tech: string[];
}

const experienceData: ExperienceItem[] = [
  {
    company: "Badge 6",
    role: "Software Engineer Intern",
    period: "Jan 2026 - Present",
    location: "Boston, MA",
    description: [
      "Architecting workflow integration enabling police departments to use Badge 6 as primary accreditation management platform while maintaining gov. mandated platforms for state-mandated submission and approval workflows",
      "Designing system architecture where PDs, accrediting bodies, and assessors perform all accreditation work within Badge 6, with automated synchronization to gov. mandated platforms for compliance tracking and regulatory approval, similar to developing in an IDE but submitting to Canvas for grading"
    ],
    tech: ["Software Development"]
  },
  {
    company: "Xprime",
    role: "Software Engineer",
    period: "Aug 2023 - Jul 2024",
    location: "Jamnagar, India",
    description: [
      "Spearheaded SEO optimization by integrating schema markup, keyword-rich metadata, and accelerated mobile pages (AMP), boosting organic traffic by 20% and improving Google search rankings for 9 product pages",
      "Migrated legacy hosting to a serverless AWS stack using S3 for static assets, CloudFront for global CDN, and Lambda for backend APIs, reducing page load latency by 30% and cost by nearly 70%",
      "Integrated Google Analytics and Tag Manager to track user behavior metrics (click-through rates, session duration, conversion funnels), enabling data-driven UI/UX improvements that increased engagement by 65%",
      "Built a responsive portfolio showcase platform with Next.js (SSR/ISR), Express.js APIs, and role-based admin dashboards, ensuring seamless cross-device functionality and optimal performance during traffic spikes"
    ],
    tech: ["NextJS", "NodeJS", "ExpressJS", "TailwindCSS", "MaterialUI", "Redux", "AWS S3", "AWS CloudFront", "AWS Lambda", "Google Analytics", "Google Tag Manager", "SEO"]
  },
  {
    company: "Maqure Ventures Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "Aug 2022 - Dec 2022",
    location: "Ahmedabad, India",
    description: [
      "Architected a scalable marketplace enabling real-time bidding and anonymous transactions, processing 500+ daily bids with Node.js event-driven APIs and WebSocket integrations",
      "Deployed fault-tolerant backend services on EC2 instances, leveraged DynamoDB for high-velocity bid data storage, and automated email notifications via Sendgrid, reducing manual processing time by 25%",
      "Implemented JWT-based authentication with granular permissions (buyer, seller, admin), reducing unauthorized access incidents and ensuring robust data handling",
      "Structured relational databases (MySQL) for user profiles, transaction histories, and bids tracking, optimizing query response times through indexing and normalization"
    ],
    tech: ["ReactJS", "NodeJS", "TailwindCSS", "MaterialUI", "MySQL", "Redux", "AWS"]
  },
  {
    company: "Techno IT Hub",
    role: "Frontend Web Developer Intern",
    period: "Jan 2022 - June 2022",
    location: "Ahmedabad, India",
    description: [
      "Engineered a hiring platform for temporary workers with worker-to-builder matching algorithms and secure role-based access, integrating data validation and performance optimization",
      "Utilizing Bootstrap, HTML, CSS, and MySQL to create a responsive interface showcasing services with seamless integration of functionalities"
    ],
    tech: ["Python", "HTML", "CSS", "MySQL", "PHP", "Netlify"]
  },
  {
    company: "Inventrom Private Limited - Bolt IoT",
    role: "Web App Developer Intern",
    period: "Oct 2021 - Dec 2021",
    location: "Bengaluru, India",
    description: [
      "Designed and developed a single-page website for Inventrom, featuring a navigation bar, background image with text, About Us section, Awards section, contact form, and footer, with smooth internal linking and responsive design across devices",
      "Implemented dynamic content features and interactive form functionality for user inquiries, following web development best practices and maintaining consistent design patterns throughout the application"
    ],
    tech: ["HTML", "CSS", "JavaScript"]
  }
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Observe when section enters viewport
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsSectionInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Activate as soon as 10% of section is visible
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Observe timeline items for active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = timelineItemsRef.current.findIndex(item => item === entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    timelineItemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      timelineItemsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  // Handle scroll behavior to ensure experience items scroll independently
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isSectionInView || !rightPanelRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = rightPanelRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 1;

      // Prevent page scroll and scroll the experience items instead
      if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
        e.preventDefault();
        rightPanelRef.current.scrollTop += e.deltaY;
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (section) {
        section.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isSectionInView]);

  return (
    <section id="experience" ref={sectionRef} className="page-section bg-background relative overflow-hidden flex items-center">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>

      <div className="section-container relative w-full">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-20">
          <div className="md:sticky top-24 md:w-1/3 mb-10 md:mb-0">
            <h2 className="section-title">Work Experience</h2>
            <p className="text-muted-foreground mb-8">
              My professional journey includes roles where I've delivered impactful solutions across various domains.
            </p>

            <div className="hidden md:block">
              <div className="space-y-2 bg-muted/30 p-2 rounded-xl">
                {experienceData.map((exp, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      "text-left w-full px-4 py-3 rounded-lg transition-all duration-300",
                      activeIndex === idx
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted/80"
                    )}
                    onClick={() => {
                      setActiveIndex(idx);
                      const element = timelineItemsRef.current[idx];
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                  >
                    <div className="font-medium">{exp.company}</div>
                    <div className="text-sm opacity-90">{exp.role}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Moving dots decoration */}
            <div className="absolute w-32 h-32 rounded-full bg-primary/5 blur-3xl -left-16 top-10 animate-float"></div>
          </div>

          <div ref={rightPanelRef} className="md:w-2/3 max-h-[600px] overflow-y-auto no-scrollbar pr-4">
            <div className="relative pl-8 md:pl-12 border-l border-primary/30">
              {experienceData.map((experience, idx) => (
                <div
                  key={idx}
                  ref={el => timelineItemsRef.current[idx] = el}
                  className={cn(
                    "mb-16 relative transition-all duration-500",
                    activeIndex === idx ? "opacity-100" : "opacity-50"
                  )}
                >
                  <div className="timeline-dot">
                    <span className={cn(
                      "absolute inset-0 rounded-full",
                      activeIndex === idx ? "animate-ping bg-primary/50" : "bg-muted/50"
                    )}></span>
                    <Briefcase size={14} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  {idx !== experienceData.length - 1 && <div className="timeline-line"></div>}

                  <div className="ml-8 md:ml-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold gradient-text">{experience.company}</h3>
                      <span className="text-sm text-muted-foreground">{experience.period}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                      <span className="text-lg font-medium">{experience.role}</span>
                      <span className="hidden md:block text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{experience.location}</span>
                    </div>

                    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                      {experience.description.map((item, i) => (
                        <li key={i} className="text-sm md:text-base">{item}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {experience.tech.map((tech, i) => (
                        <span key={i} className="tech-pill">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
