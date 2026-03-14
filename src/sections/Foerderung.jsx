import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import { FOERDERUNG_ITEMS } from '../data/content';

export default function Foerderung() {
  const gesamt = FOERDERUNG_ITEMS.reduce((sum, i) => sum + i.prozent, 0);

  return (
    <section id="foerderung" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 lg:hidden"
        >
          <span className="inline-block bg-[#1A3A5C]/8 text-[#1A3A5C] font-semibold text-sm px-4 py-1.5 rounded-full">
            KfW & BAFA Förderung 2025
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Linke Seite — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#1A3A5C]/8 text-[#1A3A5C] font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              KfW & BAFA Förderung 2025
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3A5C] mb-6">
              Maximale Förderung —
              <br />
              wir holen alles heraus
            </h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-8">
              Das aktuelle Fördersystem ist komplex — aber genau darin liegt unsere Stärke.
              Wir kombinieren alle verfügbaren Boni für Sie und maximieren Ihre Förderquote
              auf bis zu <strong className="text-[#1A3A5C]">70&nbsp;%</strong> der förderfähigen Kosten.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Bis zu 60.000 € förderfähige Kosten pro Wohneinheit (mit iSFP)',
                'Zusätzlich 50 % BAFA-Zuschuss auf die Beratungskosten selbst',
                'Wir stellen den Förderantrag — Sie lehnen sich zurück',
                'Vorabprüfung: Wir berechnen Ihre individuelle Förderquote kostenlos',
              ].map((punkt) => (
                <div key={punkt} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] mt-0.5 shrink-0" />
                  <span className="text-[#334155]">{punkt}</span>
                </div>
              ))}
            </div>

            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold px-7 py-4 rounded-xl transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              Meine Förderung berechnen
            </a>
          </motion.div>

          {/* Rechte Seite — Balkendiagramm */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100"
          >
            <div className="flex items-end justify-between mb-2">
              <span className="text-sm font-medium text-[#475569]">Förderquote aufgeteilt</span>
              <span className="text-4xl font-bold text-[#4CAF50]">{gesamt}&nbsp;%</span>
            </div>
            <p className="text-xs text-[#94A3B8] mb-8">maximale Gesamtförderung möglich</p>

            {/* Gestapelter Balken */}
            <div className="h-12 rounded-xl overflow-hidden flex mb-8">
              {FOERDERUNG_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
                  style={{
                    width: `${(item.prozent / gesamt) * 100}%`,
                    backgroundColor: item.farbe,
                    transformOrigin: 'left',
                  }}
                />
              ))}
            </div>

            {/* Legende */}
            <div className="space-y-4">
              {FOERDERUNG_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded mt-0.5 shrink-0"
                    style={{ backgroundColor: item.farbe }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#1A3A5C]">{item.label}</span>
                      <span className="text-sm font-bold text-[#1A3A5C]">{item.prozent}&nbsp;%</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">{item.beschreibung}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#94A3B8] mt-6 border-t border-slate-200 pt-4">
              * Maximale Kombinationsförderung für Heizungsaustausch nach BEG EM 2025.
              Individuelle Berechnung erforderlich.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
