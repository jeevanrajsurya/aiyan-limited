import { useQuery } from '@tanstack/react-query';
import { getMessages } from '../api/contact';

export default function Messages() {
  const { data } = useQuery({ queryKey: ['messages'], queryFn: getMessages });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Contact messages</h1>
      <div className="space-y-4">
        {data?.messages?.map((m) => (
          <div key={m.id} className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-ink">{m.name} <span className="text-ink/40 font-normal">· {m.email}</span></p>
              <p className="text-xs text-ink/40">{new Date(m.submittedAt).toLocaleString()}</p>
            </div>
            <p className="text-sm text-ink/70">{m.message}</p>
          </div>
        ))}
        {data?.messages?.length === 0 && <p className="text-sm text-ink/50">No messages yet.</p>}
      </div>
    </div>
  );
}
