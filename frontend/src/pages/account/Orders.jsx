import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '../../api/orders';

const statusColor = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PAID: 'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function Orders() {
  const { data, isLoading } = useQuery({ queryKey: ['myOrders'], queryFn: getMyOrders });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-ink mb-8">Your orders</h1>

      {isLoading && <p className="text-ink/60">Loading…</p>}

      {data?.orders?.length === 0 && <p className="text-ink/60">You haven't placed any orders yet.</p>}

      <div className="space-y-4">
        {data?.orders?.map((order) => (
          <div key={order.id} className="border border-brand-100 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="font-medium text-ink text-sm">
                Order #{order.id.slice(0, 8)} — {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[order.status] || 'bg-gray-100 text-gray-700'}`}>
                {order.status}
              </span>
            </div>
            <ul className="mt-3 text-sm text-ink/70 space-y-1">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.quantity} × {item.product.name} — £{(item.quantity * Number(item.price)).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-semibold text-ink">Total: £{Number(order.total).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
