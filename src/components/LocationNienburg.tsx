import React from 'react';
import { MapPin, Phone, ArrowRight, Building, Award, ShieldCheck } from 'lucide-react';
import styles from './LocationNienburg.module.css';
import Button from './ui/Button';
import ValuationForm from './ValuationForm';
import type { Property } from './Portfolio';

interface LocationNienburgProps {
  properties: Property[];
  setCurrentPage: (page: 'home' | 'portfolio' | 'admin' | 'location-nienburg') => void;
}

export const LocationNienburg: React.FC<LocationNienburgProps> = ({ properties }) => {

  const galleryImages = [
    {
      url: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/csm_Marktplatz-Nienburg_0268aff2a2_ergebnis.webp',
      title: 'Historischer Marktplatz Nienburg',
      desc: 'Herzen der Stadt & Treffpunkt der Region',
      isLarge: true
    },
    {
      url: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/thumb_die-altstadt_ergebnis.webp',
      title: 'Charmanter Altstadtflair',
      desc: 'Fachwerk & begehrte Wohnlagen',
      isLarge: false
    },
    {
      url: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/Nienburg-Blog-13-1024x576_ergebnis.webp',
      title: 'Weser-Impressionen Nienburg',
      desc: 'Natur & Lebensqualität am Wasser',
      isLarge: false
    },
    {
      url: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/images%20(2)_ergebnis.webp',
      title: 'Gepflegte Wohngebiete',
      desc: 'Einfamilienhäuser & ruhige Familiensiedlungen',
      isLarge: true
    },
    {
      url: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/webp%20(2)_ergebnis.webp',
      title: 'Stadtnah & Grün',
      desc: 'Hervorragende Infrastruktur in Nienburg',
      isLarge: false
    }
  ];

  return (
    <div className={styles.nienburgPage}>
      
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrowBadge}>Standort Nienburg (Weser)</span>
            <h1 className={styles.heroTitle}>
              Ihr Immobilienmakler in <span>Nienburg</span> & Region
            </h1>
            <p className={styles.heroSubline}>
              Sie möchten eine Immobilie in Nienburg verkaufen, bewerten lassen oder suchen Ihr neues Zuhause? 
              Christian Menzel & das Team von ImmoM bieten Ihnen tiefgründige Marktkenntnis, persönliche Betreuung und eine verkaufsstarke Vermarktung zum Bestpreis.
            </p>
            <div className={styles.heroCtas}>
              <a href="#bewertung-nienburg">
                <Button variant="accent">
                  <span>Immobilie in Nienburg gratis bewerten</span>
                  <ArrowRight size={18} />
                </Button>
              </a>
              <a href="tel:050218601001" className={styles.phoneBtnLink}>
                <Phone size={18} />
                <span>05021 - 860 10 01</span>
              </a>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <img 
              src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/csm_Marktplatz-Nienburg_0268aff2a2_ergebnis.webp" 
              alt="Marktplatz Nienburg Weser" 
              className={styles.mainHeroImg} 
            />
            <div className={styles.heroBadgeFloat}>
              <MapPin size={20} style={{ color: 'var(--color-accent)' }} />
              <span>Über 25 Jahre Erfahrung in Nienburg & Umgebung</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gallery Section: Nienburg Impressionen */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={sectionHeaderStyle(styles)}>
            <span className="eyebrow">Impressionen</span>
            <h2 className={styles.sectionTitle}>Leben & Wohnen in Nienburg (Weser)</h2>
            <p className={styles.sectionDesc}>
              Nienburg verbindet historische Fachwerkatmosphäre, idyllische Lage an der Weser und eine hohe Lebensqualität. 
              Wir kennen jede Wohnlage und den Immobilienmarkt im Landkreis Nienburg im Detail.
            </p>
          </div>

          <div className={styles.galleryGrid}>
            {galleryImages.map((item, index) => (
              <div 
                key={index} 
                className={`${styles.galleryCard} ${item.isLarge ? styles.galleryCardLarge : ''}`}
              >
                <img src={item.url} alt={item.title} className={styles.galleryImg} />
                <div className={styles.galleryOverlay}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Local Advantage Cards */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <div className={sectionHeaderStyle(styles)}>
            <span className="eyebrow">Warum ImmoM Nienburg</span>
            <h2 className={styles.sectionTitle}>Ihre Vorteile mit ImmoM in Nienburg</h2>
          </div>

          <div className={styles.cardsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.iconWrapper}>
                <Building size={24} />
              </div>
              <h3 className={styles.cardTitle}>Lokale Marktkompetenz</h3>
              <p className={styles.cardText}>
                Wir betreuen aktuell {properties.filter(p => p.location.toLowerCase().includes('nienburg')).length > 0 ? properties.filter(p => p.location.toLowerCase().includes('nienburg')).length : 'mehrere'} exklusive Objekte in Nienburg und ermitteln den Höchstpreis für Ihre Immobilie.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.iconWrapper}>
                <Award size={24} />
              </div>
              <h3 className={styles.cardTitle}>Persönlicher Service</h3>
              <p className={styles.cardText}>
                Kein anonymes Maklerbüro: Christian Menzel begleitet Sie persönlich von der professionellen Wertermittlung bis zum rechtssicheren Notartermin.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.iconWrapper}>
                <ShieldCheck size={24} />
              </div>
              <h3 className={styles.cardTitle}>100% Gratis für Verkäufer</h3>
              <p className={styles.cardText}>
                Unsere Erstberatung und professionelle Immobilienbewertung vor Ort in Nienburg ist für Sie als Eigentümer vollkommen unverbindlich und kostenfrei.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Embedded Property Valuation Form */}
      <div id="bewertung-nienburg">
        <ValuationForm />
      </div>

    </div>
  );
};

// Helper for section header styling
function sectionHeaderStyle(styles: any) {
  return styles.sectionHeader;
}

export default LocationNienburg;
