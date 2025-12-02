"use client"

import { TrendingUp } from "lucide-react"
import { useSensorData } from "@/hooks/use-sensor-data"

type OccupancyChartProps = {
  history: number[]
}

export function OccupancyChart(props: OccupancyChartProps) {
  const { loading } = useSensorData()
  const {history} = props

  const historialData = history.length > 0 ? history : [0]

  if (loading && history.length === 0) {
    return (
      <div className="relative p-6 rounded-2xl overflow-hidden min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-cyan-900/40 to-slate-950/70"></div>
        <div className="relative z-10 text-slate-400">Cargando historial...</div>
      </div>
    )
  }

  return (
    <div className="relative p-4 md:p-6 rounded-2xl overflow-hidden">
      {/* Fondo con degradado verde-azul-gris */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-cyan-900/40 to-slate-950/70"></div>

      {/* Puntos de luz con diferentes tonalidades */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/25 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-teal-400/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-emerald-500/20 rounded-full blur-3xl"></div>

      {/* Borde con gradiente */}
      <div className="absolute inset-0 rounded-2xl border border-slate-700/50"></div>

      {/* Contenido */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Historial de Ocupación
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Últimos {historialData.length} registros de detección de personas
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between h-40 md:h-48 gap-1 md:gap-2">
          {historialData.map((value, index) => {
            const maxValue = Math.max(...historialData, 1)
            const height = (value / maxValue) * 100
            

            return (
              <div key={index} className="flex-1 flex flex-col items-center justify-end group" style={{ height: `${height}%`, minHeight: "4px" }}>
                  <span>
                    {value}
                  </span><div
                  className="w-full rounded-t-xl relative overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{ height: `${height}%`, minHeight: "4px" }}
                >
                  {/* Gradiente de la barra con tonalidades verdes-azules */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-600 via-teal-500 to-cyan-400"></div>

                  {/* Brillo superior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30"></div>

                  {/* Punto brillante en la cima */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-lg shadow-cyan-300/60 opacity-90 group-hover:opacity-100 transition-opacity"></div>

                  {/* Resplandor al hover */}
                  <div className="absolute inset-0 bg-emerald-300/0 group-hover:bg-emerald-300/10 transition-all duration-300"></div>
                </div>

                {/* Reflejo en la base */}
                <div className="w-full h-1 bg-gradient-to-t from-emerald-500/30 to-transparent rounded-b-lg mt-0.5"></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
