import React, { useEffect, useRef, useState } from 'react';

interface CharacterCanvasProps {
  onLoadComplete?: () => void;
}

// Shortest-path circular angular lerp across the -π / π boundary
function lerpAngle(current: number, target: number, factor: number): number {
  let diff = target - current;
  // Always wrap diff to [-PI, PI] to strictly take the shortest circular arc
  while (diff < -Math.PI) diff += 2 * Math.PI;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  return current + diff * factor;
}

export const CharacterCanvas: React.FC<CharacterCanvasProps> = ({
  onLoadComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadedPercent, setLoadedPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Preloaded HTMLImageElement storage
  const framesRef = useRef<HTMLImageElement[]>([]);
  const centerFrameRef = useRef<HTMLImageElement | null>(null);

  // High-frequency animation state stored strictly in refs (ZERO React re-renders during motion)
  const pointerPosRef = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 640,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.36 : 290
  });
  const hasUserMovedRef = useRef<boolean>(false);

  // Continuous floating-point angle state
  const currentAngleRef = useRef<number>(0);
  const isInsideDeadzoneRef = useRef<boolean>(true);
  const lastDrawnFrameRef = useRef<HTMLImageElement | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Preload all 64 WebP frames + center.webp
  useEffect(() => {
    let active = true;
    const totalToLoad = 65; // 64 directional frames + 1 center frame
    let loadedCount = 0;
    const framesArray: HTMLImageElement[] = new Array(64);

    const checkComplete = () => {
      loadedCount++;
      if (active) {
        const percent = Math.min(100, Math.round((loadedCount / totalToLoad) * 100));
        setLoadedPercent(percent);
        if (loadedCount >= totalToLoad) {
          setIsLoaded(true);
          if (onLoadComplete) onLoadComplete();
        }
      }
    };

    // Preload center neutral frame
    const centerImg = new Image();
    centerImg.src = '/center.webp';
    centerImg.onload = () => {
      centerFrameRef.current = centerImg;
      checkComplete();
    };
    centerImg.onerror = () => {
      centerImg.src = '/Public/center.webp';
      centerImg.onload = () => {
        centerFrameRef.current = centerImg;
        checkComplete();
      };
    };

    // Preload 64 circular frames
    for (let i = 0; i < 64; i++) {
      const img = new Image();
      const filename = `frame_${i.toString().padStart(2, '0')}.webp`;
      img.src = `/frames/${filename}`;
      img.onload = () => {
        framesArray[i] = img;
        checkComplete();
      };
      img.onerror = () => {
        img.src = `/Public/frames/${filename}`;
        img.onload = () => {
          framesArray[i] = img;
          checkComplete();
        };
      };
    }

    framesRef.current = framesArray;

    return () => {
      active = false;
    };
  }, [onLoadComplete]);

  // Unified pointermove listener with passive event handling
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      pointerPosRef.current.x = e.clientX;
      pointerPosRef.current.y = e.clientY;
      hasUserMovedRef.current = true;
    };

    const handlePointerLeave = () => {
      // Return smoothly to center eye contact when pointer leaves viewport
      isInsideDeadzoneRef.current = true;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // 60 FPS Ultra-Smooth Canvas Render Loop
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    lastTimeRef.current = performance.now();

    const render = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetW = Math.round(width * dpr);
      const targetH = Math.round(height * dpr);

      // Only resize canvas backing store if window dimensions change
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Configure high-quality resampling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Exact object-fit: cover placement for 1280x720 video source
      const srcW = 1280;
      const srcH = 720;
      const scale = Math.max(width / srcW, height / srcH);
      const drawW = srcW * scale;
      const drawH = srcH * scale;

      const isMobile = width < 768;
      const drawX = isMobile 
        ? (width - drawW) / 2 
        : (width - drawW) / 2 + (width > 1200 ? width * 0.04 : 0);
      const drawY = (height - drawH) / 2;

      // Character's exact facial center: (631, 290.5) in 1280x720 source footage
      const faceCenterX = drawX + 631 * scale;
      const faceCenterY = drawY + 290.5 * scale;
      const screenDim = Math.min(width, height);

      // 2. Luxury cinematic deep-burgundy, dark wine, and charcoal radial gradient
      // Subtle highlight: #4A0714 behind character, Dark wine: #31060D, Charcoal: #171416, Near-black: #0D0B0D
      const bgGrad = ctx.createRadialGradient(
        faceCenterX,
        faceCenterY * 0.95,
        screenDim * 0.08,
        faceCenterX,
        faceCenterY,
        Math.max(width, height) * 0.88
      );
      bgGrad.addColorStop(0, '#4A0714');     // Deep burgundy subtle warm lighting
      bgGrad.addColorStop(0.38, '#31060D');  // Dark wine
      bgGrad.addColorStop(0.72, '#171416');  // Charcoal
      bgGrad.addColorStop(1.0, '#0D0B0D');   // Near-black edge vignette
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // On initial load before pointer movement, initialize position to face center
      if (!hasUserMovedRef.current) {
        pointerPosRef.current.x = faceCenterX;
        pointerPosRef.current.y = faceCenterY;
      }

      // 3. Compute vector from face center to pointer
      const dx = pointerPosRef.current.x - faceCenterX;
      const dy = pointerPosRef.current.y - faceCenterY;
      const dist = Math.hypot(dx, dy);

      // 4. Center Eye Contact (Deadzone): ~12% screen radius with hysteresis to prevent edge flicker
      const enterDeadzone = screenDim * 0.115;
      const exitDeadzone = screenDim * 0.135;

      if (isInsideDeadzoneRef.current) {
        if (dist > exitDeadzone) {
          isInsideDeadzoneRef.current = false;
        }
      } else {
        if (dist < enterDeadzone) {
          isInsideDeadzoneRef.current = true;
        }
      }

      // 5. Delta-time independent smoothing with responsive factor around 0.22 (~35ms convergence)
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;
      // Exponential smoothing: 1 - exp(-15 * dt) evaluates to ~0.22 at 60fps
      const factor = 1 - Math.exp(-15.0 * (dt > 0 ? dt : 0.0167));

      // Calculate continuous floating-point target angle
      const targetAngle = Math.atan2(dy, dx);

      // Smooth continuous floating-point angle via shortest circular path
      currentAngleRef.current = lerpAngle(currentAngleRef.current, targetAngle, factor);

      // Strictly normalize continuous angle to [-PI, PI]
      while (currentAngleRef.current < -Math.PI) currentAngleRef.current += 2 * Math.PI;
      while (currentAngleRef.current > Math.PI) currentAngleRef.current -= 2 * Math.PI;

      // 6. Map smoothed continuous angle [0, 2*PI) to 64 discrete frames (0..63)
      let normAngle = currentAngleRef.current;
      if (normAngle < 0) normAngle += 2 * Math.PI;

      const frameIndex = Math.round((normAngle / (2 * Math.PI)) * 64) % 64;

      let targetFrame: HTMLImageElement | null = null;
      if (isInsideDeadzoneRef.current) {
        // Direct eye contact when near face
        targetFrame = centerFrameRef.current;
      } else {
        // Crisp directional frame mapped from smoothed continuous angle
        targetFrame = framesRef.current[frameIndex] || centerFrameRef.current;
      }

      // 7. Draw EXACTLY ONE crisp frame at 100% opacity with sub-pixel rounding (Zero ghosting)
      const renderX = Math.round(drawX);
      const renderY = Math.round(drawY);
      const renderW = Math.round(drawW);
      const renderH = Math.round(drawH);

      if (targetFrame && targetFrame.complete && targetFrame.naturalWidth > 0) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(targetFrame, renderX, renderY, renderW, renderH);
        lastDrawnFrameRef.current = targetFrame;
      } else if (lastDrawnFrameRef.current) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(lastDrawnFrameRef.current, renderX, renderY, renderW, renderH);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0D0B0D] z-0 select-none">
      {/* 60 FPS Zero-Ghosting Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      />

      {/* Preload Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D0B0D] z-50 transition-opacity duration-700">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#C88B91]/25 border-t-[#F7E8D7] animate-spin" />
            <div className="flex flex-col items-center text-center">
              <span className="font-script text-4xl text-[#F7E8D7] tracking-wide">
                Eman Mazhar
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C88B91] mt-1.5 font-medium">
                Loading Experience &middot; {loadedPercent}%
              </span>
            </div>
            {/* Minimalist Progress Bar */}
            <div className="w-48 h-1 bg-[#171416] border border-[#C88B91]/20 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-gradient-to-r from-[#C88B91] to-[#F7E8D7] transition-all duration-150 ease-out"
                style={{ width: `${loadedPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
