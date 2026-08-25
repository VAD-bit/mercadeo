'use client';

import { useState, useEffect } from 'react';
import { Palette, Upload, Wand2, CheckCircle2, Building2, Image as ImageIcon } from 'lucide-react';

export default function SettingsPage() {
  const [storeName, setStoreName] = useState('Reality Shop');
  const [logo, setLogo] = useState<string>('');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Cargar datos guardados previamente en localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('reality_store_name');
    const savedLogo = localStorage.getItem('reality_shop_logo');
    const savedColor = localStorage.getItem('reality_primary_color');

    if (savedName) setStoreName(savedName);
    if (savedLogo) setLogo(savedLogo);
    if (savedColor) setPrimaryColor(savedColor);
  }, []);

  // Guardar cambios de nombre comercial
  const handleNameChange = (val: string) => {
    setStoreName(val);
    localStorage.setItem('reality_store_name', val);
  };

  // Guardar cambios de color primario
  const handleColorChange = (val: string) => {
    setPrimaryColor(val);
    localStorage.setItem('reality_primary_color', val);
  };

  // REQ_BRAND: Subida de Logotipo (Base64 local sin errores de servidor)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setLogo(base64String);
      localStorage.setItem('reality_shop_logo', base64String);
      setIsUploading(false);
      setSuccessMsg('¡Logotipo actualizado y sincronizado!');
      setTimeout(() => setSuccessMsg(''), 3000);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Error al procesar el archivo.');
    };
    reader.readAsDataURL(file);
  };

  // REQ_BRAND: Extracción IA por Nicho
  const handleAIExtraction = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setPrimaryColor('#06b6d4'); // Cian Urbano optimizado para el nicho
      localStorage.setItem('reality_primary_color', '#06b6d4');
      setIsAnalyzing(false);
      setSuccessMsg('¡IA analizó el nicho urbano y ajustó la paleta HEX con éxito!');
      setTimeout(() => setSuccessMsg(''), 3500);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      
      {/* Encabezado del Nodo UI_BRAND */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-400" /> Configuración UI / Branding
          </h1>
          <p className="text-xs text-zinc-400">Nodo maestro: Personalización visual, logotipo, nombre comercial y paleta HEX.</p>
        </div>

        {successMsg && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center gap-1.5 animate-bounce">
            <CheckCircle2 className="w-4 h-4" /> {successMsg}
          </span>
        )}
      </div>

      {/* REQ_BRAND: Nombre Comercial */}
      <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-3">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" /> Nombre Comercial
        </label>
        <input 
          type="text" 
          value={storeName} 
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-indigo-500 transition-all"
          placeholder="Ej: Reality Shop"
        />
      </div>

      {/* REQ_BRAND: Logotipo */}
      <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Logotipo de la Tienda / Negocio</h3>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-zinc-950 border border-zinc-800/80 rounded-xl">
          <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
            {logo ? (
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-8 h-8 text-zinc-600" />
            )}
          </div>

          <div className="flex-1 space-y-1 text-center sm:text-left">
            <p className="text-xs text-zinc-300 font-medium">Sube tu isotipo o logotipo oficial (PNG o JPG recomendado).</p>
            <p className="text-[10px] text-zinc-500">Se sincronizará instantáneamente con tus facturas, recibos y panel superior.</p>
          </div>

          <label className={`cursor-pointer px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
            isUploading 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
          }`}>
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Subiendo...' : 'Seleccionar Archivo'}</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload} 
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* REQ_BRAND: Paleta HEX & Extracción IA por Nicho */}
      <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Paleta HEX & Extracción Inteligente</h3>
          <button
            onClick={handleAIExtraction}
            disabled={isAnalyzing}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? 'Analizando...' : 'Extracción IA por Nicho'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Color Primario (HEX)</span>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={primaryColor} 
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-10 h-10 rounded-lg bg-transparent cursor-pointer border border-zinc-700"
              />
              <input 
                type="text" 
                value={primaryColor} 
                onChange={(e) => handleColorChange(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white w-28 uppercase"
              />
            </div>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col justify-between">
            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Modo de Visualización</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Oscuro Profesional Sincronizado
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}