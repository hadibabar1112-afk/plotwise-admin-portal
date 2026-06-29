import { useState } from "react";
import { ArrowLeft, Edit3, Save, X, Plus, Trash2, Lightbulb, Target, Users, Zap, BookOpen, Anchor } from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS } from "../data/campaigns";
import { RESEARCH } from "../data/research";

const SECTIONS = [
  { id: "customer",   label: "Customer",   icon: Users,    desc: "Who we're talking to and what they feel" },
  { id: "beliefs",    label: "Beliefs",    icon: Lightbulb, desc: "What they believe vs. what's actually true" },
  { id: "competitor", label: "Competitor", icon: Target,   desc: "What else they're considering" },
  { id: "offer",      label: "Offer",      icon: Anchor,   desc: "What we're selling and why it wins" },
  { id: "angles",     label: "Angles",     icon: Zap,      desc: "Creative directions for content" },
  { id: "hooks",      label: "Hooks",      icon: BookOpen, desc: "Opening lines for each angle" },
];

const PUBLISH_STATES = [
  { id: "draft",     label: "Draft",              color: C.faint,  bg: C.panel },
  { id: "review",    label: "Ready for Review",   color: C.amber,  bg: C.amberSoft },
  { id: "published", label: "Published",          color: C.green,  bg: C.greenSoft },
];

function FieldInput({ label, value, onChange, multiline = false, rows = 3 }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: C.faint, letterSpacing: "0.1em" }}>{label}</div>
      {multiline ? (
        <textarea
          rows={rows}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          className="w-full rounded-xl px-3 py-2 text-[13px] outline-none resize-none"
          style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
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

function VocabEditor({ items, onChange }) {
  function updateItem(i, field, val) {
    const next = items.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    onChange(next);
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function addItem() {
    onChange([...items, { hers: "", category: "" }]);
  }
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={item.hers || ""}
            onChange={e => updateItem(i, "hers", e.target.value)}
            placeholder="She says..."
            className="flex-1 rounded-xl px-3 py-2 text-[13px] outline-none italic"
            style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
          />
          <input
            type="text"
            value={item.category || ""}
            onChange={e => updateItem(i, "category", e.target.value)}
            placeholder="Category"
            className="w-40 rounded-xl px-3 py-2 text-[13px] outline-none"
            style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
          />
          <button onClick={() => removeItem(i)} className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg hover:opacity-70" style={{ backgroundColor: C.panel }}>
            <X className="w-3 h-3" style={{ color: C.muted }} strokeWidth={2} />
          </button>
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-1.5 text-[12px] font-semibold mt-1" style={{ color: C.teal }}>
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Add vocab
      </button>
    </div>
  );
}

function TagEditor({ items, onChange, placeholder }) {
  const [inputVal, setInputVal] = useState("");
  function addTag() {
    const v = inputVal.trim();
    if (v && !items.includes(v)) {
      onChange([...items, v]);
    }
    setInputVal("");
  }
  function removeTag(tag) {
    onChange(items.filter(t => t !== tag));
  }
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {items.map(tag => (
          <span key={tag} className="flex items-center gap-1 text-[12px] px-2.5 py-1 rounded-full" style={{ backgroundColor: C.panel, color: C.text }}>
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-0.5 hover:opacity-70">
              <X className="w-2.5 h-2.5" style={{ color: C.muted }} strokeWidth={2.5} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
          placeholder={placeholder || "Add tag..."}
          className="flex-1 rounded-xl px-3 py-2 text-[13px] outline-none"
          style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
        />
        <button onClick={addTag} className="h-9 px-3 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.tealDeep, color: "#fff" }}>
          Add
        </button>
      </div>
    </div>
  );
}

function PriorityPill({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {["primary", "secondary"].map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
          style={{
            backgroundColor: value === p ? (p === "primary" ? C.tealMist : C.panel) : "transparent",
            color: value === p ? (p === "primary" ? C.teal : C.faint) : C.faint,
            border: "1px solid " + (value === p ? (p === "primary" ? C.tealBorder : C.hairline) : C.hairlineSoft),
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

function CustomerEditor({ data, onChange }) {
  if (!data) return null;
  function upd(field, val) { onChange({ ...data, [field]: val }); }
  return (
    <div className="space-y-4">
      <FieldInput label="Headline" value={data.headline} onChange={v => upd("headline", v)} />
      <FieldInput label="Distillation" value={data.distillation} onChange={v => upd("distillation", v)} multiline rows={3} />
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Pain</div>
        <ListEditor items={data.pain || []} onChange={v => upd("pain", v)} placeholder="A pain point..." color={C.rose} />
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Desires</div>
        <ListEditor items={data.desires || []} onChange={v => upd("desires", v)} placeholder="A desire..." color={C.green} />
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>What they believe</div>
        <ListEditor items={data.beliefs || []} onChange={v => upd("beliefs", v)} placeholder="A belief..." color={C.amber} />
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Vocabulary</div>
        <VocabEditor items={data.vocab || []} onChange={v => upd("vocab", v)} />
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Where she hangs out</div>
        <TagEditor items={data.hangouts || []} onChange={v => upd("hangouts", v)} placeholder="Platform or community..." />
      </div>
    </div>
  );
}

function BeliefsEditor({ data, onChange }) {
  const items = data || [];
  function updateItem(i, field, val) {
    onChange(items.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function addItem() {
    onChange([...items, { belief: "", reality: "", priority: "secondary" }]);
  }
  return (
    <div className="space-y-3">
      {items.map((b, i) => (
        <div key={i} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline }}>
          <div className="flex items-center justify-between">
            <PriorityPill value={b.priority} onChange={v => updateItem(i, "priority", v)} />
            <button onClick={() => removeItem(i)} className="w-6 h-6 flex items-center justify-center rounded-lg hover:opacity-70" style={{ backgroundColor: C.panel }}>
              <Trash2 className="w-3 h-3" style={{ color: C.muted }} strokeWidth={2} />
            </button>
          </div>
          <FieldInput label="They believe" value={b.belief} onChange={v => updateItem(i, "belief", v)} />
          <FieldInput label="Reality" value={b.reality} onChange={v => updateItem(i, "reality", v)} multiline rows={2} />
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Belief
      </button>
    </div>
  );
}

function CompetitorEditor({ data, onChange }) {
  const items = data || [];
  function updateItem(i, field, val) {
    onChange(items.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function addItem() {
    onChange([...items, { name: "", positioning: "", gap: "" }]);
  }
  return (
    <div className="space-y-3">
      {items.map((comp, i) => (
        <div key={i} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline }}>
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-3">
              <FieldInput label="Competitor name" value={comp.name} onChange={v => updateItem(i, "name", v)} />
              <FieldInput label="Positioning" value={comp.positioning} onChange={v => updateItem(i, "positioning", v)} />
              <FieldInput label="Our gap" value={comp.gap} onChange={v => updateItem(i, "gap", v)} multiline rows={2} />
            </div>
            <button onClick={() => removeItem(i)} className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg hover:opacity-70 mt-5" style={{ backgroundColor: C.panel }}>
              <Trash2 className="w-3 h-3" style={{ color: C.muted }} strokeWidth={2} />
            </button>
          </div>
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Competitor
      </button>
    </div>
  );
}

function OfferEditor({ data, onChange }) {
  if (!data) {
    return (
      <div>
        <button onClick={() => onChange({ headline: "", price: "", keyIngredients: [], mechanism: "", proof: "", differentiation: "" })}
          className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
          <Plus className="w-4 h-4" strokeWidth={2.5} /> Create Offer
        </button>
      </div>
    );
  }
  function upd(field, val) { onChange({ ...data, [field]: val }); }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FieldInput label="Headline" value={data.headline} onChange={v => upd("headline", v)} />
        <FieldInput label="Price" value={data.price} onChange={v => upd("price", v)} />
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Key Ingredients</div>
        <ListEditor items={data.keyIngredients || []} onChange={v => upd("keyIngredients", v)} placeholder="An ingredient..." color={C.teal} />
      </div>
      <FieldInput label="Mechanism" value={data.mechanism} onChange={v => upd("mechanism", v)} multiline rows={3} />
      <FieldInput label="Proof" value={data.proof} onChange={v => upd("proof", v)} multiline rows={2} />
      <FieldInput label="Differentiation" value={data.differentiation} onChange={v => upd("differentiation", v)} multiline rows={2} />
    </div>
  );
}

function AnglesEditor({ data, onChange }) {
  const items = data || [];
  function updateItem(i, field, val) {
    onChange(items.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function addItem() {
    onChange([...items, { id: "angle-" + Date.now(), name: "", tagline: "", stage: "TOF", selected: false }]);
  }
  return (
    <div className="space-y-3">
      {items.map((a, i) => (
        <div key={i} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline }}>
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Angle name" value={a.name} onChange={v => updateItem(i, "name", v)} />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: C.faint, letterSpacing: "0.1em" }}>Stage</div>
                  <select
                    value={a.stage}
                    onChange={e => updateItem(i, "stage", e.target.value)}
                    className="w-full rounded-xl px-3 py-2 text-[13px] outline-none"
                    style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
                  >
                    <option value="TOF">TOF</option>
                    <option value="MOF">MOF</option>
                    <option value="BOF">BOF</option>
                  </select>
                </div>
              </div>
              <FieldInput label="Tagline" value={a.tagline} onChange={v => updateItem(i, "tagline", v)} />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateItem(i, "selected", !a.selected)}
                  className="flex items-center gap-2 text-[12px] font-semibold"
                  style={{ color: a.selected ? C.teal : C.muted }}
                >
                  <div className="w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: a.selected ? C.teal : C.panel, border: "1px solid " + (a.selected ? C.teal : C.hairline) }}>
                    {a.selected && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  Selected angle
                </button>
              </div>
            </div>
            <button onClick={() => removeItem(i)} className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg hover:opacity-70 mt-5" style={{ backgroundColor: C.panel }}>
              <Trash2 className="w-3 h-3" style={{ color: C.muted }} strokeWidth={2} />
            </button>
          </div>
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Angle
      </button>
    </div>
  );
}

function HooksEditor({ data, onChange }) {
  const items = data || [];
  function updateItem(i, field, val) {
    onChange(items.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function addItem() {
    onChange([...items, { letter: "", type: "", line: "", angle: "" }]);
  }
  return (
    <div className="space-y-3">
      {items.map((h, i) => (
        <div key={i} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline }}>
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Letter" value={h.letter} onChange={v => updateItem(i, "letter", v)} />
                <FieldInput label="Type" value={h.type} onChange={v => updateItem(i, "type", v)} />
              </div>
              <FieldInput label="Hook line" value={h.line} onChange={v => updateItem(i, "line", v)} multiline rows={2} />
              <FieldInput label="Angle" value={h.angle} onChange={v => updateItem(i, "angle", v)} />
            </div>
            <button onClick={() => removeItem(i)} className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg hover:opacity-70 mt-5" style={{ backgroundColor: C.panel }}>
              <Trash2 className="w-3 h-3" style={{ color: C.muted }} strokeWidth={2} />
            </button>
          </div>
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted }}>
        <Plus className="w-4 h-4" strokeWidth={2.5} /> Add Hook
      </button>
    </div>
  );
}

function CustomerSection({ data }) {
  if (!data) return <div className="py-6 text-center text-[13px]" style={{ color: C.muted }}>No customer research yet.</div>;
  return (
    <div className="space-y-5">
      <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, rgba(32,119,113,0.03), rgba(32,119,113,0.06))", border: "1px solid " + C.tealBorder }}>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.teal, letterSpacing: "0.12em" }}>Who they are</div>
        <div className="text-[15px] font-semibold mb-1" style={{ color: C.ink }}>{data.headline}</div>
        <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{data.distillation}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: C.rose, letterSpacing: "0.12em" }}>Pain</div>
          <ul className="space-y-2">
            {(data.pain || []).map((p, i) => <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: C.text }}><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.rose }} />{p}</li>)}
          </ul>
        </div>
        <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: C.green, letterSpacing: "0.12em" }}>Desires</div>
          <ul className="space-y-2">
            {(data.desires || []).map((d, i) => <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: C.text }}><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.green }} />{d}</li>)}
          </ul>
        </div>
      </div>
      {data.vocab && (
        <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.12em" }}>Their Vocabulary</div>
          <div className="space-y-2">
            {data.vocab.map((v, i) => (
              <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: i < data.vocab.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}>
                <span className="text-[13px] font-medium italic flex-1" style={{ color: C.ink }}>"{v.hers}"</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.muted }}>{v.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.hangouts && (
        <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.12em" }}>Where She Hangs Out</div>
          <div className="flex flex-wrap gap-2">
            {data.hangouts.map(h => <span key={h} className="text-[12px] px-2.5 py-1 rounded-full" style={{ backgroundColor: C.panel, color: C.text }}>{h}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

function BeliefsSection({ data }) {
  if (!data) return <div className="py-6 text-center text-[13px]" style={{ color: C.muted }}>No belief research yet.</div>;
  return (
    <div className="space-y-3">
      {data.map((b, i) => (
        <div key={i} className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="flex items-start gap-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mt-0.5 flex-shrink-0"
              style={{ backgroundColor: b.priority === "primary" ? C.tealMist : C.panel, color: b.priority === "primary" ? C.teal : C.faint }}>
              {b.priority}
            </span>
            <div className="flex-1">
              <div className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: C.rose, letterSpacing: "0.1em" }}>They believe</div>
              <div className="text-[14px] font-semibold mb-2" style={{ color: C.ink }}>"{b.belief}"</div>
              <div className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: C.green, letterSpacing: "0.1em" }}>Reality</div>
              <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{b.reality}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompetitorSection({ data }) {
  if (!data) return <div className="py-6 text-center text-[13px]" style={{ color: C.muted }}>No competitor research yet.</div>;
  return (
    <div className="space-y-3">
      {data.map((comp, i) => (
        <div key={i} className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[14px] font-semibold mb-1" style={{ color: C.ink }}>{comp.name}</div>
          <div className="text-[12px] mb-2" style={{ color: C.muted }}>{comp.positioning}</div>
          <div className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: C.teal, letterSpacing: "0.1em" }}>Our gap</div>
          <div className="text-[13px] leading-relaxed" style={{ color: C.text }}>{comp.gap}</div>
        </div>
      ))}
    </div>
  );
}

function OfferSection({ data }) {
  if (!data) return <div className="py-6 text-center text-[13px]" style={{ color: C.muted }}>No offer research yet.</div>;
  return (
    <div className="space-y-4">
      <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, rgba(32,119,113,0.03), rgba(32,119,113,0.06))", border: "1px solid " + C.tealBorder }}>
        <div className="text-[22px] font-semibold mb-1" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>{data.headline}</div>
        <div className="text-[14px] font-semibold" style={{ color: C.teal }}>{data.price}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Key Ingredients</div>
          <ul className="space-y-1.5">
            {(data.keyIngredients || []).map(k => <li key={k} className="text-[13px] flex items-center gap-2" style={{ color: C.text }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.teal }} />{k}</li>)}
          </ul>
        </div>
        <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Mechanism</div>
          <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{data.mechanism}</p>
        </div>
      </div>
      <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Proof</div>
        <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{data.proof}</p>
      </div>
      <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Differentiation</div>
        <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{data.differentiation}</p>
      </div>
    </div>
  );
}

function AnglesSection({ data }) {
  if (!data) return <div className="py-6 text-center text-[13px]" style={{ color: C.muted }}>No angles defined yet.</div>;
  const stageColors = { TOF: { bg: "rgba(145,206,191,0.33)", color: C.teal }, MOF: { bg: C.tealMid + "22", color: C.tealMid }, BOF: { bg: C.teal + "22", color: C.teal } };
  return (
    <div className="space-y-3">
      {data.map(a => {
        const sc = stageColors[a.stage] || stageColors.TOF;
        return (
          <div key={a.id} className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1.5px solid " + (a.selected ? C.teal : C.hairline) }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: sc.bg, color: sc.color }}>{a.stage}</span>
              {a.selected && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>Selected</span>}
            </div>
            <div className="text-[14px] font-semibold" style={{ color: C.ink }}>{a.name}</div>
            <div className="text-[13px] mt-1" style={{ color: C.muted }}>{a.tagline}</div>
          </div>
        );
      })}
    </div>
  );
}

function HooksSection({ data }) {
  if (!data) return <div className="py-6 text-center text-[13px]" style={{ color: C.muted }}>No hooks written yet.</div>;
  return (
    <div className="space-y-3">
      {data.map(h => (
        <div key={h.letter} className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[14px] font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}>
              {h.letter}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: C.faint, letterSpacing: "0.1em" }}>{h.type}</div>
              <div className="text-[15px] font-semibold" style={{ color: C.ink }}>"{h.line}"</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PublishStatePill({ state, onChange }) {
  return (
    <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid " + C.hairline }}>
      {PUBLISH_STATES.map((ps, idx) => {
        const active = state === ps.id;
        return (
          <button
            key={ps.id}
            onClick={() => onChange(ps.id)}
            className="px-3 py-1.5 text-[11px] font-bold transition-colors"
            style={{
              backgroundColor: active ? ps.bg : C.surface,
              color: active ? ps.color : C.faint,
              borderRight: idx < PUBLISH_STATES.length - 1 ? "1px solid " + C.hairlineSoft : "none",
            }}
          >
            {ps.id === "review" && active && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: C.amber, verticalAlign: "middle" }} />}
            {ps.label}
          </button>
        );
      })}
    </div>
  );
}

function VisibilityBanner({ publishState }) {
  if (publishState === "draft") return null;
  const isReview = publishState === "review";
  return (
    <div className="mb-4 px-4 py-2.5 rounded-xl text-[12px] font-semibold flex items-center gap-2"
      style={{
        backgroundColor: isReview ? C.amberSoft : C.greenSoft,
        color: isReview ? C.amber : C.green,
        border: "1px solid " + (isReview ? C.amber + "33" : C.green + "33"),
      }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: isReview ? C.amber : C.green }} />
      {isReview ? "Awaiting brand approval — visible to brand portal with review badge" : "Live on brand portal — visible to client"}
    </div>
  );
}

export default function ResearchDetail({ navigate, context }) {
  const campaignId = context?.campaignId;
  const campaign = CAMPAIGNS.find(c => c.id === campaignId);
  const research = RESEARCH[campaignId];

  const [activeSection, setActiveSection] = useState("customer");
  const [publishStates, setPublishStates] = useState({
    customer: "draft", beliefs: "draft", competitor: "draft", offer: "draft", angles: "draft", hooks: "draft",
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [localData, setLocalData] = useState(() => research ? JSON.parse(JSON.stringify(research)) : null);

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

  function handleSectionChange(sectionId) {
    if (editing) {
      setEditing(false);
      setDraft(null);
    }
    setActiveSection(sectionId);
  }

  function handleEdit() {
    setDraft(localData ? JSON.parse(JSON.stringify(localData[activeSection])) : null);
    setEditing(true);
  }

  function handleSave() {
    setLocalData(prev => ({ ...prev, [activeSection]: draft }));
    setEditing(false);
    setDraft(null);
  }

  function handleCancel() {
    setEditing(false);
    setDraft(null);
  }

  function setPublishState(val) {
    setPublishStates(prev => ({ ...prev, [activeSection]: val }));
  }

  function renderReadOnly() {
    if (!localData) return <div className="py-10 text-center text-[13px]" style={{ color: C.muted }}>No research data for this campaign yet.</div>;
    switch (activeSection) {
      case "customer":   return <CustomerSection data={localData.customer} />;
      case "beliefs":    return <BeliefsSection data={localData.beliefs} />;
      case "competitor": return <CompetitorSection data={localData.competitor} />;
      case "offer":      return <OfferSection data={localData.offer} />;
      case "angles":     return <AnglesSection data={localData.angles} />;
      case "hooks":      return <HooksSection data={localData.hooks} />;
      default: return null;
    }
  }

  function renderEditor() {
    switch (activeSection) {
      case "customer":   return <CustomerEditor data={draft} onChange={setDraft} />;
      case "beliefs":    return <BeliefsEditor data={draft} onChange={setDraft} />;
      case "competitor": return <CompetitorEditor data={draft} onChange={setDraft} />;
      case "offer":      return <OfferEditor data={draft} onChange={setDraft} />;
      case "angles":     return <AnglesEditor data={draft} onChange={setDraft} />;
      case "hooks":      return <HooksEditor data={draft} onChange={setDraft} />;
      default: return null;
    }
  }

  const activeSecMeta = SECTIONS.find(s => s.id === activeSection);
  const currentPublishState = publishStates[activeSection];

  return (
    <div className="pb-10">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("research")}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold transition-all hover:opacity-80"
          style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} /> Back
        </button>
        <div className="text-[12px]" style={{ color: C.faint }}>
          Research / <span style={{ color: C.ink }}>{campaign.clientName} — {campaign.title}</span>
        </div>
      </div>

      <div className="rounded-xl px-5 py-3.5 flex items-center gap-4 mb-6" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}>
          {campaign.clientName.split(" ").map(w => w[0]).join("").slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold" style={{ color: C.ink }}>{campaign.title}</div>
          <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{campaign.clientName} · {campaign.product}</div>
        </div>
        <button
          onClick={() => navigate("campaign-detail", { campaignId: campaign.id })}
          className="text-[12px] font-semibold" style={{ color: C.teal }}
        >
          View campaign →
        </button>
      </div>

      <div className="flex gap-5">
        <div className="w-48 flex-shrink-0">
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            {SECTIONS.map((sec, i) => {
              const on = activeSection === sec.id;
              const Icon = sec.icon;
              const ps = publishStates[sec.id];
              const psStyle = PUBLISH_STATES.find(p => p.id === ps);
              return (
                <button
                  key={sec.id}
                  onClick={() => handleSectionChange(sec.id)}
                  className="w-full flex flex-col gap-1 px-4 py-3 text-left transition-colors"
                  style={{
                    backgroundColor: on ? C.tealTint : "transparent",
                    borderLeft: on ? "2px solid " + C.teal : "2px solid transparent",
                    borderBottom: i < SECTIONS.length - 1 ? "1px solid " + C.hairlineSoft : "none",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" strokeWidth={on ? 2.2 : 1.8} style={{ color: on ? C.teal : C.muted }} />
                    <span className="text-[12px] font-semibold" style={{ color: on ? C.teal : C.text }}>{sec.label}</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded self-start" style={{ backgroundColor: psStyle?.bg, color: psStyle?.color }}>{psStyle?.label}</span>
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
              <PublishStatePill state={currentPublishState} onChange={setPublishState} />
              {!editing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold"
                  style={{ backgroundColor: C.tealDeep, color: "#fff" }}
                >
                  <Edit3 className="w-3.5 h-3.5" strokeWidth={2} /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold"
                    style={{ backgroundColor: C.panel, color: C.muted }}
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold text-white"
                    style={{ backgroundColor: C.tealDeep }}
                  >
                    <Save className="w-3.5 h-3.5" strokeWidth={2} /> Save
                  </button>
                </div>
              )}
            </div>
          </div>

          <VisibilityBanner publishState={currentPublishState} />

          {editing ? renderEditor() : renderReadOnly()}
        </div>
      </div>
    </div>
  );
}
