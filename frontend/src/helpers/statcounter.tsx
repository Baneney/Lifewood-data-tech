import { useEffect, useRef, useState } from "react"

interface StatCounterProps {
  value: number
  suffix: string
}

export default function StatCounter({ value, suffix }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let n = 0
        const step = Math.ceil(value / 60)
        const t = setInterval(() => {
          n += step
          if (n >= value) { setCount(value); clearInterval(t) }
          else setCount(n)
        }, 24)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{count}{suffix}</span>
}

