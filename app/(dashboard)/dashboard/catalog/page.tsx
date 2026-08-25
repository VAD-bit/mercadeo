'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  Trash2, 
  Plus, 
  Minus, 
  ExternalLink, 
  Save, 
  Store 
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function CatalogVipPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('584120000000');
  const [savedWhatsapp, setSavedWhatsapp] = useState('584120000000');
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const localProducts = localStorage.getItem('mercadeo_inventory');
    if (localProducts) {
      try {
        setProducts(JSON.parse(localProducts));
      } catch (e) {
        console.error('Error cargando inventario local', e);
      }
    }

    const localPhone = localStorage.getItem('mercadeo_catalog_whatsapp');
    if (localPhone) {
      setWhatsappNumber(localPhone);
      setSavedWhatsapp(localPhone);
    }
  }, []);

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mercadeo_catalog_whatsapp', whatsappNumber);
    setSavedWhatsapp(whatsappNumber);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalUSD = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `🛒 *NUEVO PEDIDO DESDE CATÁLOGO VIP*\n\n`;
    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n💰 *TOTAL:* $${totalUSD.toFixed(2)} USD`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${savedWhatsapp}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isMounted) return null;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Encabezado y Configuración de WhatsApp */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" /> Catálogo Online VIP
          </h1>
          <p className="text-xs text-zinc-400">Canal de venta directa con envío automático de pedidos a WhatsApp.</p>
        </div>

        <form onSubmit={handleSavePhone} className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-500">+</span>
            <input
              type="text"
              placeholder="584120000000"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl pl-6 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/60 w-44"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaved ? 'Guardado' : 'Guardar'}
          </button>
        </form>
      </div>

      {/* Grid: Productos + Carrito VIP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Lado Izquierdo: Buscador e Ítems */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar items en el catálogo VIP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProducts.length === 0 ? (
              <div className="col-span-2 p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl text-center text-xs text-zinc-500">
                No hay productos en inventario para mostrar en el catálogo.
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-zinc-700 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-950 text-zinc-500 border border-zinc-800">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-2">{product.name}</h3>
                    <p className="text-base font-black text-emerald-400 font-mono mt-1">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 hover:text-emerald-400 text-zinc-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Agregar al Carrito
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Lado Derecho: Carrito Venta Directa */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" /> Carrito Venta Directa
              </h2>
              <span className="text-xs font-mono text-zinc-500">{cart.length} items</span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 text-xs text-zinc-500">
                El carrito está vacío. Agrega productos para procesar la orden por WhatsApp.
              </div>
            ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-xl flex items-center justify-between">
                    <div className="flex-1 pr-2">
                      <p className="text-xs font-bold text-white truncate">{item.name}</p>
                      <p className="text-[11px] font-mono text-emerald-400">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-zinc-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-zinc-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-zinc-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-zinc-800 pt-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase font-bold">Total Estrellas:</span>
              <span className="text-lg font-black text-emerald-400 font-mono">${totalUSD.toFixed(2)} USD</span>
            </div>

            <button
              onClick={handleSendWhatsAppOrder}
              disabled={cart.length === 0}
              className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                cart.length > 0
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Enviar Pedido a WhatsApp
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}