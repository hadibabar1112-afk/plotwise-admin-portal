import { useState } from "react";
import { Plus, Search, ChevronRight, Star, PowerOff, Power } from "lucide-react";
import { C } from "../constants/colors";
import { CREATORS } from "../data/creators";

const STATUS_STYLES = {
  active:   { bg: C.greenSoft, color: C.green, label: "Active" },
  paused:   { bg: C.panel,     color: C.muted, label: "Paused" },
  inactive: { bg: C.roseSoft,  color: C.rose,  label: "Inactive" },
};

function CapacityBar({ current, max }) {
  const pct = max > 0 ? (current / max) * 100 : 0;
  const color = pct >= 100 ? C.rose : pct >= 75 ? C.amber : C.teal;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: C.panel }}>
        <div className="h-full rounded-full transition-all" style={{ width: pct + "%", backgroundColor: color }} />
      </div>
      <span className="text-[11px] font-semibold tabular-nums" style={{ color: C.muted }}>{current}/{max}</span>
    </div>
  );
}

function CreatorCard({ creator, effectiveStatus, onClick, onToggle }) {
  const s = STATUS_STYLES[effectiveStatus] || STATUS_STYLES.paused;
  const isInactive = effectiveStatus === "inactive";
  const available = effectiveStatus === "active" && creator.capacity.current < creator.capacity.max;
  return (
    <div
      className="w-full text-left rounded-xl p-4 transition-all"
      style={{ backgroundColor: C.surface, border: "1px solid " + (isInactive ? C.rose + "40" : C.hairline), opacity: isInactive ? 0.75 : 1 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <button
          onClick={onClick}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}
        >
          {creator.initials}
        </button>
        <div className="flex-1 min-w-0 cursor-pointer" onClick={onClick}>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold" style={{ color: C.ink }}>{creator.name}</span>
            {creator.violations > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: C.roseSoft, color: C.rose }}>
                {creator.violations} violation{creator.violations !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: C.muted }}>{creator.city}</div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
      </div>

      {/* Niches */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {creator.niches.map(n => (
          <span key={n} className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>
            {n}
          </span>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <div className="text-[14px] font-semibold" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>{creator.videosShipped}</div>
          <div className="text-[10px]" style={{ color: C.faint }}>Videos</div>
        </div>
        <div className="text-center">
          <div className="text-[14px] font-semibold" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>${creator.rate}</div>
          <div className="text-[10px]" style={{ color: C.faint }}>Per video</div>
        </div>
        <div className="text-center">
          <div className="text-[14px] font-semibold flex items-center justify-center gap-0.5" style={{ color: C.gold, fontFamily: "var(--font-display)" }}>
            {creator.rating}
            <Star className="w-2.5 h-2.5 fill-current" style={{ color: C.gold }} />
          </div>
          <div className="text-[10px]" style={{ color: C.faint }}>Rating</div>
        </div>
      </div>

      {/* Capacity */}
      <div className="mb-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold" style={{ color: C.muted }}>Capacity</span>
          <span className="text-[11px]" style={{ color: available ? C.green : C.rose }}>{available ? "Available" : "Full"}</span>
        </div>
        <CapacityBar current={creator.capacity.current} max={creator.capacity.max} />
      </div>

      {creator.currentAssignments.length > 0 && (
        <div className="mt-2.5 pt-2.5" style={{ borderTop: "1px solid " + C.hairlineSoft }}>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: C.faint }}>Assigned to</div>
          <div className="text-[11px]" style={{ color: C.muted }}>{creator.currentAssignments.length} campaign{creator.currentAssignments.length !== 1 ? "s" : ""}</div>
        </div>
      )}

      <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid " + C.hairlineSoft }}>
        <button
          onClick={onClick}
          className="text-[11px] font-semibold"
          style={{ color: C.teal }}
        >
          View profile →
        </button>
        <button
          onClick={e => { e.stopPropagation(); onToggle(creator.id); }}
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] font-semibold transition-all hover:opacity-80"
          style={isInactive
            ? { backgroundColor: C.greenSoft, color: C.green, border: "1px solid " + C.green + "40" }
            : { backgroundColor: C.roseSoft,  color: C.rose,  border: "1px solid " + C.rose + "40" }
          }
        >
          {isInactive
            ? <><Power className="w-3 h-3" strokeWidth={2} /> Activate</>
            : <><PowerOff className="w-3 h-3" strokeWidth={2} /> Deactivate</>
          }
        </button>
      </div>
    </div>
  );
}

export default function Creators({ navigate, creatorStatuses = {}, toggleCreatorStatus }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  function effectiveStatus(c) {
    return creatorStatuses[c.id] ?? c.status;
  }

  const filtered = CREATORS.filter(c => {
    const status = effectiveStatus(c);
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.niches.some(n => n.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "all"
      || (filter === "available" && status === "active" && c.capacity.current < c.capacity.max)
      || status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>Creators</h1>
          <p className="text-[13px] mt-1" style={{ color: C.muted }}>
            {CREATORS.length} total · {CREATORS.filter(c => (creatorStatuses[c.id] ?? c.status) === "active" && c.capacity.current < c.capacity.max).length} available
          </p>
        </div>
        <button
          className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold text-white"
          style={{ backgroundColor: C.tealDeep }}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add Creator
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: C.faint }} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search creators or niches…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 h-9 rounded-xl text-[13px] outline-none"
            style={{ width: 260, border: "1.5px solid " + C.hairline, backgroundColor: C.surface, color: C.ink, fontFamily: "var(--font-sans)" }}
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: C.panel }}>
          {[
            { key: "all",      label: "All" },
            { key: "available",label: "Available" },
            { key: "active",   label: "Active" },
            { key: "paused",   label: "Paused" },
            { key: "inactive", label: "Inactive" },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
              style={{
                backgroundColor: filter === f.key ? C.surface : "transparent",
                color: filter === f.key ? C.ink : C.muted,
                boxShadow: filter === f.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(c => (
          <CreatorCard
            key={c.id}
            creator={c}
            effectiveStatus={effectiveStatus(c)}
            onClick={() => navigate("creator-detail", { creatorId: c.id })}
            onToggle={toggleCreatorStatus}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 py-12 text-center rounded-xl" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No creators match</div>
            <div className="text-[12px] mt-1" style={{ color: C.muted }}>Adjust your search or filter.</div>
          </div>
        )}
      </div>
    </div>
  );
}
