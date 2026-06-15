import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Download, FileText } from 'lucide-react';
import styles from './LeadMagnet.module.css';
import Button from './ui/Button';

export const LeadMagnet: React.FC = () => {
  // Checklist Form State
  const [checklistEmail, setChecklistEmail] = useState('');
  const [isChecklistSubmitted, setIsChecklistSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Turnstile Widget initialisieren (mit Polling & StrictMode-Schutz)
  useEffect(() => {
    let interval: any;
    if (isChecklistSubmitted) return;

    const renderWidget = () => {
      if (turnstileRef.current && (window as any).turnstile && !widgetIdRef.current) {
        try {
          turnstileRef.current.innerHTML = "";
          widgetIdRef.current = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: "0x4AAAAAADlSZ4-_XRQN6CgC",
            callback: (token: string) => {
              setTurnstileToken(token);
              setErrorMessage("");
            },
            "expired-callback": () => setTurnstileToken(""),
            theme: "light",
          });
          if (interval) clearInterval(interval);
        } catch (e) {
          console.error("Turnstile render error:", e);
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
  }, [isChecklistSubmitted]);

  const handleChecklistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!turnstileToken) {
      setErrorMessage("Bitte bestätigen Sie den Spam-Schutz.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://friesescholzwebdesign.pages.dev/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source: "immom",
          type: "checklist",
          turnstileToken,
          email: checklistEmail
        })
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setIsChecklistSubmitted(true);
      } else {
        setErrorMessage(resData.message || "Es gab einen Fehler beim Absenden. Bitte versuchen Sie es erneut.");
      }
    } catch (err: any) {
      setErrorMessage("Verbindungsfehler zum E-Mail-Server. Bitte überprüfen Sie Ihre Internetverbindung.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="checkliste" className={`${styles.leadSection} section-padding`}>
      <div className={`${styles.container} container`}>
        
        {/* Left Column: 3D PDF Mockup */}
        <div className={styles.mockupCol}>
          <div className={styles.bookContainer}>
            <div className={styles.bookMockup}>
              <div className={styles.bookGlow} />
              <div className={styles.bookCover}>
                <div className={styles.bookHeader}>
                  <span className={styles.brandBadge}>CM-Immobilien</span>
                  <span className={styles.categoryBadge}>Ratgeber</span>
                </div>
                <div className={styles.bookBody}>
                  <FileText className={styles.bookIcon} size={44} />
                  <h3 className={styles.bookTitle}>
                    Checkliste <br />
                    <span className={styles.goldText}>Immobilien-</span> <br />
                    <span>verkauf</span>
                  </h3>
                  <p className={styles.bookSubtitle}>
                    10 Fehler vermeiden & den besten Preis erzielen
                  </p>
                </div>
                <div className={styles.bookFooter}>
                  <span>100% Kostenlos</span>
                  <span>PDF Ratgeber</span>
                </div>
              </div>
              {/* Stacked pages effect behind the cover */}
              <div className={`${styles.pageBehind} ${styles.page1}`} />
              <div className={`${styles.pageBehind} ${styles.page2}`} />
            </div>
          </div>
        </div>

        {/* Right Column: Download Form & Benefits */}
        <div className={styles.magnetCol}>
          <div className={styles.magnetContent}>
            <span className="eyebrow">Exklusiver Ratgeber</span>
            <h2 className={styles.magnetHeading}>Kostenlose Checkliste für Eigentümer</h2>
            
            <p className={styles.magnetText}>
              Sie planen den Verkauf Ihrer Immobilie oder möchten sich erst einmal unverbindlich informieren? 
              Unsere ausführliche Checkliste leitet Sie Schritt für Schritt durch den gesamten Verkaufsprozess, 
              hilft Ihnen bei der rechtssicheren Beschaffung aller Unterlagen und bewahrt Sie vor teuren Fehlern.
            </p>

            <div className={styles.benefitsContainer}>
              <h4>Was Sie in diesem Ratgeber erwartet:</h4>
              <ul className={styles.featuresList}>
                <li>
                  <CheckCircle2 size={18} className={styles.featureIcon} />
                  <div className={styles.benefitText}>
                    <strong>Dokumenten-Fahrplan:</strong>
                    <span> Welche Unterlagen Sie wann parat haben müssen (Grundbuch, Energieausweis, Teilungserklärung).</span>
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className={styles.featureIcon} />
                  <div className={styles.benefitText}>
                    <strong>Wertsteigerung mit System:</strong>
                    <span> Einfache Kniffe, wie Sie den ersten Eindruck bei Besichtigungen massiv aufwerten.</span>
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className={styles.featureIcon} />
                  <div className={styles.benefitText}>
                    <strong>Teure Verhandlungsfehler vermeiden:</strong>
                    <span> Typische Argumente von Käufern entkräften und den optimalen Verkaufspreis durchsetzen.</span>
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className={styles.featureIcon} />
                  <div className={styles.benefitText}>
                    <strong>Rechtssicheres Inserieren:</strong>
                    <span> Pflichtangaben nach dem GEG richtig einpflegen, um Abmahnungen zu verhindern.</span>
                  </div>
                </li>
              </ul>
            </div>

            <AnimatePresence mode="wait">
              {!isChecklistSubmitted ? (
                <form onSubmit={handleChecklistSubmit} className={styles.magnetForm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className={styles.magnetFormGroup}>
                    <input 
                      type="email" 
                      placeholder="Ihre E-Mail-Adresse eingeben" 
                      value={checklistEmail}
                      onChange={(e) => setChecklistEmail(e.target.value)}
                      className={styles.magnetInput}
                      required 
                    />
                    <Button type="submit" variant="primary" className={styles.magnetBtn} disabled={isSubmitting || !turnstileToken}>
                      <Download size={18} />
                      <span>Jetzt anfordern</span>
                    </Button>
                  </div>
                  
                  {/* Turnstile Widget */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div ref={turnstileRef}></div>
                  </div>
                  {errorMessage && <p style={{ color: '#ef4444', textAlign: 'center', margin: '0', fontSize: '0.875rem' }}>{errorMessage}</p>}

                  <span className={styles.magnetHint} style={{ textAlign: 'center' }}>Direkt per E-Mail in Ihr Postfach • 100% kostenlos • Kein Spam</span>
                </form>
              ) : (
                <motion.div 
                  className={styles.magnetSuccess}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.successHeader}>
                    <CheckCircle2 size={32} className={styles.successCheckIcon} />
                    <div>
                      <h4>Checkliste ist auf dem Weg!</h4>
                      <p>Wir haben den Ratgeber an <strong>{checklistEmail}</strong> versendet. Bitte prüfen Sie Ihr E-Mail-Postfach.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeadMagnet;
