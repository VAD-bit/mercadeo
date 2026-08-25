"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/60 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Identidad */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-lime via-brand-emerald to-brand-sky p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-brand-lime text-sm">
              M
            </div>
          </div>
          <span className="font-extrabold text-white tracking-tight">
            CATÁLOGO <span className="text-brand-lime">PRO</span>
          </span>
        </div>

        {/* Links Rápidos */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400">
          <Link href="#productos" className="hover:text-white transition-colors">
            Catálogo
          </Link>
          <Link href="#nosotros" className="hover:text-white transition-colors">
            Términos
          </Link>
          <Link href="#contacto" className="hover:text-white transition-colors">
            Soporte
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500 font-medium text-center md:text-right">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}