import React, { useEffect, useRef } from 'react';
import { X, Download, FileText, Code2, Palette, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestContact?: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onRequestContact }) => {
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xl animate-fade-in select-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl glass-card p-6 sm:p-8 text-[#F7E8D7] shadow-modal border border-[#C88B91]/25 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#C88B91]/15">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C88B91]">
              <FileText className="w-3.5 h-3.5 text-[#C88B91]" />
              <span>Curriculum Vitae</span>
            </div>
            <h2 id="resume-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[#F7E8D7]">
              Eman Mazhar
            </h2>
            <p className="text-xs sm:text-sm text-[#C88B91] mt-0.5 font-medium tracking-wide">
              IT Engineer &amp; Graphic Designer
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Eman_Mazhar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume PDF"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7E8D7] text-[#0D0B0D] text-xs font-semibold hover:bg-white transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88B91]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </a>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close Resume modal"
              className="p-2 rounded-full bg-[#171416]/80 hover:bg-[#31060D] border border-[#C88B91]/30 text-[#F7E8D7] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88B91]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-sm text-[#F7E8D7]/90 leading-relaxed font-light">
          {/* Professional Summary */}
          <div className="p-4 rounded-2xl bg-[#0D0B0D]/50 border border-[#C88B91]/20">
            <h3 className="text-xs uppercase tracking-widest text-[#C88B91] font-semibold mb-2">
              Professional Summary
            </h3>
            <p className="text-xs text-[#F7E8D7]/85 leading-relaxed font-light">
              IT Engineer and Graphic Designer dedicated to blending technology and creativity to build meaningful digital experiences. Experienced in frontend development, responsive interfaces, digital illustration, and visual communication.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#C88B91] font-semibold mb-3 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-[#C88B91]" />
              <span>Technical &amp; Engineering Skills</span>
            </h3>
            <div className="p-4 rounded-2xl bg-[#0D0B0D]/50 border border-[#C88B91]/20 space-y-2">
              <div className="text-xs text-[#F7E8D7]/85 font-light leading-relaxed">
                <span className="font-semibold text-[#F7E8D7]">Frontend &amp; Web Development:</span> React, TypeScript, JavaScript, HTML5 Canvas, Tailwind CSS, Modern CSS3.
              </div>
              <div className="text-xs text-[#F7E8D7]/85 font-light leading-relaxed">
                <span className="font-semibold text-[#F7E8D7]">IT &amp; Systems:</span> Web architecture, responsive layout design, cross-browser compatibility, client performance optimization.
              </div>
            </div>
          </div>

          {/* Graphic Design Skills */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#C88B91] font-semibold mb-3 flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-[#C88B91]" />
              <span>Graphic Design &amp; Visual Arts</span>
            </h3>
            <div className="p-4 rounded-2xl bg-[#0D0B0D]/50 border border-[#C88B91]/20 space-y-2">
              <div className="text-xs text-[#F7E8D7]/85 font-light leading-relaxed">
                <span className="font-semibold text-[#F7E8D7]">Design Disciplines:</span> Visual identity &amp; branding, typography design, digital media, UI/UX concept layouts.
              </div>
              <div className="text-xs text-[#F7E8D7]/85 font-light leading-relaxed">
                <span className="font-semibold text-[#F7E8D7]">Fine Arts &amp; Cultural Expression:</span> Traditional Arabic &amp; English calligraphy, custom painting, aesthetic composition.
              </div>
            </div>
          </div>

          {/* Authoritative Document Notice */}
          <div className="p-4 rounded-2xl bg-[#31060D]/30 border border-[#C88B91]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#C88B91] shrink-0 mt-0.5" />
              <div className="text-xs text-[#F7E8D7]/80">
                <span className="font-semibold text-[#F7E8D7] block mb-0.5">Authoritative Resume Source</span>
                Official education records, detailed project histories, and verified credentials are maintained in the official resume document. Place your latest resume file at <code className="px-1.5 py-0.5 rounded bg-black/40 text-[#F7E8D7] font-mono text-[11px]">public/resume.pdf</code>.
              </div>
            </div>
            {onRequestContact && (
              <button
                onClick={onRequestContact}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#171416]/80 hover:bg-[#31060D] border border-[#C88B91]/35 text-[#F7E8D7] text-xs font-semibold transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88B91]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C88B91]" />
                <span>Contact</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
