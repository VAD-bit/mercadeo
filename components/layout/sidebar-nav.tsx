'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useApp } from '@/app/context/AppContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Store,
  Bot,
  LogOut,
  ExternalLink,
} from 'lucide-react';

interface SidebarNavProps {
  businessName?: string;
  slug?: string;
}

export function SidebarNav({ businessName = 'Mi Negocio', slug }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { logoUrl, storeName } = useApp();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const menuItems = [
    {
      name: 'Resumen',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Punto de Venta (POS)',
      href: '/dashboard/pos',
      icon: ShoppingBag,
    },
    {
      name: 'Inventario',
      href: '/dashboard/inventory',
      icon: Package,
    },
    {
      name: 'Mi Catálogo Web',
      href: '/dashboard/catalog',
      icon: Store,
    },
    {
      name: 'Copiloto IA',
      href: '/dashboard/ai-copilot',
      icon: Bot,
    },
  ];

  return (
    <aside className="w-64 bg-[#071321] text-white flex flex-col justify-between h-screen sticky top-0 border-r border-slate-800/80 shadow-2xl">
      <div>
        {/* Cabecera con Logotipo Dinámico basado en el Branding de Mercadeo */}
        <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#10b981] via-[#00D2FF] to-[#0284c7] p-[2px] shadow-lg shadow-cyan-500/20 shrink-0">
            <div className="w-full h-full bg-[#0a192f] rounded-[14px] flex items-center justify-center overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-cyan-400 font-black text-sm tracking-tighter">M</span>
              )}
            </div>
          </div>
          <div className="overflow-hidden">
            <span className="bg-gradient-to-r from-[#00D2FF] to-[#34d399] bg-clip-text text-transparent font-black text-base tracking-wider block">
              MERCADEO
            </span>
            <span className="text-[11px] text-slate-400 font-semibold truncate max-w-[150px] block">
              {storeName || businessName}
            </span>
          </div>
        </div>

        {/* Navegación Principal */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00D2FF] to-[#0284c7] text-[#071321] shadow-lg shadow-cyan-500/25 font-black scale-[1.02]'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#071321]' : 'text-cyan-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Pie del Sidebar */}
      <div className="p-4 border-t border-slate-800/80 space-y-2 bg-[#050e18]/50">
        {slug && (
          <a
            href={`https://mercadeo.app/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800 rounded-xl text-[11px] font-bold text-cyan-300 transition-colors border border-cyan-500/10"
          >
            <span className="truncate">Ver Catálogo Público</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
          </a>
        )}

        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}