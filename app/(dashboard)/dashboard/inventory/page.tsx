'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Package, 
  AlertTriangle, 
  X, 
  Save, 
  CheckCircle2, 
  ArrowUpDown 
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const DEFAULT_PRODUCTS: Product[] = [
  { id: '1', name: 'Sniker Urban Black', price: 45.00, stock: 12, category: 'Calzado' },
  { id: '2', name: 'Franela Oversize Streetwear', price: 20.00, stock: 25, category: 'Ropa' },
  { id: '3', name: 'Gorra Snapback Edición Limitada', price: 15.00, stock: 8, category: 'Accesorios' },
  { id: '4', name: 'Deportivo Runner White', price: 55.00, stock: 10, category: 'Calzado' },
  { id: '5', name: 'Short Cargo Tactical', price: 28.00, stock: 18, category: 'Ropa' },
];

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Estado para el Modal (Crear / Editar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Calzado',
  });

  // Cargar inventario desde localStorage
  useEffect(() => {
    const localData = localStorage.getItem('mercadeo_inventory');
    if (localData) {
      setProducts(JSON.parse(localData));
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem('mercadeo_inventory', JSON.stringify(DEFAULT_PRODUCTS));
    }
  }, []);

  // Guardar cambios en localStorage
  const saveToLocalStorage = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('mercadeo_inventory', JSON.stringify(updatedProducts));
  };

  // Abrir modal para crear
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', category: 'Calzado' });
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
    });
    setIsModalOpen(true);
  };

  // Guardar (Crear / Editar)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;

    if (editingProduct) {
      // Modificar existente
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock, 10),
              category: formData.category,
            }
          : p
      );
      saveToLocalStorage(updated);
    } else {
      // Crear nuevo
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        category: formData.category,
      };
      saveToLocalStorage([newProduct, ...products]);
    }

    setIsModalOpen(false);
  };

  // Eliminar producto
  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const updated = products.filter((p) => p.id !== id);
      saveToLocalStorage(updated);
    }
  };

  // Filtros
  const categories = ['Todos', ...Array.from(new Set(products.map((p) => p.category)))];
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Encabezado y Acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" /> Control de Inventario
          </h1>
          <p className="text-xs text-zinc-400">Administra los productos guardados localmente.</p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="py-2.5 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 to-cyan-400 hover:brightness-110 text-xs flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" /> Agregar Producto
        </button>
      </div>

      {/* Filtros de Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
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

      {/* Tabla de Productos */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50 text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                <th className="p-4">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio (USD)</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">
                    No se encontraron productos en el inventario.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 font-bold text-white">{product.name}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-semibold">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-lime-400 font-mono">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        product.stock < 5 ? 'text-amber-400' : 'text-zinc-300'
                      }`}>
                        {product.stock < 5 && <AlertTriangle className="w-3.5 h-3.5" />}
                        {product.stock} unidades
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CREAR / EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-4">
              {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 uppercase">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-cyan-500/60"
                  placeholder="Ej: Calzado Deportivo Nitro"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 uppercase">Precio ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-cyan-500/60 font-mono"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 uppercase">Stock Inicial</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-cyan-500/60 font-mono"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 uppercase">Categoría</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-cyan-500/60"
                  placeholder="Ej: Calzado, Ropa, Accesorios"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 to-cyan-400 hover:brightness-110 text-xs uppercase tracking-wider mt-2 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Guardar Producto
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}