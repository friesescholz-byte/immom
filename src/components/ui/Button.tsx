import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'text';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const buttonClass = `${styles.btn} ${styles[variant]} ${className}`;

  // Framer Motion animation values for high-end micro-interactions
  const hoverAnimation = variant === 'text' 
    ? { x: 4 } 
    : { y: -2, scale: 1.02, boxShadow: 'var(--shadow-accent)' };

  const tapAnimation = { scale: 0.98, y: 0 };

  if (variant === 'text') {
    return (
      <motion.button
        type={type}
        className={buttonClass}
        onClick={onClick}
        disabled={disabled}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <span className={styles.ripple}></span>
      <span className={styles.content}>{children}</span>
    </motion.button>
  );
};
export default Button;
