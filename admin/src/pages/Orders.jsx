import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllOrders, updateOrderStatus } from '../api/orders';

const STATUSES = ['PENDING', 'PAID', 'PROCESSING', 'COMPLETED', 'CANCELLED'];

export default function Orders() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['orders'], queryFn: getAllOrders });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success('Order updated');
      qc.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Orders</h1>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-ink/50">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.orders?.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{o.user?.name}</p>
                  <p className="text-ink/40 text-xs">{o.user?.email}</p>
                </td>
                <td className="px-4 py-3 text-ink/70">
                  {o.items.map((i) => `${i.quantity}× ${i.product.name}`).join(', ')}
                </td>
                <td className="px-4 py-3 font-medium">${Number(o.total).toFixed(2)}</td>
                <td className="px-4 py-3 text-ink/50">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => mutation.mutate({ id: o.id, status: e.target.value })}
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
        {data?.orders?.length === 0 && <p className="text-sm text-ink/50 p-5">No orders yet.</p>}
      </div>
    </div>
  );
}
