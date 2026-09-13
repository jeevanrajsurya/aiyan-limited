import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { Settings, Save, Phone, MapPin, Building, Clock, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GeneralSettingsTab() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    stationName: 'S&B Conoco Forecourt & C-Store',
    tagline: 'Premier 24/7 US Fuel, Ultra-Rapid EV Charging & Convenience Forecourt',
    phone: '(281) 555-0199',
    emergencyPhone: '1-800-527-5476',
    email: 'contact@sb-conoco.com',
    fleetEmail: 'fleets@sb-conoco.com',
    address: '14205 Katy Freeway, Houston, TX',
    postcode: '77079',
    vatNumber: 'EIN 47-8291045',
    forecourtHours: 'Open 24 Hours / 7 Days a Week',
    storeHours: 'Open 24/7 / 365 Days',
    noticeBanner: {
      enabled: true,
      text: '⚡ NEW: 150kW Ultra-Rapid Dual EV Charging Hub & Touchless Soft-Cloth Car Wash now open!',
      badge: 'Live Update',
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-setting-general'],
    queryFn: () => getSettingByKey('general'),
  });

  useEffect(() => {
    if (data?.value) {
      setForm((prev) => ({ ...prev, ...data.value }));
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (value) => updateSetting('general', value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-setting-general'] });
      toast.success('Forecourt general settings saved!');
    },
    onError: () => toast.error('Failed to save settings'),
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#016839]" /> Station & Forecourt Master Settings
            </h2>
            <p className="text-sm text-slate-500">
              Station identity, US forecourt address, 24/7 operating hours, and live notice broadcast.
            </p>
          </div>
          <button
            type="button"
            onClick={() => saveMutation.mutate(form)}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-md shadow-red-600/20"
          >
            <Save className="w-4 h-4" />
            {saveMutation.isPending ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {/* Live Notice Banner */}
        <div className="p-4 bg-[#e8f7ee]/60 border border-[#016839]/30 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#016839]" /> Top-of-Page Alert / Notice Banner
            </div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <input
                type="checkbox"
                checked={form.noticeBanner?.enabled}
                onChange={(e) =>
                  setForm({
                    ...form,
                    noticeBanner: { ...form.noticeBanner, enabled: e.target.checked },
                  })
                }
                className="rounded text-[#016839] focus:ring-[#016839]"
              />
              Show Banner on Website
            </label>
          </div>
          <input
            type="text"
            value={form.noticeBanner?.text || ''}
            onChange={(e) =>
              setForm({
                ...form,
                noticeBanner: { ...form.noticeBanner, text: e.target.value },
              })
            }
            placeholder="e.g. ⚡ 150kW Ultra-Rapid Dual EV Charging Hub is now live on our forecourt!"
            className="w-full text-xs px-3 py-2 border border-[#016839]/30 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
          />
        </div>

        {/* Station Identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Station / Business Name</label>
            <input
              type="text"
              value={form.stationName}
              onChange={(e) => setForm({ ...form, stationName: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Station Telephone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">24/7 Emergency Line</label>
            <input
              type="text"
              value={form.emergencyPhone}
              onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">General Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">B2B Fleet Accounts Email</label>
            <input
              type="email"
              value={form.fleetEmail}
              onChange={(e) => setForm({ ...form, fleetEmail: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>
        </div>

        {/* Location & Legal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700">Physical Forecourt Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">US ZIP Code</label>
            <input
              type="text"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Forecourt Fuel Hours</label>
            <input
              type="text"
              value={form.forecourtHours}
              onChange={(e) => setForm({ ...form, forecourtHours: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Convenience Store Hours</label>
            <input
              type="text"
              value={form.storeHours}
              onChange={(e) => setForm({ ...form, storeHours: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">US EIN / Tax ID</label>
            <input
              type="text"
              value={form.vatNumber}
              onChange={(e) => setForm({ ...form, vatNumber: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#016839]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
