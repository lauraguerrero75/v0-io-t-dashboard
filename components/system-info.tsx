'use client';

import { useState, useEffect } from 'react';

export function SystemInfo() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Dashboard IoT
        </h1>
        <p className="text-slate-400 mt-1">Gemelo Digital Bloque E</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-slate-400">
            {currentTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-2xl font-semibold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            {currentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>
        
        <div className="relative px-4 py-2 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-cyan-500/20"></div>
          <div className="absolute inset-0 rounded-xl border border-emerald-500/50"></div>
          <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-400/20 rounded-full blur-xl"></div>
          <div className="relative flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/70"></div>
            <span className="text-sm font-medium text-emerald-300">Sistema Activo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
