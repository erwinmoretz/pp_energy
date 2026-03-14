import { Zap, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { NAV_LINKS, CONTACT } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-[#0F2338] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Marke */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#4CAF50] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-white font-bold text-lg">P&P Energieberatung</span>
                <span className="block text-white/50 text-xs">Pinneger & Praczka GbR</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              DENA-zugelassene Energie-Effizienz-Experten in Schorndorf.
              Wir maximieren Ihre Förderquote — von der Beratung bis zum Bescheid.
            </p>
            <div className="flex gap-3">
              <a
                href={`tel:${CONTACT.telefon.replace(/\s/g, '')}`}
                className="flex items-center gap-2 bg-white/10 hover:bg-[#4CAF50] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                Anrufen
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-[#4CAF50] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Kontakt
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#4CAF50]" />
                {CONTACT.adresse}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 shrink-0 text-[#4CAF50]" />
                <a href={`tel:${CONTACT.telefon.replace(/\s/g, '')}`} className="text-white/60 hover:text-white transition-colors">
                  {CONTACT.telefon}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 shrink-0 text-[#4CAF50]" />
                <a href={`mailto:${CONTACT.email}`} className="text-white/60 hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trennlinie + Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Pinneger & Praczka Energieberatung GbR. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="#impressum" className="hover:text-white transition-colors">Impressum</a>
            <a href="#datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
