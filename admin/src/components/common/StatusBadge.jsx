export default function StatusBadge({ status }) {
  const statusStyles = {
    NEW: 'bg-blue-50 text-blue-700 border-blue-200',
    CONTACTED: 'bg-amber-50 text-amber-700 border-amber-200',
    IN_PROGRESS: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    RESOLVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
    CONFIRMED: 'bg-blue-50 text-blue-700 border-blue-200',
    COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    CANCELLED: 'bg-rose-50 text-rose-700 border-rose-200',
    RECEIVED: 'bg-blue-50 text-blue-700 border-blue-200',
    REVIEWING: 'bg-purple-50 text-purple-700 border-purple-200',
    SHORTLISTED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    INTERVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
    REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
    HIRED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const currentStyle = statusStyles[status] || 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentStyle}`}>
      {status?.replace(/_/g, ' ')}
    </span>
  );
}
