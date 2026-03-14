import { motion } from 'framer-motion';
import { GraduationCap, ShieldCheck, Clock } from 'lucide-react';
import { TEAM } from '../data/content';

export default function UeberUns() {
  return (
    <section id="ueber-uns" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#4CAF50]/10 text-[#388E3C] font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Ihr Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3A5C] mb-4">
            Qualifiziert. Unabhängig. Persönlich.
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            P&P Energieberatung steht für echte Expertise — zwei DENA-zugelassene Experten,
            die für Sie die besten Ergebnisse erzielen.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {TEAM.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              {/* Avatar Placeholder */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A3A5C] to-[#2A5280] flex items-center justify-center mb-6 text-white text-2xl font-bold">
                {person.name.split(' ').map((n) => n[0]).join('')}
              </div>

              <div className="mb-1">
                <span className="text-[#4CAF50] font-semibold text-sm">{person.titel}</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A3A5C] mb-1">{person.name}</h3>
              <p className="text-[#64748B] text-sm font-medium mb-4">{person.rolle}</p>
              <p className="text-[#475569] text-sm leading-relaxed mb-6">{person.beschreibung}</p>

              <div className="space-y-2">
                {person.qualifikationen.map((q) => (
                  <div key={q} className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#4CAF50] shrink-0" />
                    <span className="text-[#334155]">{q}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fakten-Leiste */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {[
            {
              icon: ShieldCheck,
              titel: 'DENA-zugelassen',
              text: 'Eingetragen in der offiziellen Expertenliste der Deutschen Energie-Agentur — Pflichtvoraussetzung für öffentliche Förderung.',
            },
            {
              icon: GraduationCap,
              titel: 'Ingenieurskompetenz',
              text: 'B.Sc. & M.Sc. — technisch fundierte Beratung statt Standardempfehlungen. Wir rechnen durch, was wirklich sinnvoll ist.',
            },
            {
              icon: Clock,
              titel: '7 Tage erreichbar',
              text: 'Mo bis So, 07:00–20:00 Uhr. Weil gute Beratung keine Bürozeiten kennt.',
            },
          ].map((item) => (
            <div
              key={item.titel}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1A3A5C]/8 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-[#1A3A5C]" />
              </div>
              <h4 className="font-bold text-[#1A3A5C] mb-2">{item.titel}</h4>
              <p className="text-sm text-[#475569] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
