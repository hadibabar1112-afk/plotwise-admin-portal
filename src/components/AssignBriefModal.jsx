import { useState } from "react";
import { X, CheckCircle2, FileText, Send, Clock } from "lucide-react";
import { C } from "../constants/colors";

const HOOK_TYPE_COLORS = {
  Contrarian:    { bg: "#EFF6FF", color: "#3B82F6" },
  Confession:    { bg: "#FDF4FF", color: "#A855F7" },
  "Problem-first": { bg: C.amberSoft, color: C.amber },
  Reframe:       { bg: "#F0FDF4", color: "#22C55E" },
  Question:      { bg: "#FFF7ED", color: "#F97316" },
  Story:         { bg: C.tealMist, color: C.teal },
};

function HookTypePill({ type }) {
  const s = HOOK_TYPE_COLORS[type] || { bg: C.panel, color: C.faint };
  return (
    <span className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md" style={{ letterSpacing: "0.08em", backgroundColor: s.bg, color: s.color }}>
      {type}
    </span>
  );
}

export default function AssignBriefModal({ campaign, creator, briefPack, onSend, onClose }) {
  const hooks = briefPack?.hooks || [];
  const specs = briefPack?.specs;
  const [selected, setSelected] = useState(new Set(hooks.map(h => h.letter)));

  function toggle(letter) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(letter)) {
        if (next.size === 1) return prev; // keep at least one selected
        next.delete(letter);
      } else {
        next.add(letter);
      }
      return next;
    });
  }

  const selectedHooks = hooks.filter(h => selected.has(h.letter));
  const canSend = selected.size > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="rounded-2xl w-full shadow-2xl overflow-hidden flex flex-col"
        style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, maxWidth: 640, maxHeight: "88vh" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid " + C.hairline, background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
        >
          <div>
            <h2 className="text-[16px] font-semibold text-white">Assign Brief</h2>
            <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
              {campaign.title} · {campaign.clientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.12)" }}
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Creator strip */}
          <div className="px-6 pt-5">
            <div
              className="flex items-center gap-3 p-3 rounded-xl mb-5"
              style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
              >
                {creator.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{creator.name}</div>
                <div className="text-[12px]" style={{ color: C.muted }}>{creator.email} · {creator.city}</div>
              </div>
              <div
                className="text-[12px] font-semibold px-2.5 py-1 rounded-lg"
                style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}
              >
                ${creator.pricePerVideo ?? creator.rate}/video
              </div>
            </div>
          </div>

          {/* Brief selection */}
          <div className="px-6 pb-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>
                Select Briefs to Send
              </span>
              <span className="text-[11px]" style={{ color: C.faint }}>
                {selected.size} of {hooks.length} selected
              </span>
            </div>

            {hooks.length === 0 ? (
              <div className="py-8 text-center rounded-xl" style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}>
                <FileText className="w-7 h-7 mx-auto mb-2" style={{ color: C.faint }} strokeWidth={1.5} />
                <p className="text-[13px] font-semibold" style={{ color: C.ink }}>No briefs ready yet</p>
                <p className="text-[12px] mt-1" style={{ color: C.muted }}>Complete the brief pack for this campaign first.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {hooks.map(hook => {
                  const isSelected = selected.has(hook.letter);
                  return (
                    <button
                      key={hook.letter}
                      onClick={() => toggle(hook.letter)}
                      className="w-full text-left rounded-xl p-4 transition-all"
                      style={{
                        backgroundColor: isSelected ? C.tealMist : C.bgWarm,
                        border: "1.5px solid " + (isSelected ? C.tealBorder : C.hairlineSoft),
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Check / Hook letter */}
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5"
                          style={{
                            backgroundColor: isSelected ? C.tealDeep : C.panel,
                            color: isSelected ? "#fff" : C.faint,
                          }}
                        >
                          {isSelected ? <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} /> : hook.letter}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[13px] font-semibold" style={{ color: C.ink }}>
                              Hook {hook.letter}
                            </span>
                            <HookTypePill type={hook.type} />
                          </div>
                          <p className="text-[13px] font-medium leading-snug mb-1.5" style={{ color: C.tealDeep }}>
                            "{hook.line}"
                          </p>
                          <p className="text-[12px] leading-relaxed" style={{ color: C.muted }}>
                            {hook.note}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Specs strip */}
          {specs && (
            <div className="px-6 pt-4 pb-5">
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>
                  Deliverable Specs
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                  {[
                    { label: "Length",      value: specs.length },
                    { label: "Aspect",      value: specs.aspect },
                    { label: "Format",      value: specs.format },
                    { label: "Platforms",   value: specs.platforms },
                    { label: "Deliverables",value: specs.deliverables },
                  ].filter(s => s.value).map(s => (
                    <div key={s.label}>
                      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.08em" }}>{s.label}</div>
                      <div className="text-[12px] font-semibold mt-0.5" style={{ color: C.ink }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderTop: "1px solid " + C.hairline }}
        >
          <div className="flex items-center gap-1.5" style={{ color: C.faint }}>
            <Clock className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="text-[12px]">
              {selectedHooks.length === 1
                ? "1 brief will be sent"
                : `${selectedHooks.length} briefs will be sent`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="h-9 px-4 rounded-xl text-[13px] font-semibold"
              style={{ backgroundColor: C.panel, color: C.muted }}
            >
              Cancel
            </button>
            <button
              onClick={() => canSend && onSend(selectedHooks)}
              disabled={!canSend}
              className="h-9 px-5 rounded-xl text-[13px] font-semibold text-white flex items-center gap-2 disabled:opacity-40"
              style={{ backgroundColor: C.tealDeep }}
            >
              <Send className="w-3.5 h-3.5" strokeWidth={2} />
              Send Brief to Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
