import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Mail, Phone, Gift } from 'lucide-react';
import styles from './Tippgeber.module.css';

export const Tippgeber: React.FC = () => {
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
            Melden Sie uns Ihren Tipp – nach erfolgreichem Verkauf belohnen wir Ihre Empfehlung direkt!
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
              Ob Nachbarn, Bekannte, Arbeitskollegen oder Verwandte – verhilft Ihr Hinweis zum erfolgreichen Verkauf einer Immobilie über ImmoM / CM-Immobilien, erhalten Sie eine attraktive Prämie auf Ihr Konto.
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
              Melden Sie uns Ihren Hinweis ganz einfach per E-Mail, Telefon oder über unser Kontaktformular.
            </p>
          </motion.div>

          <motion.div 
            className={styles.stepCard}
            whileHover={{ y: -5 }}
          >
            <div className={styles.stepNumber}>02</div>
            <h3 className={styles.stepTitle}>Kontaktaufnahme</h3>
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

        {/* CTA Bar */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <h3>Sie kennen ein verkaufsbereites Objekt?</h3>
            <p>Sprechen Sie uns direkt an – wir behandeln jeden Tipp auf Wunsch absolut vertraulich.</p>
          </div>
          <div className={styles.ctaActions}>
            <a href="tel:050218601001" className={styles.contactBadgeLink}>
              <Phone size={16} />
              <span>05021 - 860 10 01</span>
            </a>
            <a href="mailto:mail@immom.eu?subject=Tippgeber%20Hinweis%20Immobilienverkauf" className={styles.contactBadgeLink} style={{ background: 'var(--color-accent)', color: '#071B33', borderColor: 'var(--color-accent)' }}>
              <Mail size={16} />
              <span>Tipp per Mail senden</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Tippgeber;
