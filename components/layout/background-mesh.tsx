import React from 'react';

export const BackgroundMesh = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-surface-dark bg-noise overflow-hidden">
      {/* Luces Ambientales (Gradient Orbs) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Luz Verde Esmeralda (Superior Izquierda) */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-brand-emerald/20 rounded-full blur-[120px] animate-pulse-slow" />
        
        {/* Luz Azul Cerúleo (Superior Derecha) */}
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-brand-sky/15 rounded-full blur-[140px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

        {/* Luz Verde Lima (Centro Inferior) */}
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-brand-lime/10 rounded-full blur-[130px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
        
        {/* Grid de líneas tipo SaaS */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Contenido del App */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};