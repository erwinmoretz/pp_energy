import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { BEWERTUNGEN } from '../data/content';

function Sterne({ anzahl }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < anzahl ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
        />
      ))}
    </div>
  );
}

export default function Referenzen() {
  return (
    <section id="referenzen" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#1A3A5C]/8 text-[#1A3A5C] font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Kundenstimmen
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3A5C] mb-4">
            Was unsere Kunden sagen
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sterne anzahl={5} />
            <span className="text-[#1A3A5C] font-bold text-lg">4,6 / 5</span>
            <span className="text-[#64748B] text-sm">auf energie-experten.org</span>
          </div>
        </motion.div>

        {/* Bewertungskarten */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {BEWERTUNGEN.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 relative"
            >
              <Quote className="w-8 h-8 text-[#E2E8F0] absolute top-4 right-4" />
              <Sterne anzahl={b.sterne} />
              <p className="text-[#334155] text-sm leading-relaxed mt-4 mb-6 italic">
                "{b.text}"
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="w-8 h-8 rounded-full bg-[#1A3A5C] flex items-center justify-center text-white text-xs font-bold">
                  {b.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A3A5C]">{b.name}</p>
                  <p className="text-xs text-[#94A3B8]">{b.datum}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fallstudie / Beispielprojekt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1A3A5C] to-[#2A5280] rounded-3xl p-8 sm:p-12 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-[#4CAF50]/20 text-[#4CAF50] font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
                Referenzprojekt
              </span>
              <h3 className="text-2xl font-bold mb-4">
                Einfamilienhaus Schorndorf — Baujahr 1978
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Familie aus Schorndorf wollte ihre Gasheizung durch eine Wärmepumpe ersetzen.
                Mit unserer Begleitung durch den iSFP-Prozess und die BAFA-Antragstellung
                erhielten sie die maximale Förderquote.
              </p>
              <a href="#kontakt" className="inline-flex items-center gap-2 bg-[#4CAF50] hover:bg-[#388E3C] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                Ähnliches Projekt anfragen
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { wert: '52 %', label: 'Förderquote erreicht' },
                { wert: '21.600 €', label: 'Förderung ausgezahlt' },
                { wert: '41.600 €', label: 'Eigenanteil nach Förderung' },
                { wert: '~1.400 €', label: 'Heizkostenersparnis / Jahr' },
              ].map((kpi, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-5 border border-white/10">
                  <div className="text-2xl font-bold text-[#4CAF50] mb-1">{kpi.wert}</div>
                  <div className="text-white/70 text-xs">{kpi.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
