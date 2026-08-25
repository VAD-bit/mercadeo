'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  QrCode, 
  Smartphone, 
  Copy, 
  Check, 
  Loader2, 
  ArrowRight,
  Clock
} from 'lucide-react';

export default function BillingExpiredPage() {
  const [method, setMethod] = useState<'mobile_pay' | 'binance_pay'>('mobile_pay');
  const [referenceCode, setReferenceCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/billing/submit-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: method,
          referenceCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al enviar el reporte.');

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-50 border border-amber-200 text-amber-600 rounded-2xl shadow-sm mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-black text-[#0A2540] tracking-tight">
            Tu período de prueba ha finalizado
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            Renueva tu suscripción por <strong className="text-slate-800">$5.99/mes</strong> para reactivar tu Punto de Venta, Inventario y Catálogo Web.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-3xl sm:px-10">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-green-50 border border-green-200 text-[#22C55E] rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2540]">Pago en Verificación</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Hemos recibido tu reporte de referencia <strong>#{referenceCode}</strong>. El equipo validará el abono y tu acceso se reactivará automáticamente en breve.
              </p>
              <button
                onClick={() => router.push('/dashboard')}
                className="mt-4 inline-flex items-center gap-2 py-3 px-6 rounded-xl text-xs font-bold text-white bg-[#0A2540] hover:bg-slate-800 transition-colors"
              >
                Volver al Inicio <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitPayment} className="space-y-6">
              {error && (
                <div className="p-3.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('mobile_pay')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    method === 'mobile_pay'
                      ? 'border-[#00D2FF] bg-cyan-50/30 ring-2 ring-cyan-100'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#0A2540] mb-2" />
                  <span className="text-xs font-bold text-[#0A2540]">Pago Móvil</span>
                  <span className="text-[10px] text-slate-400">Bolívares (BCV)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('binance_pay')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    method === 'binance_pay'
                      ? 'border-[#00D2FF] bg-cyan-50/30 ring-2 ring-cyan-100'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#0A2540] mb-2" />
                  <span className="text-xs font-bold text-[#0A2540]">Binance Pay</span>
                  <span className="text-[10px] text-slate-400">USDT Directo</span>
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase">Datos de Recepción</span>
                  <span className="text-xs font-black text-[#0A2540]">$5.99 USD</span>
                </div>

                {method === 'mobile_pay' ? (
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Banco:</span>
                      <span className="font-bold">Banesco (0134)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Teléfono:</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('0414-5623930', 'phone')}
                        className="font-bold flex items-center gap-1 hover:text-[#00D2FF]"
                      >
                        0414-5623930 {copied === 'phone' ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">RIF / C.I.:</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('V-26428927', 'C.I')}
                        className="font-bold flex items-center gap-1 hover:text-[#00D2FF]"
                      >
                        V-26428927 {copied === 'C.I' ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Binance ID:</span>
                      <button
                        type="button"
                        onClick={() => handleCopy('467865887', 'binance_id')}
                        className="font-bold flex items-center gap-1 hover:text-[#00D2FF]"
                      >
                        467865887 {copied === 'binance_id' ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Red:</span>
                      <span className="font-bold">Pay (USDT)</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Número de Referencia
                </label>
                <input
                  type="text"
                  required
                  value={referenceCode}
                  onChange={(e) => setReferenceCode(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  placeholder={method === 'mobile_pay' ? 'Ej. 004920' : 'Ej. 392019482'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl text-white font-bold bg-[#0A2540] hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-sm"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Reportar Pago <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}