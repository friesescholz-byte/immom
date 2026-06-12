import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Grid, ListFilter, SlidersHorizontal, Info, X, Send, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Portfolio.module.css';
import Button from './ui/Button';
import Card from './ui/Card';

export interface Property {
  id: number;
  title: string;
  type: 'haus' | 'wohnung' | 'mehrfamilienhaus';
  location: string;
  price: number;
  area: number;
  rooms: number;
  img: string;
  images?: string[];
  status: 'verfuegbar' | 'reserviert' | 'verkauft';
  statusTag?: string;
  description?: string;
  yearBuilt?: number | string;
  floors?: number | string;
  plotSize?: string;
  fittings?: string;
  garages?: number | string;
  parkingSpaces?: number | string;
  commission?: string;
  handover?: string;
  energyType?: string;
  energyDemand?: string;
  hotWater?: string;
  energyClass?: string;
  buildingType?: string;
  renovationYear?: string;
}

interface PortfolioProps {
  properties: Property[];
  initialPropertyId?: number | null;
  setInitialPropertyId?: (id: number | null) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ 
  properties, 
  initialPropertyId, 
  setInitialPropertyId 
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  
  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', msg: '' });
  const [isSent, setIsSent] = useState(false);

  React.useEffect(() => {
    if (initialPropertyId) {
      const property = properties.find(p => p.id === initialPropertyId);
      if (property) {
        setSelectedProperty(property);
        setActiveImageIndex(0);
        setIsSent(false);
        setContactForm({
          name: '',
          email: '',
          phone: '',
          msg: `Ich interessiere mich für das Objekt: ${property.title} in ${property.location}. Bitte senden Sie mir das Exposé.`
        });
        if (setInitialPropertyId) {
          setInitialPropertyId(null);
        }
      }
    }
  }, [initialPropertyId, properties, setInitialPropertyId]);

  // Filtering & Sorting Logic
  const filteredProperties = properties
    .filter(p => filterType === 'all' || p.type === filterType)
    .filter(p => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'verfuegbar') return p.status === 'verfuegbar';
      return p.status === 'reserviert' || p.status === 'verkauft';
    })
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'areaDesc') return b.area - a.area;
      return 0; // Default sorting
    });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <section className={`${styles.portfolioSection} section-padding`}>
      <div className="container">
        
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <span className="eyebrow">Unsere Angebote</span>
          <h1>Exklusive Immobilien aus der Region</h1>
          <p>
            Entdecken Sie unser aktuelles Portfolio an Häusern, Wohnungen und Kapitalanlagen. 
            Wir legen Wert auf Qualität, faire Preise und transparente Beratung.
          </p>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.filterGroup}>
            <div className={styles.filterItem}>
              <ListFilter size={16} />
              <span>Objektart:</span>
              <div className={styles.btnGroup}>
                <button className={filterType === 'all' ? styles.activeFilter : ''} onClick={() => setFilterType('all')}>Alle</button>
                <button className={filterType === 'haus' ? styles.activeFilter : ''} onClick={() => setFilterType('haus')}>Häuser</button>
                <button className={filterType === 'mehrfamilienhaus' ? styles.activeFilter : ''} onClick={() => setFilterType('mehrfamilienhaus')}>MFH</button>
              </div>
            </div>

            <div className={styles.filterItem}>
              <Grid size={16} />
              <span>Status:</span>
              <div className={styles.btnGroup}>
                <button className={filterStatus === 'all' ? styles.activeFilter : ''} onClick={() => setFilterStatus('all')}>Alle</button>
                <button className={filterStatus === 'verfuegbar' ? styles.activeFilter : ''} onClick={() => setFilterStatus('verfuegbar')}>Verfügbar</button>
                <button className={filterStatus === 'archived' ? styles.activeFilter : ''} onClick={() => setFilterStatus('archived')}>Reserviert/Verkauft</button>
              </div>
            </div>
          </div>

          <div className={styles.sortItem}>
            <SlidersHorizontal size={16} />
            <span>Sortierung:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
              <option value="default">Standard</option>
              <option value="priceAsc">Preis: aufsteigend</option>
              <option value="priceDesc">Preis: absteigend</option>
              <option value="areaDesc">Wohnfläche: absteigend</option>
            </select>
          </div>
        </div>

        {/* Grid List */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 350, damping: 25 }}
                className={styles.gridItem}
              >
                <Card 
                  variant="hover" 
                  className={styles.propertyCard}
                  onClick={() => {
                    setSelectedProperty(item);
                    setActiveImageIndex(0);
                    setIsSent(false);
                    setContactForm({
                      name: '',
                      email: '',
                      phone: '',
                      msg: `Ich interessiere mich für das Objekt: ${item.title} in ${item.location}. Bitte senden Sie mir das Exposé.`
                    });
                  }}
                >
                  {/* Image & Tags */}
                  <div className={styles.imageWrapper}>
                    <img src={item.img} alt={item.title} className={styles.image} />
                    {item.statusTag && (
                      <span className={`${styles.tag} ${styles[item.status]}`}>
                        {item.statusTag}
                      </span>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className={styles.cardContent}>
                    <div className={styles.location}>
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                    <h3>{item.title}</h3>

                    {/* Stats List */}
                    <div className={styles.stats}>
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Preis</span>
                        <span className={styles.statVal}>{formatPrice(item.price)}</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Fläche</span>
                        <span className={styles.statVal}>{item.area} m²</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Zimmer</span>
                        <span className={styles.statVal}>{item.rooms}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className={styles.cardAction}>
                      <Button 
                        variant={item.status === 'verfuegbar' ? 'primary' : 'secondary'} 
                        disabled={item.status === 'verkauft'}
                        onClick={() => {
                          setSelectedProperty(item);
                          setActiveImageIndex(0);
                          setIsSent(false);
                          setContactForm({
                            name: '',
                            email: '',
                            phone: '',
                            msg: `Ich interessiere mich für das Objekt: ${item.title} in ${item.location}. Bitte senden Sie mir das Exposé.`
                          });
                        }}
                        className={styles.actionBtn}
                      >
                        <span>{item.status === 'verfuegbar' ? 'Details ansehen' : item.status === 'reserviert' ? 'Anfragen' : 'Bereits Verkauft'}</span>
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProperties.length === 0 && (
          <div className={styles.emptyState}>
            <Info size={40} className={styles.infoIcon} />
            <h4>Keine passenden Objekte gefunden</h4>
            <p>Bitte passen Sie Ihre Filter an, um passende Immobilien anzuzeigen.</p>
          </div>
        )}

      </div>

      {/* Details & Exposé Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div 
            className={styles.detailsModalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div 
              className={styles.detailsModal}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedProperty(null)}>
                <X size={24} />
              </button>

              <div className={styles.detailsModalBody}>
                {/* Left Column: Media Gallery, Description, Specs */}
                <div className={styles.leftPanel}>
                  
                  {/* Title & Location */}
                  <div className={styles.modalHeaderInfo}>
                    <span className={`${styles.tag} ${styles[selectedProperty.status]}`}>
                      {selectedProperty.statusTag || (selectedProperty.status === 'verfuegbar' ? 'Aktiv' : selectedProperty.status === 'reserviert' ? 'Reserviert' : 'Verkauft')}
                    </span>
                    <h2 className={styles.detailsTitle}>{selectedProperty.title}</h2>
                    <div className={styles.detailsLocation}>
                      <MapPin size={18} />
                      <span>{selectedProperty.location}</span>
                    </div>
                  </div>

                  {/* Image Gallery Slider */}
                  {(() => {
                    const galleryImages = selectedProperty.images && selectedProperty.images.length > 0
                      ? selectedProperty.images
                      : [selectedProperty.img];
                    
                    const handlePrevImage = (e: React.MouseEvent) => {
                      e.stopPropagation();
                      setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                    };

                    const handleNextImage = (e: React.MouseEvent) => {
                      e.stopPropagation();
                      setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                    };

                    return (
                      <div className={styles.galleryWrapper}>
                        <div className={styles.mainGalleryImageWrapper}>
                          <img 
                            src={galleryImages[activeImageIndex]} 
                            alt={`${selectedProperty.title} Galerie ${activeImageIndex + 1}`} 
                            className={styles.mainGalleryImage} 
                          />
                          {galleryImages.length > 1 && (
                            <>
                              <button className={`${styles.galleryArrow} ${styles.galleryArrowLeft}`} onClick={handlePrevImage}>
                                <ChevronLeft size={20} />
                              </button>
                              <button className={`${styles.galleryArrow} ${styles.galleryArrowRight}`} onClick={handleNextImage}>
                                <ChevronRight size={20} />
                              </button>
                            </>
                          )}
                        </div>
                        {galleryImages.length > 1 && (
                          <div className={styles.thumbnails}>
                            {galleryImages.map((imgUrl, idx) => (
                              <div 
                                key={idx} 
                                className={`${styles.thumbnail} ${idx === activeImageIndex ? styles.activeThumbnail : ''}`}
                                onClick={() => setActiveImageIndex(idx)}
                              >
                                <img src={imgUrl} alt={`Miniaturansicht ${idx + 1}`} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Description Section */}
                  <div className={styles.detailsContentBlock}>
                    <h4 className={styles.detailsSectionTitle}>Objektbeschreibung</h4>
                    <p className={styles.detailsDescription}>
                      {selectedProperty.description || 'Keine Beschreibung verfügbar.'}
                    </p>
                  </div>

                  {/* Fittings / Ausstattung Section */}
                  {selectedProperty.fittings && (
                    <div className={styles.detailsContentBlock}>
                      <h4 className={styles.detailsSectionTitle}>Ausstattung</h4>
                      <p className={styles.detailsDescription}>
                        {selectedProperty.fittings}
                      </p>
                    </div>
                  )}

                  {/* Technical Specifications Table */}
                  <div className={styles.detailsContentBlock}>
                    <h4 className={styles.detailsSectionTitle}>Immobilien-Details</h4>
                    <div className={styles.specsTableGrid}>
                      <div className={styles.specsCol}>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Lage Ort</span>
                          <span className={styles.specValue}>{selectedProperty.location}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Objektart</span>
                          <span className={styles.specValue}>
                            {selectedProperty.type === 'haus' ? 'Haus' : selectedProperty.type === 'mehrfamilienhaus' ? 'Mehrfamilienhaus' : 'Wohnung'}
                          </span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Kaufpreis</span>
                          <span className={styles.specValue}>{formatPrice(selectedProperty.price)}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Wohnfläche</span>
                          <span className={styles.specValue}>{selectedProperty.area} m²</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Zimmer / Räume</span>
                          <span className={styles.specValue}>{selectedProperty.rooms}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Baujahr</span>
                          <span className={styles.specValue}>{selectedProperty.yearBuilt || 'k.A.'}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Stockwerke / Geschosse</span>
                          <span className={styles.specValue}>{selectedProperty.floors || 'k.A.'}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Grundstücksgröße</span>
                          <span className={styles.specValue}>{selectedProperty.plotSize || 'k.A.'}</span>
                        </div>
                      </div>

                      <div className={styles.specsCol}>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Garagen</span>
                          <span className={styles.specValue}>{selectedProperty.garages !== undefined ? selectedProperty.garages : 'k.A.'}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Stellplätze</span>
                          <span className={styles.specValue}>{selectedProperty.parkingSpaces !== undefined ? selectedProperty.parkingSpaces : 'k.A.'}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Provision</span>
                          <span className={styles.specValue}>{selectedProperty.commission || 'Provisionsfrei für Käufer'}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Übernahme</span>
                          <span className={styles.specValue}>{selectedProperty.handover || 'Nach Absprache'}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Baujahr / Sanierung</span>
                          <span className={styles.specValue}>{selectedProperty.renovationYear || 'k.A.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Energy Certificate Section */}
                  <div className={styles.detailsContentBlock}>
                    <h4 className={styles.detailsSectionTitle}>Energieausweis & Effizienz</h4>
                    <div className={styles.specsTableGrid}>
                      <div className={styles.specsCol}>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Art des Energieausweises</span>
                          <span className={styles.specValue}>{selectedProperty.energyType || 'Liegt zur Besichtigung vor'}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Endenergiebedarf</span>
                          <span className={styles.specValue}>{selectedProperty.energyDemand || 'k.A.'}</span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Warmwasser ist enthalten</span>
                          <span className={styles.specValue}>{selectedProperty.hotWater || 'k.A.'}</span>
                        </div>
                      </div>
                      <div className={styles.specsCol}>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Energieeffizienzklasse</span>
                          <span className={styles.specValue}>
                            {selectedProperty.energyClass ? (
                              <span className={`${styles.energyBadge} ${styles['energy' + selectedProperty.energyClass]}`}>
                                Klasse {selectedProperty.energyClass}
                              </span>
                            ) : 'k.A.'}
                          </span>
                        </div>
                        <div className={styles.specRow}>
                          <span className={styles.specName}>Gebäudeart</span>
                          <span className={styles.specValue}>{selectedProperty.buildingType || 'k.A.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Sticky Contact & High-Level Stats */}
                <div className={styles.rightPanel}>
                  <div className={styles.stickyPanel}>
                    <div className={styles.priceHighlightCard}>
                      <span className={styles.priceLabel}>Kaufpreis</span>
                      <h3 className={styles.priceVal}>{formatPrice(selectedProperty.price)}</h3>
                      <div className={styles.quickStatsGrid}>
                        <div className={styles.quickStat}>
                          <strong>{selectedProperty.area} m²</strong>
                          <span>Wohnfläche</span>
                        </div>
                        <div className={styles.quickStat}>
                          <strong>{selectedProperty.rooms}</strong>
                          <span>Zimmer</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.contactFormCard}>
                      {!isSent ? (
                        <form onSubmit={handleContactSubmit} className={styles.modalForm}>
                          <h4>Exposé & Besichtigung</h4>
                          <p className={styles.modalSubtitle}>
                            Jetzt unverbindlich weitere Details und Unterlagen anfordern.
                          </p>

                          <div className={styles.formGroup}>
                            <label>Ihr Name</label>
                            <input 
                              type="text" 
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              className={styles.input} 
                              required 
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>E-Mail-Adresse</label>
                            <input 
                              type="email" 
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              className={styles.input} 
                              required 
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>Telefonnummer</label>
                            <input 
                              type="tel" 
                              value={contactForm.phone}
                              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                              className={styles.input} 
                              required 
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>Ihre Nachricht</label>
                            <textarea 
                              rows={3}
                              value={contactForm.msg}
                              onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                              className={styles.textarea}
                            />
                          </div>

                          <Button type="submit" variant="primary" className={styles.submitBtn}>
                            <span>Jetzt Anfragen</span>
                            <Send size={16} />
                          </Button>
                        </form>
                      ) : (
                        <div className={styles.modalSuccess}>
                          <CheckCircle2 size={48} className={styles.successIcon} />
                          <h3>Anfrage versendet!</h3>
                          <p>
                            Vielen Dank. Wir senden Ihnen alle Unterlagen für das Objekt in Kürze per E-Mail zu.
                          </p>
                          <Button variant="primary" onClick={() => setSelectedProperty(null)}>
                            Schließen
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Portfolio;
