import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Maximize2, X } from 'lucide-react';
import styles from './References.module.css';
import Button from './ui/Button';

export const References: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const referenzen = [
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/EFH-Nienburg-1024x768_ergebnis.webp',
      title: 'Klassisches Einfamilienhaus',
      location: 'Nienburg',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/Bungalow-Marklohe-1024x614_ergebnis.webp',
      title: 'Moderner Winkelbungalow',
      location: 'Marklohe',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/WH-Husum-2-300x225_ergebnis.webp',
      title: 'Familienfreundliches Wohnhaus',
      location: 'Husum',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/MFH-8WE-Verden-300x201_ergebnis.webp',
      title: 'Mehrfamilienhaus (8 WE)',
      location: 'Verden',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/Bungalow-Lindwedel-1024x768_ergebnis.webp',
      title: 'Bungalow mit Einliegerwohnung',
      location: 'Lindwedel',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/Stadthaus-Husum-1-1024x768_ergebnis.webp',
      title: 'Großzügiges Stadthaus',
      location: 'Husum',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/01a-Zufahrt-rechts-2-1024x768_ergebnis.webp',
      title: 'Gepflegtes Einfamilienhaus',
      location: 'Lemke / Marklohe',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/5_ergebnis.webp',
      title: 'Großes Wohnhaus mit Naturgarten',
      location: 'Nienburg',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/Ansicht-Eingang-768x576_ergebnis.webp',
      title: 'Repräsentatives Architektenhaus',
      location: 'Husum',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/Bungalow-mit-ELW-Obernkirchen-300x225_ergebnis.webp',
      title: 'Bungalow mit Einliegerwohnung',
      location: 'Obernkirchen',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/Stadthaus-Marklohe-OT.Lemke-1-300x225_ergebnis.webp',
      title: 'Stadthaus in ruhiger Lage',
      location: 'Lemke',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/Lindwedel-ImHolze-1-300x169_ergebnis.webp',
      title: 'Neuwertiges Einfamilienhaus',
      location: 'Lindwedel',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/Exkl.Einzigartig-Balge-02-768x576_ergebnis.webp',
      title: 'Exklusiver Landsitz',
      location: 'Balge',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/EFH-Nienburg-1_ergebnis.webp',
      title: 'Massives Klinker-Einfamilienhaus',
      location: 'Nienburg',
    },
  ];

  const partners = [
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Partner/Makler-Empfehlung-de-Siegel-a3715c37-84ef8e6f%40248ll-1-150x150_ergebnis.webp',
      alt: 'Makler Empfehlung Siegel',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Partner/BVFI_Siegel-300-dpi-PNG-150x150_ergebnis.webp',
      alt: 'BVFI Siegel',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Partner/Emblem-2024-PMA%C2%AE-Fachtraining-fuer-Immobilienmakler-gross-transparent-150x150_ergebnis.webp',
      alt: 'PMA® Fachtraining',
    },
    {
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Partner/Gewerbeverein_logo-trans-150x150_ergebnis.webp',
      alt: 'Gewerbeverein',
    },
  ];

  const handleCtaClick = () => {
    const el = document.querySelector('#kontakt');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="referenzen" className={`${styles.referencesSection} section-padding`}>
      <div className={`${styles.container} container`}>
        
        {/* Section Header */}
        <div className={styles.headerRow}>
          <div className={styles.titleArea}>
            <span className="eyebrow">Referenzobjekte</span>
            <h2 className={styles.heading}>
              Erfahrung aus der Region. <br />
              <span className="highlight-gold">Für Immobilien in der Region.</span>
            </h2>
          </div>
          <div className={styles.descArea}>
            <p>
              Ob Einfamilienhaus, Eigentumswohnung, Mehrfamilienhaus oder Grundstück – wir kennen die regionalen 
              Märkte und wissen, worauf Käufer achten.
            </p>
            <p>
              Unsere Erfahrung aus zahlreichen Immobilienprojekten in Nienburg/Weser, Marklohe und Umgebung 
              hilft Ihnen dabei, fundierte Entscheidungen zu treffen.
            </p>
          </div>
        </div>

        {/* References Slider */}
        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrackWrapper}>
            <div className={styles.sliderTrack}>
              {/* Render references twice to make it infinite */}
              {[...referenzen, ...referenzen].map((item, index) => (
                <div 
                  key={index} 
                  className={styles.refCard}
                  onClick={() => setActiveImage(item.img)}
                >
                  <div className={styles.imageWrapper}>
                    <img src={item.img} alt={item.title} className={styles.refImage} loading="lazy" />
                    <div className={styles.overlay}>
                      <Maximize2 size={20} className={styles.zoomIcon} />
                    </div>
                  </div>
                  <div className={styles.refInfo}>
                    <span className={styles.refTitle}>{item.title}</span>
                    <div className={styles.location}>
                      <MapPin size={12} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action & Partner Logos */}
        <div className={styles.footerRow}>
          <div className={styles.actionButtons}>
            <Button variant="primary" onClick={handleCtaClick} className={styles.cta}>
              <span>Regionale Immobilienberatung anfragen</span>
              <ArrowRight size={16} />
            </Button>
            
            <a 
              href="https://search.google.com/local/writereview?placeid=ChIJUcP4H1WMsEcReDcsryWewuo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.googleBadgeBtn}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google Logo" 
                className={styles.googleBadgeIcon} 
              />
              <div className={styles.googleBadgeText}>
                <span className={styles.badgeStars}>★★★★★</span>
                <span className={styles.badgeLinkText}>Auf Google bewerten</span>
              </div>
            </a>
          </div>

          <div className={styles.partnerSection}>
            <span className={styles.partnerTitle}>Auswahl unserer Partner & Auszeichnungen</span>
            <div className={styles.partnersGrid}>
              {partners.map((partner, index) => (
                <div key={index} className={styles.partnerLogoWrapper}>
                  <img src={partner.img} alt={partner.alt} className={styles.partnerLogo} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Referenz-Bilder */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <button className={styles.closeBtn} onClick={() => setActiveImage(null)}>
              <X size={32} />
            </button>
            <motion.img 
              src={activeImage} 
              alt="Referenzobjekt vergrößert" 
              className={styles.lightboxImage}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default References;
