import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search, Compass, ArrowRight } from 'lucide-react';
import styles from './Steps.module.css';
import Button from './ui/Button';

export const Steps: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <ClipboardList size={24} />,
      title: 'Anfrage stellen',
      text: 'Sie senden uns die wichtigsten Daten zu Ihrer Immobilie oder vereinbaren einen persönlichen Beratungstermin.',
    },
    {
      num: '02',
      icon: <Search size={24} />,
      title: 'Vermarktung planen',
      text: 'Wir analysieren den Marktwert, erstellen ein professionelles Exposé und wählen die passende Strategie.',
    },
    {
      num: '03',
      icon: <Compass size={24} />,
      title: 'Erfolgreich verkaufen',
      text: 'Wir koordinieren Besichtigungen, prüfen die Bonität der Käufer und begleiten Sie bis zum Notartermin.',
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
        staggerChildren: 0.2
      }
    }
  };

  const stepVariants = {
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
    <section id="ablauf" className={`${styles.stepsSection} section-padding`}>
      <div className={`${styles.container} container`}>
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">Unser Ablauf</span>
          <h2>In 3 Schritten zum erfolgreichen Verkauf</h2>
          <p>
            Unser Vermarktungsprozess ist transparent, strukturiert und auf maximalen Erfolg ausgelegt.
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <motion.div 
          className={styles.stepsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className={styles.stepCardWrapper}
              variants={stepVariants}
            >
              {index < 2 && <div className={styles.connectorLine} />}
              
              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>{step.num}</span>
                  <div className={styles.iconWrapper}>
                    {step.icon}
                  </div>
                </div>
                
                <div className={styles.stepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button variant="primary" onClick={handleCtaClick}>
            <span>Kostenlose Bewertung anfragen</span>
            <ArrowRight size={16} />
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default Steps;
