'use client';

import { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  PlusCircle, 
  Receipt
} from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { jsPDF } from 'jspdf';

export default function InvoicesPage() {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { storeName } = useApp();

  const [invoices, setInvoices] = useState([
    { id: 'FAC-001', client: 'Inversiones Corp C.A.', rif: 'J-12345678-0', date: '2026-08-20', total: 145.00, status: 'Emitida' },
    { id: 'FAC-002', client: 'Servicios Integrales R.L.', rif: 'J-87654321-9', date: '2026-08-22', total: 85.50, status: 'Emitida' }
  ]);

  const handleExportInvoicePDF = (invoice: typeof invoices[0]) => {
    console.log("EJECUTANDO NUEVO JSPDF PARA:", invoice.id);
    setIsExporting(invoice.id);
    
    try {
      const doc = new jsPDF();

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(storeName ? storeName.toUpperCase() : 'REALITY SHOP', 20, 20);

      doc.setFontSize(12);
      doc.setFont('Helvetica', 'normal');
      doc.text('FACTURA FISCAL OFICIAL EN PDF', 20, 28);

      doc.setLineWidth(0.5);
      doc.line(20, 32, 190, 32);

      doc.setFontSize(10);
      doc.text(`Nº de Factura: ${invoice.id}`, 20, 42);
      doc.text(`Fecha de Emisión: ${invoice.date}`, 20, 48);
      doc.text(`Cliente: ${invoice.client}`, 20, 54);
      doc.text(`RIF / C.I.: ${invoice.rif}`, 20, 60);

      doc.line(20, 68, 190, 68);

      doc.setFont('Helvetica', 'bold');
      doc.text('Descripción', 20, 76);
      doc.text('Total (USD)', 160, 76, { align: 'right' });

      doc.setFont('Helvetica', 'normal');
      doc.text('Catálogo Urbano / Artículos de Tienda', 20, 84);
      doc.text(`$${invoice.total.toFixed(2)}`, 160, 84, { align: 'right' });

      doc.line(20, 92, 190, 92);

      doc.setFont('Helvetica', 'bold');
      doc.text('TOTAL A PAGAR:', 110, 102);
      doc.text(`$${invoice.total.toFixed(2)} USD`, 180, 102, { align: 'right' });
      
      doc.setFontSize(8);
      doc.setFont('Helvetica', 'italic');
      doc.text('Documento PDF generado mediante jsPDF sin alertas.', 20, 120);

      doc.save(`Factura_${invoice.id}.pdf`);
      
      setIsExporting(null);
      setSuccessMessage(`PDF de factura ${invoice.id} descargado con éxito.`);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      setIsExporting(null);
      alert("Hubo un error al generar el PDF. Revisa la consola.");
    }
  };

  const handleCreateNewInvoice = () => {
    const newId = `FAC-00${invoices.length + 1}`;
    const newInv = {
      id: newId,
      client: 'Nuevo Cliente Mayorista C.A.',
      rif: 'J-99887766-5',
      date: new Date().toISOString().split('T')[0],
      total: 120.00,
      status: 'Emitida'
    };
    setInvoices([newInv, ...invoices]);
    setSuccessMessage(`Factura ${newId} emitida correctamente.`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="space-y-6 font-sans max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-cyan-400" /> Facturación & Recibos (jsPDF Activo)
          </h1>
          <p className="text-xs text-zinc-400">Emisión de facturas legales en PDF real sin alertas nativas.</p>
        </div>

        <div className="flex items-center gap-3">
          {successMessage && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center gap-1.5 animate-bounce">
              <CheckCircle2 className="w-4 h-4" /> {successMessage}
            </span>
          )}

          <button
            onClick={handleCreateNewInvoice}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            <PlusCircle className="w-4 h-4" /> Emitir Factura PDF
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-zinc-800 text-xs font-bold pb-3">
        <span className="text-cyan-400 border-b-2 border-cyan-400 pb-3 -mb-3 flex items-center gap-1.5">
          <FileText className="w-4 h-4" /> Facturas Emitidas ({invoices.length})
        </span>
      </div>

      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase bg-zinc-950/50">
                <th className="py-3 px-4">Nº Factura</th>
                <th className="py-3 px-4">Cliente / RIF</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Monto USD</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-800/30 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{inv.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{inv.client}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{inv.rif}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-zinc-400">{inv.date}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">${inv.total.toFixed(2)}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleExportInvoicePDF(inv)}
                      disabled={isExporting === inv.id}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-[11px] transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      {isExporting === inv.id ? 'Generando PDF...' : 'Exportar PDF'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}