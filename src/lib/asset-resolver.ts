import type { AssetManifest, AssetRef, AssetRefsBlock, ResolvedAsset } from '../types';

const MANIFEST_URL = '/data/asset-manifest.json';

let cachedManifest: AssetManifest | null = null;

/**
 * Load asset manifest once (UI will call this in providers — not used yet).
 */
export async function loadAssetManifest(): Promise<AssetManifest> {
  if (cachedManifest) return cachedManifest;
  const res = await fetch(MANIFEST_URL);
  if (!res.ok) throw new Error(`Failed to load asset manifest: ${res.status}`);
  cachedManifest = (await res.json()) as AssetManifest;
  return cachedManifest;
}

export function setAssetManifest(manifest: AssetManifest): void {
  cachedManifest = manifest;
}

/**
 * Resolve dot-notation ref (e.g. "hero.video") to a URL string from manifest.
 */
export function resolveRef(manifest: AssetManifest, ref: AssetRef): string | null {
  const parts = ref.split('.');
  let current: unknown = manifest;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') return null;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : null;
}

/**
 * Resolve primary + fallback for a single asset key pair.
 */
export function resolveAssetPair(
  manifest: AssetManifest,
  primaryRef: AssetRef,
  fallbackRef?: AssetRef
): ResolvedAsset {
  const primary =
    resolveRef(manifest, primaryRef) ??
    (fallbackRef ? resolveRef(manifest, fallbackRef) : null) ??
    manifest.fallbacks.image;

  const fallback =
    (fallbackRef ? resolveRef(manifest, fallbackRef) : null) ??
    manifest.fallbacks.image;

  return { primary, fallback, ref: primaryRef };
}

/**
 * Resolve all asset refs on a data block (from deck.json, attractions.json, etc.).
 */
export function resolveAssetBlock(
  manifest: AssetManifest,
  block: AssetRefsBlock
): Record<string, ResolvedAsset> {
  const out: Record<string, ResolvedAsset> = {};
  const keys = Object.keys(block) as Array<keyof AssetRefsBlock>;

  for (const key of keys) {
    const ref = block[key];
    if (!ref || typeof ref !== 'string') continue;

    if (String(key).endsWith('Fallback')) continue;

    const fallbackKey = `${String(key)}Fallback` as keyof AssetRefsBlock;
    const fallbackRef = block[fallbackKey];

    out[String(key)] = resolveAssetPair(
      manifest,
      ref,
      typeof fallbackRef === 'string' ? fallbackRef : undefined
    );
  }

  return out;
}

/**
 * Pick video URL with manifest-level fallback chain.
 */
export function resolveVideo(
  manifest: AssetManifest,
  videoRef: AssetRef,
  videoFallbackRef?: AssetRef
): ResolvedAsset {
  const resolved = resolveAssetPair(manifest, videoRef, videoFallbackRef);
  return {
    ...resolved,
    fallback: resolved.fallback || manifest.fallbacks.video,
  };
}

/**
 * Pick image URL with manifest-level fallback chain.
 */
export function resolveImage(
  manifest: AssetManifest,
  imageRef: AssetRef,
  imageFallbackRef?: AssetRef
): ResolvedAsset {
  const resolved = resolveAssetPair(manifest, imageRef, imageFallbackRef);
  return {
    ...resolved,
    fallback: resolved.fallback || manifest.fallbacks.image,
  };
}

/**
 * Hub zones store indirect refs (e.g. "attractions.dubai-aquarium.image").
 * Resolves one or two hops to a concrete URL.
 */
export function resolveIndirectRef(
  manifest: AssetManifest,
  ref: AssetRef
): ResolvedAsset {
  const first = resolveRef(manifest, ref);
  if (first?.startsWith('/')) {
    return {
      primary: first,
      fallback: manifest.fallbacks.image,
      ref,
    };
  }
  if (first) {
    return resolveImage(manifest, first);
  }
  return {
    primary: manifest.fallbacks.image,
    fallback: manifest.fallbacks.image,
    ref,
  };
}
