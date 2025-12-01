import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Box, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PotreeViewer() {
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
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
          <Box className="mb-4 h-16 w-16 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">Visualizador Potree</h3>
          <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
            Esta sección está preparada para integrar el visualizador de nube de puntos 3D Potree. Conecta tu instancia
            de Potree aquí.
          </p>
          <Button variant="outline" className="gap-2 bg-transparent">
            <ExternalLink className="h-4 w-4" />
            Configurar Potree
          </Button>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
          <h4 className="mb-2 font-semibold">Instrucciones de Integración:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Sube tu nube de puntos al servidor</li>
            <li>• Configura la URL del visualizador Potree</li>
            <li>• Actualiza el iframe o componente en esta sección</li>
            <li>• Las coordenadas de las detecciones pueden sincronizarse con la vista 3D</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
