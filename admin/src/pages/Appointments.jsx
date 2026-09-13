import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllAppointments, updateAppointmentStatus } from '../api/appointments';

const STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

export default function Appointments() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['appointments'], queryFn: getAllAppointments });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateAppointmentStatus(id, status),
    onSuccess: () => {
      toast.success('Appointment updated');
      qc.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Appointments</h1>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-ink/50">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date &amp; time</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.appointments?.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{a.user?.name}</p>
                  <p className="text-ink/40 text-xs">{a.user?.phone || a.user?.email}</p>
                </td>
                <td className="px-4 py-3">{a.serviceType}</td>
                <td className="px-4 py-3 text-ink/70">
                  {new Date(a.date).toLocaleDateString()} · {a.timeSlot}
                </td>
                <td className="px-4 py-3 text-ink/50">{a.notes || '—'}</td>
                <td className="px-4 py-3">
                  <select
                    value={a.status}
                    onChange={(e) => mutation.mutate({ id: a.id, status: e.target.value })}
                    className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.appointments?.length === 0 && <p className="text-sm text-ink/50 p-5">No appointments yet.</p>}
      </div>
    </div>
  );
}
