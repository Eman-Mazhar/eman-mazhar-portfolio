import React, { useEffect, useState, useRef } from 'react';

export const MagneticCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  // High-frequency positions in refs to eliminate React re-render overhead
  const mousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const ringPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isHoveredRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable custom cursor if fine pointer and no reduced motion
    const checkCapabilities = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsEnabled(hasFinePointer && !prefersReduced);
    };

    checkCapabilities();
    const mediaFine = window.matchMedia('(pointer: fine)');
    const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    mediaFine.addEventListener('change', checkCapabilities);
    mediaMotion.addEventListener('change', checkCapabilities);

    let animationFrameId: number;

    const onPointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }

      // Check interactive elements without React state thrashing
      const target = e.target as HTMLElement | null;
      const hovered = !!(target && target.closest('button, a, input, textarea, [role="button"], .interactive-target'));
      
      if (hovered !== isHoveredRef.current) {
        isHoveredRef.current = hovered;
        const ring = ringRef.current;
        const dot = dotRef.current;
        if (ring && dot) {
          if (hovered) {
            ring.style.width = '52px';
            ring.style.height = '52px';
            ring.style.borderColor = 'rgba(200, 139, 145, 0.85)';
            ring.style.backgroundColor = 'rgba(200, 139, 145, 0.12)';
            ring.style.boxShadow = '0 0 20px rgba(200, 139, 145, 0.35)';
            dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(1.3)`;
          } else {
            ring.style.width = '36px';
            ring.style.height = '36px';
            ring.style.borderColor = 'rgba(200, 139, 145, 0.4)';
            ring.style.backgroundColor = 'transparent';
            ring.style.boxShadow = '0 0 10px rgba(200, 139, 145, 0.15)';
            dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(1)`;
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth 60 FPS luxury cursor render loop
    const render = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        // Dot follows cursor directly with zero lag
        const scale = isHoveredRef.current ? 1.3 : 1.0;
        dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;

        // Ring follows with responsive smooth spring lerp (0.22)
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      mediaFine.removeEventListener('change', checkCapabilities);
      mediaMotion.removeEventListener('change', checkCapabilities);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[60] opacity-0 transition-opacity duration-300 select-none"
      aria-hidden="true"
    >
      {/* Trailing Muted Rose-Gold Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[#C88B91]/40 will-change-transform transition-[width,height,border-color,background-color,box-shadow] duration-200 ease-out"
        style={{
          width: '36px',
          height: '36px',
          boxShadow: '0 0 10px rgba(200, 139, 145, 0.15)',
        }}
      />

      {/* Responsive Warm Ivory Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#F7E8D7] will-change-transform shadow-[0_0_8px_#F7E8D7,0_0_14px_rgba(200,139,145,0.6)] transition-transform duration-100 ease-out"
      />
    </div>
  );
};
