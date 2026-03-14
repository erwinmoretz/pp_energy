import { motion } from 'framer-motion';
import {
  FileText, Euro, Thermometer, Zap, Scan, Wind, Home, Settings,
} from 'lucide-react';
import { SERVICES } from '../data/content';

const ICONS = { FileText, Euro, Thermometer, Zap, Scan, Wind, Home, Settings };

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Leistungen() {
  return (
    <section id="leistungen" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#4CAF50]/10 text-[#388E3C] font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Unser Leistungsportfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3A5C] mb-4">
            Alles aus einer Hand
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            Von der ersten Beratung bis zum eingereichten Förderantrag — wir begleiten Sie
            durch den gesamten Sanierungsprozess.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-100 hover:border-[#4CAF50]/30 transition-all group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1A3A5C]/8 flex items-center justify-center mb-5 group-hover:bg-[#4CAF50]/10 transition-colors">
                  {Icon && <Icon className="w-6 h-6 text-[#1A3A5C] group-hover:text-[#4CAF50] transition-colors" />}
                </div>
                <span className="text-xs font-semibold text-[#4CAF50] uppercase tracking-wide">
                  {service.short}
                </span>
                <h3 className="text-base font-bold text-[#1A3A5C] mt-1 mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#0F2338] text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Alle Leistungen anfragen
          </a>
        </div>
      </div>
    </section>
  );
}
