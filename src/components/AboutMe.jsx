import React, { useState, useEffect } from 'react';
import aq from '../assets/aq.jpeg';

// Mock assets for demo - replace with your actual imports
const react = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
const node = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
const express = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg";
const html = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
const css = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
const db = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg";
const python = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
const cpp = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg";
const c = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg";
const git = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";

// Mock VantaNet component - transparent background to show animation
function VantaNet({ children }) {
  return (
    <div className="relative">
      {/* Subtle overlay effects without blocking VantaNet */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      {children}
    </div>
  );
}

function AboutMe() {
  const [scrollY, setScrollY] = useState(0);
  const [sectionOffset, setSectionOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      const section = document.getElementById('about');
      if (section) {
        setSectionOffset(section.offsetTop);
      }
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate animation progress based on scroll position
  const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionOffset + 200) / 600));

  // Heading animation values
  let headerTranslateX, headerTranslateY, headerScale;
  const maxLeft = -300; // Maximum leftward movement to avoid overlap
  const maxDown = 160; // Maximum downward movement to avoid overlap
  if (isMobile) {
    headerTranslateX = 0;
    headerTranslateY = 0;
    headerScale = 1;
  } else {
    headerTranslateX = Math.max(scrollProgress * -500, maxLeft); // Clamp to maxLeft
    headerTranslateY = Math.min(scrollProgress * 270, maxDown); // Clamp to maxDown
    headerScale = 1 - scrollProgress * 0.01;
  }

  // Image animation values - image stays fixed
  const imageTranslateY = 0;
  const imageScale = 1;

  // Calculate when header should settle above image (around 60% scroll progress)
  const settleProgress = Math.max(0, Math.min(1, (scrollProgress - 0.6) / 0.4));

  let finalHeaderX, finalHeaderY;
  if (isMobile) {
    finalHeaderX = 0;
    finalHeaderY = 0;
  } else {
    finalHeaderX = Math.max(-500 + (settleProgress * 500), maxLeft); // Clamp to maxLeft
    finalHeaderY = Math.min(270 - (settleProgress * 80), maxDown); // Clamp to maxDown
  }

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-[#1a1026] via-[#2d0a3a] to-[#0a0613]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header - Improved parallax effect */}
        <div
          className="text-center mb-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] relative z-20"
          style={{
            transform: `translateX(${scrollProgress < 0.6 ? headerTranslateX : finalHeaderX}px) translateY(${scrollProgress < 0.6 ? headerTranslateY : finalHeaderY}px) scale(${headerScale})`,
            transformOrigin: 'center center',
            opacity: 1 - (scrollProgress * 0.05)
          }}
        >
          <h2
            className="text-5xl font-bold text-transparent bg-clip-text mb-4 relative"
            style={{ backgroundImage: "linear-gradient(90deg, #00c3ff 0%, #fff 60%, #ff6ec4 100%)" }}
          >
            About Me
          </h2>


        </div>

        {/* Profile & Skills */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image + Resume Button */}
          <div
            className="relative flex flex-col items-center transition-all duration-700 ease-out"
            style={{
              transform: `translateY(${imageTranslateY}px) scale(${imageScale})`,
              opacity: 0.85 + (scrollProgress * 0.15)
            }}
          >
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated border rings */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-500 rounded-full transform rotate-6 transition-all duration-500"
                style={{
                  transform: `rotate(${6 + scrollProgress * 8}deg)`,
                  filter: `blur(${scrollProgress * 1.5}px)`,
                }}
              ></div>
              <div
                className="absolute inset-1 bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 rounded-full transform -rotate-3 opacity-60 transition-all duration-500"
                style={{
                  transform: `rotate(${-3 - scrollProgress * 6}deg)`,
                  opacity: 0.6 + scrollProgress * 0.2
                }}
              ></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={aq}
                    alt="Ammar Qasmi"
                    className="w-full h-full object-cover rounded-full transition-all duration-300"
                    style={{
                      filter: `brightness(${1 + scrollProgress * 0.05}) contrast(${1 + scrollProgress * 0.05})`
                    }}
                  />
                </div>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-70"
                    style={{
                      left: `${20 + i * 60}%`,
                      top: `${10 + i * 15}%`,
                      transform: `translateY(${Math.sin(scrollProgress * Math.PI * 2 + i) * 8}px) scale(${0.6 + scrollProgress * 0.4})`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col gap-3 w-full max-w-xs">
              <a href="/ammar_qasmi_AI_resume.pdf" download="ammar_qasmi_AI_resume.pdf" className="w-full">
                <button
                  className="w-full bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 
                    hover:from-purple-600 hover:via-indigo-700 hover:to-blue-700 
                    text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 
                    transform hover:scale-105 shadow-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">Download AI Resume</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </a>

              <a href="/Ammar%20Qasmi.pdf" download="Ammar Qasmi.pdf" className="w-full">
                <button
                  className="w-full bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 
                    hover:from-purple-600 hover:via-indigo-700 hover:to-blue-700 
                    text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 
                    transform hover:scale-105 shadow-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">Download Fullstack Resume</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </a>
            </div>
          </div>

          {/* Description & Skills */}
          <div
            className="space-y-6 transition-all duration-700 ease-out"
            style={{
              transform: `translateY(${scrollProgress * 30}px)`,
              opacity: 0.8 + (scrollProgress * 0.2)
            }}
          >
            <h3
              className="text-3xl font-bold text-transparent bg-clip-text mb-4"
              style={{ backgroundImage: "linear-gradient(90deg, #00c3ff 0%, #fff 60%, #ff6ec4 100%)" }}
            >
              Full Stack Developer & Creative Problem Solver
            </h3>

            <p className="text-lg text-white/80 leading-relaxed">
              I'm a passionate Full Stack Developer with a love for creating beautiful, functional, and user-centered digital experiences.
              With expertise in modern web technologies, I bring ideas to life through clean code and innovative solutions.
            </p>

            <p className="text-lg text-white/80 leading-relaxed">
              My journey in web development started with curiosity and has evolved into a passion for building impactful applications
              that solve real-world problems. I believe in writing maintainable code and creating experiences that users love.
            </p>

            {/* Key Skills */}
            <div className="space-y-4">
              <h4
                className="text-xl font-semibold text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #00c3ff 0%, #fff 60%, #ff6ec4 100%)" }}
              >Key Skills</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { img: react, label: "React" },
                  { img: node, label: "Node.js" },
                  { img: express, label: "Express.js" },
                  { img: [html, css], label: "HTML, CSS, JavaScript" },
                  { img: db, label: "MongoDB, MySQL, Oracle" },
                  { img: python, label: "Python" },
                  { img: [c, cpp], label: "C, C++" },
                  { img: git, label: "Git" }
                ].map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 group"
                    style={{
                      background: 'transparent',
                      transform: `translateY(${scrollProgress * (i * 1.5)}px)`,
                      transitionDelay: `${i * 30}ms`
                    }}
                  >
                    {Array.isArray(skill.img)
                      ? skill.img.map((icon, j) =>
                        <img
                          key={j}
                          src={icon}
                          alt={skill.label}
                          className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      )
                      : <img
                        src={skill.img}
                        alt={skill.label}
                        className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    }
                    <span
                      className="font-medium text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(90deg, #00c3ff 0%, #fff 60%, #ff6ec4 100%)" }}
                    >
                      {skill.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <br />
      </div>
      <style jsx>{`
        @keyframes pulse-bar {
          0%, 100% { opacity: 0.7; filter: blur(0px); }
          50% { opacity: 1; filter: blur(2px); }
        }
        .animate-pulse-bar {
          animation: pulse-bar 2s infinite;
        }
      `}</style>
    </section>
  );
}

export default AboutMe;