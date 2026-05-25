import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initGsap } from '../lib/gsap';
import { useManifest } from '../context/ManifestContext';
import { ManifestVideo } from '../components/media/ManifestVideo';
import { LuxuryButton } from '../components/ui/LuxuryButton';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './HeroIntroPage.module.css';

export function HeroIntroPage() {
  const { deck } = useManifest();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const introChapter = deck.chapters.find((c) => c.id === 'intro');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [heroPhase, setHeroPhase] = useState<'intro' | 'loop'>('intro');

  const previewChapters = useMemo(
    () =>
      deck.chapters.filter((chapter) =>
        ['why', 'luxury', 'retail'].includes(chapter.id)
      ),
    [deck.chapters]
  );

  useEffect(() => {
    if (reduced || !introChapter) return;
    const g = initGsap();
    const tl = g.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(titleRef.current, { opacity: 0, y: 40, duration: 1.2, delay: 0.5 })
      .from(subRef.current, { opacity: 0, y: 24, duration: 0.8 }, '-=0.6')
      .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.6 }, '-=0.4');
    return () => {
      tl.kill();
    };
  }, [reduced, introChapter]);

  if (!introChapter) return null;

  const { assets, cta } = introChapter;
  const isLoopPhase = heroPhase === 'loop' && Boolean(assets.loop);
  const activeVideoRef = heroPhase === 'intro' ? assets.video! : assets.loop ?? assets.video!;
  const activeFallback = heroPhase === 'intro' ? assets.videoFallback : assets.loopFallback ?? assets.videoFallback;

  return (
    <section className={styles.intro}>
      <ManifestVideo
        videoRef={activeVideoRef}
        videoFallbackRef={activeFallback}
        posterRef={assets.poster}
        posterFallbackRef={assets.posterFallback}
        className={styles.video}
        preload="auto"
        loop={isLoopPhase}
        onEnded={() => {
          if (heroPhase === 'intro' && assets.loop) {
            setHeroPhase('loop');
          }
        }}
      />
      <div className={styles.scrim} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>{deck.venue}</p>
        <h1 ref={titleRef}>{introChapter.title}</h1>
        <p ref={subRef} className={styles.subtitle}>
          {introChapter.subtitle}
        </p>
        <div ref={ctaRef} className={styles.actions}>
          <LuxuryButton to={cta.route}>{cta.text}</LuxuryButton>
          <button
            type="button"
            className={styles.skip}
            onClick={() => navigate('/hub')}
          >
            Skip
          </button>
        </div>
        <div className={styles.scrollHint}>
          <span>Scroll to explore</span>
          <span aria-hidden="true" className={styles.chevron}>
            ⌄
          </span>
        </div>
      </div>
      <div className={styles.sectionPreview}>
        <p className={styles.sectionIntro}>Featured chapters</p>
        <div className={styles.sectionGrid}>
          {previewChapters.map((chapter) => (
            <motion.article
              key={chapter.id}
              className={styles.sectionCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.sectionPanel}>
                <p className={styles.sectionLabel}>{chapter.subtitle}</p>
                <h2>{chapter.title}</h2>
                <LuxuryButton to={chapter.route} variant="ghost">
                  Explore {chapter.title}
                </LuxuryButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
