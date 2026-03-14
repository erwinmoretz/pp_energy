import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Calculator,
  BadgeEuro,
  Send,
  MessageCircle,
  Info,
} from 'lucide-react';
import {
  GEBAEUDE_TYPEN,
  BAUJAHR_BEREICHE,
  HEIZSYSTEME,
  HEIZUNG_ALTER,
  DAEMMUNG_OPTIONEN,
  LEISTUNGEN,
  ZEITRAHMEN_OPTIONEN,
  berechneKostenvoranschlag,
  formatEur,
} from '../data/konfiguratorLogik';
import { CONTACT } from '../data/content';

// ─── Hilfskomponenten ─────────────────────────────────────────────────────────

function Tile({ selected, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
        selected
          ? 'border-[#1A3A5C] bg-[#1A3A5C]/5 shadow-sm'
          : 'border-slate-200 hover:border-[#1A3A5C]/40 hover:bg-slate-50'
      } ${className}`}
    >
      {selected && (
        <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-[#4CAF50]" />
      )}
      {children}
    </button>
  );
}

function StepHeader({ titel, beschreibung }) {
  return (
    <div className="mb-7">
      <h3 className="text-xl font-bold text-[#1A3A5C] mb-1">{titel}</h3>
      <p className="text-sm text-[#64748B]">{beschreibung}</p>
    </div>
  );
}

function Gruppe({ label, children }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

const stepVariants = {
  initial: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  animate: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

// ─── Schritte ─────────────────────────────────────────────────────────────────

function SchrittGebaeude({ data, update }) {
  return (
    <>
      <StepHeader
        titel="Ihr Gebäude"
        beschreibung="Damit wir die richtigen Leistungen kalkulieren können, benötigen wir einige Eckdaten."
      />

      <Gruppe label="Gebäudetyp">
        <div className="grid grid-cols-2 gap-3">
          {GEBAEUDE_TYPEN.map((t) => (
            <Tile
              key={t.id}
              selected={data.gebaeudetyp === t.id}
              onClick={() => update('gebaeudetyp', t.id)}
            >
              <span className="block text-sm font-semibold text-[#1A3A5C]">{t.label}</span>
              <span className="text-xs text-[#64748B]">{t.beschreibung}</span>
            </Tile>
          ))}
        </div>
      </Gruppe>

      <Gruppe label="Baujahr">
        <div className="flex flex-wrap gap-2">
          {BAUJAHR_BEREICHE.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => update('baujahr', b.id)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                data.baujahr === b.id
                  ? 'border-[#1A3A5C] bg-[#1A3A5C] text-white'
                  : 'border-slate-200 text-[#475569] hover:border-[#1A3A5C]/50'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </Gruppe>

      <Gruppe label="Wohnfläche">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={40}
              max={500}
              step={10}
              value={data.flaeche}
              onChange={(e) => update('flaeche', Number(e.target.value))}
              className="flex-1 accent-[#1A3A5C]"
            />
            <div className="flex items-center gap-1.5 w-28 shrink-0">
              <input
                type="number"
                min={40}
                max={500}
                value={data.flaeche}
                onChange={(e) => update('flaeche', Math.min(500, Math.max(40, Number(e.target.value))))}
                className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-sm text-right focus:border-[#1A3A5C] outline-none"
              />
              <span className="text-sm text-[#64748B]">m²</span>
            </div>
          </div>
        </div>
      </Gruppe>

      <Gruppe label="Anzahl Wohneinheiten">
        <div className="flex gap-2">
          {[1, 2, 3, 4, '5+'].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update('einheiten', n === '5+' ? 5 : n)}
              className={`w-12 h-12 rounded-xl border text-sm font-semibold transition-all ${
                data.einheiten === (n === '5+' ? 5 : n)
                  ? 'border-[#1A3A5C] bg-[#1A3A5C] text-white'
                  : 'border-slate-200 text-[#475569] hover:border-[#1A3A5C]/50'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </Gruppe>
    </>
  );
}

function SchrittEnergie({ data, update, toggle }) {
  return (
    <>
      <StepHeader
        titel="Aktueller Energiezustand"
        beschreibung="Diese Angaben helfen uns, den Sanierungsbedarf einzuschätzen und Förderoptionen zu identifizieren."
      />

      <Gruppe label="Aktuelles Heizsystem">
        <div className="grid grid-cols-2 gap-2">
          {HEIZSYSTEME.map((h) => (
            <Tile
              key={h.id}
              selected={data.heizsystem === h.id}
              onClick={() => update('heizsystem', h.id)}
              className="py-3"
            >
              <span className="text-sm font-semibold text-[#1A3A5C]">{h.label}</span>
            </Tile>
          ))}
        </div>
      </Gruppe>

      <Gruppe label="Alter der Heizungsanlage">
        <div className="flex flex-wrap gap-2">
          {HEIZUNG_ALTER.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => update('heizalter', a.id)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                data.heizalter === a.id
                  ? 'border-[#1A3A5C] bg-[#1A3A5C] text-white'
                  : 'border-slate-200 text-[#475569] hover:border-[#1A3A5C]/50'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </Gruppe>

      <Gruppe label="Bereits vorhandene Dämmung (Mehrfachauswahl)">
        <div className="space-y-2">
          {DAEMMUNG_OPTIONEN.map((d) => {
            const aktiv = data.daemmung.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => toggle('daemmung', d.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                  aktiv
                    ? 'border-[#4CAF50] bg-[#4CAF50]/5'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                    aktiv ? 'border-[#4CAF50] bg-[#4CAF50]' : 'border-slate-300'
                  }`}
                >
                  {aktiv && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-sm text-[#334155]">{d.label}</span>
              </button>
            );
          })}
        </div>
      </Gruppe>
    </>
  );
}

function SchrittLeistungen({ data, toggle, update }) {
  return (
    <>
      <StepHeader
        titel="Gewünschte Leistungen"
        beschreibung="Wählen Sie alle Leistungen, die Sie interessieren. Wir empfehlen passende Kombipakete."
      />

      <div className="space-y-2 mb-6">
        {LEISTUNGEN.map((l) => {
          const aktiv = data.leistungen.includes(l.id);
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => toggle('leistungen', l.id)}
              className={`w-full flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                aktiv
                  ? 'border-[#1A3A5C] bg-[#1A3A5C]/5'
                  : 'border-slate-200 hover:border-[#1A3A5C]/30 hover:bg-slate-50'
              }`}
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  aktiv ? 'border-[#1A3A5C] bg-[#1A3A5C]' : 'border-slate-300'
                }`}
              >
                {aktiv && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-[#1A3A5C]">{l.label}</span>
                  {l.inbegriffen && (
                    <span className="text-xs bg-[#4CAF50]/15 text-[#388E3C] font-semibold px-2 py-0.5 rounded-full">
                      kostenlos
                    </span>
                  )}
                  {l.bafa && !l.inbegriffen && (
                    <span className="text-xs bg-[#1A3A5C]/10 text-[#1A3A5C] font-semibold px-2 py-0.5 rounded-full">
                      BAFA förderbar
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#64748B] mt-0.5">{l.beschreibung}</p>
              </div>
            </button>
          );
        })}
      </div>

      <Gruppe label="Zeitrahmen">
        <div className="grid grid-cols-2 gap-2">
          {ZEITRAHMEN_OPTIONEN.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => update('zeitrahmen', z.id)}
              className={`px-3 py-2.5 rounded-lg border text-sm text-left transition-all ${
                data.zeitrahmen === z.id
                  ? 'border-[#1A3A5C] bg-[#1A3A5C] text-white font-medium'
                  : 'border-slate-200 text-[#475569] hover:border-[#1A3A5C]/50'
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </Gruppe>
    </>
  );
}

function SchrittFoerdercheck({ data, update }) {
  const JaNeinToggle = ({ feldname, frage, info }) => (
    <div className="mb-5">
      <p className="text-sm font-semibold text-[#334155] mb-1">{frage}</p>
      {info && <p className="text-xs text-[#94A3B8] mb-2">{info}</p>}
      <div className="flex gap-2">
        {['ja', 'nein'].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => update(feldname, val)}
            className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold capitalize transition-all ${
              data[feldname] === val
                ? 'border-[#1A3A5C] bg-[#1A3A5C] text-white'
                : 'border-slate-200 text-[#475569] hover:border-[#1A3A5C]/40'
            }`}
          >
            {val === 'ja' ? 'Ja' : 'Nein'}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <StepHeader
        titel="Fördercheck"
        beschreibung="Diese Angaben sind entscheidend für die Höhe Ihrer staatlichen Zuschüsse."
      />

      <JaNeinToggle
        feldname="eigentuemer"
        frage="Sind Sie Eigentümer der Immobilie?"
        info="Nur Eigentümer können BEG-Förderanträge stellen."
      />

      <JaNeinToggle
        feldname="selbstgenutzt"
        frage="Nutzen Sie die Immobilie selbst als Hauptwohnsitz?"
        info="Eigengenutzte Wohngebäude erhalten in der Regel höhere Förderquoten."
      />

      <div className="mb-5">
        <p className="text-sm font-semibold text-[#334155] mb-1">
          Liegt Ihr zu versteuerndes Haushaltseinkommen unter 40.000 € pro Jahr?
        </p>
        <p className="text-xs text-[#94A3B8] mb-2">
          Bei Einkommen ≤ 40.000 € erhalten Sie den Einkommens-Bonus von +30 % (BEG 2025).
        </p>
        <div className="flex gap-2">
          {[
            { id: 'ja', label: 'Ja' },
            { id: 'nein', label: 'Nein' },
            { id: 'weiss-nicht', label: 'Weiß nicht' },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => update('einkommen', opt.id)}
              className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                data.einkommen === opt.id
                  ? 'border-[#1A3A5C] bg-[#1A3A5C] text-white'
                  : 'border-slate-200 text-[#475569] hover:border-[#1A3A5C]/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#F8FAFC] rounded-xl p-4 flex gap-3 mt-6">
        <Info className="w-5 h-5 text-[#1A3A5C] shrink-0 mt-0.5" />
        <p className="text-xs text-[#475569] leading-relaxed">
          Alle Angaben sind freiwillig und dienen nur der Orientierung. Der offizielle Förderantrag
          wird von uns gemeinsam mit Ihnen ausgefüllt. Ihre Daten werden nicht weitergegeben.
        </p>
      </div>
    </>
  );
}

function SchrittErgebnis({ data }) {
  const [kontakt, setKontakt] = useState({ name: '', email: '', telefon: '' });
  const [gesendet, setGesendet] = useState(false);
  const [sendet, setSendet] = useState(false);

  const ergebnis = berechneKostenvoranschlag(data);
  const hatLeistungen = ergebnis.leistungsPreise.filter((p) => !p.inbegriffen).length > 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSendet(true);
    await new Promise((r) => setTimeout(r, 800));
    setSendet(false);
    setGesendet(true);
    console.log('Konfigurator-Anfrage:', { ...data, kontakt, ergebnis });
  };

  if (gesendet) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <CheckCircle2 className="w-16 h-16 text-[#4CAF50] mb-4" />
        <h3 className="text-xl font-bold text-[#1A3A5C] mb-2">Anfrage gesendet!</h3>
        <p className="text-[#475569] text-sm max-w-xs">
          Vielen Dank! Wir melden uns mit einem detaillierten Angebot innerhalb von 24 Stunden.
        </p>
      </div>
    );
  }

  return (
    <>
      <StepHeader
        titel="Ihr Kostenvoranschlag"
        beschreibung="Alle Preise sind Richtwerte inkl. MwSt. – das genaue Angebot erhalten Sie nach einem kurzen Gespräch."
      />

      {/* Leistungsübersicht */}
      {hatLeistungen && (
        <div className="mb-6">
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-slate-200">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                    Leistung
                  </th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">
                    Brutto
                  </th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">
                    BAFA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ergebnis.leistungsPreise.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3">
                      <span className="font-medium text-[#1A3A5C]">{p.label}</span>
                      {p.inbegriffen && (
                        <span className="ml-2 text-xs text-[#4CAF50] font-semibold">kostenlos</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-[#334155] whitespace-nowrap">
                      {p.inbegriffen ? '—' : p.variabel ? '150 – 450 €' : `${formatEur(p.min)} – ${formatEur(p.max)}`}
                    </td>
                    <td className="px-4 py-3 text-right text-[#4CAF50] font-semibold whitespace-nowrap">
                      {p.bafaFoerderung > 0 ? `bis ${formatEur(p.bafaFoerderung)}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-300 bg-[#F8FAFC]">
                  <td className="px-4 py-3 font-bold text-[#1A3A5C]">Gesamt (Richtwert)</td>
                  <td className="px-4 py-3 text-right font-bold text-[#1A3A5C] whitespace-nowrap">
                    {formatEur(ergebnis.gesamtMin)} – {formatEur(ergebnis.gesamtMax)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-[#4CAF50] whitespace-nowrap">
                    bis {formatEur(ergebnis.gesamtBafa)}
                  </td>
                </tr>
                {ergebnis.gesamtBafa > 0 && (
                  <tr className="bg-[#4CAF50]/5">
                    <td className="px-4 py-2 text-sm font-semibold text-[#388E3C]">
                      Netto nach BAFA-Zuschuss
                    </td>
                    <td colSpan={2} className="px-4 py-2 text-right font-bold text-[#388E3C] whitespace-nowrap">
                      ab {formatEur(ergebnis.nettoMin)}
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-[#94A3B8] mt-2">
            * BAFA-Zuschüsse werden direkt auf die Beratungskosten gewährt. Antragstellung übernehmen wir für Sie.
          </p>
        </div>
      )}

      {/* BEG-Hinweis */}
      <div className="bg-[#1A3A5C]/5 rounded-xl p-4 mb-6 flex gap-3">
        <BadgeEuro className="w-5 h-5 text-[#1A3A5C] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-[#1A3A5C] mb-0.5">
            Ihr BEG-Förderpotenzial auf Sanierungsmaßnahmen: bis zu {ergebnis.begProzent} %
          </p>
          <p className="text-xs text-[#475569]">
            {ergebnis.hatISFP
              ? 'Mit dem iSFP erhalten Sie +5 % Extra-Bonus auf jede Einzelmaßnahme.'
              : 'Mit einem iSFP könnten Sie +5 % Extra-Bonus erhalten.'}{' '}
            Bei einer Investition von 30.000 € entspricht das{' '}
            <strong>{formatEur(Math.round(30000 * ergebnis.begProzent / 100 / 100) * 100)}</strong> Förderung.
          </p>
        </div>
      </div>

      {/* Kontaktformular */}
      <div className="border-t border-slate-200 pt-6">
        <p className="text-sm font-bold text-[#1A3A5C] mb-4">
          Verbindliches Angebot anfordern
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Ihr Name *"
            required
            value={kontakt.name}
            onChange={(e) => setKontakt((p) => ({ ...p, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1A3A5C] text-sm outline-none transition-colors"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="email"
              placeholder="E-Mail *"
              required
              value={kontakt.email}
              onChange={(e) => setKontakt((p) => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1A3A5C] text-sm outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={kontakt.telefon}
              onChange={(e) => setKontakt((p) => ({ ...p, telefon: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1A3A5C] text-sm outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={sendet}
            className="w-full flex items-center justify-center gap-2 bg-[#4CAF50] hover:bg-[#388E3C] disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm"
          >
            <Send className="w-4 h-4" />
            {sendet ? 'Wird gesendet …' : 'Kostenloses Angebot anfordern'}
          </button>
        </form>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-[#94A3B8]">oder</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 w-full flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Direkt per WhatsApp anfragen
        </a>
      </div>
    </>
  );
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

const SCHRITTE = ['Gebäude', 'Energiezustand', 'Leistungen', 'Fördercheck', 'Ergebnis'];

const INITFORM = {
  gebaeudetyp: '',
  baujahr: '',
  flaeche: 150,
  einheiten: 1,
  heizsystem: '',
  heizalter: '',
  daemmung: [],
  leistungen: [],
  zeitrahmen: '',
  eigentuemer: '',
  selbstgenutzt: '',
  einkommen: '',
};

function kannWeiter(schritt, data) {
  if (schritt === 0) return data.gebaeudetyp && data.baujahr;
  if (schritt === 1) return !!data.heizsystem;
  if (schritt === 2) return data.leistungen.length > 0;
  if (schritt === 3) return !!data.eigentuemer;
  return true;
}

export default function Konfigurator() {
  const [schritt, setSchritt] = useState(0);
  const [dir, setDir] = useState(1);
  const [formData, setFormData] = useState(INITFORM);

  const update = (key, val) => setFormData((p) => ({ ...p, [key]: val }));
  const toggle = (key, val) =>
    setFormData((p) => ({
      ...p,
      [key]: p[key].includes(val) ? p[key].filter((v) => v !== val) : [...p[key], val],
    }));

  const weiter = () => {
    if (!kannWeiter(schritt, formData)) return;
    setDir(1);
    setSchritt((s) => Math.min(s + 1, SCHRITTE.length - 1));
  };

  const zurueck = () => {
    setDir(-1);
    setSchritt((s) => Math.max(s - 1, 0));
  };

  const istLetzterSchritt = schritt === SCHRITTE.length - 1;

  return (
    <section id="konfigurator" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Sektion-Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#1A3A5C]/8 text-[#1A3A5C] font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Kostenvoranschlag
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3A5C] mb-4">
            Ihr persönlicher Konfigurator
          </h2>
          <p className="text-[#475569] text-lg max-w-xl mx-auto">
            In 4 Schritten zu einem ersten Kostenrahmen — inklusive Ihrer maximalen Förderquote.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">

          {/* Fortschrittsbalken */}
          <div className="flex items-center gap-1 mb-8">
            {SCHRITTE.map((name, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                    i <= schritt ? 'bg-[#1A3A5C]' : 'bg-slate-200'
                  }`}
                />
                <span
                  className={`text-xs hidden sm:block transition-colors ${
                    i === schritt ? 'font-semibold text-[#1A3A5C]' : 'text-[#94A3B8]'
                  }`}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Wizard Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
            <div className="px-6 sm:px-8 pt-8 pb-6">

              {/* Schritt-Indikator */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1A3A5C] text-white text-sm font-bold shrink-0">
                  {schritt + 1}
                </div>
                <span className="text-sm text-[#64748B]">
                  Schritt {schritt + 1} von {SCHRITTE.length}
                  {istLetzterSchritt && (
                    <span className="ml-2 text-[#4CAF50] font-semibold">
                      <Calculator className="inline w-3.5 h-3.5 mr-1" />
                      Ihr Ergebnis
                    </span>
                  )}
                </span>
              </div>

              {/* Schritt-Inhalte mit Animation */}
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={schritt}
                  custom={dir}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {schritt === 0 && <SchrittGebaeude data={formData} update={update} />}
                  {schritt === 1 && <SchrittEnergie data={formData} update={update} toggle={toggle} />}
                  {schritt === 2 && <SchrittLeistungen data={formData} update={update} toggle={toggle} />}
                  {schritt === 3 && <SchrittFoerdercheck data={formData} update={update} />}
                  {schritt === 4 && <SchrittErgebnis data={formData} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            {!istLetzterSchritt && (
              <div className="flex items-center justify-between px-6 sm:px-8 pb-8 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={zurueck}
                  className={`flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#1A3A5C] transition-colors ${
                    schritt === 0 ? 'invisible' : ''
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Zurück
                </button>

                <button
                  type="button"
                  onClick={weiter}
                  disabled={!kannWeiter(schritt, formData)}
                  className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#0F2640] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                >
                  {schritt === SCHRITTE.length - 2 ? (
                    <>
                      <Calculator className="w-4 h-4" />
                      Ergebnis berechnen
                    </>
                  ) : (
                    <>
                      Weiter
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Zurück-Button auf Ergebnis-Seite */}
            {istLetzterSchritt && (
              <div className="px-6 sm:px-8 pb-8 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={zurueck}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#1A3A5C] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Angaben anpassen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
