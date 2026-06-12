import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import styles from './Solution.module.css';
import Card from './ui/Card';

export const Solution: React.FC = () => {
  const benefits = [
    {
      icon: <Award size={28} />,
      title: 'Professionell',
      text: 'Maßgeschneiderte Exposés, hochwertige Fotoaufnahmen und eine ansprechende Präsentation Ihrer Immobilie.',
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Sicher & Zielgerichtet',
      text: 'Zugriff auf unsere umfangreiche Datenbank vorgemerkter, bonitätsgeprüfter Kaufinteressenten in der Region.',
    },
    {
      icon: <HeartHandshake size={28} />,
      title: 'Rundum-Service',
      text: 'Wir begleiten Sie von der Vorbereitung bis zur Schlüsselübergabe – persönlich und mit ehrlicher Beratung.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section id="vorteile" className={`${styles.solutionSection} section-padding`}>
      {/* Visual background details */}
      <div className={styles.bgOrnament} />
      
      <div className={`${styles.container} container`}>
        
        {/* Section Title & Subheading */}
        <div className={styles.headerRow}>
          <div className={styles.titleArea}>
            <span className="eyebrow">Unser Konzept</span>
            <h2 className={styles.heading}>
              Wir präsentieren Ihre Immobilie <br />
              <span className="highlight-gold">im besten Licht. Für den optimalen Erfolg.</span>
            </h2>
          </div>
          <div className={styles.descArea}>
            <p>
              Jede Immobilie ist einzigartig und verdient ein maßgeschneidertes Vermarktungskonzept. 
              Wir kombinieren professionelle Exposés, moderne Bildpräsentationen und ein erprobtes 
              Käufernetzwerk zu einer verkaufsstarken Strategie.
            </p>
            <p>
              So finden wir den perfekten Käufer für Ihr Objekt – verlässlich, seriös und zum 
              bestmöglichen Marktwert.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card variant="hover" className={styles.benefitCard}>
                <div className={styles.iconWrapper}>
                  {benefit.icon}
                </div>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardText}>{benefit.text}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Solution;
