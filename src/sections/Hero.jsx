import { motion } from 'framer-motion';
import { Phone, CalendarCheck, Award } from 'lucide-react';
import { CONTACT } from '../data/content';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center mesh-gradient overflow-hidden pt-20"
    >
      {/* Mesh Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="mesh-ball w-[100%] h-[100%] bg-[#4CAF50] top-[-20%] left-[-20%] mix-blend-screen opacity-20" />
        <div className="mesh-ball w-[80%] h-[80%] bg-[#1A3A5C] bottom-[-10%] right-[-10%] mix-blend-overlay opacity-30 [animation-delay:-5s]" />
        <div className="mesh-ball w-[60%] h-[60%] bg-[#2A5280] top-[10%] right-[20%] mix-blend-lighten opacity-20 [animation-delay:-10s]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Text Content - Spans 7 columns on LG */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-8 backdrop-blur-xl"
            >
              <Award className="w-3.5 h-3.5 text-[#4CAF50]" />
              DENA-zertifizierte Experten
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8"
            >
              Maximale <span className="shimmer-text">70&nbsp;%</span> <br />
              Förderung für Ihre <br />
              Sanierung.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/70 leading-relaxed mb-10 max-w-xl"
            >
              Unabhängige Energieberatung in Schorndorf. Wir begleiten Sie 
              vom Sanierungsfahrplan bis zur fertigen Auszahlung – professionell, 
              technisch fundiert und verlässlich.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <a
                href="#kontakt"
                className="flex items-center justify-center gap-3 bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold px-8 py-5 rounded-2xl text-lg transition-all shadow-2xl shadow-green-900/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <CalendarCheck className="w-6 h-6" />
                Kostenlose Erstberatung
              </a>
              <a
                href={`tel:${CONTACT.telefon.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-5 rounded-2xl text-lg transition-all backdrop-blur-xl hover:border-white/20"
              >
                <Phone className="w-5 h-5 opacity-70" />
                {CONTACT.telefon}
              </a>
            </motion.div>
          </div>

          {/* Bento-Grid Metrics - Spans 5 columns on LG */}
          <div className="lg:col-span-5">
            <div className="bento-grid">
              {[
                { wert: '70 %', label: 'Förderquote', size: 'bento-item-tall', delay: 0.6 },
                { wert: '60T €', label: 'Max. Kosten', delay: 0.7 },
                { wert: 'Expert', label: 'Zertifizierung', delay: 0.8 },
                { wert: '4,6 ★', label: 'Bewertung', size: 'bento-item-wide', delay: 0.9 },
              ].map((kpi, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.8, delay: kpi.delay, ease: [0.16, 1, 0.3, 1] }}
                  className={`${kpi.size || ''} glass p-6 rounded-[2rem] flex flex-col justify-end group hover:bg-white/10 transition-all border-white/5 hover:border-white/20`}
                >
                  <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-105 transition-transform origin-left" style={{ color: '#4CAF50' }}>
                    {kpi.wert}
                  </div>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{kpi.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
