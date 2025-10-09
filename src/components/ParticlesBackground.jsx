import React, { useEffect, useRef, useState } from "react"
import { createPortal } from 'react-dom'
import Bubble from './Bubble.jsx'

export default function ParticlesBackground() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([]) // persist particles across frames
  const resizeObserverRef = useRef(null)
  const resizeFallbackRef = useRef(null)
  const bubbleRef = useRef(null)
  const [bubbleState, setBubbleState] = useState({ visible: false, left: 0, top: 0, side: 'above', username: '', kind: '', attempts: 0 })
  const hoveredRef = useRef(null)
  const pauseMotionRef = useRef(false)

  // helper: create one particle inside width/height
  const USERNAMES = [
    'Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Avery', 'Jamie', 'Drew',
    'Harper', 'Quinn', 'Rowan', 'Parker', 'Reese', 'Skyler', 'Blake', 'Devon', 'Finley', 'Elliot'
  ]

  // kinds: 'red' (out of attempts), 'green' (x attempts available), 'white' (non interactive)
  const createParticle = (w, h) => {
  // choose kind probabilities: make red/green more common so more interactivity
  const r = Math.random()
  let kind = 'white'
  // new distribution: red ~20%, green ~30%, white ~50%
  if (r < 0.20) kind = 'red'
  else if (r < 0.50) kind = 'green'

    const username = USERNAMES[Math.floor(Math.random() * USERNAMES.length)]
    const attempts = kind === 'green' ? Math.max(1, Math.ceil(Math.random() * 8)) : 0

    return {
      x: Math.random() * w,
      y: Math.random() * h,
      // keep original small particle sizes
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      // per-particle metadata
      username,
      kind,
      attempts,
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // create a portal root element appended to document.body so the bubble won't be clipped
    let portalRoot = null
    try {
      portalRoot = document.createElement('div')
      // keep it unstyled here; bubble element inside will be positioned absolutely
      portalRoot.className = 'particles-bubble-root'
      document.body.appendChild(portalRoot)
      bubbleRef.current = portalRoot
    } catch (e) {
      portalRoot = null
      bubbleRef.current = null
    }

    // expose portal root to render via React Portal
    // use a state setter outside the effect to avoid re-render complexity; but we can keep a ref
    // we'll set a property on canvas to allow rendering below (see return)
    // store as a data attribute on canvas for read in render (not ideal but keeps changes minimal)
    if (portalRoot && canvas) canvas.dataset.portalroot = '1'

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

        // color per particle based on kind
        let pFill
        if (p.kind === 'red') {
          pFill = isDark ? 'rgba(239,68,68,0.95)' : 'rgba(239,68,68,0.9)'
        } else if (p.kind === 'green') {
          pFill = isDark ? 'rgba(34,197,94,0.95)' : 'rgba(34,197,94,0.9)'
        } else {
          pFill = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)'
        }

        // if hovered, draw glow + scaled dot for feedback
        const isHovered = hoveredRef.current === p
        if (isHovered) {
          ctx.save()
          ctx.shadowBlur = 12
          // shadow color follows kind
          ctx.shadowColor = p.kind === 'red' ? 'rgba(239,68,68,0.95)' : (p.kind === 'green' ? 'rgba(34,197,94,0.95)' : (isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.25)'))
          ctx.fillStyle = pFill
          ctx.beginPath()
          ctx.arc(p.x, p.y, Math.max(2.8, p.r * 1.6), 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        // base draw (small dot)
        const isBaseColored = p.kind === 'red' || p.kind === 'green'
        // if not hovered, draw a subtle colored glow for active kinds
        if (isBaseColored && !isHovered) {
          ctx.save()
          ctx.shadowBlur = 8
          ctx.shadowColor = p.kind === 'red' ? 'rgba(239,68,68,0.22)' : 'rgba(34,197,94,0.22)'
          ctx.fillStyle = pFill
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        } else {
          ctx.fillStyle = pFill
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
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
  const threshold = 40 // px - how close the mouse must be to a particle (increased for easier hover)

      mouseMoveHandler = (ev) => {
        const rect = canvas.getBoundingClientRect()
        const mx = ev.clientX - rect.left
        const my = ev.clientY - rect.top

        // find nearest particle within threshold
        // only consider interactive particles (red/green) when finding nearest
        const parts = particlesRef.current.filter(p => p.kind === 'red' || p.kind === 'green')
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

  // only allow hover interaction for red/green kinds
        if (nearest && (nearest.kind === 'red' || nearest.kind === 'green') && Math.sqrt(nearestDist) <= threshold) {
          // hover over a particle
          hoveredRef.current = nearest
          pauseAnimation()

          // compute viewport coordinates for portal placement
          const cxLocal = Math.max(12, Math.min(rect.width - 12, Math.round(nearest.x)))
          const above = nearest.y > 80 // prefer above when there's space
          const topLocal = above ? Math.round(nearest.y - nearest.r - 12) : Math.round(nearest.y + nearest.r + 12)
          const pageLeft = Math.round(rect.left + cxLocal)
          const pageTop = Math.round(rect.top + topLocal)

          // set bubble state (React-driven portal will render it)
          setBubbleState({
            visible: true,
            left: pageLeft,
            top: pageTop,
            side: above ? 'above' : 'below',
            username: nearest.username,
            kind: nearest.kind,
            attempts: nearest.attempts,
          })
        } else {
          // no nearest particle -> hide bubble and resume
          hoveredRef.current = null
          // hide via React state
          setBubbleState(prev => ({ ...prev, visible: false }))
          resumeAnimation()
        }
      }

      mouseLeaveHandler = () => {
        hoveredRef.current = null
        // hide via React state
        setBubbleState(prev => ({ ...prev, visible: false }))
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
      // remove bubble portal element
      if (bubbleRef.current && bubbleRef.current.parentNode) {
        bubbleRef.current.parentNode.removeChild(bubbleRef.current)
        bubbleRef.current = null
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-auto"
        aria-hidden="true"
      />
      {/* bubble is rendered below via React Portal (attached to document.body) */}
      {canvasRef.current && canvasRef.current.dataset.portalroot === '1' && createPortal(
        <Bubble
          visible={bubbleState.visible}
          left={bubbleState.left}
          top={bubbleState.top}
          side={bubbleState.side}
          username={bubbleState.username}
          kind={bubbleState.kind}
          attempts={bubbleState.attempts}
        />,
        // portal target
        bubbleRef.current
      )}
    </>
  )
}
