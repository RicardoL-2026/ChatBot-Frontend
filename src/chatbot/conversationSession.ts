let conversationId: number | null = null

export function setConversationId(id: number): void {
  conversationId = id
}

export function getConversationId(): number {
  if (conversationId == null) {
    throw new Error('La conversación no ha sido iniciada. Llama a initConversation primero.')
  }
  return conversationId
}

export function getConversationIdAsString(): string {
  return String(getConversationId())
}
