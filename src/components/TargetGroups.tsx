import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, HelpingHand, HelpCircle, Scale, ArrowRight } from 'lucide-react';
import styles from './TargetGroups.module.css';
import Card from './ui/Card';

export const TargetGroups: React.FC = () => {
  const groups = [
    {
      icon: <HelpingHand size={24} />,
      title: 'Sie möchten verkaufen?',
      text: 'Wir zeigen Ihnen, welcher Preis realistisch ist und wie Ihre Immobilie optimal am Markt positioniert wird.',
    },
    {
      icon: <Landmark size={24} />,
      title: 'Sie haben geerbt?',
      text: 'Wir helfen Ihnen, den Wert der Immobilie einzuordnen und die nächsten Schritte sicher zu planen.',
    },
    {
      icon: <HelpCircle size={24} />,
      title: 'Sie sind unsicher?',
      text: 'Sie müssen noch keine Entscheidung getroffen haben. Eine Bewertung schafft erst einmal Klarheit.',
    },
    {
      icon: <Scale size={24} />,
      title: 'Sie möchten vergleichen?',
      text: 'Wir geben Ihnen eine persönliche Einschätzung, damit Sie Angebote, Marktpreise und Möglichkeiten besser bewerten können.',
    },
  ];

  const handleCtaClick = () => {
    const el = document.querySelector('#bewertung');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section className={`${styles.targetGroupsSection} section-padding`}>
      <div className={`${styles.container} container`}>
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">Individuelle Situationen</span>
          <h2>Für Eigentümer, die Klarheit brauchen.</h2>
          <p>
            Egal aus welchem Anlass Sie den Wert Ihrer Immobilie erfahren möchten – wir beraten Sie verlässlich.
          </p>
        </div>

        {/* Groups Grid */}
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {groups.map((group, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card variant="hover" onClick={handleCtaClick} className={styles.groupCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    {group.icon}
                  </div>
                  <h3>{group.title}</h3>
                </div>
                <p>{group.text}</p>
                <div className={styles.cardFooter}>
                  <span>Bewertung anfragen</span>
                  <ArrowRight size={14} className={styles.arrowIcon} />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TargetGroups;
