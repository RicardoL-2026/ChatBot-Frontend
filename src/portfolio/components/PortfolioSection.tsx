import type { PortfolioFileId } from '../types'
import { FILE_PATHS, PORTFOLIO_CONTENT } from '../contentLoader'
import { markdownToHtml } from '../utils/markdown'
import styles from './PortfolioSection.module.css'

interface PortfolioSectionProps {
  fileId: PortfolioFileId
  variant?: 'tsx' | 'readme'
}

export function PortfolioSection({ fileId, variant = 'tsx' }: PortfolioSectionProps) {
  const content = PORTFOLIO_CONTENT[fileId]
  const path = FILE_PATHS[fileId]

  return (
    <article className={styles.section}>
      <div className={styles.breadcrumb}>
        <span className={styles.muted}>// {path}</span>
        {variant === 'readme' && <span className={styles.badge}>README</span>}
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
      />
    </article>
  )
}
