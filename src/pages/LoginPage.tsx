import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import formStyles from '../components/auth/AuthForm.module.css'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/slices/authSlice'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Completa email y contraseña.')
      return
    }

    dispatch(
      login({
        id: crypto.randomUUID(),
        name: email.split('@')[0],
        email: email.trim(),
      }),
    )
    navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Accede a tu cuenta para continuar"
      footerText="¿No tienes cuenta?"
      footerLinkText="Regístrate"
      footerLinkTo="/register"
    >
      <form className={formStyles.form} onSubmit={handleSubmit} noValidate>
        <div className={formStyles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={formStyles.error}>{error}</p>}
        <button type="submit" className={formStyles.submit}>
          Entrar
        </button>
      </form>
    </AuthLayout>
  )
}
