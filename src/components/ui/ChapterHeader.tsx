import { motion } from 'framer-motion';
import styles from './ChapterHeader.module.css';

interface ChapterHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function ChapterHeader({ title, subtitle, description }: ChapterHeaderProps) {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <h1>{title}</h1>
      {description && <p className={styles.desc}>{description}</p>}
    </motion.header>
  );
}
