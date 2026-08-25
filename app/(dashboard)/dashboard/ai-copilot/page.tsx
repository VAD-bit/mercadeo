'use client';

import { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  TrendingUp, 
  AlertCircle, 
  Megaphone, 
  Copy, 
  Check, 
  RefreshCw,
  DollarSign
} from 'lucide-react';

interface SaleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Sale {
  id: string;
  date: string;
  items: SaleItem[];
  totalUSD: number;
  totalVES: number;
  paymentMethod: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function AiCopilotPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]);
  const [inventory, setInventory] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Asegurar renderizado correcto en cliente
  useEffect(() => {
    setIsMounted(true);
    
    // Cargar datos del localStorage de manera segura en cliente
    const salesData = localStorage.getItem('mercadeo_sales_history');
    if (salesData) {
      try {
        setSalesHistory(JSON.parse(salesData));
      } catch (e) {
        console.error('Error parseando ventas', e);
      }
    }

    const inventoryData = localStorage.getItem('mercadeo_inventory');
    if (inventoryData) {
      try {
        setInventory(JSON.parse(inventoryData));
      } catch (e) {
        console.error('Error parseando inventario', e);
      }
    }

    // Inicializar mensaje de bienvenida
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: '¡Hola! Soy tu Copiloto IA de ventas. Analizo tus datos locales de inventario y ventas para darte métricas, recomendaciones de stock y generar copies publicitarios para tu negocio.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Métricas calculadas localmente
  const totalSalesUSD = salesHistory.reduce((acc, sale) => acc + (sale.totalUSD || 0), 0);
  const totalTransactions = salesHistory.length;
  const lowStockProducts = inventory.filter((p) => p.stock < 5);

  // Manejar envío de mensaje
  const handleSendMessage = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsAnalyzing(true);

    setTimeout(() => {
      let aiResponseText = '';
      const lowerQuery = textToSend.toLowerCase();

      if (lowerQuery.includes('resumen') || lowerQuery.includes('ventas') || lowerQuery.includes('métricas')) {
        aiResponseText = `📊 **Resumen Financiero Local:**\n\n• **Ventas Totales:** $${totalSalesUSD.toFixed(2)} USD\n• **Transacciones:** ${totalTransactions} ventas registradas.\n• **Ticket Promedio:** $${totalTransactions > 0 ? (totalSalesUSD / totalTransactions).toFixed(2) : '0.00'} USD.\n\n💡 *Tip:* Mantén activas tus promociones en los artículos de mayor rotación.`;
      } else if (lowerQuery.includes('stock') || lowerQuery.includes('inventario') || lowerQuery.includes('agotado')) {
        if (lowStockProducts.length > 0) {
          const list = lowStockProducts.map(p => `• **${p.name}** (${p.stock} unid.)`).join('\n');
          aiResponseText = `⚠️ **Alerta de Stock Bajo:**\n\nTienes ${lowStockProducts.length} productos con stock crítico (< 5 unidades):\n\n${list}\n\nTe sugiero reponer estos artículos antes del fin de semana.`;
        } else {
          aiResponseText = `✅ **Inventario Saludable:** Todos tus productos cuentan con un nivel aceptable de stock (> 5 unidades).`;
        }
      } else if (lowerQuery.includes('copy') || lowerQuery.includes('instagram') || lowerQuery.includes('whatsapp') || lowerQuery.includes('promo')) {
        const topProduct = inventory[0]?.name || 'Colección Urbana';
        aiResponseText = `🔥 **Copy Publicitario Sugerido (Instagram/WhatsApp):**\n\n"¡Eleva tu estilo hoy mismo! 🚀 Descubre el nuevo **${topProduct}** disponible ya en nuestro catálogo.\n\n📍 Envíos a todo el país | Pagos en $ / Bs.\n📲 Escríbenos al privado para consultar catálogo o hacer tu pedido inmediato."`;
      } else {
        aiResponseText = `Entendido. He procesado tu consulta sobre "${textToSend}". Actualmente cuento con ${inventory.length} productos en inventario local y ${totalTransactions} ventas registradas. ¿Deseas un resumen de métricas, análisis de stock o un copy promocional?`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsAnalyzing(false);
    }, 800);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isMounted) {
    return (
      <div className="h-full flex items-center justify-center p-12 text-zinc-500 text-xs font-mono">
        Cargando módulo de Copiloto IA...
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6 font-sans">
      
      {/* PANEL IZQUIERDO: RESUMEN DE DATOS */}
      <div className="w-full md:w-80 space-y-4 flex flex-col">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" /> Copiloto IA
          </h1>
          <p className="text-xs text-zinc-400">Asistente inteligente sobre datos locales.</p>
        </div>

        {/* Tarjetas de Métricas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500">Ventas Registradas</span>
              <p className="text-lg font-black text-white">${totalSalesUSD.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500">Stock Crítico</span>
              <p className="text-lg font-black text-white">{lowStockProducts.length} Items</p>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 space-y-2 flex-1">
          <span className="text-xs font-bold text-zinc-300 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Consultas Rápidas
          </span>

          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => handleSendMessage('Dame un resumen de mis ventas y métricas')}
              className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 text-zinc-300 text-xs text-left font-medium transition-colors flex items-center gap-2"
            >
              <TrendingUp className="w-3.5 h-3.5 text-lime-400" /> Ver Resumen de Ventas
            </button>

            <button
              onClick={() => handleSendMessage('¿Qué productos tienen stock bajo?')}
              className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 text-zinc-300 text-xs text-left font-medium transition-colors flex items-center gap-2"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Alertas de Inventario
            </button>

            <button
              onClick={() => handleSendMessage('Genera un copy promocional para Instagram')}
              className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 text-zinc-300 text-xs text-left font-medium transition-colors flex items-center gap-2"
            >
              <Megaphone className="w-3.5 h-3.5 text-sky-400" /> Copy para Redes Sociales
            </button>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO: CHAT / CONVERSACIÓN */}
      <div className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
        
        {/* Historial de Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl relative ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-zinc-950 font-medium text-xs rounded-tr-none'
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</div>

                {msg.sender === 'ai' && (
                  <button
                    onClick={() => copyToClipboard(msg.text, msg.id)}
                    className="mt-2 text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800 w-fit"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-lime-400" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copiar Respuesta
                      </>
                    )}
                  </button>
                )}
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium py-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analizando datos locales...
            </div>
          )}
        </div>

        {/* Input de Mensaje */}
        <div className="mt-4 border-t border-zinc-800 pt-3 flex gap-2">
          <input
            type="text"
            placeholder="Pregunta a tu Copiloto IA (ej: 'Genera una oferta en $')..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/60"
          />
          <button
            onClick={() => handleSendMessage()}
            className="px-4 py-2.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-zinc-950 font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center text-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}