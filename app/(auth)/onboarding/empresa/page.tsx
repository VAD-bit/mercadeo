'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  AlertCircle,
  Loader2,
  Scan
} from 'lucide-react';

export default function EmpresaRegistrationPage() {
  const router = useRouter();
  const [hasRif, setHasRif] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<{
    rifNumber: string;
    fiscalName: string;
    fiscalAddress: string;
  } | null>(null);

  // Campos de formulario para empresas sin RIF / Datos Operativos
  const [formData, setFormData] = useState({
    businessName: '',
    personType: 'natural', // 'natural' | 'juridica'
    description: '',
    niche: 'Calzado y Moda',
    clientVolume: '10-50',
    approxIncome: '',
    approxExpenses: ''
  });

  // Simulación de OCR / Módulo IA para RIF
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);

    // Simulación de lectura con IA/OCR (2 segundos)
    setTimeout(() => {
      setScannedData({
        rifNumber: 'J-501928340',
        fiscalName: 'DISTRIBUIDORA DE MODA REALITY C.A.',
        fiscalAddress: 'Av. Bolívar, CC Multicentro, Local 12 - Maracay, Aragua'
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleCompleteStep = () => {
    const session = JSON.parse(localStorage.getItem('mercadeo_user_session') || '{}');
    const updatedSession = {
      ...session,
      rifData: scannedData,
      operationalData: formData,
      step: 3
    };
    
    localStorage.setItem('mercadeo_user_session', JSON.stringify(updatedSession));
    router.push('/onboarding/checkout');
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-zinc-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-sky-500/20 via-cyan-500/15 to-lime-500/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl relative z-10">
        <div className="bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Paso 3 de 5 · Registro de Empresa
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-3">Perfil Fiscal y Operativo</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Validación de información legal para automatización de facturas y contabilidad.
            </p>
          </div>

          {/* Pregunta inicial: ¿Tiene RIF? */}
          {hasRif === null && (
            <div className="space-y-4">
              <label className="block text-sm font-bold text-zinc-200 text-center mb-4">
                ¿Tu emprendimiento o empresa cuenta con RIF Jurídico / Firma Personal?
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setHasRif(true)}
                  className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-cyan-500/60 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Sí, poseo RIF</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Escanear el documento con IA para extraer datos fiscales automáticamente.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setHasRif(false)}
                  className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-lime-500/60 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400 mb-3 group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">No poseo RIF aún</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Registrar datos operativos de comercio informal o persona natural.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* RUTA A: CON RIF (Módulo IA / OCR) */}
          {hasRif === true && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Módulo OCR / Escáner IA
                </span>
                <button
                  onClick={() => { setHasRif(null); setScannedData(null); }}
                  className="text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Cambiar opción
                </button>
              </div>

              {!scannedData ? (
                <div className="border-2 border-dashed border-zinc-800 hover:border-cyan-500/50 rounded-2xl p-8 text-center bg-zinc-950/40 transition-colors relative">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {isScanning ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-3" />
                      <p className="text-sm font-bold text-white">Analizando documento RIF con IA...</p>
                      <p className="text-xs text-zinc-500 mt-1">Extrayendo RIF, Razón Social y Dirección Fiscal</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-white">Arrastra o selecciona el PDF/Imagen de tu RIF</p>
                      <p className="text-xs text-zinc-500 mt-1">Formatos soportados: JPG, PNG, PDF (Máx 5MB)</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-lime-950/20 border border-lime-800/50 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider">Documento Verificado</h4>
                      <p className="text-xs text-zinc-300 mt-0.5">Los datos fiscales se extrajeron con éxito mediante el módulo IA.</p>
                    </div>
                  </div>

                  <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3 text-xs">
                    <div>
                      <span className="text-zinc-500 block uppercase font-semibold text-[10px]">Número de RIF</span>
                      <span className="font-bold text-white text-sm">{scannedData.rifNumber}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block uppercase font-semibold text-[10px]">Razón Social</span>
                      <span className="font-bold text-white text-sm">{scannedData.fiscalName}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block uppercase font-semibold text-[10px]">Dirección Fiscal</span>
                      <span className="text-zinc-300">{scannedData.fiscalAddress}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCompleteStep}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 transition-all flex items-center justify-center gap-2 text-sm tracking-wide mt-4"
                  >
                    CONFIRMAR Y CONTINUAR A PLANES <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* RUTA B: SIN RIF (Datos Operativos) */}
          {hasRif === false && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-wider">
                  Datos Operativos del Comercio
                </span>
                <button
                  onClick={() => setHasRif(null)}
                  className="text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Cambiar opción
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Tipo de Persona
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, personType: 'natural' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-colors ${
                      formData.personType === 'natural'
                        ? 'bg-lime-500/10 border-lime-400 text-lime-400'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Persona Natural
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, personType: 'juridica' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-colors ${
                      formData.personType === 'juridica'
                        ? 'bg-lime-500/10 border-lime-400 text-lime-400'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Firma Jurídica
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Volumen de Clientes / Mes
                  </label>
                  <select
                    value={formData.clientVolume}
                    onChange={(e) => setFormData({ ...formData, clientVolume: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500/60"
                  >
                    <option value="1-10">1 - 10 Clientes</option>
                    <option value="10-50">10 - 50 Clientes</option>
                    <option value="50-200">50 - 200 Clientes</option>
                    <option value="200+">Más de 200 Clientes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Ingreso Aprox. Mensual ($)
                  </label>
                  <input
                    type="number"
                    placeholder="Ej. 1500"
                    value={formData.approxIncome}
                    onChange={(e) => setFormData({ ...formData, approxIncome: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Modelo de Negocio / Productos Principales
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej. Venta de calzado deportivo importado al mayor y detal con envíos nacionales."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500/60 resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleCompleteStep}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-zinc-950 bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 hover:brightness-110 transition-all flex items-center justify-center gap-2 text-sm tracking-wide mt-4"
              >
                CONTINUAR A SELECCIÓN DE PLANES <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}