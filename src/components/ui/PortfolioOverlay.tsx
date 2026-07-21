import type { PortfolioIdentity } from '../../types/portfolio'
import styles from './PortfolioOverlay.module.css'

interface PortfolioOverlayProps {
  identity: PortfolioIdentity
}

export function PortfolioOverlay({ identity }: PortfolioOverlayProps) {
  return (
    <section className={styles.overlay}>
      <header className={styles.panel}>
        <p className={styles.status}>{identity.status}</p>
        <h1 className={styles.title}>{identity.name}</h1>
        <p className={styles.subtitle}>{identity.role}</p>
        {identity.inspectionHint ? (
          <p className={styles.hint}>{identity.inspectionHint}</p>
        ) : null}
      </header>
    </section>
  )
}
