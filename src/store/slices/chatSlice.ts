import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ChatMessage, ChatSession, ChatState } from '../../types'

const STORAGE_KEY = 'chatbot_sessions'

function loadSessions(): ChatSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ChatSession[]
  } catch {
    /* ignore */
  }
  return []
}

function persistSessions(sessions: ChatSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

function createSession(title = 'Nuevo chat'): ChatSession {
  return {
    id: crypto.randomUUID(),
    title,
    messages: [],
    updatedAt: Date.now(),
  }
}

const initialState: ChatState = {
  sessions: loadSessions(),
  activeChatId: null,
  searchQuery: '',
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    createNewChat: (state) => {
      const session = createSession()
      state.sessions.unshift(session)
      state.activeChatId = session.id
      persistSessions(state.sessions)
    },
    selectChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload
    },
    sendMessage: (
      state,
      action: PayloadAction<{ content: string; attachmentName?: string }>,
    ) => {
      const { content, attachmentName } = action.payload
      if (!content.trim() && !attachmentName) return

      let session = state.sessions.find((s) => s.id === state.activeChatId)
      if (!session) {
        session = createSession(
          content.slice(0, 40) || attachmentName || 'Nuevo chat',
        )
        state.sessions.unshift(session)
        state.activeChatId = session.id
      }

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: content.trim() || `Archivo adjunto: ${attachmentName}`,
        timestamp: Date.now(),
        attachmentName,
      }
      session.messages.push(userMessage)

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          'Gracias por tu mensaje. El backend del chatbot se conectará aquí para generar respuestas.',
        timestamp: Date.now(),
      }
      session.messages.push(assistantMessage)

      if (session.title === 'Nuevo chat' && content.trim()) {
        session.title = content.slice(0, 40)
      }
      session.updatedAt = Date.now()
      persistSessions(state.sessions)
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.sessions = state.sessions.filter((s) => s.id !== action.payload)
      if (state.activeChatId === action.payload) {
        state.activeChatId = state.sessions[0]?.id ?? null
      }
      persistSessions(state.sessions)
    },
  },
})

export const {
  setSearchQuery,
  createNewChat,
  selectChat,
  sendMessage,
  deleteChat,
} = chatSlice.actions
export default chatSlice.reducer
