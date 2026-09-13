import { useQuery } from '@tanstack/react-query';
import { getMyAppointments } from '../../api/appointments';

const statusColor = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function Bookings() {
  const { data, isLoading } = useQuery({ queryKey: ['myAppointments'], queryFn: getMyAppointments });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ink mb-8">Your bookings</h1>

      {isLoading && <p className="text-ink/60">Loading…</p>}

      {data?.appointments?.length === 0 && <p className="text-ink/60">You haven't booked any appointments yet.</p>}

      <div className="space-y-4">
        {data?.appointments?.map((a) => (
          <div key={a.id} className="border border-brand-100 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="font-medium text-ink">{a.serviceType}</p>
              <p className="text-sm text-ink/60">
                {new Date(a.date).toLocaleDateString()} at {a.timeSlot}
              </p>
              {a.notes && <p className="text-sm text-ink/50 mt-1">{a.notes}</p>}
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[a.status] || 'bg-gray-100 text-gray-700'}`}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
