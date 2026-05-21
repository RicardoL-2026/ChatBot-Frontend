import styles from './StatusBar.module.css'

interface StatusBarProps {
  filePath: string | null
}

export function StatusBar({ filePath }: StatusBarProps) {
  return (
    <footer className={styles.bar}>
      <span className={styles.item}>TypeScript React</span>
      <span className={styles.item}>UTF-8</span>
      <span className={styles.item}>Solarized Dark</span>
      {filePath && <span className={styles.path}>{filePath}</span>}
    </footer>
  )
}
