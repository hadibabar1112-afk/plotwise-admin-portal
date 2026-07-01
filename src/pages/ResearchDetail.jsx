import { useState } from "react";
import {
  ArrowLeft, Eye, EyeOff, Plus, Trash2, Edit3, Save, X,
  Users, Lightbulb, Target, Anchor, Zap, BookOpen, HelpCircle,
  ChevronDown, ChevronUp
} from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS } from "../data/campaigns";
import { RESEARCH } from "../data/research";

// ── Constants ─────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "customer",   label: "The Audience",           icon: Users,     desc: "Three customer personas, behavioral drivers, and creative implications" },
  { id: "beliefs",    label: "Beliefs & Barriers",     icon: Lightbulb, desc: "Category-wide and persona-specific beliefs to shift" },
  { id: "competitor", label: "Competitive Landscape",  icon: Target,    desc: "Competitor analysis — creator mix, funnel, and channel gaps" },
  { id: "offer",      label: "Value Architecture",     icon: Anchor,    desc: "Value stack, persona × funnel matrix, and language guide" },
  { id: "angles",     label: "Angles & Creative",      icon: Zap,       desc: "Creative hypotheses and the briefs behind them" },
  { id: "hooks",      label: "Hook Library",           icon: BookOpen,  desc: "Every hook tested, organized by pattern and funnel stage" },
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

const VALUE_LAYER_COLORS = {
  Functional:      { bg: C.tealMist,  color: C.teal  },
  Transformational:{ bg: C.greenSoft, color: C.green },
  Experiential:    { bg: C.amberSoft, color: C.amber },
  Identity:        { bg: C.panel,     color: C.text  },
};

const BELIEF_THEMES   = ["Efficacy", "Trust", "Identity", "Value"];
const VALUE_LAYERS    = ["Functional", "Transformational", "Experiential", "Identity"];
const HOOK_PATTERNS   = ["Contrarian", "Story", "Curiosity", "Admission", "Question", "Stat"];
const FUNNEL_STAGES   = ["TOF", "MOF", "BOF"];
const PERSONA_KEYS    = ["p1", "p2", "p3"];
const CHANNEL_STATES  = ["Heavy", "Light", "Absent"];

// ── Templates ─────────────────────────────────────────────────────────────────

const TPL_PERSONA = (id, n) => ({
  id,
  name: `The [Archetype ${n}] Persona`,
  distillation: "[One-sentence behavioral summary — what defines this buyer type]",
  behavioralDriver: "[The core psychological driver. Why does she behave this way? What made her this kind of buyer?]",
  priority: null,
  enabled: true,
  demographic: [
    { label: "Age range", value: "[XX–XX]" },
    { label: "Income band", value: "$[X]k – $[Y]k" },
    { label: "Life stage", value: "[Single/partnered/kids]" },
    { label: "Location", value: "[Urban/suburban/rural]" },
    { label: "Profession", value: "[Type of work or role]" },
    { label: "Education", value: "[Highest education level]" },
    { label: "Identity marker", value: "Identifies as '[adjective]' and '[adjective]'" },
  ],
  pain: [
    "[Specific pain point — behavioral and concrete]",
    "[A second pain point she'd articulate herself]",
  ],
  desires: [
    "[What she actually wants — not the product, the outcome]",
    "[A second desire, emotionally anchored]",
  ],
  beliefs: [
    "[A belief she holds about the category]",
    "[A belief that creates a barrier to purchase]",
  ],
  vocabulary: [
    { hers: "[Exact phrase she uses]", category: "[Clinical/marketing equivalent]" },
    { hers: "[Another phrase she uses]", category: "[What it actually means]" },
  ],
  triggers: [
    "[What finally makes her buy — behavioral not abstract]",
    "[A second trigger — situational or social]",
  ],
  friction: [
    "[What stops her at checkout]",
    "[A second friction point — trust-related]",
  ],
  whereSheLives: [
    "[Platform + what she does there]",
    "[A second platform or community]",
  ],
  creativeImplication: "[Best angles, creator archetypes, hook patterns, and what to avoid for this persona.]",
});

const TEMPLATES = {
  customer: [TPL_PERSONA("p1", 1), TPL_PERSONA("p2", 2), TPL_PERSONA("p3", 3)],

  beliefs: {
    categoryWide: [
      {
        current: "[What the category broadly believes — the dominant misconception]",
        desired: "[What we need them to believe for this product to make sense]",
        implication: "[How this belief shift should manifest in creative — angle, format, proof mechanism]",
        funnelStage: "TOF", theme: "Efficacy",
        angleLink: "[Which creative angle directly addresses this belief]",
        enabled: true,
      },
      {
        current: "[A second category-wide belief — often about timelines or price]",
        desired: "[The reframed belief we need to earn at TOF]",
        implication: "[Specific hook approach or proof mechanism that creates this shift]",
        funnelStage: "TOF", theme: "Trust",
        angleLink: "[Which angle targets this belief]",
        enabled: true,
      },
    ],
    personaSpecific: {
      p1: [{
        current: "[Persona 1 specific belief — more personal and resistant than category-wide]",
        desired: "[The belief shift needed at consideration stage for this persona]",
        implication: "[Creator archetype, format, or proof mechanism specific to persona 1]",
        funnelStage: "MOF", theme: "Trust",
        angleLink: "[Angle targeting this persona's belief]",
        enabled: true,
      }],
      p2: [{
        current: "[Persona 2 specific belief — often about switching cost or comparison]",
        desired: "[What she needs to believe to justify switching]",
        implication: "[How to frame the switch without making her feel manipulated]",
        funnelStage: "MOF", theme: "Value",
        angleLink: "[Angle addressing persona 2's barrier]",
        enabled: true,
      }],
      p3: [{
        current: "[Persona 3 specific belief — often about brand voice or identity alignment]",
        desired: "[What she needs to believe about the brand's authenticity]",
        implication: "[Founder voice, trade-off language, or cultural-alignment signals]",
        funnelStage: "MOF", theme: "Identity",
        angleLink: "[Angle addressing persona 3's belief]",
        enabled: true,
      }],
    },
  },

  competitor: [
    {
      name: "[Competitor Brand Name]",
      handle: "@[handle]",
      summary: "[One-line competitive summary — positioning and channel approach]",
      whyPicked: "[Why this competitor is relevant to analyze for this campaign]",
      activeAds: 0,
      creatorMix: [
        { type: "[Creator type — e.g. Nano-influencer]", pct: 50, color: "#207771" },
        { type: "[Second creator type]", pct: 30, color: "#3A9690" },
        { type: "[Third creator type]", pct: 20, color: "#A8D4C8" },
      ],
      formatMix: [
        { type: "[Format — e.g. UGC vertical]", pct: 60, color: "#207771" },
        { type: "[Second format]", pct: 40, color: "#A8D4C8" },
      ],
      funnelMix: { TOF: 60, MOF: 30, BOF: 10 },
      primaryChannel: "[Primary channel]",
      channels: [
        { name: "Meta", state: "Heavy", note: "[What their Meta presence looks like]", confidence: "Estimated" },
        { name: "TikTok", state: "Light", note: "[TikTok investment level]", confidence: "Estimated" },
        { name: "YouTube", state: "Absent", note: "[YouTube presence]", confidence: "Estimated" },
      ],
      creatorVerdict: "[What their creator mix reveals — and the opportunity it creates for us]",
      funnelVerdict: "[What their funnel distribution tells us — and how we exploit it]",
      channelVerdict: "[Channel gap or opportunity this competitor leaves open]",
      enabled: true,
    },
    {
      name: "[Second Competitor]",
      handle: "@[handle]",
      summary: "[One-line summary]",
      whyPicked: "[Why this one matters]",
      activeAds: 0,
      creatorMix: [
        { type: "[Creator type]", pct: 60, color: "#207771" },
        { type: "[Second type]", pct: 40, color: "#A8D4C8" },
      ],
      formatMix: [
        { type: "[Format]", pct: 70, color: "#207771" },
        { type: "[Second format]", pct: 30, color: "#A8D4C8" },
      ],
      funnelMix: { TOF: 50, MOF: 35, BOF: 15 },
      primaryChannel: "[Primary channel]",
      channels: [
        { name: "Meta", state: "Heavy", note: "[Description]", confidence: "Estimated" },
        { name: "TikTok", state: "Absent", note: "[Description]", confidence: "Estimated" },
      ],
      creatorVerdict: "[Creator mix verdict for competitor 2]",
      funnelVerdict: "[Funnel verdict for competitor 2]",
      channelVerdict: "[Channel verdict for competitor 2]",
      enabled: true,
    },
  ],

  offer: {
    valueStack: [
      { layer: "Functional",       headline: "[What the product actually does]",     body: "[Mechanism, ingredients, and results timeline with numbers]", enabled: true },
      { layer: "Transformational", headline: "[What changes for the customer]",      body: "[The behavioral or emotional transformation in her daily life]", enabled: true },
      { layer: "Experiential",     headline: "[How it feels to use]",                body: "[Texture, ritual, sensory detail — the moment of use]", enabled: true },
      { layer: "Identity",         headline: "[What it says about the customer]",    body: "[Self-concept alignment — what choosing this signals about who she is]", enabled: true },
    ],
    valueMatrix: {
      p1: {
        TOF: { primary: "Functional",       secondary: "Transformational", note: "[Why this pairing for persona 1 at TOF]" },
        MOF: { primary: "Functional",       secondary: "Transformational", note: "[Why this pairing for persona 1 at MOF]" },
        BOF: { primary: "Transformational", secondary: "Functional",       note: "[Why this pairing for persona 1 at BOF]" },
      },
      p2: {
        TOF: { primary: "Transformational", secondary: "Experiential",     note: "[Why this pairing for persona 2 at TOF]" },
        MOF: { primary: "Experiential",     secondary: "Transformational", note: "[Why this pairing for persona 2 at MOF]" },
        BOF: { primary: "Experiential",     secondary: "Identity",         note: "[Why this pairing for persona 2 at BOF]" },
      },
      p3: {
        TOF: { primary: "Identity",         secondary: "Experiential",     note: "[Why this pairing for persona 3 at TOF]" },
        MOF: { primary: "Identity",         secondary: "Experiential",     note: "[Why this pairing for persona 3 at MOF]" },
        BOF: { primary: "Identity",         secondary: "Transformational", note: "[Why this pairing for persona 3 at BOF]" },
      },
    },
    personaLanguage: {
      p1: { title: "For the [Persona 1 name]", use: ["[Language to use]", "[Second example]"], avoid: ["[What to avoid]", "[Second avoid]"] },
      p2: { title: "For the [Persona 2 name]", use: ["[Language to use]", "[Second example]"], avoid: ["[What to avoid]", "[Second avoid]"] },
      p3: { title: "For the [Persona 3 name]", use: ["[Language to use]", "[Second example]"], avoid: ["[What to avoid]", "[Second avoid]"] },
    },
  },

  angles: [
    {
      id: "angle-tpl-1",
      name: "[Angle Name]",
      tagline: "[One-line hook that captures the creative direction]",
      stage: "TOF", valueLayer: "Functional", recommended: true,
      beliefTier: "Category-wide",
      beliefRef: "[Which belief in Section 02 this angle is designed to shift]",
      why: "[Why this angle exists — the specific barrier it addresses and why it's the right approach]",
      hypothesis: "[What we expect to happen when this creative runs. Predicted audience behavior]",
      measure: "[How we'll know this is working. Primary and secondary metrics to watch]",
      enabled: true,
    },
    {
      id: "angle-tpl-2",
      name: "[Second Angle]",
      tagline: "[Hook targeting a different belief or persona]",
      stage: "MOF", valueLayer: "Transformational", recommended: false,
      beliefTier: "Persona-specific",
      beliefRef: "[Which persona-specific belief this addresses]",
      why: "[Why this angle — what specific barrier at MOF]",
      hypothesis: "[Predicted behavior at consideration stage]",
      measure: "[How we measure this MOF angle's effectiveness]",
      enabled: true,
    },
  ],

  hooks: [
    { id: "hook-tpl-1", text: "[A hook that stops the scroll — contrarian or curiosity-driven]", stage: "TOF", pattern: "Contrarian", variant: "A", angle: "[Angle name]", enabled: true },
    { id: "hook-tpl-2", text: "[The B variant — same angle, different pattern]",                 stage: "TOF", pattern: "Story",      variant: "B", angle: "[Angle name]", enabled: true },
    { id: "hook-tpl-3", text: "[A MOF hook — different funnel stage, different intent]",         stage: "MOF", pattern: "Curiosity",  variant: "A", angle: "[Angle name]", enabled: false },
  ],
};

// ── Normalize: upgrade old or bare data to new shape ─────────────────────────

function normStr(x) { return typeof x === "string" ? x : (x?.text || ""); }

function normalizeSection(id, raw) {
  if (!raw) return null;
  switch (id) {
    case "customer": {
      if (Array.isArray(raw)) return raw.map(p => ({ priority: null, enabled: true, demographic: [], vocabulary: [], triggers: [], friction: [], whereSheLives: [], ...p }));
      // legacy shape → wrap as single persona
      return [{
        id: "p1", priority: null, enabled: true,
        name: raw.headline || "[Persona]",
        distillation: raw.distillation || "",
        behavioralDriver: "",
        demographic: [],
        pain: (raw.pain || []).map(normStr),
        desires: (raw.desires || []).map(normStr),
        beliefs: (raw.beliefs || []).map(normStr),
        vocabulary: (raw.vocab || []).map(v => typeof v === "string" ? { hers: v, category: "" } : { hers: v.hers || "", category: v.category || "" }),
        triggers: [],
        friction: [],
        whereSheLives: (raw.hangouts || []).map(normStr),
        creativeImplication: "",
      }];
    }
    case "beliefs": {
      if (raw.categoryWide) {
        const norm = b => ({ enabled: true, funnelStage: "TOF", theme: "Efficacy", angleLink: "", ...b });
        return {
          categoryWide: (raw.categoryWide || []).map(norm),
          personaSpecific: Object.fromEntries(
            PERSONA_KEYS.map(k => [k, (raw.personaSpecific?.[k] || []).map(norm)])
          ),
        };
      }
      // legacy: array of {belief, reality, priority}
      return {
        categoryWide: raw.map(b => ({
          current: b.belief || "", desired: b.reality || "",
          implication: "", funnelStage: "TOF",
          theme: b.priority === "primary" ? "Efficacy" : "Trust",
          angleLink: "", enabled: true,
        })),
        personaSpecific: { p1: [], p2: [], p3: [] },
      };
    }
    case "competitor": {
      if (Array.isArray(raw)) return raw.map(c => ({
        enabled: true, handle: "", whyPicked: "", activeAds: 0,
        creatorMix: [], formatMix: [],
        funnelMix: { TOF: 60, MOF: 30, BOF: 10 },
        primaryChannel: "", channels: [],
        funnelVerdict: "", channelVerdict: "",
        ...c,
        summary: c.summary || c.positioning || "",
        creatorVerdict: c.creatorVerdict || c.gap || "",
      }));
      return [{ ...raw, enabled: true }];
    }
    case "offer": {
      if (raw.valueStack) return {
        ...raw,
        valueStack: raw.valueStack.map(vs => ({ enabled: true, ...vs })),
        valueMatrix: raw.valueMatrix || TEMPLATES.offer.valueMatrix,
        personaLanguage: raw.personaLanguage || TEMPLATES.offer.personaLanguage,
      };
      // legacy shape
      return {
        valueStack: [
          { layer: "Functional",       headline: raw.headline || "",    body: raw.mechanism || "", enabled: true },
          { layer: "Transformational", headline: "What changes",        body: raw.proof || "",     enabled: true },
          { layer: "Experiential",     headline: "How it feels",        body: "",                  enabled: true },
          { layer: "Identity",         headline: "What it signals",     body: raw.differentiation || "", enabled: true },
        ],
        valueMatrix: TEMPLATES.offer.valueMatrix,
        personaLanguage: {
          p1: { title: "For persona 1", use: (raw.keyIngredients || []).map(normStr), avoid: [] },
          p2: { title: "For persona 2", use: [], avoid: [] },
          p3: { title: "For persona 3", use: [], avoid: [] },
        },
      };
    }
    case "angles":
      return Array.isArray(raw) ? raw.map(a => ({
        enabled: true, valueLayer: "Functional", recommended: a.selected || false,
        beliefTier: "Category-wide", beliefRef: "", why: "", hypothesis: "", measure: "",
        ...a,
      })) : [];
    case "hooks":
      return Array.isArray(raw) ? raw.map(h => ({
        enabled: true, stage: "TOF", pattern: h.type || "Contrarian",
        variant: h.letter || "A", angle: h.angle || "",
        id: h.id || ("hook-" + Math.random().toString(36).slice(2)),
        text: h.line || h.text || "",
        ...h,
      })) : [];
    default: return raw;
  }
}

function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

// ── Primitives ────────────────────────────────────────────────────────────────

function ToggleBtn({ enabled, onToggle }) {
  return (
    <button onClick={onToggle} title={enabled ? "Visible to client — click to hide" : "Hidden from client — click to show"}
      className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 transition-colors"
      style={{ backgroundColor: enabled ? C.tealMist : C.panel, color: enabled ? C.teal : C.faint }}>
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

function SectionCard({ title, children, dimmed = false, enabled, onToggle }) {
  const isDisabled = enabled === false;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, opacity: dimmed ? 0.5 : 1 }}>
      {title && (
        <div className="px-5 py-2.5 flex items-center justify-between" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: isDisabled ? C.panel : C.bgWarm }}>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.12em" }}>{title}</span>
            {isDisabled && !onToggle && <HiddenBadge />}
          </div>
          {onToggle !== undefined && <ToggleBtn enabled={enabled ?? true} onToggle={onToggle} />}
        </div>
      )}
      <div className="p-5" style={{ opacity: isDisabled ? 0.4 : 1 }}>{children}</div>
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
        : <input type="text" value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 text-[13px] outline-none" style={s} />}
    </div>
  );
}

function SelectInput({ label, value, onChange, options }) {
  return (
    <div>
      {label && <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.faint, letterSpacing: "0.1em" }}>{label}</div>}
      <select value={value || ""} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 text-[13px] outline-none rounded-lg"
        style={{ backgroundColor: C.bg, border: "1.5px solid " + C.hairline, color: C.ink }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
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

function ListEditor({ items, onChange, placeholder, dotColor }) {
  function upd(i, v) { onChange(items.map((x, idx) => idx === i ? v : x)); }
  function remove(i) { onChange(items.filter((_, idx) => idx !== i)); }
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: dotColor || C.teal }} />
          <input type="text" value={typeof item === "string" ? item : ""} onChange={e => upd(i, e.target.value)} placeholder={placeholder}
            className="flex-1 text-[13px] outline-none bg-transparent" style={{ color: C.ink }} />
          <button onClick={() => remove(i)} className="w-5 h-5 flex items-center justify-center rounded hover:opacity-70" style={{ color: C.faint }}>
            <X className="w-3 h-3" strokeWidth={2.5} />
          </button>
        </div>
      ))}
    </div>
  );
}

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

// ── Chip helpers ──────────────────────────────────────────────────────────────

function StageChip({ stage }) {
  const s = STAGE_COLORS[stage] || STAGE_COLORS.TOF;
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: s.bg, color: s.color }}>{stage}</span>;
}
function LayerChip({ layer }) {
  const s = VALUE_LAYER_COLORS[layer] || { bg: C.panel, color: C.muted };
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: s.bg, color: s.color }}>{layer}</span>;
}

// ════════════════════════════════════════════════════════════════════════════
// CUSTOMER — The Audience
// ════════════════════════════════════════════════════════════════════════════

const PRIORITY_CONFIG = {
  primary:   { label: "Primary",   color: C.teal,  bg: C.tealMist  },
  secondary: { label: "Secondary", color: C.amber, bg: C.amberSoft },
  tertiary:  { label: "Tertiary",  color: C.muted, bg: C.panel     },
};

function CustomerView({ data }) {
  const [selectedId, setSelectedId] = useState(data[0]?.id || "p1");
  const persona = data.find(p => p.id === selectedId) || data[0];
  if (!persona) return null;

  return (
    <div className="space-y-4">
      {/* Persona selector */}
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
        {data.map(p => {
          const pc = p.priority ? PRIORITY_CONFIG[p.priority] : null;
          const isActive = p.id === selectedId;
          return (
            <button key={p.id} onClick={() => setSelectedId(p.id)}
              className="rounded-xl p-4 text-left transition-all"
              style={{ backgroundColor: C.surface, border: "1.5px solid " + (isActive ? C.teal : C.hairline), opacity: p.enabled ? 1 : 0.45 }}>
              <div className="flex items-center justify-between mb-2">
                {pc
                  ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: pc.bg, color: pc.color }}>{pc.label}</span>
                  : <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.faint }}>Unranked</span>}
                {!p.enabled && <HiddenBadge />}
              </div>
              <div className="text-[13px] font-semibold mb-1" style={{ color: C.ink }}>{p.name}</div>
              <div className="text-[11px] leading-snug" style={{ color: C.muted }}>{p.distillation}</div>
            </button>
          );
        })}
      </div>

      {/* Deep dive */}
      <SectionCard title="Behavioral Driver">
        <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{persona.behavioralDriver}</p>
      </SectionCard>

      {persona.demographic?.length > 0 && (
        <SectionCard title="Demographic & Psychographic">
          <div className="grid grid-cols-2 gap-0 rounded-xl overflow-hidden" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}>
            {persona.demographic.map((d, i) => (
              <div key={i} className="px-4 py-2.5 flex items-center gap-3"
                style={{ borderBottom: i < persona.demographic.length - 2 ? "1px solid " + C.hairlineSoft : "none", borderRight: i % 2 === 0 ? "1px solid " + C.hairlineSoft : "none" }}>
                <div className="text-[10px] font-bold uppercase tracking-wider w-28 flex-shrink-0" style={{ color: C.faint }}>{d.label}</div>
                <div className="text-[12px] font-semibold" style={{ color: C.ink }}>{d.value}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <div className="grid grid-cols-3 gap-3">
        {[{ key: "pain", label: "Pain Points", color: C.rose }, { key: "desires", label: "Desires", color: C.green }, { key: "beliefs", label: "Beliefs", color: C.amber }].map(({ key, label, color }) => (
          <SectionCard key={key} title={label}>
            <ul className="space-y-2">
              {(persona[key] || []).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] leading-snug" style={{ color: C.text }}>
                  <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                  {typeof item === "string" ? item : item.text}
                </li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </div>

      {(persona.vocabulary || []).length > 0 && (
        <SectionCard title="Her Vocabulary">
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid " + C.hairlineSoft }}>
            <div className="grid grid-cols-2" style={{ backgroundColor: C.bgWarm, borderBottom: "1px solid " + C.hairlineSoft }}>
              <div className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: C.teal, borderRight: "1px solid " + C.hairlineSoft }}>She says</div>
              <div className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: C.muted }}>The category says</div>
            </div>
            {persona.vocabulary.map((v, i) => (
              <div key={i} className="grid grid-cols-2" style={{ borderTop: i > 0 ? "1px solid " + C.hairlineSoft : "none" }}>
                <div className="px-4 py-2.5 text-[12px] italic" style={{ color: C.ink, borderRight: "1px solid " + C.hairlineSoft }}>"{v.hers}"</div>
                <div className="px-4 py-2.5 text-[12px]" style={{ color: C.muted }}>{v.category}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <div className="grid grid-cols-2 gap-3">
        {[{ key: "triggers", label: "Purchase Triggers", tone: "green" }, { key: "friction", label: "Friction at Checkout", tone: "rose" }].map(({ key, label, tone }) => (
          <SectionCard key={key} title={label}>
            <ul className="space-y-2">
              {(persona[key] || []).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] leading-snug" style={{ color: C.text }}>
                  <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: tone === "green" ? C.green : C.rose }} />
                  {item}
                </li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </div>

      {(persona.whereSheLives || []).length > 0 && (
        <SectionCard title="Where She Lives Online">
          <div className="grid grid-cols-2 gap-2">
            {persona.whereSheLives.map((item, i) => (
              <div key={i} className="rounded-lg px-3 py-2 text-[12px]" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft, color: C.text }}>{item}</div>
            ))}
          </div>
        </SectionCard>
      )}

      {persona.creativeImplication && (
        <SectionCard title="Creative Implication">
          <p className="text-[13px] leading-relaxed" style={{ color: C.ink }}>{persona.creativeImplication}</p>
        </SectionCard>
      )}
    </div>
  );
}

function CustomerEdit({ data, onChange }) {
  const [activeId, setActiveId] = useState(data[0]?.id || "p1");
  const idx = data.findIndex(p => p.id === activeId);
  const p = data[idx] ?? data[0];

  function updP(field, val) { onChange(data.map((x, i) => i === idx ? { ...x, [field]: val } : x)); }
  function updArr(field, i, val) { updP(field, p[field].map((x, j) => j === i ? val : x)); }
  function addToArr(field, def) { updP(field, [...(p[field] || []), def]); }
  function removeFromArr(field, i) { updP(field, (p[field] || []).filter((_, j) => j !== i)); }
  function updDemog(i, key, val) { updP("demographic", p.demographic.map((d, j) => j === i ? { ...d, [key]: val } : d)); }
  function updVocab(i, key, val) { updP("vocabulary", p.vocabulary.map((v, j) => j === i ? { ...v, [key]: val } : v)); }
  function addPersona() {
    const n = data.length + 1;
    const newP = deepClone(TPL_PERSONA("p" + n, n));
    onChange([...data, newP]);
    setActiveId(newP.id);
  }

  const StrList = ({ field, placeholder, dotColor }) => (
    <>
      <ListEditor items={p[field] || []} onChange={v => updP(field, v)} placeholder={placeholder} dotColor={dotColor} />
      <AddBtn label={"Add " + field.replace(/([A-Z])/g, " $1").toLowerCase()} onClick={() => addToArr(field, "")} />
    </>
  );

  return (
    <div className="space-y-4">
      {/* Persona tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {data.map(persona => (
          <button key={persona.id} onClick={() => setActiveId(persona.id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{ backgroundColor: persona.id === activeId ? C.tealDeep : C.panel, color: persona.id === activeId ? "#fff" : C.muted }}>
            <ToggleBtn enabled={persona.enabled} onToggle={() => onChange(data.map(x => x.id === persona.id ? { ...x, enabled: !x.enabled } : x))} />
            {persona.name.slice(0, 28)}
          </button>
        ))}
        <button onClick={addPersona} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold" style={{ backgroundColor: C.panel, color: C.teal }}>
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Add Persona
        </button>
        {data.length > 1 && (
          <button onClick={() => { onChange(data.filter((_, i) => i !== idx)); setActiveId(data[0].id); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold" style={{ backgroundColor: C.roseSoft, color: C.rose }}>
            <Trash2 className="w-3.5 h-3.5" strokeWidth={2} /> Remove
          </button>
        )}
      </div>

      <SectionCard title="Persona Overview">
        <div className="space-y-3">
          <FieldInput label="Persona Name" value={p.name} onChange={v => updP("name", v)} placeholder="The [Archetype] Persona" />
          <FieldInput label="One-sentence distillation" value={p.distillation} onChange={v => updP("distillation", v)} placeholder="Over-researched. Burned before. Buys cautiously." />
          <FieldInput label="Behavioral driver" value={p.behavioralDriver} onChange={v => updP("behavioralDriver", v)} multiline rows={3} placeholder="Why does she behave this way?" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.faint }}>Priority</div>
            <div className="flex items-center gap-2">
              {["primary", "secondary", "tertiary", null].map(prio => {
                const cfg = prio ? PRIORITY_CONFIG[prio] : { label: "Unranked", color: C.faint, bg: C.panel };
                return (
                  <button key={prio || "none"} onClick={() => updP("priority", prio)}
                    className="px-3 py-1 rounded-lg text-[11px] font-semibold"
                    style={{ backgroundColor: p.priority === prio ? cfg.bg : "transparent", color: cfg.color, border: "1px solid " + (p.priority === prio ? cfg.color : C.hairline) }}>
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Demographic & Psychographic">
        <div className="space-y-2">
          {(p.demographic || []).map((d, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <input type="text" value={d.label} onChange={e => updDemog(i, "label", e.target.value)} placeholder="Label" className="px-3 py-2 text-[12px] rounded-lg outline-none" style={{ backgroundColor: C.bg, border: "1.5px solid " + C.hairline, color: C.muted }} />
              <div className="flex gap-2">
                <input type="text" value={d.value} onChange={e => updDemog(i, "value", e.target.value)} placeholder="Value" className="flex-1 px-3 py-2 text-[12px] rounded-lg outline-none" style={{ backgroundColor: C.bg, border: "1.5px solid " + C.hairline, color: C.ink }} />
                <button onClick={() => updP("demographic", p.demographic.filter((_, j) => j !== i))} className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: C.panel, color: C.faint }}><X className="w-3 h-3" strokeWidth={2.5} /></button>
              </div>
            </div>
          ))}
        </div>
        <AddBtn label="Add demographic row" onClick={() => addToArr("demographic", { label: "", value: "" })} />
      </SectionCard>

      <div className="grid grid-cols-3 gap-3">
        <SectionCard title="Pain Points">
          <StrList field="pain" placeholder="A specific pain point..." dotColor={C.rose} />
        </SectionCard>
        <SectionCard title="Desires">
          <StrList field="desires" placeholder="A desire..." dotColor={C.green} />
        </SectionCard>
        <SectionCard title="Beliefs">
          <StrList field="beliefs" placeholder="A belief she holds..." dotColor={C.amber} />
        </SectionCard>
      </div>

      <SectionCard title="Her Vocabulary">
        <div className="space-y-2">
          {(p.vocabulary || []).map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="text" value={v.hers} onChange={e => updVocab(i, "hers", e.target.value)} placeholder='"She says..."' className="flex-1 px-3 py-2 text-[13px] italic rounded-lg outline-none" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft, color: C.ink }} />
              <span style={{ color: C.hairline }}>→</span>
              <input type="text" value={v.category} onChange={e => updVocab(i, "category", e.target.value)} placeholder="Category term" className="w-40 px-3 py-2 text-[12px] rounded-lg outline-none" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft, color: C.muted }} />
              <button onClick={() => removeFromArr("vocabulary", i)} className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: C.panel, color: C.faint }}><X className="w-3 h-3" strokeWidth={2.5} /></button>
            </div>
          ))}
        </div>
        <AddBtn label="Add vocabulary pair" onClick={() => addToArr("vocabulary", { hers: "", category: "" })} />
      </SectionCard>

      <div className="grid grid-cols-2 gap-3">
        <SectionCard title="Purchase Triggers">
          <StrList field="triggers" placeholder="What makes her buy..." dotColor={C.green} />
        </SectionCard>
        <SectionCard title="Friction at Checkout">
          <StrList field="friction" placeholder="What stops her..." dotColor={C.rose} />
        </SectionCard>
      </div>

      <SectionCard title="Where She Lives Online">
        <StrList field="whereSheLives" placeholder="Platform or community..." dotColor={C.teal} />
      </SectionCard>

      <SectionCard title="Creative Implication">
        <FieldInput value={p.creativeImplication} onChange={v => updP("creativeImplication", v)} multiline rows={3} placeholder="Best angles, creator archetypes, hook patterns, and what to avoid..." />
      </SectionCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// BELIEFS — Beliefs & Barriers
// ════════════════════════════════════════════════════════════════════════════

function BeliefCard({ b }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid " + C.hairline, opacity: b.enabled ? 1 : 0.5 }}>
      <div className="flex gap-3 p-4" style={{ backgroundColor: C.bgWarm, borderBottom: "1px solid " + C.hairlineSoft }}>
        <StageChip stage={b.funnelStage} />
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.muted }}>{b.theme}</span>
        {!b.enabled && <HiddenBadge />}
        {b.angleLink && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.tealMist, color: C.teal }}>→ {b.angleLink}</span>}
      </div>
      <div className="p-4 grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-lg p-3" style={{ backgroundColor: C.roseSoft, border: "1px solid " + C.rose + "22" }}>
          <div className="text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: C.rose }}>Current belief</div>
          <div className="text-[13px] font-semibold leading-snug" style={{ color: C.ink }}>"{b.current}"</div>
        </div>
        <div className="rounded-lg p-3" style={{ backgroundColor: C.greenSoft, border: "1px solid " + C.green + "22" }}>
          <div className="text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: C.green }}>Desired belief</div>
          <div className="text-[13px] font-semibold leading-snug" style={{ color: C.ink }}>"{b.desired}"</div>
        </div>
      </div>
      {b.implication && (
        <div className="mx-4 mb-4 rounded-lg p-3" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}>
          <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: C.faint }}>Creative implication</div>
          <div className="text-[12px] leading-relaxed" style={{ color: C.muted }}>{b.implication}</div>
        </div>
      )}
    </div>
  );
}

function BeliefsView({ data }) {
  const [tab, setTab] = useState("category");
  const tabs = [{ key: "category", label: "Category-wide" }, ...PERSONA_KEYS.map(k => ({ key: k, label: "Persona " + k.toUpperCase() }))];

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 rounded-xl self-start" style={{ backgroundColor: C.panel, display: "inline-flex" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{ backgroundColor: tab === t.key ? C.surface : "transparent", color: tab === t.key ? C.ink : C.muted, boxShadow: tab === t.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {(tab === "category" ? data.categoryWide : (data.personaSpecific?.[tab] || [])).map((b, i) => (
          <BeliefCard key={i} b={b} />
        ))}
      </div>
    </div>
  );
}

function BeliefEditForm({ b, onChange, onRemove }) {
  function upd(f, v) { onChange({ ...b, [f]: v }); }
  return (
    <SectionCard dimmed={!b.enabled}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <SelectInput value={b.funnelStage} onChange={v => upd("funnelStage", v)} options={FUNNEL_STAGES} />
            <SelectInput value={b.theme} onChange={v => upd("theme", v)} options={BELIEF_THEMES} />
          </div>
          <div className="flex gap-2">
            <ToggleBtn enabled={b.enabled} onToggle={() => upd("enabled", !b.enabled)} />
            <button onClick={onRemove} className="w-7 h-7 flex items-center justify-center rounded-lg" style={{ backgroundColor: C.panel, color: C.muted }}><Trash2 className="w-3.5 h-3.5" strokeWidth={2} /></button>
          </div>
        </div>
        <FieldInput label="Current belief" value={b.current} onChange={v => upd("current", v)} placeholder="What they currently believe..." />
        <FieldInput label="Desired belief" value={b.desired} onChange={v => upd("desired", v)} placeholder="What we need them to believe..." />
        <FieldInput label="Creative implication" value={b.implication} onChange={v => upd("implication", v)} multiline rows={2} placeholder="How this belief shift manifests in creative..." />
        <FieldInput label="Angle link" value={b.angleLink} onChange={v => upd("angleLink", v)} placeholder="Which angle addresses this belief..." />
      </div>
    </SectionCard>
  );
}

function BeliefsEdit({ data, onChange }) {
  const [tab, setTab] = useState("category");
  const tabs = [{ key: "category", label: "Category-wide" }, ...PERSONA_KEYS.map(k => ({ key: k, label: "Persona " + k.toUpperCase() }))];

  function updCat(i, b) { onChange({ ...data, categoryWide: data.categoryWide.map((x, j) => j === i ? b : x) }); }
  function removeCat(i) { onChange({ ...data, categoryWide: data.categoryWide.filter((_, j) => j !== i) }); }
  function addCat() { onChange({ ...data, categoryWide: [...data.categoryWide, { current: "", desired: "", implication: "", funnelStage: "TOF", theme: "Efficacy", angleLink: "", enabled: true }] }); }

  function updPs(k, i, b) { onChange({ ...data, personaSpecific: { ...data.personaSpecific, [k]: data.personaSpecific[k].map((x, j) => j === i ? b : x) } }); }
  function removePs(k, i) { onChange({ ...data, personaSpecific: { ...data.personaSpecific, [k]: data.personaSpecific[k].filter((_, j) => j !== i) } }); }
  function addPs(k) { onChange({ ...data, personaSpecific: { ...data.personaSpecific, [k]: [...(data.personaSpecific[k] || []), { current: "", desired: "", implication: "", funnelStage: "MOF", theme: "Trust", angleLink: "", enabled: true }] } }); }

  const isCat = tab === "category";
  const psKey = isCat ? null : tab;
  const list = isCat ? data.categoryWide : (data.personaSpecific?.[psKey] || []);

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 rounded-xl self-start" style={{ backgroundColor: C.panel, display: "inline-flex" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{ backgroundColor: tab === t.key ? C.surface : "transparent", color: tab === t.key ? C.ink : C.muted, boxShadow: tab === t.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {list.map((b, i) => (
          <BeliefEditForm key={i} b={b}
            onChange={updated => isCat ? updCat(i, updated) : updPs(psKey, i, updated)}
            onRemove={() => isCat ? removeCat(i) : removePs(psKey, i)} />
        ))}
      </div>
      <button onClick={() => isCat ? addCat() : addPs(psKey)}
        className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold"
        style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Belief
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// COMPETITOR — Competitive Landscape
// ════════════════════════════════════════════════════════════════════════════

function MiniBar({ pct, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.hairline }}>
        <div className="h-full rounded-full" style={{ width: pct + "%", backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-bold tabular-nums w-7 text-right" style={{ color: C.ink }}>{pct}%</span>
    </div>
  );
}

function CompetitorView({ data }) {
  const [active, setActive] = useState(0);
  const comp = data[active];
  if (!comp) return null;

  return (
    <div className="space-y-4">
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(data.length, 3)}, 1fr)` }}>
        {data.map((c, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="text-left rounded-xl p-4 transition-all"
            style={{ backgroundColor: i === active ? C.tealMist : C.surface, border: "1px solid " + (i === active ? C.tealBorder : C.hairline), opacity: c.enabled ? 1 : 0.5 }}>
            <div className="flex items-center justify-between mb-1">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{c.name}</div>
              {c.activeAds > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.muted }}>{c.activeAds} ads</span>}
            </div>
            <div className="text-[10px] mb-1" style={{ color: C.muted }}>{c.handle}</div>
            <div className="text-[11px] leading-snug" style={{ color: C.text }}>{c.summary}</div>
            {!c.enabled && <div className="mt-2"><HiddenBadge /></div>}
          </button>
        ))}
      </div>

      <SectionCard title="Why We Picked This Competitor">
        <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{comp.whyPicked}</p>
      </SectionCard>

      <div className="grid grid-cols-2 gap-3">
        <SectionCard title="Creator Mix">
          <div className="space-y-2 mb-3">
            {(comp.creatorMix || []).map((m, i) => (
              <div key={i}>
                <div className="text-[11px] mb-1" style={{ color: C.muted }}>{m.type}</div>
                <MiniBar pct={m.pct} color={m.color} />
              </div>
            ))}
          </div>
          {comp.creatorVerdict && <div className="rounded-lg p-3 text-[11px] leading-relaxed" style={{ backgroundColor: C.bgWarm, color: C.muted, border: "1px solid " + C.hairlineSoft }}>{comp.creatorVerdict}</div>}
        </SectionCard>
        <SectionCard title="Format Mix">
          <div className="space-y-2 mb-3">
            {(comp.formatMix || []).map((m, i) => (
              <div key={i}>
                <div className="text-[11px] mb-1" style={{ color: C.muted }}>{m.type}</div>
                <MiniBar pct={m.pct} color={m.color} />
              </div>
            ))}
          </div>
          {comp.funnelMix && (
            <div className="mt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: C.faint }}>Funnel Distribution</div>
              <div className="flex gap-2">
                {Object.entries(comp.funnelMix).map(([stage, pct]) => {
                  const sc = STAGE_COLORS[stage] || STAGE_COLORS.TOF;
                  return (
                    <div key={stage} className="flex-1 rounded-lg p-2 text-center" style={{ backgroundColor: sc.bg }}>
                      <div className="text-[14px] font-bold" style={{ color: sc.color }}>{pct}%</div>
                      <div className="text-[10px] font-bold" style={{ color: sc.color }}>{stage}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </SectionCard>
      </div>

      {(comp.channels || []).length > 0 && (
        <SectionCard title="Channel Investment">
          {comp.primaryChannel && <div className="text-[12px] mb-3" style={{ color: C.muted }}>Primary: <span className="font-semibold" style={{ color: C.ink }}>{comp.primaryChannel}</span></div>}
          <div className="space-y-0">
            {comp.channels.map((ch, i) => {
              const chColors = { Heavy: { bg: C.tealMist, color: C.teal }, Light: { bg: C.amberSoft, color: C.amber }, Absent: { bg: C.panel, color: C.muted } };
              const s = chColors[ch.state] || chColors.Absent;
              return (
                <div key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: i < comp.channels.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg flex-shrink-0" style={{ backgroundColor: s.bg, color: s.color }}>{ch.state}</span>
                  <div className="flex-1">
                    <span className="text-[12px] font-semibold" style={{ color: C.ink }}>{ch.name}</span>
                    <span className="text-[11px] ml-2" style={{ color: C.muted }}>{ch.note}</span>
                  </div>
                  <span className="text-[9px] flex-shrink-0" style={{ color: C.faint }}>{ch.confidence}</span>
                </div>
              );
            })}
          </div>
          {comp.channelVerdict && <div className="mt-3 rounded-lg p-3 text-[11px] leading-relaxed" style={{ backgroundColor: C.bgWarm, color: C.muted, border: "1px solid " + C.hairlineSoft }}>{comp.channelVerdict}</div>}
        </SectionCard>
      )}

      {comp.funnelVerdict && (
        <SectionCard title="Funnel Verdict">
          <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>{comp.funnelVerdict}</p>
        </SectionCard>
      )}
    </div>
  );
}

function CompetitorEdit({ data, onChange }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const comp = data[activeIdx];

  function updC(f, v) { onChange(data.map((c, i) => i === activeIdx ? { ...c, [f]: v } : c)); }
  function updMix(field, i, key, val) {
    const arr = [...(comp[field] || [])];
    arr[i] = { ...arr[i], [key]: key === "pct" ? Number(val) : val };
    updC(field, arr);
  }
  function addMix(field) { updC(field, [...(comp[field] || []), { type: "", pct: 0, color: "#207771" }]); }
  function removeMix(field, i) { updC(field, comp[field].filter((_, j) => j !== i)); }
  function updChannel(i, key, val) {
    const arr = [...(comp.channels || [])];
    arr[i] = { ...arr[i], [key]: val };
    updC("channels", arr);
  }
  function addCompetitor() { onChange([...data, deepClone(TEMPLATES.competitor[0])]); setActiveIdx(data.length); }
  function removeCompetitor() { if (data.length > 1) { onChange(data.filter((_, i) => i !== activeIdx)); setActiveIdx(0); } }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {data.map((c, i) => (
          <button key={i} onClick={() => setActiveIdx(i)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{ backgroundColor: i === activeIdx ? C.tealDeep : C.panel, color: i === activeIdx ? "#fff" : C.muted }}>
            {c.name || "Competitor " + (i + 1)}
          </button>
        ))}
        <button onClick={addCompetitor} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold" style={{ backgroundColor: C.panel, color: C.teal }}>
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Add
        </button>
        {data.length > 1 && (
          <button onClick={removeCompetitor} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold" style={{ backgroundColor: C.roseSoft, color: C.rose }}>
            <Trash2 className="w-3.5 h-3.5" strokeWidth={2} /> Remove
          </button>
        )}
        <ToggleBtn enabled={comp.enabled} onToggle={() => updC("enabled", !comp.enabled)} />
      </div>

      <SectionCard title="Overview">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Brand Name" value={comp.name} onChange={v => updC("name", v)} placeholder="Glossier" />
            <FieldInput label="Handle" value={comp.handle} onChange={v => updC("handle", v)} placeholder="@glossier" />
          </div>
          <FieldInput label="One-line summary" value={comp.summary} onChange={v => updC("summary", v)} placeholder="Peer-led aesthetic brand. UGC-heavy, TOF-dominant." />
          <FieldInput label="Why we picked this competitor" value={comp.whyPicked} onChange={v => updC("whyPicked", v)} multiline rows={2} placeholder="Why is this competitor relevant to analyze?" />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Active Ads" value={comp.activeAds} onChange={v => updC("activeAds", v)} placeholder="89" />
            <FieldInput label="Primary Channel" value={comp.primaryChannel} onChange={v => updC("primaryChannel", v)} placeholder="Meta + TikTok" />
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-3">
        {[{ field: "creatorMix", label: "Creator Mix", verdictField: "creatorVerdict" }, { field: "formatMix", label: "Format Mix", verdictField: "funnelVerdict" }].map(({ field, label, verdictField }) => (
          <SectionCard key={field} title={label}>
            <div className="space-y-2">
              {(comp[field] || []).map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="text" value={m.type} onChange={e => updMix(field, i, "type", e.target.value)} placeholder="Type" className="flex-1 px-2 py-1.5 text-[12px] rounded-lg outline-none" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }} />
                  <input type="number" value={m.pct} onChange={e => updMix(field, i, "pct", e.target.value)} placeholder="%" className="w-14 px-2 py-1.5 text-[12px] rounded-lg outline-none" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }} />
                  <span className="text-[11px]" style={{ color: C.faint }}>%</span>
                  <button onClick={() => removeMix(field, i)} className="w-6 h-6 flex items-center justify-center rounded flex-shrink-0" style={{ color: C.faint }}><X className="w-3 h-3" strokeWidth={2.5} /></button>
                </div>
              ))}
            </div>
            <AddBtn label="Add row" onClick={() => addMix(field)} />
            <div className="mt-3">
              <FieldInput label="Verdict" value={comp[verdictField]} onChange={v => updC(verdictField, v)} multiline rows={2} placeholder="What this tells us..." />
            </div>
          </SectionCard>
        ))}
      </div>

      <SectionCard title="Funnel Mix (%)">
        <div className="flex gap-3 mb-3">
          {FUNNEL_STAGES.map(stage => (
            <div key={stage} className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: STAGE_COLORS[stage].color }}>{stage}</div>
              <input type="number" value={(comp.funnelMix || {})[stage] || 0} onChange={e => updC("funnelMix", { ...comp.funnelMix, [stage]: Number(e.target.value) })}
                className="w-full px-3 py-2 text-[13px] rounded-lg outline-none" style={{ backgroundColor: C.bg, border: "1.5px solid " + C.hairline, color: C.ink }} />
            </div>
          ))}
        </div>
        <FieldInput label="Funnel Verdict" value={comp.funnelVerdict} onChange={v => updC("funnelVerdict", v)} multiline rows={2} placeholder="What their funnel distribution tells us..." />
      </SectionCard>

      <SectionCard title="Channel Investment">
        <div className="space-y-2">
          {(comp.channels || []).map((ch, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 items-center">
              <input type="text" value={ch.name} onChange={e => updChannel(i, "name", e.target.value)} placeholder="Channel" className="px-2 py-1.5 text-[12px] rounded-lg outline-none" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }} />
              <select value={ch.state} onChange={e => updChannel(i, "state", e.target.value)} className="px-2 py-1.5 text-[12px] rounded-lg outline-none" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}>
                {CHANNEL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="text" value={ch.note} onChange={e => updChannel(i, "note", e.target.value)} placeholder="Note" className="px-2 py-1.5 text-[12px] rounded-lg outline-none" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }} />
              <div className="flex gap-1 items-center">
                <select value={ch.confidence} onChange={e => updChannel(i, "confidence", e.target.value)} className="flex-1 px-2 py-1.5 text-[12px] rounded-lg outline-none" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}>
                  <option>Verified</option><option>Estimated</option>
                </select>
                <button onClick={() => updC("channels", comp.channels.filter((_, j) => j !== i))} className="w-6 h-6 flex items-center justify-center rounded flex-shrink-0" style={{ color: C.faint }}><X className="w-3 h-3" strokeWidth={2.5} /></button>
              </div>
            </div>
          ))}
        </div>
        <AddBtn label="Add channel" onClick={() => updC("channels", [...(comp.channels || []), { name: "", state: "Heavy", note: "", confidence: "Estimated" }])} />
        <div className="mt-3">
          <FieldInput label="Channel Verdict" value={comp.channelVerdict} onChange={v => updC("channelVerdict", v)} multiline rows={2} placeholder="Channel gap or opportunity..." />
        </div>
      </SectionCard>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// OFFER — Value Architecture
// ════════════════════════════════════════════════════════════════════════════

function OfferView({ data }) {
  const [activePersona, setActivePersona] = useState("p1");
  const [tab, setTab] = useState("stack");

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 rounded-xl self-start" style={{ backgroundColor: C.panel, display: "inline-flex" }}>
        {[{ k: "stack", l: "Value Stack" }, { k: "matrix", l: "Value Matrix" }, { k: "language", l: "Language Guide" }].map(({ k, l }) => (
          <button key={k} onClick={() => setTab(k)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{ backgroundColor: tab === k ? C.surface : "transparent", color: tab === k ? C.ink : C.muted, boxShadow: tab === k ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
            {l}
          </button>
        ))}
      </div>

      {tab === "stack" && (
        <div className="grid grid-cols-2 gap-3">
          {(data.valueStack || []).map((vs, i) => {
            const lc = VALUE_LAYER_COLORS[vs.layer] || { bg: C.panel, color: C.muted };
            return (
              <SectionCard key={i} enabled={vs.enabled}>
                <div className="flex items-center gap-2 mb-3">
                  <LayerChip layer={vs.layer} />
                  {!vs.enabled && <HiddenBadge />}
                </div>
                <div className="text-[14px] font-semibold mb-2" style={{ color: C.ink }}>{vs.headline}</div>
                <div className="text-[12px] leading-relaxed" style={{ color: C.muted }}>{vs.body}</div>
              </SectionCard>
            );
          })}
        </div>
      )}

      {tab === "matrix" && (
        <SectionCard title="Persona × Funnel Stage">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider pb-3 pr-4" style={{ color: C.faint }}>Persona</th>
                  {FUNNEL_STAGES.map(s => <th key={s} className="text-left text-[10px] font-bold uppercase tracking-wider pb-3 pr-3 min-w-[180px]" style={{ color: STAGE_COLORS[s].color }}>{s}</th>)}
                </tr>
              </thead>
              <tbody>
                {PERSONA_KEYS.map(pk => (
                  <tr key={pk}>
                    <td className="pr-4 pb-3 align-top text-[12px] font-semibold whitespace-nowrap" style={{ color: C.ink }}>Persona {pk.toUpperCase()}</td>
                    {FUNNEL_STAGES.map(s => {
                      const cell = data.valueMatrix?.[pk]?.[s];
                      return (
                        <td key={s} className="pr-3 pb-3 align-top">
                          {cell ? (
                            <div className="rounded-lg p-3" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
                              <div className="flex gap-1 mb-2 flex-wrap">
                                <LayerChip layer={cell.primary} />
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.muted }}>then {cell.secondary}</span>
                              </div>
                              <div className="text-[10px] leading-snug" style={{ color: C.muted }}>{cell.note}</div>
                            </div>
                          ) : <div className="rounded-lg p-3" style={{ backgroundColor: C.panel }} />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {tab === "language" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {PERSONA_KEYS.map(k => (
              <button key={k} onClick={() => setActivePersona(k)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                style={{ backgroundColor: activePersona === k ? C.teal : C.surface, color: activePersona === k ? "white" : C.muted, border: "1px solid " + (activePersona === k ? C.teal : C.hairline) }}>
                {data.personaLanguage?.[k]?.title || "Persona " + k.toUpperCase()}
              </button>
            ))}
          </div>
          {data.personaLanguage?.[activePersona] && (
            <div className="grid grid-cols-2 gap-3">
              {[{ key: "use", label: "Use", color: C.green }, { key: "avoid", label: "Avoid", color: C.rose }].map(({ key, label, color }) => (
                <SectionCard key={key} title={label}>
                  <ul className="space-y-2">
                    {(data.personaLanguage[activePersona][key] || []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] leading-snug" style={{ color: C.text }}>
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SectionCard>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OfferEdit({ data, onChange }) {
  const [tab, setTab] = useState("stack");
  const [activePersona, setActivePersona] = useState("p1");

  function updStack(i, f, v) { onChange({ ...data, valueStack: data.valueStack.map((x, j) => j === i ? { ...x, [f]: v } : x) }); }
  function updMatrix(pk, s, f, v) {
    const cur = data.valueMatrix?.[pk]?.[s] || {};
    onChange({ ...data, valueMatrix: { ...data.valueMatrix, [pk]: { ...(data.valueMatrix?.[pk] || {}), [s]: { ...cur, [f]: v } } } });
  }
  function updLang(pk, key, i, v) {
    const arr = [...(data.personaLanguage?.[pk]?.[key] || [])];
    arr[i] = v;
    onChange({ ...data, personaLanguage: { ...data.personaLanguage, [pk]: { ...(data.personaLanguage?.[pk] || {}), [key]: arr } } });
  }
  function addLang(pk, key) {
    const arr = [...(data.personaLanguage?.[pk]?.[key] || []), ""];
    onChange({ ...data, personaLanguage: { ...data.personaLanguage, [pk]: { ...(data.personaLanguage?.[pk] || {}), [key]: arr } } });
  }
  function removeLang(pk, key, i) {
    const arr = (data.personaLanguage?.[pk]?.[key] || []).filter((_, j) => j !== i);
    onChange({ ...data, personaLanguage: { ...data.personaLanguage, [pk]: { ...(data.personaLanguage?.[pk] || {}), [key]: arr } } });
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 rounded-xl self-start" style={{ backgroundColor: C.panel, display: "inline-flex" }}>
        {[{ k: "stack", l: "Value Stack" }, { k: "matrix", l: "Value Matrix" }, { k: "language", l: "Language Guide" }].map(({ k, l }) => (
          <button key={k} onClick={() => setTab(k)}
            className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{ backgroundColor: tab === k ? C.surface : "transparent", color: tab === k ? C.ink : C.muted, boxShadow: tab === k ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
            {l}
          </button>
        ))}
      </div>

      {tab === "stack" && (
        <div className="grid grid-cols-2 gap-3">
          {(data.valueStack || []).map((vs, i) => (
            <SectionCard key={i} title={vs.layer} enabled={vs.enabled} onToggle={() => updStack(i, "enabled", !vs.enabled)}>
              <div className="space-y-3">
                <FieldInput label="Headline" value={vs.headline} onChange={v => updStack(i, "headline", v)} placeholder="What the product actually does..." />
                <FieldInput label="Body" value={vs.body} onChange={v => updStack(i, "body", v)} multiline rows={3} placeholder="Specific mechanism and details..." />
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {tab === "matrix" && (
        <div className="space-y-3">
          {PERSONA_KEYS.map(pk => (
            <SectionCard key={pk} title={"Persona " + pk.toUpperCase()}>
              <div className="grid grid-cols-3 gap-3">
                {FUNNEL_STAGES.map(s => {
                  const cell = data.valueMatrix?.[pk]?.[s] || { primary: "Functional", secondary: "Transformational", note: "" };
                  return (
                    <div key={s} className="space-y-2">
                      <div className="text-[10px] font-bold" style={{ color: STAGE_COLORS[s].color }}>{s}</div>
                      <SelectInput value={cell.primary} onChange={v => updMatrix(pk, s, "primary", v)} options={VALUE_LAYERS} />
                      <SelectInput value={cell.secondary} onChange={v => updMatrix(pk, s, "secondary", v)} options={VALUE_LAYERS} />
                      <FieldInput value={cell.note} onChange={v => updMatrix(pk, s, "note", v)} multiline rows={2} placeholder="Why this pairing..." />
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {tab === "language" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {PERSONA_KEYS.map(k => (
              <button key={k} onClick={() => setActivePersona(k)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                style={{ backgroundColor: activePersona === k ? C.teal : C.surface, color: activePersona === k ? "white" : C.muted, border: "1px solid " + (activePersona === k ? C.teal : C.hairline) }}>
                Persona {k.toUpperCase()}
              </button>
            ))}
          </div>
          <div>
            <FieldInput label="Section title" value={data.personaLanguage?.[activePersona]?.title || ""} onChange={v => onChange({ ...data, personaLanguage: { ...data.personaLanguage, [activePersona]: { ...(data.personaLanguage?.[activePersona] || {}), title: v } } })} placeholder="For the [Persona name]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{ key: "use", label: "Use", dot: C.green }, { key: "avoid", label: "Avoid", dot: C.rose }].map(({ key, label, dot }) => (
              <SectionCard key={key} title={label}>
                <ListEditor items={data.personaLanguage?.[activePersona]?.[key] || []}
                  onChange={arr => onChange({ ...data, personaLanguage: { ...data.personaLanguage, [activePersona]: { ...(data.personaLanguage?.[activePersona] || {}), [key]: arr } } })}
                  placeholder="Language example..." dotColor={dot} />
                <AddBtn label={"Add " + label.toLowerCase()} onClick={() => addLang(activePersona, key)} />
              </SectionCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ANGLES — Angles & Creative
// ════════════════════════════════════════════════════════════════════════════

function AnglesView({ data }) {
  const recommended = data.filter(a => a.recommended && a.enabled !== false);
  const others = data.filter(a => !a.recommended);

  function AngleCard({ a }) {
    return (
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, opacity: a.enabled ? 1 : 0.5 }}>
        <div className="px-5 py-4" style={{ background: a.recommended ? "linear-gradient(135deg," + C.tealMist + "," + C.tealBorder + ")" : C.bgWarm, borderBottom: "1px solid " + C.hairlineSoft }}>
          <div className="flex flex-wrap gap-2 mb-2">
            <StageChip stage={a.stage} />
            <LayerChip layer={a.valueLayer} />
            {a.recommended && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>Recommended</span>}
            {!a.enabled && <HiddenBadge />}
          </div>
          <div className="text-[15px] font-semibold mb-1" style={{ color: C.ink }}>{a.name}</div>
          <div className="text-[12px]" style={{ color: C.muted }}>{a.tagline}</div>
        </div>
        <div className="p-5 space-y-4">
          {a.beliefRef && (
            <div>
              <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: C.faint }}>Belief addressed</div>
              <div className="text-[12px]" style={{ color: C.text }}>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mr-1.5" style={{ backgroundColor: C.panel, color: C.muted }}>{a.beliefTier}</span>
                {a.beliefRef}
              </div>
            </div>
          )}
          {a.why && <div><div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: C.faint }}>Why this angle</div><div className="text-[12px] leading-relaxed" style={{ color: C.muted }}>{a.why}</div></div>}
          {a.hypothesis && <div><div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: C.faint }}>Hypothesis</div><div className="text-[12px] leading-relaxed" style={{ color: C.muted }}>{a.hypothesis}</div></div>}
          {a.measure && <div className="rounded-lg p-3" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}><div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: C.faint }}>How we measure success</div><div className="text-[11px] leading-relaxed" style={{ color: C.muted }}>{a.measure}</div></div>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommended.length > 0 && (
        <>
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.teal, letterSpacing: "0.12em" }}>Recommended this month</div>
          <div className="grid grid-cols-2 gap-3">{recommended.map((a, i) => <AngleCard key={i} a={a} />)}</div>
        </>
      )}
      {others.length > 0 && (
        <>
          <div className="text-[10px] font-bold uppercase tracking-wider mt-2" style={{ color: C.faint, letterSpacing: "0.12em" }}>In the plan — later months</div>
          <div className="grid grid-cols-2 gap-3">{others.map((a, i) => <AngleCard key={i} a={a} />)}</div>
        </>
      )}
    </div>
  );
}

function AnglesEdit({ data, onChange }) {
  function upd(i, f, v) { onChange(data.map((a, j) => j === i ? { ...a, [f]: v } : a)); }
  function toggle(i) { upd(i, "enabled", !data[i].enabled); }
  function remove(i) { onChange(data.filter((_, j) => j !== i)); }
  function add() { onChange([...data, { id: "angle-" + Date.now(), name: "", tagline: "", stage: "TOF", valueLayer: "Functional", recommended: false, beliefTier: "Category-wide", beliefRef: "", why: "", hypothesis: "", measure: "", enabled: true }]); }

  return (
    <div className="space-y-3">
      {data.map((a, i) => (
        <SectionCard key={i} dimmed={!a.enabled}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <SelectInput value={a.stage} onChange={v => upd(i, "stage", v)} options={FUNNEL_STAGES} />
                <SelectInput value={a.valueLayer} onChange={v => upd(i, "valueLayer", v)} options={VALUE_LAYERS} />
                <button onClick={() => upd(i, "recommended", !a.recommended)} className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: a.recommended ? C.tealMist : C.panel, color: a.recommended ? C.teal : C.faint }}>
                  {a.recommended ? "★ Recommended" : "☆ Recommend"}
                </button>
              </div>
              <div className="flex gap-2">
                <ToggleBtn enabled={a.enabled} onToggle={() => toggle(i)} />
                <button onClick={() => remove(i)} className="w-7 h-7 flex items-center justify-center rounded-lg" style={{ backgroundColor: C.panel, color: C.muted }}><Trash2 className="w-3.5 h-3.5" strokeWidth={2} /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FieldInput label="Angle Name" value={a.name} onChange={v => upd(i, "name", v)} placeholder="[Angle Name]" />
              <FieldInput label="Tagline" value={a.tagline} onChange={v => upd(i, "tagline", v)} placeholder="[One-line hook]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SelectInput label="Belief tier" value={a.beliefTier} onChange={v => upd(i, "beliefTier", v)} options={["Category-wide", "Persona-specific"]} />
              <FieldInput label="Belief reference" value={a.beliefRef} onChange={v => upd(i, "beliefRef", v)} placeholder="[Which belief this angle shifts]" />
            </div>
            <FieldInput label="Why this angle" value={a.why} onChange={v => upd(i, "why", v)} multiline rows={2} placeholder="[Why this angle exists and what barrier it addresses]" />
            <FieldInput label="Hypothesis" value={a.hypothesis} onChange={v => upd(i, "hypothesis", v)} multiline rows={2} placeholder="[What we expect to happen when this creative runs]" />
            <FieldInput label="How we measure success" value={a.measure} onChange={v => upd(i, "measure", v)} multiline rows={2} placeholder="[Primary and secondary metrics to watch]" />
          </div>
        </SectionCard>
      ))}
      <button onClick={add} className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Angle
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HOOKS — Hook Library
// ════════════════════════════════════════════════════════════════════════════

function HooksView({ data }) {
  const [filterStage, setFilterStage] = useState("all");
  const [filterPattern, setFilterPattern] = useState("all");
  const filtered = data.filter(h => (filterStage === "all" || h.stage === filterStage) && (filterPattern === "all" || h.pattern === filterPattern));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: C.panel }}>
          {["all", ...FUNNEL_STAGES].map(s => (
            <button key={s} onClick={() => setFilterStage(s)}
              className="px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all"
              style={{ backgroundColor: filterStage === s ? C.surface : "transparent", color: filterStage === s ? C.ink : C.muted }}>
              {s === "all" ? "All stages" : s}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: C.panel }}>
          {["all", ...HOOK_PATTERNS].map(p => (
            <button key={p} onClick={() => setFilterPattern(p)}
              className="px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all"
              style={{ backgroundColor: filterPattern === p ? C.surface : "transparent", color: filterPattern === p ? C.ink : C.muted }}>
              {p === "all" ? "All patterns" : p}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map((h, i) => (
          <div key={i} className="rounded-xl p-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, opacity: h.enabled ? 1 : 0.5 }}>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <StageChip stage={h.stage} />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.muted }}>{h.pattern}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.muted }}>Variant {h.variant}</span>
              {h.angle && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.tealMist, color: C.teal }}>→ {h.angle}</span>}
              {!h.enabled && <HiddenBadge />}
            </div>
            <div className="text-[14px] font-semibold leading-snug" style={{ color: C.ink }}>"{h.text}"</div>
          </div>
        ))}
        {filtered.length === 0 && <div className="rounded-xl p-8 text-center text-[13px]" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, color: C.muted }}>No hooks match the current filters.</div>}
      </div>
    </div>
  );
}

function HooksEdit({ data, onChange }) {
  function upd(i, f, v) { onChange(data.map((h, j) => j === i ? { ...h, [f]: v } : h)); }
  function toggle(i) { upd(i, "enabled", !data[i].enabled); }
  function remove(i) { onChange(data.filter((_, j) => j !== i)); }
  function add() { onChange([...data, { id: "hook-" + Date.now(), text: "", stage: "TOF", pattern: "Contrarian", variant: "A", angle: "", enabled: true }]); }

  return (
    <div className="space-y-3">
      {data.map((h, i) => (
        <SectionCard key={i} dimmed={!h.enabled}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <SelectInput value={h.stage} onChange={v => upd(i, "stage", v)} options={FUNNEL_STAGES} />
                <SelectInput value={h.pattern} onChange={v => upd(i, "pattern", v)} options={HOOK_PATTERNS} />
                <input type="text" value={h.variant} onChange={e => upd(i, "variant", e.target.value)} placeholder="A" className="w-14 px-2 py-1.5 text-[12px] rounded-lg outline-none text-center" style={{ backgroundColor: C.bg, border: "1.5px solid " + C.hairline, color: C.ink }} />
              </div>
              <div className="flex gap-2">
                <ToggleBtn enabled={h.enabled} onToggle={() => toggle(i)} />
                <button onClick={() => remove(i)} className="w-7 h-7 flex items-center justify-center rounded-lg" style={{ backgroundColor: C.panel, color: C.muted }}><Trash2 className="w-3.5 h-3.5" strokeWidth={2} /></button>
              </div>
            </div>
            <FieldInput label="Hook line" value={h.text} onChange={v => upd(i, "text", v)} multiline rows={2} placeholder="[Opening line that stops the scroll]" />
            <FieldInput label="Angle" value={h.angle} onChange={v => upd(i, "angle", v)} placeholder="[Which angle this hook belongs to]" />
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
        {/* Sidebar */}
        <div className="w-52 flex-shrink-0">
          <div className="rounded-xl overflow-hidden sticky top-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            {SECTIONS.map((sec, i) => {
              const on = activeSection === sec.id;
              const Icon = sec.icon;
              const st = SECTION_STATUS[localData.status?.[sec.id] || "not-started"];
              return (
                <button key={sec.id} onClick={() => changeSection(sec.id)}
                  className="w-full flex flex-col gap-1 px-4 py-3 text-left transition-colors"
                  style={{ backgroundColor: on ? C.tealMist : "transparent", borderLeft: on ? "2px solid " + C.teal : "2px solid transparent", borderBottom: i < SECTIONS.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" strokeWidth={on ? 2.2 : 1.8} style={{ color: on ? C.teal : C.muted }} />
                    <span className="text-[12px] font-semibold leading-tight" style={{ color: on ? C.teal : C.text }}>{sec.label}</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded self-start" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
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
                      style={{ backgroundColor: active ? ps.bg : C.surface, color: active ? ps.color : C.faint, borderRight: idx < 2 ? "1px solid " + C.hairlineSoft : "none" }}>
                      {ps.label}
                    </button>
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
