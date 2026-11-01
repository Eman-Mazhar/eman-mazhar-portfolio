import React, { useEffect, useRef, useState } from 'react';
import { X, Mail, MessageSquare, Linkedin, Instagram, Github, ExternalLink, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
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

  const emailAddress = "numerousideasby.eman@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const contactChannels = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Professional network, career profile & recommendations',
      url: 'https://www.linkedin.com/in/eman-mazhar-20a1a8333?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: Linkedin,
      badge: 'Connect',
      isExternal: true,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Creative design portfolio, calligraphy & visual works (@numerousideasby_eman)',
      url: 'https://www.instagram.com/numerousideasby_eman?stkn=MWdhdnBzdG44d3B1dQ==',
      icon: Instagram,
      badge: 'Follow',
      isExternal: true,
    },
    {
      id: 'email',
      name: 'Direct Email',
      description: emailAddress,
      url: 'mailto:numerousideasby.eman@gmail.com',
      icon: Mail,
      badge: 'Write',
      isExternal: false,
    },
    {
      id: 'fiverr',
      name: 'Fiverr Services',
      description: 'Freelance graphic design, creative commissions & custom projects',
      url: 'https://www.fiverr.com/s/7jYZQ7y',
      icon: () => (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" fill="#1DBF73" />
          <path
            d="M8.2 16.5V9.8h1.8v1.1c.4-.8 1.2-1.3 2.1-1.3.4 0 .7.1.9.2v2c-.3-.1-.6-.2-1-.2-.9 0-1.6.6-1.8 1.6v3.3H8.2zm6.7 0v-4.8h-1.3V9.8h1.3V8.1c0-1.3.8-2.1 2.2-2.1.6 0 1.1.1 1.4.2v1.7c-.2-.1-.5-.1-.8-.1-.7 0-1 .4-1 1v1h1.7l-.3 1.9h-1.4v4.7h-1.8z"
            fill="#FFFFFF"
          />
        </svg>
      ),
      badge: 'Hire',
      isExternal: true,
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Engineering repositories, code samples & development work',
      url: 'https://github.com/Eman-Mazhar',
      icon: Github,
      badge: 'Profile',
      isExternal: true,
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xl animate-fade-in select-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card p-6 sm:p-8 text-[#F7E8D7] shadow-modal border border-[#C88B91]/25 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#C88B91]/15">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C88B91]">
              <MessageSquare className="w-3.5 h-3.5 text-[#C88B91]" />
              <span>Get In Touch</span>
            </div>
            <h2 id="contact-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[#F7E8D7]">
              Let&apos;s Connect
            </h2>
            <p className="text-xs sm:text-sm text-[#F7E8D7]/80 mt-1 font-light leading-relaxed">
              Available for IT engineering projects, graphic design commissions, collaborations, and professional opportunities.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close Contact modal"
            className="p-2 rounded-full bg-[#171416]/80 hover:bg-[#31060D] border border-[#C88B91]/30 text-[#F7E8D7] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88B91]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Verified Channels */}
        <div className="mt-6 space-y-3">
          {contactChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.id}
                href={channel.url}
                target={channel.isExternal ? "_blank" : undefined}
                rel={channel.isExternal ? "noopener noreferrer" : undefined}
                aria-label={`${channel.name}: ${channel.description}`}
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#0D0B0D]/50 hover:bg-[#31060D]/40 border border-[#C88B91]/20 hover:border-[#C88B91]/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88B91]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-xl bg-[#171416] border border-[#C88B91]/25 text-[#C88B91] group-hover:text-[#F7E8D7] group-hover:bg-[#C88B91]/15 group-hover:border-[#C88B91]/50 transition-all shrink-0">
                    <Icon />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#F7E8D7] group-hover:text-white transition-colors">
                        {channel.name}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#C88B91]/10 text-[#C88B91] border border-[#C88B91]/20">
                        {channel.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#F7E8D7]/70 group-hover:text-[#F7E8D7]/90 truncate mt-0.5 font-light">
                      {channel.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 ml-3 shrink-0">
                  {channel.id === 'email' ? (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title="Copy email address"
                      aria-label="Copy email address"
                      className="p-2 rounded-xl bg-[#171416] hover:bg-[#C88B91]/20 border border-[#C88B91]/30 text-[#C88B91] hover:text-[#F7E8D7] transition-all"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  ) : (
                    <div className="p-2 rounded-xl bg-[#171416] group-hover:bg-[#C88B91]/20 border border-[#C88B91]/30 text-[#C88B91] group-hover:text-[#F7E8D7] transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* Copy Feedback Toast Banner */}
        {copied && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-center gap-2 animate-fade-in font-medium">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Email address copied to clipboard: {emailAddress}</span>
          </div>
        )}

        {/* Bottom Assurance Note */}
        <div className="mt-6 pt-4 border-t border-[#C88B91]/15 text-center">
          <p className="text-[11px] text-[#C88B91]/80 font-light">
            Direct responses typically within 24 hours &bull; Open for commissions &amp; consulting
          </p>
        </div>
      </div>
    </div>
  );
};
