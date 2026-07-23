import React from 'react';
import { MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './LocationNienburg.module.css';
import Button from './ui/Button';
import ValuationForm from './ValuationForm';
import { getLocationConfig, type LocationConfig } from '../data/locationData';

interface LocationPageProps {
  locationId?: string;
  config?: LocationConfig;
}

export const LocationPage: React.FC<LocationPageProps> = ({ locationId = 'nienburg', config }) => {
  const loc = config || getLocationConfig(locationId);

  // References showcase (reuses high quality reference images)
  const referenceList = [
    {
      title: 'Klassisches Einfamilienhaus',
      sub: `Erfolgreich vermittelt zum Bestpreis in ${loc.shortName}`,
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/EFH-Nienburg-1024x768_ergebnis.webp'
    },
    {
      title: 'Großes Wohnhaus mit Naturgarten',
      sub: `Zügige Abwicklung für Eigentümer in ${loc.shortName}`,
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/5_ergebnis.webp'
    },
    {
      title: 'Massives Klinker-Einfamilienhaus',
      sub: `Diskrete Off-Market Vermittlung in ${loc.shortName}`,
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Referenzen/EFH-Nienburg-1_ergebnis.webp'
    }
  ];

  const handleScrollToValuation = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(loc.cardWrapperId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.nienburgPage}>
      
      {/* 1. Hero Section with Full-Width Background Image */}
      <section 
        className={styles.heroSection}
        style={loc.heroBgImg ? { backgroundImage: `url("${loc.heroBgImg}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        <div className={styles.heroOverlay} />
        
        <div className={`${styles.heroContent} container`}>
          <span className={styles.eyebrowBadge}>
            <MapPin size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
            {loc.heroEyebrow}
          </span>
          
          <h1 className={styles.heroTitle}>
            {loc.heroTitle} <span>{loc.titleSpan}</span>
          </h1>
          
          <p className={styles.heroSubline}>
            {loc.heroSubline}
          </p>

          <div className={styles.trustBadgesRow}>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} style={{ color: 'var(--color-accent)' }} />
              <span>Über 25 Jahre Marktkenntnis</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} style={{ color: 'var(--color-accent)' }} />
              <span>100% Gratis Wertermittlung</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={16} style={{ color: 'var(--color-accent)' }} />
              <span>Persönlich durch Carsten Meyer</span>
            </div>
          </div>

          <div className={styles.heroCtas}>
            <a href={`#${loc.cardWrapperId}`} onClick={handleScrollToValuation}>
              <Button variant="accent">
                <span>Immobilie in {loc.shortName} gratis bewerten</span>
                <ArrowRight size={18} />
              </Button>
            </a>
            <a href="tel:050218601001" className={styles.phoneBtnLink}>
              <Phone size={18} />
              <span>05021 - 860 10 01</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Über Carsten Meyer Section */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutVisualWrapper}>
              <img 
                src={loc.aboutImg || "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/thumb_die-altstadt_ergebnis.webp"} 
                alt={`Impression ${loc.shortName}`} 
                className={styles.altstadtBgImg} 
              />
              <div className={styles.profileCardFloat}>
                <img 
                  src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/profile_32106_ergebnis.webp" 
                  alt="Carsten Meyer" 
                  className={styles.profileThumb} 
                />
                <div className={styles.profileInfo}>
                  <strong>Carsten Meyer</strong>
                  <span>Gründer & Ihr Makler vor Ort</span>
                </div>
              </div>
            </div>

            <div className={styles.aboutContent}>
              <span className="eyebrow">Persönlich & Nah</span>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left', margin: '0 0 1rem' }}>
                {loc.aboutTitle}
              </h2>
              <p className={styles.aboutText}>
                {loc.aboutText}
              </p>
              
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span>Fundierte Einwertung ohne künstliche Lock-Angebote</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span>Diskrete Käuferansprache aus unserer regionalen Datenbank</span>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span>Rechtssichere Vorbereitung bis zum erfolgreichen Notartermin</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <a href={`#${loc.cardWrapperId}`} onClick={handleScrollToValuation}>
                  <Button variant="primary">
                    <span>Immobilie in {loc.shortName} jetzt gratis bewerten</span>
                    <ArrowRight size={16} />
                  </Button>
                </a>
                <a href="tel:050218601001" className={styles.phoneBtnLink} style={{ color: 'var(--color-primary)', borderColor: 'rgba(7, 27, 51, 0.2)', background: 'transparent' }}>
                  <Phone size={16} />
                  <span>05021 - 860 10 01</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Region Banner Section */}
      <section className={styles.weserBanner}>
        <div className="container">
          <div className={styles.weserGrid}>
            <div className={styles.weserText}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {loc.bannerTag}
              </span>
              <h2>{loc.bannerTitle}</h2>
              <p>
                {loc.bannerText}
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={`#${loc.cardWrapperId}`} onClick={handleScrollToValuation}>
                  <Button variant="accent">
                    <span>Jetzt Marktwert in {loc.shortName} kostenlos prüfen</span>
                    <ArrowRight size={16} />
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <img 
                src={loc.bannerImg || "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/Nienburg-Blog-13-1024x576_ergebnis.webp"} 
                alt={`Impression ${loc.shortName}`} 
                className={styles.weserImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Wohnlagen Showcase */}
      <section className={styles.locationsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">{loc.showcaseEyebrow}</span>
            <h2 className={styles.sectionTitle}>{loc.showcaseTitle}</h2>
            <p className={styles.sectionDesc}>
              {loc.showcaseDesc}
            </p>
          </div>

          <div className={styles.locationsGrid}>
            <div className={styles.locationCard}>
              <div className={styles.locationCardImgWrapper}>
                <img 
                  src={loc.showcaseImg1 || "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/images%20(2)_ergebnis.webp"} 
                  alt={`${loc.shortName} Wohnquartiere`} 
                  className={styles.locationCardImg}
                />
              </div>
              <div className={styles.locationCardBody}>
                <h3>Familienfreundliche Wohnquartiere</h3>
                <p>
                  Einfamilienhäuser und Reihenhäuser in ruhigen Siedlungen mit hervorragender Anbindung an Schulen, Kindergärten und Hauptverkehrswege.
                </p>
              </div>
            </div>

            <div className={styles.locationCard}>
              <div className={styles.locationCardImgWrapper}>
                <img 
                  src={loc.showcaseImg2 || "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/webp%20(2)_ergebnis.webp"} 
                  alt={`${loc.shortName} Innenstadt & Flair`} 
                  className={styles.locationCardImg}
                />
              </div>
              <div className={styles.locationCardBody}>
                <h3>Zentrumsnahes Wohnen mit Flair</h3>
                <p>
                  Kurze Wege zum Wochenmarkt, Kultur & Gastronomie. Sehr beliebt bei Kapitalanlegern und Immobilienkäufern im besten Alter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Referenzen Section */}
      <section className={styles.referencesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Erfolgreiche Verkäufe</span>
            <h2 className={styles.sectionTitle}>{loc.refTitle}</h2>
            <p className={styles.sectionDesc}>
              {loc.refDesc}
            </p>
          </div>

          <div className={styles.refGrid}>
            {referenceList.map((ref, idx) => (
              <div key={idx} className={styles.refCard}>
                <div className={styles.refImgWrapper}>
                  <img src={ref.img} alt={ref.title} className={styles.refImg} />
                  <div className={styles.verkauftRibbon}>VERKAUFT</div>
                </div>
                <div className={styles.refBody}>
                  <h4>{ref.title}</h4>
                  <p>{ref.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SINGLE Valuation Form Section Card Container */}
      <section id={loc.cardWrapperId} className={styles.valuationSection}>
        <div className="container">
          <div className={styles.valuationCardWrapper}>
            <div className={styles.valuationCardHeader}>
              <span className={styles.eyebrowBadgeLight}>{loc.valuationEyebrow}</span>
              <h2>{loc.valuationTitle}</h2>
              <p>{loc.valuationDesc}</p>
            </div>
            <ValuationForm />
          </div>
        </div>
      </section>

    </div>
  );
};

export default LocationPage;
