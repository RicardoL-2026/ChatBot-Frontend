import { VsCodeIcon } from '../icons/Icons'
import styles from './TitleBar.module.css'

export function TitleBar() {
  return (
    <header className={styles.bar}>
      <VsCodeIcon size={18} />
      <span className={styles.title}>Lopez Garcia Ricardo - Resume</span>
      <span className={styles.theme}>Solarized Dark</span>
    </header>
  )
}
