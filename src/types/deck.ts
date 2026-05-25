import type { AssetRef, AssetRefsBlock } from './manifest';

export interface DeckCta {
  text: string;
  route: string;
}

export interface DeckChapter {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  order: number;
  showInNav?: boolean;
  assets: AssetRefsBlock;
  dataSource?: string;
  cta: DeckCta;
}

export interface WhyPillar {
  id: string;
  title: string;
  description: string;
  assets: AssetRefsBlock;
  cta: DeckCta;
}

export interface WhyData {
  chapterId: string;
  title: string;
  description: string;
  hero: {
    title: string;
    description: string;
    assets: AssetRefsBlock;
    cta: DeckCta;
  };
  pillars: WhyPillar[];
  metrics: Array<{ label: string; value: string; ref: string }>;
  ctas: Record<string, DeckCta & { intent?: string }>;
}

export interface LuxuryData {
  chapterId: string;
  title: string;
  description: string;
  hero: {
    title: string;
    description: string;
    assets: AssetRefsBlock;
    cta: DeckCta & { intent?: string };
  };
  items: DiningItem[];
  ctas: Record<string, DeckCta & { intent?: string }>;
}

export interface EventsPlatformData {
  chapterId: string;
  title: string;
  description: string;
  hero: {
    title: string;
    description: string;
    assets: AssetRefsBlock;
    cta: DeckCta;
  };
  highlights: WhyPillar[];
  ctas: Record<string, DeckCta & { intent?: string }>;
}

export interface EventsModuleData {
  moduleId: string;
  title: string;
  subtitle: string;
  description: string;
  hero: { assets: AssetRefsBlock };
  venues: Array<{
    id: string;
    title: string;
    capacity: string;
    description: string;
    assets: AssetRefsBlock;
    cta: DeckCta & { intent?: string };
  }>;
  pastHighlights: Array<{
    id: string;
    title: string;
    year: string;
    description: string;
    assets: AssetRefsBlock;
  }>;
  capabilities: string[];
  sponsorshipTiers: Array<{
    id: string;
    name: string;
    description: string;
    highlights: string[];
  }>;
  ctas: Record<string, DeckCta & { intent?: string }>;
}

export interface DeckConfig {
  id: string;
  venue: string;
  tagline: string;
  version: string;
  defaultRoute: string;
  introRoute: string;
  chapters: DeckChapter[];
  navigation: {
    logo: AssetRef;
    logoFallback: AssetRef;
    transitionIn: AssetRef;
    transitionInFallback: AssetRef;
    transitionOut: AssetRef;
    transitionOutFallback: AssetRef;
  };
  preload: {
    critical: AssetRef[];
    onHubMount: AssetRef[];
  };
}

export interface AttractionItem {
  id: string;
  title: string;
  description: string;
  assets: AssetRefsBlock;
  stats?: Record<string, string>;
  cta: DeckCta;
  hubZoneId: string | null;
}

export interface AttractionsData {
  chapterId: string;
  title: string;
  description: string;
  items: AttractionItem[];
}

export interface DiningItem {
  id: string;
  title: string;
  description: string;
  assets: AssetRefsBlock;
  cta: DeckCta;
  hubZoneId?: string;
}

export interface DiningData {
  chapterId: string;
  title: string;
  description: string;
  hero: {
    title: string;
    description: string;
    assets: AssetRefsBlock;
    cta: DeckCta;
  };
  items: DiningItem[];
}

export interface RetailData {
  chapterId: string;
  title: string;
  description: string;
  hero: {
    title: string;
    description: string;
    assets: AssetRefsBlock;
    cta: DeckCta;
  };
  items: DiningItem[];
}

export interface StatMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  assets: AssetRefsBlock;
}

export interface StatsData {
  chapterId: string;
  title: string;
  description: string;
  background: { assets: AssetRefsBlock };
  metrics: StatMetric[];
  cta: DeckCta;
}

export interface MapZone {
  id: string;
  label: string;
  chapterRoute: string;
  position: { x: number; y: number };
  floor: string;
  assets: AssetRefsBlock & { pin?: AssetRef };
  cta: DeckCta;
}

export interface MapData {
  title: string;
  description: string;
  floorDefault: string;
  floors: Array<{
    id: string;
    label: string;
    assets: AssetRefsBlock;
  }>;
  zones: MapZone[];
}
