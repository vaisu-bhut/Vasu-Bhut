
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronDown, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: 'Hi! I\'m Vasu\'s AI assistant. Ask me about his skills and experience for different roles, and I\'ll tell you why he\'d be a great fit!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Responses based on different roles
  const roleResponses: Record<string, string> = {
    'data scientist': 
      `Based on Vasu's portfolio, he's an excellent fit for a Data Scientist role because:
      
      • He built a loan approval predictor with ROC-AUC = 0.96037 (top on Kaggle)
      • Has strong skills in Python, Scikit-learn, XGBoost, Pandas, and NumPy
      • His AI-Powered Health Assistant demonstrates knowledge of LLMs using LangChain
      • He created robust test/validation methodologies across multiple projects
      • He has experience with feature engineering techniques and model tuning`,
    
    'machine learning engineer': 
      `Vasu would be an excellent Machine Learning Engineer based on his portfolio:
      
      • Experience building and deploying ML models for real-world applications
      • Strong Python skills with ML frameworks (Scikit-learn, XGBoost)
      • Knowledge of ML pipelines and reproducible preprocessing
      • Experience with real-time data operations (WebSockets, streaming)
      • Containerization experience (Docker) for ML workflows`,
    
    'data engineer': 
      `Vasu is well-qualified as a Data Engineer based on:
      
      • Built a web scraping API with FastAPI and Playwright for structured data extraction
      • Created a scalable data pipeline using PySpark and Spark-XGBoost
      • Experience with Apache Airflow for workflow orchestration
      • Docker containerization knowledge for reproducible environments
      • Implemented real-time data streaming via WebSockets`,
    
    'web developer': 
      `Vasu's portfolio shows strong Web Development skills:
      
      • Built multiple responsive websites (ArcFit, JustYours E-Commerce, TheRichMindset)
      • Experience with modern React.js including hooks and state management
      • Strong JavaScript/HTML/CSS skills with Bootstrap and Tailwind CSS
      • Backend experience with Node.js/Express and MongoDB
      • Implemented features like authentication, form handling, and API integration`,
    
    'full stack developer': 
      `Vasu is a capable Full Stack Developer as shown by:
      
      • Created complete MERN stack applications (UberOla, JustYours)
      • Front-end expertise with React, JavaScript, Tailwind CSS, and Bootstrap
      • Back-end work with Node.js, Express, and MongoDB
      • Experience with responsive, mobile-first design
      • Implemented front-to-back features including authentication, API integration, and data management`,
    
    'software engineer': 
      `Vasu's portfolio demonstrates Software Engineering capabilities through:
      
      • Diverse project experience across web, data science, and tooling
      • Strong coding skills in multiple languages and frameworks
      • Experience with full software development lifecycle
      • Created modular, reusable components across projects
      • Implemented complex features like predictive models and data pipelines`
  };

  const defaultResponse = 
    `Based on Vasu's portfolio, he has a diverse skill set spanning data science, data engineering, and software development. 
    He's proficient in Python, JavaScript, React, and various ML frameworks. 
    
    For specific role compatibility, try asking about roles like:
    • Data Scientist
    • Machine Learning Engineer
    • Data Engineer
    • Web Developer
    • Full Stack Developer
    • Software Engineer`;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const userInput = inputValue.toLowerCase();
      
      let response = '';
      
      // Check for role-specific queries
      for (const [role, roleResponse] of Object.entries(roleResponses)) {
        if (userInput.includes(role)) {
          response = roleResponse;
          break;
        }
      }
      
      // If no specific role was found, provide a default response
      if (!response) {
        response = defaultResponse;
      }
      
      const aiMessage = { role: 'ai' as const, content: response };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-[90%] sm:w-[400px] h-[500px] bg-background rounded-lg shadow-xl z-50 overflow-hidden border border-border flex flex-col"
          >
            {/* Chat header */}
            <div className="bg-muted/30 p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <h3 className="font-medium">AI Career Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-primary/10 text-foreground rounded-br-none' 
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] p-3 rounded-lg bg-muted text-foreground rounded-bl-none">
                    <Loader2 size={18} className="animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Vasu's fit for a role..."
                className="flex-1 bg-muted/30 border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
            
            {/* Scroll down button (shows only when there are enough messages) */}
            <button
              onClick={scrollToBottom}
              className="absolute bottom-16 right-4 bg-background/80 backdrop-blur-sm border border-border rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-opacity opacity-70 hover:opacity-100"
            >
              <ChevronDown size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
