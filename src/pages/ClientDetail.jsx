import { useState } from "react";
import { ArrowLeft, ExternalLink, Edit3, MessageCircle, ChevronRight } from "lucide-react";
import { C } from "../constants/colors";
import { CLIENTS } from "../data/clients";
import { CAMPAIGNS } from "../data/campaigns";
import { PAYMENTS_FROM_CLIENTS } from "../data/payments";

const STATUS_STYLES = {
  active:     { bg: C.greenSoft, color: C.green },
  paused:     { bg: C.panel,     color: C.muted  },
  onboarding: { bg: C.amberSoft, color: C.amber  },
};

const CAMPAIGN_STATUS_STYLES = {
  research:   { bg: C.amberSoft,  color: C.amber  },
  briefing:   { bg: C.tealMist,   color: C.teal   },
  production: { bg: C.tealMist,   color: C.tealMid },
  review:     { bg: C.amberSoft,  color: C.amber  },
  complete:   { bg: C.greenSoft,  color: C.green  },
  paused:     { bg: C.panel,      color: C.muted  },
};

export default function ClientDetail({ clientId, navigate }) {
  const client = CLIENTS.find(c => c.id === clientId);
  const [tab, setTab] = useState("overview");

  if (!client) return <div className="py-12 text-center" style={{ color: C.muted }}>Client not found.</div>;

  const clientCampaigns = CAMPAIGNS.filter(c => c.clientId === clientId);
  const clientPayments = PAYMENTS_FROM_CLIENTS.filter(p => p.clientId === clientId);
  const ss = STATUS_STYLES[client.status] || STATUS_STYLES.paused;

  const TABS = ["overview", "campaigns", "payments", "notes"];

  return (
    <div className="pb-10">
      {/* Back */}
      <button
        onClick={() => navigate("clients")}
        className="inline-flex items-center gap-2 mb-5 text-[12px] font-semibold transition-all"
        style={{ color: C.muted }}
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
        Back to Clients
      </button>

      {/* Header card */}
      <div className="rounded-2xl p-6 mb-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="flex items-start gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-[16px] font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}
          >
            {client.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-[22px] font-semibold" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>{client.name}</h1>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: ss.bg, color: ss.color }}>{client.status}</span>
            </div>
            <div className="text-[13px] flex items-center gap-3" style={{ color: C.muted }}>
              <span>{client.industry}</span>
              <span>·</span>
              <span>{client.plan} plan</span>
              <span>·</span>
              <span>Since {client.since}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate("messages")}
              className="flex items-center gap-2 h-8 px-3 rounded-xl text-[12px] font-semibold"
              style={{ backgroundColor: C.panel, color: C.muted, border: "1px solid " + C.hairline }}
            >
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} /> Message
            </button>
            <button
              className="flex items-center gap-2 h-8 px-3 rounded-xl text-[12px] font-semibold"
              style={{ backgroundColor: C.panel, color: C.muted, border: "1px solid " + C.hairline }}
            >
              <Edit3 className="w-3.5 h-3.5" strokeWidth={2} /> Edit
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mt-5">
          {[
            { label: "Active Campaigns", value: client.activeCampaigns },
            { label: "Total Campaigns", value: client.totalCampaigns },
            { label: "Total Spend", value: "$" + client.totalSpend.toLocaleString() },
            { label: "Pending Approvals", value: client.pendingApprovals, highlight: client.pendingApprovals > 0 },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairlineSoft }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.faint, letterSpacing: "0.1em" }}>{s.label}</div>
              <div className="text-[18px] font-semibold" style={{ color: s.highlight ? C.amber : C.ink, fontFamily: "var(--font-display)" }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5" style={{ borderBottom: "1px solid " + C.hairline }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2.5 text-[12px] font-semibold capitalize transition-all"
            style={{
              color: tab === t ? C.teal : C.muted,
              borderBottom: tab === t ? "2px solid " + C.teal : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {tab === "overview" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Contact Info</div>
            <div className="space-y-2.5">
              <div><span className="text-[12px] font-semibold" style={{ color: C.muted }}>Name</span><span className="text-[13px] ml-3" style={{ color: C.ink }}>{client.contact}</span></div>
              <div><span className="text-[12px] font-semibold" style={{ color: C.muted }}>Email</span><span className="text-[13px] ml-3" style={{ color: C.teal }}>{client.email}</span></div>
              <div><span className="text-[12px] font-semibold" style={{ color: C.muted }}>Website</span><span className="text-[13px] ml-3" style={{ color: C.ink }}>{client.website}</span></div>
              <div><span className="text-[12px] font-semibold" style={{ color: C.muted }}>Location</span><span className="text-[13px] ml-3" style={{ color: C.ink }}>{client.location}</span></div>
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Internal Notes</div>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{client.notes}</p>
          </div>
        </div>
      )}

      {/* Tab: Campaigns */}
      {tab === "campaigns" && (
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          {clientCampaigns.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No campaigns yet</div>
            </div>
          ) : (
            clientCampaigns.map((camp, i) => {
              const cs = CAMPAIGN_STATUS_STYLES[camp.status] || CAMPAIGN_STATUS_STYLES.paused;
              return (
                <button
                  key={camp.id}
                  onClick={() => navigate("campaign-detail", { campaignId: camp.id })}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:opacity-80 transition-all"
                  style={{ borderBottom: i < clientCampaigns.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{camp.title}</div>
                    <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{camp.product} · {camp.stage} · {camp.totalVideos} videos · due {camp.deadline}</div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: cs.bg, color: cs.color }}>{camp.statusLabel}</span>
                  <ChevronRight className="w-4 h-4" style={{ color: C.faint }} strokeWidth={2} />
                </button>
              );
            })
          )}
        </div>
      )}

      {/* Tab: Payments */}
      {tab === "payments" && (
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="px-5 py-2.5 flex" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm }}>
            {["Campaign", "Amount", "Status", "Date", "Reference"].map(h => (
              <div key={h} className="flex-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>{h}</div>
            ))}
          </div>
          {clientPayments.map((p, i) => {
            const pstyle = p.status === "paid" ? { bg: C.greenSoft, color: C.green } : p.status === "awaiting" ? { bg: C.amberSoft, color: C.amber } : { bg: C.panel, color: C.muted };
            return (
              <div key={p.id} className="px-5 py-3.5 flex items-center" style={{ borderBottom: i < clientPayments.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}>
                <div className="flex-1 text-[13px]" style={{ color: C.ink }}>{p.campaign}</div>
                <div className="flex-1 text-[13px] font-semibold" style={{ color: C.ink }}>${p.amount.toLocaleString()}</div>
                <div className="flex-1">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: pstyle.bg, color: pstyle.color }}>{p.status}</span>
                </div>
                <div className="flex-1 text-[12px]" style={{ color: C.muted }}>{p.paidDate || "—"}</div>
                <div className="flex-1 text-[12px] font-mono" style={{ color: C.faint }}>{p.reference || "—"}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Notes */}
      {tab === "notes" && (
        <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Client Notes</div>
          <textarea
            defaultValue={client.notes}
            rows={8}
            className="w-full p-3 rounded-xl text-[13px] leading-relaxed outline-none resize-none"
            style={{ border: "1.5px solid " + C.hairline, backgroundColor: C.bg, color: C.ink, fontFamily: "var(--font-sans)" }}
            placeholder="Add notes about this client…"
          />
          <div className="mt-3 flex justify-end">
            <button className="h-8 px-4 rounded-xl text-[12px] font-semibold text-white" style={{ backgroundColor: C.tealDeep }}>Save Notes</button>
          </div>
        </div>
      )}
    </div>
  );
}
