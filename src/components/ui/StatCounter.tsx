import { useEffect, useRef } from 'react';
import { gsap, initGsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './StatCounter.module.css';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  decimals?: number;
}

export function StatCounter({
  value,
  suffix = '',
  label,
  description,
  decimals = 0,
}: StatCounterProps) {
  const reduced = useReducedMotion();
  const numRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    const el = numRef.current;
    const root = rootRef.current;
    if (!el || !root) return;

    if (reduced) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: root,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        el.textContent = `${decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val)}${suffix}`;
      },
    });

    return () => {
      tween.kill();
    };
  }, [value, suffix, reduced, decimals]);

  return (
    <div ref={rootRef} className={styles.stat}>
      <span ref={numRef} className={styles.value}>
        {reduced ? `${value}${suffix}` : `0${suffix}`}
      </span>
      <span className={styles.label}>{label}</span>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  );
}
