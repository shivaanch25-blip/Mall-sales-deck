import { motion } from 'framer-motion';
import { ChapterHeader } from '../components/ui/ChapterHeader';
import { LuxuryButton } from '../components/ui/LuxuryButton';
import { ManifestImage } from '../components/media/ManifestImage';
import { useManifest } from '../context/ManifestContext';
import { useInquiry } from '../hooks/useInquiry';
import styles from './ChapterPage.module.css';
import partnerStyles from './PartnerPage.module.css';

const LEASING_PATHS = [
  { intent: 'leasing-luxury', label: 'Luxury / Fashion Avenue', desc: 'Flagship maisons & high jewellery' },
  { intent: 'leasing', label: 'Retail leasing', desc: 'Mid-tier, flagship & category leaders' },
  { intent: 'fnb', label: 'Food & beverage', desc: 'Dining Boulevard & signature formats' },
  { intent: 'popup', label: 'Pop-up & short-term', desc: 'Seasonal activations & trial formats' },
] as const;

export function PartnerPage() {
  const { deck } = useManifest();
  const { config, mailto, ready } = useInquiry();
  const chapter = deck.chapters.find((c) => c.id === 'partner');

  if (!chapter) return null;

  const { assets } = chapter;

  return (
    <div className={styles.page}>
      <div className={partnerStyles.split}>
        <div>
          <ChapterHeader
            title={chapter.title}
            subtitle={chapter.subtitle}
            description="One destination. Three revenue engines—retail leasing, brand sponsorship, and event bookings. Select your path below to start a structured conversation with our commercial team."
          />

          <section className={partnerStyles.paths}>
            <h2 className={partnerStyles.pathsTitle}>Leasing paths</h2>
            <div className={partnerStyles.pathGrid}>
              {LEASING_PATHS.map((path, i) => (
                <motion.div
                  key={path.intent}
                  className={partnerStyles.pathCard}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <h3>{path.label}</h3>
                  <p>{path.desc}</p>
                  {ready && (
                    <LuxuryButton href={mailto(path.intent)} variant="ghost">
                      Inquire
                    </LuxuryButton>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          <section className={partnerStyles.primaryCtas}>
            <LuxuryButton href={ready ? mailto('sponsorship') : '#'}>
              Sponsorship & activations
            </LuxuryButton>
            <LuxuryButton href={ready ? mailto('events') : '#'} variant="ghost">
              Book an event
            </LuxuryButton>
            {config?.calendarUrl && (
              <LuxuryButton href={config.calendarUrl} variant="ghost">
                Official contact page
              </LuxuryButton>
            )}
          </section>
        </div>

        <div className={partnerStyles.visual}>
          {assets.heroImage && (
            <ManifestImage
              imageRef={assets.heroImage}
              fallbackRef={assets.heroImageFallback}
              alt="The Dubai Mall exterior"
              className={partnerStyles.heroImg}
            />
          )}
          {assets.contactImage && (
            <ManifestImage
              imageRef={assets.contactImage}
              fallbackRef={assets.contactImageFallback}
              alt="Partnerships team"
              className={partnerStyles.contactImg}
            />
          )}
          <p className={partnerStyles.email}>
            {config?.contactEmail ?? 'Loading contact…'}
          </p>
        </div>
      </div>
    </div>
  );
}
