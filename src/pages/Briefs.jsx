import { useState } from "react";
import { FileText, CheckCircle2, Clock, AlertCircle, ChevronRight, Plus } from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS } from "../data/campaigns";

const BRIEF_STATUS = {
  "approved":    { label: "Approved",       bg: C.greenSoft, color: C.green, icon: CheckCircle2 },
  "pending":     { label: "Pending client", bg: C.amberSoft, color: C.amber, icon: Clock },
  "not-started": { label: "Not created",    bg: C.panel,     color: C.faint, icon: Clock },
};

function BriefRow({ campaign, navigate }) {
  const bs = BRIEF_STATUS[campaign.briefStatus] || BRIEF_STATUS["not-started"];
  const BsIcon = bs.icon;
  return (
    <button
      onClick={() => navigate("brief-detail", { campaignId: campaign.id })}
      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:opacity-80 transition-all"
      style={{ borderBottom: "1px solid " + C.hairlineSoft }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: C.panel }}>
        <FileText className="w-4 h-4" style={{ color: C.muted }} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{campaign.clientName} — {campaign.title}</div>
        <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>
          {campaign.product} · {campaign.stage} · {campaign.totalVideos} video{campaign.totalVideos !== 1 ? "s" : ""} · due {campaign.deadline}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <BsIcon className="w-3.5 h-3.5" style={{ color: bs.color }} strokeWidth={2} />
          <span className="text-[12px] font-semibold" style={{ color: bs.color }}>{bs.label}</span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.muted }}>
          {campaign.creatorIds.length > 0 ? campaign.creatorIds.length + " creator(s)" : "No creator"}
        </span>
        <ChevronRight className="w-4 h-4" style={{ color: C.faint }} strokeWidth={2} />
      </div>
    </button>
  );
}

export default function Briefs({ navigate }) {
  const [filter, setFilter] = useState("all");

  const filtered = CAMPAIGNS.filter(c => {
    if (filter === "all") return true;
    if (filter === "approved") return c.briefStatus === "approved";
    if (filter === "pending") return c.briefStatus === "pending";
    if (filter === "not-created") return c.briefStatus === "not-started";
    return true;
  });

  const counts = {
    all: CAMPAIGNS.length,
    approved: CAMPAIGNS.filter(c => c.briefStatus === "approved").length,
    pending: CAMPAIGNS.filter(c => c.briefStatus === "pending").length,
    "not-created": CAMPAIGNS.filter(c => c.briefStatus === "not-started").length,
  };

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>Briefs</h1>
          <p className="text-[13px] mt-1" style={{ color: C.muted }}>Manage creator briefs across all campaigns.</p>
        </div>
        <button
          onClick={() => {
            const first = CAMPAIGNS.find(c => c.briefStatus === "not-started") || CAMPAIGNS[0];
            navigate("brief-detail", { campaignId: first.id });
          }}
          className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold text-white"
          style={{ backgroundColor: C.tealDeep }}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} /> Create Brief
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Approved", count: counts.approved, color: C.green, bg: C.greenSoft, icon: CheckCircle2 },
          { label: "Pending Client", count: counts.pending, color: C.amber, bg: C.amberSoft, icon: Clock },
          { label: "Not Created", count: counts["not-created"], color: C.faint, bg: C.panel, icon: AlertCircle },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: s.color }} strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>{s.label}</span>
              </div>
              <div className="text-[22px] font-semibold" style={{ color: s.color, fontFamily: "var(--font-display)" }}>{s.count}</div>
            </div>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-4 p-1 rounded-xl self-start" style={{ backgroundColor: C.panel, display: "inline-flex" }}>
        {[
          { key: "all", label: "All" },
          { key: "approved", label: "Approved" },
          { key: "pending", label: "Pending" },
          { key: "not-created", label: "Not created" },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{ backgroundColor: filter === f.key ? C.surface : "transparent", color: filter === f.key ? C.ink : C.muted, boxShadow: filter === f.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
            {f.label} ({counts[f.key]})
          </button>
        ))}
      </div>

      {/* List */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        {/* Header row */}
        <div className="flex items-center gap-4 px-5 py-2.5" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm }}>
          <div className="w-9 flex-shrink-0" />
          <div className="flex-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>Campaign</div>
          <div className="flex-shrink-0 text-[11px] font-bold uppercase tracking-widest mr-6" style={{ color: C.faint, letterSpacing: "0.1em" }}>Brief Status</div>
        </div>
        {filtered.map(c => <BriefRow key={c.id} campaign={c} navigate={navigate} />)}
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No briefs match</div>
          </div>
        )}
      </div>
    </div>
  );
}
