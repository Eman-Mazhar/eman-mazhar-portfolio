import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

interface HeroTypographyProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({
  onOpenResume,
  onOpenContact,
}) => {
  return (
    <div className="fixed bottom-20 sm:bottom-24 lg:bottom-28 left-6 sm:left-10 lg:left-14 z-30 flex flex-col items-start max-w-sm sm:max-w-md pointer-events-none select-none">
      {/* 1. Availability Status Badge */}
      <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 mb-2.5 rounded-full bg-[#171416]/75 backdrop-blur-md border border-[#C88B91]/30 text-[10px] sm:text-[11px] font-medium tracking-wider text-[#F7E8D7] shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        AVAILABLE FOR PROJECTS
      </div>

      {/* 2. Small Introductory Label */}
      <p className="text-[#C88B91] text-xs sm:text-sm uppercase tracking-[0.28em] font-medium mb-1 drop-shadow-sm">
        Hi, I&apos;m
      </p>

      {/* 3. Prominent Name in Dancing Script */}
      <h1 className="font-script text-6xl sm:text-7xl lg:text-8xl text-[#F7E8D7] font-normal leading-tight tracking-normal -ml-1 mb-1 script-shadow select-none">
        Eman Mazhar
      </h1>

      {/* 4. Professional Title */}
      <h2 className="text-[#F7E8D7] text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 drop-shadow-sm">
        IT Engineer & Graphic Designer
      </h2>

      {/* 5. Short Introduction */}
      <p className="text-[#F7E8D7]/85 text-xs sm:text-sm leading-relaxed max-w-[320px] sm:max-w-[360px] font-normal drop-shadow-sm mb-6">
        Blending technology and creativity to build meaningful digital experiences.
      </p>

      {/* 6. Main Action Buttons */}
      <div className="pointer-events-auto flex items-center gap-3 w-full sm:w-auto">
        {/* Resume Button: Warm Ivory Filled Pill */}
        <button
          onClick={onOpenResume}
          aria-label="View Resume"
          className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#F7E8D7] text-[#0D0B0D] font-semibold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-[0_10px_25px_rgba(247,232,215,0.25)] hover:bg-white transition-all duration-300 hover:scale-[1.03] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88B91]"
        >
          <span>Resume</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* Let's Talk Button: Transparent Burgundy/Charcoal Button with Fine Border */}
        <button
          onClick={onOpenContact}
          aria-label="Open Contact"
          className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full glass-button-dark text-[#F7E8D7] font-medium text-xs sm:text-sm tracking-wide border border-[#C88B91]/35 hover:border-[#C88B91]/80 hover:bg-[#31060D]/60 shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88B91]"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#C88B91] group-hover:text-[#F7E8D7] transition-colors" />
          <span>Let&apos;s Talk</span>
        </button>
      </div>
    </div>
  );
};
