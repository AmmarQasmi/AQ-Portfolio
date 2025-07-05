import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Code, Zap, ArrowRight } from 'lucide-react';

function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Car Bazaar",
      description: "Developed a responsive frontend (React, Tailwind CSS) and efficient backend (Node.js, Express, PostgreSQL) for vehicle trading and comparison. Engineered user authentication, admin panel, and automated email notifications.",
      tech: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/AmmarQasmi/CarBazaar",
      image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?w=500&h=300&fit=crop",
      category: "Full Stack"
    },
    {
      id: 2,
      title: "Tour Planner",
      description: "A travel platform offering real-time chatbot help and seamless client-agent coordination. Built with React, Express, Tailwind CSS, Python, and Redux. Key features: Email-verified user signup, Booking dashboards for clients and agents, Integrated messaging & dark mode support, Scalable backend with Nodemailer & protected routes.",
      tech: ["React", "Express", "Tailwind CSS", "Python", "Redux"],
      githubUrl: "https://github.com/AmmarQasmi/TourPlanner",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop",
      category: "Web App"
    },
    {
      id: 3,
      title: "AQ Cuisine",
      description: "A React + Tailwind CSS single-page application (SPA) built with React Router. Key highlights: Recipe search using Spoonacular API, Save and manage favorite recipes, User authentication with EmailJS-based signup confirmation, Responsive design with black-orange theme and fixed header/footer.",
      tech: ["React", "Tailwind CSS", "React Router", "EmailJS", "Spoonacular API"],
      githubUrl: "https://github.com/AmmarQasmi/AQCuisine",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop",
      category: "SPA"
    },
    {
      id: 4,
      title: "InfoHub",
      description: "A multi-functional, responsive site built with HTML, CSS, and JavaScript. Features include: Live currency conversion via CurrencyAPI, Length and unit converters with manual calculations, Interactive UI with DOM manipulation, navbar, and dropdowns, Five-page layout: Home, Length Converter, Currency Converter, Unit Converter, Contact.",
      tech: ["HTML", "CSS", "JavaScript", "CurrencyAPI"],
      githubUrl: "https://github.com/AmmarQasmi/InfoHub",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
      category: "Utility"
    },
    {
      id: 5,
      title: "Cab Management System",
      description: "Developed a simulation of a taxi dispatch system featuring user authentication, ride booking, and fare generation. Implemented Dijkstra's algorithm for efficient route planning using graph structures.",
      tech: ["C++", "OOP", "Data Structures", "Algorithms"],
      githubUrl: "https://github.com/AmmarQasmi/Cab_Management_System",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop",
      category: "Algorithm"
    },
    {
      id: 6,
      title: "Hospital Management System",
      description: "Developed a comprehensive hospital management system using C++ with features for patient registration, doctor management, appointment scheduling, and medical records tracking.",
      tech: ["C++", "OOP", "Data Structures", "File Handling"],
      githubUrl: "https://github.com/AmmarQasmi/Hospital_Management_System_OOP",
      image: "https://images.unsplash.com/photo-1519494080410-f9aa8f52f530?w=500&h=300&fit=crop",
      category: "Management"
    },
    {
      id: 7,
      title: "ScoreBoard Project",
      description: "Built a scoreboard system using C programming for tracking and displaying game scores, player statistics, and match results with real-time updates and data persistence.",
      tech: ["C", "Data Structures", "File I/O"],
      githubUrl: "https://github.com/AmmarQasmi/Cricket-Scoreboard-System",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&h=300&fit=crop",
      category: "Sports"
    },
    {
      id: 8,
      title: "Socket Programming",
      description: "Practiced creating and binding sockets in Python by developing a variety of client-server programs. Implemented features ranging from basic connection setup to dynamic data handling. Projects included a factorial and prime number checker, a calculator, a palindrome validator, and string reversal. Emphasized real-time interaction by processing user inputs from the client side and generating responses on the server side.",
      tech: ["Python", "Socket Programming"],
      githubUrl: "https://github.com/AmmarQasmi/Socket_Programming",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500&h=300&fit=crop",
      category: "Network"
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.dataset.projectId);
            setVisibleProjects((prev) => [...new Set([...prev, projectId])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectElements = document.querySelectorAll('[data-project-id]');
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-[#1a1026] via-[#2d0a3a] to-[#0a0613]" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
            <Code className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Portfolio</span>
          </div>
          
          <h2
            className="text-4xl font-bold text-transparent bg-clip-text mb-8"
            style={{ backgroundImage: "linear-gradient(90deg, #00c3ff 0%, #fff 60%, #ff6ec4 100%)" }}
          >
            My Projects
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web development, algorithms, and system design
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`group transform transition-all duration-500 ${
                visibleProjects.includes(project.id) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:bg-white/10 shadow-lg">
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-purple-900 bg-white">
                    {project.category}
                  </span>
                </div>

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable="false"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* GitHub Link */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                    >
                      <Github className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3
                    className="text-xl font-bold text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(90deg, #00c3ff 0%, #fff 60%, #ff6ec4 100%)" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-white/70 mb-4 text-sm leading-relaxed line-clamp-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs font-medium border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors font-medium"
                  >
                    <span>View Code</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/AmmarQasmi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-purple-900 font-bold rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

export default Projects;