import type { ActivityView } from '../types'
import {
  ExplorerIcon,
  RunDebugIcon,
  SearchIcon,
  SourceControlIcon,
} from '../icons/Icons'
import styles from './ActivityBar.module.css'

interface ActivityBarProps {
  activeView: ActivityView
  onViewChange: (view: ActivityView) => void
  sidePanelOpen: boolean
  onToggleSidePanel: () => void
}

const VIEWS: { id: ActivityView; label: string; Icon: typeof ExplorerIcon }[] = [
  { id: 'explorer', label: 'Explorer', Icon: ExplorerIcon },
  { id: 'search', label: 'Search', Icon: SearchIcon },
  { id: 'source-control', label: 'Source Control', Icon: SourceControlIcon },
  { id: 'run-debug', label: 'Run and Debug', Icon: RunDebugIcon },
]

export function ActivityBar({
  activeView,
  onViewChange,
  sidePanelOpen,
  onToggleSidePanel,
}: ActivityBarProps) {
  return (
    <nav className={styles.bar} aria-label="Activity Bar">
      {VIEWS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          className={`${styles.item} ${activeView === id ? styles.active : ''}`}
          onClick={() => {
            if (activeView === id && sidePanelOpen) {
              onToggleSidePanel()
            } else {
              onViewChange(id)
            }
          }}
          title={label}
          aria-label={label}
          aria-pressed={activeView === id}
        >
          <Icon size={24} />
        </button>
      ))}
    </nav>
  )
}
