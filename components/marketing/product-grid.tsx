"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCardAnimated } from "@/components/ui/product-card-animated";
import { ProductProps } from "@/components/ui/product-card";

const SAMPLE_PRODUCTS: ProductProps[] = [
  {
    id: "1",
    title: "Urban Runner Horizon",
    category: "Calzado",
    price: 120.00,
    imageUrl: "/images/shoes/shoe-1.png",
    badge: "Drop Exclusivo",
  },
  {
    id: "2",
    title: "Streetwear Oversized Hoodie",
    category: "Apparel",
    price: 65.00,
    imageUrl: "/images/apparel/hoodie-1.png",
  },
  {
    id: "3",
    title: "Cyberpunk Sneaker V2",
    category: "Calzado",
    price: 145.00,
    imageUrl: "/images/shoes/shoe-2.png",
    badge: "Top Ventas",
  },
];

const CATEGORIES = ["Todos", "Calzado", "Apparel", "Accesorios"];

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = activeCategory === "Todos"
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="productos" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-lime">
            Catálogo Exclusivo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Explora las Últimas Tendencias
          </h2>
        </div>

        {/* Filtros Animados */}
        <div className="flex flex-wrap gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300"
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-brand-lime via-brand-emerald to-brand-sky rounded-xl shadow-glow-green"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className={`relative z-10 ${activeCategory === cat ? "text-slate-950 font-black" : "text-slate-400 hover:text-white"}`}>
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grilla Animada */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product, idx) => (
            <ProductCardAnimated key={product.id} product={product} index={idx} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}