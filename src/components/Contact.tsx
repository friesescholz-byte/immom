import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import styles from './Contact.module.css';
import Button from './ui/Button';
import LegalModal from './LegalModal';
import ValuationForm from './ValuationForm';

interface ContactProps {
  currentPage: 'home' | 'portfolio' | 'admin' | 'location-nienburg';
  setCurrentPage: (page: 'home' | 'portfolio' | 'admin' | 'location-nienburg') => void;
}

export const Contact: React.FC<ContactProps> = ({ currentPage, setCurrentPage }) => {
  const [modalType, setModalType] = useState<'impressum' | 'datenschutz' | null>(null);

  const handlePortfolioClick = () => {
    setCurrentPage('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+4950218601001';
  };

  const handleNavClick = (target: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="kontakt" className={styles.contactSection}>
      {/* Upper CTA Area */}
      {currentPage !== 'admin' && currentPage !== 'location-nienburg' && (
        <div id="bewertung" className={`${styles.ctaContainer} container section-padding`}>
          <motion.div 
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className={styles.infoSide}>
              <span className="eyebrow">Ihr nächster Schritt</span>
              <h2>Sie möchten wissen, was Ihre Immobilie wirklich wert ist?</h2>
              <p>
                Nutzen Sie unsere kostenlose, sekundenschnelle Online-Wertermittlung in wenigen Schritten oder kontaktieren Sie uns direkt für eine persönliche und kostenlose Beratung vor Ort.
              </p>
              
              <div className={styles.buttonGroup}>
                <Button variant="accent" onClick={handlePortfolioClick}>
                  <span>Jetzt Portfolio ansehen</span>
                  <ArrowRight size={16} />
                </Button>
                <Button variant="secondary" onClick={handlePhoneClick} className={styles.phoneBtn}>
                  <Phone size={18} />
                  <span>Telefonisch beraten</span>
                </Button>
              </div>
            </div>

            <div className={styles.formSide}>
              <ValuationForm />
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Footer Info */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            
            {/* Col 1: About */}
            <div className={styles.footerCol}>
              <h3>ImmoM / CM-Immobilien</h3>
              <p className={styles.aboutText}>
                Seit über 30 Jahren sind wir mit Liebe und Leidenschaft in der Immobilienbranche tätig. 
                Als Ihr Partner stehen wir Ihnen mit offenen Ohren für Ihre Wünsche und Vorstellungen zur Seite.
              </p>
              <div className={styles.logoWrapper}>
                <img 
                  src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/_01-Logo-ImmoM-IhrMaklerVorOrt_20250722-plast_ergebnis.webp" 
                  alt="ImmoM Logo" 
                  className={styles.footerLogo}
                />
              </div>
            </div>

            {/* Col 2: Contact Details */}
            <div className={styles.footerCol}>
              <h3>Kontakt & Büro</h3>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={18} className={styles.footerIcon} />
                  <div>
                    <span>Postfach 1109, 31607 Marklohe</span>
                    <span className={styles.subText}>Büro: An den Teichen 30, 31608 Marklohe</span>
                  </div>
                </li>
                <li>
                  <Phone size={18} className={styles.footerIcon} />
                  <a href="tel:+4950218601001" className={styles.contactLink}>+49 5021 8601001</a>
                </li>
                <li>
                  <Mail size={18} className={styles.footerIcon} />
                  <a href="mailto:mail@immom.eu" className={styles.contactLink}>mail@immom.eu</a>
                </li>
              </ul>
            </div>

            {/* Col 3: Navigation Links */}
            <div className={styles.footerCol}>
              <h3>Navigation</h3>
              <ul className={styles.linksList}>
                <li><a href="#start" onClick={(e) => { e.preventDefault(); handleNavClick('#start'); }}>Startseite</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handlePortfolioClick(); }}>Aktuelle Angebote</a></li>
                <li><a href="#bewertung" onClick={(e) => { e.preventDefault(); handleNavClick('#bewertung'); }}>Immobilie bewerten</a></li>
                <li><a href="#referenzen" onClick={(e) => { e.preventDefault(); handleNavClick('#referenzen'); }}>Referenzen</a></li>
              </ul>
            </div>

            {/* Col 4: Google Reviews */}
            <div className={styles.footerCol}>
              <h3>Bewertungen</h3>
              <div className={styles.googleReviewCard}>
                <div className={styles.googleHeader}>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                    alt="Google Logo" 
                    className={styles.googleIcon} 
                  />
                  <div className={styles.googleMeta}>
                    <span className={styles.googleName}>Google Rezensionen</span>
                    <div className={styles.googleStars}>★★★★★</div>
                  </div>
                </div>
                <p className={styles.googleDesc}>
                  Helfen Sie uns, noch besser zu werden, oder lesen Sie das Feedback unserer Kunden.
                </p>
                <a 
                  href="https://search.google.com/local/writereview?placeid=ChIJUcP4H1WMsEcReDcsryWewuo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.googleReviewBtn}
                >
                  <span>Rezension schreiben</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

          </div>

          {/* Copyright & Legal Bar */}
          <div className={styles.bottomBar}>
            <p className={styles.copy}>
              © {new Date().getFullYear()} ImmoM / CM-Immobilien. Alle Rechte vorbehalten.
            </p>
            <div className={styles.legalLinks}>
              <button onClick={() => setModalType('impressum')}>Impressum</button>
              <span className={styles.separator}>•</span>
              <button onClick={() => setModalType('datenschutz')}>Datenschutz</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <AnimatePresence>
        {modalType && (
          <LegalModal 
            isOpen={!!modalType} 
            type={modalType} 
            onClose={() => setModalType(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
