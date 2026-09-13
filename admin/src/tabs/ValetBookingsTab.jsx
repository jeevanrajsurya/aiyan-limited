import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getValetBookingsAdmin, updateValetBookingStatus, deleteValetBooking } from '../api/valet';
import { Calendar, Clock, Car, Trash2, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import toast from 'react-hot-toast';

export default function ValetBookingsTab() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-valet-bookings', statusFilter],
    queryFn: () => getValetBookingsAdmin({ status: statusFilter || undefined }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateValetBookingStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-valet-bookings'] });
      toast.success('Booking status updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteValetBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-valet-bookings'] });
      toast.success('Booking removed');
    },
  });

  const bookings = data?.bookings || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Car className="w-5 h-5 text-[#016839]" /> Touchless Car Wash & Auto Spa Bookings
          </h2>
          <p className="text-sm text-slate-500">
            Track customer vehicle detailing, touchless car wash appointments, and forecourt bay schedules.
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs border rounded-lg px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-[#016839]"
        >
          <option value="">All Bookings</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Customer & License Plate</th>
                <th className="px-5 py-3.5">Wash Package</th>
                <th className="px-5 py-3.5">Date & Time</th>
                <th className="px-5 py-3.5">Contact</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    No car wash bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm">{b.customerName}</div>
                      <span className="inline-block mt-1 font-mono font-bold bg-white text-slate-900 px-2.5 py-0.5 rounded border border-slate-300 shadow-xs tracking-wider text-[11px]">
                        {b.vehicleReg}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-800">
                      <div>{b.serviceTier}</div>
                      <span className="text-[10px] text-slate-400">{b.vehicleType}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-800">
                        {new Date(b.bookingDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                      <span className="text-[11px] text-[#016839] font-bold">{b.timeSlot}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div>{b.email}</div>
                      <span className="text-slate-500">{b.phone}</span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <select
                          value={b.status}
                          onChange={(e) => updateMutation.mutate({ id: b.id, status: e.target.value })}
                          className="text-[11px] font-semibold border rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-[#016839]"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                        <button
                          onClick={() => {
                            if (confirm('Delete this booking?')) deleteMutation.mutate(b.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
