import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react'
import {
  clearMessageHistory,
  fetchMessageHistory,
  getMessageById,
  initConversation,
  sendChatMessage,
} from '../api'
import { ApiError } from '../apiClient'
import type { TerminalLine } from '../types'

function lineId(prefix: string, n: number) {
  return `${prefix}-${n}`
}

function formatHistoryEntry(id: number, messa: string) {
  return `  ${String(id).padStart(4)}  ${messa}`
}

function parseCommand(text: string): 'history' | 'clear-history' | { replay: number } | null {
  const lower = text.toLowerCase()
  if (lower === 'history') return 'history'
  if (lower === 'clear-history') return 'clear-history'
  const replay = /^!(\d+)$/.exec(text.trim())
  if (replay) return { replay: Number(replay[1]) }
  return null
}

export function useChatbot() {
  const baseId = useId()
  const lineCounter = useRef(0)
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)

  const append = useCallback((kind: TerminalLine['kind'], text: string) => {
    const n = lineCounter.current++
    setLines((prev) => [...prev, { id: lineId(baseId, n), kind, text }])
  }, [baseId])

  const runAsk = useCallback(
    async (messa: string) => {
      setBusy(true)
      try {
        const { answer } = await sendChatMessage(messa, false)
        append('output', answer)
      } catch (e) {
        const msg =
          e instanceof ApiError
            ? e.message
            : e instanceof Error
              ? e.message
              : 'Error al enviar mensaje'
        append('error', msg)
      } finally {
        setBusy(false)
      }
    },
    [append],
  )

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      append('system', 'Iniciando conversación con el portfolio…')
      try {
        const conversation = await initConversation()
        if (cancelled) return
        append(
          'system',
          `"${conversation.title}"...`,
        )
        setReady(true)
      } catch (e) {
        if (cancelled) return
        const msg =
          e instanceof ApiError
            ? e.message
            : e instanceof Error
              ? e.message
              : 'Error al conectar con el chatbot'
        append('error', msg)
      }
    }

    bootstrap()
    return () => {
      cancelled = true
    }
  }, [append])

  const runHistory = useCallback(async () => {
    setBusy(true)
    try {
      const messages = await fetchMessageHistory()
      if (messages.length === 0) {
        append('history', '(historial vacío)')
        return
      }
      append('history', `history (${messages.length} entradas) — usa !ID para re-ejecutar:`)
      messages.forEach((m) => {
        append('history', formatHistoryEntry(m.id, m.messa))
      })
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? e.message
          : e instanceof Error
            ? e.message
            : 'Error al cargar historial'
      append('error', msg)
    } finally {
      setBusy(false)
    }
  }, [append])

  const runClearHistory = useCallback(async () => {
    setBusy(true)
    try {
      await clearMessageHistory()
      append('system', 'Historial borrado correctamente.')
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? e.message
          : e instanceof Error
            ? e.message
            : 'Error al borrar historial'
      append('error', msg)
    } finally {
      setBusy(false)
    }
  }, [append])

  const runReplay = useCallback(
    async (messageId: number) => {
      setBusy(true)
      try {
        const message = await getMessageById(messageId)
        append('system', `Re-ejecutando mensaje #${messageId}: "${message.messa}"`)
        const { answer } = await sendChatMessage(message.messa, true)
        append('output', answer)
      } catch (e) {
        const msg =
          e instanceof ApiError
            ? e.message
            : e instanceof Error
              ? e.message
              : 'Error al re-ejecutar mensaje'
        append('error', msg)
      } finally {
        setBusy(false)
      }
    },
    [append],
  )

  const submit = useCallback(
    async (raw: string) => {
      const text = raw.trim()
      if (!text || !ready || busy) return

      append('input', `guest@portfolio:~$ ${text}`)
      setInput('')

      const command = parseCommand(text)

      if (command === 'history') {
        await runHistory()
        return
      }
      if (command === 'clear-history') {
        await runClearHistory()
        return
      }
      if (command && typeof command === 'object' && 'replay' in command) {
        await runReplay(command.replay)
        return
      }

      await runAsk(text)
    },
    [append, busy, ready, runAsk, runClearHistory, runHistory, runReplay],
  )

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      void submit(input)
    },
    [input, submit],
  )

  return {
    lines,
    input,
    setInput,
    ready,
    busy,
    handleSubmit,
  }
}
