import { useState } from 'react'
import ChatArea from '../components/dashboard/ChatArea'
import ChatInput from '../components/dashboard/ChatInput'
import SettingsModal from '../components/dashboard/SettingsModal'
import Sidebar from '../components/dashboard/Sidebar'
import { useAppSelector } from '../store/hooks'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const user = useAppSelector((s) => s.auth.user)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenSettings={() => {
          setSettingsOpen(true)
          setSidebarOpen(false)
        }}
      />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Abrir menú"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className={styles.pageTitle}>ChatBot</h1>
        </header>

        <ChatArea />
        <ChatInput />
      </main>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        userName={user?.name ?? ''}
        userEmail={user?.email ?? ''}
      />
    </div>
  )
}
