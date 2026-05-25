import { useEffect } from 'react';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { StatCounter } from '../components/ui/StatCounter';
import { LuxuryButton } from '../components/ui/LuxuryButton';
import { ManifestImage } from '../components/media/ManifestImage';
import { useStatsData } from '../hooks/useDeckData';
import { useManifest } from '../context/ManifestContext';
import { ScrollTrigger, initGsap } from '../lib/gsap';
import styles from './ChapterPage.module.css';
import scaleStyles from './ScalePage.module.css';

export function ScalePage() {
  const { deck } = useManifest();
  const { data, loading } = useStatsData();
  const chapter = deck.chapters.find((c) => c.id === 'scale');

  useEffect(() => {
    initGsap();
    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [data]);

  if (loading || !data) {
    return <div className={styles.loading}>Loading…</div>;
  }

  const bg = data.background.assets;

  return (
    <div className={styles.page}>
      <div className={scaleStyles.bg}>
        {bg.image && (
          <ManifestImage
            imageRef={bg.image}
            fallbackRef={bg.imageFallback}
            alt=""
            className={scaleStyles.bgImg}
          />
        )}
        <div className={scaleStyles.bgScrim} />
      </div>
      <ChapterHeader
        title={data.title}
        subtitle={chapter?.subtitle}
        description={data.description}
      />
      <div className={scaleStyles.stats}>
        {data.metrics.map((m) => (
          <StatCounter
            key={m.id}
            value={m.value}
            suffix={m.suffix}
            label={m.label}
            description={m.description}
            decimals={m.id === 'area' ? 1 : 0}
          />
        ))}
      </div>
      <div className={scaleStyles.cta}>
        <LuxuryButton to={data.cta.route}>{data.cta.text}</LuxuryButton>
      </div>
    </div>
  );
}
