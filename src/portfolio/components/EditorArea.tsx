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
        <p>Open a file from the Explorer to know about my skills and experience.</p>
        <ul>
          <li>Explorer — Info about my education, experience, technical skills, soft skills, about me and my hobbies</li>
          <li>Search — Search for keywords and jump between files</li>
          <li>Source Control — GitHub projects</li>
          <li>Run and Debug — dinosaur mini game</li>
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
        <span className={styles.srOnly}>Editing... {path}</span>
      </div>
    </div>
  )
}
