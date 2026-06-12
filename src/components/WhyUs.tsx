import React from 'react';
import { motion } from 'framer-motion';
import { Check, Award } from 'lucide-react';
import styles from './WhyUs.module.css';

export const WhyUs: React.FC = () => {
  const points = [
    'Über 30 Jahre Erfahrung in der Immobilienbranche',
    'Spezialisiert auf den Verkauf und die Vermittlung',
    'Persönliche Beratung auf Augenhöhe',
    'Regionale Marktkenntnis in Nienburg/Weser, Marklohe und Umgebung',
    'Faire, professionelle und seriöse Begleitung',
  ];

  return (
    <section id="ueber-uns" className={`${styles.whyUsSection} section-padding`}>
      <div className={`${styles.container} container`}>
        
        {/* Left Column: Content */}
        <motion.div 
          className={styles.textCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <span className="eyebrow">Ihre Vorteile bei uns</span>
          <h2 className={styles.heading}>
            Immobilienberatung mit Erfahrung, Nähe und ehrlicher Einschätzung.
          </h2>
          
          <div className={styles.description}>
            <p>
              Seit über 30 Jahren begleiten wir Eigentümer beim Verkauf und der Vermietung ihrer Immobilien. 
              Unser Anspruch ist eine Vermarktung, die verständlich, persönlich und verlässlich ist.
            </p>
            <p>
              Wir kennen die Region, die Käufergruppen und die Besonderheiten des lokalen Marktes. 
              Genau dieses Wissen macht den Unterschied, wenn aus einer Immobilie ein erfolgreicher Verkauf 
              werden soll.
            </p>
          </div>

          <ul className={`${styles.bulletList} checkmark-list`}>
            {points.map((point, index) => (
              <motion.li 
                key={index} 
                className="checkmark-item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.checkmarkIconWrapper}>
                  <Check className="checkmark-icon" size={16} />
                </div>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column: Executive Profile Card */}
        <motion.div 
          className={styles.visualCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
        >
          <div className={styles.profileCard}>
            <div className={styles.avatarWrapper}>
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/profile_32106_ergebnis.webp" 
                alt="Carsten Meier" 
                className={styles.avatarImage}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            
            <div className={styles.profileInfo}>
              <h3 className={styles.profileName}>Carsten Meier</h3>
              <p className={styles.profileTitle}>Inhaber & Immobilienmakler</p>
              
              <div className={styles.profileDivider} />
              
              <div className={styles.experienceBadge}>
                <Award className={styles.badgeIcon} size={18} />
                <span>Über 30 Jahre Erfahrung</span>
              </div>
              
              <p className={styles.profileQuote}>
                „Eine ehrliche Einschätzung ist das Fundament für jeden erfolgreichen Verkauf.“
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyUs;
