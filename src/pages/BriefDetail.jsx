import { useState } from "react";
import { ArrowLeft, Plus, Trash2, X, CheckCircle2 } from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS } from "../data/campaigns";
import { PRODUCTION_DETAILS } from "../data/productionDetails";

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function FieldInput({ label, value, onChange, multiline = false, rows = 3, tealTint = false }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: C.faint, letterSpacing: "0.1em" }}>{label}</div>
      {multiline ? (
        <textarea
          rows={rows}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          className="w-full rounded-xl px-3 py-2 text-[13px] outline-none resize-none"
          style={{
            backgroundColor: tealTint ? C.tealMist : C.bg,
            border: "1px solid " + (tealTint ? C.tealBorder : C.hairline),
            color: C.ink,
          }}
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          className="w-full rounded-xl px-3 py-2 text-[13px] outline-none"
          style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
        />
      )}
    </div>
  );
}

function ListEditor({ items, onChange, placeholder, color }) {
  const dotColor = color || C.teal;
  function updateItem(i, val) {
    const next = [...items];
    next[i] = val;
    onChange(next);
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function addItem() {
    onChange([...items, ""]);
  }
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: dotColor }} />
          <input
            type="text"
            value={item}
            onChange={e => updateItem(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-xl px-3 py-2 text-[13px] outline-none"
            style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
          />
          <button onClick={() => removeItem(i)} className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg hover:opacity-70" style={{ backgroundColor: C.panel }}>
            <X className="w-3 h-3" style={{ color: C.muted }} strokeWidth={2} />
          </button>
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-1.5 text-[12px] font-semibold mt-1" style={{ color: C.teal }}>
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Add item
      </button>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>{children}</div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={"rounded-xl p-5 " + className} style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
      {children}
    </div>
  );
}

function BriefTab({ briefData, update }) {
  const brand = briefData.brand || {};
  const persona = briefData.persona || {};
  const feels = persona.feels || {};
  const angle = briefData.angle || {};
  const hooks = briefData.hooks || [];

  function updateHook(i, field, val) {
    const next = hooks.map((h, idx) => idx === i ? { ...h, [field]: val } : h);
    update("hooks", next);
  }
  function removeHook(i) {
    update("hooks", hooks.filter((_, idx) => idx !== i));
  }
  function addHook() {
    update("hooks", [...hooks, { letter: "", type: "", line: "", note: "" }]);
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="space-y-4">
        <Card>
          <SectionLabel>Brand</SectionLabel>
          <div className="space-y-3">
            <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{brand.name}</div>
            <div className="text-[12px]" style={{ color: C.muted }}>{brand.category} · {brand.heroProduct}</div>
            <FieldInput
              label="Positioning"
              value={brand.positioning}
              onChange={v => update("brand.positioning", v)}
              multiline
              rows={3}
            />
          </div>
        </Card>

        <Card>
          <SectionLabel>Persona</SectionLabel>
          <div className="space-y-3">
            <FieldInput label="Name" value={persona.name} onChange={v => update("persona.name", v)} />
            <FieldInput label="Distillation" value={persona.distillation} onChange={v => update("persona.distillation", v)} multiline rows={2} />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Pain</div>
              <ListEditor items={feels.pain || []} onChange={v => update("persona.feels.pain", v)} placeholder="A pain point..." color={C.rose} />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Desires</div>
              <ListEditor items={feels.desires || []} onChange={v => update("persona.feels.desires", v)} placeholder="A desire..." color={C.green} />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Beliefs</div>
              <ListEditor items={feels.beliefs || []} onChange={v => update("persona.feels.beliefs", v)} placeholder="A belief..." color={C.amber} />
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <SectionLabel>Angle</SectionLabel>
          <div className="space-y-3">
            <FieldInput label="Name" value={angle.name} onChange={v => update("angle.name", v)} />
            <FieldInput label="Tagline" value={angle.tagline} onChange={v => update("angle.tagline", v)} />
            <FieldInput label="Why it matters" value={angle.matters} onChange={v => update("angle.matters", v)} multiline rows={3} />
            <FieldInput label="Belief shift" value={angle.beliefShift} onChange={v => update("angle.beliefShift", v)} multiline rows={3} />
          </div>
        </Card>

        <Card>
          <SectionLabel>Hooks</SectionLabel>
          <div className="space-y-3">
            {hooks.map((h, i) => (
              <div key={i} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline }}>
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <FieldInput label="Letter" value={h.letter} onChange={v => updateHook(i, "letter", v)} />
                      <FieldInput label="Type" value={h.type} onChange={v => updateHook(i, "type", v)} />
                    </div>
                    <FieldInput label="Hook line" value={h.line} onChange={v => updateHook(i, "line", v)} multiline rows={2} />
                    <FieldInput label="Note" value={h.note} onChange={v => updateHook(i, "note", v)} multiline rows={2} />
                  </div>
                  <button onClick={() => removeHook(i)} className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg hover:opacity-70 mt-5" style={{ backgroundColor: C.panel }}>
                    <Trash2 className="w-3 h-3" style={{ color: C.muted }} strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
            <button onClick={addHook} className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
              <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Hook
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ScriptTab({ briefData, update }) {
  const script = briefData.script || {};
  const beats = script.beats || [];

  function updateBeat(i, field, val) {
    const next = beats.map((b, idx) => idx === i ? { ...b, [field]: val } : b);
    update("script.beats", next);
  }
  function removeBeat(i) {
    update("script.beats", beats.filter((_, idx) => idx !== i));
  }
  function addBeat() {
    update("script.beats", [...beats, { time: "", label: "", body: "", keyLine: "" }]);
  }

  return (
    <div className="space-y-5">
      <Card>
        <SectionLabel>Script Setup</SectionLabel>
        <div className="space-y-4">
          <FieldInput label="Intro direction" value={script.intro} onChange={v => update("script.intro", v)} multiline rows={3} />
          <FieldInput label="Notes" value={script.notes} onChange={v => update("script.notes", v)} multiline rows={3} />
        </div>
      </Card>

      <Card>
        <SectionLabel>Beat Timeline</SectionLabel>
        <div className="space-y-4">
          {beats.map((beat, i) => (
            <div key={i} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline }}>
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <FieldInput label="Time" value={beat.time} onChange={v => updateBeat(i, "time", v)} />
                    <FieldInput label="Beat label" value={beat.label} onChange={v => updateBeat(i, "label", v)} />
                  </div>
                  <FieldInput label="Body" value={beat.body} onChange={v => updateBeat(i, "body", v)} multiline rows={3} />
                  <FieldInput label="Key line" value={beat.keyLine} onChange={v => updateBeat(i, "keyLine", v)} multiline rows={2} tealTint />
                </div>
                <button onClick={() => removeBeat(i)} className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg hover:opacity-70 mt-5" style={{ backgroundColor: C.panel }}>
                  <Trash2 className="w-3 h-3" style={{ color: C.muted }} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
          <button onClick={addBeat} className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
            <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Beat
          </button>
        </div>
      </Card>
    </div>
  );
}

function SpecsTab({ briefData, update }) {
  const specs = briefData.specs || {};

  return (
    <div className="space-y-5">
      <Card>
        <SectionLabel>Production Specs</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          <FieldInput label="Length" value={specs.length} onChange={v => update("specs.length", v)} />
          <FieldInput label="Aspect ratio" value={specs.aspect} onChange={v => update("specs.aspect", v)} />
          <FieldInput label="Format" value={specs.format} onChange={v => update("specs.format", v)} />
          <FieldInput label="Platforms" value={specs.platforms} onChange={v => update("specs.platforms", v)} />
        </div>
        <div className="mt-4">
          <FieldInput label="Deliverables" value={specs.deliverables} onChange={v => update("specs.deliverables", v)} multiline rows={2} />
        </div>
      </Card>

      <Card>
        <SectionLabel>What creator receives</SectionLabel>
        <div className="space-y-3">
          {[
            { label: "Length", value: specs.length },
            { label: "Aspect ratio", value: specs.aspect },
            { label: "Format", value: specs.format },
            { label: "Platforms", value: specs.platforms },
            { label: "Deliverables", value: specs.deliverables },
          ].map(row => (
            <div key={row.label} className="flex items-start gap-4 py-2" style={{ borderBottom: "1px solid " + C.hairlineSoft }}>
              <div className="w-28 text-[11px] font-bold uppercase tracking-widest flex-shrink-0" style={{ color: C.faint, letterSpacing: "0.1em" }}>{row.label}</div>
              <div className="text-[13px] flex-1" style={{ color: C.ink }}>{row.value || <span style={{ color: C.faint }}>—</span>}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  const result = deepClone(obj);
  let cur = result;
  for (let i = 0; i < keys.length - 1; i++) {
    if (cur[keys[i]] === undefined || cur[keys[i]] === null) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return result;
}

const PUBLISH_BADGE = {
  draft:     { label: "Draft",                color: C.faint,  bg: C.panel },
  review:    { label: "Awaiting brand review", color: C.amber, bg: C.amberSoft },
  published: { label: "Published",            color: C.green,  bg: C.greenSoft },
};

const TABS = [
  { id: "brief",  label: "Brief Overview" },
  { id: "script", label: "Script" },
  { id: "specs",  label: "Specs" },
];

export default function BriefDetail({ campaignId, navigate }) {
  const campaign = CAMPAIGNS.find(c => c.id === campaignId);
  const [tab, setTab] = useState("brief");
  const [publishState, setPublishState] = useState("draft");
  const [briefData, setBriefData] = useState(() => {
    const pack = PRODUCTION_DETAILS[campaignId]?.briefPack;
    return pack ? deepClone(pack) : {};
  });

  function update(path, value) {
    setBriefData(prev => setNestedValue(prev, path, value));
  }

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="text-[14px] font-semibold" style={{ color: C.ink }}>Campaign not found.</div>
        <button onClick={() => navigate("briefs")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold" style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}>
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} /> Back to Briefs
        </button>
      </div>
    );
  }

  const psBadge = PUBLISH_BADGE[publishState];

  return (
    <div className="pb-32">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("briefs")}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold transition-all hover:opacity-80"
          style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} /> Back
        </button>
        <div className="text-[12px]" style={{ color: C.faint }}>
          Briefs / <span style={{ color: C.ink }}>{campaign.clientName} — {campaign.title}</span>
        </div>
      </div>

      <div className="rounded-xl px-5 py-3.5 flex items-center gap-4 mb-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}>
          {campaign.clientName.split(" ").map(w => w[0]).join("").slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-[14px] font-semibold" style={{ color: C.ink }}>{campaign.title}</div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: psBadge.bg, color: psBadge.color }}>{psBadge.label}</span>
          </div>
          <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{campaign.clientName} · {campaign.product}</div>
        </div>
        <button
          onClick={() => navigate("campaign-detail", { campaignId: campaign.id })}
          className="text-[12px] font-semibold" style={{ color: C.teal }}
        >
          View campaign →
        </button>
      </div>

      <div className="flex items-center gap-1 mb-6 p-1 rounded-xl self-start" style={{ backgroundColor: C.panel, display: "inline-flex" }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all"
            style={{
              backgroundColor: tab === t.id ? C.surface : "transparent",
              color: tab === t.id ? C.ink : C.muted,
              boxShadow: tab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "brief"  && <BriefTab briefData={briefData} update={update} />}
      {tab === "script" && <ScriptTab briefData={briefData} update={update} />}
      {tab === "specs"  && <SpecsTab briefData={briefData} update={update} />}

      <div className="fixed bottom-0 left-64 right-0 z-40" style={{ backgroundColor: C.surface, borderTop: "1px solid " + C.hairline }}>
        <div className="flex items-center justify-between gap-4 px-12 py-4" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>Status</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: psBadge.bg, color: psBadge.color }}>{psBadge.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPublishState("draft")}
              className="h-9 px-4 rounded-xl text-[13px] font-semibold"
              style={{ backgroundColor: C.panel, color: C.muted }}
            >
              Save Draft
            </button>
            <button
              onClick={() => setPublishState("review")}
              className="h-9 px-4 rounded-xl text-[13px] font-semibold"
              style={{ backgroundColor: C.amberSoft, color: C.amber, border: "1px solid " + C.amber + "33" }}
            >
              Mark Ready for Review
            </button>
            <button
              onClick={() => setPublishState("published")}
              className="h-9 px-4 rounded-xl text-[13px] font-semibold flex items-center gap-2"
              style={{
                backgroundColor: publishState === "published" ? C.greenSoft : C.tealDeep,
                color: publishState === "published" ? C.green : "#fff",
              }}
            >
              {publishState === "published" && <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />}
              {publishState === "published" ? "Published to Brand" : "Publish to Brand ↑"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
