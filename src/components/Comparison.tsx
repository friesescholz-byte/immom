import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import styles from './Comparison.module.css';
import Button from './ui/Button';
import Card from './ui/Card';

export const Comparison: React.FC = () => {
  const automatedPoints = [
    'Keine Besichtigung der Immobilie',
    'Besonderheiten werden oft nicht erkannt',
    'Modernisierungen bleiben häufig unberücksichtigt',
    'Ergebnis ist meist nur ein grober Richtwert',
  ];

  const personalPoints = [
    'Individuelle Betrachtung Ihrer Immobilie',
    'Regionale Marktkenntnis fließt ein',
    'Wertsteigerungspotenziale werden erkannt',
    'Realistische Grundlage für Verkauf oder Entscheidung',
  ];

  const handleCtaClick = () => {
    const el = document.querySelector('#bewertung');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`${styles.comparisonSection} section-padding`}>
      <div className={`${styles.container} container`}>
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">Direkter Vergleich</span>
          <h2>Online-Wert oder echte Einschätzung? Der Unterschied ist entscheidend.</h2>
          <p>
            Warum ein Algorithmus niemals die Erfahrung eines Experten vor Ort ersetzen kann.
          </p>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {/* Card 1: Automated */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <Card variant="flat" className={styles.compCard}>
              <div className={styles.cardHeader}>
                <h3>Automatisierte Bewertung</h3>
                <span className={styles.badgeMuted}>Online-Schätzung</span>
              </div>
              
              <ul className={styles.pointsList}>
                {automatedPoints.map((point, index) => (
                  <li key={index} className={styles.pointItem}>
                    <X className={styles.xIcon} size={20} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Card 2: Personal (Prominent) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
          >
            <Card variant="hover" className={`${styles.compCard} ${styles.prominentCard}`}>
              {/* Highlight Tag */}
              <div className={styles.highlightTag}>Empfohlen</div>
              
              <div className={styles.cardHeader}>
                <h3>Persönliche Bewertung</h3>
                <span className={styles.badgeAccent}>Experten-Analyse</span>
              </div>
              
              <ul className={styles.pointsList}>
                {personalPoints.map((point, index) => (
                  <li key={index} className={styles.pointItem}>
                    <Check className={styles.checkIcon} size={20} />
                    <strong>{point}</strong>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button variant="accent" onClick={handleCtaClick}>
            <span>Persönliche Bewertung sichern</span>
            <ArrowRight size={16} />
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default Comparison;
