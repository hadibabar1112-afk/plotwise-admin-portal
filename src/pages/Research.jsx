import { useState } from "react";
import { Search, Eye, Plus, Lightbulb, Target, Users, Zap, BookOpen, Anchor } from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS } from "../data/campaigns";
import { RESEARCH } from "../data/research";

const SECTIONS = [
  { id: "customer",   label: "Customer",   icon: Users },
  { id: "beliefs",    label: "Beliefs",    icon: Lightbulb },
  { id: "competitor", label: "Competitor", icon: Target },
  { id: "offer",      label: "Offer",      icon: Anchor },
  { id: "angles",     label: "Angles",     icon: Zap },
  { id: "hooks",      label: "Hooks",      icon: BookOpen },
];

const STATUS_STYLES = {
  "complete":    { bg: C.greenSoft, color: C.green,  label: "Complete" },
  "in-progress": { bg: C.amberSoft, color: C.amber,  label: "In progress" },
  "not-started": { bg: C.panel,     color: C.faint,  label: "Not started" },
};

function SectionDot({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES["not-started"];
  return (
    <span
      className="w-2.5 h-2.5 rounded-full flex-shrink-0 inline-block"
      style={{ backgroundColor: s.color }}
      title={s.label}
    />
  );
}

function ProgressBar({ campaignId }) {
  const research = RESEARCH[campaignId];
  if (!research) return <span className="text-[11px]" style={{ color: C.faint }}>No data</span>;
  const statuses = SECTIONS.map(s => research.status?.[s.id] || "not-started");
  const complete = statuses.filter(s => s === "complete").length;
  const inProg   = statuses.filter(s => s === "in-progress").length;
  const pct = Math.round((complete / SECTIONS.length) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: C.panel, minWidth: 64 }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: pct + "%", backgroundColor: pct === 100 ? C.green : C.teal }}
        />
      </div>
      <span className="text-[11px] font-semibold tabular-nums w-8" style={{ color: C.muted }}>{pct}%</span>
    </div>
  );
}

function SectionStatusRow({ campaignId }) {
  const research = RESEARCH[campaignId];
  return (
    <div className="flex items-center gap-2">
      {SECTIONS.map(sec => {
        const status = research?.status?.[sec.id] || "not-started";
        const s = STATUS_STYLES[status];
        const Icon = sec.icon;
        return (
          <div
            key={sec.id}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded"
            style={{ backgroundColor: s.bg }}
            title={sec.label + ": " + s.label}
          >
            <Icon className="w-2.5 h-2.5" style={{ color: s.color }} strokeWidth={2} />
          </div>
        );
      })}
    </div>
  );
}

function overallStatus(campaignId) {
  const research = RESEARCH[campaignId];
  if (!research) return "not-started";
  const statuses = SECTIONS.map(s => research.status?.[s.id] || "not-started");
  if (statuses.every(s => s === "complete")) return "complete";
  if (statuses.some(s => s === "complete" || s === "in-progress")) return "in-progress";
  return "not-started";
}

export default function Research({ navigate }) {
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("all");

  const clients = [...new Set(CAMPAIGNS.map(c => c.clientName))];

  const filtered = CAMPAIGNS.filter(c => {
    const matchSearch = !search
      || c.title.toLowerCase().includes(search.toLowerCase())
      || c.clientName.toLowerCase().includes(search.toLowerCase())
      || (c.product || "").toLowerCase().includes(search.toLowerCase());
    const matchClient = clientFilter === "all" || c.clientName === clientFilter;
    return matchSearch && matchClient;
  });

  const totalComplete  = CAMPAIGNS.filter(c => overallStatus(c.id) === "complete").length;
  const totalInProg    = CAMPAIGNS.filter(c => overallStatus(c.id) === "in-progress").length;
  const totalNoData    = CAMPAIGNS.filter(c => overallStatus(c.id) === "not-started").length;

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
            Research
          </h1>
          <p className="text-[13px] mt-1" style={{ color: C.muted }}>
            {CAMPAIGNS.length} campaigns · {totalComplete} complete · {totalInProg} in progress · {totalNoData} not started
          </p>
        </div>
        <button
          className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold text-white"
          style={{ backgroundColor: C.tealDeep }}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} /> New Research
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: C.faint }} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search campaigns or clients…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 h-9 rounded-xl text-[13px] outline-none"
            style={{ width: 260, border: "1.5px solid " + C.hairline, backgroundColor: C.surface, color: C.ink, fontFamily: "var(--font-sans)" }}
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: C.panel }}>
          <button
            onClick={() => setClientFilter("all")}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{
              backgroundColor: clientFilter === "all" ? C.surface : "transparent",
              color: clientFilter === "all" ? C.ink : C.muted,
              boxShadow: clientFilter === "all" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            All clients
          </button>
          {clients.map(cl => (
            <button
              key={cl}
              onClick={() => setClientFilter(cl)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
              style={{
                backgroundColor: clientFilter === cl ? C.surface : "transparent",
                color: clientFilter === cl ? C.ink : C.muted,
                boxShadow: clientFilter === cl ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {cl.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        {/* Column headers */}
        <div
          className="grid px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest"
          style={{
            gridTemplateColumns: "1.6fr 1.2fr 1.1fr 200px 100px 80px",
            borderBottom: "1px solid " + C.hairlineSoft,
            backgroundColor: C.bgWarm,
            color: C.faint,
            letterSpacing: "0.1em",
          }}
        >
          <div>Campaign</div>
          <div>Client</div>
          <div>Product</div>
          <div>Section Progress</div>
          <div>Overall</div>
          <div></div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No campaigns match</div>
            <div className="text-[12px] mt-1" style={{ color: C.muted }}>Try a different search or filter.</div>
          </div>
        ) : (
          filtered.map((camp, i) => {
            const status = overallStatus(camp.id);
            const ss = STATUS_STYLES[status];
            return (
              <div
                key={camp.id}
                className="grid px-5 py-4 items-center"
                style={{
                  gridTemplateColumns: "1.6fr 1.2fr 1.1fr 200px 100px 80px",
                  borderBottom: i < filtered.length - 1 ? "1px solid " + C.hairlineSoft : "none",
                }}
              >
                {/* Campaign */}
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold truncate" style={{ color: C.ink }}>{camp.title}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: C.panel, color: C.faint }}>{camp.stage}</span>
                    <span className="text-[11px]" style={{ color: C.faint }}>· Due {camp.deadline}</span>
                  </div>
                </div>

                {/* Client */}
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}
                  >
                    {camp.clientName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <span className="text-[13px] truncate" style={{ color: C.ink }}>{camp.clientName}</span>
                </div>

                {/* Product */}
                <div className="text-[12px] truncate" style={{ color: C.muted }}>{camp.product || "—"}</div>

                {/* Section progress icons */}
                <SectionStatusRow campaignId={camp.id} />

                {/* Overall status */}
                <div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ backgroundColor: ss.bg, color: ss.color }}
                  >
                    {ss.label}
                  </span>
                </div>

                {/* View Detail */}
                <div>
                  <button
                    onClick={() => navigate("research-detail", { campaignId: camp.id })}
                    className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] font-semibold transition-all hover:opacity-80"
                    style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}
                  >
                    <Eye className="w-3 h-3" strokeWidth={2} /> View
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 px-1">
        <span className="text-[11px]" style={{ color: C.faint }}>Section icons:</span>
        {SECTIONS.map(sec => {
          const Icon = sec.icon;
          return (
            <div key={sec.id} className="flex items-center gap-1">
              <Icon className="w-3 h-3" style={{ color: C.faint }} strokeWidth={1.8} />
              <span className="text-[11px]" style={{ color: C.faint }}>{sec.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
