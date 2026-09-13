import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplicationsAdmin, updateApplicationStatus, deleteApplication } from '../api/jobs';
import { Briefcase, FileText, Download, Trash2, Mail, Phone } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import toast from 'react-hot-toast';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');

export default function CareersTab() {
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-careers'],
    queryFn: () => getApplicationsAdmin({}),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-careers'] });
      toast.success('Applicant status updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-careers'] });
      toast.success('Applicant record deleted');
      if (selectedApp?.id === id) setSelectedApp(null);
    },
  });

  const applications = data?.applications || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#016839]" /> Forecourt Staff & Careers Pipeline
          </h2>
          <p className="text-sm text-slate-500">
            Review job applicants, candidate resumes, qualifications, and manage the hiring pipeline.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {applications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">No job applications submitted yet.</div>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                    selectedApp?.id === app.id ? 'bg-[#e8f7ee]/50 border-l-4 border-[#016839]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{app.name}</span>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-xs font-semibold text-[#016839] mt-0.5">{app.position}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>{app.email}</span>
                      <span>• {app.phone}</span>
                      <span>• {new Date(app.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Applicant Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          {selectedApp ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-[#016839] uppercase tracking-wider">{selectedApp.position}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedApp.name}</h3>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Delete applicant record?')) deleteMutation.mutate(selectedApp.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${selectedApp.email}`} className="text-[#016839] hover:underline font-medium">
                    {selectedApp.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`tel:${selectedApp.phone}`} className="text-[#016839] hover:underline font-medium">
                    {selectedApp.phone}
                  </a>
                </div>
                {selectedApp.availability && (
                  <div>
                    <span className="text-slate-500">Availability:</span> <strong>{selectedApp.availability}</strong>
                  </div>
                )}
                {selectedApp.experience && (
                  <div>
                    <span className="text-slate-500">Experience:</span> <strong>{selectedApp.experience}</strong>
                  </div>
                )}
              </div>

              {selectedApp.resumeUrl && (
                <a
                  href={`${API_ORIGIN}${selectedApp.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#e8f7ee] hover:bg-[#e8f7ee]/80 text-[#016839] font-semibold text-xs rounded-xl border border-[#016839]/30 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download / View Attached Resume
                </a>
              )}

              {selectedApp.coverNote && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-1">Cover Note</p>
                  <div className="p-3 bg-white border rounded-xl text-xs text-slate-700 whitespace-pre-wrap">
                    {selectedApp.coverNote}
                  </div>
                </div>
              )}

              {/* Status Change */}
              <div className="pt-3 border-t space-y-2">
                <label className="text-xs font-semibold text-slate-700">Hiring Pipeline Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {['RECEIVED', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'HIRED', 'REJECTED'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => updateMutation.mutate({ id: selectedApp.id, status: st })}
                      className={`text-xs py-1.5 px-2 rounded-lg font-semibold border transition-all ${
                        selectedApp.status === st
                          ? 'bg-[#016839] text-white border-[#016839] shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-sm">
              Select an applicant on the left to view profile and resume.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
