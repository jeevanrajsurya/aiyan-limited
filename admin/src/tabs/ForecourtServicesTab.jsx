import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getServicesAdmin, createService, updateService, deleteService } from '../api/services';
import { Sparkles, Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import ImageUploader from '../components/common/ImageUploader';
import toast from 'react-hot-toast';

export default function ForecourtServicesTab() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'FUEL',
    icon: 'Fuel',
    summary: '',
    description: '',
    badge: '',
    imageUrl: '',
    features: [''],
    isActive: true,
    sortOrder: 0,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: getServicesAdmin,
  });

  const saveMutation = useMutation({
    mutationFn: (data) => (editingItem ? updateService(editingItem.id, data) : createService(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast.success(editingItem ? 'Service updated' : 'Service created');
      setModalOpen(false);
      setEditingItem(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error saving service'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast.success('Service deleted');
    },
  });

  function openCreate() {
    setEditingItem(null);
    setFormData({
      name: '',
      slug: '',
      category: 'FUEL',
      icon: 'Fuel',
      summary: '',
      description: '',
      badge: '',
      imageUrl: '',
      features: [''],
      isActive: true,
      sortOrder: 0,
    });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditingItem(item);
    setFormData({
      name: item.name,
      slug: item.slug,
      category: item.category,
      icon: item.icon || 'Fuel',
      summary: item.summary,
      description: item.description || '',
      badge: item.badge || '',
      imageUrl: item.imageUrl || '',
      features: Array.isArray(item.features) && item.features.length ? item.features : [''],
      isActive: item.isActive,
      sortOrder: item.sortOrder || 0,
    });
    setModalOpen(true);
  }

  function handleFeatureChange(index, val) {
    const arr = [...formData.features];
    arr[index] = val;
    setFormData({ ...formData, features: arr });
  }

  function addFeature() {
    setFormData({ ...formData, features: [...formData.features, ''] });
  }

  function removeFeature(index) {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  }

  const services = data?.services || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#016839]" /> Forecourt Facilities &amp; Services
          </h2>
          <p className="text-sm text-slate-500">
            Manage your forecourt services: Top Tier™ Fuel, 150kW EV Fast Charging, Touchless Car Wash, C-Store &amp; Deli, and Propane Amenities.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e8f7ee] text-[#016839] border border-[#016839]/30">
                  {s.category}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(s)} className="p-1.5 text-slate-400 hover:text-[#016839] hover:bg-[#e8f7ee]/50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete service ${s.name}?`)) deleteMutation.mutate(s.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-lg mt-3">{s.name}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.summary}</p>

              {s.features && Array.isArray(s.features) && (
                <ul className="mt-3 space-y-1 text-xs text-slate-600">
                  {s.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#016839] font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-slate-500">
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">{s.badge || '24/7 Available'}</span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingItem ? 'Edit Service' : 'Create Forecourt Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Service Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setFormData({ ...formData, name, slug: editingItem ? formData.slug : slug });
                  }}
                  placeholder="e.g. 150kW Ultra-Rapid EV Charging Hub"
                  className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                  >
                    <option value="FUEL">Top Tier™ Fuel Forecourt</option>
                    <option value="EV_CHARGING">150kW Ultra-Rapid EV Charging</option>
                    <option value="CAR_CARE">Touchless Soft-Cloth Car Wash</option>
                    <option value="CONVENIENCE_STORE">C-Store &amp; Artisan Deli</option>
                    <option value="AMENITIES">Propane &amp; Forecourt Amenities</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Highlight Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. 150kW Dual Bay / Top Tier™"
                    className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Short Summary</label>
                <textarea
                  rows="2"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Summary for cards and homepage..."
                  className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
                />
              </div>

              {/* Bullet Features */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Key Features / Offerings</label>
                  <button type="button" onClick={addFeature} className="text-xs text-[#016839] font-semibold hover:underline">
                    + Add Feature
                  </button>
                </div>
                {formData.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      placeholder="e.g. Pay-at-Pump contactless terminals"
                      className="flex-1 text-xs border rounded-lg px-2.5 py-1.5"
                    />
                    <button type="button" onClick={() => removeFeature(idx)} className="text-slate-400 hover:text-rose-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <ImageUploader
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                label="Feature Image (Optional)"
              />
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
                disabled={saveMutation.isPending || !formData.name || !formData.summary}
                className="px-4 py-2 text-sm font-semibold bg-[#016839] hover:bg-[#014d28] text-white rounded-lg shadow-sm"
              >
                {saveMutation.isPending ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
