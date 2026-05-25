import type { AssetRef } from '../../types';
import { ManifestVideo } from './ManifestVideo';
import styles from './AmbientVideoLayer.module.css';

interface AmbientVideoLayerProps {
  videoRef: AssetRef;
  videoFallbackRef?: AssetRef;
  posterRef?: AssetRef;
  posterFallbackRef?: AssetRef;
}

export function AmbientVideoLayer({
  videoRef,
  videoFallbackRef,
  posterRef,
  posterFallbackRef,
}: AmbientVideoLayerProps) {
  return (
    <div className={styles.layer} aria-hidden>
      <ManifestVideo
        videoRef={videoRef}
        videoFallbackRef={videoFallbackRef}
        posterRef={posterRef}
        posterFallbackRef={posterFallbackRef}
        className={styles.video}
        preload="metadata"
      />
      <div className={styles.scrim} />
    </div>
  );
}
