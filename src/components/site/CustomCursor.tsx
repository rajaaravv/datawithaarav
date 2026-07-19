import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop
    if (window.innerWidth < 768) return;

    const updatePosition = (e: MouseEvent) => {
      setIsVisible(true);
      // Smooth following with slight delay for natural movement
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '0px' : '8px',
          height: isHovering ? '0px' : '8px',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Outer cursor ring */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border border-white/50 transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Inner glow effect */}
      <div
        className="fixed pointer-events-none z-[9997] rounded-full bg-white/20 blur-sm transition-all duration-500 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '80px' : '50px',
          height: isHovering ? '80px' : '50px',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 0.8 : 0,
        }}
      />
    </>
  );
}