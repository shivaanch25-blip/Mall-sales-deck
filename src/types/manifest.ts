/**
 * Asset manifest types — single source of truth for all media paths.
 * UI must resolve paths via AssetRef keys only (see asset-resolver.ts).
 */

/** Dot-notation key into asset-manifest.json (e.g. "hero.video") */
export type AssetRef = string;

export interface MediaAssetPair {
  video?: string;
  videoFallback?: string;
  image?: string;
  imageFallback?: string;
}

export interface ManifestAttractionEntry {
  video: string;
  videoFallback: string;
  image: string;
  imageFallback: string;
}

export interface ManifestDiningEntry {
  video?: string;
  videoFallback?: string;
  image: string;
  imageFallback: string;
}

export interface ManifestRetailEntry {
  video?: string;
  videoFallback?: string;
  image: string;
  imageFallback: string;
}

export interface HubZoneManifestRefs {
  preview: AssetRef;
  previewFallback: AssetRef;
  ambient: AssetRef;
  ambientFallback: AssetRef;
}

export interface AssetManifest {
  $schema?: string;
  version: string;
  venue: string;
  baseUrl: string;
  fallbacks: {
    image: string;
    video: string;
    videoPoster: string;
    logo: string;
    audio: string | null;
  };
  hero: Record<string, string>;
  ambient: Record<string, string>;
  transitions: Record<string, string>;
  attractions: Record<string, ManifestAttractionEntry>;
  dining: Record<string, ManifestDiningEntry>;
  retail: Record<string, ManifestRetailEntry>;
  stats: Record<string, string>;
  logos: Record<string, string>;
  map: Record<string, string>;
  experiences: Record<string, string>;
  team: Record<string, string>;
  ui: Record<string, string>;
  audio: Record<string, string | null>;
  hubZones: Record<string, HubZoneManifestRefs>;
}

/** Resolved URL ready for <img src> or <video src> */
export interface ResolvedAsset {
  primary: string;
  fallback: string;
  ref: AssetRef;
}

export interface AssetRefsBlock {
  image?: AssetRef;
  imageFallback?: AssetRef;
  video?: AssetRef;
  videoFallback?: AssetRef;
  poster?: AssetRef;
  posterFallback?: AssetRef;
  [key: string]: AssetRef | undefined;
}
