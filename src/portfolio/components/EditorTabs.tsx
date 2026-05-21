import type { OpenTab, PortfolioFileId } from '../types'
import { CloseIcon, ReadmeIcon, TsxFileIcon } from '../icons/Icons'
import styles from './EditorTabs.module.css'

interface EditorTabsProps {
  tabs: OpenTab[]
  activeFileId: PortfolioFileId | null
  onSelect: (fileId: PortfolioFileId) => void
  onClose: (fileId: PortfolioFileId) => void
}

export function EditorTabs({ tabs, activeFileId, onSelect, onClose }: EditorTabsProps) {
  if (tabs.length === 0) return null

  return (
    <div className={styles.tabBar} role="tablist">
      {tabs.map((tab) => {
        const isReadme = tab.label.endsWith('.readme')
        const Icon = isReadme ? ReadmeIcon : TsxFileIcon
        const active = tab.fileId === activeFileId
        return (
          <div
            key={tab.fileId}
            className={`${styles.tab} ${active ? styles.active : ''}`}
            role="tab"
            aria-selected={active}
          >
            <button type="button" className={styles.tabBtn} onClick={() => onSelect(tab.fileId)}>
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => onClose(tab.fileId)}
              aria-label={`Close ${tab.label}`}
            >
              <CloseIcon size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
