import { motion } from 'framer-motion';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { ManifestImage } from '../components/media/ManifestImage';
import { ManifestVideo } from '../components/media/ManifestVideo';
import { LuxuryButton } from '../components/ui/LuxuryButton';
import { ActionStrip } from '../components/ui/ActionStrip';
import { useEventsModuleData } from '../hooks/useDeckData';
import { useInquiry } from '../hooks/useInquiry';
import styles from './ChapterPage.module.css';
import eventsStyles from './EventsPage.module.css';

export function EventsModulePage() {
  const { data, loading } = useEventsModuleData();
  const { mailto, config } = useInquiry();

  if (loading || !data) {
    return <div className={styles.loading}>Loading…</div>;
  }

  return (
    <div className={styles.page}>
      <div className={eventsStyles.moduleHero}>
        <ManifestVideo
          videoRef={data.hero.assets.video!}
          videoFallbackRef={data.hero.assets.videoFallback}
          posterRef={data.hero.assets.image}
          posterFallbackRef={data.hero.assets.imageFallback}
          className={eventsStyles.moduleVideo}
        />
        <ChapterHeader
          title={data.title}
          subtitle={data.subtitle}
          description={data.description}
        />
      </div>

      <section className={eventsStyles.section}>
        <h2 className={eventsStyles.sectionTitle}>Venue capabilities</h2>
        <div className={styles.grid}>
          {data.venues.map((v, i) => (
            <motion.article
              key={v.id}
              className={eventsStyles.venueCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <ManifestImage
                imageRef={v.assets.image!}
                fallbackRef={v.assets.imageFallback}
                alt={v.title}
                className={eventsStyles.venueImg}
              />
              <div className={eventsStyles.venueBody}>
                <span className={eventsStyles.capacity}>{v.capacity}</span>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
                <LuxuryButton href={mailto(v.cta.intent)} variant="ghost">
                  {v.cta.text}
                </LuxuryButton>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={eventsStyles.section}>
        <h2 className={eventsStyles.sectionTitle}>Past highlights</h2>
        <div className={eventsStyles.highlights}>
          {data.pastHighlights.map((h) => (
            <div key={h.id} className={eventsStyles.highlight}>
              <ManifestImage
                imageRef={h.assets.image!}
                fallbackRef={h.assets.imageFallback}
                alt={h.title}
                className={eventsStyles.highlightImg}
              />
              <div>
                <span className={eventsStyles.year}>{h.year}</span>
                <h3>{h.title}</h3>
                <p>{h.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={eventsStyles.section}>
        <h2 className={eventsStyles.sectionTitle}>What we deliver</h2>
        <ul className={eventsStyles.capList}>
          {data.capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className={eventsStyles.section}>
        <h2 className={eventsStyles.sectionTitle}>Sponsorship tiers</h2>
        <div className={eventsStyles.tiers}>
          {data.sponsorshipTiers.map((tier) => (
            <div key={tier.id} className={eventsStyles.tier}>
              <h3>{tier.name}</h3>
              <p>{tier.description}</p>
              <ul>
                {tier.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ActionStrip
        actions={[
          { ...data.ctas.bookEvent, route: '/partner' },
          { ...data.ctas.sponsorship, route: '/partner' },
          { ...data.ctas.leasing, route: '/partner' },
        ]}
        buildHref={(intent) => mailto(intent)}
      />

      {config?.calendarUrl && (
        <p className={eventsStyles.calendar}>
          <a href={config.calendarUrl} target="_blank" rel="noopener noreferrer">
            View official contact & calendar →
          </a>
        </p>
      )}
    </div>
  );
}
