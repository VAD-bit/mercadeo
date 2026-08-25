'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Mail, 
  Lock, 
  Loader2, 
  Zap, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }

    // MOCK LOGIN / DEMO:
    if ((cleanEmail === 'mercadeo@gmail.com' || cleanEmail === '1') && cleanPassword === '1') {
      setLoading(true);
      try {
        localStorage.setItem(
          'mercadeo_user_session',
          JSON.stringify({
            id: 'user_demo_123',
            email: 'mercadeo@gmail.com',
            name: 'Usuario Demo',
          })
        );
      } catch (err) {
        console.error('Error al guardar sesión:', err);
      }

      // Navegación directa
      window.location.href = '/onboarding';
      return;
    }

    // Fallback genérico para desarrollo
    setLoading(true);
    try {
      localStorage.setItem(
        'mercadeo_user_session',
        JSON.stringify({
          id: 'user_mock_id',
          email: cleanEmail,
        })
      );
      window.location.href = '/onboarding';
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-zinc-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Resplandor de fondo marca MERCADEO */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-sky-500/15 via-cyan-500/15 to-lime-500/20 blur-[150px] pointer-events-none rounded-full" />

      {/* Tarjeta Principal de Login */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-2xl shadow-2xl overflow-hidden z-10">
        
        {/* Panel Izquierdo - Branding e Info */}
        <div className="p-8 md:p-12 bg-zinc-950/40 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800/60">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lime-500 via-cyan-500 to-sky-500 p-[2px]">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                  <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
              <span className="text-2xl font-black text-white tracking-wider">MERCADEO</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              PLATAFORMA INTEGRAL DE GESTIÓN
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-4">
              Control absoluto de tu{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                Negocio & Ventas
              </span>
            </h1>

            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
              Gestión de inventario, punto de venta POS, contabilidad automatizada y catálogo digital en un solo lugar.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">FLUJO AUTOMATIZADO</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Control de ingresos e IA</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div className="w-8 h-8 rounded-lg bg-lime-500/10 flex items-center justify-center text-lime-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">VERIFICACIÓN OCR</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Validación de RIF y datos</p>
            </div>
          </div>
        </div>

        {/* Panel Derecho - Formulario de Login */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white">¡Bienvenido de nuevo!</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} noValidate className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                CORREO ELECTRÓNICO
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="email_demo"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="mercadeo@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                CONTRASEÑA
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password_demo"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="•••••••• o 1"
                />
              </div>
            </div>

            <button
              type="submit"
              formNoValidate
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 text-sm tracking-wide disabled:opacity-50 mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-zinc-950" />
              ) : (
                <>
                  INICIAR SESIÓN <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-zinc-400 text-center mt-6">
            ¿No tienes una cuenta aún?{' '}
            <Link href="/register" className="text-cyan-400 font-bold hover:underline">
              Crea tu cuenta aquí
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}