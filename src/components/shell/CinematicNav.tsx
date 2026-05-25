import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { useManifest } from '../../context/ManifestContext';
import { ManifestImage } from '../media/ManifestImage';
import styles from './CinematicNav.module.css';

export function CinematicNav() {
  const { deck } = useManifest();
  const location = useLocation();
  const chapters = [...deck.chapters]
    .filter((c) => c.showInNav !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <nav className={styles.nav} aria-label="Chapter navigation">
      <NavLink to="/" className={styles.logo} aria-label="Hub home">
        <ManifestImage
          imageRef={deck.navigation.logo}
          fallbackRef={deck.navigation.logoFallback}
          alt="The Dubai Mall"
          className={styles.logoImg}
          loading="eager"
        />
      </NavLink>
      <ul className={styles.list}>
        {chapters.map((ch) => {
          const isActive =
            location.pathname === ch.route ||
            (ch.route !== '/' && location.pathname.startsWith(ch.route));
          return (
            <li key={ch.id}>
              <NavLink
                to={ch.route}
                className={() => `${styles.link} ${isActive ? styles.active : ''}`}
                title={ch.title}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className={styles.indicator}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={styles.dot} />
                <span className={styles.label}>{ch.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
