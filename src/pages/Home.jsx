import React, { useEffect } from 'react';
import VantaNet from '../components/VantaNet';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Delay to ensure DOM is ready
      }
    }
  }, []);

  return (
    <VantaNet>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </VantaNet>
  );
}

export default Home;