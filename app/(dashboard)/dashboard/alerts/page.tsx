'use client';

import { useState, useEffect } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  ShieldAlert, 
  FileText, 
  Package 
} from 'lucide-react';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  type: 'stock' | 'invoice' | 'payment';
  priority: 'Alta' | 'Media' | 'Baja';
  date: string;
}

export default function AlertsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: '1',
      title: 'Stock Bajo detectado',
      description: 'El producto "Calzado Urbano X" cuenta con menos de 5 unidades disponibles.',
      type: 'stock',
      priority: 'Alta',
      date: 'Hoy, 10:30 AM',
    },
    {
      id: '2',
      title: 'Factura por Cobrar Vencida',
      description: 'La factura FAC-001 de Inversiones Corp C.A. superó los días de crédito.',
      type: 'payment',
      priority: 'Alta',
      date: 'Ayer, 04:15 PM',
    },
    {
      id: '3',
      title: 'Vencimiento de Comprobante RIF',
      description: 'Revisión trimestral de actualización fiscal pendiente en bóveda.',
      type: 'invoice',
      priority: 'Media',
      date: 'Hace 3 días',
    },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" /> Alertas & Recordatorios
          </h1>
          <p className="text-xs text-zinc-400">Monitoreo en tiempo real de situaciones críticas, stock bajo y cobros pendientes.</p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-xs flex items-center gap-1.5 w-fit">
          <ShieldAlert className="w-4 h-4" /> {alerts.length} Alertas Activas
        </span>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="p-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-white">Todo en orden</p>
            <p className="text-xs text-zinc-500">No hay alertas críticas ni recordatorios pendientes en este momento.</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const isHigh = alert.priority === 'Alta';

            return (
              <div 
                key={alert.id}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  isHigh 
                    ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40' 
                    : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl mt-0.5 ${
                    alert.type === 'stock' ? 'bg-cyan-500/10 text-cyan-400' :
                    alert.type === 'payment' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {alert.type === 'stock' ? <Package className="w-4 h-4" /> :
                     alert.type === 'payment' ? <Clock className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{alert.title}</h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        isHigh ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {alert.priority}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">{alert.description}</p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-2">{alert.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleDismiss(alert.id)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Marcar Atendido
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}