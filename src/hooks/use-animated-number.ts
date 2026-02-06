'use client'

import { useState, useEffect, useRef } from 'react'

export function useAnimatedNumber(target: number, duration = 400): number {
  const [current, setCurrent] = useState(target)
  const prevRef = useRef(target)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const from = prevRef.current
    const to = target
    prevRef.current = target

    if (from === to) return

    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(from + (to - from) * eased)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration])

  return current
}
