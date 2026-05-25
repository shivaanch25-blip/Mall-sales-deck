import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useManifest } from '../../context/ManifestContext';
import { AmbientVideoLayer } from '../media/AmbientVideoLayer';
import { CinematicNav } from './CinematicNav';
import { ChapterTransition } from './ChapterTransition';
import { GrainOverlay } from './GrainOverlay';
import { usePreloadOnMount } from '../../hooks/useVideoPreload';
import styles from './DeckShell.module.css';

function resolveChapterAmbient(
  pathname: string,
  chapters: ReturnType<typeof useManifest>['deck']['chapters']
) {
  const normalizedPathname = pathname === '/' ? '/intro' : pathname;
  const sorted = [...chapters].sort((a, b) => b.route.length - a.route.length);

  const match =
    sorted.find((c) => normalizedPathname === c.route) ??
    sorted.find((c) => normalizedPathname.startsWith(`${c.route}/`));

  const assets = match?.assets;
  return {
    video: assets?.ambientVideo ?? 'ambient.hub',
    fallback: assets?.ambientVideoFallback ?? 'ambient.hubFallback',
  };
}

export function DeckShell() {
  const { deck } = useManifest();
  const location = useLocation();
  const hideNav = location.pathname === '/intro' || location.pathname === '/';

  const ambient = useMemo(
    () => resolveChapterAmbient(location.pathname, deck.chapters),
    [location.pathname, deck.chapters]
  );

  usePreloadOnMount(deck.preload.critical);

  return (
    <div className={styles.shell}>
      <AmbientVideoLayer
        videoRef={ambient.video}
        videoFallbackRef={ambient.fallback}
        posterRef="hero.poster"
        posterFallbackRef="hero.posterFallback"
      />
      <GrainOverlay />
      {!hideNav && <CinematicNav />}
      <main className={`${styles.main} ${hideNav ? styles.mainFull : ''}`}>
        <ChapterTransition />
      </main>
    </div>
  );
}
