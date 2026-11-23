import { useEffect, useRef } from 'react'

// Stained-tissue field (Masson's trichrome look) with a scan line that
// reveals instance masks. Drawn procedurally, so no image assets are needed.

const CLS = {
  tub: '#e8453c',
  atr: '#f39a2b',
  glom: '#7fd17a',
  ves: '#2b5fd9',
}

export const LEGEND = [
  { label: 'tubule', color: CLS.tub },
  { label: 'atrophic tubule', color: CLS.atr },
  { label: 'glomerulus', color: CLS.glom },
  { label: 'vessel', color: CLS.ves },
]

function ell(g, rx, ry) {
  g.beginPath()
  g.ellipse(0, 0, Math.max(rx, 1), Math.max(ry, 1), 0, 0, Math.PI * 2)
}

export default function TissueCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, dpr = 1, objs = [], bg = null, raf = 0, resizeTimer = 0

    let seed = 7
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647

    function build() {
      seed = 7
      objs = []
      const target = Math.round((W * H) / 5200)
      const m = Math.min(W, H)
      const placed = []
      const big = [
        { k: 'glom', x: W * 0.68, y: H * 0.3, r: m * 0.12 },
        { k: 'glom', x: W * 0.26, y: H * 0.72, r: m * 0.1 },
        { k: 'ves', x: W * 0.82, y: H * 0.78, r: m * 0.07 },
      ]
      big.forEach((b) => {
        objs.push({ ...b, rx: b.r, ry: b.r * 0.92, rot: rnd() * 3 })
        placed.push(b)
      })
      let tries = 0
      while (objs.length < target && tries < 4000) {
        tries++
        const r = m * (0.035 + rnd() * 0.035)
        const x = r + rnd() * (W - 2 * r)
        const y = r + rnd() * (H - 2 * r)
        if (placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.r + r + 4)) continue
        const atr = rnd() < 0.22
        objs.push({ k: atr ? 'atr' : 'tub', x, y, r, rx: r * (0.8 + rnd() * 0.4), ry: r * (0.6 + rnd() * 0.35), rot: rnd() * Math.PI })
        placed.push({ x, y, r })
      }

      bg = document.createElement('canvas')
      bg.width = W * dpr
      bg.height = H * dpr
      const g = bg.getContext('2d')
      g.scale(dpr, dpr)
      g.fillStyle = '#eef0f2'
      g.fillRect(0, 0, W, H)
      for (let i = 0; i < 90; i++) {
        const x = rnd() * W, y = rnd() * H, r = 20 + rnd() * 90
        const gr = g.createRadialGradient(x, y, 0, x, y, r)
        gr.addColorStop(0, 'rgba(70,130,175,0.22)')
        gr.addColorStop(1, 'rgba(70,130,175,0)')
        g.fillStyle = gr
        g.beginPath(); g.arc(x, y, r, 0, 7); g.fill()
      }
      g.strokeStyle = 'rgba(60,115,160,0.25)'
      g.lineWidth = 1
      for (let i = 0; i < 160; i++) {
        const x = rnd() * W, y = rnd() * H, a = rnd() * Math.PI, l = 20 + rnd() * 60
        g.beginPath(); g.moveTo(x, y)
        g.quadraticCurveTo(x + (Math.cos(a + 0.6) * l) / 2, y + (Math.sin(a + 0.6) * l) / 2, x + Math.cos(a) * l, y + Math.sin(a) * l)
        g.stroke()
      }
      objs.forEach((o) => {
        g.save(); g.translate(o.x, o.y); g.rotate(o.rot)
        if (o.k === 'glom') {
          g.fillStyle = 'rgba(255,255,255,0.85)'; ell(g, o.rx * 1.08, o.ry * 1.08); g.fill()
          g.strokeStyle = 'rgba(60,115,160,0.6)'; g.lineWidth = 2; ell(g, o.rx * 1.08, o.ry * 1.08); g.stroke()
          g.fillStyle = '#c2506b'; ell(g, o.rx * 0.92, o.ry * 0.9); g.fill()
          for (let i = 0; i < 70; i++) {
            const a = rnd() * 7, d = rnd() * o.rx * 0.85
            g.fillStyle = 'rgba(70,30,80,0.55)'
            g.beginPath(); g.arc(Math.cos(a) * d, Math.sin(a) * d * 0.9, 1.6 + rnd() * 1.6, 0, 7); g.fill()
          }
        } else if (o.k === 'ves') {
          g.fillStyle = '#b8405c'; ell(g, o.rx, o.ry); g.fill()
          g.fillStyle = '#f4ecee'; ell(g, o.rx * 0.5, o.ry * 0.45); g.fill()
        } else {
          const atr = o.k === 'atr'
          g.fillStyle = atr ? '#c9879a' : '#c8455f'; ell(g, o.rx, o.ry); g.fill()
          g.fillStyle = '#f6eef0'; ell(g, o.rx * (atr ? 0.25 : 0.42), o.ry * (atr ? 0.2 : 0.38)); g.fill()
          if (atr) { g.strokeStyle = 'rgba(50,110,155,0.75)'; g.lineWidth = 3; ell(g, o.rx * 1.05, o.ry * 1.05); g.stroke() }
          for (let i = 0; i < 10; i++) {
            const a = (i / 10) * Math.PI * 2
            g.fillStyle = 'rgba(60,25,70,0.6)'
            g.beginPath(); g.arc(Math.cos(a) * o.rx * 0.7, Math.sin(a) * o.ry * 0.7, 1.6, 0, 7); g.fill()
          }
        }
        g.restore()
      })
    }

    function draw(scan) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(bg, 0, 0, W, H)
      ctx.save()
      ctx.beginPath(); ctx.rect(scan, 0, W - scan, H); ctx.clip()
      ctx.fillStyle = 'rgba(20,25,30,0.18)'
      ctx.fillRect(scan, 0, W - scan, H)
      objs.forEach((o) => {
        const c = CLS[o.k], s = o.k === 'glom' ? 1.1 : 1.04
        ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.rot)
        ctx.fillStyle = c + '55'; ell(ctx, o.rx * s, o.ry * s); ctx.fill()
        ctx.strokeStyle = c; ctx.lineWidth = 2; ell(ctx, o.rx * s, o.ry * s); ctx.stroke()
        ctx.restore()
      })
      ctx.restore()
      ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.fillRect(scan - 1, 0, 2, H)
      ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(scan - 10, 0, 20, H)
    }

    function size() {
      const r = cv.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = Math.max(1, r.width)
      H = Math.max(1, r.height)
      cv.width = W * dpr
      cv.height = H * dpr
      build()
      if (reduce) draw(W * 0.5)
    }

    const t0 = performance.now()
    function loop(t) {
      const p = ((t - t0) / 9000) % 1
      const e = 0.5 - 0.5 * Math.cos(p * Math.PI * 2)
      draw(W * (0.12 + 0.76 * e))
      raf = requestAnimationFrame(loop)
    }

    size()
    if (!reduce) raf = requestAnimationFrame(loop)
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(size, 120) }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} />
}
