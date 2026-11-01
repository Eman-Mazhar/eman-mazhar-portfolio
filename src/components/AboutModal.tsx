import React, { useEffect, useRef } from 'react';
import { X, Terminal, Palette, Sparkles, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    // Focus close button on open for accessibility
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xl animate-fade-in select-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl glass-card p-6 sm:p-8 text-[#F7E8D7] shadow-modal border border-[#C88B91]/25 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#C88B91]/15">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C88B91]">
              <Sparkles className="w-3.5 h-3.5 text-[#C88B91]" />
              <span>Background &amp; Creative Vision</span>
            </div>
            <h2 id="about-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[#F7E8D7]">
              About Eman Mazhar
            </h2>
            <p className="text-xs sm:text-sm text-[#C88B91] mt-0.5 font-medium tracking-wide">
              IT Engineer &amp; Graphic Designer
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close About modal"
            className="p-2 rounded-full bg-[#171416]/80 hover:bg-[#31060D] border border-[#C88B91]/30 text-[#F7E8D7] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88B91]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-sm text-[#F7E8D7]/90 leading-relaxed font-light">
          <p className="text-base font-normal text-[#F7E8D7] border-l-2 border-[#C88B91] pl-4 italic">
            &ldquo;Blending technology and creativity to build meaningful digital experiences.&rdquo;
          </p>

          <p>
            As an IT Engineer and Graphic Designer, I explore the intersection of technical structure and visual storytelling. My work combines analytical problem-solving with artistic intuition, creating experiences that are both functionally robust and visually refined.
          </p>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <div className="p-4 rounded-2xl bg-[#0D0B0D]/50 border border-[#C88B91]/20">
              <div className="flex items-center gap-2 font-semibold text-[#F7E8D7] mb-1.5 text-xs sm:text-sm">
                <Terminal className="w-4 h-4 text-[#C88B91]" />
                <span>IT Engineering</span>
              </div>
              <p className="text-xs text-[#F7E8D7]/75 leading-relaxed font-light">
                Building responsive web interfaces, modern frontend applications, and reliable technical solutions with precision and clean architecture.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0B0D]/50 border border-[#C88B91]/20">
              <div className="flex items-center gap-2 font-semibold text-[#F7E8D7] mb-1.5 text-xs sm:text-sm">
                <Palette className="w-4 h-4 text-[#C88B91]" />
                <span>Graphic Design</span>
              </div>
              <p className="text-xs text-[#F7E8D7]/75 leading-relaxed font-light">
                Developing visual identities, branding assets, custom digital illustrations, and typography-driven layouts that captivate and communicate.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0B0D]/50 border border-[#C88B91]/20">
              <div className="flex items-center gap-2 font-semibold text-[#F7E8D7] mb-1.5 text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-[#C88B91]" />
                <span>Calligraphy &amp; Art</span>
              </div>
              <p className="text-xs text-[#F7E8D7]/75 leading-relaxed font-light">
                Cultivating traditional art practices, calligraphy, and painting, bringing authentic organic balance and nuance to digital design.
              </p>
            </div>
          </div>

          {/* Core Philosophy Statement */}
          <div className="p-4 rounded-2xl bg-[#31060D]/30 border border-[#C88B91]/25 text-xs text-[#F7E8D7]/85 space-y-2">
            <div className="font-semibold text-[#F7E8D7] flex items-center gap-2 text-xs uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-[#C88B91]" />
              <span>Professional Approach</span>
            </div>
            <p className="leading-relaxed font-light">
              Every project is approached with thorough attention to user experience, aesthetic elegance, and technical dependability. Whether designing a visual identity or developing interactive software, the goal is always clarity, beauty, and purpose.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
