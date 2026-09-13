import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPromotionsAdmin, createPromotion, updatePromotion, deletePromotion } from '../api/promotions';
import { ShoppingBag, Plus, Edit2, Trash2, Tag, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StorePromotionsTab() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Food to Go',
    description: '',
    priceText: '',
    discountBadge: '',
    imageUrl: '',
    isActive: true,
    sortOrder: 0,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-promotions'],
    queryFn: getPromotionsAdmin,
  });

  const saveMutation = useMutation({
    mutationFn: (data) => (editingItem ? updatePromotion(editingItem.id, data) : createPromotion(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
      toast.success(editingItem ? 'Promotion updated' : 'Promotion created');
      setModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error saving offer'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePromotion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
      toast.success('Offer removed');
    },
  });

  function openCreate() {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Food to Go',
      description: '',
      priceText: '',
      discountBadge: '',
      imageUrl: '',
      isActive: true,
      sortOrder: 0,
    });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || '',
      priceText: item.priceText || '',
      discountBadge: item.discountBadge || '',
      imageUrl: item.imageUrl || '',
      isActive: item.isActive,
      sortOrder: item.sortOrder || 0,
    });
    setModalOpen(true);
  }

  const promotions = data?.promotions || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#016839]" /> Our Products &amp; Deals
          </h2>
          <p className="text-sm text-slate-500">
            Publish and manage Our Products, C-Store items, combos, specials, and retail promotions.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Product / Deal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {promotions.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {p.category}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(p)} className="p-1.5 text-slate-400 hover:text-[#016839] hover:bg-[#e8f7ee]/50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete ${p.title}?`)) deleteMutation.mutate(p.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-lg mt-3">{p.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{p.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t flex items-center justify-between">
              <span className="text-base font-black text-[#016839]">{p.priceText || 'In-store'}</span>
              {p.discountBadge && (
                <span className="flex items-center gap-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                  <Tag className="w-3 h-3" /> {p.discountBadge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingItem ? 'Edit Promotion' : 'New Store Promotion'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Promotion Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Artisan Deli Sub + Fountain Drink Combo"
                  className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Department / Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                  >
                    <option value="Food to Go">Fresh Food &amp; Deli</option>
                    <option value="Coffee Bar">Bean-to-Cup Coffee Bar</option>
                    <option value="Bakery & Breakfast">Bakery &amp; Breakfast</option>
                    <option value="Snacks & Drinks">Chilled Drinks &amp; Beer Cave</option>
                    <option value="Snacks & Jerky">Snacks &amp; Jerky</option>
                    <option value="Car Care">Car Care &amp; Auto Fluids</option>
                    <option value="Seasonal">Seasonal Specials</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Price / Offer Text ($)</label>
                  <input
                    type="text"
                    value={formData.priceText}
                    onChange={(e) => setFormData({ ...formData, priceText: e.target.value })}
                    placeholder="e.g. $3.99 Combo / 2 for $5"
                    className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Offer Badge</label>
                <input
                  type="text"
                  value={formData.discountBadge}
                  onChange={(e) => setFormData({ ...formData, discountBadge: e.target.value })}
                  placeholder="e.g. Breakfast Deal / Save $1.50"
                  className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details on the deal or items included..."
                  className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveMutation.mutate(formData)}
                disabled={saveMutation.isPending || !formData.title}
                className="px-4 py-2 text-sm font-semibold bg-[#016839] hover:bg-[#014d28] text-white rounded-lg shadow-sm"
              >
                {saveMutation.isPending ? 'Saving...' : 'Save Promotion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
