import { useEffect } from 'react'
import {
  receptionDialogOptions,
  receptionGreeting,
  receptionistName,
} from '../../data/receptionDialog'
import { useReceptionStore } from '../../state/useReceptionStore'
import styles from './ReceptionUI.module.css'

export function ReceptionUI() {
  const isNearReception = useReceptionStore((state) => state.isNearReception)
  const isDialogOpen = useReceptionStore((state) => state.isDialogOpen)
  const selectedTopic = useReceptionStore((state) => state.selectedTopic)
  const tourStarted = useReceptionStore((state) => state.tourStarted)
  const openDialog = useReceptionStore((state) => state.openDialog)
  const closeDialog = useReceptionStore((state) => state.closeDialog)
  const selectTopic = useReceptionStore((state) => state.selectTopic)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      if (event.key.toLowerCase() === 'e' && isNearReception && !isDialogOpen) {
        event.preventDefault()
        openDialog()
      }

      if (event.key === 'Escape' && isDialogOpen) {
        event.preventDefault()
        closeDialog()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeDialog, isDialogOpen, isNearReception, openDialog])

  const selectedOption = receptionDialogOptions.find(
    (option) => option.id === selectedTopic,
  )

  return (
    <>
      {isNearReception && !isDialogOpen ? (
        <button className={styles.prompt} type="button" onClick={openDialog}>
          <span className={styles.key}>E</span>
          <span>Press E to talk</span>
        </button>
      ) : null}

      {isDialogOpen ? (
        <section
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reception-dialog-title"
        >
          <div className={styles.dialog}>
            <header className={styles.header}>
              <div className={styles.identity}>
                <div className={styles.avatar} aria-hidden="true">
                  M
                </div>
                <div>
                  <h2 className={styles.name} id="reception-dialog-title">
                    {receptionistName}
                  </h2>
                  <p className={styles.role}>Gym receptionist</p>
                </div>
              </div>
              <button
                className={styles.close}
                type="button"
                aria-label="Close conversation"
                onClick={closeDialog}
              >
                X
              </button>
            </header>

            <p className={styles.message}>
              {selectedOption?.response ?? receptionGreeting}
            </p>

            <div className={styles.options}>
              {receptionDialogOptions.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.option} ${
                    selectedTopic === option.id ? styles.optionSelected : ''
                  }`}
                  type="button"
                  onClick={() => selectTopic(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <footer className={styles.footer}>
              <span>Choose a question or press Esc to leave.</span>
              {tourStarted ? (
                <span className={styles.tourStatus}>Tour active</span>
              ) : null}
            </footer>
          </div>
        </section>
      ) : null}
    </>
  )
}
