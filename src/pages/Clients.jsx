import { useState } from "react";
import { Plus, Search, ExternalLink, ChevronRight, ArrowUpRight } from "lucide-react";
import { C } from "../constants/colors";
import { CLIENTS } from "../data/clients";

const STATUS_STYLES = {
  active:     { bg: C.greenSoft, color: C.green,  label: "Active" },
  paused:     { bg: C.panel,     color: C.muted,  label: "Paused" },
  onboarding: { bg: C.amberSoft, color: C.amber,  label: "Onboarding" },
};

function ClientRow({ client, onClick }) {
  const s = STATUS_STYLES[client.status] || STATUS_STYLES.paused;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all hover:opacity-80"
      style={{ borderBottom: "1px solid " + C.hairlineSoft }}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
        style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}
      >
        {client.initials}
      </div>
      {/* Name + details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold truncate" style={{ color: C.ink }}>{client.name}</span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
        </div>
        <div className="text-[12px] mt-0.5 flex items-center gap-3" style={{ color: C.muted }}>
          <span>{client.industry}</span>
          <span>·</span>
          <span>{client.contact}</span>
          <span>·</span>
          <span>Since {client.since}</span>
        </div>
      </div>
      {/* Metrics */}
      <div className="flex items-center gap-6 flex-shrink-0">
        <div className="text-right">
          <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{client.activeCampaigns}</div>
          <div className="text-[11px]" style={{ color: C.faint }}>active</div>
        </div>
        <div className="text-right">
          <div className="text-[13px] font-semibold" style={{ color: C.ink }}>${client.totalSpend.toLocaleString()}</div>
          <div className="text-[11px]" style={{ color: C.faint }}>total spend</div>
        </div>
        {client.pendingApprovals > 0 ? (
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: C.amberSoft, color: C.amber }}
          >
            {client.pendingApprovals} pending
          </span>
        ) : (
          <span className="text-[11px] w-16 text-right" style={{ color: C.faint }}>{client.lastActivity}</span>
        )}
        <ChevronRight className="w-4 h-4" style={{ color: C.faint }} strokeWidth={2} />
      </div>
    </button>
  );
}

export default function Clients({ navigate }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = CLIENTS.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: CLIENTS.length,
    active: CLIENTS.filter(c => c.status === "active").length,
    paused: CLIENTS.filter(c => c.status === "paused").length,
    onboarding: CLIENTS.filter(c => c.status === "onboarding").length,
  };

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>Clients</h1>
          <p className="text-[13px] mt-1" style={{ color: C.muted }}>{stats.total} total · {stats.active} active · {stats.onboarding} onboarding</p>
        </div>
        <button
          className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold text-white"
          style={{ backgroundColor: C.tealDeep }}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: C.faint }} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search clients…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 h-9 rounded-xl text-[13px] outline-none"
            style={{ width: 240, border: "1.5px solid " + C.hairline, backgroundColor: C.surface, color: C.ink, fontFamily: "var(--font-sans)" }}
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: C.panel }}>
          {["all", "active", "paused", "onboarding"].map(f => (
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
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Client list */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        {/* Column headers */}
        <div className="flex items-center gap-4 px-5 py-2.5" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm }}>
          <div className="w-10 flex-shrink-0" />
          <div className="flex-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>Client</div>
          <div className="flex items-center gap-6 flex-shrink-0 pr-8">
            <span className="text-[11px] font-bold uppercase tracking-widest w-16 text-right" style={{ color: C.faint, letterSpacing: "0.1em" }}>Active</span>
            <span className="text-[11px] font-bold uppercase tracking-widest w-24 text-right" style={{ color: C.faint, letterSpacing: "0.1em" }}>Total Spend</span>
            <span className="text-[11px] font-bold uppercase tracking-widest w-20 text-right" style={{ color: C.faint, letterSpacing: "0.1em" }}>Status</span>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No clients match</div>
            <div className="text-[12px] mt-1" style={{ color: C.muted }}>Try adjusting your search or filter.</div>
          </div>
        ) : (
          filtered.map(c => (
            <ClientRow key={c.id} client={c} onClick={() => navigate("client-detail", { clientId: c.id })} />
          ))
        )}
      </div>
    </div>
  );
}
