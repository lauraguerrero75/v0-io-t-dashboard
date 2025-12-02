"use client"

import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SystemInfo } from "@/components/system-info"
import { GradientCard } from "@/components/gradient-card"
import { OccupancyChart } from "@/components/occupancy-chart"
import { RoomVisualization } from "@/components/room-visualization"
import { PotreeViewer } from "@/components/potree-viewer"
import { Activity, Users, Wifi, Database, Clock, Box, Menu, X } from "lucide-react"

type Sensor = {
  id: string
  status: string
  detections: number
  battery: number
}

export default function DashboardPage() {
  const [isConnected, setConnected] = useState(false)
  const [sensorIds, setSensorIds] = useState<string[]>([])
  const [base64Image, setBase64Image] = useState<string>("")
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [totalRegisters, setTotalRegisters] = useState<number>(0)
  const [lastDetected, setLastDetected] = useState<number>(0)
  const [lastDetectedSensor, setLastDetectedSensor] = useState<string>("")
  const [totalDetected, setTotalDetected] = useState<number>(0)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [data, setData] = useState<any[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Connect to WebSocket
    const websocket = new WebSocket('wss://iotws.sandbox.portillonino.dev');
    
    websocket.onopen = () => {
      setConnected(true);
      console.log('WebSocket Connected');
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received:', message);

      const messageData = JSON.parse(message.data.y)
      if (messageData.type === 'sensor') {
        const sensorId = messageData.id;
        setLastDetectedSensor(sensorId);
        setLastDetected(Number(message.data.x));
        if(sensorIds.includes(sensorId)){
          const sensorIndex = sensors.findIndex(item => item.id === sensorId);
          if(sensorIndex > -1) {
            sensors[sensorIndex] = { id: sensorId, status: 'online', detections: Number(message.data.x), battery: 100 };
          }
        }
        else {
          sensorIds.push(sensorId);
          const newSensor: Sensor = { id: sensorId, status: 'online', detections: Number(message.data.x), battery: 100 };
          sensors.push(newSensor);
        }
  
        let detected = 0;
        sensors.map(sensor => {
          detected += sensor.detections;
        });
        setTotalDetected(detected);
      }

      if (messageData.type === 'base64') {
        setBase64Image(`data:image/png;base64,${message.data.x}`);
      }

      if (message.type === 'INSERT') {
        setData(prev => [...prev, message.data]);
      } else if (message.type === 'MODIFY') {
        setData(prev => prev.map(item => 
          item.id === message.data.id ? message.data : item
        ));
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "sensores", label: "Sensores", icon: Wifi },
    { id: "historial", label: "Historial", icon: Clock },
    { id: "potree", label: "Potree 3D", icon: Box },
  ]

  return (
    <div className="min-h-screen text-white dark:text-gray-100 flex relative overflow-hidden">
      {/* MODO CLARO - Fondo con tonos verdes/teal/cyan */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950 dark:from-gray-950 dark:via-gray-900 dark:to-black"></div>

      {/* Segunda capa de degradado */}
      <div className="fixed inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-teal-950/30 dark:from-gray-900/60 dark:via-transparent dark:to-gray-950/50"></div>

      {/* Tercera capa con variaciones */}
      <div className="fixed inset-0 bg-gradient-to-bl from-transparent via-slate-900/50 to-emerald-950/40 dark:from-transparent dark:via-gray-950/40 dark:to-gray-950/60"></div>

      {/* Puntos de luz - MODO CLARO (verde) / MODO OSCURO (gris) */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-gray-700/15 rounded-full blur-3xl"></div>
      <div className="fixed top-1/4 right-0 w-80 h-80 bg-teal-500/15 dark:bg-gray-600/20 rounded-full blur-3xl"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-gray-700/12 rounded-full blur-3xl"></div>
      <div className="fixed bottom-1/4 right-1/4 w-72 h-72 bg-emerald-600/12 dark:bg-gray-600/18 rounded-full blur-3xl"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/8 dark:bg-gray-500/10 rounded-full blur-3xl"></div>

      {/* Puntos más oscuros para contraste */}
      <div className="fixed top-1/3 right-1/3 w-64 h-64 bg-slate-950/80 dark:bg-black/90 rounded-full blur-2xl"></div>
      <div className="fixed bottom-1/3 left-1/3 w-72 h-72 bg-slate-950/70 dark:bg-black/80 rounded-full blur-2xl"></div>

      {/* Puntos de luz más intensos */}
      <div className="fixed top-20 right-1/3 w-40 h-40 bg-emerald-400/20 dark:bg-gray-500/25 rounded-full blur-2xl"></div>
      <div className="fixed bottom-20 left-1/4 w-48 h-48 bg-cyan-400/18 dark:bg-gray-600/22 rounded-full blur-2xl"></div>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 dark:from-gray-600 dark:via-gray-500 dark:to-gray-700 flex items-center justify-center shadow-lg"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:relative w-72 h-full border-r border-slate-800/50 dark:border-gray-800/60 p-6 flex flex-col z-40 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Fondo del sidebar con blur */}
        <div className="absolute inset-0 bg-slate-950/60 dark:bg-gray-950/80 backdrop-blur-xl"></div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 dark:from-gray-600 dark:via-gray-500 dark:to-gray-700 flex items-center justify-center shadow-lg shadow-emerald-500/50 dark:shadow-gray-700/50">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
                Dashboard IoT
              </h2>
              <p className="text-xs text-slate-400 dark:text-gray-500">Bloque E</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500/20 via-teal-600/15 to-cyan-600/20 dark:from-gray-700/40 dark:via-gray-600/30 dark:to-gray-700/40 border border-emerald-500/50 dark:border-gray-600/50 shadow-lg shadow-emerald-500/20 dark:shadow-gray-700/30"
                      : "hover:bg-slate-800/50 dark:hover:bg-gray-800/50 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 dark:from-gray-600 dark:via-gray-500 dark:to-gray-700 shadow-md shadow-emerald-500/40 dark:shadow-gray-600/40"
                        : "bg-slate-800/50 dark:bg-gray-800/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`font-medium ${isActive ? "text-white dark:text-gray-200" : "text-slate-400 dark:text-gray-500"}`}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="flex items-center gap-3 mt-6 p-3 rounded-xl bg-slate-800/50 dark:bg-gray-800/50 border border-slate-700/50 dark:border-gray-700/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 dark:from-gray-500 dark:via-gray-400 dark:to-gray-600 border-2 border-slate-700 dark:border-gray-700"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-slate-400 dark:text-gray-500">Sistema IoT</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative flex-1 p-4 md:p-8 overflow-y-auto z-10 pt-20 lg:pt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <SystemInfo />
          <ThemeToggle />
        </div>

        {/* Dashboard View */}
        {activeTab === "dashboard" && (
          <>
            {/* Alert Banner */}
            <div className="relative mb-8 p-6 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-teal-900/35 to-cyan-950/40 dark:from-gray-800/60 dark:via-gray-700/50 dark:to-gray-800/60"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/30 dark:bg-gray-600/40 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/30 dark:bg-gray-600/35 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 rounded-2xl border border-emerald-500/30 dark:border-gray-600/40"></div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 dark:from-gray-600 dark:via-gray-500 dark:to-gray-700 flex items-center justify-center shadow-lg shadow-emerald-500/60 dark:shadow-gray-600/50">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
                    Movimiento Detectado
                  </h3>
                  <p className="text-slate-300 dark:text-gray-400 mt-1">
                    Hay <span className="font-bold text-2xl text-white dark:text-gray-200">{totalDetected}</span>{" "}
                    personas en el salón en este momento.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              <GradientCard
                icon={<Users className="w-5 h-5" />}
                title="Personas Detectadas"
                value={lastDetected}
                subtitle={`por el sensor ${lastDetectedSensor} ahora`}
              />

              <GradientCard
                icon={<Activity className="w-5 h-5" />}
                title="Detección de Movimiento"
                value={isConnected ? "Activo" : "Inactivo"}
                subtitle="Movimiento detectado"
              />

              <GradientCard
                icon={<Wifi className="w-5 h-5" />}
                title="Sensor ID"
                value={lastDetectedSensor}
                subtitle={lastDetectedSensor ? "En línea" : ""}
                showPulse
              />

              <GradientCard
                icon={<Database className="w-5 h-5" />}
                title="Total de Registros"
                value={data.length}
                subtitle="datos recibidos"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
              <OccupancyChart />
              <img src={base64Image} alt="Base64 Image" />
              
            </div>
          </>
        )}

        {/* Sensores View */}
        {activeTab === "sensores" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
                Sensores
              </h1>
              <p className="text-slate-400 dark:text-gray-500 mt-1">Estado y configuración de sensores IoT</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {sensors.map((sensor) => (
                <div key={sensor.id} className="relative p-6 rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-cyan-900/40 to-slate-950/70 dark:from-gray-950/60 dark:via-gray-800/50 dark:to-gray-950/80"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/25 dark:bg-gray-600/30 rounded-full blur-3xl group-hover:bg-emerald-500/35 dark:group-hover:bg-gray-600/40 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-cyan-500/20 dark:bg-gray-600/25 rounded-full blur-3xl group-hover:bg-cyan-500/30 dark:group-hover:bg-gray-600/35 transition-all duration-500"></div>
                  <div className="absolute inset-0 rounded-2xl border border-slate-700/50 dark:border-gray-700/50 group-hover:border-emerald-500/50 dark:group-hover:border-gray-600/50 transition-all duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 dark:from-gray-600 dark:via-gray-500 dark:to-gray-700 flex items-center justify-center shadow-lg shadow-emerald-500/50 dark:shadow-gray-600/40">
                          <Wifi className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white dark:text-gray-200">Sensor_{sensor.id}</h3>
                          <p className="text-xs text-slate-400 dark:text-gray-500">PIR Motion Sensor</p>
                        </div>
                      </div>
                      <div
                        className={`relative px-3 py-1 rounded-lg overflow-hidden ${
                          sensor.status === "online"
                            ? "border border-emerald-500/50 dark:border-gray-500/50"
                            : "border border-slate-600/50 dark:border-gray-700/50"
                        }`}
                      >
                        {sensor.status === "online" && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 dark:from-gray-600/20 dark:to-gray-500/20"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-400/20 dark:bg-gray-500/20 rounded-full blur-lg"></div>
                          </>
                        )}
                        <div className="relative flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              sensor.status === "online"
                                ? "bg-emerald-400 dark:bg-gray-400 animate-pulse shadow-lg shadow-emerald-400/60 dark:shadow-gray-400/60"
                                : "bg-slate-500 dark:bg-gray-600"
                            }`}
                          ></div>
                          <span
                            className={`text-xs font-medium ${
                              sensor.status === "online"
                                ? "text-emerald-300 dark:text-gray-300"
                                : "text-slate-400 dark:text-gray-600"
                            }`}
                          >
                            {sensor.status === "online" ? "En línea" : "Desconectado"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400 dark:text-gray-500">Detecciones</span>
                        <span className="text-lg font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
                          {sensor.detections}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400 dark:text-gray-500">Batería</span>
                        <span className="text-lg font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
                          {sensor.battery}%
                        </span>
                      </div>
                      <div className="relative w-full h-2 bg-slate-800/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/30 to-slate-800/30 dark:from-gray-700/30 dark:to-gray-800/30"></div>
                        <div
                          className="relative h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 dark:from-gray-500 dark:via-gray-400 dark:to-gray-600 rounded-full shadow-lg shadow-emerald-500/50 dark:shadow-gray-500/40 transition-all duration-500"
                          style={{ width: `${sensor.battery}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historial View */}
        {activeTab === "historial" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
                Historial
              </h1>
              <p className="text-slate-400 dark:text-gray-500 mt-1">Registro de actividad y detecciones</p>
            </div>

            <OccupancyChart />
          </div>
        )}

        {/* Potree 3D View */}
        {activeTab === "potree" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
                Visualización 3D
              </h1>
              <p className="text-slate-400 dark:text-gray-500 mt-1">Modelo 3D del espacio - Potree Viewer</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-700/50 dark:border-gray-700/50 shadow-2xl">
              <PotreeViewer />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
