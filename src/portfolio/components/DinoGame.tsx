import { useCallback, useEffect, useRef } from 'react'
import styles from './DinoGame.module.css'

const GRAVITY = 0.55
const JUMP = -9.5
const SPEED_START = 4

export function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    running: false,
    gameOver: false,
    dinoY: 0,
    dinoVy: 0,
    groundY: 0,
    obstacles: [] as { x: number; w: number; h: number }[],
    frame: 0,
    score: 0,
    speed: SPEED_START,
  })

  const jump = useCallback(() => {
    const s = stateRef.current
    if (!s.running) {
      s.running = true
      s.gameOver = false
      s.obstacles = []
      s.score = 0
      s.speed = SPEED_START
      s.dinoY = 0
      s.dinoVy = 0
      return
    }
    if (s.dinoY === 0) s.dinoVy = JUMP
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      const w = Math.min(rect?.width ?? 320, 480)
      const h = 140
      canvas.width = w
      canvas.height = h
      stateRef.current.groundY = h - 24
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const s = stateRef.current
      const w = canvas.width
      const h = canvas.height
      const ground = s.groundY

      ctx.fillStyle = '#002b36'
      ctx.fillRect(0, 0, w, h)

      ctx.strokeStyle = '#586e75'
      ctx.beginPath()
      ctx.moveTo(0, ground + 12)
      ctx.lineTo(w, ground + 12)
      ctx.stroke()

      if (s.running && !s.gameOver) {
        s.dinoVy += GRAVITY
        s.dinoY += s.dinoVy
        if (s.dinoY > 0) {
          s.dinoY = 0
          s.dinoVy = 0
        }

        s.frame++
        if (s.frame % 90 === 0) {
          const size = 14 + Math.random() * 16
          s.obstacles.push({ x: w, w: 10 + Math.random() * 8, h: size })
        }

        s.speed = SPEED_START + Math.floor(s.score / 200) * 0.5
        s.obstacles = s.obstacles
          .map((o) => ({ ...o, x: o.x - s.speed }))
          .filter((o) => o.x > -30)

        const dinoX = 36
        const dinoH = 28
        const dinoTop = ground - dinoH - s.dinoY

        for (const o of s.obstacles) {
          if (
            dinoX + 20 > o.x &&
            dinoX + 8 < o.x + o.w &&
            dinoTop + dinoH > ground - o.h
          ) {
            s.gameOver = true
            s.running = false
          }
        }

        s.score++
      }

      const dinoX = 36
      const dinoH = 28
      const dinoTop = ground - dinoH - s.dinoY
      ctx.fillStyle = '#93a1a1'
      ctx.fillRect(dinoX, dinoTop, 22, dinoH)
      ctx.fillRect(dinoX + 18, dinoTop + 8, 8, 6)

      for (const o of s.obstacles) {
        ctx.fillStyle = '#cb4b16'
        ctx.fillRect(o.x, ground - o.h, o.w, o.h)
      }

      ctx.fillStyle = '#839496'
      ctx.font = '12px Consolas, monospace'
      if (!s.running && !s.gameOver) {
        ctx.fillText('Press Space or tap to start', 12, 24)
      } else if (s.gameOver) {
        ctx.fillText(`Game over — score ${s.score}. Space to retry`, 12, 24)
      } else {
        ctx.fillText(String(Math.floor(s.score / 10)), w - 40, 20)
      }
    }

    let id = 0
    const loop = () => {
      draw()
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)

    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKey)
    }
  }, [jump])

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>RUN AND DEBUG</header>
      <p className={styles.hint}>Offline dino — Space / tap to jump</p>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onPointerDown={jump}
        role="img"
        aria-label="Dinosaur mini game"
      />
    </div>
  )
}
