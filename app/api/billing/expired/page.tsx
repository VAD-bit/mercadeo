'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ShieldAlert, CreditCard, LogOut, MessageCircle } from 'lucide-react';

export default function BillingExpiredPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-xl font-black text-[#0A2540]">
            Prueba Finalizada
          </h1>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Tu período de prueba gratuita de 14 días ha expirado. Para seguir usando **MERCADEO** (POS, Inventario y Catálogo Web) debes activar tu suscripción mensual de **$5.99**.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2">
          <div className="flex justify-between text-xs font-bold text-[#0A2540]">
            <span>Plan Mercadeo Pro</span>
            <span>$5.99 USD / mes</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Aceptamos Pago Móvil (tasa oficial BCV) y Zelle.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="https://wa.me/584120000000?text=Hola,%20quiero%20activar%20mi%20suscripción%20de%20Mercadeo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pagar por WhatsApp</span>
          </a>

          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}