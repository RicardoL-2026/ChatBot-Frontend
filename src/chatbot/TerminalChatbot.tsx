import { TerminalIcon } from '../portfolio/icons/Icons'
import styles from './TerminalChatbot.module.css'

export function TerminalChatbot() {
  return (
    <section className={styles.terminal} aria-label="Terminal chatbot">
      <header className={styles.header}>
        <TerminalIcon size={14} />
        <span>TERMINAL - CHATBOT</span>
        <span className={styles.badge}>chatbot</span>
      </header>
      <div className={styles.body}>
        <p className={styles.prompt}>
          <span className={styles.user}>guest</span>
          <span className={styles.at}>@</span>
          <span className={styles.host}>portfolio</span>
          <span className={styles.path}>:~$</span>
          <span className={styles.cursor} aria-hidden>
            _
          </span>
        </p>
        <p className={styles.output}>
          Chatbot API not connected. Wire <code>src/chatbot/api.ts</code> when ready.
        </p>
        <form className={styles.inputRow} onSubmit={(e) => e.preventDefault()}>
          <label className={styles.srOnly} htmlFor="terminal-input">
            Terminal input
          </label>
          <span className={styles.prefix}>$</span>
          <input
            id="terminal-input"
            type="text"
            className={styles.input}
            placeholder="Type a command (coming soon)..."
            disabled
            autoComplete="off"
          />
        </form>
      </div>
    </section>
  )
}
