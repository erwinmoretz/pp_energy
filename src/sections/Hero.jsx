import { motion } from 'framer-motion';
import { Phone, CalendarCheck, ShieldCheck, Star, Award } from 'lucide-react';
import { CONTACT } from '../data/content';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0F2338] via-[#1A3A5C] to-[#2A5280] overflow-hidden pt-20"
    >
      {/* Hintergrund-Muster */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#4CAF50] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#4CAF50] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Linke Spalte — Text & CTAs */}
          <div>
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
            >
              <Award className="w-4 h-4 text-[#4CAF50]" />
              DENA-zugelassene Energie-Effizienz-Experten
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Bis zu{' '}
              <span className="text-[#4CAF50]">70&nbsp;%</span>
              <br />
              Förderung für Ihr
              <br />
              Zuhause
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg"
            >
              Ihr unabhängiger Energieberater in Schorndorf & Umgebung. Wir holen das Maximum
              an KfW- und BAFA-Förderung für Sie heraus — von der Beratung bis zum Bescheid.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <a
                href="#kontakt"
                className="flex items-center justify-center gap-2 bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold px-7 py-4 rounded-xl text-base transition-colors shadow-lg shadow-green-900/30"
              >
                <CalendarCheck className="w-5 h-5" />
                Kostenlose Erstberatung
              </a>
              <a
                href={`tel:${CONTACT.telefon.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-4 rounded-xl text-base transition-colors backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" />
                {CONTACT.telefon}
              </a>
            </motion.div>

            {/* Trust-Signale */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="flex flex-wrap gap-6 text-white/70 text-sm"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />
                DENA zertifiziert
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#4CAF50]" />
                4,6 / 5 Sterne Bewertung
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#4CAF50]" />
                Mo–So 07–20 Uhr erreichbar
              </div>
            </motion.div>
          </div>

          {/* Rechte Spalte — Kennzahlen-Karten */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { wert: '70 %', label: 'max. Förderquote', farbe: '#4CAF50' },
              { wert: '60.000 €', label: 'max. förderfähige Kosten pro Wohneinheit', farbe: '#4CAF50' },
              { wert: '2', label: 'DENA-zertifizierte Experten', farbe: '#1A3A5C' },
              { wert: '4,6 ★', label: 'Kundenbewertung', farbe: '#1A3A5C' },
            ].map((kpi, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-6 text-white"
              >
                <div className="text-3xl font-bold mb-1" style={{ color: '#4CAF50' }}>
                  {kpi.wert}
                </div>
                <div className="text-white/70 text-sm leading-snug">{kpi.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll-Indikator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
