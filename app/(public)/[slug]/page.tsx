'use client';

import { useState, useEffect, use } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  MessageCircle, 
  Store, 
  Loader2 
} from 'lucide-react';

interface BusinessProfile {
  id: string;
  business_name: string;
  phone: string | null;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  price_usd: number;
  stock: number;
  image_url: string | null;
  category: string | null;
}

interface CartItem extends Product {
  quantity: number;
}

export default function PublicCatalogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);

      // 1. Obtener perfil del comercio
      const { data: businessData, error } = await (supabase.from('profiles') as any)
        .select('id, business_name, phone, slug')
        .eq('slug', resolvedParams.slug)
        .single();

      if (error || !businessData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile(businessData);

      // 2. Obtener productos con stock disponible
      const { data: productsData } = await (supabase.from('products') as any)
        .select('*')
        .eq('business_id', businessData.id)
        .gt('stock', 0)
        .order('created_at', { ascending: false });

      if (productsData) setProducts(productsData);
      setLoading(false);
    };

    fetchCatalog();
  }, [resolvedParams.slug]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            const originalProduct = products.find((p) => p.id === id);
            if (newQty <= 0) return null;
            if (originalProduct && newQty > originalProduct.stock) return item;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price_usd * item.quantity,
    0
  );

  const handleSendWhatsApp = () => {
    if (!profile?.phone || cart.length === 0) return;

    let message = `¡Hola *${profile.business_name}*! Quisiera hacer el siguiente pedido:\n\n`;

    cart.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} - $${(item.price_usd * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total a pagar:* $${total.toFixed(2)}`;

    const cleanPhone = profile.phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0A2540] animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 text-center">
        <Store className="w-12 h-12 text-slate-300 mb-3" />
        <h1 className="text-lg font-bold text-[#0A2540]">Catálogo no encontrado</h1>
        <p className="text-xs text-slate-500 mt-1">El negocio que buscas no existe o cambió de dirección.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28">
      {/* Header del Negocio */}
      <header className="bg-[#0A2540] text-white py-8 px-4 text-center sticky top-0 z-10 shadow-md">
        <span className="text-[#00D2FF] font-black text-xs uppercase tracking-widest block mb-1">
          Catálogo Digital
        </span>
        <h1 className="text-2xl font-black">{profile?.business_name}</h1>
      </header>

      {/* Buscador y Contenido */}
      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] shadow-sm"
          />
        </div>

        {/* Galería de Productos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <ShoppingBag className="w-10 h-10 stroke-1 mx-auto" />
            <p className="text-xs font-semibold">No hay productos disponibles por ahora.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => {
              const inCart = cart.find((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-full h-36 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-slate-300" />
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-[#0A2540] truncate">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-black text-[#0A2540]">
                      ${product.price_usd.toFixed(2)}
                    </span>

                    {inCart ? (
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-1 hover:bg-slate-200 text-slate-700 rounded-l-xl"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">
                          {inCart.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="p-1 hover:bg-slate-200 text-slate-700 rounded-r-xl"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="p-2 bg-[#0A2540] hover:bg-slate-800 text-[#00D2FF] rounded-xl transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Bar Flotante de Resumen y WhatsApp */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-2xl z-20">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {cart.length} producto(s)
              </span>
              <span className="text-lg font-black text-[#0A2540]">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleSendWhatsApp}
              disabled={!profile?.phone}
              className="flex items-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md disabled:opacity-50"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir por WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}