import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Mail, Phone, Gift, Send, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Building2, User, X, ArrowRight, Check } from 'lucide-react';
import styles from './Tippgeber.module.css';
import Button from './ui/Button';
import { saveLead } from '../utils/leadStorage';

export const Tippgeber: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Initialize Cloudflare Turnstile inside Modal
  useEffect(() => {
    let interval: any;

    if (!isModalOpen || isSubmitted) {
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
            theme: 'light',
          });
          if (interval) clearInterval(interval);
        } catch (e) {
          console.error('Turnstile render error:', e);
        }
      }
    };

    // Small delay to allow modal animation to complete
    const timeout = setTimeout(() => {
      renderWidget();
      if (!widgetIdRef.current) {
        interval = setInterval(() => {
          if ((window as any).turnstile) {
            renderWidget();
          }
        }, 100);
      }
    }, 150);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
      if (widgetIdRef.current && (window as any).turnstile) {
        try { (window as any).turnstile.remove(widgetIdRef.current); } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [isModalOpen, isSubmitted]);

  const handleOpenModal = () => {
    setIsSubmitted(false);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className="eyebrow">Tippgeber-Prämie</span>
          <h2 className={styles.title}>
            Ihr Immobilien-Tipp ist <span className="highlight-gold">bares Geld</span> wert
          </h2>
          <p className={styles.subtitle}>
            Sie wissen von einem anstehenden Immobilienverkauf in Nienburg, Marklohe oder der Region? 
            Melden Sie uns Ihren Hinweis – nach erfolgreichem Verkauf belohnen wir Ihre Empfehlung mit bis zu 5.000 € Prämie!
          </p>
        </div>

        {/* Main 2-Column Hero Card */}
        <div className={styles.heroGrid}>
          <div className={styles.leftCard}>
            <div className={styles.praemieBanner}>
              <div className={styles.praemieIconWrapper}>
                <Coins size={28} className={styles.praemieIcon} />
              </div>
              <div>
                <span className={styles.praemieLabel}>Empfehlungs-Prämie</span>
                <div className={styles.praemieAmount}>
                  bis zu <span>5.000 €</span>
                </div>
              </div>
            </div>

            <p className={styles.explanationText}>
              Ob Nachbarn, Bekannte, Arbeitskollegen oder Verwandte – verhilft Ihr Hinweis zum erfolgreichen Verkauf einer Immobilie über ImmoM / CM-Immobilien, erhalten Sie eine attraktive Prämie auf Ihr Konto.
            </p>

            <ul className={styles.benefitList}>
              <li>
                <div className={styles.checkIcon}><Check size={16} /></div>
                <span><strong>Mindestens 10%</strong> unserer Nettocourtage als direkte Auszahlung</span>
              </li>
              <li>
                <div className={styles.checkIcon}><Check size={16} /></div>
                <span><strong>100% diskret & vertraulich</strong> – auf Wunsch bleiben Sie völlig anonym</span>
              </li>
              <li>
                <div className={styles.checkIcon}><Check size={16} /></div>
                <span><strong>Persönliche Betreuung</strong> durch Inhaber Carsten Meyer (über 25 Jahre Erfahrung)</span>
              </li>
            </ul>

            <div className={styles.actionRow}>
              <Button variant="accent" onClick={handleOpenModal} className={styles.mainCtaBtn}>
                <Sparkles size={18} />
                <span>Tipp jetzt online einreichen</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          <div className={styles.rightImageCard}>
            <div className={styles.imageWrapper}>
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Screenshot%202026-07-06%20120228_ergebnis.webp" 
                alt="Tippgeber Prämie ImmoM Carsten Meyer" 
                className={styles.heroImg} 
              />
              <div className={styles.imageFloatingBadge}>
                <Gift size={20} className={styles.goldGiftIcon} />
                <div>
                  <strong>Attraktive Prämie</strong>
                  <span>Sichern Sie sich Ihren Anteil</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Steps Process */}
        <div className={styles.stepsSection}>
          <div className={styles.stepsHeader}>
            <h3 className={styles.stepsMainTitle}>In 3 einfachen Schritten zur Prämie</h3>
            <p className={styles.stepsMainSubtitle}>Unkompliziert, transparent und fair abgewickelt.</p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepBadge}>01</div>
              <h4 className={styles.stepTitle}>Tipp einreichen</h4>
              <p className={styles.stepDesc}>
                Klicken Sie auf „Tipp einreichen“ und füllen Sie das kurze Online-Formular aus – oder rufen Sie uns direkt an.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepBadge}>02</div>
              <h4 className={styles.stepTitle}>Diskrete Kontaktaufnahme</h4>
              <p className={styles.stepDesc}>
                Wir nehmen feinfühlig, professionell und diskret Kontakt zum Eigentümer der Immobilie auf.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepBadge}>03</div>
              <h4 className={styles.stepTitle}>Prämie erhalten</h4>
              <p className={styles.stepDesc}>
                Nach erfolgreicher notarieller Beurkundung & Vermittlung wird Ihre Prämie von bis zu 5.000 € direkt ausgezahlt.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Contact CTA Box */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <h3>Möchten Sie Ihren Tipp lieber telefonisch besprechen?</h3>
            <p>Rufen Sie uns direkt an oder schreiben Sie uns eine E-Mail – wir beraten Sie jederzeit gerne persönlich.</p>
          </div>
          <div className={styles.ctaActions}>
            <Button variant="accent" onClick={handleOpenModal} className={styles.ctaSubmitBtn}>
              <Sparkles size={16} />
              <span>Tipp online melden</span>
            </Button>
            <a href="tel:050218601001" className={styles.contactBadgeLink}>
              <Phone size={16} />
              <span>05021 - 860 10 01</span>
            </a>
            <a href="mailto:mail@immom.eu?subject=Tippgeber%20Hinweis%20Immobilienverkauf" className={styles.contactBadgeLinkMail}>
              <Mail size={16} />
              <span>mail@immom.eu</span>
            </a>
          </div>
        </div>

      </div>

      {/* ──────────────── POPUP MODAL FÜR TIPPGEBER FORMULAR ──────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className={styles.modalBackdrop} onClick={handleCloseModal}>
            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={styles.modalHeader}>
                <div className={styles.modalHeaderLeft}>
                  <div className={styles.modalIconBox}>
                    <Coins size={24} />
                  </div>
                  <div>
                    <span className={styles.modalTag}>Tippgeber-Formular</span>
                    <h3 className={styles.modalTitle}>Immobilien-Tipp einreichen</h3>
                  </div>
                </div>
                <button className={styles.modalCloseBtn} onClick={handleCloseModal} aria-label="Schließen">
                  <X size={22} />
                </button>
              </div>

              {/* Modal Body */}
              <div className={styles.modalBody}>
                {isSubmitted ? (
                  <div className={styles.successState}>
                    <div className={styles.successIcon}>
                      <CheckCircle2 size={56} />
                    </div>
                    <h3>Vielen Dank für Ihren Tipp!</h3>
                    <p>
                      Wir haben Ihren Hinweis erfolgreich empfangen und werden die Angaben diskret und sorgfältig prüfen. 
                      Sobald ein Alleinauftrag zustande kommt und das Objekt erfolgreich beurkundet ist, setzen wir uns umgehend bezüglich der Prämienauszahlung mit Ihnen in Verbindung.
                    </p>
                    <div className={styles.successNote}>
                      <ShieldCheck size={18} />
                      <span>Ihre Angaben werden streng vertraulich und nach DSGVO behandelt.</span>
                    </div>
                    <div style={{ marginTop: '1.75rem' }}>
                      <Button variant="primary" onClick={handleCloseModal}>
                        Fenster schließen
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.modalForm}>
                    {errorMessage && (
                      <div className={styles.errorAlert}>
                        <AlertCircle size={18} />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Section 1: Tippgeber Kontaktdaten */}
                    <div className={styles.formSection}>
                      <div className={styles.sectionHeader}>
                        <User size={18} className={styles.sectionIcon} />
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
                            placeholder="z.B. Weserstraße 12"
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

                    {/* Section 2: Objektdaten */}
                    <div className={styles.formSection}>
                      <div className={styles.sectionHeader}>
                        <Building2 size={18} className={styles.sectionIcon} />
                        <h4>2. Angaben zur empfohlenen Immobilie</h4>
                      </div>

                      <div className={styles.formRow2}>
                        <div className={styles.formGroup}>
                          <label>Adresse / Straße des Objekts *</label>
                          <input 
                            type="text" 
                            placeholder="z.B. Hauptstraße 24"
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
                        <label>Zusätzliche Hinweise (optional)</label>
                        <textarea 
                          rows={3}
                          placeholder="z.B. Verkaufszeitpunkt, Besonderheiten des Hauses, Zustand..."
                          value={formData.hinweise}
                          onChange={(e) => setFormData({ ...formData, hinweise: e.target.value })}
                          className={styles.textarea}
                        />
                      </div>
                    </div>

                    {/* Turnstile Widget */}
                    <div style={{ margin: '1rem 0 1.25rem', display: 'flex', justifyContent: 'center' }}>
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
                        Ich stimme der vertraulichen Verarbeitung meiner Angaben zu. Mein Tipp wird diskret behandelt.
                      </span>
                    </label>

                    {/* Submit Button */}
                    <div className={styles.modalSubmitRow}>
                      <Button 
                        type="submit" 
                        variant="accent" 
                        disabled={isSubmitting || !turnstileToken || !formData.datenschutz}
                        className={styles.submitBtn}
                      >
                        <Sparkles size={18} />
                        <span>{isSubmitting ? 'Wird übermittelt...' : 'Tipp jetzt vertraulich absenden'}</span>
                        <Send size={16} />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Tippgeber;
