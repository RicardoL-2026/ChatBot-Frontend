import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { sendMessage } from '../../store/slices/chatSlice'
import styles from './ChatInput.module.css'

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx']

function isValidFile(file: File): boolean {
  if (ACCEPTED_TYPES.includes(file.type)) return true
  const name = file.name.toLowerCase()
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))
}

export default function ChatInput() {
  const dispatch = useAppDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    setFileError('')

    if (!file) return

    if (!isValidFile(file)) {
      setFileError('Solo se permiten archivos PDF o Word (.pdf, .doc, .docx).')
      return
    }

    setAttachment(file)
  }

  function clearAttachment() {
    setAttachment(null)
    setFileError('')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim() && !attachment) return

    dispatch(
      sendMessage({
        content: text,
        attachmentName: attachment?.name,
      }),
    )
    setText('')
    setAttachment(null)
    setFileError('')
  }

  return (
    <form className={styles.bar} onSubmit={handleSubmit}>
      <input
        ref={fileInputRef}
        type="file"
        className={styles.fileInput}
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        aria-hidden
        tabIndex={-1}
      />

      <button
        type="button"
        className={styles.attachBtn}
        aria-label="Subir archivo PDF o Word"
        title="Subir PDF o Word"
        onClick={() => fileInputRef.current?.click()}
      >
        +
      </button>

      <div className={styles.inputWrap}>
        {attachment && (
          <div className={styles.fileTag}>
            <span>📎 {attachment.name}</span>
            <button
              type="button"
              className={styles.removeFile}
              aria-label="Quitar archivo"
              onClick={clearAttachment}
            >
              ×
            </button>
          </div>
        )}
        {fileError && <p className={styles.fileError}>{fileError}</p>}
        <textarea
          className={styles.textarea}
          placeholder="Escribe tu mensaje..."
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
      </div>

      <button
        type="submit"
        className={styles.sendBtn}
        disabled={!text.trim() && !attachment}
      >
        Enviar
      </button>
    </form>
  )
}
