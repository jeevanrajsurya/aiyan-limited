import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInquiriesAdmin, updateInquiryStatus, deleteInquiry } from '../api/inquiries';
import { Inbox, Filter, Mail, Phone, Building2, Trash2, CheckCircle, Clock, Search } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import toast from 'react-hot-toast';

export default function InquiriesCrmTab() {
  const queryClient = useQueryClient();
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-inquiries', filterType, filterStatus],
    queryFn: () => getInquiriesAdmin({ inquiryType: filterType || undefined, status: filterStatus || undefined }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, notes }) => updateInquiryStatus(id, { status, notes, isRead: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      toast.success('Inquiry status updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      toast.success('Inquiry deleted');
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    },
  });

  const inquiries = data?.inquiries || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#016839]" /> B2B Commercial Fleet & Inquiries CRM
          </h2>
          <p className="text-sm text-slate-500">
            Manage inbound leads, US fleet commercial fuel cards, bulk fuel delivery, and station customer messages.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs border rounded-lg px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-[#016839]"
          >
            <option value="">All Inquiry Types</option>
            <option value="FLEET_FUEL_CARD">🚛 Fleet Fuel Cards</option>
            <option value="COMMERCIAL_SUPPLY">⛽ Bulk Fuel Supply</option>
            <option value="VALET_SERVICE">🚿 Car Wash & Auto Spa</option>
            <option value="GENERAL">💬 General Forecourt</option>
            <option value="COMPLAINT">⚠️ Customer Feedback</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs border rounded-lg px-3 py-2 bg-slate-50 focus:ring-1 focus:ring-[#016839]"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Table / List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 max-h-[650px] overflow-y-auto">
            {inquiries.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">No inquiries match the filter criteria.</div>
            ) : (
              inquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                const isFleet = inq.inquiryType === 'FLEET_FUEL_CARD';

                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                      isSelected ? 'bg-[#e8f7ee]/50 border-l-4 border-[#016839]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                        <StatusBadge status={inq.status} />
                        {isFleet && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                            B2B Fleet
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-medium line-clamp-1">{inq.subject || inq.message}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>{inq.email}</span>
                        {inq.companyName && <span>• {inq.companyName}</span>}
                        <span>• {new Date(inq.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Lead Detail View */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          {selectedInquiry ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b pb-3">
                <div>
                  <span className="text-xs font-bold text-[#016839] uppercase tracking-wider">
                    {selectedInquiry.inquiryType.replace(/_/g, ' ')}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedInquiry.name}</h3>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Delete this inquiry?')) deleteMutation.mutate(selectedInquiry.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${selectedInquiry.email}`} className="text-[#016839] hover:underline font-medium">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`tel:${selectedInquiry.phone}`} className="text-[#016839] hover:underline font-medium">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}
                {selectedInquiry.companyName && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Company: <strong>{selectedInquiry.companyName}</strong></span>
                  </div>
                )}
                {selectedInquiry.fleetSize && (
                  <div className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">Fleet Size:</span>
                    <span>{selectedInquiry.fleetSize}</span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Message / Requirements</p>
                <div className="p-3 bg-white border rounded-xl text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="pt-3 border-t space-y-2">
                <label className="text-xs font-semibold text-slate-700">Update Lead Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {['NEW', 'CONTACTED', 'IN_PROGRESS', 'RESOLVED'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => updateStatusMutation.mutate({ id: selectedInquiry.id, status: st })}
                      className={`text-xs py-1.5 px-2 rounded-lg font-semibold border transition-all ${
                        selectedInquiry.status === st
                          ? 'bg-[#016839] text-white border-[#016839] shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      {st.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-sm">
              Select an inquiry on the left to view full contact details and manage status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
