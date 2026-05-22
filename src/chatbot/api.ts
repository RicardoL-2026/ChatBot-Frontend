import { apiClient } from './apiClient'
import { MESSAGE_TYPE } from './config'
import {
  getConversationId,
  getConversationIdAsString,
  setConversationId,
} from './conversationSession'
import type { ApiEnvelope, ChatbotExchange, Conversation, Message } from './types'

function assertSuccess<T>(envelope: ApiEnvelope<T>, fallback: string): T {
  if (!envelope.success || envelope.data == null) {
    throw new Error(envelope.message || fallback)
  }
  return envelope.data
}

/** Starts / retrieves the single portfolio conversation and stores its ID */
export async function initConversation(): Promise<Conversation> {
  const envelope = await apiClient.get<ApiEnvelope<Conversation[]>>('/api/Conversation')
  const list = assertSuccess(envelope, 'No se pudo iniciar la conversación')
  const conversation = list[0]

  if (!conversation) {
    throw new Error('No hay conversaciones disponibles')
  }

  setConversationId(conversation.id)
  return conversation
}

export async function sendChatMessage(messa: string, isReplay: boolean): Promise<ChatbotExchange> {
  const url = isReplay ? '/api/chatbot/ask-replay' : '/api/chatbot/ask'
  const envelope = await apiClient.post<ApiEnvelope<ChatbotExchange>>(url, {
    messa,
    type: MESSAGE_TYPE,
    conversacionID: getConversationIdAsString(),
  })
  return assertSuccess(envelope, 'No se pudo obtener respuesta del chatbot')
}

export async function fetchMessageHistory(): Promise<Message[]> {
  const envelope = await apiClient.get<ApiEnvelope<Message[]>>('/api/Message')
  return assertSuccess(envelope, 'No se pudo cargar el historial')
}

export async function clearMessageHistory(): Promise<void> {
  const url = `/api/Message/${getConversationId()}/messages`
  const envelope = await apiClient.delete<ApiEnvelope<unknown>>(url)
  if (!envelope.success) {
    throw new Error(envelope.message || 'No se pudo borrar el historial')
  }
}

export async function getMessageById(id: number): Promise<Message> {
  const messages = await fetchMessageHistory()
  const found = messages.find((m) => m.id === id)
  if (!found) {
    throw new Error(`No existe mensaje con ID ${id}. Usa history para ver IDs.`)
  }
  return found
}
