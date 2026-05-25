import { LuxuryButton } from './LuxuryButton';
import styles from './ActionStrip.module.css';

export interface ActionCta {
  text: string;
  route: string;
  intent?: string;
}

interface ActionStripProps {
  actions: ActionCta[];
  buildHref?: (intent?: string) => string;
}

export function ActionStrip({ actions, buildHref }: ActionStripProps) {
  return (
    <div className={styles.strip} role="group" aria-label="Business actions">
      {actions.map((action) => {
        const key = `${action.text}-${action.intent ?? action.route}`;

        if (action.intent && buildHref) {
          return (
            <LuxuryButton key={key} href={buildHref(action.intent)}>
              {action.text}
            </LuxuryButton>
          );
        }

        if (
          action.route.startsWith('mailto:') ||
          action.route.startsWith('http')
        ) {
          return (
            <LuxuryButton key={key} href={action.route}>
              {action.text}
            </LuxuryButton>
          );
        }

        return (
          <LuxuryButton key={key} to={action.route}>
            {action.text}
          </LuxuryButton>
        );
      })}
    </div>
  );
}
