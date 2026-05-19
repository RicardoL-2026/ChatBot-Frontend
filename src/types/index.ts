export interface User {
  id: string
  name: string
  email: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  attachmentName?: string
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  updatedAt: number
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface ChatState {
  sessions: ChatSession[]
  activeChatId: string | null
  searchQuery: string
}
