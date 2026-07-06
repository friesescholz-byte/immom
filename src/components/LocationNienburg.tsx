import React from 'react';
import { MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './LocationNienburg.module.css';
import Button from './ui/Button';
import ValuationForm from './ValuationForm';
import type { Property } from './Portfolio';

interface LocationNienburgProps {
  properties?: Property[];
  setCurrentPage?: (page: 'home' | 'portfolio' | 'admin' | 'location-nienburg') => void;
}

export const LocationNienburg: React.FC<LocationNienburgProps> = () => {
  // References showcase
  const referenceList = [
    {
      title: 'Einfamilienhaus in Nienburg (Nord)',
      sub: 'Erfolgreich vermittelt zum Höchstpreis',
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Screenshot%202026-07-06%20120228_ergebnis.webp'
    },
    {
      title: 'Wohn- & Geschäftshaus Nienburg Altstadt',
      sub: 'Zügige Abwicklung für Eigentümer',
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/thumb_die-altstadt_ergebnis.webp'
    },
    {
      title: 'Gepflegtes Reihenhaus Nienburg Weser',
      sub: 'Diskrete Off-Market Vermittlung',
      img: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/images%20(2)_ergebnis.webp'
    }
  ];

  const handleScrollToValuation = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('bewertung-nienburg');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.nienburgPage}>
      
      {/* 1. Hero Section with Full-Width Nienburg Background Image */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay} />
        
        <div className={`${styles.heroContent} container`}>
          <span className={styles.eyebrowBadge}>
            <MapPin size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
            Standort Nienburg (Weser) & Region
          </span>
          
          <h1 className={styles.heroTitle}>
            Ihr Immobilienmakler in <span>Nienburg</span>
          </h1>
          
          <p className={styles.heroSubline}>
            Professionelle Vermarktung mit Herz – Ihre Immobilie in besten Händen. 
            Wir erzielen für Ihr Haus oder Ihre Wohnung in Nienburg den echten Bestpreis – e Ehrlich, individuell & zu 100% persönlich.
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
              <span>Persönlich durch Christian Menzel</span>
            </div>
          </div>

          <div className={styles.heroCtas}>
            <a href="#bewertung-nienburg" onClick={handleScrollToValuation}>
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
      </section>

      {/* 2. Über Christian Menzel Section */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutVisualWrapper}>
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/thumb_die-altstadt_ergebnis.webp" 
                alt="Altstadt Nienburg" 
                className={styles.altstadtBgImg} 
              />
              <div className={styles.profileCardFloat}>
                <img 
                  src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/profile_32106_ergebnis.webp" 
                  alt="Christian Menzel" 
                  className={styles.profileThumb} 
                />
                <div className={styles.profileInfo}>
                  <strong>Christian Menzel</strong>
                  <span>Gründer & Ihr Makler vor Ort</span>
                </div>
              </div>
            </div>

            <div className={styles.aboutContent}>
              <span className="eyebrow">Persönlich & Nah</span>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left', margin: '0 0 1rem' }}>
                Ihr persönlicher Ansprechpartner in Nienburg
              </h2>
              <p className={styles.aboutText}>
                Mein Name ist Christian Menzel. Seit über 25 Jahren begleite ich Eigentümer im Landkreis Nienburg (Weser) beim erfolgreichen Verkauf ihrer Immobilie. Bei ImmoM gibt es keine anonymen Callcenter oder wechselnden Sachbearbeiter – ich kümmere mich persönlich um Ihren Verkaufserfolg.
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
                <a href="#bewertung-nienburg" onClick={handleScrollToValuation}>
                  <Button variant="primary">
                    <span>Immobilie in Nienburg jetzt gratis bewerten</span>
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

      {/* 3. Weser-Region Banner Section */}
      <section className={styles.weserBanner}>
        <div className="container">
          <div className={styles.weserGrid}>
            <div className={styles.weserText}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Weserland Expertise
              </span>
              <h2>Wohnen & Verkaufen an der Weser</h2>
              <p>
                Die Nachfrage nach gepflegten Einfamilienhäusern, Eigentumswohnungen und Baugrundstücken in Nienburg ist auf einem anhaltend hohen Niveau. Wir kennen die Besonderheiten der einzelnen Stadtteile und Gemeindeteile genau.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#bewertung-nienburg" onClick={handleScrollToValuation}>
                  <Button variant="accent">
                    <span>Jetzt Marktwert in Nienburg kostenlos prüfen</span>
                    <ArrowRight size={16} />
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/Nienburg-Blog-13-1024x576_ergebnis.webp" 
                alt="Weser Blick Nienburg" 
                className={styles.weserImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Nienburg Wohnlagen Showcase */}
      <section className={styles.locationsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Wohnqualitäten</span>
            <h2 className={styles.sectionTitle}>Begehrte Wohnlagen im Raum Nienburg</h2>
            <p className={styles.sectionDesc}>
              Egal ob historische Altstadt-Architektur oder familienfreundliche Randlagen – wir bringen Käufer und Eigentümer in Nienburg passgenau zusammen.
            </p>
          </div>

          <div className={styles.locationsGrid}>
            <div className={styles.locationCard}>
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/images%20(2)_ergebnis.webp" 
                alt="Nienburg Wohnquartiere" 
                className={styles.locationCardImg}
              />
              <div className={styles.locationCardBody}>
                <h3>Familienfreundliche Wohnquartiere</h3>
                <p>
                  Einfamilienhäuser und Reihenhäuser in ruhigen Siedlungen mit hervorragender Anbindung an Schulen, Kindergärten und die B6.
                </p>
              </div>
            </div>

            <div className={styles.locationCard}>
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Nienburg/webp%20(2)_ergebnis.webp" 
                alt="Nienburg Innenstadt & Flair" 
                className={styles.locationCardImg}
              />
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

      {/* 5. Referenzen Nienburg & Region */}
      <section className={styles.referencesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Erfolgreiche Verkäufe</span>
            <h2 className={styles.sectionTitle}>Referenzen in Nienburg & Umgebung</h2>
            <p className={styles.sectionDesc}>
              Diese Immobilien haben wir für unsere Kunden in der Region Nienburg erfolgreich und diskret zum Bestpreis vermittelt.
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
      <section id="bewertung-nienburg" className={styles.valuationSection}>
        <div className="container">
          <div className={styles.valuationCardWrapper}>
            <div className={styles.valuationCardHeader}>
              <span className={styles.eyebrowBadgeLight}>Kostenlos & Unverbindlich</span>
              <h2>Immobilie in Nienburg jetzt online bewerten lassen</h2>
              <p>Ermitteln Sie in weniger als 2 Minuten den aktuellen Marktwert Ihrer Immobilie im Raum Nienburg & Umgebung.</p>
            </div>
            <ValuationForm />
          </div>
        </div>
      </section>

    </div>
  );
};

export default LocationNienburg;
