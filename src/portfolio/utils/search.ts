import type { PortfolioFileId } from '../types'
import { SEARCH_INDEX } from '../contentLoader'

export interface SearchMatch {
  fileId: PortfolioFileId
  label: string
  path: string
  snippet: string
}

export function searchPortfolio(query: string): SearchMatch[] {
  const term = query.trim().toLowerCase()
  if (!term) return []

  return SEARCH_INDEX.filter((doc) => doc.content.toLowerCase().includes(term)).map((doc) => {
    const idx = doc.content.toLowerCase().indexOf(term)
    const start = Math.max(0, idx - 40)
    const end = Math.min(doc.content.length, idx + term.length + 60)
    const snippet = doc.content.slice(start, end).replace(/\n/g, ' ')
    return {
      fileId: doc.fileId,
      label: doc.label,
      path: doc.path,
      snippet: (start > 0 ? '…' : '') + snippet + (end < doc.content.length ? '…' : ''),
    }
  })
}
