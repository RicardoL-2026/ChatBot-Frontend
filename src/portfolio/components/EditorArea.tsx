import type { PortfolioFileId } from '../types'
import { FILE_PATHS } from '../contentLoader'
import { SECTION_COMPONENTS } from '../sections'
import styles from './EditorArea.module.css'

interface EditorAreaProps {
  activeFileId: PortfolioFileId | null
}

export function EditorArea({ activeFileId }: EditorAreaProps) {
  if (!activeFileId) {
    return (
      <div className={styles.welcome}>
        <p className={styles.welcomeTitle}>Project_Resume</p>
        <p>Open a file from the Explorer to view your portfolio sections.</p>
        <ul>
          <li>Explorer — browse SRC files</li>
          <li>Search — find text and jump to a file</li>
          <li>Source Control — GitHub project cards</li>
          <li>Run and Debug — dino mini game</li>
        </ul>
      </div>
    )
  }

  const Section = SECTION_COMPONENTS[activeFileId]
  const path = FILE_PATHS[activeFileId]

  return (
    <div className={styles.editor}>
      <div className={styles.lineNumbers} aria-hidden>
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <div className={styles.codeArea}>
        <Section />
        <span className={styles.srOnly}>Editing {path}</span>
      </div>
    </div>
  )
}
