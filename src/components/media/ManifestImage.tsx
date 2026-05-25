import { useState } from 'react';
import type { AssetRef } from '../../types';
import { resolveImage } from '../../lib/asset-resolver';
import { useManifest } from '../../context/ManifestContext';

interface ManifestImageProps {
  imageRef: AssetRef;
  fallbackRef?: AssetRef;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function ManifestImage({
  imageRef,
  fallbackRef,
  alt,
  className,
  loading = 'lazy',
}: ManifestImageProps) {
  const { manifest } = useManifest();
  const { primary, fallback } = resolveImage(manifest, imageRef, fallbackRef);
  const [src, setSrc] = useState(primary);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}
