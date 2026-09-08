import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Canvas particle constellation behind the hero.
 *
 * Performance notes — this runs behind real content, so it must stay cheap:
 *  · particle count scales with viewport area and is hard-capped
 *  · the connection pass is O(n²), which is why the cap matters
 *  · the RAF loop stops when the tab is hidden or the canvas scrolls away
 *  · reduced-motion users get nothing rendered at all
 */
export default function ParticleField({ className = '', density = 12000, maxParticles = 90 }) {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return undefined

    let width = 0
    let height = 0
    let particles = []
    let frame = null
    let isVisible = true
    const pointer = { x: -9999, y: -9999 }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const createParticles = () => {
      const count = Math.min(Math.floor((width * height) / density), maxParticles)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.5 + 0.25,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      createParticles()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]

        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around the edges rather than bouncing — reads as an open field.
        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20

        // Gentle repulsion from the pointer
        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (distance < 130 && distance > 0) {
          const push = (130 - distance) / 130
          particle.x += (dx / distance) * push * 1.4
          particle.y += (dy / distance) * push * 1.4
        }

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(56, 189, 248, ${particle.alpha})`
        context.fill()

        // Link nearby particles
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const lineDistance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (lineDistance < 128) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(37, 99, 235, ${0.16 * (1 - lineDistance / 128)})`
            context.lineWidth = 1
            context.stroke()
          }
        }
      }

      frame = requestAnimationFrame(draw)
    }

    const start = () => {
      if (frame === null) frame = requestAnimationFrame(draw)
    }
    const stop = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else if (isVisible) start()
    }

    // Only animate while the canvas is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )

    resize()
    observer.observe(canvas)
    start()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onPointerMove, { passive: true })
    window.addEventListener('mouseout', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseout', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [reduceMotion, density, maxParticles])

  if (reduceMotion) return null

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
