import type { PortfolioIdentity } from '../../types/portfolio'
import styles from './PortfolioOverlay.module.css'

interface PortfolioOverlayProps {
  identity: PortfolioIdentity
}

export function PortfolioOverlay({ identity }: PortfolioOverlayProps) {
  return (
    <section className={styles.overlay}>
      <header className={styles.panel}>
        <h1 className={styles.title}>{identity.name}</h1>
        <p className={styles.controls}>WASD move · Shift run · Drag mouse to look · E interact</p>
      </header>
    </section>
  )
}
