import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Key, LogOut, CheckCircle, X, FileText } from 'lucide-react';
import styles from './AdminDashboard.module.css';
import Button from './ui/Button';
import Card from './ui/Card';
import { type Property } from './Portfolio';

interface AdminDashboardProps {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ properties, setProperties }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    title: '',
    type: 'haus' as 'haus' | 'wohnung' | 'mehrfamilienhaus',
    location: '',
    price: '',
    area: '',
    rooms: '',
    img: '',
    images: [] as string[],
    status: 'verfuegbar' as 'verfuegbar' | 'reserviert' | 'verkauft',
    statusTag: '',
    description: '',
    yearBuilt: '',
    floors: '',
    plotSize: '',
    fittings: '',
    garages: '',
    parkingSpaces: '',
    commission: '',
    handover: '',
    energyType: '',
    energyDemand: '',
    hotWater: '',
    energyClass: '',
    buildingType: '',
    renovationYear: '',
    exposeUrl: ''
  });

  // Helper to compress images on the client side to fit localStorage limits
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 900;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.75);
            resolve(compressed);
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const compressed = await compressImage(e.target.files[0]);
        setFormState(prev => ({ ...prev, img: compressed }));
      } catch (err) {
        alert('Fehler beim Hochladen des Bildes. Bitte versuchen Sie es erneut.');
        console.error(err);
      }
    }
  };

  const handleRemoveMainImage = () => {
    setFormState(prev => ({ ...prev, img: '' }));
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      try {
        const compressedImages = await Promise.all(files.map(compressImage));
        setFormState(prev => ({
          ...prev,
          images: [...prev.images, ...compressedImages]
        }));
      } catch (err) {
        alert('Fehler beim Hochladen der Galeriebilder.');
        console.error(err);
      }
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormState(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index)
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin' || password === 'immom2026') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleDelete = (id: number) => {
    if (confirm('Möchten Sie diese Immobilie wirklich aus dem Portfolio löschen?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormState({
      title: '',
      type: 'haus',
      location: '',
      price: '',
      area: '',
      rooms: '',
      img: '',
      images: [],
      status: 'verfuegbar',
      statusTag: 'Neu',
      description: '',
      yearBuilt: '',
      floors: '',
      plotSize: '',
      fittings: '',
      garages: '',
      parkingSpaces: '',
      commission: '',
      handover: '',
      energyType: '',
      energyDemand: '',
      hotWater: '',
      energyClass: '',
      buildingType: '',
      renovationYear: '',
      exposeUrl: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (property: Property) => {
    setEditingId(property.id);
    setFormState({
      title: property.title,
      type: property.type,
      location: property.location,
      price: property.price.toString(),
      area: property.area.toString(),
      rooms: property.rooms.toString(),
      img: property.img,
      images: property.images || [],
      status: property.status,
      statusTag: property.statusTag || '',
      description: property.description || '',
      yearBuilt: property.yearBuilt ? property.yearBuilt.toString() : '',
      floors: property.floors ? property.floors.toString() : '',
      plotSize: property.plotSize || '',
      fittings: property.fittings || '',
      garages: property.garages !== undefined ? property.garages.toString() : '',
      parkingSpaces: property.parkingSpaces !== undefined ? property.parkingSpaces.toString() : '',
      commission: property.commission || '',
      handover: property.handover || '',
      energyType: property.energyType || '',
      energyDemand: property.energyDemand || '',
      hotWater: property.hotWater || '',
      energyClass: property.energyClass || '',
      buildingType: property.buildingType || '',
      renovationYear: property.renovationYear || '',
      exposeUrl: property.exposeUrl || ''
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.img) {
      alert('Bitte laden Sie ein Hauptbild für die Immobilie hoch.');
      return;
    }

    const preparedProperty: Property = {
      id: editingId !== null ? editingId : Date.now(),
      title: formState.title,
      type: formState.type,
      location: formState.location,
      price: parseFloat(formState.price) || 0,
      area: parseFloat(formState.area) || 0,
      rooms: parseInt(formState.rooms) || 0,
      img: formState.img,
      images: formState.images.length > 0 ? formState.images : [formState.img],
      status: formState.status,
      statusTag: formState.statusTag || undefined,
      description: formState.description || undefined,
      yearBuilt: formState.yearBuilt || undefined,
      floors: formState.floors || undefined,
      plotSize: formState.plotSize || undefined,
      fittings: formState.fittings || undefined,
      garages: formState.garages !== undefined && formState.garages !== '' ? formState.garages : undefined,
      parkingSpaces: formState.parkingSpaces !== undefined && formState.parkingSpaces !== '' ? formState.parkingSpaces : undefined,
      commission: formState.commission || undefined,
      handover: formState.handover || undefined,
      energyType: formState.energyType || undefined,
      energyDemand: formState.energyDemand || undefined,
      hotWater: formState.hotWater || undefined,
      energyClass: formState.energyClass || undefined,
      buildingType: formState.buildingType || undefined,
      renovationYear: formState.renovationYear || undefined,
      exposeUrl: formState.exposeUrl || undefined
    };

    if (editingId !== null) {
      setProperties(prev => prev.map(p => p.id === editingId ? preparedProperty : p));
    } else {
      setProperties(prev => [preparedProperty, ...prev]);
    }

    setIsFormOpen(false);
  };

  // 1. Render Login Form
  if (!isAuthenticated) {
    return (
      <section className={`${styles.adminSection} section-padding`}>
        <div className={styles.loginContainer}>
          <Card variant="hover" className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <Key size={32} className={styles.keyIcon} />
              <h2>Backend Login</h2>
              <p>Bitte geben Sie das Passwort ein, um das Portfolio zu verwalten.</p>
            </div>
            
            <form onSubmit={handleLogin} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label>Passwort</label>
                <input 
                  type="password" 
                  placeholder="Passwort eingeben"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
                {authError && <span className={styles.errorMsg}>Falsches Passwort!</span>}
              </div>
              <Button type="submit" variant="primary" className={styles.loginBtn}>
                Anmelden
              </Button>
            </form>
          </Card>
        </div>
      </section>
    );
  }

  // 2. Render Main Dashboard
  return (
    <section className={`${styles.adminSection} section-padding`}>
      <div className="container">
        
        {/* Dashboard Title & Actions */}
        <div className={styles.dashboardHeader}>
          <div>
            <span className="eyebrow">Verwaltung</span>
            <h1>Immobilien-Portfolio Backend</h1>
            <p>Verwalten Sie die Angebote, die auf Ihrer Website angezeigt werden.</p>
          </div>
          
          <div className={styles.headerActions}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogOut size={16} />
              <span>Abmelden</span>
            </button>
          </div>
        </div>

        {/* Properties List Table */}
        <div className={styles.dashboardBody}>
          <div className={styles.listHeader}>
            <h3>Aktuelle Immobilien ({properties.length})</h3>
            <Button variant="accent" onClick={handleOpenCreate} className={styles.createBtn}>
              <Plus size={18} />
              <span>Neue Immobilie anlegen</span>
            </Button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Vorschau</th>
                  <th>Titel</th>
                  <th>Ort</th>
                  <th>Preis</th>
                  <th>Fläche / Zimmer</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className={styles.previewWrapper}>
                        <img src={p.img} alt={p.title} className={styles.previewImg} />
                      </div>
                    </td>
                    <td>
                      <strong>{p.title}</strong>
                      <span className={styles.badgeMuted}>{p.type}</span>
                    </td>
                    <td>{p.location}</td>
                    <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(p.price)}</td>
                    <td>{p.area} m² / {p.rooms} Zi.</td>
                    <td>
                      <span className={`${styles.statusLabel} ${styles[p.status]}`}>
                        {p.status === 'verfuegbar' ? 'Verfügbar' : p.status === 'reserviert' ? 'Reserviert' : 'Verkauft'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className={styles.actionsCell}>
                        <button className={styles.editCellBtn} onClick={() => handleOpenEdit(p)} title="Bearbeiten">
                          <Edit3 size={16} />
                        </button>
                        <button className={styles.deleteCellBtn} onClick={() => handleDelete(p.id)} title="Löschen">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Create / Edit Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setIsFormOpen(false)}>
                <X size={24} />
              </button>

              <div className={styles.modalBody}>
                <form onSubmit={handleFormSubmit} className={styles.form}>
                  <h3>{editingId !== null ? 'Immobilie bearbeiten' : 'Neue Immobilie hinzufügen'}</h3>
                  
                  {/* Section 1: Basis-Informationen */}
                  <h4 className={styles.sectionFormTitle}>1. Basis-Informationen</h4>
                  
                  <div className={styles.formGroup}>
                    <label>Titel des Objekts</label>
                    <input 
                      type="text" 
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      className={styles.input} 
                      placeholder="z.B. Gemütliches Reihenhaus mit Garten"
                      required 
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Objektart</label>
                      <select 
                        value={formState.type} 
                        onChange={(e) => setFormState({ ...formState, type: e.target.value as any })}
                        className={styles.select}
                      >
                        <option value="haus">Haus</option>
                        <option value="wohnung">Wohnung</option>
                        <option value="mehrfamilienhaus">Mehrfamilienhaus</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Lage / Ort</label>
                      <input 
                        type="text" 
                        value={formState.location}
                        onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. Marklohe"
                        required 
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Kaufpreis (€)</label>
                      <input 
                        type="number" 
                        value={formState.price}
                        onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 320000"
                        required 
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Badge-Tag (z.B. "Neu", "Reserviert")</label>
                      <input 
                        type="text" 
                        value={formState.statusTag}
                        onChange={(e) => setFormState({ ...formState, statusTag: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. Neu"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Status</label>
                      <select 
                        value={formState.status} 
                        onChange={(e) => setFormState({ ...formState, status: e.target.value as any })}
                        className={styles.select}
                      >
                        <option value="verfuegbar">Verfügbar</option>
                        <option value="reserviert">Reserviert</option>
                        <option value="verkauft">Verkauft</option>
                      </select>
                    </div>
                  </div>

                  {/* Section 2: Spezifikationen */}
                  <h4 className={styles.sectionFormTitle}>2. Technische Spezifikationen</h4>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Zimmeranzahl</label>
                      <input 
                        type="number" 
                        value={formState.rooms}
                        onChange={(e) => setFormState({ ...formState, rooms: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 4"
                        required 
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Wohnfläche (m²)</label>
                      <input 
                        type="number" 
                        value={formState.area}
                        onChange={(e) => setFormState({ ...formState, area: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 120"
                        required 
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Baujahr</label>
                      <input 
                        type="text" 
                        value={formState.yearBuilt}
                        onChange={(e) => setFormState({ ...formState, yearBuilt: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 1998"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Stockwerke / Geschosse</label>
                      <input 
                        type="text" 
                        value={formState.floors}
                        onChange={(e) => setFormState({ ...formState, floors: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 2 Geschosse"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Grundstücksgröße</label>
                      <input 
                        type="text" 
                        value={formState.plotSize}
                        onChange={(e) => setFormState({ ...formState, plotSize: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 650 m²"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Garagen</label>
                      <input 
                        type="text" 
                        value={formState.garages}
                        onChange={(e) => setFormState({ ...formState, garages: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 1"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Stellplätze</label>
                      <input 
                        type="text" 
                        value={formState.parkingSpaces}
                        onChange={(e) => setFormState({ ...formState, parkingSpaces: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 2"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Provision</label>
                      <input 
                        type="text" 
                        value={formState.commission}
                        onChange={(e) => setFormState({ ...formState, commission: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 3,57 % inkl. MwSt."
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Übernahme</label>
                      <input 
                        type="text" 
                        value={formState.handover}
                        onChange={(e) => setFormState({ ...formState, handover: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. Nach Absprache"
                      />
                    </div>
                  </div>

                  {/* Section 3: Medien & Beschreibungen */}
                  <h4 className={styles.sectionFormTitle}>3. Medien & Detailbeschreibungen</h4>

                  <div className={styles.formGroup}>
                    <label>Hauptbild</label>
                    {formState.img ? (
                      <div className={styles.mainImagePreviewWrapper}>
                        <img src={formState.img} alt="Vorschau Hauptbild" className={styles.mainImagePreview} />
                        <button type="button" className={styles.removeImageBtn} onClick={handleRemoveMainImage} title="Bild entfernen">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className={styles.uploadZone}>
                        <input 
                          type="file" 
                          id="main-image-upload"
                          accept="image/*"
                          onChange={handleMainImageUpload}
                          className={styles.fileInputHidden}
                        />
                        <label htmlFor="main-image-upload" className={styles.uploadLabel}>
                          <Plus size={24} />
                          <span>Hauptbild hochladen</span>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Weitere Galeriebilder</label>
                    <div className={styles.galleryGrid}>
                      {formState.images.map((imgUrl, idx) => (
                        <div key={idx} className={styles.galleryThumbWrapper}>
                          <img src={imgUrl} className={styles.galleryThumb} alt={`Galeriebild ${idx + 1}`} />
                          <button 
                            type="button" 
                            className={styles.thumbDeleteBtn} 
                            onClick={() => handleRemoveGalleryImage(idx)}
                            title="Bild entfernen"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                      <div className={styles.galleryAddCard}>
                        <input 
                          type="file" 
                          id="gallery-images-upload"
                          multiple
                          accept="image/*"
                          onChange={handleGalleryUpload}
                          className={styles.fileInputHidden}
                        />
                        <label htmlFor="gallery-images-upload" className={styles.galleryAddLabel}>
                          <Plus size={20} />
                          <span>Hinzufügen</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <FileText size={16} style={{ color: 'var(--color-accent)' }} />
                      <span>Exposé-PDF Link (URL) für automatischen E-Mail-Versand</span>
                    </label>
                    <input 
                      type="url" 
                      value={formState.exposeUrl}
                      onChange={(e) => setFormState({ ...formState, exposeUrl: e.target.value })}
                      className={styles.input} 
                      placeholder="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ImmoM/Expose-Objekt-1.pdf" 
                    />
                    <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                      Fügen Sie hier den R2/PDF-Link ein. Interessenten erhalten diese PDF-Datei automatisch per E-Mail nach der Exposé-Anforderung.
                    </span>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Großer Beschreibungstext</label>
                    <textarea 
                      rows={5}
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className={styles.textarea} 
                      placeholder="Schreiben Sie hier einen ausführlichen Beschreibungstext für das Exposé..."
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Ausstattungstext</label>
                    <textarea 
                      rows={3}
                      value={formState.fittings}
                      onChange={(e) => setFormState({ ...formState, fittings: e.target.value })}
                      className={styles.textarea} 
                      placeholder="z.B. Fußbodenheizung, Parkettboden, moderne Einbauküche..."
                    />
                  </div>

                  {/* Section 4: Energieausweis-Daten */}
                  <h4 className={styles.sectionFormTitle}>4. Energieausweis-Daten</h4>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Art des Energieausweises</label>
                      <input 
                        type="text" 
                        value={formState.energyType}
                        onChange={(e) => setFormState({ ...formState, energyType: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. Verbrauchsausweis"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Endenergiebedarf</label>
                      <input 
                        type="text" 
                        value={formState.energyDemand}
                        onChange={(e) => setFormState({ ...formState, energyDemand: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. 124 kWh/(m²·a)"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Warmwasser ist enthalten</label>
                      <input 
                        type="text" 
                        value={formState.hotWater}
                        onChange={(e) => setFormState({ ...formState, hotWater: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. Ja (in Endenergie enthalten)"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Energieeffizienzklasse (A+ bis H)</label>
                      <input 
                        type="text" 
                        value={formState.energyClass}
                        onChange={(e) => setFormState({ ...formState, energyClass: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. D"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Gebäudeart</label>
                      <input 
                        type="text" 
                        value={formState.buildingType}
                        onChange={(e) => setFormState({ ...formState, buildingType: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. Einfamilienhaus (freistehend)"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Baujahr / Sanierung</label>
                      <input 
                        type="text" 
                        value={formState.renovationYear}
                        onChange={(e) => setFormState({ ...formState, renovationYear: e.target.value })}
                        className={styles.input} 
                        placeholder="z.B. Sanierung 2018 (Heizung)"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="accent" className={styles.submitBtn}>
                    <CheckCircle size={18} />
                    <span>{editingId !== null ? 'Änderungen speichern' : 'Objekt anlegen'}</span>
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdminDashboard;
