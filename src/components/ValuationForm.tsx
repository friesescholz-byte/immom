import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Home, Building, Layers, 
  CheckCircle2, Send, HelpCircle 
} from 'lucide-react';
import styles from './ValuationForm.module.css';
import Button from './ui/Button';

export const ValuationForm: React.FC = () => {
  const [flow, setFlow] = useState<'start' | 'haus' | 'wohnung' | 'gewerbe' | 'beratung'>('start');
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    // Step 1 choice: haus | wohnung | gewerbe | beratung
    // Haus specific
    hausart: 'einfamilienhaus', // einfamilienhaus | mehrfamilienhaus
    subHausart: 'freistehend', // freistehend | doppelhaushaelfte | reihenhaus | bungalow | zweifamilienhaus
    wohnungenAnzahl: '',
    gewerbeAnteil: 'nein',
    zimmeranz: '',
    etagen: '',
    wohnflaeche: '',
    grundstueckflaeche: '',
    baujahr: '',
    besonderheitenHaus: [] as string[],
    vermietetHaus: 'nein',
    
    // Wohnung specific
    wohnungsflaeche: '',
    wohnungszimmer: '',
    wohnungsbaujahr: '',
    wohnungsEtage: '',
    besonderheitenWohnung: [] as string[],
    vermietetWohnung: 'nein',
    
    // Gewerbe specific
    gewerbeart: 'buero', // buero | praxis | laden | lager | sonstiges
    gewerbeflaeche: '',
    gewerbebaujahr: '',
    
    // Contact Info (all flows)
    anrede: 'herr',
    vorname: '',
    nachname: '',
    email: '',
    phone: '',
    terminwunsch: '',
    datenschutz: false
  });

  const handleCheckboxChange = (field: 'besonderheitenHaus' | 'besonderheitenWohnung', value: string) => {
    const current = formData[field];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(item => item !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => {
    if (step === 1) {
      setFlow('start');
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleStartFlow = (selectedFlow: 'haus' | 'wohnung' | 'gewerbe' | 'beratung') => {
    setFlow(selectedFlow);
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
  };

  // Determine total steps for active flow
  const getTotalSteps = () => {
    switch (flow) {
      case 'haus': return formData.hausart === 'einfamilienhaus' ? 6 : 6;
      case 'wohnung': return 4;
      case 'gewerbe': return 3;
      case 'beratung': return 2;
      default: return 1;
    }
  };

  const progressPercent = (step / getTotalSteps()) * 100;

  // Render Flows
  return (
    <div className={styles.formCard}>
      <div className={styles.cardHeader}>
        <div className={styles.headerInfo}>
          <h3>Online-Wertermittlung</h3>
          <span className={styles.accentText}>Kostenlos & Unverbindlich</span>
        </div>
        {flow !== 'start' && !isSubmitted && (
          <button className={styles.backBtn} onClick={handlePrev}>
            <ArrowLeft size={16} />
            <span>Zurück</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div 
            key="success"
            className={styles.successState}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2 size={56} className={styles.successIcon} />
            <h3>Anfrage erfolgreich!</h3>
            <p>
              Vielen Dank für Ihre Daten. Wir werten Ihre Angaben umgehend aus und Christian Menzel 
              wird sich persönlich bei Ihnen für eine ehrliche Experten-Einschätzung melden.
            </p>
            <span className={styles.successTag}>✓ Spezialisiert auf Nienburg u. die Region</span>
          </motion.div>
        ) : flow === 'start' ? (
          <motion.div 
            key="start"
            className={styles.stepWrapper}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className={styles.introTexts}>
              <h4>Was möchten Sie bewerten lassen?</h4>
              <p>Wählen Sie die passende Kategorie für Ihre Immobilie:</p>
            </div>

            <div className={styles.choiceGrid}>
              <button className={styles.choiceBtn} onClick={() => handleStartFlow('haus')}>
                <Home size={32} />
                <span>Haus</span>
              </button>
              <button className={styles.choiceBtn} onClick={() => handleStartFlow('wohnung')}>
                <Building size={32} />
                <span>Wohnung</span>
              </button>
              <button className={styles.choiceBtn} onClick={() => handleStartFlow('gewerbe')}>
                <Layers size={32} />
                <span>Gewerbe</span>
              </button>
              <button className={styles.choiceBtn} onClick={() => handleStartFlow('beratung')}>
                <HelpCircle size={32} />
                <span>Beratung</span>
              </button>
            </div>
            
            <div className={styles.formFooterTrust}>
              <span>✓ Über 30 Jahre Immobilienkompetenz</span>
              <span>✓ 100% DSGVO-konforme Datenverarbeitung</span>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formElement}>
            {/* Progress bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
              <span className={styles.progressText}>Schritt {step} von {getTotalSteps()}</span>
            </div>

            {/* FLOW: HAUS */}
            {flow === 'haus' && (
              <div className={styles.flowContent}>
                {step === 1 && (
                  <motion.div key="h1" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Wählen Sie die Art des Hauses:</label>
                    <div className={styles.optionsBlock}>
                      <label className={`${styles.radioCard} ${formData.hausart === 'einfamilienhaus' ? styles.radioActive : ''}`}>
                        <input 
                          type="radio" 
                          name="hausart" 
                          value="einfamilienhaus" 
                          checked={formData.hausart === 'einfamilienhaus'}
                          onChange={() => setFormData({...formData, hausart: 'einfamilienhaus'})}
                        />
                        <span>Einfamilienhaus</span>
                      </label>
                      <label className={`${styles.radioCard} ${formData.hausart === 'mehrfamilienhaus' ? styles.radioActive : ''}`}>
                        <input 
                          type="radio" 
                          name="hausart" 
                          value="mehrfamilienhaus" 
                          checked={formData.hausart === 'mehrfamilienhaus'}
                          onChange={() => setFormData({...formData, hausart: 'mehrfamilienhaus'})}
                        />
                        <span>Mehrfamilienhaus</span>
                      </label>
                    </div>
                    <Button variant="primary" onClick={handleNext} className={styles.nextBtn}>
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="h2" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {formData.hausart === 'einfamilienhaus' ? (
                      <>
                        <label className={styles.groupLabel}>Wählen Sie die spezifische Hausart:</label>
                        <select 
                          value={formData.subHausart} 
                          onChange={(e) => setFormData({...formData, subHausart: e.target.value})}
                          className={styles.selectInput}
                        >
                          <option value="freistehend">Freistehendes Einfamilienhaus</option>
                          <option value="doppelhaushaelfte">Doppelhaushälfte</option>
                          <option value="reihenhaus">Reihenhaus (Eck / Mittel)</option>
                          <option value="bungalow">Bungalow</option>
                          <option value="zweifamilienhaus">Zweifamilienhaus</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <label className={styles.groupLabel}>Details zum Mehrfamilienhaus:</label>
                        <div className={styles.formRow}>
                          <div className={styles.formField}>
                            <label>Anzahl Wohnungen</label>
                            <input 
                              type="number" 
                              placeholder="z.B. 6" 
                              value={formData.wohnungenAnzahl}
                              onChange={(e) => setFormData({...formData, wohnungenAnzahl: e.target.value})}
                              className={styles.textInput}
                              required
                            />
                          </div>
                          <div className={styles.formField}>
                            <label>Gewerbeanteil vorhanden?</label>
                            <select 
                              value={formData.gewerbeAnteil}
                              onChange={(e) => setFormData({...formData, gewerbeAnteil: e.target.value})}
                              className={styles.selectInput}
                            >
                              <option value="nein">Nein</option>
                              <option value="ja">Ja</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                    <Button variant="primary" onClick={handleNext} className={styles.nextBtn}>
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="h3" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Zimmer & Etagen:</label>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Zimmeranzahl</label>
                        <input 
                          type="number" 
                          placeholder="z.B. 5" 
                          value={formData.zimmeranz}
                          onChange={(e) => setFormData({...formData, zimmeranz: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Etagen (ohne Keller)</label>
                        <input 
                          type="number" 
                          placeholder="z.B. 2" 
                          value={formData.etagen}
                          onChange={(e) => setFormData({...formData, etagen: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                    </div>
                    <Button variant="primary" onClick={handleNext} className={styles.nextBtn}>
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="h4" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Wohn- & Grundstücksfläche:</label>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Wohnfläche (in m²)</label>
                        <input 
                          type="number" 
                          placeholder="z.B. 140" 
                          value={formData.wohnflaeche}
                          onChange={(e) => setFormData({...formData, wohnflaeche: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Grundstücksfläche (in m²)</label>
                        <input 
                          type="number" 
                          placeholder="z.B. 600" 
                          value={formData.grundstueckflaeche}
                          onChange={(e) => setFormData({...formData, grundstueckflaeche: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.formField} style={{ marginTop: '1rem' }}>
                      <label>Baujahr (ca.)</label>
                      <input 
                        type="number" 
                        placeholder="z.B. 1998" 
                        value={formData.baujahr}
                        onChange={(e) => setFormData({...formData, baujahr: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <Button variant="primary" onClick={handleNext} className={styles.nextBtn}>
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="h5" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Besonderheiten & Vermietung:</label>
                    <div className={styles.checkboxGrid}>
                      {[
                        { id: 'keller', label: 'Unterkellert' },
                        { id: 'garage', label: 'Garage / Stellplatz' },
                        { id: 'modernisiert', label: 'Kürzlich modernisiert' },
                        { id: 'kamin', label: 'Kaminofen' },
                        { id: 'sauna', label: 'Sauna' },
                        { id: 'denkmal', label: 'Denkmalschutz' }
                      ].map(item => (
                        <label key={item.id} className={styles.checkCard}>
                          <input 
                            type="checkbox"
                            checked={formData.besonderheitenHaus.includes(item.id)}
                            onChange={() => handleCheckboxChange('besonderheitenHaus', item.id)}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className={styles.formField} style={{ marginTop: '1.25rem' }}>
                      <label>Ist die Immobilie vermietet?</label>
                      <select 
                        value={formData.vermietetHaus}
                        onChange={(e) => setFormData({...formData, vermietetHaus: e.target.value})}
                        className={styles.selectInput}
                      >
                        <option value="nein">Nein (selbstgenutzt / leerstehend)</option>
                        <option value="ja">Ja (vollständig / teilweise vermietet)</option>
                      </select>
                    </div>
                    <Button variant="primary" onClick={handleNext} className={styles.nextBtn}>
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div key="h6" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Ihre Kontaktdaten:</label>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Anrede</label>
                        <select 
                          value={formData.anrede}
                          onChange={(e) => setFormData({...formData, anrede: e.target.value})}
                          className={styles.selectInput}
                        >
                          <option value="herr">Herr</option>
                          <option value="frau">Frau</option>
                        </select>
                      </div>
                      <div className={styles.formField} />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Vorname</label>
                        <input 
                          type="text" 
                          value={formData.vorname}
                          onChange={(e) => setFormData({...formData, vorname: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Nachname</label>
                        <input 
                          type="text" 
                          value={formData.nachname}
                          onChange={(e) => setFormData({...formData, nachname: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.formField}>
                      <label>E-Mail-Adresse</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Telefonnummer</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <label className={styles.consentCheck}>
                      <input 
                        type="checkbox" 
                        checked={formData.datenschutz}
                        onChange={(e) => setFormData({...formData, datenschutz: e.target.checked})}
                        required
                      />
                      <span>Ich stimme der Datenschutzerklärung zu.</span>
                    </label>
                    <Button 
                      type="submit" 
                      variant="accent" 
                      disabled={!formData.email || !formData.phone || !formData.datenschutz}
                      className={styles.submitButton}
                    >
                      <span>Einschätzung anfordern</span>
                      <Send size={16} />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}

            {/* FLOW: WOHNUNG */}
            {flow === 'wohnung' && (
              <div className={styles.flowContent}>
                {step === 1 && (
                  <motion.div key="w1" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Basisdaten Ihrer Eigentumswohnung:</label>
                    <div className={styles.formField}>
                      <label>Wohnfläche (in m²)</label>
                      <input 
                        type="number" 
                        placeholder="z.B. 85" 
                        value={formData.wohnungsflaeche}
                        onChange={(e) => setFormData({...formData, wohnungsflaeche: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Zimmeranzahl</label>
                        <input 
                          type="number" 
                          placeholder="z.B. 3" 
                          value={formData.wohnungszimmer}
                          onChange={(e) => setFormData({...formData, wohnungszimmer: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Baujahr (ca.)</label>
                        <input 
                          type="number" 
                          placeholder="z.B. 2004" 
                          value={formData.wohnungsbaujahr}
                          onChange={(e) => setFormData({...formData, wohnungsbaujahr: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                    </div>
                    <Button variant="primary" onClick={handleNext} className={styles.nextBtn}>
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="w2" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Stockwerk & Ausstattung:</label>
                    <div className={styles.formField}>
                      <label>Stockwerk / Etage</label>
                      <input 
                        type="text" 
                        placeholder="z.B. 2. OG / Dachgeschoss" 
                        value={formData.wohnungsEtage}
                        onChange={(e) => setFormData({...formData, wohnungsEtage: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <div className={styles.checkboxGrid} style={{ marginTop: '0.5rem' }}>
                      {[
                        { id: 'balkon', label: 'Balkon / Loggia' },
                        { id: 'terrasse', label: 'Dachterrasse / Garten' },
                        { id: 'aufzug', label: 'Personenaufzug' },
                        { id: 'stellplatz', label: 'Tiefgarage / Stellplatz' },
                        { id: 'einbaukueche', label: 'Einbauküche' }
                      ].map(item => (
                        <label key={item.id} className={styles.checkCard}>
                          <input 
                            type="checkbox"
                            checked={formData.besonderheitenWohnung.includes(item.id)}
                            onChange={() => handleCheckboxChange('besonderheitenWohnung', item.id)}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                    <Button variant="primary" onClick={handleNext} className={styles.nextBtn}>
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="w3" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Vermietungsstatus:</label>
                    <div className={styles.formField}>
                      <label>Ist die Wohnung aktuell vermietet?</label>
                      <select 
                        value={formData.vermietetWohnung}
                        onChange={(e) => setFormData({...formData, vermietetWohnung: e.target.value})}
                        className={styles.selectInput}
                      >
                        <option value="nein">Nein (selbstgenutzt / bezugsfrei)</option>
                        <option value="ja">Ja (Kapitalanlage / vermietet)</option>
                      </select>
                    </div>
                    <Button variant="primary" onClick={handleNext} className={styles.nextBtn}>
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="w4" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Ihre Kontaktdaten:</label>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Vorname</label>
                        <input 
                          type="text" 
                          value={formData.vorname}
                          onChange={(e) => setFormData({...formData, vorname: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Nachname</label>
                        <input 
                          type="text" 
                          value={formData.nachname}
                          onChange={(e) => setFormData({...formData, nachname: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.formField}>
                      <label>E-Mail-Adresse</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Telefonnummer</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <label className={styles.consentCheck}>
                      <input 
                        type="checkbox" 
                        checked={formData.datenschutz}
                        onChange={(e) => setFormData({...formData, datenschutz: e.target.checked})}
                        required
                      />
                      <span>Ich stimme der Datenschutzerklärung zu.</span>
                    </label>
                    <Button 
                      type="submit" 
                      variant="accent" 
                      disabled={!formData.email || !formData.phone || !formData.datenschutz}
                      className={styles.submitButton}
                    >
                      <span>Einschätzung anfordern</span>
                      <Send size={16} />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}

            {/* FLOW: GEWERBE */}
            {flow === 'gewerbe' && (
              <div className={styles.flowContent}>
                {step === 1 && (
                  <motion.div key="g1" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Basisdaten der Gewerbeeinheit:</label>
                    <div className={styles.formField}>
                      <label>Art des Gewerbes</label>
                      <select 
                        value={formData.gewerbeart}
                        onChange={(e) => setFormData({...formData, gewerbeart: e.target.value})}
                        className={styles.selectInput}
                      >
                        <option value="buero">Büro / Kanzlei / Praxis</option>
                        <option value="laden">Einzelhandel / Ladenfläche</option>
                        <option value="lager">Lagerhalle / Logistik / Werkstatt</option>
                        <option value="commercial">Mehrfamilienhaus / Wohn- & Geschäftshaus</option>
                        <option value="sonstiges">Sonstiges Gewerbe</option>
                      </select>
                    </div>
                    <div className={styles.formField}>
                      <label>Nutzfläche (in m²)</label>
                      <input 
                        type="number" 
                        placeholder="z.B. 250" 
                        value={formData.gewerbeflaeche}
                        onChange={(e) => setFormData({...formData, gewerbeflaeche: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Baujahr (ca.)</label>
                      <input 
                        type="number" 
                        placeholder="z.B. 1990" 
                        value={formData.gewerbebaujahr}
                        onChange={(e) => setFormData({...formData, gewerbebaujahr: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <Button variant="primary" onClick={handleNext} className={styles.nextBtn}>
                      <span>Weiter</span>
                      <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="g2" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Kontaktdaten für das Gutachten:</label>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Vorname</label>
                        <input 
                          type="text" 
                          value={formData.vorname}
                          onChange={(e) => setFormData({...formData, vorname: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Nachname</label>
                        <input 
                          type="text" 
                          value={formData.nachname}
                          onChange={(e) => setFormData({...formData, nachname: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.formField}>
                      <label>E-Mail-Adresse</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Telefonnummer</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <label className={styles.consentCheck}>
                      <input 
                        type="checkbox" 
                        checked={formData.datenschutz}
                        onChange={(e) => setFormData({...formData, datenschutz: e.target.checked})}
                        required
                      />
                      <span>Ich stimme der Datenschutzerklärung zu.</span>
                    </label>
                    <Button 
                      type="submit" 
                      variant="accent" 
                      disabled={!formData.email || !formData.phone || !formData.datenschutz}
                      className={styles.submitButton}
                    >
                      <span>Einschätzung anfordern</span>
                      <Send size={16} />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}

            {/* FLOW: BERATUNG */}
            {flow === 'beratung' && (
              <div className={styles.flowContent}>
                {step === 1 && (
                  <motion.div key="b1" className={styles.inputsGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className={styles.groupLabel}>Ihre Kontaktdaten:</label>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Anrede</label>
                        <select 
                          value={formData.anrede}
                          onChange={(e) => setFormData({...formData, anrede: e.target.value})}
                          className={styles.selectInput}
                        >
                          <option value="herr">Herr</option>
                          <option value="frau">Frau</option>
                        </select>
                      </div>
                      <div className={styles.formField} />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Vorname</label>
                        <input 
                          type="text" 
                          value={formData.vorname}
                          onChange={(e) => setFormData({...formData, vorname: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Nachname</label>
                        <input 
                          type="text" 
                          value={formData.nachname}
                          onChange={(e) => setFormData({...formData, nachname: e.target.value})}
                          className={styles.textInput}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.formField}>
                      <label>E-Mail-Adresse</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Telefonnummer</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={styles.textInput}
                        required
                      />
                    </div>
                    <div className={styles.formField}>
                      <label>Wunschtermin für Rückruf / Vor-Ort-Termin</label>
                      <input 
                        type="text" 
                        placeholder="z.B. Dienstag Nachmittag" 
                        value={formData.terminwunsch}
                        onChange={(e) => setFormData({...formData, terminwunsch: e.target.value})}
                        className={styles.textInput}
                      />
                    </div>
                    <label className={styles.consentCheck}>
                      <input 
                        type="checkbox" 
                        checked={formData.datenschutz}
                        onChange={(e) => setFormData({...formData, datenschutz: e.target.checked})}
                        required
                      />
                      <span>Ich stimme der Datenschutzerklärung zu.</span>
                    </label>
                    <Button 
                      type="submit" 
                      variant="accent" 
                      disabled={!formData.email || !formData.phone || !formData.datenschutz}
                      className={styles.submitButton}
                    >
                      <span>Beratung anfordern</span>
                      <Send size={16} />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValuationForm;
