import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './LuxuryButton.module.css';

interface LuxuryButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
}

export function LuxuryButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
}: LuxuryButtonProps) {
  const className = `${styles.btn} ${styles[variant]}`;

  const motionProps = {
    className,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  };

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to}>{children}</Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}
