import React from 'react';
import { Terminal, Palette, Sparkles } from 'lucide-react';

interface SpecialtyStripProps {
  onOpenWork?: () => void;
}

export const SpecialtyStrip: React.FC<SpecialtyStripProps> = ({ onOpenWork }) => {
  const specialties = [
    {
      title: 'IT Projects',
      tagline: 'Build \u00b7 Solve \u00b7 Innovate',
      icon: Terminal,
    },
    {
      title: 'Graphic Design',
      tagline: 'Design \u00b7 Create \u00b7 Inspire',
      icon: Palette,
    },
    {
      title: 'Calligraphy & Painting',
      tagline: 'Art \u00b7 Culture \u00b7 Expression',
      icon: Sparkles,
    },
  ];

  return (
    <div 
      className="fixed bottom-4 sm:bottom-6 left-6 sm:left-10 lg:left-14 z-30 hidden md:flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#171416]/60 backdrop-blur-xl border border-[#C88B91]/20 shadow-luxury pointer-events-auto"
      role="region"
      aria-label="Creative and Technical Disciplines"
    >
      {specialties.map((item, idx) => {
        const Icon = item.icon;
        return (
          <button
            key={idx}
            onClick={onOpenWork}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#31060D]/40 transition-all duration-300 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C88B91]"
          >
            <div className="p-1 rounded-lg bg-[#C88B91]/10 text-[#C88B91] group-hover:text-[#F7E8D7] group-hover:bg-[#C88B91]/20 transition-colors">
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold tracking-wider text-[#F7E8D7]/90 group-hover:text-white transition-colors">
                {item.title}
              </span>
              <span className="text-[9px] tracking-wider text-[#C88B91]/80 group-hover:text-[#C88B91] font-mono">
                {item.tagline}
              </span>
            </div>
            {idx < specialties.length - 1 && (
              <span className="ml-2 text-[#C88B91]/25 text-xs select-none" aria-hidden="true">&bull;</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
