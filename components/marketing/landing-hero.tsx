"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function LandingHero() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ---------------------------------------------------------------- border */}
      {/* HEADER FLOTANTE (GLASSMORPHISM ESTILO CABAL / FINAPARTNER)              */}
      {/* ---------------------------------------------------------------- border */}
      <header className="sticky top-4 z-50 w-full max-w-5xl mx-auto backdrop-blur-xl bg-slate-950/40 border border-white/10 rounded-full py-3 px-6 shadow-2xl flex items-center justify-between transition-all duration-300 hover:border-white/20">
        {/* Logo & Marca */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-brand-lime via-brand-emerald to-brand-sky group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
              {/* Si dispones del logo en /public/logo.png o similar puedes usar <Image /> */}
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-sky text-lg">
                M
              </span>
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-brand-lime transition-colors">
            Catálogo
          </span>
        </Link>

        {/* Navegación Central */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#productos" className="hover:text-white transition-colors">
            Productos
          </Link>
          <Link href="#colecciones" className="hover:text-white transition-colors">
            Colecciones
          </Link>
          <Link href="#nosotros" className="hover:text-white transition-colors">
            Nosotros
          </Link>
        </nav>

        {/* Botones de Acción / Auth */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white px-3 py-2 transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="#catalogo"
            className="relative group overflow-hidden rounded-full p-[1px] font-bold text-xs uppercase tracking-wider text-slate-950"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-brand-lime via-brand-emerald to-brand-sky group-hover:opacity-90 transition-opacity" />
            <span className="relative block px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-lime via-brand-emerald to-brand-sky text-slate-950 font-black tracking-wide shadow-glow-green group-hover:scale-[0.98] transition-transform">
              Ver Catálogo
            </span>
          </Link>
        </div>
      </header>

      {/* ---------------------------------------------------------------- border */}
      {/* HERO SECTION                                                            */}
      {/* ---------------------------------------------------------------- border */}
      <main className="flex-1 flex flex-col items-center justify-center text-center mt-12 lg:mt-20">
        {/* Badge Flotante Superior */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md mb-8 shadow-glow-green animate-bounce-slow">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-lime"></span>
          </span>
          <span className="text-xs font-bold text-brand-lime uppercase tracking-widest">
            Nueva Colección Disponible
          </span>
        </div>

        {/* Headline Principal con Tipografía Ponderada y Gradiente Exacto */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08] max-w-5xl">
          El Futuro de tu Estilo{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime via-brand-emerald to-brand-sky">
            al Siguiente Nivel.
          </span>
        </h1>

        {/* Subtítulo Breve */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-normal">
          Explora la colección exclusiva. Modelos únicos diseñados con la máxima calidad y una experiencia interactiva moderna.
        </p>

        {/* CTAs de Conversión Principal */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="#productos"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-lime via-brand-emerald to-brand-sky text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-glow-green hover:shadow-glow-brand hover:scale-[1.02] active:scale-95 transition-all duration-300 text-center"
          >
            Explorar Colección
          </Link>
          <Link
            href="#destacados"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/60 border border-white/10 text-white font-bold text-sm uppercase tracking-wider backdrop-blur-xl hover:bg-slate-800/80 hover:border-white/20 active:scale-95 transition-all duration-300 text-center"
          >
            Más Vendidos
          </Link>
        </div>

        {/* Resplandor Trasero / Glowing Spotlight (Look Cabal / Finapartner) */}
        <div className="relative mt-16 w-full max-w-4xl aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-slate-950/50 backdrop-blur-2xl shadow-2xl flex items-center justify-center group">
          <div className="absolute inset-0 bg-radial from-brand-emerald/10 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Luz Guía Central */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-lime/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Banner o Showcase del Hero */}
          <div className="relative z-10 text-center p-8 flex flex-col items-center">
            <span className="text-xs uppercase font-extrabold text-brand-lime tracking-widest mb-2">
              Lanzamiento Exclusivo
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calzado & Apparel Próxima Generación
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-md">
              Todos los modelos orientados con perspectiva limpia sobre fondos neutros puros.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}