"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-50 flex justify-center">
      <motion.nav 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-full py-3 px-6 shadow-2xl flex items-center justify-between"
      >
        <Link href="/" className="flex flex-col items-center gap-0.5 text-brand-lime">
          <span className="text-xs font-black uppercase tracking-wider">Inicio</span>
        </Link>
        <Link href="#productos" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-white transition-colors">
          <span className="text-xs font-bold uppercase tracking-wider">Catálogo</span>
        </Link>
        <Link href="#colecciones" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-white transition-colors">
          <span className="text-xs font-bold uppercase tracking-wider">Drops</span>
        </Link>
        <Link href="/login" className="px-3 py-1.5 bg-gradient-to-r from-brand-lime to-brand-sky rounded-full text-slate-950 font-black text-[11px] uppercase tracking-wider">
          Cuenta
        </Link>
      </motion.nav>
    </div>
  );
}