import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Phone, Search, BarChart2, FileText, Send, HardHat, CheckCircle,
} from 'lucide-react';

const SCHRITTE = [
  {
    nr: '01',
    icon: Phone,
    titel: 'Kostenlose Erstberatung',
    beschreibung:
      'In einem unverbindlichen Gespräch analysieren wir Ihre Situation und zeigen auf, welche Förderprogramme für Sie in Frage kommen. Telefonisch, per Video oder direkt vor Ort.',
    farbe: '#1A3A5C',
  },
  {
    nr: '02',
    icon: Search,
    titel: 'Vor-Ort-Begehung',
    beschreibung:
      'Wir kommen zu Ihnen und nehmen Ihr Gebäude systematisch auf — Hülle, Haustechnik, Heizung. Thermografie und Blower-Door-Test decken versteckte Schwachstellen auf.',
    farbe: '#1E4570',
  },
  {
    nr: '03',
    icon: BarChart2,
    titel: 'Analyse & Berechnung',
    beschreibung:
      'Auf Basis der Aufnahme erstellen wir eine normgerechte Energiebilanz, Heizlastberechnung (DIN EN 12831) und Wärmebrückenanalyse. So wissen wir genau, wo der Hebel sitzt.',
    farbe: '#235284',
  },
  {
    nr: '04',
    icon: FileText,
    titel: 'Individueller Sanierungsfahrplan',
    beschreibung:
      'Ihr persönlicher iSFP zeigt alle sinnvollen Maßnahmen mit konkreten Kostenschätzungen, Einsparpotenzial und Reihenfolge-Empfehlung. Inklusive 5 % iSFP-Förderbonus auf jede Maßnahme.',
    farbe: '#286098',
  },
  {
    nr: '05',
    icon: Send,
    titel: 'Förderantrag stellen',
    beschreibung:
      'Wir übernehmen die vollständige Antragsstellung bei KfW und BAFA — lückenlos und fristgerecht. Sie müssen sich um nichts kümmern.',
    farbe: '#4CAF50',
  },
  {
    nr: '06',
    icon: HardHat,
    titel: 'Baubegleitung',
    beschreibung:
      'Als BAFA-anerkannte Energieeffizienz-Experten begleiten wir Ihre Sanierung vor Ort. Wir prüfen die fachgerechte Ausführung und stellen die Förderfähigkeit sicher.',
    farbe: '#3D9E44',
  },
  {
    nr: '07',
    icon: CheckCircle,
    titel: 'Verwendungsnachweis & Auszahlung',
    beschreibung:
      'Nach Abschluss der Maßnahmen erstellen wir den Verwendungsnachweis und begleiten Sie bis zur endgültigen Fördermittelauszahlung. Ihr Geld landet auf Ihrem Konto.',
    farbe: '#338E3A',
  },
];

function SchrittKarte({ schritt, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.3'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -60 : 60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const Icon = schritt.icon;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, scale }}
      className={`flex gap-6 items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
    >
      {/* Nummer + Icon */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: schritt.farbe }}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
        <span
          className="text-5xl font-black mt-2 leading-none"
          style={{ color: schritt.farbe + '20' }}
        >
          {schritt.nr}
        </span>
      </div>

      {/* Text */}
      <div className={`flex-1 pb-12 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
        <span
          className="text-xs font-bold uppercase tracking-widest mb-2 block"
          style={{ color: schritt.farbe }}
        >
          Schritt {schritt.nr}
        </span>
        <h3 className="text-xl font-bold text-[#1A3A5C] mb-3">{schritt.titel}</h3>
        <p className="text-[#475569] leading-relaxed max-w-md">{schritt.beschreibung}</p>
      </div>
    </motion.div>
  );
}

export default function Prozess() {
  return (
    <section id="prozess" className="py-24 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block bg-[#4CAF50]/10 text-[#388E3C] font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            So arbeiten wir
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3A5C] mb-4">
            Ihr Weg zur maximalen Förderung
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            Von der ersten Anfrage bis zur Auszahlung — 7 klar strukturierte Schritte,
            bei denen wir Sie vollständig begleiten.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertikale Linie */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#1A3A5C]/20 via-[#4CAF50]/40 to-[#388E3C]/20" />

          <div className="space-y-4">
            {SCHRITTE.map((schritt, i) => (
              <SchrittKarte key={schritt.nr} schritt={schritt} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold px-8 py-4 rounded-xl text-base transition-colors shadow-lg shadow-green-900/20"
          >
            <Phone className="w-5 h-5" />
            Jetzt Schritt 1 starten — kostenlos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
