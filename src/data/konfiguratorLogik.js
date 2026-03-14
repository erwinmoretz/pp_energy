// ─── Auswahloptionen ─────────────────────────────────────────────────────────

export const GEBAEUDE_TYPEN = [
  { id: 'efh', label: 'Einfamilienhaus', kurz: 'EFH', beschreibung: 'Freistehend' },
  { id: 'dhh', label: 'Doppelhaushälfte', kurz: 'DHH', beschreibung: 'Eine Seite' },
  { id: 'rh', label: 'Reihenhaus', kurz: 'RH', beschreibung: 'End- oder Mittelhaus' },
  { id: 'mfh', label: 'Mehrfamilienhaus', kurz: 'MFH', beschreibung: 'Ab 3 Einheiten' },
];

export const BAUJAHR_BEREICHE = [
  { id: 'vor1958', label: 'vor 1958' },
  { id: '1958-1978', label: '1958 – 1978' },
  { id: '1979-1994', label: '1979 – 1994' },
  { id: '1995-2009', label: '1995 – 2009' },
  { id: 'ab2010', label: 'ab 2010' },
];

export const HEIZSYSTEME = [
  { id: 'gas', label: 'Gasheizung' },
  { id: 'oel', label: 'Ölheizung' },
  { id: 'waermepumpe', label: 'Wärmepumpe' },
  { id: 'fernwaerme', label: 'Fernwärme' },
  { id: 'pellets', label: 'Pelletheizung' },
  { id: 'strom', label: 'Nachtspeicher / Strom' },
];

export const HEIZUNG_ALTER = [
  { id: 'unter5', label: 'unter 5 Jahre' },
  { id: '5-15', label: '5 – 15 Jahre' },
  { id: 'ueber15', label: 'über 15 Jahre' },
  { id: 'unbekannt', label: 'unbekannt' },
];

export const DAEMMUNG_OPTIONEN = [
  { id: 'dach', label: 'Dach / Obergeschoss gedämmt' },
  { id: 'fassade', label: 'Außenfassade gedämmt' },
  { id: 'keller', label: 'Keller / Bodenplatte gedämmt' },
  { id: 'fenster', label: 'Neue Fenster (nach 2000)' },
];

export const LEISTUNGEN = [
  {
    id: 'isfp',
    label: 'Sanierungsfahrplan (iSFP)',
    kurz: 'iSFP',
    beschreibung: '+5 % Extra-Förderbonus auf alle Einzelmaßnahmen',
    bafa: true,
  },
  {
    id: 'heizlast',
    label: 'Heizlastberechnung',
    kurz: 'DIN EN 12831',
    beschreibung: 'Pflichtnachweis für Wärmepumpen-Förderung (BEG)',
    bafa: false,
  },
  {
    id: 'energieausweis',
    label: 'Energieausweis',
    kurz: 'Bedarf & Verbrauch',
    beschreibung: 'Pflicht bei Verkauf und Vermietung von Gebäuden',
    bafa: false,
  },
  {
    id: 'thermografie',
    label: 'Thermografieanalyse',
    kurz: 'Infrarot',
    beschreibung: 'Wärmebrücken und Leckagen sichtbar machen',
    bafa: false,
  },
  {
    id: 'blowerDoor',
    label: 'Blower-Door-Test',
    kurz: 'Luftdichtheit',
    beschreibung: 'Für KfW-Effizienzhausstandards erforderlich',
    bafa: false,
  },
  {
    id: 'baubegleitung',
    label: 'Energetische Baubegleitung',
    kurz: 'BAFA',
    beschreibung: 'Bis zu 50 % BAFA-Zuschuss auf die Beratungskosten',
    bafa: true,
  },
  {
    id: 'hydraulik',
    label: 'Hydraulischer Abgleich',
    kurz: 'Berechnung',
    beschreibung: 'Pflicht beim Heizungstausch, spart 15 % Energie',
    bafa: false,
  },
  {
    id: 'foerderberatung',
    label: 'Fördermittelberatung',
    kurz: 'KfW & BAFA',
    beschreibung: 'In jedem Auftrag kostenlos inbegriffen',
    bafa: false,
    inbegriffen: true,
  },
];

export const ZEITRAHMEN_OPTIONEN = [
  { id: 'sofort', label: 'So schnell wie möglich' },
  { id: '3monate', label: 'In den nächsten 3 Monaten' },
  { id: '6monate', label: 'In den nächsten 6 Monaten' },
  { id: 'planung', label: 'Noch in der Planungsphase' },
];

// ─── Preisberechnung (Richtwerte inkl. ±10% Toleranz) ────────────────────────

const PREISFUNKTIONEN = {
  isfp: (flaeche, einheiten) => {
    const base = 1200 + flaeche * 1.3 * Math.min(einheiten, 4);
    const netto = Math.round(base / 100) * 100;
    return { min: Math.round(netto * 0.9 / 50) * 50, max: Math.round(netto * 1.1 / 50) * 50, bafaFoerderung: Math.round(netto * 0.5 / 50) * 50 };
  },
  heizlast: (flaeche) => {
    const base = 270 + flaeche * 0.7;
    const netto = Math.round(base / 10) * 10;
    return { min: Math.round(netto * 0.9 / 10) * 10, max: Math.round(netto * 1.1 / 10) * 10, bafaFoerderung: 0 };
  },
  energieausweis: () => ({ min: 150, max: 450, bafaFoerderung: 0, variabel: true }),
  thermografie: (flaeche) => {
    const base = 460 + flaeche * 0.4;
    const netto = Math.round(base / 10) * 10;
    return { min: Math.round(netto * 0.9 / 10) * 10, max: Math.round(netto * 1.1 / 10) * 10, bafaFoerderung: 0 };
  },
  blowerDoor: () => ({ min: 400, max: 520, bafaFoerderung: 0 }),
  baubegleitung: (flaeche) => {
    const base = 700 + flaeche * 1.4;
    const netto = Math.round(base / 100) * 100;
    return { min: Math.round(netto * 0.9 / 50) * 50, max: Math.round(netto * 1.1 / 50) * 50, bafaFoerderung: Math.round(netto * 0.5 / 50) * 50 };
  },
  hydraulik: (flaeche) => {
    const base = 180 + flaeche * 0.4;
    const netto = Math.round(base / 10) * 10;
    return { min: Math.round(netto * 0.9 / 10) * 10, max: Math.round(netto * 1.1 / 10) * 10, bafaFoerderung: 0 };
  },
  foerderberatung: () => ({ min: 0, max: 0, bafaFoerderung: 0, inbegriffen: true }),
};

export function berechneKostenvoranschlag(formData) {
  const flaeche = Number(formData.flaeche) || 150;
  const einheiten = Number(formData.einheiten) || 1;

  const leistungsPreise = formData.leistungen
    .map((id) => {
      const fn = PREISFUNKTIONEN[id];
      if (!fn) return null;
      const preis = fn(flaeche, einheiten);
      const leistung = LEISTUNGEN.find((l) => l.id === id);
      return { id, label: leistung?.label, kurz: leistung?.kurz, bafa: leistung?.bafa, ...preis };
    })
    .filter(Boolean);

  const gesamtMin = leistungsPreise.filter(p => !p.inbegriffen).reduce((sum, p) => sum + (p.min || 0), 0);
  const gesamtMax = leistungsPreise.filter(p => !p.inbegriffen).reduce((sum, p) => sum + (p.max || 0), 0);
  const gesamtBafa = leistungsPreise.reduce((sum, p) => sum + (p.bafaFoerderung || 0), 0);

  // BEG-Förderung auf Sanierungsmaßnahmen (informativ)
  let begProzent = 30; // Grundförderung Heizung
  if (formData.leistungen.includes('isfp')) begProzent += 5;
  if (formData.einkommen === 'ja') begProzent += 30;
  const hatWP = formData.heizsystem !== 'waermepumpe';
  if (hatWP && formData.leistungen.includes('heizlast')) begProzent += 5;
  begProzent = Math.min(begProzent, 70);

  return {
    leistungsPreise,
    gesamtMin,
    gesamtMax,
    gesamtBafa,
    nettoMin: Math.max(0, gesamtMin - gesamtBafa),
    nettoMax: Math.max(0, gesamtMax - gesamtBafa),
    begProzent,
    hatISFP: formData.leistungen.includes('isfp'),
  };
}

export function formatEur(betrag) {
  return betrag.toLocaleString('de-DE') + ' €';
}
