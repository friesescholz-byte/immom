import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';
import styles from './Problem.module.css';
import Button from './ui/Button';

export const Problem: React.FC = () => {
  const handleCtaClick = () => {
    const el = document.querySelector('#kontakt');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`${styles.problemSection} section-padding`}>
      <div className={`${styles.container} container`}>
        
        {/* Left Visual Card */}
        <motion.div 
          className={styles.visualCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div className={styles.imageCard}>
            <img 
              src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/ChatGPT%20Image%2012.%20Juni%202026%2C%2017_10_05_ergebnis.webp" 
              alt="Herausforderung Immobilienverkauf" 
              className={styles.bgImage}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className={styles.cardOverlay}>
              <AlertCircle className={styles.alertIcon} size={40} />
              <h4>Risiken beim Privatverkauf</h4>
              <p>Fehlende Unterlagen, unstrukturierte Besichtigungen und zähe Preisverhandlungen kosten Zeit und Geld.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Text Content */}
        <motion.div 
          className={styles.textCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
        >
          <span className="eyebrow">Herausforderung Vermarktung</span>
          <h2 className={styles.heading}>
            Viele Eigentümer unterschätzen den <span className="highlight-gold">Aufwand des Immobilienverkaufs.</span>
          </h2>
          <div className={styles.content}>
            <p>
              Ein erfolgreicher Verkauf erfordert weit mehr als nur ein Online-Inserat. Die Organisation von 
              Unterlagen, die Koordination von Besichtigungen, die Bonitätsprüfung von Interessenten und das 
              Führen von Verhandlungen kosten viel Zeit und Nerven.
            </p>
            <p>
              Wer seine Immobilie ohne professionelle Vermarktungsstrategie anbietet, verschenkt oft viel 
              Potenzial und riskierte langwierige Prozesse am Markt.
            </p>
          </div>
          <Button variant="secondary" onClick={handleCtaClick} className={styles.cta}>
            <span>Jetzt unverbindliche Beratung anfordern</span>
            <ArrowRight size={16} />
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default Problem;
