import { useMemo, useState, type FormEvent } from 'react'
import type { PortfolioFileId } from '../types'
import { searchPortfolio } from '../utils/search'
import styles from './SearchPanel.module.css'

interface SearchPanelProps {
  onOpenFile: (fileId: PortfolioFileId) => void
}

export function SearchPanel({ onOpenFile }: SearchPanelProps) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => searchPortfolio(query), [query])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      onOpenFile(results[0].fileId)
    }
  }

  return (
    <div className={styles.panel}>
      <header className={styles.header}>SEARCH</header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="search"
          className={styles.input}
          placeholder="Search portfolio content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search portfolio"
        />
      </form>
      <ul className={styles.results}>
        {query.trim() === '' ? (
          <li className={styles.hint}>Type a word to find matching files</li>
        ) : results.length === 0 ? (
          <li className={styles.hint}>No results for &quot;{query}&quot;</li>
        ) : (
          results.map((match) => (
            <li key={match.fileId}>
              <button
                type="button"
                className={styles.resultBtn}
                onClick={() => onOpenFile(match.fileId)}
              >
                <span className={styles.fileName}>{match.label}</span>
                <span className={styles.path}>{match.path}</span>
                <span className={styles.snippet}>{match.snippet}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
