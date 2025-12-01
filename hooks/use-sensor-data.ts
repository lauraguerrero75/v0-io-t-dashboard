"use client"

import { useState, useEffect } from "react"

export interface Detection {
  x: number
  y: number
  timestamp: string
}

export interface SensorData {
  sensor_id: string
  person_count: number
  motion_detected: boolean
  timestamp: string
  detections: Detection[]
}

export function useSensorData(refreshInterval = 3000) {
  const [data, setData] = useState<SensorData | null>(null)
  const [history, setHistory] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sensor-data")
        if (!response.ok) {
          throw new Error("Failed to fetch sensor data")
        }
        const newData = await response.json()

        console.log("[v0] Sensor data fetched:", newData)

        setData(newData)

        setHistory((prev) => {
          const updated = [...prev, newData.person_count]
          return updated.slice(-20) // Keep only last 20 readings
        })

        setError(null)
      } catch (err) {
        console.error("[v0] Error fetching sensor data:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    // Fetch immediately
    fetchData()

    // Then set up interval
    const interval = setInterval(fetchData, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval])

  return { data, history, loading, error }
}
