import { useState } from "react";
import { ArrowLeft, FileText, Camera, Film, Check, RotateCcw, Clock, Play, Eye, Frown, Heart, Lightbulb, Image, ExternalLink } from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS } from "../data/campaigns";
import { CREATORS } from "../data/creators";
import { PRODUCTION_DETAILS } from "../data/productionDetails";

// ── Sub-status pill ────────────────────────────────────────────────────────────

const SUB_STATUS = {
  pending:              { label: "Awaiting review",    bg: C.amberSoft, color: C.amber },
  approved:             { label: "Approved",           bg: C.greenSoft, color: C.green },
  "revision-requested": { label: "Revision requested", bg: C.roseSoft,  color: C.rose  },
};

function SubStatusPill({ status }) {
  const s = SUB_STATUS[status] || SUB_STATUS.pending;
  return (
    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg" style={{ backgroundColor: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

// ── Brief Pack tab ─────────────────────────────────────────────────────────────

function BriefPackTab({ bp }) {
  if (!bp) {
    return (
      <div className="rounded-xl p-10 text-center" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <FileText className="w-8 h-8 mx-auto mb-3" style={{ color: C.faint }} strokeWidth={1.5} />
        <p className="text-[13px] font-semibold mb-1" style={{ color: C.ink }}>Brief not available</p>
        <p className="text-[12px]" style={{ color: C.muted }}>The brief for this campaign hasn't been finalised yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Brand overview */}
      <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.teal, letterSpacing: "0.12em" }}>About the brand</div>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-[16px] font-semibold tracking-tight" style={{ color: C.ink }}>{bp.brand.name}</span>
          <span className="text-[12px]" style={{ color: C.muted }}>· {bp.brand.category}</span>
        </div>
        <div className="text-[12px] mb-3" style={{ color: C.muted }}>
          Hero product: <span style={{ color: C.ink, fontWeight: 600 }}>{bp.brand.heroProduct}</span>
        </div>
        <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{bp.brand.positioning}</div>
      </div>

      {/* Persona */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="px-5 py-4" style={{ background: "linear-gradient(135deg, " + C.tealMist + ", " + C.tealTint + ")", borderBottom: "1px solid " + C.hairlineSoft }}>
          <div className="text-[12px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.teal, letterSpacing: "0.12em" }}>Who you're making this for</div>
          <div className="text-[15px] font-semibold tracking-tight mb-1" style={{ color: C.ink }}>{bp.persona.name}</div>
          <div className="text-[12px] italic" style={{ color: C.muted }}>"{bp.persona.distillation}"</div>
        </div>
        <div className="p-5 grid grid-cols-3 gap-5">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Frown className="w-3.5 h-3.5" style={{ color: C.rose }} />
              <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>Pain</span>
            </div>
            <ul className="space-y-1.5">
              {bp.persona.feels.pain.map((p, i) => <li key={i} className="text-[12px] leading-snug" style={{ color: C.text }}>· {p}</li>)}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Heart className="w-3.5 h-3.5" style={{ color: C.green }} />
              <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>Desire</span>
            </div>
            <ul className="space-y-1.5">
              {bp.persona.feels.desires.map((p, i) => <li key={i} className="text-[12px] leading-snug" style={{ color: C.text }}>· {p}</li>)}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Eye className="w-3.5 h-3.5" style={{ color: C.teal }} />
              <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>Believes</span>
            </div>
            <ul className="space-y-1.5">
              {bp.persona.feels.beliefs.map((p, i) => <li key={i} className="text-[12px] leading-snug" style={{ color: C.text }}>· {p}</li>)}
            </ul>
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>How she talks vs how the category talks</div>
          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid " + C.hairlineSoft }}>
            <div className="grid grid-cols-2" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm }}>
              <div className="px-3 py-2 text-[12px] font-bold uppercase tracking-widest" style={{ color: C.green, letterSpacing: "0.08em" }}>How she says it (use this)</div>
              <div className="px-3 py-2 text-[12px] font-bold uppercase tracking-widest" style={{ color: C.rose, letterSpacing: "0.08em", borderLeft: "1px solid " + C.hairlineSoft }}>How the category says it (avoid)</div>
            </div>
            {bp.persona.vocab.map((v, i) => (
              <div key={i} className="grid grid-cols-2" style={{ borderBottom: i === bp.persona.vocab.length - 1 ? "none" : "1px solid " + C.hairlineSoft }}>
                <div className="px-3 py-2 text-[12px]" style={{ color: C.text }}>"{v.hers}"</div>
                <div className="px-3 py-2 text-[12px]" style={{ color: C.faint, borderLeft: "1px solid " + C.hairlineSoft }}>{v.category}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Where she already lives</div>
          <div className="flex flex-wrap gap-1.5">
            {bp.persona.lives.map((l, i) => (
              <span key={i} className="text-[12px] px-2 py-0.5 rounded" style={{ backgroundColor: C.panel, color: C.text }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* The angle */}
      <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, " + C.tealDeep + "08, " + C.tealMist + ")", border: "1px solid " + C.tealBorder }}>
        <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.teal, letterSpacing: "0.12em" }}>The angle</div>
        <div className="text-[18px] font-semibold tracking-tight mb-1" style={{ color: C.ink }}>{bp.angle.name}</div>
        <div className="text-[13px] italic mb-4" style={{ color: C.muted }}>"{bp.angle.tagline}"</div>
        <div className="mb-3">
          <div className="text-[12px] font-bold uppercase tracking-widest mb-1" style={{ color: C.faint, letterSpacing: "0.1em" }}>Why this matters</div>
          <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{bp.angle.matters}</div>
        </div>
        <div className="rounded-lg p-3.5" style={{ backgroundColor: C.surface, border: "1px solid " + C.tealBorder }}>
          <div className="text-[12px] font-bold uppercase tracking-widest mb-1" style={{ color: C.teal, letterSpacing: "0.1em" }}>The shift we want to create</div>
          <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{bp.angle.beliefShift}</div>
        </div>
      </div>

      {/* Hooks */}
      <div>
        <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.teal, letterSpacing: "0.12em" }}>Your two hooks</div>
        <div className="text-[12px] mb-4" style={{ color: C.muted }}>
          Shoot both. Same body. Different first 3 seconds. We test which one earns better attention with this brand's audience.
        </div>
        <div className="grid grid-cols-2 gap-3">
          {bp.hooks.map(h => (
            <div key={h.letter} className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-bold" style={{ backgroundColor: C.tealMist, color: C.teal }}>{h.letter}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ backgroundColor: C.panel, color: C.muted, letterSpacing: "0.08em" }}>{h.type}</span>
              </div>
              <div className="text-[14px] font-semibold leading-snug mb-2" style={{ color: C.ink }}>"{h.line}"</div>
              <div className="text-[12px]" style={{ color: C.muted }}>{h.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Script */}
      <div>
        <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.teal, letterSpacing: "0.12em" }}>The script</div>
        <div className="text-[12px] mb-4" style={{ color: C.muted }}>{bp.script.intro}</div>
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          {bp.script.beats.map((b, i) => (
            <div key={i} className="px-5 py-4 flex gap-5" style={{ borderBottom: i === bp.script.beats.length - 1 ? "none" : "1px solid " + C.hairlineSoft }}>
              <div className="flex-shrink-0 w-24">
                <div className="text-[12px] font-mono font-bold tabular-nums mb-1" style={{ color: C.teal, letterSpacing: "0.04em" }}>{b.time}</div>
                <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>Beat {String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold mb-1.5" style={{ color: C.ink }}>{b.label}</div>
                <div className="text-[12px] leading-relaxed mb-2.5" style={{ color: C.muted }}>{b.body}</div>
                <div className="rounded-md px-3 py-2" style={{ backgroundColor: C.tealMist, border: "1px solid " + C.tealBorder }}>
                  <div className="text-[12px] font-bold uppercase tracking-widest mb-0.5" style={{ color: C.teal, letterSpacing: "0.1em" }}>Key line</div>
                  <div className="text-[12px] italic leading-snug" style={{ color: C.ink }}>"{b.keyLine}"</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg p-3 flex items-start gap-2.5" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}>
          <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: C.teal }} strokeWidth={2} />
          <div className="text-[12px] leading-relaxed" style={{ color: C.muted }}>{bp.script.notes}</div>
        </div>
      </div>

      {/* Video specs */}
      <div className="rounded-xl p-5" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairline }}>
        <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.teal, letterSpacing: "0.12em" }}>Video specs</div>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(bp.specs).map(([k, v]) => (
            <div key={k}>
              <div className="text-[12px] font-bold uppercase tracking-widest mb-1" style={{ color: C.faint, letterSpacing: "0.08em" }}>{k}</div>
              <div className="text-[12px] font-semibold" style={{ color: C.ink }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Shoot Direction tab ────────────────────────────────────────────────────────

function ShootDirectionTab({ refs }) {
  if (!refs) {
    return (
      <div className="rounded-xl p-10 text-center" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <Camera className="w-8 h-8 mx-auto mb-3" style={{ color: C.faint }} strokeWidth={1.5} />
        <p className="text-[13px] font-semibold mb-1" style={{ color: C.ink }}>No direction notes yet</p>
        <p className="text-[12px]" style={{ color: C.muted }}>Shoot direction will appear here once the brief is finalised.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.teal, letterSpacing: "0.12em" }}>Direction</div>
        <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{refs.directions}</div>
      </div>
      <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.teal, letterSpacing: "0.12em" }}>Product notes</div>
        <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{refs.productNotes}</div>
      </div>
      <div className="rounded-xl p-5" style={{ backgroundColor: C.roseSoft + "55", border: "1px solid " + C.roseSoft }}>
        <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.rose, letterSpacing: "0.12em" }}>Avoid</div>
        <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{refs.avoid}</div>
      </div>
      <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.teal, letterSpacing: "0.12em" }}>Mood board & references</div>
        <div className="space-y-2">
          {refs.moodboard.map((m, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}>
              <Image className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.teal }} strokeWidth={1.8} />
              <span className="text-[12px] flex-1" style={{ color: C.text }}>{m}</span>
              <ExternalLink className="w-3 h-3" style={{ color: C.faint }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Creator Work tab ───────────────────────────────────────────────────────────

function CreatorWorkTab({ submissions: initialSubmissions }) {
  const [submissions, setSubmissions] = useState(
    (initialSubmissions || []).map(s => ({ ...s, revisionNote: "" }))
  );
  const [revisionOpen, setRevisionOpen] = useState(null);

  if (!submissions || submissions.length === 0) {
    return (
      <div className="rounded-xl p-10 text-center" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <Film className="w-8 h-8 mx-auto mb-3" style={{ color: C.faint }} strokeWidth={1.5} />
        <p className="text-[13px] font-semibold mb-1" style={{ color: C.ink }}>No videos submitted yet</p>
        <p className="text-[12px]" style={{ color: C.muted }}>Creator videos will appear here once submitted.</p>
      </div>
    );
  }

  function approve(id) {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: "approved" } : s));
    setRevisionOpen(null);
  }

  function requestRevision(id) {
    const s = submissions.find(x => x.id === id);
    if (!s?.revisionNote?.trim()) return;
    setSubmissions(prev =>
      prev.map(x =>
        x.id === id
          ? {
              ...x,
              status: "revision-requested",
              revisions: [
                ...(x.revisions || []),
                { note: x.revisionNote, requestedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
              ],
              revisionNote: "",
            }
          : x
      )
    );
    setRevisionOpen(null);
  }

  function updateNote(id, val) {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, revisionNote: val } : s));
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      {submissions.map(sub => (
        <div key={sub.id} className="rounded-xl overflow-hidden flex flex-col" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          {/* Video placeholder */}
          <div
            className="relative flex items-center justify-center flex-shrink-0"
            style={{ aspectRatio: "9/8", background: `linear-gradient(160deg, ${C.tealDeep} 0%, ${C.teal} 60%, ${C.tealMid} 100%)` }}
          >
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.35)" }}
            >
              <Play className="w-4 h-4 text-white" fill="white" strokeWidth={0} />
            </button>
            <div className="absolute bottom-2.5 right-2.5 text-[12px] font-mono font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}>
              {sub.duration}
            </div>
            <div className="absolute top-2.5 left-2.5 text-[12px] font-mono font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white" }}>
              9:16
            </div>
            <div className="absolute top-2.5 right-2.5">
              <SubStatusPill status={sub.status} />
            </div>
          </div>

          {/* Info + actions */}
          <div className="px-4 py-3 flex flex-col gap-3 flex-1" style={{ borderTop: "1px solid " + C.hairlineSoft }}>
            <div>
              <div className="text-[13px] font-semibold leading-tight" style={{ color: C.ink }}>{sub.title}</div>
              <div className="flex items-center gap-2 mt-1 text-[12px]" style={{ color: C.muted }}>
                <span>{sub.creatorName}</span>
                <span style={{ color: C.hairline }}>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" strokeWidth={2} />
                  {sub.submittedAt}
                </span>
              </div>
            </div>

            {/* Revision history */}
            {sub.revisions && sub.revisions.length > 0 && (
              <div className="space-y-1.5">
                {sub.revisions.map((r, i) => (
                  <div key={i} className="rounded-lg px-3 py-2 text-[12px] leading-relaxed" style={{ backgroundColor: C.amberSoft, color: C.text }}>
                    <span className="font-semibold" style={{ color: C.amber }}>Rev {i + 1} · {r.requestedAt}: </span>
                    {r.note}
                    {r.resolvedAt && <span className="ml-1.5 text-[11px]" style={{ color: C.green }}>· Resolved {r.resolvedAt}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto">
              {sub.status === "approved" ? (
                <div className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ backgroundColor: C.greenSoft }}>
                  <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.green }} strokeWidth={2.5} />
                  <span className="text-[12px] font-semibold" style={{ color: C.green }}>Approved</span>
                </div>
              ) : revisionOpen === sub.id ? (
                <div className="space-y-2">
                  <textarea
                    value={sub.revisionNote}
                    onChange={e => updateNote(sub.id, e.target.value)}
                    rows={3}
                    placeholder="Describe what needs to change — be specific about timing, delivery, or content…"
                    className="w-full px-3 py-2 rounded-lg text-[12px] leading-relaxed outline-none resize-none"
                    style={{ border: "1px solid " + C.hairline, backgroundColor: C.bgWarm, color: C.ink }}
                  />
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => setRevisionOpen(null)}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-semibold"
                      style={{ backgroundColor: C.panel, color: C.muted }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => requestRevision(sub.id)}
                      disabled={!sub.revisionNote?.trim()}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5"
                      style={{
                        backgroundColor: sub.revisionNote?.trim() ? C.amber : C.panel,
                        color: sub.revisionNote?.trim() ? "white" : C.faint,
                        cursor: sub.revisionNote?.trim() ? "pointer" : "not-allowed",
                      }}
                    >
                      <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
                      Send request
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => approve(sub.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: C.teal, color: "white" }}
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    Approve
                  </button>
                  <button
                    onClick={() => setRevisionOpen(sub.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all hover:opacity-80"
                    style={{ backgroundColor: C.amberSoft, color: C.amber, border: "1px solid " + C.amber + "44" }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
                    Ask for revision
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: "brief", label: "Brief Pack",      icon: FileText },
  { id: "shoot", label: "Shoot Direction", icon: Camera   },
  { id: "work",  label: "Creator Work",    icon: Film     },
];

export default function ProductionDetail({ campaignId, navigate }) {
  const [activeTab, setActiveTab] = useState("brief");

  const campaign = CAMPAIGNS.find(c => c.id === campaignId);
  const detail   = PRODUCTION_DETAILS[campaignId];

  if (!campaign) return (
    <div className="py-12 text-center" style={{ color: C.muted }}>Campaign not found.</div>
  );

  const creators = CREATORS.filter(c => campaign.creatorIds.includes(c.id));
  const initials = campaign.title.split(/[\s—·]+/).map(w => w[0]).filter(Boolean).join("").slice(0, 2).toUpperCase();

  return (
    <div className="pb-10">
      {/* Back button */}
      <button
        onClick={() => navigate("production")}
        className="inline-flex items-center gap-2 mb-6 text-[12px] font-semibold hover:opacity-70 transition-opacity"
        style={{ color: C.muted }}
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} /> Back to Production
      </button>

      {/* Header banner */}
      <div
        className="rounded-2xl p-6 mb-5"
        style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})`, color: "white" }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-[14px] font-bold flex-shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: C.tealSoft, letterSpacing: "0.12em" }}>
              Production · {campaign.clientName}
            </div>
            <div className="text-[20px] font-semibold leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
              {campaign.title}
            </div>
            {creators.length > 0 && (
              <div className="text-[13px] opacity-75 mt-0.5">
                {creators.map(c => c.name).join(", ")} · {campaign.stage} · Due {campaign.deadline}
              </div>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: C.tealSoft, letterSpacing: "0.1em" }}>Budget</div>
            <div className="text-[16px] font-semibold tabular-nums">${campaign.budget.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="flex items-center gap-1 mb-6 overflow-x-auto"
        style={{ borderBottom: "1px solid " + C.hairline, scrollbarWidth: "none" }}
      >
        {TABS.map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 text-[13px] whitespace-nowrap transition-all"
              style={{
                color: active ? C.teal : C.muted,
                fontWeight: active ? 600 : 500,
                borderBottom: "2px solid " + (active ? C.teal : "transparent"),
                marginBottom: -1,
                background: "none",
              }}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={active ? 2.2 : 1.8} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "brief" && <BriefPackTab bp={detail?.briefPack} />}
      {activeTab === "shoot" && <ShootDirectionTab refs={detail?.references} />}
      {activeTab === "work"  && <CreatorWorkTab submissions={detail?.submissions} />}
    </div>
  );
}
