import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User } from '../../types'

const STORAGE_KEY = 'chatbot_auth'

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as AuthState
      if (parsed.user && parsed.isAuthenticated) return parsed
    }
  } catch {
    /* ignore */
  }
  return { user: null, isAuthenticated: false }
}

function persistAuth(state: AuthState) {
  if (state.isAuthenticated && state.user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

const initialState: AuthState = loadAuth()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      persistAuth(state)
    },
    register: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      persistAuth(state)
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      persistAuth(state)
    },
  },
})

export const { login, register, logout } = authSlice.actions
export default authSlice.reducer
