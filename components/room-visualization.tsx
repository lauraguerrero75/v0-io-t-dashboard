"use client"

import { MapPin, Zap, Users } from "lucide-react"
import { useSensorData } from "@/hooks/use-sensor-data"

interface Detection {
  x: number
  y: number
  id: number
}

export function RoomVisualization() {
  const { data, loading, error } = useSensorData()

  // Convert API detections to display format with IDs
  const detections: Detection[] =
    data?.detections?.map((det, idx) => ({
      x: (det.x / 10) * 100, // Convert 0-10 range to 0-100 percentage
      y: (det.y / 10) * 100,
      id: idx + 1,
    })) || []

  const personCount = data?.person_count || 0
  const sensorId = data?.sensor_id || "Sensor_E01"
  const isActive = data?.motion_detected || false

  // Zonas del mapa
  const zones = [
    { name: "Entrada", x: 10, y: 15, color: "from-blue-500/30 to-blue-600/20" },
    { name: "Área Principal", x: 50, y: 50, color: "from-emerald-500/30 to-teal-600/20" },
    { name: "Salida", x: 85, y: 80, color: "from-purple-500/30 to-purple-600/20" },
  ]

  if (loading && !data) {
    return (
      <div className="relative p-6 rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-950"></div>
        <div className="relative z-10 text-slate-400">Cargando datos del sensor...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative p-6 rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-950/60 to-slate-950"></div>
        <div className="relative z-10 text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="relative p-6 rounded-2xl overflow-hidden">
      {/* Fondo principal con degradado elegante de tonos variados */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-950"></div>

      {/* Capa secundaria de degradado para más profundidad */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-teal-950/30"></div>

      {/* Puntos de luz distribuidos */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-0 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-36 h-36 bg-cyan-500/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-teal-400/10 rounded-full blur-3xl"></div>

      {/* Puntos más oscuros para contraste */}
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-slate-950/80 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-slate-950/70 rounded-full blur-2xl"></div>

      {/* Borde con gradiente */}
      <div className="absolute inset-0 rounded-2xl border border-slate-700/50"></div>

      {/* Contenido */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Vista del Salón
            </h3>
            <p className="text-sm text-slate-400">Posiciones detectadas en tiempo real</p>
          </div>
          <div className="relative px-3 py-1 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-cyan-500/20"></div>
            <div className="absolute inset-0 rounded-lg border border-emerald-500/50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-400/20 rounded-full blur-lg"></div>
            <div className="relative flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-medium text-emerald-300">{personCount} personas</span>
            </div>
          </div>
        </div>

        {/* Mapa del salón */}
        <div className="relative h-80 rounded-xl overflow-hidden">
          {/* Fondo principal con degradado tipo mapa - tonos variados */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-emerald-950/40 to-slate-950/95"></div>

          {/* Segunda capa de degradado para profundidad */}
          <div className="absolute inset-0 bg-gradient-to-tl from-cyan-950/30 via-transparent to-teal-950/40"></div>

          {/* Capa de textura tipo mapa con grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                   linear-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
                 `,
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* Grid más fino para detalle */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                   linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                 `,
              backgroundSize: "10px 10px",
            }}
          ></div>

          {/* Puntos de luz ambiental dentro del mapa */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-emerald-500/15 via-emerald-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-radial from-cyan-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-gradient-radial from-teal-400/12 via-teal-400/3 to-transparent rounded-full blur-3xl"></div>

          {/* Áreas más oscuras para contraste */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-slate-950/60 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-slate-950/50 rounded-full blur-2xl"></div>

          {/* Zonas del mapa */}
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className="absolute transition-all duration-300 hover:scale-110"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${zone.color} backdrop-blur-sm border border-white/10`}
              >
                <span className="text-xs font-medium text-white/80">{zone.name}</span>
              </div>
            </div>
          ))}

          {/* Borde interno del mapa */}
          <div className="absolute inset-4 rounded-lg border-2 border-slate-700/30 border-dashed"></div>

          {detections.map((detection) => (
            <div
              key={detection.id}
              className="absolute"
              style={{
                left: `${detection.x}%`,
                top: `${detection.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                {/* Círculo de detección amplio */}
                <div className="absolute inset-0 w-20 h-20 -ml-10 -mt-10 bg-gradient-to-br from-emerald-400/40 to-cyan-500/40 rounded-full blur-xl animate-pulse"></div>

                {/* Círculo principal de la persona */}
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 border-3 border-white shadow-2xl shadow-emerald-500/80">
                  {/* Brillo superior */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-white/20 to-transparent"></div>

                  {/* Icono de persona */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>

                  {/* Número de identificación */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-white shadow-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{detection.id}</span>
                  </div>
                </div>

                {/* Ondas expansivas */}
                <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-emerald-400/60 animate-ping"></div>
                <div
                  className="absolute inset-0 w-12 h-12 rounded-full border-2 border-cyan-400/40 animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>

                {/* Etiqueta de información */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="relative px-3 py-1.5 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 rounded-lg border border-emerald-500/30"></div>
                    <div className="relative text-xs font-medium text-emerald-300">Persona #{detection.id}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute top-4 left-4">
            <div className="relative px-4 py-2 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 via-emerald-600/30 to-cyan-600/30 backdrop-blur-sm"></div>
              <div className="absolute inset-0 rounded-lg border border-teal-500/50"></div>
              <div className="absolute top-0 right-0 w-10 h-10 bg-emerald-400/25 rounded-full blur-xl"></div>

              <div className="relative flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-medium text-emerald-200">{sensorId}</span>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/70"></div>
                )}
              </div>
            </div>
          </div>

          {/* Coordenadas en las esquinas */}
          <div className="absolute top-2 left-2 text-xs font-mono text-slate-500">(0,0)</div>
          <div className="absolute top-2 right-2 text-xs font-mono text-slate-500">(10,0)</div>
          <div className="absolute bottom-2 left-2 text-xs font-mono text-slate-500">(0,10)</div>
          <div className="absolute bottom-2 right-2 text-xs font-mono text-slate-500">(10,10)</div>
        </div>

        {/* Información adicional debajo del mapa */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="relative px-3 py-2 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 rounded-lg border border-emerald-500/30"></div>
            <div className="relative text-center">
              <p className="text-xs text-slate-400">Área Total</p>
              <p className="text-lg font-bold text-emerald-300">100m²</p>
            </div>
          </div>

          <div className="relative px-3 py-2 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 rounded-lg border border-cyan-500/30"></div>
            <div className="relative text-center">
              <p className="text-xs text-slate-400">Ocupación</p>
              <p className="text-lg font-bold text-cyan-300">{personCount * 10}%</p>
            </div>
          </div>

          <div className="relative px-3 py-2 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 rounded-lg border border-teal-500/30"></div>
            <div className="relative text-center">
              <p className="text-xs text-slate-400">Personas Activas</p>
              <p className="text-lg font-bold text-teal-300">{personCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
