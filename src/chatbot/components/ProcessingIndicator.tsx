import { useEffect, useState } from 'react'
import styles from './ProcessingIndicator.module.css'

const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'] as const

const STEPS = [
  'Conectando con el asistente',
  'Leyendo contexto del portfolio',
  'Analizando tu pregunta',
  'Consultando la base de conocimiento',
  'Generando respuesta',
] as const

export function ProcessingIndicator() {
  const [frame, setFrame] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const spinTimer = setInterval(() => {
      setFrame((f) => (f + 1) % SPINNER.length)
    }, 80)

    const stepTimer = setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length)
    }, 1400)

    return () => {
      clearInterval(spinTimer)
      clearInterval(stepTimer)
    }
  }, [])

  const dots = '.'.repeat((frame % 3) + 1)

  return (
    <p className={styles.processing} aria-live="polite">
      <span className={styles.spinner}>{SPINNER[frame]}</span>
      <span className={styles.label}>
        {STEPS[step]}
        <span className={styles.dots}>{dots}</span>
      </span>
      <span className={styles.bar} aria-hidden>
        <span
          className={styles.barFill}
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </span>
    </p>
  )
}
