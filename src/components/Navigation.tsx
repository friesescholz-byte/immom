import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentPage: 'home' | 'portfolio' | 'admin';
  setCurrentPage: (page: 'home' | 'portfolio' | 'admin') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { label: 'Portfolio', target: 'portfolio', id: 'portfolio', type: 'page' },
    { label: 'Ablauf', target: '#ablauf', id: 'ablauf', type: 'anchor' },
    { label: 'Über uns', target: '#ueber-uns', id: 'ueber-uns', type: 'anchor' },
    { label: 'Referenzen', target: '#referenzen', id: 'referenzen', type: 'anchor' },
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

      if (currentPage === 'home' && window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      // Detect active section on scroll
      const scrollPosition = window.scrollY + 200;
      let matched = false;
      for (const item of navItems) {
        if (item.type === 'anchor') {
          const el = document.querySelector(item.target);
          if (el) {
            const top = (el as HTMLElement).offsetTop;
            const height = (el as HTMLElement).offsetHeight;
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
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    if (item.type === 'page') {
      setCurrentPage('portfolio');
      setActiveSection('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.querySelector(item.target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(item.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(item.id);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.container} container`}>
          <a href="#start" className={styles.logoContainer} onClick={handleLogoClick}>
            <img 
              src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/01-Logo_ImmoM_NEU_frei_240303-2-768x252_ergebnis.webp" 
              alt="ImmoM Logo" 
              className={styles.logo} 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.type === 'anchor' ? item.target : '#'}
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
