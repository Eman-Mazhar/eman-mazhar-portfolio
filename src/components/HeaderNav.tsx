import React from 'react';

interface HeaderNavProps {
  activeTab: string | null;
  onSelectTab: (tab: 'work' | 'about' | 'contact') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <header className="fixed top-5 sm:top-6 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
      <nav 
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-pill transition-all duration-300 hover:border-[#C88B91]/45"
      >
        <button
          onClick={() => onSelectTab('work')}
          aria-label="Open Work Portfolio"
          aria-pressed={activeTab === 'work'}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
            activeTab === 'work'
              ? 'bg-[#F7E8D7] text-[#0D0B0D] shadow-md'
              : 'text-[#F7E8D7]/80 hover:text-[#F7E8D7] hover:bg-[#C88B91]/15 hover:border-[#C88B91]/30'
          }`}
        >
          [WORK]
        </button>

        <span className="text-[#C88B91]/40 text-xs select-none" aria-hidden="true">&bull;</span>

        <button
          onClick={() => onSelectTab('about')}
          aria-label="Open About Information"
          aria-pressed={activeTab === 'about'}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
            activeTab === 'about'
              ? 'bg-[#F7E8D7] text-[#0D0B0D] shadow-md'
              : 'text-[#F7E8D7]/80 hover:text-[#F7E8D7] hover:bg-[#C88B91]/15 hover:border-[#C88B91]/30'
          }`}
        >
          [ABOUT]
        </button>

        <span className="text-[#C88B91]/40 text-xs select-none" aria-hidden="true">&bull;</span>

        <button
          onClick={() => onSelectTab('contact')}
          aria-label="Open Contact Information"
          aria-pressed={activeTab === 'contact'}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
            activeTab === 'contact'
              ? 'bg-[#F7E8D7] text-[#0D0B0D] shadow-md'
              : 'text-[#F7E8D7]/80 hover:text-[#F7E8D7] hover:bg-[#C88B91]/15 hover:border-[#C88B91]/30'
          }`}
        >
          [CONTACT]
        </button>
      </nav>
    </header>
  );
};
