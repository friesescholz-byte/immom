import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Mail, Phone, Gift, Send, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Building2, User } from 'lucide-react';
import styles from './Tippgeber.module.css';
import Button from './ui/Button';
import { saveLead } from '../utils/leadStorage';

export const Tippgeber: React.FC = () => {
  const [formData, setFormData] = useState({
    // Tippgeber Kontaktdaten
    tippgeberAnrede: 'herr',
    tippgeberVorname: '',
    tippgeberNachname: '',
    tippgeberStreet: '',
    tippgeberZipCity: '',
    tippgeberEmail: '',
    tippgeberPhone: '',
    // Objektdaten
    objektAdresse: '',
    objektOrt: '',
    objektArt: 'einfamilienhaus',
    eigentuemerName: '',
    hinweise: '',
    datenschutz: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Initialize Cloudflare Turnstile
  useEffect(() => {
    let interval: any;

    if (isSubmitted) {
      if (widgetIdRef.current && (window as any).turnstile) {
        try { (window as any).turnstile.remove(widgetIdRef.current); } catch (e) {}
        widgetIdRef.current = null;
      }
      setTurnstileToken('');
      return;
    }

    const renderWidget = () => {
      if (turnstileRef.current && (window as any).turnstile && !widgetIdRef.current) {
        try {
          turnstileRef.current.innerHTML = '';
          widgetIdRef.current = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: '0x4AAAAAADlSZ4-_XRQN6CgC',
            callback: (token: string) => {
              setTurnstileToken(token);
              setErrorMessage('');
            },
            'expired-callback': () => setTurnstileToken(''),
            theme: 'dark',
          });
          if (interval) clearInterval(interval);
        } catch (e) {
          console.error('Turnstile render error:', e);
        }
      }
    };

    renderWidget();

    if (!widgetIdRef.current) {
      interval = setInterval(() => {
        if ((window as any).turnstile) {
          renderWidget();
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (widgetIdRef.current && (window as any).turnstile) {
        try { (window as any).turnstile.remove(widgetIdRef.current); } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!turnstileToken) {
      setErrorMessage('Bitte bestätigen Sie den Spam-Schutz.');
      return;
    }

    if (!formData.tippgeberStreet.trim() || !formData.tippgeberZipCity.trim()) {
      setErrorMessage('Bitte geben Sie Ihre vollständige Anschrift (Straße, Hausnummer, PLZ & Ort) an.');
      return;
    }

    if (!formData.objektAdresse.trim()) {
      setErrorMessage('Bitte geben Sie die Adresse oder den Standort des empfohlenen Objekts an.');
      return;
    }

    setIsSubmitting(true);

    try {
      const fullTippgeberAddress = `${formData.tippgeberStreet.trim()}, ${formData.tippgeberZipCity.trim()}`;
      const tippDetails = `Tippgeber-Hinweis:\nEmpfohlenes Objekt: ${formData.objektAdresse} (${formData.objektOrt || 'k.A.'})\nImmobilienart: ${formData.objektArt}\nEigentümer: ${formData.eigentuemerName || 'Nicht angegeben'}\nNotizen: ${formData.hinweise || 'Keine zusätzlichen Notizen'}\n\nAnschrift Tippgeber: ${fullTippgeberAddress}`;

      const response = await fetch('https://friesescholzwebdesign.pages.dev/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source: 'immom',
          type: 'tippgeber',
          turnstileToken,
          name: `${formData.tippgeberVorname} ${formData.tippgeberNachname}`.trim(),
          email: formData.tippgeberEmail,
          phone: formData.tippgeberPhone,
          street: formData.tippgeberStreet,
          zipCity: formData.tippgeberZipCity,
          address: fullTippgeberAddress,
          objektAdresse: formData.objektAdresse,
          objektOrt: formData.objektOrt,
          objektArt: formData.objektArt,
          eigentuemerName: formData.eigentuemerName,
          hinweise: formData.hinweise
        })
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setIsSubmitted(true);
        saveLead({
          type: 'tippgeber',
          name: `${formData.tippgeberVorname} ${formData.tippgeberNachname}`.trim() || 'Tippgeber',
          email: formData.tippgeberEmail,
          phone: formData.tippgeberPhone,
          street: formData.tippgeberStreet,
          zipCity: formData.tippgeberZipCity,
          address: fullTippgeberAddress,
          details: tippDetails
        });
      } else {
        setErrorMessage(resData.message || 'Es gab einen Fehler beim Absenden. Bitte versuchen Sie es erneut.');
      }
    } catch (err: any) {
      setErrorMessage('Verbindungsfehler zum Server. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per Telefon.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="tippgeber" className={`${styles.section} section-padding`}>
      {/* Background ambient lighting for special Tippgeber section */}
      <div className={styles.bgGlowCyan} />
      <div className={styles.bgGlowBlue} />
      <div className={styles.luxuryGridPattern} />

      <div className={`${styles.container} container`}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.cyanEyebrow}>Ihr Tipp ist bares Geld wert</span>
          <h2 className={styles.title}>
            Werden Sie <span className={styles.titleHighlight}>Tippgeber</span> & kassieren Sie Prämie
          </h2>
          <p className={styles.subtitle}>
            Sie kennen jemanden in Nienburg, Marklohe oder der Region, der eine Immobilie verkaufen möchte? 
            Melden Sie uns Ihren Tipp – nach erfolgreichem Verkauf belohnen wir Ihre Empfehlung direkt mit bis zu 5.000 €!
          </p>
        </div>

        {/* Hero Tippgeber Card Grid */}
        <div className={styles.heroGrid}>
          <div className={styles.leftHero}>
            <div className={styles.praemieBadgeCard}>
              <div className={styles.praemieHeader}>
                <Coins className={styles.praemieIcon} size={24} />
                <h3>Exklusive Empfehlungs-Prämie</h3>
              </div>
              <div className={styles.praemieAmount}>
                bis zu <span>5.000 €</span>
              </div>
              <p className={styles.praemieNote}>
                * Der Prämienanspruch beträgt mindestens 10% unserer Nettocourtage und richtet sich nach dem erzielten Verkaufspreis.
              </p>
            </div>

            <p className={styles.heroExplanationText}>
              Ob Nachbarn, Bekannte, Arbeitskollegen oder Verwandte – verhilft Ihr Hinweis zum erfolgreichen Verkauf einer Immobilie über ImmoM / CM-Immobilien, erhalten Sie eine attraktive Prämie auf Ihr Konto. Jeder Tipp wird auf Wunsch zu 100% vertraulich und diskret behandelt.
            </p>
          </div>

          <div className={styles.rightHeroImage}>
            <img 
              src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Screenshot%202026-07-06%20120228_ergebnis.webp" 
              alt="Tippgeber Prämie ImmoM" 
              className={styles.heroImg} 
            />
            <div className={styles.imageOverlayBadge}>
              <Gift size={20} style={{ color: 'var(--color-accent)' }} />
              <span className={styles.badgeText}>Bares Geld für Ihren Immobilien-Tipp</span>
            </div>
          </div>
        </div>

        {/* 3-Steps Process */}
        <div className={styles.stepsGrid}>
          <motion.div 
            className={styles.stepCard}
            whileHover={{ y: -5 }}
          >
            <div className={styles.stepNumber}>01</div>
            <h3 className={styles.stepTitle}>Tipp melden</h3>
            <p className={styles.stepDesc}>
              Füllen Sie einfach unser Tippgeber-Formular unten aus oder rufen Sie uns direkt an.
            </p>
          </motion.div>

          <motion.div 
            className={styles.stepCard}
            whileHover={{ y: -5 }}
          >
            <div className={styles.stepNumber}>02</div>
            <h3 className={styles.stepTitle}>Diskrete Kontaktaufnahme</h3>
            <p className={styles.stepDesc}>
              Mit Ihrer Empfehlung treten wir feinfühlig, diskret und professionell mit dem Eigentümer in Kontakt.
            </p>
          </motion.div>

          <motion.div 
            className={styles.stepCard}
            whileHover={{ y: -5 }}
          >
            <div className={styles.stepNumber}>03</div>
            <h3 className={styles.stepTitle}>Prämie kassieren</h3>
            <p className={styles.stepDesc}>
              Nach erfolgreicher Beurkundung & Verkauf erhalten Sie Ihre Tippgeberprämie von bis zu 5.000 € auf Ihr Konto.
            </p>
          </motion.div>
        </div>

        {/* Interactive Tippgeber Form Card */}
        <div id="tippgeber-form" className={styles.formSectionWrapper}>
          <div className={styles.formContainerCard}>
            <div className={styles.formHeaderRow}>
              <div className={styles.formIconBadge}>
                <Coins size={28} />
              </div>
              <div>
                <span className={styles.formSmallTag}>Online-Tippformular</span>
                <h3 className={styles.formTitle}>Immobilien-Tipp jetzt vertraulich einreichen</h3>
                <p className={styles.formSubtext}>
                  Geben Sie Ihre Daten sowie die Eckdaten des empfohlenen Objekts an. Wir prüfen den Hinweis unverzüglich.
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className={styles.successIcon}>
                    <CheckCircle2 size={56} />
                  </div>
                  <h3>Vielen Dank für Ihren wertvollen Tipp!</h3>
                  <p>
                    Wir haben Ihren Hinweis erfolgreich empfangen und werden die Angaben diskret und professionell prüfen. 
                    Bei Zustandekommen des Alleinauftrags und erfolgreichem Verkauf setzen wir uns umgehend bezüglich der Prämienauszahlung mit Ihnen in Verbindung.
                  </p>
                  <div className={styles.successNote}>
                    <ShieldCheck size={18} />
                    <span>Ihre Daten wurden verschlüsselt übertragen und werden absolut vertraulich behandelt.</span>
                  </div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          tippgeberAnrede: 'herr',
                          tippgeberVorname: '',
                          tippgeberNachname: '',
                          tippgeberStreet: '',
                          tippgeberZipCity: '',
                          tippgeberEmail: '',
                          tippgeberPhone: '',
                          objektAdresse: '',
                          objektOrt: '',
                          objektArt: 'einfamilienhaus',
                          eigentuemerName: '',
                          hinweise: '',
                          datenschutz: false
                        });
                      }}
                    >
                      Weiteren Tipp einreichen
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.tippForm}>
                  {errorMessage && (
                    <div className={styles.errorAlert}>
                      <AlertCircle size={18} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Section A: Tippgeber Daten */}
                  <div className={styles.formFieldset}>
                    <div className={styles.fieldsetTitle}>
                      <User size={18} className={styles.fieldsetIcon} />
                      <h4>1. Ihre Kontaktdaten (Tippgeber)</h4>
                    </div>

                    <div className={styles.formRow3}>
                      <div className={styles.formGroup}>
                        <label>Anrede</label>
                        <select 
                          value={formData.tippgeberAnrede} 
                          onChange={(e) => setFormData({ ...formData, tippgeberAnrede: e.target.value })}
                          className={styles.input}
                        >
                          <option value="herr">Herr</option>
                          <option value="frau">Frau</option>
                          <option value="divers">Divers</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label>Vorname *</label>
                        <input 
                          type="text" 
                          placeholder="Ihr Vorname"
                          value={formData.tippgeberVorname}
                          onChange={(e) => setFormData({ ...formData, tippgeberVorname: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Nachname *</label>
                        <input 
                          type="text" 
                          placeholder="Ihr Nachname"
                          value={formData.tippgeberNachname}
                          onChange={(e) => setFormData({ ...formData, tippgeberNachname: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow2}>
                      <div className={styles.formGroup}>
                        <label>Straße & Hausnummer *</label>
                        <input 
                          type="text" 
                          placeholder="z.B. Musterstraße 12"
                          value={formData.tippgeberStreet}
                          onChange={(e) => setFormData({ ...formData, tippgeberStreet: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>PLZ & Ort *</label>
                        <input 
                          type="text" 
                          placeholder="z.B. 31582 Nienburg"
                          value={formData.tippgeberZipCity}
                          onChange={(e) => setFormData({ ...formData, tippgeberZipCity: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow2}>
                      <div className={styles.formGroup}>
                        <label>E-Mail-Adresse *</label>
                        <input 
                          type="email" 
                          placeholder="name@beispiel.de"
                          value={formData.tippgeberEmail}
                          onChange={(e) => setFormData({ ...formData, tippgeberEmail: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Telefonnummer für Rückfragen *</label>
                        <input 
                          type="tel" 
                          placeholder="z.B. 0170 1234567"
                          value={formData.tippgeberPhone}
                          onChange={(e) => setFormData({ ...formData, tippgeberPhone: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section B: Objektdaten */}
                  <div className={styles.formFieldset}>
                    <div className={styles.fieldsetTitle}>
                      <Building2 size={18} className={styles.fieldsetIcon} />
                      <h4>2. Angaben zum empfohlenen Objekt & Eigentümer</h4>
                    </div>

                    <div className={styles.formRow2}>
                      <div className={styles.formGroup}>
                        <label>Adresse / Straße des Objekts *</label>
                        <input 
                          type="text" 
                          placeholder="z.B. Weserstraße 45"
                          value={formData.objektAdresse}
                          onChange={(e) => setFormData({ ...formData, objektAdresse: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Ort / Stadtteil des Objekts *</label>
                        <input 
                          type="text" 
                          placeholder="z.B. 31582 Nienburg / Marklohe"
                          value={formData.objektOrt}
                          onChange={(e) => setFormData({ ...formData, objektOrt: e.target.value })}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow2}>
                      <div className={styles.formGroup}>
                        <label>Immobilienart</label>
                        <select 
                          value={formData.objektArt} 
                          onChange={(e) => setFormData({ ...formData, objektArt: e.target.value })}
                          className={styles.input}
                        >
                          <option value="einfamilienhaus">Einfamilienhaus / Doppelhaushälfte</option>
                          <option value="wohnung">Eigentumswohnung</option>
                          <option value="mehrfamilienhaus">Mehrfamilienhaus / Anlageobjekt</option>
                          <option value="grundstueck">Baugrundstück</option>
                          <option value="gewerbe">Gewerbeimmobilie</option>
                          <option value="sonstiges">Sonstige Immobilie</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label>Name des Eigentümers (falls bekannt)</label>
                        <input 
                          type="text" 
                          placeholder="z.B. Familie Schmidt"
                          value={formData.eigentuemerName}
                          onChange={(e) => setFormData({ ...formData, eigentuemerName: e.target.value })}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Zusätzliche Hinweise & Notizen</label>
                      <textarea 
                        rows={3}
                        placeholder="z.B. Grund des Verkaufs, wann das Objekt bezugsfrei wird, wie Sie von den Verkaufsabsichten erfahren haben..."
                        value={formData.hinweise}
                        onChange={(e) => setFormData({ ...formData, hinweise: e.target.value })}
                        className={styles.textarea}
                      />
                    </div>
                  </div>

                  {/* Cloudflare Turnstile */}
                  <div style={{ margin: '1rem 0 1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <div ref={turnstileRef}></div>
                  </div>

                  {/* Privacy Checkbox */}
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={formData.datenschutz}
                      onChange={(e) => setFormData({ ...formData, datenschutz: e.target.checked })}
                      required
                    />
                    <span>
                      Ich stimme der Verarbeitung meiner Angaben gemäß der Datenschutzerklärung zu. 
                      Mein Tipp wird absolut vertraulich behandelt.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <div className={styles.submitRow}>
                    <Button 
                      type="submit" 
                      variant="accent" 
                      disabled={isSubmitting || !turnstileToken || !formData.datenschutz}
                      className={styles.submitBtn}
                    >
                      <Sparkles size={18} />
                      <span>{isSubmitting ? 'Wird übermittelt...' : 'Tipp jetzt einreichen & Prämie sichern'}</span>
                      <Send size={16} />
                    </Button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Direct Contact Bar */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <h3>Lieber direkt anrufen?</h3>
            <p>Sie möchten Ihren Tipp lieber persönlich und telefonisch durchsprechen? Wir freuen uns auf Ihren Anruf.</p>
          </div>
          <div className={styles.ctaActions}>
            <a href="tel:050218601001" className={styles.contactBadgeLink}>
              <Phone size={16} />
              <span>05021 - 860 10 01</span>
            </a>
            <a href="mailto:mail@immom.eu?subject=Tippgeber%20Hinweis%20Immobilienverkauf" className={styles.contactBadgeLink} style={{ background: 'var(--color-accent)', color: '#071B33', borderColor: 'var(--color-accent)' }}>
              <Mail size={16} />
              <span>mail@immom.eu</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Tippgeber;
