import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'
import {
  createNewChat,
  selectChat,
  setSearchQuery,
} from '../../store/slices/chatSlice'
import styles from './Sidebar.module.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onOpenSettings: () => void
}

const ACCEPTED_FILE_HINT = '.pdf, .doc, .docx'

export default function Sidebar({
  isOpen,
  onClose,
  onOpenSettings,
}: SidebarProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((s) => s.auth.user)
  const { sessions, activeChatId, searchQuery } = useAppSelector((s) => s.chat)

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  function handleLogout() {
    dispatch(logout())
    navigate('/login')
  }

  function handleNewChat() {
    dispatch(createNewChat())
    onClose()
  }

  function handleSelectChat(id: string) {
    dispatch(selectChat(id))
    onClose()
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Cerrar menú"
          onClick={onClose}
        />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>ChatBot</span>
          <p className={styles.userName}>{user?.name ?? 'Usuario'}</p>
        </div>

        <button
          type="button"
          className={styles.newChat}
          onClick={handleNewChat}
        >
          + Nuevo chat
        </button>

        <div className={styles.searchWrap}>
          <input
            type="search"
            className={styles.search}
            placeholder="Buscar chats..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            aria-label="Buscar chats"
          />
        </div>

        <nav className={styles.navSection}>
          <span className={styles.navLabel}>Files</span>
          <p className={styles.filesHint}>
            Sube {ACCEPTED_FILE_HINT} desde el chat
          </p>
        </nav>

        <hr className={styles.divider} />

        <div className={styles.history}>
          <span className={styles.navLabel}>Historial</span>
          <ul className={styles.chatList}>
            {filteredSessions.length === 0 ? (
              <li className={styles.empty}>Sin conversaciones</li>
            ) : (
              filteredSessions.map((session) => (
                <li key={session.id}>
                  <button
                    type="button"
                    className={`${styles.chatItem} ${
                      session.id === activeChatId ? styles.active : ''
                    }`}
                    onClick={() => handleSelectChat(session.id)}
                  >
                    {session.title}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <hr className={styles.divider} />

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.footerBtn}
            onClick={onOpenSettings}
          >
            Settings
          </button>
          <button
            type="button"
            className={`${styles.footerBtn} ${styles.logout}`}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}
