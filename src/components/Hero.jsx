import React from 'react';
import VantaNet from './VantaNet';

function Hero() {
  // Smooth scroll to section by id
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <VantaNet>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Semi-transparent overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-purple-200 mb-6 leading-tight drop-shadow-lg">
              Hi, I'm <span
                className="text-transparent bg-clip-text drop-shadow-lg"
                style={{ backgroundImage: "linear-gradient(90deg, #00c3ff 0%, #fff 60%, #ff6ec4 100%)" }}
              >Ammar Qasmi</span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-purple-200 mb-8 font-light drop-shadow-lg">
              Full Stack Developer & Creative Problem Solver
            </p>
            
            <p className="text-lg sm:text-xl text-purple-200 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              I build beautiful, functional, and user-centered digital experiences. 
              Passionate about clean code, innovative solutions, and creating impactful web applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="bg-gradient-to-br from-purple-300 via-purple-500 to-indigo-100 \
  hover:from-purple-300 hover:via-purple-700 hover:to-indigo-200 \
  text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 \
  transform hover:scale-105 shadow-lg"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <button
                className="bg-gradient-to-br from-purple-300 via-purple-500 to-indigo-100 \
  hover:from-purple-300 hover:via-purple-700 hover:to-indigo-200 \
  text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 \
  transform hover:scale-105 shadow-lg"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </div>
          </div>
          
        </div>
      </section>
    </VantaNet>
  );
}

export default Hero; 