import styles from './SettingsModal.module.css'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  userName: string
  userEmail: string
}

export default function SettingsModal({
  isOpen,
  onClose,
  userName,
  userEmail,
}: SettingsModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-labelledby="settings-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id="settings-title">Settings</h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Cerrar"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className={styles.body}>
          <p>
            <strong>Nombre:</strong> {userName}
          </p>
          <p>
            <strong>Email:</strong> {userEmail}
          </p>
          <p className={styles.hint}>
            Aquí podrás configurar preferencias cuando conectes el backend.
          </p>
        </div>
      </div>
    </div>
  )
}
