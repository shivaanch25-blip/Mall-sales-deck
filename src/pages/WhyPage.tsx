import { ChapterHeader } from '../components/ui/ChapterHeader';
import { ChapterHero } from '../components/ui/ChapterHero';
import { MediaCard } from '../components/ui/MediaCard';
import { ActionStrip } from '../components/ui/ActionStrip';
import { useWhyData } from '../hooks/useDeckData';
import { useManifest } from '../context/ManifestContext';
import { useInquiry } from '../hooks/useInquiry';
import styles from './ChapterPage.module.css';

export function WhyPage() {
  const { deck } = useManifest();
  const { data, loading } = useWhyData();
  const { mailto } = useInquiry();
  const chapter = deck.chapters.find((c) => c.id === 'why');

  if (loading || !data) {
    return <div className={styles.loading}>Loading…</div>;
  }

  const actions = [
    { ...data.ctas.leasing, route: '/partner' },
    { ...data.ctas.sponsorship, route: '/partner' },
    { ...data.ctas.events, route: '/events/module' },
  ];

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
      <div className={styles.metrics}>
        {data.metrics.map((m) => (
          <div key={m.label} className={styles.metric}>
            <span className={styles.metricValue}>{m.value}</span>
            <span className={styles.metricLabel}>{m.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {data.pillars.map((p, i) => (
          <MediaCard
            key={p.id}
            title={p.title}
            description={p.description}
            assets={p.assets}
            cta={p.cta}
            index={i}
          />
        ))}
      </div>
      <ActionStrip
        actions={actions}
        buildHref={(intent) => mailto(intent)}
      />
    </div>
  );
}
