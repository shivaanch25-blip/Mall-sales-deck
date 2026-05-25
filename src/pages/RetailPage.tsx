import { ChapterHeader } from '../components/ui/ChapterHeader';
import { MediaCard } from '../components/ui/MediaCard';
import { ManifestVideo } from '../components/media/ManifestVideo';
import { LuxuryButton } from '../components/ui/LuxuryButton';
import { useRetailData } from '../hooks/useDeckData';
import { useManifest } from '../context/ManifestContext';
import styles from './ChapterPage.module.css';
import heroStyles from './DiningPage.module.css';

export function RetailPage() {
  const { deck } = useManifest();
  const { data, loading } = useRetailData();
  const chapter = deck.chapters.find((c) => c.id === 'retail');

  if (loading || !data) {
    return <div className={styles.loading}>Loading…</div>;
  }

  return (
    <div className={styles.page}>
      <div className={heroStyles.hero}>
        {data.hero.assets.video && (
          <ManifestVideo
            videoRef={data.hero.assets.video}
            videoFallbackRef={data.hero.assets.videoFallback}
            posterRef={data.hero.assets.image}
            posterFallbackRef={data.hero.assets.imageFallback}
            className={heroStyles.heroVideo}
          />
        )}
        <div className={heroStyles.heroContent}>
          <ChapterHeader
            title={data.hero.title}
            subtitle={chapter?.subtitle}
            description={data.hero.description}
          />
          <LuxuryButton to={data.hero.cta.route}>{data.hero.cta.text}</LuxuryButton>
        </div>
      </div>
      <div className={styles.grid}>
        {data.items.map((item, i) => (
          <MediaCard
            key={item.id}
            title={item.title}
            description={item.description}
            assets={item.assets}
            cta={item.cta}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
