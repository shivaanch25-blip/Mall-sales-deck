import { useManifest } from '../../context/ManifestContext';
import { resolveRef } from '../../lib/asset-resolver';
import styles from './GrainOverlay.module.css';

export function GrainOverlay() {
  const { manifest } = useManifest();
  const noise = resolveRef(manifest, 'ui.noise') ?? manifest.fallbacks.image;

  return (
    <div
      className={styles.grain}
      style={{ backgroundImage: `url(${noise})` }}
      aria-hidden
    />
  );
}
