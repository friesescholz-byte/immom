import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Info } from 'lucide-react';
import styles from './SalesPrep.module.css';
import Button from './ui/Button';

export const SalesPrep: React.FC = () => {
  const handleCtaClick = () => {
    const el = document.querySelector('#kontakt');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`${styles.salesPrepSection} section-padding`}>
      <div className={`${styles.container} container`}>
        
        {/* Left Column: Text & CTA */}
        <motion.div 
          className={styles.textCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <span className="eyebrow">Strategische Positionierung</span>
          <h2 className={styles.heading}>
            Der richtige Preis entscheidet über den Verkaufserfolg.
          </h2>
          <div className={styles.content}>
            <p>
              Ein zu hoher Angebotspreis schreckt Interessenten ab. Ein zu niedriger Preis verschenkt 
              bares Geld. Genau deshalb ist eine fundierte Bewertung der erste wichtige Schritt 
              für einen erfolgreichen Immobilienverkauf.
            </p>
            <p>
              Wir helfen Ihnen dabei, Ihre Immobilie marktgerecht zu positionieren – seriös, 
              professionell und mit dem Ziel, das bestmögliche Ergebnis für Sie zu erreichen.
            </p>
          </div>
          <Button variant="primary" onClick={handleCtaClick} className={styles.cta}>
            <span>Verkaufsberatung starten</span>
            <ArrowRight size={16} />
          </Button>
        </motion.div>

        {/* Right Column: Visual Price Strategy Graph (Interactive/Animated) */}
        <motion.div 
          className={styles.visualCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
        >
          <div className={styles.graphCard}>
            <div className={styles.graphHeader}>
              <TrendingUp size={20} className={styles.graphIcon} />
              <h4>Auswirkung des Angebotspreises</h4>
            </div>

            <div className={styles.graphBody}>
              {/* Scenario 1: Too High */}
              <div className={`${styles.scenario} ${styles.tooHigh}`}>
                <div className={styles.scenarioLabel}>
                  <span>Zu hoch (+20%)</span>
                  <strong>Lange Liegezeit</strong>
                </div>
                <div className={styles.barContainer}>
                  <motion.div 
                    className={styles.bar} 
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  />
                  <span className={styles.percentage}>15% Käuferinteresse</span>
                </div>
              </div>

              {/* Scenario 2: Optimal */}
              <div className={`${styles.scenario} ${styles.optimal}`}>
                <div className={styles.scenarioLabel}>
                  <span>Marktwert (Optimal)</span>
                  <strong>Bestes Ergebnis</strong>
                </div>
                <div className={styles.barContainer}>
                  <motion.div 
                    className={styles.bar} 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                  />
                  <span className={styles.percentage}>100% Käuferinteresse</span>
                </div>
              </div>

              {/* Scenario 3: Too Low */}
              <div className={`${styles.scenario} ${styles.tooLow}`}>
                <div className={styles.scenarioLabel}>
                  <span>Zu niedrig (-20%)</span>
                  <strong>Geld verschenkt</strong>
                </div>
                <div className={styles.barContainer}>
                  <motion.div 
                    className={styles.bar} 
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
                  />
                  <span className={styles.percentage}>Finanzieller Verlust</span>
                </div>
              </div>
            </div>

            <div className={styles.graphFooter}>
              <Info size={16} />
              <p>Eine professionelle Bewertung schützt Sie vor Vermögensverlusten.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SalesPrep;
