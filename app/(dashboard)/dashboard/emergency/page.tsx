'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Vault, 
  DollarSign, 
  Plus, 
  Minus, 
  Lock, 
  CheckCircle2, 
  History 
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposito' | 'retiro';
  amountUSD: number;
  reason: string;
  date: string;
}

export default function EmergencyPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [emergencyFund, setEmergencyFund] = useState(1200.00);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'deposito', amountUSD: 500.00, reason: 'Reserva inicial de caja chica', date: '2026-08-01' },
    { id: '2', type: 'deposito', amountUSD: 700.00, reason: 'Excedente de utilidades mensuales', date: '2026-08-15' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'deposito' | 'retiro'>('deposito');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0 || !reason) return;

    if (actionType === 'retiro' && val > emergencyFund) {
      alert('El monto del retiro supera el fondo de emergencia disponible.');
      return;
    }

    const newFund = actionType === 'deposito' ? emergencyFund + val : emergencyFund - val;
    setEmergencyFund(newFund);

    const newTx: Transaction = {
      id: Date.now().toString(),
      type: actionType,
      amountUSD: val,
      reason,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTx, ...transactions]);
    setAmount('');
    setReason('');
    setIsModalOpen(false);
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Vault className="w-5 h-5 text-amber-400" /> Fondo de Emergencia & Caja Chica
          </h1>
          <p className="text-xs text-zinc-400">Reserva de capital blindada para imprevistos operativos y contingencias del negocio.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { setActionType('deposito'); setIsModalOpen(true); }}
            className="py-2.5 px-4 rounded-xl font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 text-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Ingresar Fondo
          </button>
          <button
            onClick={() => { setActionType('retiro'); setIsModalOpen(true); }}
            className="py-2.5 px-4 rounded-xl font-bold text-white bg-zinc-800 hover:bg-zinc-700 text-xs flex items-center gap-1.5 transition-all border border-zinc-700"
          >
            <Minus className="w-4 h-4" /> Retirar
          </button>
        </div>
      </div>

      {/* Tarjeta Principal del Fondo */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-[10px] uppercase font-mono tracking-wider">
              Reserva Activa Blindada
            </span>
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Seguro ante fluctuaciones
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-black text-white font-mono">${emergencyFund.toFixed(2)} <span className="text-sm font-normal text-zinc-400">USD</span></p>
        </div>

        <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-xl max-w-xs space-y-1">
          <p className="text-[11px] font-bold text-zinc-300 uppercase flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Cobertura de Contingencia
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed">Este fondo cubre aproximadamente 3 meses de gastos operativos fijos básicos.</p>
        </div>
      </div>

      {/* Historial de Movimientos del Fondo */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2">
          <History className="w-4 h-4 text-amber-400" /> Historial de Movimientos de Reserva
        </h2>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50 text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                <th className="p-4">Tipo</th>
                <th className="p-4">Motivo / Concepto</th>
                <th className="p-4">Fecha</th>
                <th className="p-4 text-right">Monto USD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs font-mono">
              {transactions.map((tx) => {
                const isDep = tx.type === 'deposito';
                return (
                  <tr key={tx.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isDep ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4 font-sans text-zinc-200 font-medium">{tx.reason}</td>
                    <td className="p-4 text-zinc-500">{tx.date}</td>
                    <td className={`p-4 text-right font-bold ${isDep ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isDep ? '+' : '-'}${tx.amountUSD.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TRANSACCIÓN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-black text-white capitalize">
              {actionType === 'deposito' ? 'Ingresar al Fondo de Emergencia' : 'Retirar del Fondo de Emergencia'}
            </h3>
            
            <form onSubmit={handleTransaction} className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 font-semibold">Monto ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-amber-500/60 font-mono"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold">Motivo o Justificación</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-amber-500/60"
                  placeholder="Ej: Cobertura de imprevisto operativo"
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
                  className={`w-1/2 py-2.5 rounded-xl text-zinc-950 text-xs font-bold ${
                    actionType === 'deposito' ? 'bg-amber-400 hover:bg-amber-300' : 'bg-red-400 hover:bg-red-300 text-zinc-950'
                  }`}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}