import React from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, FileText, Accessibility } from 'lucide-react';
import styles from './LegalModal.module.css';

export interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'impressum' | 'datenschutz' | 'barrierefreiheit';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const getHeaderInfo = () => {
    switch (type) {
      case 'impressum':
        return {
          title: 'Impressum',
          badge: 'Rechtliche Angaben',
          icon: <FileText size={20} color="#D9A24A" />
        };
      case 'datenschutz':
        return {
          title: 'Datenschutzerklärung',
          badge: 'DSGVO & TDDDG Konform',
          icon: <ShieldCheck size={20} color="#D9A24A" />
        };
      case 'barrierefreiheit':
        return {
          title: 'Erklärung zur Barrierefreiheit',
          badge: 'BFSG & BITV 2.0',
          icon: <Accessibility size={20} color="#D9A24A" />
        };
    }
  };

  const info = getHeaderInfo();

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
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <div className={styles.headerTitle}>
            {info.icon}
            <h2>{info.title}</h2>
            <span className={styles.headerBadge}>{info.badge}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Modal schließen">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {type === 'impressum' && (
            <div className={styles.legalText}>
              <span className={styles.metaInfo}>Angaben gemäß § 5 TMG / § 18 Abs. 2 MStV</span>
              
              <h3>1. Angaben zum Unternehmen</h3>
              <p>
                <strong>ImmoM / CM-Immobilien</strong><br />
                Inhaber: <strong>Carsten Meyer</strong><br />
                Postanschrift: Postfach 1109, 31607 Marklohe<br />
                Büro- & Hausanschrift: An den Teichen 30, 31608 Marklohe
              </p>
              
              <h3>2. Kontaktmöglichkeiten</h3>
              <p>
                Telefon: <strong>+49 (0) 5021 860 10 01</strong><br />
                E-Mail: <strong><a href="mailto:mail@immom.eu">mail@immom.eu</a></strong><br />
                Website: <strong><a href="https://immom.de" target="_blank" rel="noopener noreferrer">www.immom.de</a></strong>
              </p>

              <h3>3. Umsatzsteuer-Identifikation</h3>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                <strong>DE257267899</strong>
              </p>

              <h3>4. Gewerbeerlaubnis & Aufsichtsbehörde</h3>
              <p>
                Gewerbeerlaubnis nach <strong>§ 34c Abs. 1 Satz 1 Nr. 1 GewO</strong> (Immobilienmakler) erteilt durch die zuständige Aufsichtsbehörde:<br />
                <strong>Landkreis Nienburg/Weser</strong><br />
                Kreishaus, Kreishaus am Schlossplatz, 31582 Nienburg/Weser
              </p>

              <h3>5. Zuständige Kammer</h3>
              <p>
                <strong>Industrie- und Handelskammer Hannover (IHK Hannover)</strong><br />
                Biffarstraße 4, 30175 Hannover
              </p>

              <h3>6. Berufsrechtliche Regelungen</h3>
              <p>
                Es gelten folgende berufsrechtliche Regelungen:
              </p>
              <ul>
                <li>§ 34c Gewerbeordnung (GewO)</li>
                <li>Makler- und Bauträgerverordnung (MaBV)</li>
                <li>Geldwäschegesetz (GwG)</li>
              </ul>

              <h3>7. Verbraucherstreitbeilegung & Online-Schlichtung</h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"> https://ec.europa.eu/consumers/odr</a>.<br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>

              <h3>8. Haftung für Inhalte und Links</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
              </p>
            </div>
          )}

          {type === 'datenschutz' && (
            <div className={styles.legalText}>
              <span className={styles.metaInfo}>Stand: August 2026 | DSGVO, BDSG & TDDDG (TTDSG)</span>

              <h3>1. Datenschutz auf einen Blick & Verantwortlicher</h3>
              <h4>Allgemeine Hinweise</h4>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer nachfolgend aufgeführten Datenschutzerklärung.
              </p>
              <h4>Verantwortliche Stelle</h4>
              <div className={styles.infoBox}>
                <p>
                  <strong>ImmoM / CM-Immobilien</strong><br />
                  Inhaber: Carsten Meyer<br />
                  An den Teichen 30, 31608 Marklohe (Postfach 1109, 31607 Marklohe)<br />
                  Telefon: +49 (0) 5021 860 10 01<br />
                  E-Mail: <a href="mailto:mail@immom.eu">mail@immom.eu</a>
                </p>
              </div>

              <h3>2. Hosting & Content Delivery Networks (CDN)</h3>
              <p>
                Wir hosten die Inhalte unserer Website bei folgenden Anbietern:
              </p>
              <h4>Cloudflare Pages & Cloudflare R2 Media Storage</h4>
              <p>
                Anbieter ist die Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA (nachfolgend „Cloudflare“).
              </p>
              <p>
                Cloudflare bietet ein weltweit verteiltes Content Delivery Network (CDN) mit DNS an. Technisch wird der Informationstransfer zwischen Ihrem Browser und unserer Website über das Netzwerk von Cloudflare geleitet. Das versetzt Cloudflare in die Lage, den Datenverkehr zwischen Ihrem Browser und unserer Website zu analysieren und als Filter zwischen unseren Servern und potenziell bösartigem Datenverkehr aus dem Internet zu dienen.
              </p>
              <p>
                Bilder und Mediendateien werden über den Cloudflare R2 Objektspeicher bereitgestellt. Der Einsatz von Cloudflare erfolgt auf Grundlage unseres berechtigten Interesses an einer möglichst fehlerfreien, schnellen und sicheren Bereitstellung unseres Webangebots (Art. 6 Abs. 1 lit. f DSGVO). Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission sowie das EU-US Data Privacy Framework gestützt.
              </p>

              <h3>3. Allgemeine Hinweise und Pflichtinformationen</h3>
              <h4>SSL- bzw. TLS-Verschlüsselung</h4>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Immobilienbewertungen, Exposé-Anfragen oder Tippgeber-Meldungen, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
              <h4>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h4>
              <p>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>
              <h4>Recht auf Auskunft, Berichtigung, Löschung und Einschränkung</h4>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung (Art. 15 DSGVO) sowie ein Recht auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO) oder Einschränkung der Verarbeitung dieser Daten (Art. 18 DSGVO).
              </p>
              <h4>Recht auf Datenübertragbarkeit</h4>
              <p>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen (Art. 20 DSGVO).
              </p>
              <h4>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h4>
              <p>
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Die für uns zuständige Aufsichtsbehörde ist:
                <br /><strong>Die Landesbeauftragte für den Datenschutz Niedersachsen</strong>, Prinzenstraße 5, 30159 Hannover.
              </p>

              <h3>4. Datenerfassung auf unserer Website</h3>
              <h4>Cookies und LocalStorage</h4>
              <p>
                Unsere Internetseiten verwenden teilweise sogenannte Cookies und moderne Browser-Speichertechnologien (LocalStorage). Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren.
              </p>
              <p>
                Wir setzen vorrangig technisch notwendige Speicherungen ein (z. B. Session-Status, Merkzettel-Funktion für Immobilien und Zustände von Formularen). Rechtsgrundlage hierfür ist § 25 Abs. 2 Nr. 2 TDDDG (Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz) in Verbindung mit Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <h4>Server-Log-Dateien</h4>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse). Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3>5. Formulare & Anfragen auf unserer Website</h3>
              <p>
                Auf unserer Website stehen Ihnen mehrere spezialisierte Formulare zur Verfügung:
              </p>
              <ul>
                <li><strong>Online-Immobilienbewertung:</strong> Erfassung von Immobiliendaten (Art, Fläche, Baujahr, Zustand) und Kontaktdaten zur Erstellung einer professionellen Marktwertanalyse.</li>
                <li><strong>Exposé- & Besichtigungsanfragen:</strong> Erfassung von Kontaktdaten und Rückfragen zu konkreten Immobilienangeboten inklusive automatisiertem Exposé-Abruf.</li>
                <li><strong>Ratgeber & Checklisten-Download:</strong> Erfassung Ihrer E-Mail-Adresse zum Zweck der Zusendung von Fach-Checklisten zur Immobilienaufbereitung und zum Hausverkauf.</li>
                <li><strong>Tippgeber-Formular:</strong> Erfassung von Tippgeber- und Objektdaten zur Prüfung von Hinweisen auf verkaufsbereite Immobilien.</li>
              </ul>
              <p>
                <strong>Rechtsgrundlage:</strong> Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) bzw. auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
              <h4>E-Mail-Versand via Resend</h4>
              <p>
                Für die technische Auslieferung und Zustellung von Bestätigungs- und Benachrichtigungs-E-Mails nutzen wir den Dienst <strong>Resend</strong> (Resend Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA). Die Datenübertragung wird auf die Standardvertragsklauseln der EU-Kommission gestützt.
              </p>

              <h3>6. Spam-Schutz & Bot-Abwehr (Cloudflare Turnstile)</h3>
              <p>
                Wir nutzen <strong>Cloudflare Turnstile</strong> (Anbieter: Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA) auf unseren Formularen. Turnstile dient dazu zu prüfen, ob die Dateneingabe durch einen Menschen oder durch ein automatisiertes Programm (Bot/Spam) erfolgt.
              </p>
              <p>
                Turnstile ist eine datenschutzfreundliche Alternative zu herkömmlichen Captchas: Es setzt keine Cookies auf Endgeräten der Nutzer und sammelt keine privaten Nutzerprofile. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im Schutz unseres Webangebots vor missbräuchlicher automatisierter Ausspähung und vor SPAM.
              </p>

              <h3>7. Analyse-Tools, Werbepixel & Marketing</h3>
              <h4>Google Analytics 4 & Google Tag Manager</h4>
              <p>
                Soweit Sie Ihre Einwilligung erteilt haben, nutzt diese Website Funktionen des Webanalysedienstes <strong>Google Analytics 4</strong>. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p>
                Google Analytics verwendet Technologien, die die Wiedererkennung des Nutzers zur Analyse des Nutzerverhaltens ermöglichen (z. B. Cookies oder Device-Fingerprinting). Die IP-Anonymisierung ist in Google Analytics standardmäßig aktiviert. Rechtsgrundlage für diese Datenverarbeitung ist Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung ist jederzeit widerrufbar.
              </p>
              <h4>Meta Pixel (ehemals Facebook Pixel) & Conversion API</h4>
              <p>
                Soweit eingewilligt, nutzen wir zur Konversionsmessung das Besucheraktions-Pixel der <strong>Meta Platforms Ireland Limited</strong>, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland.
              </p>
              <p>
                So kann das Verhalten der Seitenbesucher nachverfolgt werden, nachdem diese durch Klick auf eine Meta-Werbeanzeige auf unsere Website weitergeleitet wurden. Dadurch können wir die Wirksamkeit der Werbeanzeigen für statistische und Marktforschungszwecke auswerten und zukünftige Werbemaßnahmen optimieren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
              </p>

              <h3>8. Externe Kartendienste & Schriften</h3>
              <h4>Google Maps</h4>
              <p>
                Diese Seite nutzt über eine Schnittstelle den Kartendienst <strong>Google Maps</strong>. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p>
                Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu verarbeiten. Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Immobilienstandorte und einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
              </p>
              <h4>Google Web Fonts (lokale & optimierte Einbindung)</h4>
              <p>
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Web Fonts von Google. Die Google Fonts sind zur Wahrung des Datenschutzes DSGVO-konform eingebunden, sodass beim Aufruf unserer Seiten keine unautorisierte Verbindung zu den Servern von Google in den USA aufgebaut wird.
              </p>
              <h4>Google Rezensionen</h4>
              <p>
                Auf unserer Website sind Verlinkungen zu unserem öffentlichen Profil bei Google Rezensionen integriert. Erst beim aktiven Anklicken des Links werden Sie auf die Server von Google weitergeleitet.
              </p>
            </div>
          )}

          {type === 'barrierefreiheit' && (
            <div className={styles.legalText}>
              <span className={styles.metaInfo}>Stand: August 2026 | BFSG & BITV 2.0 / WCAG 2.1 AA</span>

              <h3>1. Unser Bekenntnis zur Barrierefreiheit</h3>
              <p>
                Die Betreiberin dieser Website (<strong>ImmoM / CM-Immobilien</strong>, Inhaber: Carsten Meyer, <a href="https://immom.de">www.immom.de</a>) legt allergrößten Wert auf eine uneingeschränkte, chancengleiche und möglichst barrierefreie Zugänglichkeit ihrer digitalen Angebote und Immobiliendienstleistungen für alle Menschen, unabhängig von körperlichen oder technischen Einschränkungen.
              </p>
              <p>
                Diese Website wurde nach den Vorgaben des <strong>Barrierefreiheitsstärkungsgesetzes (BFSG)</strong>, der <strong>Barrierefreie-Informationstechnik-Verordnung (BITV 2.0)</strong> sowie der <strong>Web Content Accessibility Guidelines (WCAG 2.1 / 2.2 – Konformitätsstufe AA)</strong> konzipiert und umgesetzt.
              </p>

              <h3>2. Stand der Vereinbarkeit mit den Anforderungen</h3>
              <p>
                Diese Website ist mit den Bestimmungen der europäischen Norm <strong>EN 301 549</strong> sowie den WCAG 2.1 / 2.2 Stufe AA <strong>weitestgehend vereinbar</strong>.
              </p>
              <p>
                Folgende Maßnahmen zur digitalen Barrierefreiheit sind auf dieser Website standardmäßig integriert:
              </p>
              <ul>
                <li><strong>Hohe Farbkontraste:</strong> Texte, Headlines und interaktive Schaltflächen weisen starke Kontrastverhältnisse gemäß den WCAG-Standards (mindestens 4,5:1 für Fließtext) auf.</li>
                <li><strong>Skalierbarkeit & Zoom:</strong> Schriftgrößen und Layouts passen sich dynamisch an Bildschirmgrößen an und können im Browser bis zu 200% vergrößert werden, ohne dass Inhalte oder Funktionen verloren gehen.</li>
                <li><strong>Tastaturbedienbarkeit:</strong> Sämtliche Kernfunktionen, Navigationsleisten, interaktive Filter und Formulare lassen sich ohne Maus vollständig über die Tastatur (Tab-Taste, Enter, Pfeiltasten) ansteuern.</li>
                <li><strong>Semantische HTML5-Struktur:</strong> Klare Überschriftenhierarchien (`h1` bis `h4`), Landkarten- und Inhaltsbereiche (`nav`, `main`, `section`, `footer`) sowie ARIA-Attribute für Screenreader-Software.</li>
                <li><strong>Formular-Barrierefreiheit:</strong> Klare Beschriftungen (`labels`), verständliche Hilfetexte und eindeutige Fehlermeldungen unterstützen sehbehinderte oder motorisch eingeschränkte Nutzer beim Ausfüllen der Immobilienbewertung oder Kontaktformulare.</li>
              </ul>

              <h3>3. Nicht barrierefreie Inhalte & bekannte Einschränkungen</h3>
              <p>
                Trotz unseres kontinuierlichen Strebens nach optimaler Barrierefreiheit können folgende Inhalte derzeit noch Einschränkungen aufweisen:
              </p>
              <ul>
                <li><strong>Ältere PDF-Dokumente:</strong> Vereinzelte ältere PDF-Exposés oder Grundriss-Scans sind möglicherweise noch nicht vollständig barrierefrei für Screenreader aufbereitet. Neu erstellte Dokumente werden sukzessive barrierefrei optimiert.</li>
                <li><strong>Externe Kartendienste:</strong> Interaktive Kartenansichten (Google Maps) können für Nutzer mit reiner Tastaturnavigation oder Screenreadern teilweise schwer bedienbar sein. Alle relevanten Adressdaten stellen wir deshalb parallel immer als reinen Text bereit.</li>
              </ul>
              <p>
                <em>Sollten Sie ein Exposé oder Dokument in einem für Sie zugänglichen Format benötigen, stellen wir Ihnen dieses selbstverständlich umgehend und kostenfrei zur Verfügung.</em>
              </p>

              <h3>4. Feedback und Kontakt zur Barrierefreiheit</h3>
              <p>
                Sind Ihnen Mängel beim barrierefreien Zugang zu Inhalten auf unserer Website aufgefallen? Oder haben Sie Fragen zur Umsetzung der Barrierefreiheit?
              </p>
              <p>
                Sie können sich jederzeit gerne direkt an uns wenden:
              </p>
              <div className={styles.infoBox}>
                <p>
                  <strong>Ansprechpartner für Barrierefreiheit:</strong><br />
                  Carsten Meyer (ImmoM / CM-Immobilien)<br />
                  An den Teichen 30, 31608 Marklohe<br />
                  Telefon: <strong>+49 (0) 5021 860 10 01</strong><br />
                  E-Mail: <strong><a href="mailto:mail@immom.eu?subject=Barrierefreiheit%20Website">mail@immom.eu</a></strong>
                </p>
              </div>

              <h3>5. Schlichtungs- und Durchsetzungsverfahren</h3>
              <p>
                Sollten Sie nach Ihrer Kontaktaufnahme mit uns keine zufriedenstellende Lösung erhalten haben, können Sie sich an die zuständige Schlichtungsstelle wenden:
              </p>
              <p>
                <strong>Landesbeauftragte für Menschen mit Behinderungen Niedersachsen</strong><br />
                Hannah-Arendt-Platz 2, 30159 Hannover<br />
                Telefon: +49 511 120-4010<br />
                E-Mail: <a href="mailto:landesbeauftragte@ms.niedersachsen.de">landesbeauftragte@ms.niedersachsen.de</a><br />
                Website: <a href="https://www.behindertenbeauftragte-niedersachsen.de" target="_blank" rel="noopener noreferrer">www.behindertenbeauftragte-niedersachsen.de</a>
              </p>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <p className={styles.footerNote}>
            ImmoM / CM-Immobilien • Marklohe & Region
          </p>
          <button className={styles.primaryCloseBtn} onClick={onClose}>
            Fenster schließen
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LegalModal;
