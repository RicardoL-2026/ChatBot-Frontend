import { VsCodeIcon } from '../icons/Icons'
import styles from './TitleBar.module.css'

export function TitleBar() {
  return (
    <header className={styles.bar}>
      <VsCodeIcon size={18} />
      <span className={styles.title}>Project_Resume — Portfolio</span>
      <span className={styles.theme}>Solarized Dark</span>
    </header>
  )
}
