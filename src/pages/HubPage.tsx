import { motion } from 'framer-motion';
import { useManifest } from '../context/ManifestContext';
import { InteractiveMap } from '../components/hub/InteractiveMap';
import { LuxuryButton } from '../components/ui/LuxuryButton';
import { useMapData } from '../hooks/useDeckData';
import { usePreloadOnMount } from '../hooks/useVideoPreload';
import styles from './HubPage.module.css';

export function HubPage() {
  const { deck } = useManifest();
  const { data: mapData, loading } = useMapData();
  usePreloadOnMount(deck.preload.onHubMount);

  if (loading || !mapData) {
    return <div className={styles.loading}>Loading hub…</div>;
  }

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className={styles.eyebrow}>{deck.venue}</p>
        <h1>{mapData.title}</h1>
        <p className={styles.tagline}>{deck.tagline}</p>
        <p className={styles.desc}>{mapData.description}</p>
        <div className={styles.actions}>
          <LuxuryButton to={deck.introRoute}>Cinematic intro</LuxuryButton>
          <LuxuryButton to="/why" variant="ghost">
            Why Dubai Mall
          </LuxuryButton>
          <LuxuryButton to="/events/module" variant="ghost">
            Events module
          </LuxuryButton>
        </div>
      </motion.div>
      <InteractiveMap mapData={mapData} />
    </div>
  );
}
