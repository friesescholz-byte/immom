import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './LegalModal.module.css';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'impressum' | 'datenschutz';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className={styles.modal}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Schließen">
          <X size={24} />
        </button>

        <div className={styles.content}>
          {type === 'impressum' ? (
            <div className={styles.legalText}>
              <h2>Impressum</h2>
              <p><strong>Angaben gemäß § 5 TMG:</strong></p>
              <p>
                ImmoM / CM-Immobilien<br />
                Inhaber: Christian Menzel<br />
                Postfach 1109, 31607 Marklohe<br />
                Büro: An den Teichen 30, 31608 Marklohe
              </p>
              
              <h3>Kontakt</h3>
              <p>
                Telefon: +49 5021 8601001<br />
                E-Mail: mail@immom.eu
              </p>

              <h3>Umsatzsteuer-ID</h3>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE257267899
              </p>

              <h3>Aufsichtsbehörde</h3>
              <p>
                Gewerbeerlaubnis nach § 34c GewO erteilt durch die zuständige Aufsichtsbehörde.
              </p>

              <h3>Streitschlichtung</h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"> https://ec.europa.eu/consumers/odr</a>.<br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          ) : (
            <div className={styles.legalText}>
              <h2>Datenschutzerklärung</h2>
              <h3>1. Datenschutz auf einen Blick</h3>
              <p><strong>Allgemeine Hinweise</strong></p>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
                wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
                werden können.
              </p>

              <h3>2. Datenerfassung auf unserer Website</h3>
              <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Impressum dieser Website entnehmen.
              </p>

              <p><strong>Wie erfassen wir Ihre Daten?</strong></p>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten 
                handeln, die Sie in unser Kontakt- oder Bewertungsformular eingeben.
              </p>
              <p>
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme 
                erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>

              <p><strong>Wofür nutzen wir Ihre Daten?</strong></p>
              <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere 
                Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Wenn Sie Anfragen über Formulare senden, 
                nutzen wir diese Daten ausschließlich zur Bearbeitung Ihres Anliegens (Bewertung, Kontaktaufnahme).
              </p>

              <h3>3. Ihre Rechte bezüglich Ihrer Daten</h3>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten 
                personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten 
                zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
                jederzeit für die Zukunft widerrufen.
              </p>
              <p>
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum 
                angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen 
                Aufsichtsbehörde zu.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LegalModal;
