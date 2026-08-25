'use client';

import { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Target, 
  TrendingUp, 
  Sparkles, 
  Plus, 
  Calendar, 
  DollarSign, 
  CheckCircle2 
} from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  discount: string;
  channel: string;
  status: 'Activa' | 'Programada' | 'Finalizada';
}

export default function MarketingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [monthlyTarget] = useState(5000.00);
  const [currentSales] = useState(3420.00);
  
  const [promotions, setPromotions] = useState<Promotion[]>([
    { id: '1', title: 'Lanzamiento Colección Urbana', discount: '15% OFF', channel: 'Instagram / WhatsApp', status: 'Activa' },
    { id: '2', title: 'Promoción Fin de Semana', discount: 'Envío Gratis', channel: 'Catálogo VIP', status: 'Programada' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPromo, setNewPromo] = useState({ title: '', discount: '', channel: 'WhatsApp' });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromo.title || !newPromo.discount) return;

    const promo: Promotion = {
      id: Date.now().toString(),
      title: newPromo.title,
      discount: newPromo.discount,
      channel: newPromo.channel,
      status: 'Activa',
    };

    setPromotions([promo, ...promotions]);
    setNewPromo({ title: '', discount: '', channel: 'WhatsApp' });
    setIsModalOpen(false);
  };

  const progressPercentage = Math.min(100, (currentSales / monthlyTarget) * 100);

  if (!isMounted) return null;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-sky-400" /> Proyección & Marketing
          </h1>
          <p className="text-xs text-zinc-400">Planificador de estrategias promocionales, metas de venta y proyecciones de crecimiento.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2.5 px-4 rounded-xl font-bold text-zinc-950 bg-sky-400 hover:bg-sky-300 text-xs flex items-center gap-2 w-fit transition-all"
        >
          <Plus className="w-4 h-4" /> Nueva Campaña Promocional
        </button>
      </div>

      {/* Tarjetas de Metas y Proyecciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 uppercase flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-400" /> Meta de Ventas Mensual
            </span>
            <span className="text-xs font-mono text-zinc-400">{progressPercentage.toFixed(1)}% completado</span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white font-mono">${currentSales.toFixed(2)} USD</span>
            <span className="text-xs font-mono text-zinc-500">Meta: ${monthlyTarget.toFixed(2)} USD</span>
          </div>

          {/* Barra de progreso */}
          <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Proyección Estimada</span>
            <TrendingUp className="w-4 h-4 text-lime-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-white font-mono">${(monthlyTarget * 1.15).toFixed(2)}</p>
            <p className="text-[10px] text-lime-400 font-semibold mt-1">+15% proyectado al cierre de ciclo</p>
          </div>
        </div>
      </div>

      {/* Lista de Campañas y Promociones */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" /> Estrategias y Promociones Activas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {promotions.map((promo) => (
            <div key={promo.id} className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                    {promo.discount}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {promo.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mt-3">{promo.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">Canal de difusión: <span className="text-white font-medium">{promo.channel}</span></p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-between items-center text-xs">
                <span className="text-zinc-500 font-mono">Impacto Estimado: Alto</span>
                <button 
                  onClick={() => alert(`Gestionando campaña: ${promo.title}`)}
                  className="text-sky-400 hover:underline font-bold"
                >
                  Configurar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL NUEVA CAMPAÑA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-black text-white">Nueva Campaña Promocional</h3>
            
            <form onSubmit={handleCreatePromo} className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 font-semibold">Título de la Campaña</label>
                <input
                  type="text"
                  required
                  value={newPromo.title}
                  onChange={(e) => setNewPromo({ ...newPromo, title: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-sky-500/60"
                  placeholder="Ej: Rebajas de Temporada"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold">Descuento o Beneficio</label>
                <input
                  type="text"
                  required
                  value={newPromo.discount}
                  onChange={(e) => setNewPromo({ ...newPromo, discount: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-sky-500/60"
                  placeholder="Ej: 20% OFF o 2x1"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold">Canal de Difusión</label>
                <input
                  type="text"
                  value={newPromo.channel}
                  onChange={(e) => setNewPromo({ ...newPromo, channel: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-sky-500/60"
                  placeholder="Ej: WhatsApp / Instagram"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-sky-400 text-zinc-950 text-xs font-bold hover:bg-sky-300"
                >
                  Crear Campaña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}