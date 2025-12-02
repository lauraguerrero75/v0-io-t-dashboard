import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Box, ExternalLink, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function PotreeViewer() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const potreeUrl = "http://ec2-18-207-255-232.compute-1.amazonaws.com:8001/comunicaciones.html" // Reemplaza con tu IP pública

  const toggleFullscreen = () => {
    const iframe = document.getElementById('potree-iframe')
    if (!document.fullscreenElement) {
      iframe?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Box className="h-5 w-5" />
          Visualizador Potree
        </CardTitle>
        <CardDescription>Nube de puntos 3D del espacio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-lg border border-border bg-black">
          {/* Controles superiores */}
          <div className="absolute right-2 top-2 z-10 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={toggleFullscreen}
              className="gap-2"
            >
              <Maximize2 className="h-4 w-4" />
              Pantalla completa
            </Button>
            <Button
              size="sm"
              variant="secondary"
              asChild
            >
              <a href={potreeUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Abrir en nueva pestaña
              </a>
            </Button>
          </div>

          {/* Iframe de Potree */}
          <iframe
            id="potree-iframe"
            src={potreeUrl}
            className="h-[600px] w-full"
            style={{ border: 'none' }}
            title="Visualizador Potree 3D"
            allow="fullscreen"
          />
        </div>

        {/* Información adicional */}
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
          <h4 className="mb-2 font-semibold">Controles de navegación:</h4>
          <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <div>
              <strong>Click izquierdo + arrastrar:</strong> Rotar vista
            </div>
            <div>
              <strong>Click derecho + arrastrar:</strong> Mover cámara
            </div>
            <div>
              <strong>Scroll:</strong> Zoom in/out
            </div>
            <div>
              <strong>Click medio + arrastrar:</strong> Pan
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}