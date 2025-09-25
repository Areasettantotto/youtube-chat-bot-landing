import React, { useEffect, useRef } from "react"
import MotionLayout, { motion } from './MotionLayout.jsx'
import { childVariants } from '../animations/variants'
import { useLanguage } from '../hooks/useLanguage.jsx'
import Logo from './header/Logo.jsx'

function ParticlesBackground() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([]) // persist particles across frames
  const resizeObserverRef = useRef(null)
  const resizeFallbackRef = useRef(null)

  // helper: create one particle inside width/height
  const createParticle = (w, h) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 + 0.6,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = window.devicePixelRatio || 1
    const maxLinksDistance = 120

    // (re)configure canvas size + regenerate particles
    const configure = () => {
      const rect = parent.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      dpr = window.devicePixelRatio || 1

      // size canvas for crisp rendering
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))

      // reset transform and scale so drawing uses CSS pixels
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      // choose particle count by area (keeps density consistent)
      const area = width * height
      const count = Math.min(200, Math.max(30, Math.round(area / 12000)))
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(width, height)
      )
    }

    // initial configure
    configure()

    // observe size changes of parent container
    if (typeof ResizeObserver !== "undefined") {
      resizeObserverRef.current = new ResizeObserver(() => {
        configure()
      })
      resizeObserverRef.current.observe(parent)
    } else {
      // fallback
      resizeFallbackRef.current = () => configure()
      window.addEventListener("resize", resizeFallbackRef.current)
    }

    // draw loop
    const draw = () => {
      // clear using CSS pixel coordinates (we scaled ctx)
      ctx.clearRect(0, 0, width, height)

      // dynamic colors depending on theme
      const isDark = document.documentElement.classList.contains("dark")
      const fillColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.65)"
      const strokeColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"

      ctx.fillStyle = fillColor
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 0.8

      const parts = particlesRef.current
      const len = parts.length

      for (let i = 0; i < len; i++) {
        const p = parts[i]

        // move + bounce
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > width) { p.x = width; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > height) { p.y = height; p.vy *= -1 }

        // draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // draw links (simple O(n^2) but with small counts it's fine)
      for (let i = 0; i < len; i++) {
        const a = parts[i]
        for (let j = i + 1; j < len; j++) {
          const b = parts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist2 = dx * dx + dy * dy
          const threshold = maxLinksDistance
          if (dist2 < threshold * threshold) {
            const alpha = 1 - Math.sqrt(dist2) / threshold
            // set temporary stroke style with alpha
            ctx.beginPath()
            ctx.strokeStyle = isDark
              ? `rgba(255,255,255,${alpha * 0.14})`
              : `rgba(0,0,0,${alpha * 0.08})`
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    // cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect()
      else if (resizeFallbackRef.current) window.removeEventListener("resize", resizeFallbackRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <MotionLayout
      id="hero"
      className="relative overflow-hidden text-center min-h-[60vh] md:min-h-screen flex items-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <ParticlesBackground />
      <div className="relative z-10 w-full max-w-6xl mx-auto pb-8">
        <motion.div className="mb-4 flex justify-center" variants={childVariants}>
          <Logo size="big" />
        </motion.div>
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white leading-tight"
          variants={childVariants}
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto mb-6 sm:mb-8 px-2 leading-relaxed"
          variants={childVariants}
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.a
          href="#setup"
          variants={childVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="inline-block bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold max-w-xs sm:max-w-sm mx-auto"
        >
          {t('hero.cta')}
        </motion.a>
      </div>
    </MotionLayout>
  )
}
