import { useEffect, useRef } from 'react'
import { useAppSelector } from '../../store/hooks'
import styles from './ChatArea.module.css'

export default function ChatArea() {
  const { sessions, activeChatId } = useAppSelector((s) => s.chat)
  const bottomRef = useRef<HTMLDivElement>(null)

  const activeSession = sessions.find((s) => s.id === activeChatId)
  const messages = activeSession?.messages ?? []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, activeChatId])

  return (
    <div className={styles.area}>
      {!activeSession ? (
        <div className={styles.welcome}>
          <h2>Bienvenido al ChatBot</h2>
          <p>
            Crea un nuevo chat o selecciona uno del historial para comenzar.
          </p>
        </div>
      ) : messages.length === 0 ? (
        <div className={styles.welcome}>
          <h2>{activeSession.title}</h2>
          <p>Escribe un mensaje o adjunta un archivo PDF o Word.</p>
        </div>
      ) : (
        <ul className={styles.messages}>
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`${styles.message} ${
                msg.role === 'user' ? styles.user : styles.assistant
              }`}
            >
              <div className={styles.bubble}>
                <p>{msg.content}</p>
                {msg.attachmentName && (
                  <span className={styles.attachment}>
                    📎 {msg.attachmentName}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
