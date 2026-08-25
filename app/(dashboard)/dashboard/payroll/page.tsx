'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  Award, 
  Briefcase, 
  Trash2, 
  CheckCircle2, 
  Search 
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  baseSalaryUSD: number;
  commissionPercentage: number;
  salesVolumeUSD: number;
  status: 'Activo' | 'Inactivo';
}

export default function PayrollPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'EMP-001', name: 'Carlos Mendoza', position: 'Vendedor Principal', baseSalaryUSD: 250, commissionPercentage: 3, salesVolumeUSD: 1400, status: 'Activo' },
    { id: 'EMP-002', name: 'María Gómez', position: 'Encargada de Inventario', baseSalaryUSD: 300, commissionPercentage: 0, salesVolumeUSD: 0, status: 'Activo' },
  ]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    baseSalaryUSD: '',
    commissionPercentage: '',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.position || !newEmployee.baseSalaryUSD) return;

    const emp: Employee = {
      id: `EMP-${(employees.length + 1).toString().padStart(3, '0')}`,
      name: newEmployee.name,
      position: newEmployee.position,
      baseSalaryUSD: parseFloat(newEmployee.baseSalaryUSD),
      commissionPercentage: parseFloat(newEmployee.commissionPercentage || '0'),
      salesVolumeUSD: 0,
      status: 'Activo',
    };

    setEmployees([...employees, emp]);
    setNewEmployee({ name: '', position: '', baseSalaryUSD: '', commissionPercentage: '' });
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const calculateTotalPay = (emp: Employee) => {
    const commissionUSD = (emp.salesVolumeUSD * emp.commissionPercentage) / 100;
    return emp.baseSalaryUSD + commissionUSD;
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.position.toLowerCase().includes(search.toLowerCase())
  );

  if (!isMounted) return null;

  const totalPayrollUSD = employees.reduce((acc, emp) => acc + calculateTotalPay(emp), 0);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" /> Nómina y Personal
          </h1>
          <p className="text-xs text-zinc-400">Gestión de empleados, puestos, salarios base y cálculo de comisiones.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2.5 px-4 rounded-xl font-bold text-zinc-950 bg-indigo-400 hover:bg-indigo-300 text-xs flex items-center gap-2 w-fit transition-all"
        >
          <UserPlus className="w-4 h-4" /> Registrar Empleado
        </button>
      </div>

      {/* Resumen de Nómina */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total Empleados</span>
          <p className="text-xl font-black text-white font-mono mt-1">{employees.length}</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total Nómina Estimada</span>
          <p className="text-xl font-black text-indigo-400 font-mono mt-1">${totalPayrollUSD.toFixed(2)} USD</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Estado de Pagos</span>
          <p className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-2">
            <CheckCircle2 className="w-4 h-4" /> Al día
          </p>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Buscar empleado por nombre o cargo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500/60"
        />
      </div>

      {/* Tabla de Empleados */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/50 text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
              <th className="p-4">Empleado</th>
              <th className="p-4">Cargo / Puesto</th>
              <th className="p-4">Salario Base</th>
              <th className="p-4">Comisión (%)</th>
              <th className="p-4">Ventas Gen.</th>
              <th className="p-4">Pago Total ($)</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {filteredEmployees.map((emp) => {
              const totalPay = calculateTotalPay(emp);
              const commissionAmount = (emp.salesVolumeUSD * emp.commissionPercentage) / 100;

              return (
                <tr key={emp.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-white">{emp.name}</p>
                    <p className="text-[10px] text-zinc-500 font-mono">{emp.id}</p>
                  </td>
                  <td className="p-4 text-zinc-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-500" /> {emp.position}
                  </td>
                  <td className="p-4 font-mono text-zinc-300">${emp.baseSalaryUSD.toFixed(2)}</td>
                  <td className="p-4 font-mono text-indigo-400 font-bold">{emp.commissionPercentage}%</td>
                  <td className="p-4 font-mono text-zinc-400">${emp.salesVolumeUSD.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="font-mono font-black text-lime-400">${totalPay.toFixed(2)}</span>
                    {commissionAmount > 0 && (
                      <p className="text-[10px] text-indigo-300 font-mono">(incl. ${commissionAmount.toFixed(2)} comision)</p>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteEmployee(emp.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 text-zinc-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL REGISTRAR EMPLEADO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-black text-white">Registrar Nuevo Empleado</h3>
            
            <form onSubmit={handleAddEmployee} className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 font-semibold">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-indigo-500/60"
                  placeholder="Ej: Pedro Pérez"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold">Cargo / Puesto</label>
                <input
                  type="text"
                  required
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-indigo-500/60"
                  placeholder="Ej: Vendedor de Tienda"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold">Salario Base ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newEmployee.baseSalaryUSD}
                    onChange={(e) => setNewEmployee({ ...newEmployee, baseSalaryUSD: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-indigo-500/60 font-mono"
                    placeholder="200.00"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold">% Comisión Ventas</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newEmployee.commissionPercentage}
                    onChange={(e) => setNewEmployee({ ...newEmployee, commissionPercentage: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none focus:border-indigo-500/60 font-mono"
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-400 text-zinc-950 text-xs font-bold hover:bg-indigo-300"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}