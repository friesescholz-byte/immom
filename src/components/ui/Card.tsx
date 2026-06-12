import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'flat' | 'hover' | 'accent' | 'glass';
  onClick?: () => void;
  hoverScale?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'hover',
  onClick,
  hoverScale = true,
}) => {
  const cardClass = `${styles.card} ${styles[variant]} ${onClick ? styles.clickable : ''} ${className}`;

  const animations = variant === 'hover' && hoverScale
    ? {
        whileHover: { 
          y: -8, 
          scale: 1.01,
          boxShadow: 'var(--shadow-lg)',
          borderColor: 'rgba(122, 146, 163, 0.3)'
        },
        whileTap: { scale: 0.99 },
      }
    : {};

  return (
    <motion.div
      className={cardClass}
      onClick={onClick}
      {...animations}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
