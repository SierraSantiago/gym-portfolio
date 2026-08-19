import { useEffect } from 'react'
import { projectStations } from '../../data/projectStations'
import { useIsMobileDevice } from '../../hooks/useIsMobileDevice'
import { useProjectStore } from '../../state/useProjectStore'
import { useReceptionStore } from '../../state/useReceptionStore'
import styles from './ProjectUI.module.css'

export function ProjectUI() {
  const nearbyProjectId = useProjectStore((state) => state.nearbyProjectId)
  const activeProjectId = useProjectStore((state) => state.activeProjectId)
  const isProjectOpen = useProjectStore((state) => state.isProjectOpen)
  const openProject = useProjectStore((state) => state.openProject)
  const closeProject = useProjectStore((state) => state.closeProject)
  const isReceptionOpen = useReceptionStore((state) => state.isDialogOpen)
  const isMobileDevice = useIsMobileDevice()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      if (
        event.key.toLowerCase() === 'e' &&
        nearbyProjectId &&
        !isProjectOpen &&
        !isReceptionOpen
      ) {
        event.preventDefault()
        openProject(nearbyProjectId)
      }

      if (event.key === 'Escape' && isProjectOpen) {
        event.preventDefault()
        closeProject()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeProject, isProjectOpen, isReceptionOpen, nearbyProjectId, openProject])

  const nearbyProject = projectStations.find((project) => project.id === nearbyProjectId)
  const activeProject = projectStations.find((project) => project.id === activeProjectId)
  const activeTone = activeProject?.tone ?? (activeProject?.kind === 'social' ? 'social' : 'project')
  const nearbyTone = nearbyProject?.tone ?? (nearbyProject?.kind === 'social' ? 'social' : 'project')
  const isNearbyPurpleStation = nearbyTone === 'social' || nearbyTone === 'portfolio'
  const isCareerPulseProject = activeProject?.id === 'career-pulse' && Boolean(activeProject.liveUrl)
  const resolvedLinks = activeProject?.links?.length
    ? activeProject.links
    : [
        ...(activeProject?.githubUrl
          ? [{ label: 'GitHub', url: activeProject.githubUrl }]
          : []),
        ...(!isCareerPulseProject && activeProject?.liveUrl
          ? [{ label: 'Live Demo', url: activeProject.liveUrl }]
          : []),
      ]
  const accessNote = activeProject?.accessNote

  return (
    <>
      {nearbyProject && !isProjectOpen && !isReceptionOpen && !isMobileDevice ? (
        <button
          className={`${styles.prompt} ${isNearbyPurpleStation ? styles.promptSocial : ''}`}
          type="button"
          onClick={() => openProject(nearbyProject.id)}
        >
          <span className={styles.key}>E</span>
          <span>Open {nearbyProject.title}</span>
        </button>
      ) : null}

      {activeProject ? (
        <section
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-panel-title"
        >
          <article className={`${styles.panel} ${activeTone !== 'project' ? styles.panelSocial : ''}`}>
            <header className={styles.header}>
              <div className={styles.headerContent}>
                <p className={styles.eyebrow}>{activeProject.status}</p>
                <h2 className={styles.title} id="project-panel-title">
                  {activeProject.title}
                </h2>
                <p className={styles.summary}>{activeProject.summary}</p>
              </div>

              <div className={styles.headerActions}>
                {isCareerPulseProject ? (
                  <a
                    className={styles.headerLink}
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit the CareerPulse website in a new tab"
                  >
                    <span className={styles.headerLinkLabel}>Visit</span>
                    <span className={styles.headerLinkLabel}>Website</span>
                  </a>
                ) : null}

                <button
                  className={styles.close}
                  type="button"
                  aria-label="Close project panel"
                  onClick={closeProject}
                >
                  X
                </button>
              </div>
            </header>

            <div className={styles.body}>
              <section className={styles.mainBlock}>
                <h3 className={styles.sectionTitle}>
                  {activeTone === 'social'
                    ? 'About This Space'
                    : activeTone === 'portfolio'
                      ? 'About This Project'
                      : 'Project Overview'}
                </h3>
                <p className={styles.description}>{activeProject.description}</p>
              </section>

              <section className={styles.grid}>
                <div className={styles.card}>
                  <h3 className={styles.sectionTitle}>
                    {activeTone === 'social'
                      ? 'What You Can Find Here'
                      : activeTone === 'portfolio'
                        ? 'What This Project Uses'
                        : 'Functions'}
                  </h3>
                  <ul className={styles.list}>
                    {activeProject.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.card}>
                  <h3 className={styles.sectionTitle}>
                    {activeTone === 'social'
                      ? 'Platforms'
                      : activeTone === 'portfolio'
                        ? 'Stack & Tools'
                        : 'Stack'}
                  </h3>
                  <div className={styles.tags}>
                    {activeProject.stack.map((item) => (
                      <span key={item} className={styles.tag}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <footer className={styles.footer}>
              <div className={styles.linkRow}>
                {resolvedLinks.length ? (
                  resolvedLinks.map((link) => (
                    <a
                      key={link.label}
                      className={styles.linkButton}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))
                ) : (
                  <span className={styles.linkPlaceholder}>
                    {accessNote ?? 'Add GitHub link in `src/data/projectStations.ts`'}
                  </span>
                )}
              </div>

              <span className={styles.footerHint}>
                {isMobileDevice ? 'Tap X to close.' : 'Press Esc to close the project.'}
              </span>
            </footer>
          </article>
        </section>
      ) : null}
    </>
  )
}
