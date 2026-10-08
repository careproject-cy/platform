"use client"

import { useEffect, useRef, useState } from "react"

// Content stays visible without JS and for reduced motion; only below-the-fold blocks start hidden.
export default function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<"idle" | "out" | "in">("idle")

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setState("in"); io.disconnect() }
      else setState(s => (s === "idle" ? "out" : s))
    }, { rootMargin: "0px 0px -10% 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} data-reveal={state} className={className} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  )
}
