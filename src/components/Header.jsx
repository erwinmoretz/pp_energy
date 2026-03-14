import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { NAV_LINKS, CONTACT } from '../data/content';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#1A3A5C] flex items-center justify-center group-hover:bg-[#4CAF50] transition-colors">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="block text-[#1A3A5C] font-bold text-lg">P&P</span>
              <span className="block text-[#475569] text-xs font-medium -mt-1">Energieberatung</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#334155] hover:text-[#1A3A5C] font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <a
            href={`tel:${CONTACT.telefon.replace(/\s/g, '')}`}
            className="hidden md:flex items-center gap-2 bg-[#4CAF50] hover:bg-[#388E3C] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            {CONTACT.telefon}
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#1A3A5C]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü öffnen"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-6 shadow-lg">
          <nav className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-[#334155] hover:text-[#1A3A5C] font-medium py-3 border-b border-slate-100 text-base"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={`tel:${CONTACT.telefon.replace(/\s/g, '')}`}
            className="mt-4 flex items-center justify-center gap-2 bg-[#4CAF50] text-white font-semibold px-5 py-3 rounded-lg text-base"
          >
            Jetzt anrufen: {CONTACT.telefon}
          </a>
        </div>
      )}
    </header>
  );
}
