"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface StatProps {
  label: string
  value: number
  suffix?: string
  duration?: number
}

const Stat: React.FC<StatProps> = ({ label, value, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null
      const animateCount = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        setCount(Math.floor(progress * value))
        if (progress < 1) {
          requestAnimationFrame(animateCount)
        }
      }
      requestAnimationFrame(animateCount)
    }
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-extrabold text-custom-red mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-lg md:text-xl text-gray-700">{label}</p>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Our Achievements</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat label="Branches" value={10} />
          <Stat label="Professionals" value={100} suffix="+" />
          <Stat label="Projects" value={500} />
          <Stat label="Happy Students" value={10000} suffix="+" />
        </div>
      </div>
    </section>
  )
}
