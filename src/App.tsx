import React, { useState } from 'react';
import { CharacterCanvas } from './components/CharacterCanvas';
import { HeaderNav } from './components/HeaderNav';
import { HeroTypography } from './components/HeroTypography';
import { SpecialtyStrip } from './components/SpecialtyStrip';
import { MagneticCursor } from './components/MagneticCursor';
import { WorkModal } from './components/WorkModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'work' | 'about' | 'contact' | 'resume' | null>(null);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0D0B0D] text-[#F7E8D7] select-none">
      {/* 1. Character Canvas (Full Viewport, 60fps zero-ghosting renderer over luxury burgundy/charcoal gradient) */}
      <CharacterCanvas />

      {/* 2. Custom Magnetic Glowing Cursor (Tuned rose-gold trailing ring & warm ivory center) */}
      <MagneticCursor />

      {/* 3. Floating Frosted-Glass Navigation Pill */}
      <HeaderNav
        activeTab={activeModal === 'work' ? 'work' : activeModal === 'about' ? 'about' : activeModal === 'contact' ? 'contact' : null}
        onSelectTab={(tab) => setActiveModal(tab)}
      />

      {/* 4. Hero Typography (Bottom-Left: Badge, Intro, Name, Title, Bio, Action Buttons) */}
      <HeroTypography
        onOpenResume={() => setActiveModal('resume')}
        onOpenContact={() => setActiveModal('contact')}
      />

      {/* 5. Refined Bottom Specialty Strip (Three Creative & Technical Disciplines) */}
      <SpecialtyStrip onOpenWork={() => setActiveModal('work')} />

      {/* 6. Delicate Right-Side Visual Accent (Subtle, non-interfering) */}
      <aside 
        className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 pointer-events-none select-none opacity-60"
        aria-hidden="true"
      >
        <span className="w-px h-12 bg-gradient-to-b from-transparent via-[#C88B91]/50 to-transparent" />
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#C88B91] font-mono [writing-mode:vertical-lr] rotate-180">
          PORTFOLIO
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#C88B91]/40" />
      </aside>

      {/* 7. Modals for interactive exploration */}
      <WorkModal
        isOpen={activeModal === 'work'}
        onClose={() => setActiveModal(null)}
      />
      <AboutModal
        isOpen={activeModal === 'about'}
        onClose={() => setActiveModal(null)}
      />
      <ContactModal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
      />
      <ResumeModal
        isOpen={activeModal === 'resume'}
        onClose={() => setActiveModal(null)}
        onRequestContact={() => setActiveModal('contact')}
      />
    </main>
  );
};

export default App;
