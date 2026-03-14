import { motion } from 'framer-motion';
import { ShieldCheck, MessageCircle, ArrowUpRight } from 'lucide-react';
import { TEAM } from '../data/content';
import thomasFoto from '../assets/thomas.avif';
import safiFoto from '../assets/safi.avif';

const FOTOS = { 'Thomas Pinneger': thomasFoto, 'Saphiro Moreno Praczka': safiFoto };

export default function UeberUns() {
  return (
    <section id="ueber-uns" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-[#4CAF50]/10 text-[#388E3C] font-semibold text-sm px-4 py-1.5 rounded-full mb-4"
          >
            Ihr Team
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A3A5C] mb-4"
          >
            Qualifiziert. Unabhängig. Persönlich.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#475569] text-lg max-w-2xl mx-auto"
          >
            P&P Energieberatung steht für echte Expertise — zwei Experten,
            die für Sie die maximale Förderung realisieren.
          </motion.p>
        </div>

        {/* Team List - Split Layout */}
        <div className="space-y-32">
          {TEAM.map((person, i) => (
            <div 
              key={person.name}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Foto Column */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full lg:w-1/2 aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] group"
              >
                <div className="absolute inset-0 bg-[#1A3A5C] rounded-3xl translate-x-4 translate-y-4 -z-10 opacity-5 group-hover:opacity-10 transition-opacity" />
                <div className="relative h-full overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={FOTOS[person.name]}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Glass Overlay for Name/Role on Mobile/Large */}
                  <div className="absolute bottom-6 left-6 right-6 glass-dark p-6 rounded-2xl border-white/10 block lg:hidden">
                    <p className="text-[#4CAF50] font-bold text-xs uppercase tracking-widest mb-1">{person.titel}</p>
                    <h3 className="text-xl font-bold text-white">{person.name}</h3>
                  </div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2"
              >
                <div className="hidden lg:block mb-6">
                  <span className="text-[#4CAF50] font-bold text-sm uppercase tracking-widest">{person.titel}</span>
                  <h3 className="text-4xl font-bold text-[#1A3A5C] mt-2 mb-1">{person.name}</h3>
                  <p className="text-[#64748B] text-lg font-medium">{person.rolle}</p>
                </div>

                <div className="relative mb-8 pt-8">
                  <span className="absolute top-0 left-0 text-6xl text-[#4CAF50]/10 font-serif leading-none select-none">“</span>
                  <p className="text-2xl font-medium text-[#1A3A5C] leading-tight italic relative z-10">
                    {person.quote}
                  </p>
                </div>

                <p className="text-[#475569] text-lg leading-relaxed mb-8">
                  {person.beschreibung}
                </p>

                {/* Qualifikationen als Badges */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {person.qualifikationen.map((q) => (
                    <div 
                      key={q} 
                      className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-sm font-semibold text-[#334155] transition-all badge-glow"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />
                      {q}
                    </div>
                  ))}
                </div>

                {/* Direct Connect */}
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={`https://wa.me/${person.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#0F2338] text-white font-bold px-6 py-4 rounded-xl transition-all hover:translate-y-[-2px] shadow-lg shadow-blue-900/10"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Direkt-Kontakt
                  </a>
                  <a 
                    href="#kontakt"
                    className="flex items-center gap-2 bg-white border border-slate-200 hover:border-[#1A3A5C] text-[#1A3A5C] font-bold px-6 py-4 rounded-xl transition-all hover:bg-slate-50"
                  >
                    Termin vereinbaren
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
