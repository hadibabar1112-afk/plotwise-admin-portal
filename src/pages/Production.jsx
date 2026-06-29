import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronRight, AlertCircle } from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS } from "../data/campaigns";
import { CREATORS } from "../data/creators";

// ── Status pills ───────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  "not-started":        { label: "Not started",        bg: C.panel,     color: C.faint,   dot: false },
  "brief-sent":         { label: "Brief sent",         bg: C.amberSoft, color: C.amber,   dot: true  },
  "shooting":           { label: "Shooting",           bg: "#1A8A8215", color: C.tealMid, dot: true  },
  "submitted":          { label: "Submitted",          bg: C.tealMist,  color: C.teal,    dot: true  },
  "revision-requested": { label: "Revision requested", bg: C.amberSoft, color: C.amber,   dot: true  },
  "approved":           { label: "Approved",           bg: C.greenSoft, color: C.green,   dot: false },
};

function StatusPill({ status }) {
  const s = STATUS_CONFIG[status] || STATUS_CONFIG["not-started"];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex-shrink-0"
      style={{ background: s.bg, color: s.color }}
    >
      {s.dot && <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: s.color }} />}
      {s.label}
    </span>
  );
}

const FUNNEL_CONFIG = {
  TOF: { label: "TOF", bg: "#EFF6FF", color: "#3B82F6" },
  MOF: { label: "MOF", bg: "#F5F3FF", color: "#8B5CF6" },
  BOF: { label: "BOF", bg: "#FFF7ED", color: "#F97316" },
};

function FunnelPill({ stage }) {
  const f = FUNNEL_CONFIG[stage];
  if (!f) return null;
  return (
    <span
      className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-lg tracking-wide"
      style={{ background: f.bg, color: f.color }}
    >
      {f.label}
    </span>
  );
}

// ── Column templates ───────────────────────────────────────────────────────────
// Client column added between Campaign and Creator
const COL     = "2fr 1fr 1fr 1fr 1fr 44px";
const SUB_COL = "1.5fr 1fr 1fr 1fr 1fr auto";

// ── Campaign row ───────────────────────────────────────────────────────────────

function CampaignRow({ campaign, navigate }) {
  const creators = CREATORS.filter(c => campaign.creatorIds.includes(c.id));
  const hasCreators = creators.length > 0;
  const multi = creators.length > 1;
  const [expanded, setExpanded] = useState(false);

  const totalRate = creators.reduce((sum, c) => sum + (c.rate || 0), 0);

  // No creators assigned
  if (!hasCreators) {
    return (
      <div
        className="grid items-center px-5 py-4"
        style={{ gridTemplateColumns: COL, borderBottom: "1px solid " + C.hairlineSoft }}
      >
        <div>
          <div className="text-[13px] font-semibold leading-tight" style={{ color: C.ink }}>{campaign.title}</div>
          <div className="text-[12px] mt-0.5" style={{ color: C.faint }}>{campaign.stage} · {campaign.deadline}</div>
        </div>
        <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{campaign.clientName}</div>
        <div className="text-[13px]" style={{ color: C.faint }}>—</div>
        <div className="text-[13px]" style={{ color: C.faint }}>—</div>
        <div className="text-[13px]" style={{ color: C.faint }}>—</div>
        <div className="flex justify-end">
          <button
            onClick={() => navigate("production-detail", { campaignId: campaign.id })}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-2 rounded-xl transition-all hover:opacity-80 whitespace-nowrap"
            style={{ background: C.teal, color: "#fff" }}
          >
            View <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main row */}
      <div
        className="grid items-center px-5 py-4"
        onClick={() => multi && setExpanded(e => !e)}
        style={{
          gridTemplateColumns: COL,
          borderBottom: "1px solid " + C.hairlineSoft,
          cursor: multi ? "pointer" : "default",
        }}
      >
        {/* Campaign */}
        <div>
          <div className="text-[13px] font-semibold leading-tight" style={{ color: C.ink }}>{campaign.title}</div>
          <div className="text-[12px] mt-0.5" style={{ color: C.faint }}>{campaign.stage} · {campaign.deadline}</div>
        </div>

        {/* Client */}
        <div>
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
            >
              {campaign.clientName.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-[13px] font-semibold truncate" style={{ color: C.ink }}>{campaign.clientName}</span>
          </div>
        </div>

        {/* Creator */}
        <div>
          {multi ? (
            <span className="text-[13px] font-semibold" style={{ color: C.tealMid }}>{creators.length} creators</span>
          ) : (
            <div>
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{creators[0].name}</div>
              <div className="text-[12px]" style={{ color: C.muted }}>{creators[0].city}</div>
            </div>
          )}
        </div>

        {/* Videos */}
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-semibold tabular-nums" style={{ color: C.ink }}>
            {campaign.totalVideos > 0 ? campaign.totalVideos : "—"}
          </span>
          {campaign.totalVideos > 0 && <span className="text-[11px]" style={{ color: C.faint }}>videos</span>}
        </div>

        {/* Total rate */}
        <div className="text-[13px] font-semibold tabular-nums" style={{ color: totalRate > 0 ? C.tealMid : C.faint }}>
          {totalRate > 0 ? "$" + totalRate.toLocaleString() : "—"}
        </div>

        {/* Action */}
        <div className="flex justify-end">
          {multi ? (
            <ChevronDown
              className="w-4 h-4 transition-transform"
              strokeWidth={2}
              style={{ color: C.faint, transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          ) : (
            <button
              onClick={e => { e.stopPropagation(); navigate("production-detail", { campaignId: campaign.id }); }}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-2 rounded-xl transition-all hover:opacity-80"
              style={{ background: C.teal, color: "#fff" }}
            >
              View <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      {/* Expanded sub-table for multi-creator */}
      {multi && expanded && (
        <div style={{ borderLeft: "3px solid " + C.tealBorder, borderBottom: "1px solid " + C.hairline, backgroundColor: C.bgWarm }}>
          <div className="px-5 py-3">
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid " + C.hairline }}>
              <div style={{ display: "grid", gridTemplateColumns: SUB_COL }}>
                {["Creator", "Videos", "Funnel", "Rate", "Status", ""].map((label, ci) => (
                  <div
                    key={"h" + ci}
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{
                      padding: "10px 16px",
                      backgroundColor: C.panel,
                      color: C.faint,
                      letterSpacing: "0.08em",
                      borderBottom: "1px solid " + C.hairline,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: ci === 5 ? "flex-end" : "flex-start",
                    }}
                  >
                    {label}
                  </div>
                ))}

                {creators.map((creator, i) => {
                  const border = i < creators.length - 1 ? "1px solid " + C.hairlineSoft : "none";
                  const base = { backgroundColor: C.surface, borderBottom: border, display: "flex", alignItems: "center", padding: "12px 16px" };
                  return [
                    <div key={creator.id + "-a"} style={base}>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.tealMid})` }}
                        >
                          {creator.initials}
                        </div>
                        <div>
                          <div className="text-[12px] font-semibold" style={{ color: C.ink }}>{creator.name}</div>
                          <div className="text-[11px]" style={{ color: C.muted }}>{creator.city}</div>
                        </div>
                      </div>
                    </div>,
                    <div key={creator.id + "-b"} style={base}>
                      <span className="text-[12px] font-semibold tabular-nums" style={{ color: C.ink }}>
                        {campaign.totalVideos || "—"}
                      </span>
                    </div>,
                    <div key={creator.id + "-c"} style={base}>
                      <FunnelPill stage={campaign.stage} />
                    </div>,
                    <div key={creator.id + "-d"} style={base}>
                      <span className="text-[12px] font-semibold tabular-nums" style={{ color: C.tealMid }}>
                        ${creator.rate.toLocaleString()}
                      </span>
                    </div>,
                    <div key={creator.id + "-e"} style={base}>
                      <StatusPill status={campaign.productionStatus} />
                    </div>,
                    <div key={creator.id + "-f"} style={{ ...base, justifyContent: "flex-end" }}>
                      <button
                        onClick={() => navigate("production-detail", { campaignId: campaign.id })}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80 whitespace-nowrap"
                        style={{ background: C.teal, color: "#fff" }}
                      >
                        View <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                      </button>
                    </div>,
                  ];
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function Production({ navigate }) {
  const counts = {
    shooting:  CAMPAIGNS.filter(c => c.productionStatus === "shooting").length,
    submitted: CAMPAIGNS.filter(c => c.productionStatus === "submitted").length,
    revision:  CAMPAIGNS.filter(c => c.productionStatus === "revision-requested").length,
    approved:  CAMPAIGNS.filter(c => c.productionStatus === "approved").length,
  };

  const needsAttention = CAMPAIGNS.filter(c =>
    c.productionStatus === "revision-requested" || c.productionStatus === "submitted"
  );

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-[26px] font-semibold leading-tight"
          style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}
        >
          Production
        </h1>
        <p className="text-[13px] mt-1" style={{ color: C.muted }}>
          Shoot scheduling, raw footage, and edit revisions across all client campaigns.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Shooting",      count: counts.shooting,  color: C.tealMid, bg: "#1A8A8215" },
          { label: "Submitted",     count: counts.submitted, color: C.teal,    bg: C.tealMist  },
          { label: "Needs revision",count: counts.revision,  color: C.amber,   bg: C.amberSoft },
          { label: "Approved",      count: counts.approved,  color: C.green,   bg: C.greenSoft },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>{s.label}</div>
            <div className="text-[22px] font-semibold" style={{ color: s.color, fontFamily: "var(--font-display)" }}>{s.count}</div>
          </div>
        ))}
      </div>

      {/* Needs attention */}
      {needsAttention.length > 0 && (
        <>
          <div className="mb-3">
            <h2 className="text-[14px] font-semibold" style={{ color: C.ink }}>Needs Your Attention</h2>
          </div>
          <div className="rounded-xl overflow-hidden mb-6" style={{ backgroundColor: C.amberSoft, border: "1px solid " + C.amber + "40" }}>
            {needsAttention.map((c, i) => {
              const ps = STATUS_CONFIG[c.productionStatus] || STATUS_CONFIG["not-started"];
              return (
                <button
                  key={c.id}
                  onClick={() => navigate("campaign-detail", { campaignId: c.id })}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:opacity-80"
                  style={{ borderBottom: i < needsAttention.length - 1 ? "1px solid rgba(156,111,30,0.2)" : "none" }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: C.amber }} strokeWidth={2} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] font-semibold" style={{ color: C.ink }}>{c.clientName} — {c.title}</span>
                    <span className="text-[12px] ml-3" style={{ color: C.muted }}>{ps.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: C.amber }} strokeWidth={2} />
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Campaign table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid " + C.hairline }}>
        {/* Column headers */}
        <div
          className="grid text-[11px] font-bold uppercase tracking-widest px-5 py-3"
          style={{
            gridTemplateColumns: COL,
            backgroundColor: C.bgWarm,
            color: C.faint,
            letterSpacing: "0.08em",
            borderBottom: "1px solid " + C.hairline,
          }}
        >
          <span>Campaign</span>
          <span>Client</span>
          <span>Creator</span>
          <span>Videos</span>
          <span>Total Rate</span>
          <span />
        </div>

        {CAMPAIGNS.map(campaign => (
          <CampaignRow key={campaign.id} campaign={campaign} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}
