import { useEffect, useRef } from 'react';

function VantaFog({ children }) {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Load Three.js and Vanta.js scripts dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        // Load Three.js first
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        // Then load Vanta.js
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js');
        
        // Initialize the fog effect
        if (window.VANTA && vantaRef.current) {
          vantaEffect.current = window.VANTA.FOG({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0x4e34cf,
            midtoneColor: 0x633225,
            lowlightColor: 0xd3c6e3
          });
        }
      } catch (error) {
        console.error('Error loading Vanta.js:', error);
      }
    };

    initVanta();

    // Cleanup function
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className="relative w-full h-full"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  );
}

export default VantaFog; 