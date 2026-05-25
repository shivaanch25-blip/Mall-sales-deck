import { Link } from 'react-router-dom';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { ChapterHero } from '../components/ui/ChapterHero';
import { MediaCard } from '../components/ui/MediaCard';
import { ActionStrip } from '../components/ui/ActionStrip';
import { LuxuryButton } from '../components/ui/LuxuryButton';
import { useEventsPlatformData } from '../hooks/useDeckData';
import { useManifest } from '../context/ManifestContext';
import { useInquiry } from '../hooks/useInquiry';
import styles from './ChapterPage.module.css';
import eventsStyles from './EventsPage.module.css';

export function EventsPlatformPage() {
  const { deck } = useManifest();
  const { data, loading } = useEventsPlatformData();
  const { mailto } = useInquiry();
  const chapter = deck.chapters.find((c) => c.id === 'events');

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
        <div className={eventsStyles.heroCta}>
          <LuxuryButton to={data.hero.cta.route}>{data.hero.cta.text}</LuxuryButton>
        </div>
      </ChapterHero>
      <p className={styles.lead}>{data.description}</p>
      <div className={styles.grid}>
        {data.highlights.map((h, i) => (
          <MediaCard
            key={h.id}
            title={h.title}
            description={h.description}
            assets={h.assets}
            cta={h.cta}
            index={i}
          />
        ))}
      </div>
      <section className={eventsStyles.moduleBanner}>
        <h2>Phase 2 — Events Module</h2>
        <p>
          Deep-dive venues, past highlights, sponsorship tiers, and booking workflow.
        </p>
        <Link to={data.ctas.module.route} className={eventsStyles.moduleLink}>
          {data.ctas.module.text} →
        </Link>
      </section>
      <ActionStrip
        actions={[
          { ...data.ctas.book, route: '/events/module' },
          { ...data.ctas.sponsor, route: '/partner' },
        ]}
        buildHref={(intent) => mailto(intent)}
      />
    </div>
  );
}
