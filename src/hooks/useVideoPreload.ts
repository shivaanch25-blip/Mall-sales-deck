import { useCallback, useEffect, useRef } from 'react';
import type { AssetRef } from '../types';
import { resolveRef } from '../lib/asset-resolver';
import { useManifest } from '../context/ManifestContext';

const preloaded = new Set<string>();

function preloadUrl(url: string): Promise<void> {
  if (preloaded.has(url)) return Promise.resolve();
  if (url.endsWith('.mp4') || url.endsWith('.webm')) {
    return new Promise((resolve) => {
      const v = document.createElement('video');
      v.preload = 'auto';
      v.muted = true;
      const done = () => {
        preloaded.add(url);
        resolve();
      };
      v.addEventListener('loadeddata', done, { once: true });
      v.addEventListener('error', done, { once: true });
      v.src = url;
      setTimeout(done, 4000);
    });
  }
  return new Promise((resolve) => {
    const img = new Image();
    const done = () => {
      preloaded.add(url);
      resolve();
    };
    img.onload = done;
    img.onerror = done;
    img.src = url;
    setTimeout(done, 3000);
  });
}

export function useVideoPreload() {
  const { manifest } = useManifest();
  const queueRef = useRef<string[]>([]);

  const preloadRef = useCallback(
    async (ref: AssetRef) => {
      const url = resolveRef(manifest, ref);
      if (!url || preloaded.has(url)) return;
      queueRef.current.push(url);
      await preloadUrl(url);
    },
    [manifest]
  );

  const preloadRefs = useCallback(
    async (refs: AssetRef[]) => {
      await Promise.all(refs.map((r) => preloadRef(r)));
    },
    [preloadRef]
  );

  return { preloadRef, preloadRefs, isPreloaded: (url: string) => preloaded.has(url) };
}

export function usePreloadOnMount(refs: AssetRef[]) {
  const { preloadRefs } = useVideoPreload();
  const key = refs.join('|');
  useEffect(() => {
    void preloadRefs(refs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadRefs, key]);
}
