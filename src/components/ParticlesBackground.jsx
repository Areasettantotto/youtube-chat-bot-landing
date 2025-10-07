import React, { useEffect, useRef } from "react"

export default function ParticlesBackground() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([]) // persist particles across frames
  const resizeObserverRef = useRef(null)
  const resizeFallbackRef = useRef(null)
  const bubbleRef = useRef(null)
  const hoveredRef = useRef(null)
  const pauseMotionRef = useRef(false)

  // helper: create one particle inside width/height
  const createParticle = (w, h) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    // keep original small particle sizes
    r: Math.random() * 1.8 + 0.6,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    // fixed label per particle
    label: String(Math.floor(1 + Math.random() * 999)),
    // mark some particles active (~22%)
    active: Math.random() < 0.22,
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

        // move + bounce (stop movement when paused, keep drawing loop active)
        if (!pauseMotionRef.current) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) { p.x = 0; p.vx *= -1 }
          if (p.x > width) { p.x = width; p.vx *= -1 }
          if (p.y < 0) { p.y = 0; p.vy *= -1 }
          if (p.y > height) { p.y = height; p.vy *= -1 }
        }

        // color per particle (active vs normal), compatible with light/dark
        let pFill
        if (p.active) {
          // active particles are red
          pFill = isDark ? 'rgba(239,68,68,0.95)' : 'rgba(239,68,68,0.9)'
        } else {
          pFill = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)'
        }

        // if hovered, draw glow + scaled dot for feedback
        const isHovered = hoveredRef.current === p
        if (isHovered) {
          ctx.save()
          ctx.shadowBlur = 12
          ctx.shadowColor = p.active ? 'rgba(239,68,68,0.95)' : (isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.25)')
          ctx.fillStyle = pFill
          ctx.beginPath()
          ctx.arc(p.x, p.y, Math.max(2.8, p.r * 1.6), 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        // base draw (small dot)
        ctx.fillStyle = pFill
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

    // hover interaction (desktop only)
    const supportsHover = window.matchMedia && window.matchMedia('(hover: hover)').matches
    let mouseMoveHandler = null
    let mouseLeaveHandler = null

    const pauseAnimation = () => {
      pauseMotionRef.current = true
    }

    const resumeAnimation = () => {
      pauseMotionRef.current = false
    }

    if (supportsHover) {
      canvas.style.pointerEvents = 'auto'
      const threshold = 28 // px - how close the mouse must be to a particle

      mouseMoveHandler = (ev) => {
        const rect = canvas.getBoundingClientRect()
        const mx = ev.clientX - rect.left
        const my = ev.clientY - rect.top

        // find nearest particle within threshold
        const parts = particlesRef.current
        let nearest = null
        let nearestDist = Infinity
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i]
          const dx = p.x - mx
          const dy = p.y - my
          const d2 = dx * dx + dy * dy
          if (d2 < nearestDist) {
            nearest = p
            nearestDist = d2
          }
        }

        const bubble = bubbleRef.current
        // only allow hover interaction for active particles
        if (nearest && nearest.active && Math.sqrt(nearestDist) <= threshold) {
          // hover over a particle
          hoveredRef.current = nearest
          pauseAnimation()

          if (bubble) {
            // choose side: if particle is left half, show bubble to right, else left
            const side = nearest.x < rect.width / 2 ? 'right' : 'left'
            const gap = 12
            const bubbleLeft = side === 'right' ? Math.min(rect.width - 12, nearest.x + gap) : Math.max(12, nearest.x - gap)
            const bubbleTop = Math.max(12, nearest.y - nearest.r - 8)

            bubble.style.display = 'block'
            bubble.style.opacity = '1'
            // position the bubble centered above or below the particle using left/top
            const cx = Math.max(12, Math.min(rect.width - 12, Math.round(nearest.x)))
            const above = nearest.y > 80 // prefer above when there's space
            const top = above ? Math.round(nearest.y - nearest.r - 12) : Math.round(nearest.y + nearest.r + 12)
            bubble.style.left = `${cx}px`
            bubble.style.top = `${top}px`
            bubble.style.transform = above ? 'translate(-50%, -100%) scale(1)' : 'translate(-50%, 0) scale(1)'
            bubble.dataset.side = above ? 'above' : 'below'
            const textEl = bubble.querySelector('.bubble-text')
            if (textEl) textEl.textContent = nearest.label
            else bubble.textContent = nearest.label

            // style inner bubble (larger and liquid-glass in dark per request)
            const inner = bubble.querySelector('div')
            if (inner) {
              inner.style.padding = '10px 14px'
              inner.style.fontSize = '14px'
              inner.style.minWidth = '56px'
              inner.style.textAlign = 'center'
              inner.style.backdropFilter = 'blur(8px)'
              if (isDark) {
                // in dark, use white background and black text (liquid glass-like)
                inner.style.background = '#ffffff'
                inner.style.border = '1px solid rgba(0,0,0,0.06)'
                inner.style.color = '#000'
              } else {
                inner.style.background = 'rgba(255,255,255,0.92)'
                inner.style.border = '1px solid rgba(255,255,255,0.4)'
                inner.style.color = '#000'
              }
            }

            // position and color the tail so it points exactly to the particle
            const tail = bubble.querySelector('svg')
            if (tail) {
              const path = tail.querySelector('path')
              // place tail centered horizontally relative to bubble (bubble is centered at cx)
              tail.style.left = '50%'
              tail.style.transform = 'translateX(-50%)'
              if (bubble.dataset.side === 'above') {
                tail.style.bottom = '-6px'
                tail.style.top = 'auto'
              } else {
                tail.style.top = '-6px'
                tail.style.bottom = 'auto'
                tail.style.transform += ' translateY(0)'
              }
              if (path) {
                // tail: white in dark mode, black in light mode
                const fillColor = isDark ? '#ffffff' : '#000000'
                path.setAttribute('fill', fillColor)
              }
            }
          }
        } else {
          // no nearest particle -> hide bubble and resume
          hoveredRef.current = null
          if (bubble) {
            bubble.style.opacity = '0'
            bubble.style.transform = bubble.dataset.side === 'left'
              ? 'translate(-100%, -100%) scale(0.95)'
              : 'translate(0, -100%) scale(0.95)'
            setTimeout(() => {
              if (bubble) bubble.style.display = 'none'
            }, 180)
          }
          resumeAnimation()
        }
      }

      mouseLeaveHandler = () => {
        hoveredRef.current = null
        const bubble = bubbleRef.current
        if (bubble) {
          bubble.style.opacity = '0'
          bubble.style.transform = bubble.dataset.side === 'left'
            ? 'translate(-100%, -100%) scale(0.95)'
            : 'translate(0, -100%) scale(0.95)'
          setTimeout(() => { if (bubble) bubble.style.display = 'none' }, 180)
        }
        resumeAnimation()
      }

      canvas.addEventListener('mousemove', mouseMoveHandler)
      canvas.addEventListener('mouseleave', mouseLeaveHandler)
    }

    // cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect()
      else if (resizeFallbackRef.current) window.removeEventListener("resize", resizeFallbackRef.current)
      if (mouseMoveHandler) canvas.removeEventListener('mousemove', mouseMoveHandler)
      if (mouseLeaveHandler) canvas.removeEventListener('mouseleave', mouseLeaveHandler)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-auto"
        aria-hidden="true"
      />
      <div
        ref={bubbleRef}
        className="absolute z-30 pointer-events-none opacity-0"
        style={{ left: 0, top: 0, display: 'none', transform: 'translate(-50%, -100%) scale(0.95)', transition: 'opacity 180ms cubic-bezier(.2,.9,.2,1), transform 180ms cubic-bezier(.2,.9,.2,1)', transformOrigin: 'center bottom', overflow: 'visible' }}
      >
        <div className="relative rounded-lg px-3 py-2 text-sm font-semibold shadow-lg bg-white/60 dark:bg-gray-900/70 border border-white/30 dark:border-gray-700 backdrop-blur-md text-black dark:text-white" style={{ overflow: 'visible' }}>
          <span className="bubble-text">99</span>
        </div>
        {/* tail - moved outside inner box to avoid clipping */}
        <svg className="absolute text-black dark:text-white" style={{ bottom: -6, width: 14, height: 10, left: '50%', transform: 'translateX(-50%)' }} viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M0 0 L4 6 L8 0 Z" fill="currentColor" />
        </svg>
      </div>
    </>
  )
}
