import { useState } from "react";
import { Plus, Search, ChevronRight, Filter } from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS, CAMPAIGN_STATUSES } from "../data/campaigns";
import { CLIENTS } from "../data/clients";

const STAGE_STYLES = {
  TOF: { bg: "rgba(145,206,191,0.33)", color: C.teal },
  MOF: { bg: C.tealMid, color: "white" },
  BOF: { bg: C.teal, color: "white" },
};

function CampaignCard({ campaign, navigate }) {
  const ss = CAMPAIGN_STATUSES[campaign.status] || CAMPAIGN_STATUSES.paused;
  const stage = STAGE_STYLES[campaign.stage] || STAGE_STYLES.TOF;
  const progressPct = campaign.totalVideos > 0 ? (campaign.videosApproved / campaign.totalVideos) * 100 : 0;

  return (
    <button
      onClick={() => navigate("campaign-detail", { campaignId: campaign.id })}
      className="w-full text-left rounded-xl p-4 transition-all hover:shadow-sm"
      style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: stage.bg, color: stage.color }}>{campaign.stage}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: ss.bg, color: ss.color }}>{campaign.statusLabel}</span>
          </div>
          <div className="text-[13px] font-semibold mt-1.5" style={{ color: C.ink }}>{campaign.title}</div>
          <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{campaign.clientName}</div>
        </div>
        <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: C.faint }} strokeWidth={2} />
      </div>

      {/* Angle */}
      <p className="text-[12px] leading-relaxed mb-3" style={{ color: C.muted }}>{campaign.angle}</p>

      {/* Meta row */}
      <div className="flex items-center justify-between text-[11px]" style={{ color: C.faint }}>
        <span>{campaign.creatorIds.length} creator{campaign.creatorIds.length !== 1 ? "s" : ""}</span>
        <span>{campaign.totalVideos} video{campaign.totalVideos !== 1 ? "s" : ""}</span>
        <span>Due {campaign.deadline}</span>
        <span>${campaign.budget.toLocaleString()}</span>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-1 rounded-full" style={{ backgroundColor: C.panel }}>
          <div className="h-full rounded-full" style={{ width: progressPct + "%", backgroundColor: progressPct === 100 ? C.green : C.teal, transition: "width 0.4s ease" }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px]" style={{ color: C.faint }}>{campaign.videosApproved}/{campaign.totalVideos} approved</span>
          <span className="text-[10px]" style={{ color: C.faint }}>{Math.round(progressPct)}%</span>
        </div>
      </div>
    </button>
  );
}

export default function Campaigns({ navigate }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");

  const filtered = CAMPAIGNS.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.clientName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchClient = clientFilter === "all" || c.clientId === clientFilter;
    return matchSearch && matchStatus && matchClient;
  });

  const counts = {
    all: CAMPAIGNS.length,
    research: CAMPAIGNS.filter(c => c.status === "research").length,
    production: CAMPAIGNS.filter(c => c.status === "production").length,
    complete: CAMPAIGNS.filter(c => c.status === "complete").length,
    paused: CAMPAIGNS.filter(c => c.status === "paused").length,
  };

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>Campaigns</h1>
          <p className="text-[13px] mt-1" style={{ color: C.muted }}>{CAMPAIGNS.length} total across {CLIENTS.length} clients</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold text-white" style={{ backgroundColor: C.tealDeep }}>
          <Plus className="w-4 h-4" strokeWidth={2.5} /> New Campaign
        </button>
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: C.faint }} strokeWidth={2} />
          <input
            type="text" placeholder="Search campaigns…" value={search} onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 h-9 rounded-xl text-[13px] outline-none"
            style={{ width: 230, border: "1.5px solid " + C.hairline, backgroundColor: C.surface, color: C.ink, fontFamily: "var(--font-sans)" }}
          />
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: C.panel }}>
          {["all", "research", "production", "complete", "paused"].map(f => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold capitalize transition-all flex items-center gap-1"
              style={{ backgroundColor: statusFilter === f ? C.surface : "transparent", color: statusFilter === f ? C.ink : C.muted, boxShadow: statusFilter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
              {f} {counts[f] !== undefined && <span className="text-[10px] opacity-60">({counts[f]})</span>}
            </button>
          ))}
        </div>

        <select
          value={clientFilter} onChange={e => setClientFilter(e.target.value)}
          className="h-9 px-3 rounded-xl text-[12px] font-medium outline-none"
          style={{ border: "1.5px solid " + C.hairline, backgroundColor: C.surface, color: C.ink, fontFamily: "var(--font-sans)" }}
        >
          <option value="all">All clients</option>
          {CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Campaign grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map(c => (
          <CampaignCard key={c.id} campaign={c} navigate={navigate} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 py-12 text-center rounded-xl" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No campaigns match</div>
            <div className="text-[12px] mt-1" style={{ color: C.muted }}>Adjust filters to see results.</div>
          </div>
        )}
      </div>
    </div>
  );
}
