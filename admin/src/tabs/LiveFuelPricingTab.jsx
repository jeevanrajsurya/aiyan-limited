import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFuelPricesAdmin, updateFuelPrice, createFuelPrice, deleteFuelPrice } from '../api/fuel';
import { Fuel, Plus, Edit2, Trash2, CheckCircle2, Save, X, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LiveFuelPricingTab() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGrade, setNewGrade] = useState({
    gradeName: '',
    fuelType: 'Petrol',
    pricePence: '',
    badge: '',
    sortOrder: 0,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-fuel-prices'],
    queryFn: getFuelPricesAdmin,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateFuelPrice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-fuel-prices'] });
      toast.success('Live fuel price updated successfully!');
      setEditingId(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update price'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => createFuelPrice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-fuel-prices'] });
      toast.success('New fuel grade added!');
      setShowAddModal(false);
      setNewGrade({ gradeName: '', fuelType: 'Petrol', pricePence: '', badge: '', sortOrder: 0 });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create grade'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteFuelPrice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-fuel-prices'] });
      toast.success('Fuel grade deleted');
    },
  });

  function startEdit(item) {
    setEditingId(item.id);
    setEditForm({
      pricePence: item.pricePence,
      badge: item.badge || '',
      isActive: item.isActive,
      sortOrder: item.sortOrder,
    });
  }

  function handleSave(id) {
    updateMutation.mutate({ id, data: editForm });
  }

  const fuelPrices = data?.fuelPrices || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#161616] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-[#016839] font-semibold text-sm mb-1">
            <Fuel className="w-5 h-5" /> Live Forecourt Price Master ($/gal)
          </div>
          <h2 className="text-2xl font-bold">Real-Time US Forecourt Pricing Board</h2>
          <p className="text-slate-300 text-sm mt-1">
            Changes saved here update the customer-facing digital totem and price ticker instantly.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-red-600/30"
        >
          <Plus className="w-4 h-4" /> Add Fuel Grade
        </button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {fuelPrices.map((fuel) => {
          const isEditing = editingId === fuel.id;
          const isDiesel = fuel.fuelType.toLowerCase().includes('diesel');
          const isLpg = fuel.fuelType.toLowerCase().includes('lpg');
          const isAdditive = fuel.fuelType.toLowerCase().includes('def') || fuel.fuelType.toLowerCase().includes('additives');

          return (
            <div
              key={fuel.id}
              className={`bg-white rounded-2xl border transition-all p-5 shadow-sm ${
                isEditing
                  ? 'border-[#016839] ring-2 ring-[#016839]/20 shadow-lg'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isDiesel
                        ? 'bg-slate-900 text-amber-400'
                        : isAdditive
                        ? 'bg-blue-100 text-blue-800'
                        : isLpg
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#016839] text-white'
                    }`}
                  >
                    {fuel.fuelType}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{fuel.gradeName}</h3>
                </div>

                {!isEditing && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEdit(fuel)}
                      className="p-1.5 text-slate-400 hover:text-[#016839] hover:bg-[#e8f7ee]/50 rounded-lg transition-colors"
                      title="Edit Price"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${fuel.gradeName}?`)) deleteMutation.mutate(fuel.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Grade"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Price Display / Edit Form */}
              <div className="my-5 p-4 bg-[#161616] text-white rounded-xl flex items-center justify-between border border-slate-800 font-mono">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">USD / Gallon</p>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.pricePence}
                      onChange={(e) => setEditForm({ ...editForm, pricePence: parseFloat(e.target.value) })}
                      className="text-3xl font-black bg-black text-[#016839] border border-[#016839] rounded px-2 py-1 w-28 focus:outline-none"
                    />
                  ) : (
                    <p className="text-3xl font-black text-white tracking-tight">
                      <span className="text-xl text-[#016839] mr-1">$</span>
                      {Number(fuel.pricePence).toFixed(2)}
                      <span className="text-xs text-slate-400 font-normal ml-1">/gal</span>
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Standard</p>
                  <p className="text-xs font-bold text-slate-200">
                    Top Tier™ Certified
                  </p>
                </div>
              </div>

              {/* Badges & Status */}
              {isEditing ? (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Grade Tag / Badge</label>
                    <input
                      type="text"
                      value={editForm.badge}
                      onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                      placeholder="e.g. Standard, 93 Octane"
                      className="w-full text-xs px-3 py-2 border rounded-lg mt-1 focus:ring-1 focus:ring-[#016839]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={editForm.isActive}
                        onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                        className="rounded text-[#016839] focus:ring-[#016839]"
                      />
                      Active on Forecourt
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave(fuel.id)}
                        disabled={updateMutation.isPending}
                        className="inline-flex items-center gap-1 bg-[#016839] hover:bg-[#014d28] text-white font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm"
                      >
                        <Save className="w-3.5 h-3.5" /> Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs text-slate-500 border-t pt-3">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {fuel.badge || 'Standard Grade'}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Grade Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add New Forecourt Grade</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Grade Name</label>
                <input
                  type="text"
                  placeholder="e.g. Regular Unleaded (87 Octane)"
                  value={newGrade.gradeName}
                  onChange={(e) => setNewGrade({ ...newGrade, gradeName: e.target.value })}
                  className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Fuel Category</label>
                  <select
                    value={newGrade.fuelType}
                    onChange={(e) => setNewGrade({ ...newGrade, fuelType: e.target.value })}
                    className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                  >
                    <option value="Regular Unleaded">Regular Unleaded (87)</option>
                    <option value="Plus Midgrade">Plus Midgrade (89)</option>
                    <option value="Premium Unleaded">Premium Unleaded (93)</option>
                    <option value="Diesel #2">Diesel #2 Ultra-Low</option>
                    <option value="DEF at Pump">DEF at Pump</option>
                    <option value="EV Ultra-Rapid">EV Ultra-Rapid 150kW</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Price (USD / Gallon)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="3.49"
                    value={newGrade.pricePence}
                    onChange={(e) => setNewGrade({ ...newGrade, pricePence: parseFloat(e.target.value) })}
                    className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Marketing Tag / Badge</label>
                <input
                  type="text"
                  placeholder="e.g. Top Tier™ Certified 3X Detergent"
                  value={newGrade.badge}
                  onChange={(e) => setNewGrade({ ...newGrade, badge: e.target.value })}
                  className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => createMutation.mutate(newGrade)}
                disabled={createMutation.isPending || !newGrade.gradeName || !newGrade.pricePence}
                className="px-4 py-2 text-sm font-semibold bg-[#016839] hover:bg-[#014d28] text-white rounded-lg shadow-sm"
              >
                {createMutation.isPending ? 'Saving...' : 'Add Grade'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
