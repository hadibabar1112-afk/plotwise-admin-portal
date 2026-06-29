import { useState } from "react";
import { ArrowLeft, Star, MessageCircle, CheckCircle2, AlertCircle, Power, PowerOff } from "lucide-react";
import { C } from "../constants/colors";
import { CREATORS } from "../data/creators";
import { CAMPAIGNS } from "../data/campaigns";
import { PAYMENTS_TO_CREATORS } from "../data/payments";

export default function CreatorDetail({ creatorId, navigate, creatorStatuses = {}, toggleCreatorStatus }) {
  const creator = CREATORS.find(c => c.id === creatorId);
  const [tab, setTab] = useState("profile");

  if (!creator) return <div className="py-12 text-center" style={{ color: C.muted }}>Creator not found.</div>;

  const assignedCampaigns = CAMPAIGNS.filter(c => c.creatorIds.includes(creatorId));
  const creatorPayments = PAYMENTS_TO_CREATORS.filter(p => p.creatorId === creatorId);
  const TABS = ["profile", "campaigns", "payments"];

  const effectiveStatus = creatorStatuses[creatorId] ?? creator.status;
  const isInactive = effectiveStatus === "inactive";
  const available = effectiveStatus === "active" && creator.capacity.current < creator.capacity.max;
  const capacityPct = creator.capacity.max > 0 ? (creator.capacity.current / creator.capacity.max) * 100 : 0;

  return (
    <div className="pb-10">
      <button onClick={() => navigate("creators")} className="inline-flex items-center gap-2 mb-5 text-[12px] font-semibold" style={{ color: C.muted }}>
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} /> Back to Creators
      </button>

      {/* Header */}
      <div className="rounded-2xl p-6 mb-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-[18px] font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}>
            {creator.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-[22px] font-semibold" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>{creator.name}</h1>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={isInactive
                  ? { backgroundColor: C.roseSoft, color: C.rose }
                  : { backgroundColor: available ? C.greenSoft : C.panel, color: available ? C.green : C.muted }
                }>
                {isInactive ? "Inactive" : available ? "Available" : "At capacity"}
              </span>
              {creator.violations > 0 && (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: C.roseSoft, color: C.rose }}>
                  {creator.violations} violation{creator.violations !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            <div className="text-[13px] flex items-center gap-3" style={{ color: C.muted }}>
              <span>{creator.city}</span>
              <span>·</span>
              <span>${creator.rate}/video</span>
              <span>·</span>
              <span>{creator.niches.join(", ")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("messages")} className="flex items-center gap-2 h-8 px-3 rounded-xl text-[12px] font-semibold"
              style={{ backgroundColor: C.panel, color: C.muted, border: "1px solid " + C.hairline }}>
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} /> Message
            </button>
            <button
              onClick={() => toggleCreatorStatus && toggleCreatorStatus(creatorId)}
              className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[12px] font-semibold transition-all hover:opacity-80"
              style={isInactive
                ? { backgroundColor: C.greenSoft, color: C.green, border: "1px solid " + C.green + "40" }
                : { backgroundColor: C.roseSoft,  color: C.rose,  border: "1px solid " + C.rose + "40" }
              }
            >
              {isInactive
                ? <><Power className="w-3.5 h-3.5" strokeWidth={2} /> Activate Account</>
                : <><PowerOff className="w-3.5 h-3.5" strokeWidth={2} /> Deactivate Account</>
              }
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-3 mt-5">
          {[
            { label: "Videos Shipped", value: creator.videosShipped },
            { label: "Brands Worked", value: creator.brandsWorked },
            { label: "Avg Turnaround", value: creator.avgTurnaround },
            { label: "Rating", value: creator.rating + "★" },
            { label: "Pending Payout", value: creator.paymentPending > 0 ? "$" + creator.paymentPending : "—", highlight: creator.paymentPending > 0 },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairlineSoft }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.faint, letterSpacing: "0.1em" }}>{s.label}</div>
              <div className="text-[16px] font-semibold" style={{ color: s.highlight ? C.amber : C.ink, fontFamily: "var(--font-display)" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Capacity bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[12px] font-semibold" style={{ color: C.muted }}>Capacity</span>
            <span className="text-[12px]" style={{ color: C.muted }}>{creator.capacity.current} of {creator.capacity.max} slots filled</span>
          </div>
          <div className="h-2 rounded-full" style={{ backgroundColor: C.panel }}>
            <div className="h-full rounded-full" style={{ width: capacityPct + "%", backgroundColor: capacityPct >= 100 ? C.rose : C.teal, transition: "width 0.4s ease" }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-5" style={{ borderBottom: "1px solid " + C.hairline }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className="px-4 py-2.5 text-[12px] font-semibold capitalize"
            style={{ color: tab === t ? C.teal : C.muted, borderBottom: tab === t ? "2px solid " + C.teal : "2px solid transparent", marginBottom: -1 }}>
            {t}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {tab === "profile" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Bio</div>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{creator.bio}</p>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid " + C.hairlineSoft }}>
              <div className="text-[12px] font-bold uppercase tracking-widest mb-2.5" style={{ color: C.faint, letterSpacing: "0.1em" }}>Strengths</div>
              <div className="flex flex-wrap gap-2">
                {creator.strengths.map(s => (
                  <span key={s} className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: C.panel, color: C.text }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Social Reach</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold" style={{ color: C.muted }}>Instagram</span>
                  <span className="text-[13px] font-semibold" style={{ color: C.ink }}>{creator.social.instagram}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold" style={{ color: C.muted }}>TikTok</span>
                  <span className="text-[13px] font-semibold" style={{ color: C.ink }}>{creator.social.tiktok}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Agreement</div>
              <div className="flex items-center gap-2">
                {creator.agreementSigned ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} strokeWidth={2} />
                    <span className="text-[13px] font-semibold" style={{ color: C.green }}>Signed</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" style={{ color: C.amber }} strokeWidth={2} />
                    <span className="text-[13px] font-semibold" style={{ color: C.amber }}>Pending</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns tab */}
      {tab === "campaigns" && (
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          {assignedCampaigns.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No campaigns assigned</div>
            </div>
          ) : (
            assignedCampaigns.map((camp, i) => (
              <button
                key={camp.id}
                onClick={() => navigate("campaign-detail", { campaignId: camp.id })}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:opacity-80"
                style={{ borderBottom: i < assignedCampaigns.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{camp.clientName} — {camp.title}</div>
                  <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>Due {camp.deadline} · {camp.totalVideos} videos</div>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.tealMist, color: C.teal }}>{camp.statusLabel}</span>
              </button>
            ))
          )}
        </div>
      )}

      {/* Payments tab */}
      {tab === "payments" && (
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          {creatorPayments.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>No payment records</div>
            </div>
          ) : (
            creatorPayments.map((p, i) => {
              const pstyle = p.status === "paid" ? { bg: C.greenSoft, color: C.green } : p.status === "processing" ? { bg: C.tealMist, color: C.teal } : { bg: C.amberSoft, color: C.amber };
              return (
                <div key={p.id} className="px-5 py-4 flex items-center gap-4" style={{ borderBottom: i < creatorPayments.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{p.campaign}</div>
                    <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{p.reference || p.expectedDate || "—"}</div>
                  </div>
                  <div className="text-[14px] font-semibold" style={{ color: C.ink }}>${p.amount}</div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: pstyle.bg, color: pstyle.color }}>{p.status}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
