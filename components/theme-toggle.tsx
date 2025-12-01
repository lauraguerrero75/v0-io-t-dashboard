"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const shouldBeDark = savedTheme === "dark"
    
    setIsDark(shouldBeDark)
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggle = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  if (!mounted) {
    return (
      <button className="relative w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
        <Sun className="w-5 h-5 text-amber-400" />
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      className="relative w-12 h-12 rounded-xl bg-slate-800/50 dark:bg-gray-800/70 hover:bg-slate-800/70 dark:hover:bg-gray-700/70 border border-slate-700/50 dark:border-gray-600/50 hover:border-emerald-500/50 dark:hover:border-gray-500/50 transition-all duration-300 flex items-center justify-center group"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 dark:from-gray-600/10 dark:to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {isDark ? (
        <Moon className="w-5 h-5 text-gray-300 relative z-10" />
      ) : (
        <Sun className="w-5 h-5 text-emerald-400 relative z-10" />
      )}
    </button>
  )
}
