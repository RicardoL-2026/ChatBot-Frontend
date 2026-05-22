import { useCallback, useEffect, useRef } from 'react'
import styles from './DinoGame.module.css'

const GRAVITY = 0.55
const JUMP = -9.5
const SPEED_START = 4
const DINO_WIDTH = 22
const DINO_HEIGHT = 28
const DINO_X = 36

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
      s.dinoVy = JUMP
      s.frame = 0
      return
    }
    // Solo puede saltar si está en el suelo (dinoY === 0)
    if (s.dinoY >= 0) {
      s.dinoVy = JUMP
    }
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

      // Fondo
      ctx.fillStyle = '#002b36'
      ctx.fillRect(0, 0, w, h)

      // Línea del suelo
      ctx.strokeStyle = '#586e75'
      ctx.beginPath()
      ctx.moveTo(0, ground + 12)
      ctx.lineTo(w, ground + 12)
      ctx.stroke()

      if (s.running && !s.gameOver) {
        // Física del salto
        s.dinoVy += GRAVITY
        s.dinoY += s.dinoVy
      
        if (s.dinoY >= 0) {
          s.dinoY = 0
          s.dinoVy = 0
        }
      
        s.frame++
      
        const spawnInterval = Math.max(50, 90 - Math.floor(s.score / 100) * 5)
        if (s.frame % spawnInterval === 0) {
          const size = 14 + Math.random() * 16
          s.obstacles.push({ x: w, w: 10 + Math.random() * 8, h: size })
        }
      
        s.speed = SPEED_START + Math.floor(s.score / 200) * 0.5
      
        s.obstacles = s.obstacles
          .map((o) => ({ ...o, x: o.x - s.speed }))
          .filter((o) => o.x > -30)
      
        // Detección de colisiones AABB
        const margin = 4
        const dinoLeft = DINO_X + margin
        const dinoRight = DINO_X + DINO_WIDTH - margin
        const dinoTop = ground + s.dinoY - DINO_HEIGHT
        const dinoBottom = ground + s.dinoY
      
        for (const o of s.obstacles) {
          const obsLeft = o.x
          const obsRight = o.x + o.w
          const obsTop = ground - o.h
          const obsBottom = ground
      
          if (
            dinoRight > obsLeft &&
            dinoLeft < obsRight &&
            dinoBottom > obsTop &&
            dinoTop < obsBottom
          ) {
            s.gameOver = true
            s.running = false
            break
          }
        }
      
        s.score++
      }

      // Dibujar cubo
      // dinoY <= 0 (0 = suelo, negativo = en el aire)
      const dinoDrawY = ground - DINO_HEIGHT + s.dinoY
      ctx.fillStyle = '#93a1a1'
      ctx.fillRect(DINO_X, dinoDrawY, DINO_WIDTH, DINO_HEIGHT)
      // Cabeza
      ctx.fillRect(DINO_X + 18, dinoDrawY + 4, 8, 6)
      // Ojo
      ctx.fillStyle = '#002b36'
      ctx.fillRect(DINO_X + 22, dinoDrawY + 5, 3, 3)

      // Piernas animadas
      ctx.fillStyle = '#93a1a1'
      if (s.running && !s.gameOver && s.dinoY === 0) {
        // Animación de correr
        if (Math.floor(s.frame / 8) % 2 === 0) {
          ctx.fillRect(DINO_X + 4, dinoDrawY + DINO_HEIGHT, 4, 6)
          ctx.fillRect(DINO_X + 14, dinoDrawY + DINO_HEIGHT, 4, 6)
        } else {
          ctx.fillRect(DINO_X + 2, dinoDrawY + DINO_HEIGHT, 4, 6)
          ctx.fillRect(DINO_X + 16, dinoDrawY + DINO_HEIGHT, 4, 6)
        }
      } else {
        ctx.fillRect(DINO_X + 4, dinoDrawY + DINO_HEIGHT, 4, 6)
        ctx.fillRect(DINO_X + 14, dinoDrawY + DINO_HEIGHT, 4, 6)
      }

      // Dibujar obstáculos
      for (const o of s.obstacles) {
        ctx.fillStyle = '#cb4b16'
        ctx.fillRect(o.x, ground - o.h, o.w, o.h)
        // Detalle del cactus
        ctx.fillStyle = '#8b3510'
        ctx.fillRect(o.x + 2, ground - o.h + 2, o.w - 4, 3)
      }

      // Texto UI
      ctx.fillStyle = '#839496'
      ctx.font = '12px Consolas, monospace'
      if (!s.running && !s.gameOver) {
        ctx.fillText('Press Space or tap to start', 12, 24)
      } else if (s.gameOver) {
        ctx.fillText(`Game over — score ${Math.floor(s.score / 10)}. Space to retry`, 12, 24)
      } else {
        ctx.fillText(`Score: ${String(Math.floor(s.score / 10))}`, w - 80, 20)
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