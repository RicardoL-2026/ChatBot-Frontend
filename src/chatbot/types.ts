export type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

export interface ApiEnvelope<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
  errors: unknown
  timestamp: string
}

export interface Conversation {
  id: number
  title: string
  messages: Message[]
}

export interface Message {
  id: number
  messa: string
  createdAt: string
  type: string
  conversacionID: number
}

export interface ChatbotRequestBody {
  messa: string
  type: 'Request'
  conversacionID: string
}

export interface ChatbotExchange {
  question: Message
  answer: string
}

export type TerminalLineKind = 'system' | 'input' | 'output' | 'error' | 'history'

export interface TerminalLine {
  id: string
  kind: TerminalLineKind
  text: string
}
