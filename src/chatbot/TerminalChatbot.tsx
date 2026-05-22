import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import { TerminalIcon } from '../portfolio/icons/Icons'
import { TERMINAL_COMMANDS } from './config'
import { ProcessingIndicator } from './components/ProcessingIndicator'
import { useChatbot } from './hooks/useChatbot'
import styles from './TerminalChatbot.module.css'

export function TerminalChatbot() {
  const { lines, input, setInput, ready, busy, handleSubmit } = useChatbot()
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, busy])
  
  useEffect(() => {
    if (ready && !busy) {
      inputRef.current?.focus()
    }
  }, [ready, busy])

  const focusInput = useCallback(() => {
    if (ready && !busy) {
      inputRef.current?.focus()
    }
  }, [ready, busy])

  const handleBodyClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button')) return
      focusInput()
    },
    [focusInput],
  )

  return (
    <section className={styles.terminal} aria-label="Terminal chatbot">
      <header className={styles.header}>
        <TerminalIcon size={14} />
        <span>TERMINAL — CHATBOT</span>
        <span className={styles.badge}>{ready ? (busy ? '…' : 'online') : 'connecting'}</span>
      </header>
      <div className={styles.body} onClick={handleBodyClick} role="presentation">
        <div className={styles.commandsHelp}>
          <span className={styles.commandsTitle}>Comandos disponibles:</span>
          <ul className={styles.commandsList}>
            {TERMINAL_COMMANDS.map(({ cmd, desc }) => (
              <li key={cmd}>
                <code className={styles.cmdCode}>{cmd}</code>
                <span className={styles.cmdDesc}>— {desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div ref={logRef} className={styles.log}>
          {lines.map((line) => (
            <p key={line.id} className={`${styles.line} ${styles[line.kind]}`}>
              {line.text}
            </p>
          ))}
          {busy && ready && <ProcessingIndicator />}
        </div>
        <form className={styles.inputRow} onSubmit={handleSubmit}>
          <label className={styles.srOnly} htmlFor="terminal-input">
            Terminal input
          </label>
          <span className={styles.prefix}>guest@portfolio:~$</span>
          <input
            ref={inputRef}
            id="terminal-input"
            type="text"
            className={styles.input}
            placeholder={
              ready
                ? 'Pregunta, history, Clear-History o !16'
                : 'Conectando…'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!ready || busy}
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </section>
  )
}
