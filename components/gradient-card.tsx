import React from 'react'; 

 

interface GradientCardProps { 

  icon: React.ReactNode; 

  title: string; 

  value: string | number; 

  subtitle: string; 

  showPulse?: boolean; 

} 

 

export function GradientCard({  

  icon,  

  title,  

  value,  

  subtitle,  

  showPulse = false  

}: GradientCardProps) { 

  return ( 

    <div className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"> 

      {/* Fondo con degradado - MODO CLARO (verde) / MODO OSCURO (gris) */} 

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-cyan-900/40 to-slate-950/70 dark:from-gray-900/60 dark:via-gray-800/50 dark:to-gray-950/80"></div> 

       

      {/* Puntos de luz animados */} 

      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/25 dark:bg-gray-600/30 rounded-full blur-3xl group-hover:bg-emerald-400/35 dark:group-hover:bg-gray-600/40 transition-all duration-500"></div> 

 

      {/* Borde con gradiente */} 

      <div className="absolute inset-0 rounded-2xl border border-slate-700/50 dark:border-gray-700/50 group-hover:border-emerald-500/50 dark:group-hover:border-gray-600/50 transition-all duration-300"></div> 

       

      {/* Contenido */} 

      <div className="relative z-10"> 

        <div className="flex items-center gap-3 mb-4"> 

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 dark:from-gray-600 dark:via-gray-500 dark:to-gray-700 flex items-center justify-center shadow-lg shadow-emerald-500/50 dark:shadow-gray-600/40 group-hover:shadow-emerald-500/70 dark:group-hover:shadow-gray-600/50 transition-all"> 

            {icon} 

          </div> 

          <span className="text-sm text-slate-300 dark:text-gray-400 font-medium">{title}</span> 

        </div> 

         

        <p className="text-5xl font-bold mb-2 bg-gradient-to-br from-emerald-300 via-teal-200 to-cyan-300 dark:from-gray-200 dark:via-gray-300 dark:to-gray-400 bg-clip-text text-transparent"> 

          {value} 

        </p> 

         

        {showPulse ? ( 

          <div className="flex items-center gap-2"> 

            <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-gray-400 animate-pulse shadow-lg shadow-emerald-400/70 dark:shadow-gray-400/60"></div> 

            <p className="text-sm text-slate-400 dark:text-gray-500">{subtitle}</p> 

          </div> 

        ) : ( 

          <p className="text-sm text-slate-400 dark:text-gray-500">{subtitle}</p> 

        )} 

      </div> 

    </div> 

  ); 

}
