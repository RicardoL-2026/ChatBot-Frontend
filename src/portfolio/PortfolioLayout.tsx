import { useCallback, useState } from 'react'
import type { ActivityView, OpenTab, PortfolioFileId } from './types'
import { FILE_LABELS, FILE_PATHS } from './contentLoader'
import { ActivityBar } from './components/ActivityBar'
import { SidePanel } from './components/SidePanel'
import { TitleBar } from './components/TitleBar'
import { EditorTabs } from './components/EditorTabs'
import { EditorArea } from './components/EditorArea'
import { StatusBar } from './components/StatusBar'
import { TerminalChatbot } from '../chatbot/TerminalChatbot'
import styles from './PortfolioLayout.module.css'

export default function PortfolioLayout() {
  const [activityView, setActivityView] = useState<ActivityView>('explorer')
  const [sidePanelOpen, setSidePanelOpen] = useState(true)
  const [tabs, setTabs] = useState<OpenTab[]>([])
  const [activeFileId, setActiveFileId] = useState<PortfolioFileId | null>(null)

  const openFile = useCallback((fileId: PortfolioFileId) => {
    const label = FILE_LABELS[fileId]
    setTabs((prev) => {
      if (prev.some((t) => t.fileId === fileId)) return prev
      return [...prev, { fileId, label }]
    })
    setActiveFileId(fileId)
    setActivityView('explorer')
    setSidePanelOpen(true)
  }, [])

  const closeTab = useCallback(
    (fileId: PortfolioFileId) => {
      setTabs((prev) => {
        const next = prev.filter((t) => t.fileId !== fileId)
        if (activeFileId === fileId) {
          const idx = prev.findIndex((t) => t.fileId === fileId)
          const newActive = next[Math.min(idx, next.length - 1)]?.fileId ?? null
          setActiveFileId(newActive)
        }
        return next
      })
    },
    [activeFileId],
  )

  return (
    <div className={styles.shell}>
      <TitleBar />
      <div className={styles.workspace}>
        <ActivityBar
          activeView={activityView}
          onViewChange={(view) => {
            setActivityView(view)
            setSidePanelOpen(true)
          }}
          sidePanelOpen={sidePanelOpen}
          onToggleSidePanel={() => setSidePanelOpen((o) => !o)}
        />
        <div className={styles.mainColumn}>
          <div className={styles.editorRow}>
            {sidePanelOpen && (
              <SidePanel view={activityView} onOpenFile={openFile} />
            )}
            <div className={styles.editorStack}>
              <EditorTabs
                tabs={tabs}
                activeFileId={activeFileId}
                onSelect={setActiveFileId}
                onClose={closeTab}
              />
              <EditorArea activeFileId={activeFileId} />
            </div>
          </div>
          <TerminalChatbot />
        </div>
      </div>
      <StatusBar filePath={activeFileId ? FILE_PATHS[activeFileId] : null} />
    </div>
  )
}
