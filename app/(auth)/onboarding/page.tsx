'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Loader2, 
  Phone, 
  Check, 
  Building2, 
  User, 
  ShoppingCart 
} from 'lucide-react';

export default function OnboardingPage() {
  const [useCase, setUseCase] = useState<'personal' | 'business' | null>(null);
  const [step, setStep] = useState(0); // Step 0: Selección de Uso
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Campos para Finanzas de Empresa
  const [businessName, setBusinessName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState('Calzado y Moda');
  const [phoneWhatsapp, setPhoneWhatsapp] = useState('');

  const router = useRouter();

  // Función para convertir cualquier texto a slug URL válido
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD') // Remueve acentos y diacríticos
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/-+/g, '-'); // Evita guiones dobles
  };

  // Actualiza el nombre de la empresa y auto-genera el slug
  const handleBusinessNameChange = (name: string) => {
    setBusinessName(name);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(name));
    }
  };

  // Permitir la edición manual del slug
  const handleSlugChange = (rawSlug: string) => {
    setIsSlugManuallyEdited(true);
    setSlug(generateSlug(rawSlug));
  };

  // Manejador para guardar onboarding y actualizar la sesión activa
  const handleCompleteOnboarding = async (type: 'personal' | 'business') => {
    setLoading(true);
    setError(null);

    try {
      const onboardingData = {
        useCase: type,
        businessName: type === 'business' ? businessName : '',
        slug: type === 'business' ? slug : '',
        category: type === 'business' ? category : '',
        phoneWhatsapp: type === 'business' ? phoneWhatsapp : '',
        subscriptionStatus: 'trialing',
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };

      // 1. Guardar la configuración técnica del onboarding
      localStorage.setItem('mercadeo_onboarding_data', JSON.stringify(onboardingData));

      // 2. Actualizar o crear la sesión del usuario para evitar rebores a /register
      const currentSession = JSON.parse(localStorage.getItem('mercadeo_user_session') || '{}');
      const updatedSession = {
        ...currentSession,
        useCase: type,
        businessName: onboardingData.businessName,
        slug: onboardingData.slug,
        onboardingCompleted: true,
        isAuthenticated: true,
      };

      localStorage.setItem('mercadeo_user_session', JSON.stringify(updatedSession));

      setTimeout(() => {
        setLoading(false);
        // Agrega esto justo antes de router.push() en handleCompleteOnboarding:
document.cookie = "mercadeo_session_active=true; path=/; max-age=86400;";
        if (type === 'personal') {
          router.push('/dashboard/personal');
        } else {
          router.push('/dashboard');
        }
      }, 600);
    } catch (err) {
      setError('Ocurrió un error al guardar la configuración local.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-zinc-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Resplandor de fondo marca MERCADEO */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-sky-500/20 via-cyan-500/15 to-lime-500/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        
        {/* Header Logo */}
        <div className="flex items-center justify-center gap-3 mb-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lime-500 via-cyan-500 to-sky-500 p-[2px]">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-cyan-400">
              <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <span className="text-2xl font-black text-white tracking-wider">MERCADEO</span>
        </div>

        {/* Stepper (Visible solo en flujo Empresa) */}
        {step > 0 && (
          <div className="flex items-center justify-between mb-8 px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step === s
                      ? 'bg-gradient-to-tr from-lime-400 to-cyan-400 text-zinc-950 ring-4 ring-cyan-500/20'
                      : step > s
                      ? 'bg-lime-500 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5 stroke-[3]" /> : s}
                </div>
                <span className="text-xs font-semibold text-zinc-400 hidden sm:inline">
                  {s === 1 ? 'Negocio' : s === 2 ? 'Contacto' : 'Activación'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* PASO 0: SELECCIÓN DE USO */}
          {step === 0 && (
            <div className="space-y-6 text-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  ¿Cómo utilizarás MERCADEO?
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                  Selecciona la modalidad que mejor se adapte a tus necesidades
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
                {/* Opción Finanzas Personales */}
                <button
                  type="button"
                  onClick={() => setUseCase('personal')}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    useCase === 'personal'
                      ? 'bg-cyan-950/30 border-cyan-400 ring-1 ring-cyan-400'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Finanzas Personales</h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Control de presupuestos, gastos personales, ingresos y metas financieras.
                    </p>
                  </div>
                </button>

                {/* Opción Finanzas de Empresa */}
                <button
                  type="button"
                  onClick={() => setUseCase('business')}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    useCase === 'business'
                      ? 'bg-lime-950/30 border-lime-400 ring-1 ring-lime-400'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400 mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Finanzas de Empresa</h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Punto de venta (POS), inventario, catálogo web e integración de ventas por WhatsApp.
                    </p>
                  </div>
                </button>
              </div>

              <button
                type="button"
                disabled={!useCase || loading}
                onClick={() => {
                  if (useCase === 'personal') {
                    handleCompleteOnboarding('personal');
                  } else if (useCase === 'business') {
                    setStep(1);
                  }
                }}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 text-sm tracking-wide disabled:opacity-40"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    CONTINUAR <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* PASO 1: DETALLES DEL NEGOCIO */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-black text-white">Detalles del Negocio</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Ingresa el nombre y tu enlace público único
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Nombre de tu Empresa / Tienda
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => handleBusinessNameChange(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60"
                  placeholder="Ej. Reality Shop"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Enlace Web Único (Slug)
                </label>
                <div className="flex items-center bg-zinc-950/80 border border-zinc-800 rounded-xl px-3 py-3 focus-within:border-cyan-500/60 transition-colors">
                  <span className="text-xs text-zinc-500 font-semibold select-none">mercadeo.app/</span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="w-full bg-transparent text-cyan-400 text-sm font-bold focus:outline-none ml-1 placeholder-zinc-700"
                    placeholder="reality-shop"
                  />
                </div>
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Se genera automáticamente, pero puedes editarlo manualmente si deseas diferenciarlo.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Categoría o Nicho
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60"
                >
                  <option value="Calzado y Moda">Calzado y Moda</option>
                  <option value="Electrónica y Tecnología">Electrónica y Tecnología</option>
                  <option value="Perfumería y Cosmética">Perfumería y Cosmética</option>
                  <option value="Alimentos y Bebidas">Alimentos y Bebidas</option>
                  <option value="Servicios Profesionales">Servicios Profesionales</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="w-1/3 py-3.5 px-4 rounded-xl text-zinc-300 font-bold bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!businessName || !slug) {
                      setError('Por favor ingresa el nombre de tu negocio y su enlace web.');
                      return;
                    }
                    setError(null);
                    setStep(2);
                  }}
                  className="w-2/3 flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 transition-all text-sm"
                >
                  Siguiente Paso <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: CANAL DE VENTAS */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-black text-white">Canal de Ventas</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Agrega tu WhatsApp para recibir los pedidos directos del catálogo
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Número de WhatsApp para Pedidos
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={phoneWhatsapp}
                    onChange={(e) => setPhoneWhatsapp(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60"
                    placeholder="+584121234567"
                  />
                </div>
                <span className="text-[11px] text-zinc-500 mt-1.5 block">
                  Incluye el código de país (Ej: +58 para Venezuela)
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 px-4 rounded-xl text-zinc-300 font-bold bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!phoneWhatsapp) {
                      setError('Por favor ingresa tu número de WhatsApp.');
                      return;
                    }
                    setError(null);
                    setStep(3);
                  }}
                  className="w-2/3 flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 transition-all text-sm"
                >
                  Siguiente Paso <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: ACTIVACIÓN */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">¡Todo listo para empezar!</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Tu prueba gratuita de 7 días incluye acceso a todas las funciones
                </p>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-xs font-bold text-zinc-400 uppercase">Resumen del Plan</span>
                  <span className="text-xs font-black text-lime-400 bg-lime-950/50 border border-lime-800 px-2.5 py-0.5 rounded-full">
                    $0 HOY
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400" /> 7 Días de acceso ilimitado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400" /> Punto de Venta (POS Móvil) & Inventario
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400" /> Catálogo Web e Integración con WhatsApp
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-lime-400" /> Copiloto de IA para Negocios
                  </li>
                </ul>

                <p className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                  Renovación por $19.99/mes mediante Pago Móvil o Binance Pay al terminar la prueba.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3.5 px-4 rounded-xl text-zinc-300 font-bold bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => handleCompleteOnboarding('business')}
                  disabled={loading}
                  className="w-2/3 flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 transition-all text-sm disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Entrar al Dashboard <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}