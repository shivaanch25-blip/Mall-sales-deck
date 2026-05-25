import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MapData, MapZone } from '../../types';
import { useManifest } from '../../context/ManifestContext';
import { resolveImage } from '../../lib/asset-resolver';
import { ManifestVideo } from '../media/ManifestVideo';
import { MapHotspot } from './MapHotspot';
import { ZoneCard } from './ZoneCard';
import styles from './InteractiveMap.module.css';

interface InteractiveMapProps {
  mapData: MapData;
}

export function InteractiveMap({ mapData }: InteractiveMapProps) {
  const { manifest } = useManifest();
  const [hovered, setHovered] = useState<MapZone | null>(null);
  const floor = mapData.floors.find((f) => f.id === mapData.floorDefault) ?? mapData.floors[0];
  const mapImage = resolveImage(
    manifest,
    floor.assets.map!,
    floor.assets.mapFallback
  );

  const activeZone = hovered;
  const ambientVideo = activeZone?.assets.ambient ?? 'ambient.hub';
  const ambientFallback = activeZone?.assets.ambientFallback ?? 'ambient.hubFallback';

  return (
    <section className={styles.hub}>
      <div className={styles.mapWrap}>
        <div className={styles.ambientPreview} aria-hidden>
          <ManifestVideo
            videoRef={ambientVideo}
            videoFallbackRef={ambientFallback}
            posterRef="hero.atrium"
            posterFallbackRef="hero.atriumFallback"
            className={styles.ambientVid}
            preload="none"
          />
        </div>
        <motion.div
          className={styles.mapFrame}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={mapImage.primary}
            alt="The Dubai Mall overview map"
            className={styles.mapImg}
            onError={(e) => {
              (e.target as HTMLImageElement).src = mapImage.fallback;
            }}
          />
          <div className={styles.hotspots}>
            {mapData.zones.map((zone) => (
              <MapHotspot
                key={zone.id}
                zone={zone}
                isActive={hovered?.id === zone.id}
                onHover={setHovered}
              />
            ))}
          </div>
        </motion.div>
      </div>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Explore zones</h2>
        <div className={styles.cards}>
          {mapData.zones.map((zone, i) => (
            <ZoneCard key={zone.id} zone={zone} index={i} />
          ))}
        </div>
      </aside>
    </section>
  );
}
