import { useEffect, useState, useCallback } from 'react';
import type { InquiryConfig } from '../lib/inquiry';
import { buildMailto } from '../lib/inquiry';

export function useInquiry() {
  const [config, setConfig] = useState<InquiryConfig | null>(null);

  useEffect(() => {
    fetch('/data/inquiry.json')
      .then((r) => r.json())
      .then((d) => setConfig(d as InquiryConfig))
      .catch(() => null);
  }, []);

  const mailto = useCallback(
    (intent?: string, extra?: string) => {
      if (!config) return '#';
      return buildMailto(config, intent, extra);
    },
    [config]
  );

  return { config, mailto, ready: Boolean(config) };
}
