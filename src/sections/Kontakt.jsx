import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { CONTACT } from '../data/content';

export default function Kontakt() {
  const [gesendet, setGesendet] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Platzhalter — hier EmailJS / Resend / Backend-Endpoint eintragen
    console.log('Formular-Daten:', data);
    await new Promise((r) => setTimeout(r, 800)); // simuliertes Senden
    setGesendet(true);
    reset();
  };

  return (
    <section id="kontakt" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#4CAF50]/10 text-[#388E3C] font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Kontakt
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A3A5C] mb-4">
            Kostenlose Erstberatung anfragen
          </h2>
          <p className="text-[#475569] text-lg max-w-xl mx-auto">
            Schildern Sie uns kurz Ihr Vorhaben — wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Kontaktinfos — 2 Spalten */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Phone, label: 'Telefon', wert: CONTACT.telefon, href: `tel:${CONTACT.telefon.replace(/\s/g, '')}` },
              { icon: Mail, label: 'E-Mail', wert: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { icon: MessageCircle, label: 'WhatsApp', wert: 'Direkt schreiben', href: `https://wa.me/${CONTACT.whatsapp}` },
              { icon: MapPin, label: 'Adresse', wert: CONTACT.adresse, href: null },
              { icon: Clock, label: 'Erreichbarkeit', wert: CONTACT.oeffnungszeiten, href: null },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1A3A5C]/8 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#1A3A5C]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="text-[#1A3A5C] font-semibold hover:text-[#4CAF50] transition-colors"
                    >
                      {item.wert}
                    </a>
                  ) : (
                    <p className="text-[#334155] font-semibold">{item.wert}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-48 mt-4">
              <iframe
                title="P&P Energieberatung Standort"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Friedhofstra%C3%9Fe+64,73614+Schorndorf"
              />
            </div>
          </motion.div>

          {/* Formular — 3 Spalten */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              {gesendet ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-[#4CAF50] mb-4" />
                  <h3 className="text-xl font-bold text-[#1A3A5C] mb-2">Nachricht gesendet!</h3>
                  <p className="text-[#475569]">
                    Vielen Dank — wir melden uns schnellstmöglich bei Ihnen.
                  </p>
                  <button
                    onClick={() => setGesendet(false)}
                    className="mt-6 text-sm text-[#4CAF50] hover:underline"
                  >
                    Neue Anfrage senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#334155] mb-1.5">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        placeholder="Max"
                        {...register('vorname', { required: 'Pflichtfeld' })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          errors.vorname
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-slate-200 focus:border-[#1A3A5C]'
                        }`}
                      />
                      {errors.vorname && (
                        <p className="text-red-500 text-xs mt-1">{errors.vorname.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#334155] mb-1.5">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        placeholder="Mustermann"
                        {...register('nachname', { required: 'Pflichtfeld' })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          errors.nachname
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-slate-200 focus:border-[#1A3A5C]'
                        }`}
                      />
                      {errors.nachname && (
                        <p className="text-red-500 text-xs mt-1">{errors.nachname.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#334155] mb-1.5">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      placeholder="max@beispiel.de"
                      {...register('email', {
                        required: 'Pflichtfeld',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ungültige E-Mail' },
                      })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                        errors.email
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#1A3A5C]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#334155] mb-1.5">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      placeholder="0155 ..."
                      {...register('telefon')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1A3A5C] text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#334155] mb-1.5">
                      Worum geht es? *
                    </label>
                    <select
                      {...register('thema', { required: 'Bitte wählen' })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-white ${
                        errors.thema
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#1A3A5C]'
                      }`}
                    >
                      <option value="">Bitte auswählen …</option>
                      <option value="isfp">Individueller Sanierungsfahrplan (iSFP)</option>
                      <option value="foerderung">Fördermittelberatung</option>
                      <option value="heizung">Heizungsaustausch / Wärmepumpe</option>
                      <option value="energieausweis">Energieausweis</option>
                      <option value="heizlast">Heizlastberechnung</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>
                    {errors.thema && (
                      <p className="text-red-500 text-xs mt-1">{errors.thema.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#334155] mb-1.5">
                      Ihre Nachricht
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Beschreiben Sie kurz Ihr Vorhaben oder stellen Sie eine Frage …"
                      {...register('nachricht')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1A3A5C] text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  <p className="text-xs text-[#94A3B8]">
                    Mit dem Absenden stimmen Sie unserer{' '}
                    <a href="#datenschutz" className="underline hover:text-[#1A3A5C]">
                      Datenschutzerklärung
                    </a>{' '}
                    zu. Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#4CAF50] hover:bg-[#388E3C] disabled:bg-[#4CAF50]/60 text-white font-bold px-7 py-4 rounded-xl transition-colors text-base"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Wird gesendet …' : 'Anfrage kostenlos senden'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
