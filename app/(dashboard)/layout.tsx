'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppProvider, useApp } from '@/app/context/AppContext';
import { 
  LayoutDashboard, 
  DollarSign, 
  Package, 
  ShoppingBag, 
  FileText, 
  Users, 
  FileSpreadsheet, 
  Bell, 
  Megaphone, 
  Vault, 
  Palette, 
  Menu, 
  X, 
  LogOut 
} from 'lucide-react';

const navigation = [
  { name: 'General', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Finanzas & Tesorería', href: '/dashboard/finances', icon: DollarSign },
  { name: 'Catálogo & Inventario', href: '/dashboard/inventory', icon: Package },
  { name: 'Punto de Venta (POS)', href: '/dashboard/pos', icon: ShoppingBag },
  { name: 'Facturación & Fiscal', href: '/dashboard/invoices', icon: FileText },
  { name: 'Nómina y Personal', href: '/dashboard/payroll', icon: Users },
  { name: 'Paquete Contable', href: '/dashboard/accounting', icon: FileSpreadsheet },
  { name: 'Alertas & Recordatorios', href: '/dashboard/alerts', icon: Bell },
  { name: 'Proyección & Marketing', href: '/dashboard/marketing', icon: Megaphone },
  { name: 'Fondo de Emergencia', href: '/dashboard/emergency', icon: Vault },
  { name: 'Configuración UI / Branding', href: '/dashboard/settings', icon: Palette },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  // Protección por si el contexto carga tarde o viene vacío
  const app = useApp() || {};
  const storeName = app.storeName || 'Mi Tienda';
  const logoUrl = app.logoUrl || '';
  const primaryColor = app.primaryColor || '#00D2FF';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#050b14] text-white font-sans flex antialiased" style={{ '--primary-glow': primaryColor } as React.CSSProperties}>
      
      {/* Fondo Ambiental Dinámico basado en el color del cliente */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full opacity-10 blur-[120px]" style={{ backgroundColor: primaryColor }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-900/10 blur-[120px]" />
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:w-72 flex-col fixed inset-y-0 z-30 bg-[#071321]/90 backdrop-blur-xl border-r border-slate-800/80 p-6 shadow-2xl">
        <div className="flex items-center gap-3 px-2 mb-8">
          {/* Contenedor del Logotipo Dinámico */}
          <div 
            className="w-11 h-11 rounded-2xl p-[2px] shadow-lg shrink-0 flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: `linear-gradient(to top right, ${primaryColor}, #00D2FF)` }}
          >
            <div className="w-full h-full bg-[#0a192f] rounded-[14px] flex items-center justify-center overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt={storeName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-black text-sm tracking-tighter" style={{ color: primaryColor }}>
                  {storeName ? storeName.charAt(0).toUpperCase() : 'M'}
                </span>
              )}
            </div>
          </div>
          
          <div className="overflow-hidden">
            <span className="font-black text-base tracking-wider block truncate text-white">
              {storeName}
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight block">Panel de Control v2.6</span>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1 overflow-y-auto pr-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'text-zinc-950 shadow-lg font-black scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
                style={isActive ? { backgroundColor: primaryColor } : {}}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-800/80 mt-auto bg-transparent">
          <Link
            href="/login"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-72 bg-[#071321] border-r border-slate-800 p-6 flex flex-col z-50 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-2xl p-[2px] shadow-lg shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ backgroundImage: `linear-gradient(to top right, ${primaryColor}, #00D2FF)` }}
                >
                  <div className="w-full h-full bg-[#0a192f] rounded-[14px] flex items-center justify-center overflow-hidden">
                    {logoUrl ? (
                      <img src={logoUrl} alt={storeName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-black text-sm" style={{ color: primaryColor }}>
                        {storeName ? storeName.charAt(0).toUpperCase() : 'M'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <span className="font-black text-sm tracking-wider block text-white truncate">
                    {storeName}
                  </span>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1.5 flex-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'text-zinc-950 font-black'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                    style={isActive ? { backgroundColor: primaryColor } : {}}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950' : 'text-slate-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen z-10">
        <header className="h-16 border-b border-slate-800/80 bg-[#071321]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-400 hidden sm:inline-block">Plataforma Operativa de Gestión</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold" style={{ color: primaryColor }}>Modo Activo (USD)</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <DashboardContent>{children}</DashboardContent>
    </AppProvider>
  );
}