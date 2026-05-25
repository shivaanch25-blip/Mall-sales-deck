import { motion } from 'framer-motion';
import type { AssetRefsBlock } from '../../types';
import { ManifestImage } from '../media/ManifestImage';
import { LuxuryButton } from './LuxuryButton';
import styles from './MediaCard.module.css';

interface MediaCardProps {
  title: string;
  description: string;
  assets: AssetRefsBlock;
  cta?: { text: string; route: string };
  index?: number;
  onClick?: () => void;
}

export function MediaCard({
  title,
  description,
  assets,
  cta,
  index = 0,
  onClick,
}: MediaCardProps) {
  const imageRef = assets.image ?? assets.heroImage;
  const imageFallbackRef = assets.imageFallback ?? assets.heroImageFallback;

  if (!imageRef) return null;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className={styles.media}>
        <ManifestImage
          imageRef={imageRef}
          fallbackRef={imageFallbackRef}
          alt={title}
          className={styles.img}
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.body}>
        <h3>{title}</h3>
        <p>{description}</p>
        {cta && (
          <LuxuryButton to={cta.route} variant="ghost">
            {cta.text}
          </LuxuryButton>
        )}
      </div>
    </motion.article>
  );
}
