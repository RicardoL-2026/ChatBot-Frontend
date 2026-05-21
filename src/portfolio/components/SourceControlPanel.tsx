import { GITHUB_PROJECTS } from '../contentLoader'
import styles from './SourceControlPanel.module.css'

export function SourceControlPanel() {
  return (
    <div className={styles.panel}>
      <header className={styles.header}>SOURCE CONTROL</header>
      <p className={styles.subtitle}>GitHub repositories</p>
      <div className={styles.grid}>
        {GITHUB_PROJECTS.map((project) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.name}>{project.name}</h3>
              {project.stars !== undefined && (
                <span className={styles.stars}>★ {project.stars}</span>
              )}
            </div>
            <p className={styles.desc}>{project.description}</p>
            <footer className={styles.footer}>
              <span className={styles.lang}>{project.language}</span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                View on GitHub →
              </a>
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}
