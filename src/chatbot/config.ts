export const MESSAGE_TYPE = 'Request' as const

export const TERMINAL_COMMANDS = [
  { cmd: 'history', desc: 'Lista todos los mensajes guardados' },
  { cmd: 'Clear-History', desc: 'Borra todos los mensajes del servidor' },
  { cmd: '!X', desc: 'Re-ejecuta el mensaje con ID X (solo esa petición)' },
] as const
