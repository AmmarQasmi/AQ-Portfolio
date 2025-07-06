import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Code, Zap, Star, ArrowUp } from 'lucide-react';
import headerBg from './assets/header.png';

function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      setShowScrollTop(window.scrollY > 400);

      // Hide header on scroll down, show on scroll up
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      lastScrollY.current = window.scrollY;
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (item.id === 'home') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (location.pathname !== '/') {
      navigate(item.to);
    } else {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Code className="w-4 h-4" />, to: '/' },
    { id: 'about', label: 'About', icon: <Star className="w-4 h-4" />, to: '/#about' },
    { id: 'projects', label: 'Projects', icon: <Zap className="w-4 h-4" />, to: '/#projects' },
    { id: 'contact', label: 'Contact', icon: <Code className="w-4 h-4" />, to: '/#contact' }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Dynamic background gradient that follows mouse */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent)`
        }}
      />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-white/5 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'backdrop-blur-sm shadow-lg' 
            : ''
        } ${hideHeader ? 'transform -translate-y-full opacity-0 pointer-events-none' : 'transform translate-y-0 opacity-100'}`}
        style={
          !isScrolled
            ? {
                backgroundImage: `url(${headerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'transparent',
              }
            : {
                backgroundColor: 'transparent',
              }
        }
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <h1 className="text-2xl lg:text-3xl font-black text-white transition-all duration-300 group-hover:scale-105">
                  <span className="text-white">Port</span>
                  <span className="text-purple-300">folio</span>
                </h1>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
              <div className="ml-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.to}
                  onClick={e => handleNavClick(e, item)}
                  className="group relative px-4 lg:px-6 py-2 lg:py-3 text-white/90 hover:text-white transition-all duration-300 flex items-center space-x-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="relative p-2 text-white focus:outline-none group"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
                  ) : (
                    <Menu className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-500 overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-purple-800/95 backdrop-blur-lg rounded-2xl mx-4 mb-4 border border-white/10 shadow-2xl">
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={item.to}
                    onClick={e => handleNavClick(e, item)}
                    className="group flex items-center space-x-3 px-4 py-3 text-white/90 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUp className="w-4 h-4 transform -rotate-45" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-16 lg:pt-20 min-h-screen">
        <Outlet />
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 lg:p-4 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-12 ${
          showScrollTop 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 lg:w-6 lg:h-6" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-white rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
      </button>

      {/* Footer */}
      <footer className="relative z-10 bg-purple-900/50 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/70 text-sm">
              © 2024 Ammar Qasmi Portfolio
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-white/70 hover:text-white transition-colors duration-300">
                Privacy
              </Link>
              <Link to="/terms" className="text-white/70 hover:text-white transition-colors duration-300">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .backdrop-blur-glass {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </div>
  );
}

export default Layout; 