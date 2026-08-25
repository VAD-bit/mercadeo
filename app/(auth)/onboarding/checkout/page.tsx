'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Loader2, 
  Copy, 
  Check 
} from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  period: string;
  badge?: string;
  features: string[];
}

export default function CheckoutPage() {
  const router = useRouter();
  
  // Selección de Plan y Método
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'personal' | 'business'>('business');
  const [paymentMethod, setPaymentMethod] = useState<'pagomovil' | 'binance' | 'paypal'>('pagomovil');
  
  // Estados de Formulario de Pago
  const [reference, setReference] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plans: Record<'trial' | 'personal' | 'business', Plan> = {
    trial: {
      name: 'Prueba Gratuita',
      price: 0,
      period: '7 Días',
      badge: 'POPULAR',
      features: ['Acceso total por 7 días', 'POS Móvil & Catálogo Web', 'Copiloto de IA básico', 'Sin tarjeta previa']
    },
    personal: {
      name: 'Plan Personal',
      price: 3.99,
      period: 'Mensual',
      features: ['Control de Presupuestos', 'Metas Financieras', 'Reportes en tiempo real', 'Soporte por WhatsApp']
    },
    business: {
      name: 'Plan Empresa',
      price: 6.99,
      period: 'Mensual',
      badge: 'RECOMENDADO',
      features: ['Punto de Venta (POS)', 'Catálogo Web + WhatsApp', 'IA Copilot Full Access', 'Gestión de Inventario']
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmPayment = () => {
    if (selectedPlan !== 'trial' && !reference) {
      setError('Por favor ingresa el número de referencia del pago.');
      return;
    }

    setLoading(true);
    setError(null);

    // Guardar estado de suscripción y redirigir al Dashboard
    const session = JSON.parse(localStorage.getItem('mercadeo_user_session') || '{}');
    const updatedSession = {
      ...session,
      subscriptionPlan: selectedPlan,
      paymentMethod: selectedPlan === 'trial' ? 'none' : paymentMethod,
      paymentReference: reference,
      subscriptionStatus: selectedPlan === 'trial' ? 'trialing' : 'active',
      onboardingCompleted: true,
      isAuthenticated: true
    };

    localStorage.setItem('mercadeo_user_session', JSON.stringify(updatedSession));
    document.cookie = "mercadeo_session_active=true; path=/; max-age=86400;";

    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-zinc-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-sky-500/20 via-cyan-500/15 to-lime-500/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-lime-400 tracking-widest uppercase bg-lime-500/10 px-3 py-1 rounded-full border border-lime-500/20">
            Paso 4 de 5 · Plan y Pago
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-3">Suscripción y Activación</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Selecciona el plan ideal para impulsar tus ventas y gestiona tu pago de forma segura
          </p>
        </div>

        {/* Grilla de Selección de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {(Object.keys(plans) as Array<keyof typeof plans>).map((key) => {
            const plan = plans[key];
            const isSelected = selectedPlan === key;

            return (
              <div
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-zinc-900/90 border-cyan-400 ring-2 ring-cyan-400/30'
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-4 bg-gradient-to-r from-lime-400 to-cyan-400 text-zinc-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-base font-bold text-white">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">${plan.price}</span>
                    <span className="text-xs text-zinc-400">/ {plan.period}</span>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-zinc-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-5 text-center py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-cyan-400 text-zinc-950'
                    : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {isSelected ? 'Seleccionado' : 'Elegir Plan'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pasarela de Pago (Solo si no es prueba) */}
        {selectedPlan !== 'trial' ? (
          <div className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" /> Método de Pago
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Selecciona cómo deseas realizar la transferencia</p>
            </div>

            {/* Selector de Método */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('pagomovil')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'pagomovil'
                    ? 'bg-lime-950/30 border-lime-400 text-lime-400'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                }`}
              >
                <QrCode className="w-4 h-4" /> Pago Móvil
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('binance')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'binance'
                    ? 'bg-cyan-950/30 border-cyan-400 text-cyan-400'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Binance Pay
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'paypal'
                    ? 'bg-sky-950/30 border-sky-400 text-sky-400'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> PayPal
              </button>
            </div>

            {/* Datos Bancarios según Selección */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 text-xs space-y-3">
              {paymentMethod === 'pagomovil' && (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                    <span className="font-bold text-zinc-400 uppercase">Datos Pago Móvil</span>
                    <span className="text-lime-400 font-bold">Tasa Oficial BCV</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-zinc-300">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">BANCO</span>
                      <span className="font-bold">Banesco (0134)</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">CÉDULA / RIF</span>
                      <div className="flex items-center gap-1 font-bold">
                        J-501928340
                        <button onClick={() => copyToClipboard('J501928340', 'rif')} className="text-zinc-500 hover:text-white">
                          {copiedField === 'rif' ? <Check className="w-3 h-3 text-lime-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">TELÉFONO</span>
                      <div className="flex items-center gap-1 font-bold">
                        0412-1234567
                        <button onClick={() => copyToClipboard('04121234567', 'phone')} className="text-zinc-500 hover:text-white">
                          {copiedField === 'phone' ? <Check className="w-3 h-3 text-lime-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'binance' && (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                    <span className="font-bold text-zinc-400 uppercase">Binance Pay (USDT)</span>
                    <span className="text-cyan-400 font-bold">Sin comisiones</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 block text-[10px]">PAY ID</span>
                    <div className="flex items-center justify-between font-bold text-white bg-zinc-900 px-3 py-2 rounded-xl">
                      <span>284910384</span>
                      <button onClick={() => copyToClipboard('284910384', 'binance')} className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                        {copiedField === 'binance' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copiar
                      </button>
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'paypal' && (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                    <span className="font-bold text-zinc-400 uppercase">Correo PayPal</span>
                    <span className="text-sky-400 font-bold">+5% Comisión</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 block text-[10px]">ENVIAR A</span>
                    <div className="flex items-center justify-between font-bold text-white bg-zinc-900 px-3 py-2 rounded-xl">
                      <span>pagos@mercadeo.app</span>
                      <button onClick={() => copyToClipboard('pagos@mercadeo.app', 'paypal')} className="text-xs text-sky-400 font-semibold flex items-center gap-1">
                        {copiedField === 'paypal' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copiar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Input Referencia */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Número de Referencia del Pago
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Ej. 849201"
                className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/60 p-3 rounded-xl">{error}</p>
            )}

            <button
              type="button"
              onClick={handleConfirmPayment}
              disabled={loading}
              className="w-full py-4 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 transition-all flex items-center justify-center gap-2 text-sm tracking-wide disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>REPORTAR PAGO Y ENTRAR AL DASHBOARD <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        ) : (
          /* Botón de Confirmación para Prueba Gratuita */
          <div className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-6 text-center space-y-4">
            <p className="text-xs text-zinc-400">Accederás de inmediato con 7 días de prueba completa sin cargos de tarjeta.</p>
            <button
              type="button"
              onClick={handleConfirmPayment}
              disabled={loading}
              className="w-full py-4 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 transition-all flex items-center justify-center gap-2 text-sm tracking-wide disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>INICIAR PRUEBA GRATUITA <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}