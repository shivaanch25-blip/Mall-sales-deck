import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { AssetManifest } from '../types';
import { loadAssetManifest } from '../lib/asset-resolver';
import { useDeckData } from '../hooks/useDeckData';
import type { DeckConfig } from '../types';

interface ManifestContextValue {
  manifest: AssetManifest;
  deck: DeckConfig;
  ready: boolean;
}

const ManifestContext = createContext<ManifestContextValue | null>(null);

export function ManifestProvider({ children }: { children: ReactNode }) {
  const [manifest, setManifest] = useState<AssetManifest | null>(null);
  const [manifestError, setManifestError] = useState<string | null>(null);
  const { deck, error: deckError, loading: deckLoading } = useDeckData();

  useEffect(() => {
    loadAssetManifest()
      .then(setManifest)
      .catch((e) =>
        setManifestError(e instanceof Error ? e.message : 'Manifest load failed')
      );
  }, []);

  const ready = Boolean(manifest && deck);
  const error = manifestError || deckError;

  if (error) {
    return (
      <div className="loader-error">
        <p>Unable to load experience data.</p>
        <small>{error}</small>
      </div>
    );
  }

  if (!ready || deckLoading) {
    return <div className="loader-screen" aria-busy="true" />;
  }

  return (
    <ManifestContext.Provider value={{ manifest: manifest!, deck: deck!, ready }}>
      {children}
    </ManifestContext.Provider>
  );
}

export function useManifest(): ManifestContextValue {
  const ctx = useContext(ManifestContext);
  if (!ctx) throw new Error('useManifest must be used within ManifestProvider');
  return ctx;
}
