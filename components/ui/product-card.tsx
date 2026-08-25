"use client";

import React from "react";
import Image from "next/image";

export interface ProductProps {
  id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
  badge?: string;
  isNew?: boolean;
}

export function ProductCard({ product }: { product: ProductProps }) {
  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 transition-all duration-300 hover:border-brand-lime/40 hover:-translate-y-1.5 hover:shadow-glow-green flex flex-col justify-between overflow-hidden">
      
      {/* Luz ambiental interna al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-lime/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Superior: Badges */}
        <div className="relative w-full h-64 bg-slate-950/80 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-white/5">
          {product.badge && (
            <span className="absolute top-3 left-3 z-10 bg-brand-lime text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              {product.badge}
            </span>
          )}

          {/* Imagen limpia sobre fondo oscuro puro */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-contain p-2 transform transition-transform duration-500 group-hover:scale-105"
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

      {/* Cifra de Precio y CTA */}
      <div className="mt-6 px-1 pt-3 border-t border-white/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-500 block">Precio</span>
          <span className="text-xl font-black text-white tracking-tight">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <button className="relative group/btn overflow-hidden rounded-xl p-[1px] font-bold text-xs uppercase tracking-wider">
          <span className="absolute inset-0 bg-gradient-to-r from-brand-lime to-brand-sky opacity-80 group-hover/btn:opacity-100 transition-opacity" />
          <span className="relative block px-4 py-2.5 rounded-[11px] bg-slate-950 text-white font-extrabold group-hover/btn:bg-transparent group-hover/btn:text-slate-950 transition-all duration-300">
            Ver detalle
          </span>
        </button>
      </div>
    </div>
  );
}