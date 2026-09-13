import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { Layout, Save, Bell, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HeroBannersTab() {
  const queryClient = useQueryClient();
  const [heroForm, setHeroForm] = useState({
    headline: '',
    subheadline: '',
    stats: [],
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-setting-hero'],
    queryFn: () => getSettingByKey('hero'),
  });

  useEffect(() => {
    if (data?.value) {
      setHeroForm({
        headline: data.value.headline || '',
        subheadline: data.value.subheadline || '',
        stats: data.value.stats || [],
      });
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (value) => updateSetting('hero', value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-setting-hero'] });
      toast.success('Hero banner content updated!');
    },
    onError: () => toast.error('Failed to update hero settings'),
  });

  function handleStatChange(index, field, val) {
    const updated = [...heroForm.stats];
    updated[index][field] = val;
    setHeroForm({ ...heroForm, stats: updated });
  }

  function addStat() {
    setHeroForm({
      ...heroForm,
      stats: [...heroForm.stats, { label: 'New Metric', value: '100%' }],
    });
  }

  function removeStat(index) {
    setHeroForm({
      ...heroForm,
      stats: heroForm.stats.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layout className="w-5 h-5 text-[#016839]" /> Homepage Hero &amp; Headlines
            </h2>
            <p className="text-sm text-slate-500">
              Control the main hero headlines, introductory copy, and highlighted key metrics.
            </p>
          </div>
          <button
            type="button"
            onClick={() => saveMutation.mutate(heroForm)}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-sm"
          >
            <Save className="w-4 h-4" />
            {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-800">Primary Headline</label>
            <input
              type="text"
              value={heroForm.headline}
              onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
              placeholder="e.g. The app that lets you SAVE SAVE SAVE."
              className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">Subheadline / Introduction</label>
            <textarea
              rows="3"
              value={heroForm.subheadline}
              onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
              placeholder="Fuel up with Top Tier™ Conoco gasoline, grab barista-brewed coffee and fresh deli bites..."
              className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#016839]"
            />
          </div>
        </div>

        {/* Stat Highlights */}
        <div className="pt-4 border-t space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Featured Metrics &amp; Stat Badges</h3>
            <button
              type="button"
              onClick={addStat}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#016839] bg-[#e8f7ee] hover:bg-[#e8f7ee]/80 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Metric
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {heroForm.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 border rounded-xl">
                <div className="flex-1 space-y-1">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                    placeholder="Value (e.g. 24/7)"
                    className="w-full text-xs font-bold px-2 py-1 border rounded bg-white"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                    placeholder="Label (e.g. Forecourt Access)"
                    className="w-full text-[11px] text-slate-600 px-2 py-1 border rounded bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStat(i)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
