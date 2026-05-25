import { ChapterHeader } from '../components/ui/ChapterHeader';
import { ChapterHero } from '../components/ui/ChapterHero';
import { MediaCard } from '../components/ui/MediaCard';
import { ActionStrip } from '../components/ui/ActionStrip';
import { useLuxuryData } from '../hooks/useDeckData';
import { useManifest } from '../context/ManifestContext';
import { useInquiry } from '../hooks/useInquiry';
import styles from './ChapterPage.module.css';

export function LuxuryPage() {
  const { deck } = useManifest();
  const { data, loading } = useLuxuryData();
  const { mailto } = useInquiry();
  const chapter = deck.chapters.find((c) => c.id === 'luxury');

  if (loading || !data) {
    return <div className={styles.loading}>Loading…</div>;
  }

  return (
    <div className={styles.page}>
      <ChapterHero assets={data.hero.assets}>
        <ChapterHeader
          title={data.hero.title}
          subtitle={chapter?.subtitle}
          description={data.hero.description}
        />
      </ChapterHero>
      <p className={styles.lead}>{data.description}</p>
      <div className={styles.grid}>
        {data.items.map((item, i) => (
          <MediaCard
            key={item.id}
            title={item.title}
            description={item.description}
            assets={item.assets}
            cta={{
              text: item.cta.text,
              route: item.cta.route,
            }}
            index={i}
          />
        ))}
      </div>
      <ActionStrip
        actions={[
          { ...data.ctas.leasing, route: '/partner' },
          { ...data.ctas.retail, route: '/retail' },
        ]}
        buildHref={(intent) => mailto(intent)}
      />
    </div>
  );
}
