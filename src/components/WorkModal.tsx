import React, { useEffect, useRef } from 'react';
import { X, Sparkles, Terminal, Palette, Brush, ArrowUpRight } from 'lucide-react';

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkModal: React.FC<WorkModalProps> = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    
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

  const disciplines = [
    {
      title: "Interactive 360° Luxury Cover",
      category: "IT & Creative Technology",
      description: "Live zero-ghosting, 60 FPS cursor-tracking character animation built with sub-pixel canvas rendering, shortest-path angular interpolation, and custom Python OpenCV frame processing.",
      tags: ["React 19", "TypeScript", "HTML5 Canvas", "Python", "OpenCV", "Tailwind CSS"],
      icon: Terminal,
      active: true,
    },
    {
      title: "Graphic Design & Visual Identity",
      category: "Graphic Design",
      description: "Custom branding systems, typographic compositions, digital graphics, and promotional design tailored for modern digital and print media.",
      tags: ["Branding", "Visual Identity", "Typography", "Digital Media", "UI/UX Layouts"],
      icon: Palette,
      active: false,
    },
    {
      title: "Calligraphy & Cultural Art",
      category: "Fine Arts & Calligraphy",
      description: "Handcrafted traditional and contemporary Arabic and English calligraphy compositions, acrylic paintings, and bespoke artistic commissions.",
      tags: ["Arabic Calligraphy", "Fine Art", "Painting", "Cultural Heritage", "Bespoke Art"],
      icon: Brush,
      active: false,
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xl animate-fade-in select-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-modal-title"
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
              <span>Selected Portfolio</span>
            </div>
            <h2 id="work-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[#F7E8D7]">
              Featured Disciplines &amp; Works
            </h2>
            <p className="text-xs sm:text-sm text-[#F7E8D7]/80 mt-1 font-light leading-relaxed">
              Overview of technical engineering projects and creative design disciplines.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close Work modal"
            className="p-2 rounded-full bg-[#171416]/80 hover:bg-[#31060D] border border-[#C88B91]/30 text-[#F7E8D7] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88B91]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disciplines List */}
        <div className="mt-6 space-y-4">
          {disciplines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-[#0D0B0D]/50 hover:bg-[#31060D]/40 border border-[#C88B91]/20 hover:border-[#C88B91]/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-[#171416] border border-[#C88B91]/25 text-[#C88B91] group-hover:text-[#F7E8D7] group-hover:bg-[#C88B91]/15 transition-all shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C88B91]">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-[#F7E8D7] group-hover:text-white mt-0.5 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  {item.active && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 shrink-0">
                      Live
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#F7E8D7]/80 mt-2.5 leading-relaxed font-light pl-11">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3 pl-11">
                  {item.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-[#171416] text-[10px] font-medium text-[#F7E8D7]/85 border border-[#C88B91]/15"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase 2 Note */}
        <div className="mt-6 p-4 rounded-2xl bg-[#31060D]/30 border border-[#C88B91]/25 text-center">
          <p className="text-xs text-[#F7E8D7]/80 font-light leading-relaxed">
            Full project galleries, interactive case studies, and live links are scheduled for Phase 2 curation.
          </p>
        </div>
      </div>
    </div>
  );
};
