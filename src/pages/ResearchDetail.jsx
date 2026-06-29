import { useState } from "react";
import { ArrowLeft, Edit3, Lightbulb, Target, Users, Zap, BookOpen, Anchor } from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS } from "../data/campaigns";
import { RESEARCH } from "../data/research";

const SECTIONS = [
  { id: "customer",   label: "Customer",   icon: Users,      desc: "Who we're talking to and what they feel" },
  { id: "beliefs",    label: "Beliefs",    icon: Lightbulb,  desc: "What they believe vs. what's actually true" },
  { id: "competitor", label: "Competitor", icon: Target,     desc: "What else they're considering" },
  { id: "offer",      label: "Offer",      icon: Anchor,     desc: "What we're selling and why it wins" },
  { id: "angles",     label: "Angles",     icon: Zap,        desc: "Creative directions for content" },
  { id: "hooks",      label: "Hooks",      icon: BookOpen,   desc: "Opening lines for each angle" },
];

const STATUS_STYLES = {
  "complete":    { bg: C.greenSoft, color: C.green, label: "Complete" },
  "in-progress": { bg: C.amberSoft, color: C.amber, label: "In progress" },
  "not-started": { bg: C.panel,     color: C.faint, label: "Not started" },
};

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
            {data.pain.map((p, i) => <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: C.text }}><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.rose }} />{p}</li>)}
          </ul>
        </div>
        <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: C.green, letterSpacing: "0.12em" }}>Desires</div>
          <ul className="space-y-2">
            {data.desires.map((d, i) => <li key={i} className="text-[13px] flex items-start gap-2" style={{ color: C.text }}><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.green }} />{d}</li>)}
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
            {data.keyIngredients.map(k => <li key={k} className="text-[13px] flex items-center gap-2" style={{ color: C.text }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.teal }} />{k}</li>)}
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

export default function ResearchDetail({ navigate, context }) {
  const campaignId = context?.campaignId;
  const campaign = CAMPAIGNS.find(c => c.id === campaignId);
  const research = RESEARCH[campaignId];
  const [activeSection, setActiveSection] = useState("customer");

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

  function renderSection() {
    if (!research) return <div className="py-10 text-center text-[13px]" style={{ color: C.muted }}>No research data for this campaign yet.</div>;
    switch (activeSection) {
      case "customer":   return <CustomerSection data={research.customer} />;
      case "beliefs":    return <BeliefsSection data={research.beliefs} />;
      case "competitor": return <CompetitorSection data={research.competitor} />;
      case "offer":      return <OfferSection data={research.offer} />;
      case "angles":     return <AnglesSection data={research.angles} />;
      case "hooks":      return <HooksSection data={research.hooks} />;
      default: return null;
    }
  }

  return (
    <div className="pb-10">
      {/* Top bar */}
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

      {/* Campaign context bar */}
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
        {/* Left nav */}
        <div className="w-48 flex-shrink-0">
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            {SECTIONS.map((sec, i) => {
              const on = activeSection === sec.id;
              const Icon = sec.icon;
              const status = research?.status?.[sec.id] || "not-started";
              const ss = STATUS_STYLES[status] || STATUS_STYLES["not-started"];
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
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
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded self-start" style={{ backgroundColor: ss.bg, color: ss.color }}>{ss.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[16px] font-semibold" style={{ color: C.ink }}>
                {SECTIONS.find(s => s.id === activeSection)?.label}
              </h2>
              <p className="text-[12px] mt-0.5" style={{ color: C.muted }}>
                {SECTIONS.find(s => s.id === activeSection)?.desc}
              </p>
            </div>
            <button className="flex items-center gap-2 h-8 px-3 rounded-xl text-[12px] font-semibold"
              style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>
              <Edit3 className="w-3.5 h-3.5" strokeWidth={2} /> Edit
            </button>
          </div>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
