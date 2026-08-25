'use client';

import { useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PlusCircle, 
  ShieldCheck, 
  Calendar,
  Filter
} from 'lucide-react';

export default function FinancesPage() {
  const { storeName, primaryColor } = useApp() || {};

  // Estados locales para transacciones y control de flujo de caja
  const [transactions, setTransactions] = useState<any[]>([
    { id: 1, type: 'income', category: 'Ventas de Tienda (POS)', amount: 1450.00, date: '2026-08-25', ref: 'POS-9842' },
    { id: 2, type: 'expense', category: 'Nómina & Personal', amount: 550.00, date: '2026-08-24', ref: 'NOM-012' },
    { id: 3, type: 'income', category: 'Catálogo Web (Checkout)', amount: 820.50, date: '2026-08-23', ref: 'WEB-3310' },
    { id: 4, type: 'expense', category: 'Infraestructura & Servidores', amount: 120.00, date: '2026-08-20', ref: 'SRV-04' },
  ]);

  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [showModal, setShowModal] = useState(false);
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'income' | 'expense'>('income');

  // Cálculos dinámicos
  const totalIncome = (transactions ?? [])
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + (t?.amount || 0), 0);

  const totalExpenses = (transactions ?? [])
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + (t?.amount || 0), 0);

  const netBalance = totalIncome - totalExpenses;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc || !newAmount) return;

    const newTx = {
      id: Date.now(),
      type: newType,
      category: newDesc,
      amount: parseFloat(newAmount),
      date: new Date().toISOString().split('T')[0],
      ref: `TX-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setTransactions([newTx, ...transactions]);
    setNewDesc('');
    setNewAmount('');
    setShowModal(false);
  };

  const filteredTransactions = (transactions ?? []).filter(t => {
    if (filter === 'income') return t.type === 'income';
    if (filter === 'expense') return t.type === 'expense';
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Cabecera de la Sección */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <DollarSign className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white">Finanzas & Tesorería</h1>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Control de flujo de caja, ingresos y egresos en tiempo real para <span className="text-white font-bold">{storeName || 'tu negocio'}</span>.
          </p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-black transition-all shadow-lg shadow-cyan-500/20"
        >
          <PlusCircle className="w-4 h-4" /> Registrar Movimiento
        </button>
      </div>

      {/* Tarjetas de Resumen Financiero */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#071321]/80 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs font-bold text-slate-400 block mb-1">Ingresos Totales</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">
              ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> Entradas
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#071321]/80 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs font-bold text-slate-400 block mb-1">Egresos / Gastos</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-red-400">
              ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] font-mono text-red-400 font-bold flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> Salidas
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#071321]/80 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs font-bold text-slate-400 block mb-1">Balance Neto en Caja</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${netBalance >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
              ${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold">Disponible</span>
          </div>
        </div>
      </div>

      {/* Historial de Movimientos */}
      <div className="p-6 rounded-2xl bg-[#071321]/80 border border-slate-800/80 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-sm font-black text-white tracking-wide uppercase">Historial de Transacciones</h2>
            <p className="text-[11px] text-slate-400">Registro detallado de ingresos y egresos recientes.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'all' ? 'bg-cyan-500 text-zinc-950 font-black' : 'text-slate-400 hover:text-white'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('income')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'income' ? 'bg-emerald-500 text-zinc-950 font-black' : 'text-slate-400 hover:text-white'}`}
            >
              Ingresos
            </button>
            <button
              onClick={() => setFilter('expense')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'expense' ? 'bg-red-500 text-zinc-950 font-black' : 'text-slate-400 hover:text-white'}`}
            >
              Egresos
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-800/60 font-mono text-xs">
          {filteredTransactions.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-sans">No hay transacciones registradas con este filtro.</div>
          ) : (
            filteredTransactions.map((tx) => {
              const isIncome = tx.type === 'income';
              return (
                <div key={tx.id} className="py-4 flex items-center justify-between gap-4 hover:bg-slate-900/30 px-3 rounded-xl transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${isIncome ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                      {isIncome ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-white font-sans font-bold block">{tx.category}</span>
                      <span className="text-[10px] text-slate-400">Ref: {tx.ref} • {tx.date}</span>
                    </div>
                  </div>
                  <span className={`text-sm font-black ${isIncome ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isIncome ? '+' : '-'}${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal para Registrar Movimiento */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#071321] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative">
            <h3 className="text-base font-black text-white tracking-wide uppercase">Registrar Nueva Transacción</h3>
            
            <form onSubmit={handleAddTransaction} className="space-y-4 font-sans text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Tipo de Movimiento</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType('income')}
                    className={`py-2 rounded-xl font-bold border transition-all ${newType === 'income' ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-black' : 'bg-slate-900/80 border-slate-800 text-slate-400'}`}
                  >
                    Ingreso (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('expense')}
                    className={`py-2 rounded-xl font-bold border transition-all ${newType === 'expense' ? 'bg-red-500 text-zinc-950 border-red-400 font-black' : 'bg-slate-900/80 border-slate-800 text-slate-400'}`}
                  >
                    Egreso (-)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Descripción / Categoría</label>
                <input
                  type="text"
                  placeholder="Ej. Venta en efectivo, Compra de inventario..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">Monto (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Guardar Movimiento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}