import { createClient } from '@/lib/supabase/server';
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  ArrowUpRight, 
  Store 
} from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await (supabase.from('profiles') as any)
    .select('*')
    .eq('id', user?.id)
    .single();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0A2540]">
            ¡Hola, {profile?.business_name || 'Comerciante'}! 👋
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aquí tienes el resumen de tu negocio en tiempo real.
          </p>
        </div>

        <Link
          href="/dashboard/pos"
          className="inline-flex items-center gap-2 bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-sm"
        >
          <ShoppingBag className="w-4 h-4 text-[#00D2FF]" /> Nueva Venta POS
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ventas Hoy
            </span>
            <div className="p-2 bg-emerald-50 text-[#22C55E] rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0A2540]">$0.00</div>
          <span className="text-[11px] text-slate-400 block">
            0 transacciones registradas
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Productos en Stock
            </span>
            <div className="p-2 bg-cyan-50 text-[#00D2FF] rounded-xl">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0A2540]">0</div>
          <Link
            href="/dashboard/inventory"
            className="text-[11px] font-bold text-[#0A2540] hover:underline flex items-center gap-1"
          >
            Gestionar inventario <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Estado del Plan
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0A2540] capitalize">
            {profile?.subscription_status === 'trialing' ? 'Prueba Gratis' : 'Activo'}
          </div>
          <span className="text-[11px] text-slate-400 block">
            Suscripción mensual: $5.99
          </span>
        </div>
      </div>
    </div>
  );
}