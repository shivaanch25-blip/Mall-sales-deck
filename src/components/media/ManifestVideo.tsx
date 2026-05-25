import { useEffect, useRef, useState } from 'react';
import type { AssetRef } from '../../types';
import { resolveImage, resolveVideo } from '../../lib/asset-resolver';
import { useManifest } from '../../context/ManifestContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ManifestVideoProps {
  videoRef: AssetRef;
  videoFallbackRef?: AssetRef;
  posterRef?: AssetRef;
  posterFallbackRef?: AssetRef;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  onEnded?: () => void;
}

export function ManifestVideo({
  videoRef,
  videoFallbackRef,
  posterRef,
  posterFallbackRef,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  onEnded,
}: ManifestVideoProps) {
  const { manifest } = useManifest();
  const reduced = useReducedMotion();
  const videoEl = useRef<HTMLVideoElement>(null);
  const { primary: videoSrc, fallback: videoFallback } = resolveVideo(
    manifest,
    videoRef,
    videoFallbackRef
  );
  const [src, setSrc] = useState(videoSrc);
  const [usePosterOnly, setUsePosterOnly] = useState(reduced);

  const poster = posterRef
    ? resolveImage(manifest, posterRef, posterFallbackRef).primary
    : resolveImage(manifest, 'hero.poster', 'hero.posterFallback').primary;

  useEffect(() => {
    if (reduced || usePosterOnly) return;
    const el = videoEl.current;
    if (!el || !autoPlay) return;
    void el.play().catch(() => setUsePosterOnly(true));
  }, [src, autoPlay, reduced, usePosterOnly]);

  if (usePosterOnly) {
    return (
      <div className={`manifest-video-poster ${className ?? ''}`}>
        <img src={poster} alt="" className="manifest-video-poster__img" />
      </div>
    );
  }

  return (
    <video
      ref={videoEl}
      className={className}
      src={src}
      poster={poster}
      autoPlay={autoPlay && !reduced}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      onEnded={onEnded}
      onError={() => {
        if (src !== videoFallback) setSrc(videoFallback);
        else setUsePosterOnly(true);
      }}
    />
  );
}
