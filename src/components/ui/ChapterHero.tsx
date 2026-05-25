import { ManifestVideo } from '../media/ManifestVideo';
import type { AssetRefsBlock } from '../../types';
import styles from './ChapterHero.module.css';

interface ChapterHeroProps {
  assets: AssetRefsBlock;
  children: React.ReactNode;
}

export function ChapterHero({ assets, children }: ChapterHeroProps) {
  const hasVideo = Boolean(assets.video);

  return (
    <div className={styles.hero}>
      {hasVideo && (
        <ManifestVideo
          videoRef={assets.video!}
          videoFallbackRef={assets.videoFallback}
          posterRef={assets.image ?? assets.heroImage}
          posterFallbackRef={assets.imageFallback ?? assets.heroImageFallback}
          className={styles.video}
        />
      )}
      {!hasVideo && assets.image && (
        <div
          className={styles.posterOnly}
          style={{
            backgroundImage: `var(--chapter-hero-bg)`,
          }}
        />
      )}
      <div className={styles.scrim} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
