'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Loader2, Lock, Mail, User, Phone, CreditCard, MapPin } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    identityDocument: '',
    phone: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ----------------------------------------------------------------------
      // TODO (Backend / BD): Aquí la persona encargada integrará Supabase Auth
      // y la creación del perfil en la tabla 'profiles'.
      // ----------------------------------------------------------------------

      // Guardado local de prueba para simular el paso de datos al Onboarding
      localStorage.setItem('mercadeo_user_step1', JSON.stringify({
        ...formData,
        subscriptionStatus: 'trialing',
      }));

      // Simulación de respuesta rápida
      setTimeout(() => {
        setLoading(false);
        // Redirección al siguiente paso del flujo (Selección de Uso)
        router.push('/onboarding');
      }, 500);

    } catch (err) {
      setError('Ocurrió un error al procesar el registro local.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-zinc-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Resplandor de fondo marca MERCADEO */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-sky-500/20 via-cyan-500/15 to-lime-500/20 blur-[140px] pointer-events-none rounded-full" />

      {/* Contenedor principal Glassmorphism */}
      <div className="w-full max-w-2xl bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lime-500 via-cyan-500 to-sky-500 p-[2px]">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-wider">MERCADEO</h1>
              <p className="text-xs text-zinc-400">Registro de Usuario</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800/80 text-cyan-400 border border-cyan-500/20">
            Paso 1 / 2
          </span>
        </div>

        {error && (
          <div className="mb-6 p-4 text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Nombre</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Juan"
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Apellido</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Pérez"
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className="w-full pl-11 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-11 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
              />
            </div>
          </div>

          {/* Cédula y Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Cédula / ID</label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="identityDocument"
                  required
                  value={formData.identityDocument}
                  onChange={handleChange}
                  placeholder="V-12345678"
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Teléfono</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0412..."
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Ubicación</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Ciudad, Estado"
                className="w-full pl-11 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
              />
            </div>
          </div>

          {/* Botón Principal */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 text-sm tracking-wide disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                CONTINUAR A SELECCIÓN DE USO <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-400">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}