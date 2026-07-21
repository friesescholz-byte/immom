import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import styles from './Navigation.module.css';
import { LOCATIONS_DATA, type LocationConfig } from '../data/locationData';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: any) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { label: 'Portfolio', target: 'portfolio', id: 'portfolio', type: 'page' },
    { label: 'Über uns', target: '#ueber-uns', id: 'ueber-uns', type: 'anchor' },
    { label: 'Ablauf', target: '#ablauf', id: 'ablauf', type: 'anchor' },
    { label: 'Tippgeber', target: '#tippgeber', id: 'tippgeber', type: 'anchor' },
    { label: 'Immobilie bewerten', target: '#bewertung', id: 'bewertung', type: 'anchor' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (currentPage === 'portfolio') {
        setActiveSection('portfolio');
        return;
      }
      if (currentPage === 'admin') {
        setActiveSection('admin');
        return;
      }
      if (currentPage.startsWith('location-')) {
        setActiveSection('standorte');
        return;
      }

      if (currentPage === 'home' && window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      // Detect active section on scroll
      const scrollPosition = window.scrollY + 200;
      let matched = false;
      for (const item of navItems) {
        if (item.type === 'anchor') {
          const element = document.querySelector(item.target);
          if (element) {
            const top = (element as HTMLElement).offsetTop;
            const height = (element as HTMLElement).offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(item.id);
              matched = true;
              break;
            }
          }
        }
      }
      if (!matched && currentPage === 'home') {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    if (item.type === 'page') {
      setCurrentPage(item.target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const element = document.querySelector(item.target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(item.target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleSelectLocation = (loc: LocationConfig) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setCurrentPage(loc.pageKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDarkHeroPage = currentPage.startsWith('location-');

  return (
    <>
      <header 
        className={`
          ${styles.header} 
          ${isScrolled ? styles.scrolled : ''} 
          ${isDarkHeroPage && !isScrolled ? styles.darkHero : ''}
        `}
      >
        <div className={`${styles.container} container`}>
          {/* Brand Logo */}
          <a 
            href="#" 
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img 
              src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/_01-Logo-ImmoM-IhrMaklerVorOrt_20250722-plast_ergebnis.webp" 
              alt="ImmoM Logo" 
              className={styles.logoImg}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.target}
                className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span 
                    layoutId="activeIndicator" 
                    className={styles.activeIndicator}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}

            {/* Standorte Dropdown */}
            <div 
              className={styles.dropdownWrapper}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                className={`${styles.navLink} ${activeSection === 'standorte' ? styles.active : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>Standorte</span>
                <ChevronDown size={14} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                {activeSection === 'standorte' && (
                  <motion.span 
                    layoutId="activeIndicator" 
                    className={styles.activeIndicator}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {LOCATIONS_DATA.map((loc) => (
                      <div 
                        key={loc.id}
                        className={`${styles.dropdownItem} ${currentPage === loc.pageKey ? styles.activeLocation : ''}`} 
                        onClick={() => handleSelectLocation(loc)}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MapPin size={15} style={{ color: currentPage === loc.pageKey ? '#38bdf8' : 'var(--color-accent-dark)' }} />
                          <strong style={{ fontSize: '0.85rem' }}>{loc.name}</strong>
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action Area */}
          <div className={styles.actions}>
            <a href="tel:+4950218601001" className={styles.phoneLink}>
              <Phone size={18} className={styles.phoneIcon} />
              <span className={styles.phoneNumber}>05021 8601001</span>
            </a>
            <button 
              className={styles.ctaButton} 
              onClick={() => handleNavClick({ label: 'Portfolio', target: 'portfolio', id: 'portfolio', type: 'page' })}
            >
              <span>Immobilien ansehen</span>
              <ArrowRight size={16} />
            </button>
            <button 
              className={styles.mobileToggle} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menü öffnen"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className={styles.mobileMenu}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.mobileActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                >
                  {item.label}
                </a>
              ))}

              <div style={{ padding: '0.75rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Standorte</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '220px', overflowY: 'auto' }}>
                  {LOCATIONS_DATA.map((loc) => (
                    <button 
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc)} 
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: currentPage === loc.pageKey ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)', color: currentPage === loc.pageKey ? '#38bdf8' : '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.55rem 0.85rem', borderRadius: '6px', width: '100%', fontSize: '0.85rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer' }}
                    >
                      <MapPin size={14} style={{ color: '#38bdf8' }} />
                      <span>{loc.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.mobileActions}>
                <a href="tel:+4950218601001" className={styles.mobilePhoneLink}>
                  <Phone size={20} />
                  <span>Jetzt anrufen: 05021 8601001</span>
                </a>
                <button 
                  className={styles.mobileCta} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCurrentPage('portfolio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Immobilien Portfolio ansehen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Bar for Mobile Conversion */}
      <div className={styles.mobileStickyBar}>
        <a href="tel:+4950218601001" className={styles.mobileStickyBtnSecondary}>
          <Phone size={18} />
          <span>Anrufen</span>
        </a>
        <button 
          onClick={() => {
            setCurrentPage('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={styles.mobileStickyBtnPrimary}
        >
          <span>Immobilien ansehen</span>
        </button>
      </div>
    </>
  );
};

export default Navigation;
