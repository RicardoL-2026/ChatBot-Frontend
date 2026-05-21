import type { ActivityView, PortfolioFileId } from '../types'
import { Explorer } from './Explorer'
import { SearchPanel } from './SearchPanel'
import { SourceControlPanel } from './SourceControlPanel'
import { DinoGame } from './DinoGame'
import styles from './SidePanel.module.css'

interface SidePanelProps {
  view: ActivityView
  onOpenFile: (fileId: PortfolioFileId) => void
}

export function SidePanel({ view, onOpenFile }: SidePanelProps) {
  return (
    <aside className={styles.panel} aria-label="Side panel">
      {view === 'explorer' && <Explorer onOpenFile={onOpenFile} />}
      {view === 'search' && <SearchPanel onOpenFile={onOpenFile} />}
      {view === 'source-control' && <SourceControlPanel />}
      {view === 'run-debug' && <DinoGame />}
    </aside>
  )
}
