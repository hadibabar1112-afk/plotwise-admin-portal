import { useState } from "react";
import {
  ArrowLeft, Eye, EyeOff, Plus, Trash2, Edit3, Save, X,
  Users, Lightbulb, Target, Anchor, Zap, BookOpen, HelpCircle
} from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS } from "../data/campaigns";
import { RESEARCH } from "../data/research";

const SECTIONS = [
  { id: "customer",   label: "Customer",   icon: Users,     desc: "Who we're targeting and what drives them" },
  { id: "beliefs",    label: "Beliefs",    icon: Lightbulb, desc: "Misconceptions vs. reality" },
  { id: "competitor", label: "Competitor", icon: Target,    desc: "The landscape we're competing in" },
  { id: "offer",      label: "Offer",      icon: Anchor,    desc: "What we're selling and why it wins" },
  { id: "angles",     label: "Angles",     icon: Zap,       desc: "Creative directions for content" },
  { id: "hooks",      label: "Hooks",      icon: BookOpen,  desc: "Opening lines for each angle" },
];

const PUBLISH_STATES = [
  { id: "draft",     label: "Draft",     color: C.faint, bg: C.panel },
  { id: "review",    label: "Review",    color: C.amber, bg: C.amberSoft },
  { id: "published", label: "Published", color: C.green, bg: C.greenSoft },
];

const SECTION_STATUS = {
  "complete":    { label: "Complete",    color: C.green, bg: C.greenSoft },
  "in-progress": { label: "In Progress", color: C.amber, bg: C.amberSoft },
  "not-started": { label: "Not started", color: C.faint, bg: C.panel },
};

const STAGE_COLORS = {
  TOF: { bg: C.tealMist,  color: C.teal  },
  MOF: { bg: C.amberSoft, color: C.amber },
  BOF: { bg: C.greenSoft, color: C.green },
};

// ── Templates ────────────────────────────────────────────────────────────────

const TEMPLATES = {
  customer: {
    headline: "The [Archetype] — she [core frustration].",
    distillation: "She [emotional state]. She wants to [core desire] — [what that means for her].",
    pain: [
      { text: "She feels [emotion] because [root cause]", enabled: true },
      { text: "[Decision fatigue / confusion] around [specific area]", enabled: true },
      { text: "[Physical or emotional symptom] despite [their effort]", enabled: false },
    ],
    desires: [
      { text: "Understand [mechanism], not just [surface benefit]", enabled: true },
      { text: "Stop [negative behavior they're stuck in]", enabled: true },
      { text: "Find [one solution] that [actually works]", enabled: true },
    ],
    beliefs: [
      { text: "[Common misconception they hold about the category]", enabled: true },
      { text: "[Price/quality heuristic they rely on]", enabled: false },
    ],
    vocab: [
      { hers: "\"[Exact phrase she uses]\"", category: "[What it actually means]", enabled: true },
      { hers: "\"[Another phrase she uses]\"", category: "[Clinical/marketing equivalent]", enabled: true },
    ],
    hangouts: [
      { text: "r/[Relevant subreddit]", enabled: true },
      { text: "[YouTube channel or creator]", enabled: true },
      { text: "[Review platform or community]", enabled: false },
    ],
  },
  beliefs: [
    { belief: "[What they believe about the category or problem]", reality: "[The truth that reframes their thinking and makes our product the answer]", priority: "primary", enabled: true },
    { belief: "[Secondary misconception worth addressing in content]", reality: "[Reality that positions us favourably]", priority: "secondary", enabled: true },
    { belief: "[Optional third belief — disable if not needed]", reality: "[Reality check]", priority: "secondary", enabled: false },
  ],
  competitor: [
    { name: "[Competitor Brand Name]",  positioning: "[How they position themselves]",      gap: "[Why we win — the angle they're not owning]",  enabled: true  },
    { name: "[Second Competitor]",      positioning: "[Their core positioning statement]",  gap: "[Our differentiation vs. them specifically]",  enabled: true  },
    { name: "[Third Competitor]",       positioning: "[How they talk about their product]", gap: "[The gap we fill that they can't]",             enabled: false },
  ],
  offer: {
    headline: "[Product Name]",
    price: "$[X]",
    keyIngredients: [
      { text: "[Key Ingredient + concentration %]", enabled: true },
      { text: "[Second Key Ingredient]",             enabled: true },
      { text: "[Third ingredient — disable if not relevant]", enabled: false },
    ],
    mechanism: "[How the product actually works — the mechanism, not just the feature list. Why does it produce results?]",
    proof: "[Clinical study, customer data, or third-party validation. Numbers preferred.]",
    differentiation: "[What makes this uniquely positioned vs. every competitor in the space.]",
  },
  angles: [
    { id: "angle-tpl-1", name: "[Angle Name]",   tagline: "[One-line hook that captures the creative angle]",     stage: "TOF", selected: true,  enabled: true  },
    { id: "angle-tpl-2", name: "[Second Angle]", tagline: "[Different hook targeting a different belief/desire]",  stage: "MOF", selected: false, enabled: true  },
    { id: "angle-tpl-3", name: "[Third Angle]",  tagline: "[BOF angle focused on proof and conversion]",           stage: "BOF", selected: false, enabled: false },
  ],
  hooks: [
    { letter: "A", type: "Curiosity",  line: "[A hook that opens a pattern interrupt — makes her stop scrolling]", enabled: true  },
    { letter: "B", type: "Story",      line: "[A hook that opens a personal story or confession]",                  enabled: true  },
    { letter: "C", type: "Contrarian", line: "[A hook that says the opposite of what she'd expect]",               enabled: false },
  ],
};

// ── Normalize: add enabled flags to existing data ─────────────────────────────

function norm(item) {
  return typeof item === "string" ? { text: item, enabled: true } : { enabled: true, ...item };
}
function normalizeSection(id, raw) {
  if (!raw) return null;
  switch (id) {
    case "customer": return {
      headline:     raw.headline || "",
      distillation: raw.distillation || "",
      pain:     (raw.pain     || []).map(norm),
      desires:  (raw.desires  || []).map(norm),
      beliefs:  (raw.beliefs  || []).map(norm),
      vocab:    (raw.vocab    || []).map(v => ({ enabled: true, ...v })),
      hangouts: (raw.hangouts || []).map(norm),
    };
    case "beliefs":    return raw.map(b => ({ enabled: true, ...b }));
    case "competitor": return raw.map(c => ({ enabled: true, ...c }));
    case "offer":      return { ...raw, keyIngredients: (raw.keyIngredients || []).map(norm) };
    case "angles":     return raw.map(a => ({ enabled: true, ...a }));
    case "hooks":      return raw.map(h => ({ enabled: true, ...h }));
    default: return raw;
  }
}

function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

// ── Primitives ────────────────────────────────────────────────────────────────

function ToggleBtn({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={enabled ? "Visible to client — click to hide" : "Hidden from client — click to show"}
      className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 transition-colors"
      style={{ backgroundColor: enabled ? C.tealMist : C.panel, color: enabled ? C.teal : C.faint }}
    >
      {enabled ? <Eye className="w-3.5 h-3.5" strokeWidth={2} /> : <EyeOff className="w-3.5 h-3.5" strokeWidth={2} />}
    </button>
  );
}

function HiddenBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.panel, color: C.faint }}>
      <EyeOff className="w-2.5 h-2.5" strokeWidth={2} /> Hidden
    </span>
  );
}

function SectionCard({ title, children, dimmed = false }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, opacity: dimmed ? 0.5 : 1 }}>
      {title && (
        <div className="px-5 py-2.5" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm }}>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.12em" }}>{title}</span>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

function FieldInput({ label, value, onChange, multiline = false, rows = 3, placeholder = "" }) {
  const s = { backgroundColor: C.bg, border: "1.5px solid " + C.hairline, color: C.ink, borderRadius: 10 };
  return (
    <div>
      {label && <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.faint, letterSpacing: "0.1em" }}>{label}</div>}
      {multiline
        ? <textarea rows={rows} value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 text-[13px] outline-none resize-none" style={s} />
        : <input type="text" value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 text-[13px] outline-none" style={s} />
      }
    </div>
  );
}

function EditRow({ value, enabled, onChange, onToggle, onRemove, placeholder, dotColor }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: enabled ? C.bgWarm : C.panel, border: "1px solid " + C.hairlineSoft }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: enabled ? (dotColor || C.teal) : C.faint }} />
      <input
        type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="flex-1 text-[13px] outline-none bg-transparent"
        style={{ color: enabled ? C.ink : C.faint, fontStyle: enabled ? "normal" : "italic" }}
      />
      <ToggleBtn enabled={enabled} onToggle={onToggle} />
      <button onClick={onRemove} className="w-6 h-6 flex items-center justify-center rounded-lg hover:opacity-70 flex-shrink-0" style={{ backgroundColor: C.panel, color: C.muted }}>
        <X className="w-3 h-3" strokeWidth={2.5} />
      </button>
    </div>
  );
}

function AddBtn({ label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-[12px] font-semibold mt-3" style={{ color: C.teal }}>
      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> {label}
    </button>
  );
}

// ── Null state ────────────────────────────────────────────────────────────────

function NullState({ label, onEdit }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 rounded-2xl text-center" style={{ backgroundColor: C.surface, border: "2px dashed " + C.hairline }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: C.panel }}>
        <HelpCircle className="w-5 h-5" style={{ color: C.faint }} strokeWidth={1.5} />
      </div>
      <p className="text-[14px] font-semibold mb-1" style={{ color: C.ink }}>No {label} research yet</p>
      <p className="text-[13px] mb-5" style={{ color: C.faint }}>Start editing to fill in a template with placeholder text.</p>
      <button onClick={onEdit} className="flex items-center gap-2 h-9 px-5 rounded-xl text-[13px] font-semibold text-white" style={{ backgroundColor: C.tealDeep }}>
        <Edit3 className="w-3.5 h-3.5" strokeWidth={2} /> Start from template
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// CUSTOMER
// ════════════════════════════════════════════════════════════════════════════

function CustomerView({ data }) {
  return (
    <div className="space-y-4">
      <SectionCard title="Who She Is">
        <div className="text-[16px] font-semibold mb-2" style={{ color: C.ink }}>{data.headline}</div>
        <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{data.distillation}</p>
      </SectionCard>
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Pain Points">
          <div className="space-y-2.5">
            {(data.pain || []).map((item, i) => (
              <div key={i} className="flex items-start gap-2.5" style={{ opacity: item.enabled ? 1 : 0.45 }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]" style={{ backgroundColor: C.rose }} />
                <span className="text-[13px] flex-1 leading-snug" style={{ color: C.text }}>{item.text}</span>
                {!item.enabled && <HiddenBadge />}
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Desires">
          <div className="space-y-2.5">
            {(data.desires || []).map((item, i) => (
              <div key={i} className="flex items-start gap-2.5" style={{ opacity: item.enabled ? 1 : 0.45 }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]" style={{ backgroundColor: C.green }} />
                <span className="text-[13px] flex-1 leading-snug" style={{ color: C.text }}>{item.text}</span>
                {!item.enabled && <HiddenBadge />}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      {(data.beliefs || []).length > 0 && (
        <SectionCard title="What She Believes">
          <div className="space-y-2.5">
            {data.beliefs.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5" style={{ opacity: item.enabled ? 1 : 0.45 }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]" style={{ backgroundColor: C.amber }} />
                <span className="text-[13px] flex-1 leading-snug" style={{ color: C.text }}>{item.text}</span>
                {!item.enabled && <HiddenBadge />}
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      {(data.vocab || []).length > 0 && (
        <SectionCard title="Her Vocabulary">
          <div className="space-y-0">
            {data.vocab.map((v, i) => (
              <div key={i} className="flex items-center gap-4 py-2.5" style={{ borderBottom: i < data.vocab.length - 1 ? "1px solid " + C.hairlineSoft : "none", opacity: v.enabled ? 1 : 0.45 }}>
                <span className="text-[13px] font-medium italic flex-1" style={{ color: C.ink }}>{v.hers}</span>
                <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ backgroundColor: C.panel, color: C.muted }}>{v.category}</span>
                {!v.enabled && <HiddenBadge />}
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      {(data.hangouts || []).length > 0 && (
        <SectionCard title="Where She Hangs Out">
          <div className="flex flex-wrap gap-2">
            {data.hangouts.map((h, i) => (
              <span key={i} className="text-[12px] px-3 py-1 rounded-full" style={{ backgroundColor: h.enabled ? C.panel : C.bgWarm, color: h.enabled ? C.text : C.faint, border: h.enabled ? "none" : "1px dashed " + C.hairline, opacity: h.enabled ? 1 : 0.55 }}>
                {h.text}{!h.enabled && <span className="ml-1 text-[10px]">(hidden)</span>}
              </span>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function CustomerEdit({ data, onChange }) {
  function upd(field, val) { onChange({ ...data, [field]: val }); }
  function updItem(field, i, key, val) { onChange({ ...data, [field]: data[field].map((x, idx) => idx === i ? { ...x, [key]: val } : x) }); }
  function toggle(field, i) { updItem(field, i, "enabled", !data[field][i].enabled); }
  function remove(field, i) { onChange({ ...data, [field]: data[field].filter((_, idx) => idx !== i) }); }
  function add(field, defaults) { onChange({ ...data, [field]: [...data[field], { enabled: true, ...defaults }] }); }

  return (
    <div className="space-y-4">
      <SectionCard title="Who She Is">
        <div className="space-y-3">
          <FieldInput label="Headline" value={data.headline} onChange={v => upd("headline", v)} placeholder="The [Archetype] — she [core frustration]." />
          <FieldInput label="Distillation" value={data.distillation} onChange={v => upd("distillation", v)} multiline rows={3} placeholder="She [emotional state]. She wants..." />
        </div>
      </SectionCard>
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Pain Points">
          <div className="space-y-2">
            {data.pain.map((item, i) => (
              <EditRow key={i} value={item.text} enabled={item.enabled} onChange={v => updItem("pain", i, "text", v)} onToggle={() => toggle("pain", i)} onRemove={() => remove("pain", i)} placeholder="A pain point..." dotColor={C.rose} />
            ))}
          </div>
          <AddBtn label="Add pain point" onClick={() => add("pain", { text: "" })} />
        </SectionCard>
        <SectionCard title="Desires">
          <div className="space-y-2">
            {data.desires.map((item, i) => (
              <EditRow key={i} value={item.text} enabled={item.enabled} onChange={v => updItem("desires", i, "text", v)} onToggle={() => toggle("desires", i)} onRemove={() => remove("desires", i)} placeholder="A desire..." dotColor={C.green} />
            ))}
          </div>
          <AddBtn label="Add desire" onClick={() => add("desires", { text: "" })} />
        </SectionCard>
      </div>
      <SectionCard title="What She Believes">
        <div className="space-y-2">
          {data.beliefs.map((item, i) => (
            <EditRow key={i} value={item.text} enabled={item.enabled} onChange={v => updItem("beliefs", i, "text", v)} onToggle={() => toggle("beliefs", i)} onRemove={() => remove("beliefs", i)} placeholder="A belief she holds..." dotColor={C.amber} />
          ))}
        </div>
        <AddBtn label="Add belief" onClick={() => add("beliefs", { text: "" })} />
      </SectionCard>
      <SectionCard title="Her Vocabulary">
        <div className="space-y-2">
          {data.vocab.map((v, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: v.enabled ? C.bgWarm : C.panel, border: "1px solid " + C.hairlineSoft }}>
              <input type="text" value={v.hers} onChange={e => updItem("vocab", i, "hers", e.target.value)} placeholder='"She says..."' className="flex-1 text-[13px] italic outline-none bg-transparent" style={{ color: v.enabled ? C.ink : C.faint }} />
              <span style={{ color: C.hairline }}>→</span>
              <input type="text" value={v.category} onChange={e => updItem("vocab", i, "category", e.target.value)} placeholder="What it means" className="w-36 text-[13px] outline-none bg-transparent" style={{ color: v.enabled ? C.muted : C.faint }} />
              <ToggleBtn enabled={v.enabled} onToggle={() => toggle("vocab", i)} />
              <button onClick={() => remove("vocab", i)} className="w-6 h-6 flex items-center justify-center rounded-lg hover:opacity-70 flex-shrink-0" style={{ backgroundColor: C.panel, color: C.muted }}><X className="w-3 h-3" strokeWidth={2.5} /></button>
            </div>
          ))}
        </div>
        <AddBtn label="Add vocabulary" onClick={() => add("vocab", { hers: "", category: "" })} />
      </SectionCard>
      <SectionCard title="Where She Hangs Out">
        <div className="space-y-2">
          {data.hangouts.map((h, i) => (
            <EditRow key={i} value={h.text} enabled={h.enabled} onChange={v => updItem("hangouts", i, "text", v)} onToggle={() => toggle("hangouts", i)} onRemove={() => remove("hangouts", i)} placeholder="Platform or community..." dotColor={C.teal} />
          ))}
        </div>
        <AddBtn label="Add platform" onClick={() => add("hangouts", { text: "" })} />
      </SectionCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// BELIEFS
// ════════════════════════════════════════════════════════════════════════════

function BeliefsView({ data }) {
  return (
    <div className="space-y-3">
      {data.map((b, i) => (
        <SectionCard key={i} dimmed={!b.enabled}>
          <div className="flex items-start gap-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 flex-shrink-0" style={{ backgroundColor: b.priority === "primary" ? C.tealMist : C.panel, color: b.priority === "primary" ? C.teal : C.faint }}>{b.priority}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.rose, letterSpacing: "0.1em" }}>They believe</span>
                {!b.enabled && <HiddenBadge />}
              </div>
              <div className="text-[14px] font-semibold mb-2" style={{ color: C.ink }}>"{b.belief}"</div>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: C.green, letterSpacing: "0.1em" }}>Reality</div>
              <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{b.reality}</div>
            </div>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

function BeliefsEdit({ data, onChange }) {
  function upd(i, f, v) { onChange(data.map((b, idx) => idx === i ? { ...b, [f]: v } : b)); }
  function toggle(i) { upd(i, "enabled", !data[i].enabled); }
  function remove(i) { onChange(data.filter((_, idx) => idx !== i)); }
  function add() { onChange([...data, { belief: "", reality: "", priority: "secondary", enabled: true }]); }

  return (
    <div className="space-y-3">
      {data.map((b, i) => (
        <SectionCard key={i} dimmed={!b.enabled}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <select value={b.priority} onChange={e => upd(i, "priority", e.target.value)} className="text-[11px] font-bold px-2.5 py-1 rounded-full outline-none" style={{ backgroundColor: b.priority === "primary" ? C.tealMist : C.panel, color: b.priority === "primary" ? C.teal : C.faint, border: "none" }}>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
              <div className="flex items-center gap-2">
                <ToggleBtn enabled={b.enabled} onToggle={() => toggle(i)} />
                <button onClick={() => remove(i)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:opacity-70" style={{ backgroundColor: C.panel, color: C.muted }}><Trash2 className="w-3.5 h-3.5" strokeWidth={2} /></button>
              </div>
            </div>
            <FieldInput label="They believe" value={b.belief} onChange={v => upd(i, "belief", v)} placeholder="[What they believe about the category or problem]" />
            <FieldInput label="Reality" value={b.reality} onChange={v => upd(i, "reality", v)} multiline rows={2} placeholder="[The truth that reframes their thinking]" />
          </div>
        </SectionCard>
      ))}
      <button onClick={add} className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Belief
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// COMPETITOR
// ════════════════════════════════════════════════════════════════════════════

function CompetitorView({ data }) {
  return (
    <div className="space-y-3">
      {data.map((c, i) => (
        <SectionCard key={i} dimmed={!c.enabled}>
          <div className="flex items-center gap-2 mb-1">
            <div className="text-[14px] font-semibold" style={{ color: C.ink }}>{c.name}</div>
            {!c.enabled && <HiddenBadge />}
          </div>
          <div className="text-[12px] mb-3" style={{ color: C.muted }}>{c.positioning}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: C.teal, letterSpacing: "0.1em" }}>Our advantage</div>
          <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{c.gap}</div>
        </SectionCard>
      ))}
    </div>
  );
}

function CompetitorEdit({ data, onChange }) {
  function upd(i, f, v) { onChange(data.map((c, idx) => idx === i ? { ...c, [f]: v } : c)); }
  function toggle(i) { upd(i, "enabled", !data[i].enabled); }
  function remove(i) { onChange(data.filter((_, idx) => idx !== i)); }
  function add() { onChange([...data, { name: "", positioning: "", gap: "", enabled: true }]); }

  return (
    <div className="space-y-3">
      {data.map((c, i) => (
        <SectionCard key={i} dimmed={!c.enabled}>
          <div className="space-y-3">
            <div className="flex items-center justify-end gap-2">
              <ToggleBtn enabled={c.enabled} onToggle={() => toggle(i)} />
              <button onClick={() => remove(i)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:opacity-70" style={{ backgroundColor: C.panel, color: C.muted }}><Trash2 className="w-3.5 h-3.5" strokeWidth={2} /></button>
            </div>
            <FieldInput label="Competitor name" value={c.name} onChange={v => upd(i, "name", v)} placeholder="[Brand name]" />
            <FieldInput label="Their positioning" value={c.positioning} onChange={v => upd(i, "positioning", v)} placeholder="[How they talk about themselves]" />
            <FieldInput label="Our advantage" value={c.gap} onChange={v => upd(i, "gap", v)} multiline rows={2} placeholder="[Why we win against them specifically]" />
          </div>
        </SectionCard>
      ))}
      <button onClick={add} className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Competitor
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// OFFER
// ════════════════════════════════════════════════════════════════════════════

function OfferView({ data }) {
  return (
    <div className="space-y-4">
      <SectionCard title="Product">
        <div className="text-[22px] font-semibold mb-1" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>{data.headline}</div>
        <div className="text-[15px] font-semibold" style={{ color: C.teal }}>{data.price}</div>
      </SectionCard>
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Key Ingredients">
          <div className="space-y-2">
            {(data.keyIngredients || []).map((k, i) => (
              <div key={i} className="flex items-center gap-2" style={{ opacity: k.enabled ? 1 : 0.4 }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.teal }} />
                <span className="text-[13px] flex-1" style={{ color: C.text }}>{k.text}</span>
                {!k.enabled && <HiddenBadge />}
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Mechanism">
          <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{data.mechanism}</p>
        </SectionCard>
      </div>
      <SectionCard title="Proof">
        <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{data.proof}</p>
      </SectionCard>
      <SectionCard title="Differentiation">
        <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{data.differentiation}</p>
      </SectionCard>
    </div>
  );
}

function OfferEdit({ data, onChange }) {
  function upd(f, v) { onChange({ ...data, [f]: v }); }
  function updIng(i, f, v) { onChange({ ...data, keyIngredients: data.keyIngredients.map((k, idx) => idx === i ? { ...k, [f]: v } : k) }); }
  function toggleIng(i) { updIng(i, "enabled", !data.keyIngredients[i].enabled); }
  function removeIng(i) { upd("keyIngredients", data.keyIngredients.filter((_, idx) => idx !== i)); }
  function addIng() { upd("keyIngredients", [...(data.keyIngredients || []), { text: "", enabled: true }]); }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Product Name">
          <FieldInput value={data.headline} onChange={v => upd("headline", v)} placeholder="[Product name]" />
        </SectionCard>
        <SectionCard title="Price">
          <FieldInput value={data.price} onChange={v => upd("price", v)} placeholder="$XX" />
        </SectionCard>
      </div>
      <SectionCard title="Key Ingredients">
        <div className="space-y-2">
          {(data.keyIngredients || []).map((k, i) => (
            <EditRow key={i} value={k.text} enabled={k.enabled} onChange={v => updIng(i, "text", v)} onToggle={() => toggleIng(i)} onRemove={() => removeIng(i)} placeholder="Ingredient + concentration..." dotColor={C.teal} />
          ))}
        </div>
        <AddBtn label="Add ingredient" onClick={addIng} />
      </SectionCard>
      <SectionCard title="Mechanism">
        <FieldInput value={data.mechanism} onChange={v => upd("mechanism", v)} multiline rows={3} placeholder="[How the product actually works — mechanism, not feature list]" />
      </SectionCard>
      <SectionCard title="Proof">
        <FieldInput value={data.proof} onChange={v => upd("proof", v)} multiline rows={2} placeholder="[Clinical study, customer data, or third-party validation]" />
      </SectionCard>
      <SectionCard title="Differentiation">
        <FieldInput value={data.differentiation} onChange={v => upd("differentiation", v)} multiline rows={2} placeholder="[What makes this uniquely positioned vs. every competitor]" />
      </SectionCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ANGLES
// ════════════════════════════════════════════════════════════════════════════

function AnglesView({ data }) {
  return (
    <div className="space-y-3">
      {data.map((a, i) => {
        const sc = STAGE_COLORS[a.stage] || STAGE_COLORS.TOF;
        return (
          <SectionCard key={i} dimmed={!a.enabled}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: sc.bg, color: sc.color }}>{a.stage}</span>
              {a.selected && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>Selected</span>}
              {!a.enabled && <HiddenBadge />}
            </div>
            <div className="text-[14px] font-semibold" style={{ color: C.ink }}>{a.name}</div>
            <div className="text-[13px] mt-1" style={{ color: C.muted }}>{a.tagline}</div>
          </SectionCard>
        );
      })}
    </div>
  );
}

function AnglesEdit({ data, onChange }) {
  function upd(i, f, v) { onChange(data.map((a, idx) => idx === i ? { ...a, [f]: v } : a)); }
  function toggle(i) { upd(i, "enabled", !data[i].enabled); }
  function remove(i) { onChange(data.filter((_, idx) => idx !== i)); }
  function add() { onChange([...data, { id: "angle-" + Date.now(), name: "", tagline: "", stage: "TOF", selected: false, enabled: true }]); }

  return (
    <div className="space-y-3">
      {data.map((a, i) => {
        const sc = STAGE_COLORS[a.stage] || STAGE_COLORS.TOF;
        return (
          <SectionCard key={i} dimmed={!a.enabled}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <select value={a.stage} onChange={e => upd(i, "stage", e.target.value)} className="text-[11px] font-bold px-2.5 py-1 rounded-full outline-none" style={{ backgroundColor: sc.bg, color: sc.color, border: "none" }}>
                    <option value="TOF">TOF</option><option value="MOF">MOF</option><option value="BOF">BOF</option>
                  </select>
                  <button onClick={() => upd(i, "selected", !a.selected)} className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: a.selected ? C.teal : C.faint }}>
                    <div className="w-3.5 h-3.5 rounded flex items-center justify-center" style={{ backgroundColor: a.selected ? C.teal : C.panel, border: "1px solid " + (a.selected ? C.teal : C.hairline) }}>
                      {a.selected && <span className="text-white text-[9px] leading-none">✓</span>}
                    </div>
                    Selected
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <ToggleBtn enabled={a.enabled} onToggle={() => toggle(i)} />
                  <button onClick={() => remove(i)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:opacity-70" style={{ backgroundColor: C.panel, color: C.muted }}><Trash2 className="w-3.5 h-3.5" strokeWidth={2} /></button>
                </div>
              </div>
              <FieldInput label="Angle name" value={a.name} onChange={v => upd(i, "name", v)} placeholder="[Angle Name]" />
              <FieldInput label="Tagline" value={a.tagline} onChange={v => upd(i, "tagline", v)} placeholder="[One-line hook that captures the creative angle]" />
            </div>
          </SectionCard>
        );
      })}
      <button onClick={add} className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Angle
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HOOKS
// ════════════════════════════════════════════════════════════════════════════

function HooksView({ data }) {
  return (
    <div className="space-y-3">
      {data.map((h, i) => (
        <SectionCard key={i} dimmed={!h.enabled}>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[14px] font-bold flex-shrink-0" style={{ background: h.enabled ? "linear-gradient(135deg," + C.tealDeep + "," + C.teal + ")" : C.panel, color: h.enabled ? "#fff" : C.faint }}>
              {h.letter}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.faint, letterSpacing: "0.1em" }}>{h.type}</span>
                {!h.enabled && <HiddenBadge />}
              </div>
              <div className="text-[15px] font-semibold" style={{ color: C.ink }}>"{h.line}"</div>
            </div>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

function HooksEdit({ data, onChange }) {
  function upd(i, f, v) { onChange(data.map((h, idx) => idx === i ? { ...h, [f]: v } : h)); }
  function toggle(i) { upd(i, "enabled", !data[i].enabled); }
  function remove(i) { onChange(data.filter((_, idx) => idx !== i)); }
  function add() {
    const letter = String.fromCharCode(65 + data.length);
    onChange([...data, { letter, type: "", line: "", enabled: true }]);
  }

  return (
    <div className="space-y-3">
      {data.map((h, i) => (
        <SectionCard key={i} dimmed={!h.enabled}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold flex-shrink-0" style={{ backgroundColor: h.enabled ? C.tealDeep : C.panel, color: h.enabled ? "#fff" : C.faint }}>{h.letter}</div>
                <input type="text" value={h.type} onChange={e => upd(i, "type", e.target.value)} placeholder="Hook type (Curiosity, Story...)" className="text-[12px] font-semibold outline-none bg-transparent" style={{ color: C.faint, width: 180 }} />
              </div>
              <div className="flex items-center gap-2">
                <ToggleBtn enabled={h.enabled} onToggle={() => toggle(i)} />
                <button onClick={() => remove(i)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:opacity-70" style={{ backgroundColor: C.panel, color: C.muted }}><Trash2 className="w-3.5 h-3.5" strokeWidth={2} /></button>
              </div>
            </div>
            <FieldInput label="Hook line" value={h.line} onChange={v => upd(i, "line", v)} multiline rows={2} placeholder="[Opening line that stops the scroll]" />
          </div>
        </SectionCard>
      ))}
      <button onClick={add} className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Hook
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════════════

export default function ResearchDetail({ navigate, context }) {
  const campaignId = context?.campaignId;
  const campaign = CAMPAIGNS.find(c => c.id === campaignId);
  const raw = RESEARCH[campaignId];

  const [activeSection, setActiveSection] = useState("customer");
  const [publishStates, setPublishStates] = useState({ customer: "draft", beliefs: "draft", competitor: "draft", offer: "draft", angles: "draft", hooks: "draft" });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [localData, setLocalData] = useState(() => {
    if (!raw) return { customer: null, beliefs: null, competitor: null, offer: null, angles: null, hooks: null, status: {} };
    return {
      customer:   normalizeSection("customer",   raw.customer),
      beliefs:    normalizeSection("beliefs",    raw.beliefs),
      competitor: normalizeSection("competitor", raw.competitor),
      offer:      normalizeSection("offer",      raw.offer),
      angles:     normalizeSection("angles",     raw.angles),
      hooks:      normalizeSection("hooks",      raw.hooks),
      status: raw.status || {},
    };
  });

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="text-[14px] font-semibold" style={{ color: C.ink }}>Campaign not found.</div>
        <button onClick={() => navigate("research")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold" style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}>
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} /> Back to Research
        </button>
      </div>
    );
  }

  const sectionData = localData[activeSection];
  const currentPublishState = publishStates[activeSection];
  const activeSecMeta = SECTIONS.find(s => s.id === activeSection);

  function changeSection(id) {
    if (editing) { setEditing(false); setDraft(null); }
    setActiveSection(id);
  }

  function handleEdit() {
    const current = localData[activeSection];
    setDraft(current !== null && current !== undefined ? deepClone(current) : deepClone(TEMPLATES[activeSection]));
    setEditing(true);
  }

  function handleSave() {
    setLocalData(prev => ({
      ...prev,
      [activeSection]: draft,
      status: { ...prev.status, [activeSection]: prev.status[activeSection] === "complete" ? "complete" : "in-progress" },
    }));
    setEditing(false);
    setDraft(null);
  }

  function handleCancel() { setEditing(false); setDraft(null); }

  function renderContent() {
    if (editing) {
      switch (activeSection) {
        case "customer":   return <CustomerEdit   data={draft} onChange={setDraft} />;
        case "beliefs":    return <BeliefsEdit    data={draft} onChange={setDraft} />;
        case "competitor": return <CompetitorEdit data={draft} onChange={setDraft} />;
        case "offer":      return <OfferEdit      data={draft} onChange={setDraft} />;
        case "angles":     return <AnglesEdit     data={draft} onChange={setDraft} />;
        case "hooks":      return <HooksEdit      data={draft} onChange={setDraft} />;
        default: return null;
      }
    }
    if (!sectionData) return <NullState label={activeSecMeta?.label} onEdit={handleEdit} />;
    switch (activeSection) {
      case "customer":   return <CustomerView   data={sectionData} />;
      case "beliefs":    return <BeliefsView    data={sectionData} />;
      case "competitor": return <CompetitorView data={sectionData} />;
      case "offer":      return <OfferView      data={sectionData} />;
      case "angles":     return <AnglesView     data={sectionData} />;
      case "hooks":      return <HooksView      data={sectionData} />;
      default: return null;
    }
  }

  return (
    <div className="pb-10">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("research")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold hover:opacity-80" style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}>
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} /> Back
        </button>
        <span className="text-[12px]" style={{ color: C.faint }}>Research / <span style={{ color: C.ink }}>{campaign.clientName} — {campaign.title}</span></span>
      </div>

      <div className="rounded-xl px-5 py-3.5 flex items-center gap-4 mb-6" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg," + C.tealDeep + "," + C.teal + ")" }}>
          {campaign.clientName.split(" ").map(w => w[0]).join("").slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold" style={{ color: C.ink }}>{campaign.title}</div>
          <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{campaign.clientName} · {campaign.product}</div>
        </div>
        <button onClick={() => navigate("campaign-detail", { campaignId: campaign.id })} className="text-[12px] font-semibold" style={{ color: C.teal }}>View campaign →</button>
      </div>

      <div className="flex gap-5">
        <div className="w-48 flex-shrink-0">
          <div className="rounded-xl overflow-hidden sticky top-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            {SECTIONS.map((sec, i) => {
              const on = activeSection === sec.id;
              const Icon = sec.icon;
              const st = SECTION_STATUS[localData.status?.[sec.id] || "not-started"];
              return (
                <button key={sec.id} onClick={() => changeSection(sec.id)}
                  className="w-full flex flex-col gap-1 px-4 py-3 text-left transition-colors"
                  style={{ backgroundColor: on ? C.tealTint : "transparent", borderLeft: on ? "2px solid " + C.teal : "2px solid transparent", borderBottom: i < SECTIONS.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" strokeWidth={on ? 2.2 : 1.8} style={{ color: on ? C.teal : C.muted }} />
                    <span className="text-[12px] font-semibold" style={{ color: on ? C.teal : C.text }}>{sec.label}</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded self-start" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 gap-4">
            <div>
              <h2 className="text-[16px] font-semibold" style={{ color: C.ink }}>{activeSecMeta?.label}</h2>
              <p className="text-[12px] mt-0.5" style={{ color: C.muted }}>{activeSecMeta?.desc}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid " + C.hairline }}>
                {PUBLISH_STATES.map((ps, idx) => {
                  const active = currentPublishState === ps.id;
                  return (
                    <button key={ps.id} onClick={() => setPublishStates(p => ({ ...p, [activeSection]: ps.id }))}
                      className="px-3 py-1.5 text-[11px] font-bold transition-colors"
                      style={{ backgroundColor: active ? ps.bg : C.surface, color: active ? ps.color : C.faint, borderRight: idx < 2 ? "1px solid " + C.hairlineSoft : "none" }}
                    >{ps.label}</button>
                  );
                })}
              </div>
              {!editing ? (
                <button onClick={handleEdit} className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold text-white" style={{ backgroundColor: C.tealDeep }}>
                  <Edit3 className="w-3.5 h-3.5" strokeWidth={2} /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={handleCancel} className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
                    <X className="w-3.5 h-3.5" strokeWidth={2} /> Cancel
                  </button>
                  <button onClick={handleSave} className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold text-white" style={{ backgroundColor: C.tealDeep }}>
                    <Save className="w-3.5 h-3.5" strokeWidth={2} /> Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {currentPublishState !== "draft" && (
            <div className="mb-4 px-4 py-2.5 rounded-xl text-[12px] font-semibold flex items-center gap-2"
              style={{ backgroundColor: currentPublishState === "review" ? C.amberSoft : C.greenSoft, color: currentPublishState === "review" ? C.amber : C.green, border: "1px solid " + (currentPublishState === "review" ? C.amber + "33" : C.green + "33") }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: currentPublishState === "review" ? C.amber : C.green }} />
              {currentPublishState === "review" ? "Awaiting brand approval — visible to brand portal with review badge" : "Live on brand portal — visible to client"}
            </div>
          )}

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
