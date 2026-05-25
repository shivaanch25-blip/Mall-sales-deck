import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { MediaCard } from '../components/ui/MediaCard';
import { ManifestVideo } from '../components/media/ManifestVideo';
import { useAttractionsData } from '../hooks/useDeckData';
import { useManifest } from '../context/ManifestContext';
import type { AttractionItem } from '../types';
import styles from './ChapterPage.module.css';

export function AttractionsPage() {
  const { deck } = useManifest();
  const { data, loading } = useAttractionsData();
  const [selected, setSelected] = useState<AttractionItem | null>(null);
  const chapter = deck.chapters.find((c) => c.id === 'attractions');

  if (loading || !data) {
    return <div className={styles.loading}>Loading…</div>;
  }

  return (
    <div className={styles.page}>
      <ChapterHeader
        title={data.title}
        subtitle={chapter?.subtitle}
        description={data.description}
      />
      <div className={styles.grid}>
        {data.items.map((item, i) => (
          <MediaCard
            key={item.id}
            title={item.title}
            description={item.description}
            assets={item.assets}
            cta={item.cta}
            index={i}
            onClick={() => item.assets.video && setSelected(item)}
          />
        ))}
      </div>
      <AnimatePresence>
        {selected && selected.assets.video && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={styles.modalInner}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.close}
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h2>{selected.title}</h2>
              <ManifestVideo
                videoRef={selected.assets.video}
                videoFallbackRef={selected.assets.videoFallback}
                posterRef={selected.assets.image}
                posterFallbackRef={selected.assets.imageFallback}
                className={styles.modalVideo}
                loop={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
