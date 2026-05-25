import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { MapZone } from '../../types';
import { useManifest } from '../../context/ManifestContext';
import { resolveIndirectRef, resolveRef } from '../../lib/asset-resolver';
import styles from './MapHotspot.module.css';

interface MapHotspotProps {
  zone: MapZone;
  isActive: boolean;
  onHover: (zone: MapZone | null) => void;
}

export function MapHotspot({ zone, isActive, onHover }: MapHotspotProps) {
  const { manifest } = useManifest();
  const navigate = useNavigate();
  const preview = resolveIndirectRef(manifest, zone.assets.preview!);
  const pinRef = zone.assets.pin ?? 'map.pinAquarium';
  const pinUrl = resolveRef(manifest, pinRef) ?? manifest.fallbacks.image;

  return (
    <motion.button
      type="button"
      className={`${styles.hotspot} ${isActive ? styles.active : ''}`}
      style={{ left: `${zone.position.x}%`, top: `${zone.position.y}%` }}
      onMouseEnter={() => onHover(zone)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(zone)}
      onBlur={() => onHover(null)}
      onClick={() => navigate(zone.chapterRoute)}
      aria-label={`${zone.label} — ${zone.cta.text}`}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
    >
      <img src={pinUrl} alt="" className={styles.pin} />
      <span className={styles.label}>{zone.label}</span>
      <img
        src={preview.primary}
        alt=""
        className={styles.preview}
        onError={(e) => {
          (e.target as HTMLImageElement).src = preview.fallback;
        }}
      />
    </motion.button>
  );
}
