import { useState } from "react";
import { Search, CheckCircle2, Circle, ChevronRight, UserPlus } from "lucide-react";
import { C } from "../constants/colors";
import { CLIENTS } from "../data/clients";

const STEPS = [
  { id: "agreement",  label: "Agreement" },
  { id: "brief",      label: "Brief Setup" },
  { id: "research",   label: "Research" },
  { id: "campaign",   label: "Campaign" },
];

function StepPips({ steps }) {
  return (
    <div className="flex items-center gap-1.5">
      {STEPS.map((s, i) => {
        const step = steps?.find(st => st.id === s.id);
        const done = step?.done ?? false;
        return (
          <div key={s.id} className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              {done
                ? <CheckCircle2 className="w-3.5 h-3.5" style={{ color: C.green }} strokeWidth={2} />
                : <Circle className="w-3.5 h-3.5" style={{ color: C.hairline }} strokeWidth={2} />
              }
              <span className="text-[11px]" style={{ color: done ? C.green : C.faint }}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-4 h-px" style={{ backgroundColor: C.hairlineSoft }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function progressLabel(steps) {
  if (!steps) return { text: "Not started", pct: 0 };
  const done = steps.filter(s => s.done).length;
  const total = STEPS.length;
  if (done === total) return { text: "Ready to activate", pct: 100 };
  return { text: `${done} of ${total} steps done`, pct: Math.round((done / total) * 100) };
}

export default function ClientOnboarding({ navigate }) {
  const [clients, setClients] = useState(
    CLIENTS.filter(c => c.status === "onboarding")
  );
  const [search, setSearch] = useState("");
  const [onboarded, setOnboarded] = useState([]);

  const filtered = clients.filter(c =>
    !search
    || c.name.toLowerCase().includes(search.toLowerCase())
    || c.contact.toLowerCase().includes(search.toLowerCase())
    || c.industry.toLowerCase().includes(search.toLowerCase())
  );

  function handleOnboard(id) {
    setOnboarded(prev => [...prev, id]);
  }

  const readyCount = clients.filter(c => {
    const prog = progressLabel(c.onboardingSteps);
    return prog.pct === 100;
  }).length;

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
            Client Onboarding
          </h1>
          <p className="text-[13px] mt-1" style={{ color: C.muted }}>
            {clients.length} clients in onboarding · {readyCount} ready to activate
          </p>
        </div>
        <button
          className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold text-white"
          style={{ backgroundColor: C.tealDeep }}
        >
          <UserPlus className="w-4 h-4" strokeWidth={2.5} /> Add Client
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {STEPS.map(step => {
          const count = clients.filter(c => c.onboardingSteps?.find(s => s.id === step.id)?.done).length;
          const pct = clients.length > 0 ? Math.round((count / clients.length) * 100) : 0;
          return (
            <div key={step.id} className="rounded-xl p-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>{step.label}</div>
              <div className="text-[22px] font-semibold mb-2" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>
                {count}<span className="text-[13px] font-normal ml-1" style={{ color: C.faint }}>/ {clients.length}</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: C.panel }}>
                <div className="h-full rounded-full" style={{ width: pct + "%", backgroundColor: pct === 100 ? C.green : C.teal }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
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
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        {/* Headers */}
        <div
          className="grid px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest"
          style={{
            gridTemplateColumns: "1.4fr 1fr 100px 1.8fr 120px",
            borderBottom: "1px solid " + C.hairlineSoft,
            backgroundColor: C.bgWarm,
            color: C.faint,
            letterSpacing: "0.1em",
          }}
        >
          <div>Client</div>
          <div>Contact</div>
          <div>Plan</div>
          <div>Onboarding Steps</div>
          <div></div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No clients in onboarding</div>
            <div className="text-[12px] mt-1" style={{ color: C.muted }}>Add a new client to get started.</div>
          </div>
        ) : (
          filtered.map((client, i) => {
            const prog = progressLabel(client.onboardingSteps);
            const isOnboarded = onboarded.includes(client.id);
            const isReady = prog.pct === 100;
            return (
              <div
                key={client.id}
                className="grid px-5 py-4 items-center"
                style={{
                  gridTemplateColumns: "1.4fr 1fr 100px 1.8fr 120px",
                  borderBottom: i < filtered.length - 1 ? "1px solid " + C.hairlineSoft : "none",
                  backgroundColor: isOnboarded ? C.greenSoft + "55" : "transparent",
                }}
              >
                {/* Client */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}
                  >
                    {client.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold truncate" style={{ color: C.ink }}>{client.name}</div>
                    <div className="text-[11px] mt-0.5 truncate" style={{ color: C.muted }}>{client.industry} · {client.location}</div>
                  </div>
                </div>

                {/* Contact */}
                <div className="min-w-0">
                  <div className="text-[13px] truncate" style={{ color: C.ink }}>{client.contact}</div>
                  <div className="text-[11px] mt-0.5 truncate" style={{ color: C.faint }}>{client.email}</div>
                </div>

                {/* Plan */}
                <div>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: client.plan === "Managed" ? C.tealMist : C.panel,
                      color: client.plan === "Managed" ? C.teal : C.muted,
                      border: client.plan === "Managed" ? "1px solid " + C.tealBorder : "none",
                    }}
                  >
                    {client.plan}
                  </span>
                </div>

                {/* Onboarding steps */}
                <div className="flex flex-col gap-1.5">
                  <StepPips steps={client.onboardingSteps} />
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: C.panel, maxWidth: 140 }}>
                      <div className="h-full rounded-full" style={{ width: prog.pct + "%", backgroundColor: isReady ? C.green : C.teal }} />
                    </div>
                    <span className="text-[11px]" style={{ color: isReady ? C.green : C.faint }}>{prog.text}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => navigate("client-detail", { clientId: client.id })}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                    style={{ backgroundColor: C.panel, border: "1px solid " + C.hairline }}
                    title="View client"
                  >
                    <ChevronRight className="w-3.5 h-3.5" style={{ color: C.muted }} strokeWidth={2} />
                  </button>
                  {isOnboarded ? (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg" style={{ backgroundColor: C.greenSoft, color: C.green }}>
                      Activated ✓
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOnboard(client.id)}
                      disabled={!isReady}
                      className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[12px] font-semibold transition-all"
                      style={isReady
                        ? { backgroundColor: C.teal, color: "#fff", cursor: "pointer" }
                        : { backgroundColor: C.panel, color: C.faint, cursor: "not-allowed" }
                      }
                      title={isReady ? "Mark as active client" : "Complete all steps first"}
                    >
                      <UserPlus className="w-3.5 h-3.5" strokeWidth={2} /> Onboard
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {filtered.length > 0 && (
        <p className="text-[11px] mt-3 px-1" style={{ color: C.faint }}>
          The Onboard button becomes active once all 4 steps are complete.
        </p>
      )}
    </div>
  );
}
