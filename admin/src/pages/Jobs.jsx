import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getApplications, updateApplicationStatus } from '../api/jobs';

const STATUSES = ['RECEIVED', 'REVIEWING', 'INTERVIEW', 'REJECTED', 'HIRED'];
const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');

export default function Jobs() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['applications'], queryFn: getApplications });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, status),
    onSuccess: () => {
      toast.success('Application updated');
      qc.invalidateQueries({ queryKey: ['applications'] });
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Job applications</h1>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-ink/50">
            <tr>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Resume</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.applications?.map((app) => (
              <tr key={app.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{app.name}</p>
                  <p className="text-ink/40 text-xs">{app.email}{app.phone ? ` · ${app.phone}` : ''}</p>
                </td>
                <td className="px-4 py-3">{app.position || '—'}</td>
                <td className="px-4 py-3">
                  {app.resumeUrl ? (
                    <a href={`${API_ORIGIN}${app.resumeUrl}`} target="_blank" rel="noreferrer" className="text-brand-600 font-medium">
                      View resume
                    </a>
                  ) : '—'}
                </td>
                <td className="px-4 py-3 text-ink/50">{new Date(app.submittedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <select
                    value={app.status}
                    onChange={(e) => mutation.mutate({ id: app.id, status: e.target.value })}
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
        {data?.applications?.length === 0 && <p className="text-sm text-ink/50 p-5">No applications yet.</p>}
      </div>
    </div>
  );
}
