import { useState } from "react";
import { Eye, CheckCircle, XCircle, Clock, Search } from "lucide-react";
import { C } from "../constants/colors";
import { CREATOR_REQUESTS } from "../data/creatorRequests";
import AgreementModal from "../components/AgreementModal";

const STATUS_STYLES = {
  pending:  { bg: C.amberSoft, color: C.amber, label: "Pending",  icon: Clock },
  approved: { bg: C.greenSoft, color: C.green, label: "Approved", icon: CheckCircle },
  rejected: { bg: C.roseSoft,  color: C.rose,  label: "Rejected", icon: XCircle },
};

export default function CreatorRequests({ navigate }) {
  const [requests, setRequests] = useState(CREATOR_REQUESTS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [agreementTarget, setAgreementTarget] = useState(null);

  const filtered = requests.filter(r => {
    const matchFilter = filter === "all" || r.status === filter;
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.niches.some(n => n.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const counts = {
    all:      requests.length,
    pending:  requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  function approve(id, e) {
    e.stopPropagation();
    const req = requests.find(r => r.id === id);
    setAgreementTarget(req);
  }

  function confirmApprove(file) {
    setRequests(prev => prev.map(r => r.id === agreementTarget.id ? { ...r, status: "approved" } : r));
    setAgreementTarget(null);
  }

  function reject(id, e) {
    e.stopPropagation();
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "rejected" } : r));
  }

  return (
    <>
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
            Creator Requests
          </h1>
          <p className="text-[13px] mt-1" style={{ color: C.muted }}>
            Review and approve incoming creator account applications.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { key: "pending",  label: "Pending Review",  icon: Clock },
          { key: "approved", label: "Approved",        icon: CheckCircle },
          { key: "rejected", label: "Rejected",        icon: XCircle },
        ].map(s => {
          const ss = STATUS_STYLES[s.key];
          const Icon = s.icon;
          return (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className="rounded-xl p-4 text-left transition-all"
              style={{
                backgroundColor: C.surface,
                border: "1.5px solid " + (filter === s.key ? ss.color : C.hairline),
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: ss.bg }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: ss.color }} strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>{s.label}</span>
              </div>
              <div className="text-[24px] font-semibold" style={{ color: ss.color, fontFamily: "var(--font-display)" }}>{counts[s.key]}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: C.faint }} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search by name or niche…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 h-9 rounded-xl text-[13px] outline-none"
            style={{ width: 250, border: "1.5px solid " + C.hairline, backgroundColor: C.surface, color: C.ink, fontFamily: "var(--font-sans)" }}
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: C.panel }}>
          {["all", "pending", "approved", "rejected"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold capitalize transition-all"
              style={{
                backgroundColor: filter === f ? C.surface : "transparent",
                color: filter === f ? C.ink : C.muted,
                boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {f} ({counts[f] ?? requests.length})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        {/* Column headers */}
        <div
          className="grid px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest"
          style={{ gridTemplateColumns: "1fr 180px 120px 110px 140px", borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm, color: C.faint, letterSpacing: "0.1em" }}
        >
          <div>Creator</div>
          <div>Niches</div>
          <div>Rate</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No requests match</div>
            <div className="text-[12px] mt-1" style={{ color: C.muted }}>Try changing the filter or search term.</div>
          </div>
        ) : (
          filtered.map((req, i) => {
            const ss = STATUS_STYLES[req.status];
            const StatusIcon = ss.icon;
            const isPending = req.status === "pending";
            return (
              <div
                key={req.id}
                className="grid px-5 py-4 items-center"
                style={{
                  gridTemplateColumns: "1fr 180px 120px 110px 140px",
                  borderBottom: i < filtered.length - 1 ? "1px solid " + C.hairlineSoft : "none",
                }}
              >
                {/* Creator info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, " + C.inkSoft + ", " + C.muted + ")" }}
                  >
                    {req.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold truncate" style={{ color: C.ink }}>{req.name}</div>
                    <div className="text-[12px] mt-0.5 truncate" style={{ color: C.muted }}>{req.city} · {req.submittedAt}</div>
                  </div>
                </div>

                {/* Niches */}
                <div className="flex flex-wrap gap-1">
                  {req.niches.slice(0, 2).map(n => (
                    <span key={n} className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>
                      {n}
                    </span>
                  ))}
                  {req.niches.length > 2 && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.faint }}>
                      +{req.niches.length - 2}
                    </span>
                  )}
                </div>

                {/* Rate */}
                <div className="text-[13px] font-semibold" style={{ color: C.ink }}>
                  ${req.ratePerVideo}<span className="text-[11px] font-normal ml-0.5" style={{ color: C.faint }}>/video</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1.5">
                  <StatusIcon className="w-3.5 h-3.5" style={{ color: ss.color }} strokeWidth={2} />
                  <span className="text-[12px] font-semibold" style={{ color: ss.color }}>{ss.label}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("creator-request-detail", { requestId: req.id })}
                    className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] font-semibold transition-all hover:opacity-80"
                    style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}
                  >
                    <Eye className="w-3 h-3" strokeWidth={2} /> View
                  </button>
                  {isPending && (
                    <>
                      <button
                        onClick={e => approve(req.id, e)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                        style={{ backgroundColor: C.greenSoft, border: "1px solid " + C.green + "40" }}
                        title="Approve"
                      >
                        <CheckCircle className="w-3.5 h-3.5" style={{ color: C.green }} strokeWidth={2} />
                      </button>
                      <button
                        onClick={e => reject(req.id, e)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                        style={{ backgroundColor: C.roseSoft, border: "1px solid " + C.rose + "40" }}
                        title="Reject"
                      >
                        <XCircle className="w-3.5 h-3.5" style={{ color: C.rose }} strokeWidth={2} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>

    {agreementTarget && (
      <AgreementModal
        creator={agreementTarget}
        onConfirm={confirmApprove}
        onClose={() => setAgreementTarget(null)}
      />
    )}
    </>
  );
}
