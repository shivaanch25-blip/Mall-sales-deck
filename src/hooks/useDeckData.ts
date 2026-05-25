import { useEffect, useState } from 'react';
import type {
  AttractionsData,
  DeckConfig,
  DiningData,
  EventsModuleData,
  EventsPlatformData,
  LuxuryData,
  MapData,
  RetailData,
  StatsData,
  WhyData,
} from '../types';

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json() as Promise<T>;
}

export function useDeckData() {
  const [deck, setDeck] = useState<DeckConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<DeckConfig>('/data/deck.json')
      .then(setDeck)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load deck'));
  }, []);

  return { deck, error, loading: !deck && !error };
}

export function useAttractionsData() {
  return useChapterData<AttractionsData>('/data/attractions.json');
}

export function useDiningData() {
  return useChapterData<DiningData>('/data/dining.json');
}

export function useRetailData() {
  return useChapterData<RetailData>('/data/retail.json');
}

export function useStatsData() {
  return useChapterData<StatsData>('/data/stats.json');
}

export function useMapData() {
  return useChapterData<MapData>('/data/map.json');
}

export function useWhyData() {
  return useChapterData<WhyData>('/data/why.json');
}

export function useLuxuryData() {
  return useChapterData<LuxuryData>('/data/luxury.json');
}

export function useEventsPlatformData() {
  return useChapterData<EventsPlatformData>('/data/events-platform.json');
}

export function useEventsModuleData() {
  return useChapterData<EventsModuleData>('/data/events.json');
}

function useChapterData<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<T>(path)
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load data'));
  }, [path]);

  return { data, error, loading: !data && !error };
}
