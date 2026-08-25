"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProductProps } from "./product-card";

export function ProductCardAnimated({ product, index }: { product: ProductProps; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 transition-colors duration-300 hover:border-brand-lime/40 flex flex-col justify-between overflow-hidden"
    >
      {/* Resplandor interactivo que sigue el mouse */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(134, 239, 172, 0.12), transparent 40%)`,
        }}
      />

      <div>
        {/* Superior: Badges e Imagen */}
        <div className="relative w-full h-64 bg-slate-950/90 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-white/5">
          {product.badge && (
            <motion.span 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="absolute top-3 left-3 z-10 bg-brand-lime text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-glow-green"
            >
              {product.badge}
            </motion.span>
          )}

          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-contain p-2 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2"
            />
          </div>
        </div>

        {/* Información del Producto */}
        <div className="mt-5 px-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {product.category}
          </span>
          <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-brand-lime transition-colors duration-300 line-clamp-1">
            {product.title}
          </h3>
        </div>
      </div>

      {/* Precio y Botón Interactivo */}
      <div className="mt-6 px-1 pt-3 border-t border-white/5 flex items-center justify-between z-10">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-500 block">Precio</span>
          <span className="text-xl font-black text-white tracking-tight">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden rounded-xl p-[1px] font-bold text-xs uppercase tracking-wider"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-brand-lime via-brand-emerald to-brand-sky opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="relative block px-4 py-2.5 rounded-[11px] bg-slate-950 text-white font-extrabold group-hover:bg-transparent group-hover:text-slate-950 transition-all duration-300">
            Ver detalle
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}