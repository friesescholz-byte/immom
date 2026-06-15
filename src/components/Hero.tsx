import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';
import Button from './ui/Button';
import { type Property } from './Portfolio';

interface HeroProps {
  properties?: Property[];
}

export const Hero: React.FC<HeroProps> = ({ properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const defaultItems: Property[] = [
    {
      id: 1,
      title: 'Klassisches Einfamilienhaus in ruhiger Familiendistriktslage',
      type: 'haus',
      location: 'Nienburg',
      price: 385000,
      area: 140,
      rooms: 5,
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      status: 'verfuegbar',
      statusTag: 'Neu'
    },
    {
      id: 2,
      title: 'Barrierefreier Winkelbungalow mit traumhaftem Garten',
      type: 'haus',
      location: 'Marklohe',
      price: 349000,
      area: 125,
      rooms: 4,
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      status: 'reserviert',
      statusTag: 'Reserviert'
    },
    {
      id: 3,
      title: 'Gemütliches Einfamilienhaus für die große Familie',
      type: 'haus',
      location: 'Husum',
      price: 295000,
      area: 135,
      rooms: 5,
      img: 'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?auto=format&fit=crop&w=1200&q=80',
      status: 'verfuegbar',
      statusTag: 'Beliebt'
    },
    {
      id: 4,
      title: 'Zentrumsnahes Mehrfamilienhaus als Renditeobjekt (8 WE)',
      type: 'mehrfamilienhaus',
      location: 'Verden',
      price: 790000,
      area: 520,
      rooms: 24,
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      status: 'verfuegbar',
      statusTag: 'Kapitalanlage'
    },
    {
      id: 5,
      title: 'Großzügiger Bungalow mit separater Einliegerwohnung',
      type: 'haus',
      location: 'Lindwedel (SG. Schwarmstedt)',
      price: 420000,
      area: 160,
      rooms: 6,
      img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80',
      status: 'verkauft',
      statusTag: 'Verkauft'
    },
    {
      id: 6,
      title: 'Modernes Stadthaus in ruhiger und zentraler Lage',
      type: 'haus',
      location: 'Husum',
      price: 315000,
      area: 150,
      rooms: 5,
      img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      status: 'verfuegbar',
      statusTag: 'Top Zustand'
    }
  ];

  const items = properties && properties.length > 0 ? properties : defaultItems;
  const currentItem = items[currentIndex];

  const trustPoints = [
    'Über 30 Jahre Immobilien- und Vermarktungserfahrung',
    'Individuelle, verkaufsstarke Konzepte statt Standard-Inserate',
    'Großes, aktives Netzwerk an vorgemerkten Kaufinteressenten',
    'Spezialisiert auf Nienburg/Weser, Marklohe und Umgebung',
    'Auf Wunsch mit 100% kostenloser Wertermittlung',
  ];

  const handlePortfolioClick = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'portfolio' } }));
  };

  const handleCardClick = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'portfolio', propertyId: currentItem.id } }));
  };

  const handleValuationClick = () => {
    const el = document.querySelector('#bewertung');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide effect for properties (slow, elegant pacing)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 7000); // 7 seconds
    return () => clearInterval(timer);
  }, [currentIndex, items.length]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  const cardVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : dir < 0 ? 80 : 0,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section id="start" className={styles.heroSection}>
      {/* Designer background graphics */}
      <div className={styles.designerBg}>
        {/* Architect blueprint grid */}
        <div className={styles.blueprintGrid} />
        
        {/* Abstract house/building blueprint outline */}
        <svg className={styles.blueprintSvg} viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 450 L350 200 L600 450 Z" stroke="rgba(14, 108, 180, 0.04)" strokeWidth="1.5" />
          <path d="M150 450 L150 350 L550 350 L550 450" stroke="rgba(14, 108, 180, 0.03)" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1="50" y1="450" x2="750" y2="450" stroke="rgba(14, 108, 180, 0.05)" strokeWidth="1.5" />
          <circle cx="350" cy="200" r="4" fill="var(--color-primary-light)" opacity="0.15" />
          <line x1="350" y1="100" x2="350" y2="500" stroke="rgba(14, 108, 180, 0.03)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="100" y1="300" x2="600" y2="300" stroke="rgba(14, 108, 180, 0.03)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        {/* Dynamic decorative line elements with coordinate markers */}
        <div className={styles.designerLine1} />
        <div className={styles.designerLine2} />
      </div>

      <div className={styles.bgGlow} />
      
      <div className={`${styles.container} container`}>
        <motion.div 
          className={styles.leftCol}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.eyebrow} variants={itemVariants}>
            Ihr Partner für den Immobilienverkauf in Nienburg
          </motion.span>
          
          <motion.h1 className={styles.title} variants={itemVariants}>
            Ihre Immobilie in besten Händen. <br />
            <span className="highlight-gold">Professionelle Vermarktung mit Herz.</span>
          </motion.h1>
          
          <motion.p className={styles.subtitle} variants={itemVariants}>
            Immobilienverkauf für Eigentümer in Nienburg/Weser, Marklohe und der Region – 
            mit über 30 Jahren Erfahrung, einem starken Netzwerk und maßgeschneiderten Vermarktungskonzepten.
          </motion.p>
          
          <motion.ul className={`${styles.trustList} checkmark-list`} variants={itemVariants}>
            {trustPoints.map((point, index) => (
              <li key={index} className="checkmark-item">
                <div className={styles.checkmarkIconWrapper}>
                  <Check className="checkmark-icon" size={16} />
                </div>
                <span>{point}</span>
              </li>
            ))}
          </motion.ul>
          
          <motion.div className={styles.ctaWrapper} variants={itemVariants}>
            <div className={styles.buttonGroup}>
              <Button variant="primary" onClick={handlePortfolioClick}>
                <span>Aktuelle Immobilien ansehen</span>
                <ArrowRight size={16} />
              </Button>
              <Button variant="secondary" onClick={handleValuationClick}>
                Immobilie bewerten lassen
              </Button>
            </div>
            <p className={styles.trustBadge}>
              ✓ Kompetent. Regional. Persönlich.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
        >
          <div className={styles.carouselContainer}>
            <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={handlePrev} aria-label="Vorheriges Objekt">
              <ChevronLeft size={24} />
            </button>
            
            <div className={styles.cardWrapper}>
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={styles.featuredCard}
                  onClick={handleCardClick}
                >
                  <div className={styles.imageWrapper}>
                    <img src={currentItem.img} alt={currentItem.title} className={styles.propertyImage} />
                    {currentItem.statusTag && (
                      <div className={`${styles.statusTag} ${styles[currentItem.status]}`}>
                        {currentItem.statusTag}
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.cardBody}>
                    <span className={styles.propertyType}>
                      {currentItem.type === 'haus' ? 'Einfamilienhaus' : currentItem.type === 'mehrfamilienhaus' ? 'Mehrfamilienhaus' : 'Eigentumswohnung'}
                    </span>
                    
                    <h3 className={styles.propertyTitle}>{currentItem.title}</h3>
                    
                    <div className={styles.location}>
                      <MapPin size={16} className={styles.mapIcon} />
                      <span>{currentItem.location}</span>
                    </div>
                    
                    <div className={styles.specsGrid}>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>Kaufpreis</span>
                        <span className={styles.specValue}>
                          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(currentItem.price)}
                        </span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>Wohnfläche</span>
                        <span className={styles.specValue}>{currentItem.area} m²</span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>Zimmer</span>
                        <span className={styles.specValue}>{currentItem.rooms}</span>
                      </div>
                    </div>
                    
                    <Button variant="primary" className={styles.cardBtn} onClick={handleCardClick}>
                      <span>Details & Exposé ansehen</span>
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={handleNext} aria-label="Nächstes Objekt">
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className={styles.pagination}>
            {items.map((_, index) => (
              <span 
                key={index} 
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                role="button"
                aria-label={`Gehe zu Objekt ${index + 1}`}
              />
            ))}
          </div>
          
          <div className={styles.ratingBadge}>
            <div className={styles.stars}>★★★★★</div>
            <p><strong>Exzellenter Service:</strong> Über 30 Jahre Immobilienkompetenz in der Region</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
