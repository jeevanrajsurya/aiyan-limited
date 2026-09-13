import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getNewsletterSubmissions,
  updateNewsletterStatus,
  deleteNewsletterSubmission,
} from '../api/newsletter';
import {
  MailCheck,
  Download,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Search,
  FileText,
  CheckCircle2,
  Clock,
  UserCheck,
  RefreshCw,
  Briefcase,
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');

export default function NewsletterSubmissionsTab() {
  const queryClient = useQueryClient();
  const [selectedSub, setSelectedSub] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-newsletter-submissions', statusFilter, search],
    queryFn: () => getNewsletterSubmissions({ status: statusFilter, search }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateNewsletterStatus(id, { status }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-newsletter-submissions'] });
      toast.success('Submission status updated');
      if (selectedSub && selectedSub.id === variables.id) {
        setSelectedSub((prev) => ({ ...prev, status: variables.status }));
      }
    },
    onError: () => {
      toast.error('Failed to update status');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteNewsletterSubmission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-newsletter-submissions'] });
      toast.success('Submission record deleted');
      if (selectedSub) setSelectedSub(null);
    },
    onError: () => {
      toast.error('Failed to delete submission');
    },
  });

  const submissions = data?.submissions || [];

  const totalCount = submissions.length;
  const resumeCount = submissions.filter((s) => Boolean(s.resumeUrl)).length;
  const newCount = submissions.filter((s) => s.status === 'NEW').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MailCheck className="w-5 h-5 text-[#016839]" /> Newsletter &amp; Talent Submissions CRM
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time customer subscriptions, contact phone numbers, zip codes, and uploaded resumes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Submissions</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{totalCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#016839] flex items-center justify-center font-bold">
            <MailCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Resumes Attached</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{resumeCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Unreviewed / New</p>
            <p className="text-2xl font-black text-amber-600 mt-0.5">{newCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, zip, position..."
            className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#016839]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'NEW', 'REVIEWED', 'CONTACTED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#016839] text-white border-[#016839] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column CRM Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Submissions List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Submissions ({submissions.length})
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
            {isLoading ? (
              <div className="p-12 text-center text-slate-400 text-xs">Loading submissions...</div>
            ) : submissions.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">
                No submissions found matching criteria.
              </div>
            ) : (
              submissions.map((sub) => {
                const isSelected = selectedSub?.id === sub.id;
                const fullName = [sub.firstName, sub.lastName].filter(Boolean).join(' ');

                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSub(sub)}
                    className={`p-4 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#e8f7ee]/60 border-l-4 border-[#016839]'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{fullName}</span>
                        {sub.position && (
                          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Briefcase className="w-3 h-3 text-[#016839]" /> {sub.position}
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sub.status === 'NEW'
                              ? 'bg-amber-100 text-amber-800'
                              : sub.status === 'CONTACTED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {sub.status}
                        </span>
                        {sub.resumeUrl && (
                          <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <FileText className="w-3 h-3" /> Resume Attached
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" /> {sub.email}
                        </span>
                        {sub.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" /> {sub.phone}
                          </span>
                        )}
                        {sub.zip && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> Zip: {sub.zip}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(sub.submittedAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Detailed Selected Pane */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          {selectedSub ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b pb-3">
                <div>
                  <span className="text-[10px] font-bold text-[#016839] uppercase tracking-wider">
                    Submission Details
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {[selectedSub.firstName, selectedSub.lastName].filter(Boolean).join(' ')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this submission record?')) {
                      deleteMutation.mutate(selectedSub.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Delete Submission"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Contact Information */}
              <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-500 w-16">Email:</span>
                  <a
                    href={`mailto:${selectedSub.email}`}
                    className="text-[#016839] hover:underline font-semibold"
                  >
                    {selectedSub.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-500 w-16">Mobile:</span>
                  <a
                    href={`tel:${selectedSub.phone}`}
                    className="text-[#016839] hover:underline font-semibold"
                  >
                    {selectedSub.phone || 'Not provided'}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-500 w-16">Zip Code:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedSub.zip || 'Not provided'}
                  </span>
                </div>

                {selectedSub.position && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-500 w-16">Position:</span>
                    <span className="font-bold text-[#016839] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {selectedSub.position}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-500 w-16">Received:</span>
                  <span className="text-slate-700 font-medium">
                    {new Date(selectedSub.submittedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {/* Download Resume Box */}
              {selectedSub.resumeUrl ? (
                <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>Candidate Resume Attached</span>
                  </div>
                  <p className="text-[11px] text-purple-700">
                    Uploaded file is stored safely on the server and available for review.
                  </p>
                  <a
                    href={`${API_ORIGIN}${selectedSub.resumeUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#016839] hover:bg-[#014d28] text-white font-bold text-xs rounded-xl shadow-sm transition-all hover:scale-[1.01]"
                  >
                    <Download className="w-4 h-4" /> Download / View Attached Resume
                  </a>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center text-xs text-slate-400">
                  No resume file uploaded with this submission.
                </div>
              )}

              {/* Status Pipeline Buttons */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Update Lead Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {['NEW', 'REVIEWED', 'CONTACTED'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => updateMutation.mutate({ id: selectedSub.id, status: st })}
                      className={`text-xs py-1.5 px-2 rounded-lg font-bold border transition-all cursor-pointer ${
                        selectedSub.status === st
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
            <div className="py-20 text-center text-slate-400 text-xs space-y-2">
              <MailCheck className="w-8 h-8 mx-auto text-slate-300" />
              <p>Select any submission on the left to view applicant details and download resume.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
