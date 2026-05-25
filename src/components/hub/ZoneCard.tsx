import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { MapZone } from '../../types';
import { useManifest } from '../../context/ManifestContext';
import { resolveIndirectRef } from '../../lib/asset-resolver';
import styles from './ZoneCard.module.css';

interface ZoneCardProps {
  zone: MapZone;
  index: number;
}

export function ZoneCard({ zone, index }: ZoneCardProps) {
  const { manifest } = useManifest();
  const navigate = useNavigate();
  const preview = resolveIndirectRef(manifest, zone.assets.preview!);

  return (
    <motion.button
      type="button"
      className={styles.card}
      onClick={() => navigate(zone.chapterRoute)}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <img
        src={preview.primary}
        alt=""
        className={styles.thumb}
        onError={(e) => {
          (e.target as HTMLImageElement).src = preview.fallback;
        }}
      />
      <div className={styles.meta}>
        <span className={styles.label}>{zone.label}</span>
        <span className={styles.cta}>{zone.cta.text}</span>
      </div>
    </motion.button>
  );
}
