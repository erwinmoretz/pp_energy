import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, CONTACT } from '../data/content';
import logo from '../assets/logo.avif';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 shadow-lg shadow-black/5 backdrop-blur-lg py-2' 
          : 'bg-white/40 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center">
            <img src={logo} alt="P&P Energieberatung" className="h-12 w-auto" />
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
