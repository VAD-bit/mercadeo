'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Banknote, 
  QrCode, 
  CheckCircle2, 
  Printer, 
  X, 
  PackageCheck,
  DollarSign,
  Settings2,
  Sparkles
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

type RateType = 'bcv_usd' | 'bcv_eur' | 'promedio' | 'usdt' | 'custom' | 'fx_only';

const DEFAULT_RATES: Record<RateType, { label: string; value: number }> = {
  bcv_usd: { label: 'BCV ($)', value: 36.50 },
  bcv_eur: { label: 'BCV (€)', value: 39.80 },
  promedio: { label: 'Promedio / Paralelo', value: 41.20 },
  usdt: { label: 'USDT / Binance', value: 41.80 },
  custom: { label: 'Tasa Propia', value: 40.00 },
  fx_only: { label: 'Solo Divisas ($)', value: 1.00 }
};

const DEFAULT_PRODUCTS: Product[] = [
  { id: '1', name: 'Sniker Urban Black', price: 45.00, stock: 12, category: 'Calzado' },
  { id: '2', name: 'Franela Oversize Streetwear', price: 20.00, stock: 25, category: 'Ropa' },
  { id: '3', name: 'Gorra Snapback Edición Limitada', price: 15.00, stock: 8, category: 'Accesorios' },
  { id: '4', name: 'Deportivo Runner White', price: 55.00, stock: 10, category: 'Calzado' },
  { id: '5', name: 'Short Cargo Tactical', price: 28.00, stock: 18, category: 'Ropa' },
];

export default function PosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Configuración de Tasas
  const [rateType, setRateType] = useState<RateType>('bcv_usd');
  const [customRate, setCustomRate] = useState<number>(40.00);

  // Modal de Pago y Checkout
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pagomovil' | 'efectivo' | 'zelle' | 'binance'>('pagomovil');
  const [saleCompleted, setSaleCompleted] = useState(false);

  // Cargar productos de localStorage
  useEffect(() => {
    const localData = localStorage.getItem('mercadeo_inventory');
    if (localData) {
      setProducts(JSON.parse(localData));
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem('mercadeo_inventory', JSON.stringify(DEFAULT_PRODUCTS));
    }
  }, []);

  // Calcular valor de la tasa activa
  const getActiveRateValue = () => {
    if (rateType === 'custom') return customRate;
    return DEFAULT_RATES[rateType].value;
  };

  const activeRateValue = getActiveRateValue();

  // Carrito: Agregar
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prevCart;
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Carrito: Modificar Cantidad
  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
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

  // Totales de la Cuenta
  const subtotalUSD = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalVES = rateType === 'fx_only' ? 0 : subtotalUSD * activeRateValue;

  // Ajustar automáticamente método de pago si cambia a solo divisas
  useEffect(() => {
    if (rateType === 'fx_only' && paymentMethod === 'pagomovil') {
      setPaymentMethod('efectivo');
    }
  }, [rateType, paymentMethod]);

  // Procesar Venta
  const handleProcessSale = () => {
    const updatedProducts = products.map((prod) => {
      const cartItem = cart.find((item) => item.id === prod.id);
      if (cartItem) {
        return { ...prod, stock: prod.stock - cartItem.quantity };
      }
      return prod;
    });

    setProducts(updatedProducts);
    localStorage.setItem('mercadeo_inventory', JSON.stringify(updatedProducts));

    const currentSales = JSON.parse(localStorage.getItem('mercadeo_sales_history') || '[]');
    const newSale = {
      id: 'V-' + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      items: cart,
      totalUSD: subtotalUSD,
      rateType,
      appliedRate: activeRateValue,
      totalVES,
      paymentMethod,
    };
    localStorage.setItem('mercadeo_sales_history', JSON.stringify([newSale, ...currentSales]));

    setSaleCompleted(true);
  };

  const resetPos = () => {
    setCart([]);
    setIsPaymentModalOpen(false);
    setSaleCompleted(false);
  };

  const categories = ['Todos', ...Array.from(new Set(products.map((p) => p.category)))];
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-6 font-sans">
      
      {/* SECCIÓN IZQUIERDA: CATÁLOGO */}
      <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
        
        {/* Buscador y Categorías */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Productos */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 pr-1">
          {filteredProducts.map((product) => {
            const inCart = cart.find((item) => item.id === product.id);
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                onClick={() => !isOutOfStock && addToCart(product)}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer select-none relative ${
                  isOutOfStock
                    ? 'bg-zinc-950/40 border-zinc-900 opacity-50 cursor-not-allowed'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-cyan-500/50 hover:bg-zinc-900'
                }`}
              >
                {inCart && (
                  <span className="absolute top-2 right-2 bg-cyan-400 text-zinc-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {inCart.quantity}
                  </span>
                )}

                <div>
                  <div className="w-full h-20 bg-zinc-950 rounded-xl mb-3 flex items-center justify-center text-zinc-700">
                    <PackageCheck className="w-8 h-8 opacity-40" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">{product.category}</span>
                  <h3 className="text-xs font-bold text-white line-clamp-2 mt-0.5">{product.name}</h3>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-zinc-800/60 pt-2">
                  <span className="text-sm font-black text-lime-400">${product.price.toFixed(2)}</span>
                  <span className={`text-[10px] font-semibold ${product.stock < 5 ? 'text-amber-400' : 'text-zinc-500'}`}>
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN DERECHA: CARRITO & SELECTOR DE TASA */}
      <div className="w-full md:w-80 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-cyan-400" /> Carrito de Venta
            </h2>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="text-[10px] text-red-400 hover:text-red-300 font-semibold"
              >
                Vaciar
              </button>
            )}
          </div>

          {/* Items */}
          <div className="max-h-[220px] overflow-y-auto my-3 space-y-2 pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-zinc-600">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs font-medium">No hay productos seleccionados</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
                  <div className="flex-1 pr-2">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <span className="text-[10px] text-zinc-400">${item.price.toFixed(2)} c/u</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white min-w-[16px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-5 h-5 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SELECTOR DE TASA DE CONVERSIÓN */}
        <div className="border-t border-zinc-800 pt-3 space-y-3">
          
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Settings2 className="w-3.5 h-3.5" /> Tasa de Cambio
              </span>
              {rateType !== 'fx_only' && (
                <span className="text-[11px] font-mono text-lime-400 font-bold">
                  {activeRateValue.toFixed(2)} VES/$
                </span>
              )}
            </div>

            <select
              value={rateType}
              onChange={(e) => setRateType(e.target.value as RateType)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/60"
            >
              <option value="bcv_usd">Tasa BCV ($)</option>
              <option value="bcv_eur">Tasa BCV (€)</option>
              <option value="promedio">Promedio / Paralelo</option>
              <option value="usdt">Tasa USDT / Binance</option>
              <option value="custom">Tasa Propia (Personalizada)</option>
              <option value="fx_only">Exclusivo Divisas (Solo $)</option>
            </select>

            {/* Campo si la Tasa es Propia */}
            {rateType === 'custom' && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">Valor Tasa:</span>
                <input
                  type="number"
                  step="0.10"
                  value={customRate}
                  onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}
          </div>

          {/* Resumen de Pago */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-zinc-300">TOTAL USD</span>
              <span className="text-xl font-black text-lime-400">${subtotalUSD.toFixed(2)}</span>
            </div>

            {rateType !== 'fx_only' ? (
              <div className="flex justify-between items-center text-xs text-zinc-400 pb-2">
                <span>TOTAL BS</span>
                <span className="font-bold text-white font-mono">
                  Bs. {totalVES.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ) : (
              <div className="text-[10px] text-amber-400/90 font-semibold pb-2">
                * Venta configurada exclusivamente en divisas.
              </div>
            )}
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => setIsPaymentModalOpen(true)}
            className="w-full py-3 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
          >
            COBRAR VENTA
          </button>
        </div>
      </div>

      {/* MODAL CHECKOUT */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6 relative shadow-2xl">
            
            <button
              onClick={resetPos}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!saleCompleted ? (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white">Finalizar Transacción</h3>
                
                {/* Desglose de Pago */}
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Monto Total a Cobrar:</span>
                    <span className="font-bold text-lime-400">${subtotalUSD.toFixed(2)}</span>
                  </div>

                  {rateType !== 'fx_only' && (
                    <div className="flex justify-between text-sm font-bold text-white">
                      <span>Monto en Bolívares:</span>
                      <span className="font-mono text-cyan-400">
                        Bs. {totalVES.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-900">
                    <span>Tasa Aplicada:</span>
                    <span className="font-semibold text-zinc-300">
                      {DEFAULT_RATES[rateType]?.label || 'Personalizada'} ({rateType === 'fx_only' ? 'Sin Conversión' : `${activeRateValue} VES/$`})
                    </span>
                  </div>
                </div>

                {/* Métodos de Pago Permitidos */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase">Método de Pago</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {rateType !== 'fx_only' && (
                      <button
                        onClick={() => setPaymentMethod('pagomovil')}
                        className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 ${
                          paymentMethod === 'pagomovil' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <QrCode className="w-4 h-4" /> Pago Móvil
                      </button>
                    )}

                    <button
                      onClick={() => setPaymentMethod('efectivo')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 ${
                        paymentMethod === 'efectivo' ? 'bg-lime-500/20 border-lime-400 text-lime-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Banknote className="w-4 h-4" /> Efectivo
                    </button>

                    <button
                      onClick={() => setPaymentMethod('zelle')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 ${
                        paymentMethod === 'zelle' ? 'bg-sky-500/20 border-sky-400 text-sky-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" /> Zelle
                    </button>

                    <button
                      onClick={() => setPaymentMethod('binance')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 ${
                        paymentMethod === 'binance' ? 'bg-amber-500/20 border-amber-400 text-amber-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" /> Binance
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleProcessSale}
                  className="w-full py-3.5 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 to-cyan-400 hover:brightness-110 text-xs uppercase tracking-wider mt-2"
                >
                  CONFIRMAR Y REGISTRAR VENTA
                </button>
              </div>
            ) : (
              /* ÉXITO Y RECIBO */
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 bg-lime-500/20 border border-lime-400 rounded-full flex items-center justify-center mx-auto text-lime-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">¡Venta Registrada!</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">El inventario se ha actualizado en localStorage.</p>
                </div>

                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-left text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between text-zinc-500 text-[10px]">
                    <span>RECIBO DE COMPRA</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                  {cart.map((i) => (
                    <div key={i.id} className="flex justify-between text-zinc-300">
                      <span>{i.quantity}x {i.name}</span>
                      <span>${(i.price * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="border-t border-zinc-800 pt-1 space-y-0.5">
                    <div className="flex justify-between font-bold text-lime-400">
                      <span>TOTAL USD</span>
                      <span>${subtotalUSD.toFixed(2)}</span>
                    </div>
                    {rateType !== 'fx_only' && (
                      <div className="flex justify-between text-zinc-400 text-[11px]">
                        <span>TOTAL BS ({activeRateValue} VES)</span>
                        <span>Bs. {totalVES.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" /> Imprimir Recibo
                  </button>
                  <button
                    onClick={resetPos}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-400 text-zinc-950 font-bold text-xs"
                  >
                    NUEVA VENTA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}