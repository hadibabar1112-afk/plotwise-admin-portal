import { useState } from "react";
import {
  ArrowLeft, ArrowRight, UserPlus, CheckCircle2, Clock, AlertCircle,
  Edit3, MessageSquare, Send, UserCheck, Shield, FileText, Users,
} from "lucide-react";
import { C } from "../constants/colors";
import { CAMPAIGNS, CAMPAIGN_STATUSES } from "../data/campaigns";
import { CREATORS } from "../data/creators";
import { RESEARCH } from "../data/research";
import { PRODUCTION_DETAILS } from "../data/productionDetails";
import OfferModal from "../components/OfferModal";
import MessageModal from "../components/MessageModal";
import AssignBriefModal from "../components/AssignBriefModal";

const STAGE_STYLES = {
  TOF: { bg: "rgba(145,206,191,0.33)", color: C.teal, label: "Top of Funnel" },
  MOF: { bg: C.tealMid + "22", color: C.tealMid, label: "Middle of Funnel" },
  BOF: { bg: C.teal + "22", color: C.teal, label: "Bottom of Funnel" },
};

const PRODUCTION_STATUSES = {
  "not-started":        { label: "Not started",        color: C.faint,   bg: C.panel },
  "brief-sent":         { label: "Brief sent",         color: C.amber,   bg: C.amberSoft },
  "shooting":           { label: "Shooting",           color: C.teal,    bg: C.tealMist },
  "submitted":          { label: "Submitted",          color: C.tealMid, bg: "#1A8A8215" },
  "revision-requested": { label: "Revision requested", color: C.amber,   bg: C.amberSoft },
  "approved":           { label: "Approved",           color: C.green,   bg: C.greenSoft },
};

const SHORTLIST_STATUS_CONFIG = {
  "shortlisted":      { label: "Shortlisted",      bg: C.amberSoft,  color: C.amber   },
  "offered":          { label: "Offer Sent",        bg: "#1A8A8215",  color: C.tealMid },
  "creator-locked":   { label: "Creator Locked",    bg: C.greenSoft,  color: C.green   },
  "client-approved":  { label: "Client Approved",   bg: C.greenSoft,  color: C.green   },
  "in-production":    { label: "In Production",     bg: C.tealMist,   color: C.teal    },
};

function SectionStatus({ label, status }) {
  const styles = {
    "complete":    { icon: CheckCircle2, color: C.green },
    "in-progress": { icon: Clock,        color: C.amber },
    "not-started": { icon: Clock,        color: C.faint },
  };
  const { icon: Icon, color } = styles[status] || styles["not-started"];
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid " + C.hairlineSoft }}>
      <span className="text-[13px]" style={{ color: C.text }}>{label}</span>
      <div className="flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" style={{ color }} strokeWidth={2} />
        <span className="text-[12px] font-semibold capitalize" style={{ color }}>{status.replace(/-/g, " ")}</span>
      </div>
    </div>
  );
}

export default function CampaignDetail({ campaignId, navigate }) {
  const campaign = CAMPAIGNS.find(c => c.id === campaignId);
  const [tab, setTab] = useState("overview");

  // Shortlist creator state — merge campaign shortlistData with CREATORS data
  const [shortlistItems, setShortlistItems] = useState(() => {
    const sc = campaign?.shortlistedCreators || [];
    return sc.map(item => {
      const creator = CREATORS.find(c => c.id === item.id);
      if (!creator) return null;
      return { ...creator, shortlistStatus: item.shortlistStatus, pricePerVideo: item.pricePerVideo ?? creator.rate, offerMessage: item.offerMessage ?? null };
    }).filter(Boolean);
  });

  // Per-creator message threads
  const [messageThreads, setMessageThreads] = useState(() => {
    const threads = {};
    (campaign?.shortlistedCreators || []).forEach(item => {
      if (item.offerMessage) {
        threads[item.id] = [{ sender: "admin", text: item.offerMessage, time: "Earlier", isOffer: true }];
      }
    });
    return threads;
  });

  const [offerTarget, setOfferTarget] = useState(null);
  const [msgTarget, setMsgTarget] = useState(null);
  const [briefTarget, setBriefTarget] = useState(null);

  if (!campaign) return <div className="py-12 text-center" style={{ color: C.muted }}>Campaign not found.</div>;

  const ss = CAMPAIGN_STATUSES[campaign.status] || CAMPAIGN_STATUSES.paused;
  const stage = STAGE_STYLES[campaign.stage] || STAGE_STYLES.TOF;
  const research = RESEARCH[campaignId];
  const assignedCreators = CREATORS.filter(c => campaign.creatorIds.includes(c.id));
  const progressPct = campaign.totalVideos > 0 ? (campaign.videosApproved / campaign.totalVideos) * 100 : 0;
  const prodStatus = PRODUCTION_STATUSES[campaign.productionStatus] || PRODUCTION_STATUSES["not-started"];

  const TABS = ["overview", "research", "creators", "production"];

  // ── Shortlist actions ────────────────────────────────────────────────────────

  function sendOffer(creatorId, message, price) {
    setShortlistItems(prev => prev.map(c =>
      c.id === creatorId ? { ...c, shortlistStatus: "offered", pricePerVideo: price, offerMessage: message } : c
    ));
    setMessageThreads(prev => ({
      ...prev,
      [creatorId]: [...(prev[creatorId] || []), { sender: "admin", text: message, time: "Just now", isOffer: true }],
    }));
    setOfferTarget(null);
  }

  function markAccepted(creatorId) {
    setShortlistItems(prev => prev.map(c =>
      c.id === creatorId ? { ...c, shortlistStatus: "creator-locked" } : c
    ));
  }

  function approveForClient(creatorId) {
    setShortlistItems(prev => prev.map(c =>
      c.id === creatorId ? { ...c, shortlistStatus: "client-approved" } : c
    ));
  }

  function assignBrief(creator) {
    setBriefTarget(creator);
  }

  function sendBrief(creatorId, _selectedHooks) {
    setShortlistItems(prev => prev.map(c =>
      c.id === creatorId ? { ...c, shortlistStatus: "in-production" } : c
    ));
    setBriefTarget(null);
    navigate("production-detail", { campaignId });
  }

  function sendMessage(creatorId, text) {
    setMessageThreads(prev => ({
      ...prev,
      [creatorId]: [...(prev[creatorId] || []), { sender: "admin", text, time: "Just now" }],
    }));
  }

  // ── Derived lists for Production tab ────────────────────────────────────────
  const clientApproved = shortlistItems.filter(c => c.shortlistStatus === "client-approved");
  const inProduction   = shortlistItems.filter(c => c.shortlistStatus === "in-production");

  return (
    <>
      {/* Modals */}
      {offerTarget && (
        <OfferModal
          campaign={campaign}
          creator={offerTarget}
          onSend={(msg, price) => sendOffer(offerTarget.id, msg, price)}
          onClose={() => setOfferTarget(null)}
        />
      )}
      {msgTarget && (
        <MessageModal
          creator={msgTarget}
          messages={messageThreads[msgTarget.id] || []}
          onSend={text => sendMessage(msgTarget.id, text)}
          onClose={() => setMsgTarget(null)}
        />
      )}
      {briefTarget && (
        <AssignBriefModal
          campaign={campaign}
          creator={briefTarget}
          briefPack={PRODUCTION_DETAILS[campaignId]?.briefPack}
          onSend={selectedHooks => sendBrief(briefTarget.id, selectedHooks)}
          onClose={() => setBriefTarget(null)}
        />
      )}

      <div className="pb-10">
        <button onClick={() => navigate("campaigns")} className="inline-flex items-center gap-2 mb-5 text-[12px] font-semibold" style={{ color: C.muted }}>
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} /> Back to Campaigns
        </button>

        {/* Header */}
        <div className="rounded-2xl p-6 mb-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: stage.bg, color: stage.color }}>{campaign.stage} · {stage.label}</span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: ss.bg, color: ss.color }}>{campaign.statusLabel}</span>
              </div>
              <h1 className="text-[22px] font-semibold" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>{campaign.title}</h1>
              <div className="text-[13px] mt-1" style={{ color: C.muted }}>{campaign.clientName} · {campaign.product}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => navigate("research", { campaignId: campaign.id })}
                className="flex items-center gap-2 h-8 px-3 rounded-xl text-[12px] font-semibold"
                style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}
              >
                Open Research
              </button>
              <button className="flex items-center gap-2 h-8 px-3 rounded-xl text-[12px] font-semibold"
                style={{ backgroundColor: C.panel, color: C.muted, border: "1px solid " + C.hairline }}>
                <Edit3 className="w-3.5 h-3.5" strokeWidth={2} /> Edit
              </button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-5 gap-3 mt-5">
            {[
              { label: "Budget",    value: "$" + campaign.budget.toLocaleString() },
              { label: "Paid Out",  value: "$" + campaign.paid.toLocaleString() },
              { label: "Videos",    value: campaign.totalVideos },
              { label: "Deadline",  value: campaign.deadline },
              { label: "Platforms", value: campaign.platforms.join(", ") },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairlineSoft }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.faint, letterSpacing: "0.1em" }}>{s.label}</div>
                <div className="text-[14px] font-semibold" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between mb-1.5">
              <span className="text-[12px] font-semibold" style={{ color: C.muted }}>Video progress</span>
              <span className="text-[12px]" style={{ color: C.muted }}>{campaign.videosApproved}/{campaign.totalVideos} approved</span>
            </div>
            <div className="h-2 rounded-full" style={{ backgroundColor: C.panel }}>
              <div className="h-full rounded-full" style={{ width: progressPct + "%", backgroundColor: progressPct === 100 ? C.green : C.teal, transition: "width 0.4s ease" }} />
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

        {/* ── Overview tab ──────────────────────────────────────────────────── */}
        {tab === "overview" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
                <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Angle</div>
                <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{campaign.angle}</p>
              </div>
              <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
                <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Phase Checklist</div>
                {research ? (
                  <>
                    <SectionStatus label="Research" status={research.status.customer !== "not-started" ? "complete" : "not-started"} />
                    <SectionStatus label="Brief" status={campaign.briefStatus === "approved" ? "complete" : campaign.briefStatus === "pending" ? "in-progress" : "not-started"} />
                    <SectionStatus label="Creator assigned" status={campaign.creatorIds.length > 0 ? "complete" : "not-started"} />
                    <SectionStatus label="Production" status={campaign.productionStatus === "approved" ? "complete" : campaign.productionStatus !== "not-started" ? "in-progress" : "not-started"} />
                  </>
                ) : (
                  <SectionStatus label="Research" status="not-started" />
                )}
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Assigned Creators</div>
              {assignedCreators.length === 0 ? (
                <div className="py-6 text-center">
                  <div className="text-[12px]" style={{ color: C.muted }}>No creators assigned yet.</div>
                  <button onClick={() => navigate("creators")} className="mt-3 flex items-center gap-1.5 mx-auto h-8 px-3 rounded-xl text-[12px] font-semibold" style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>
                    <UserPlus className="w-3.5 h-3.5" strokeWidth={2} /> Assign Creator
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {assignedCreators.map(cr => (
                    <button key={cr.id} onClick={() => navigate("creator-detail", { creatorId: cr.id })} className="w-full flex items-center gap-3 text-left hover:opacity-80">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}>{cr.initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{cr.name}</div>
                        <div className="text-[12px]" style={{ color: C.muted }}>{cr.niches.join(", ")} · ${cr.rate}/video</div>
                      </div>
                    </button>
                  ))}
                  <button onClick={() => navigate("creators")} className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[11px] font-semibold mt-2" style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>
                    <UserPlus className="w-3 h-3" strokeWidth={2} /> Add Creator
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Research tab ──────────────────────────────────────────────────── */}
        {tab === "research" && (
          <div>
            {!research ? (
              <div className="rounded-xl py-12 text-center" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
                <div className="text-[13px] font-semibold mb-2" style={{ color: C.ink }}>Research not started</div>
                <button onClick={() => navigate("research", { campaignId: campaign.id })} className="h-9 px-4 rounded-xl text-[13px] font-semibold text-white" style={{ backgroundColor: C.tealDeep }}>
                  Start Research
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
                  <div className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: C.faint, letterSpacing: "0.1em" }}>Research Progress</div>
                  {Object.entries(research.status).map(([key, val]) => (
                    <SectionStatus key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} status={val} />
                  ))}
                  <button onClick={() => navigate("research", { campaignId: campaign.id })} className="mt-3 h-8 px-4 rounded-xl text-[12px] font-semibold text-white" style={{ backgroundColor: C.tealDeep }}>
                    Open Research Workspace
                  </button>
                </div>
                {research.customer && (
                  <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Customer Insight</div>
                    <div className="text-[14px] font-semibold mb-1" style={{ color: C.ink }}>{research.customer.headline}</div>
                    <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{research.customer.distillation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Creators tab ──────────────────────────────────────────────────── */}
        {tab === "creators" && (
          <div className="space-y-4">
            {/* Section header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[14px] font-semibold" style={{ color: C.ink }}>Shortlisted Creators</h2>
                <p className="text-[12px] mt-0.5" style={{ color: C.muted }}>Creators shortlisted by the client — manage offers and track status.</p>
              </div>
              <span className="text-[12px]" style={{ color: C.faint }}>{shortlistItems.length} creator{shortlistItems.length !== 1 ? "s" : ""}</span>
            </div>

            {shortlistItems.length === 0 ? (
              <div className="rounded-xl py-14 text-center" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: C.panel }}>
                  <Users className="w-5 h-5" style={{ color: C.faint }} strokeWidth={1.5} />
                </div>
                <p className="text-[13px] font-semibold mb-1" style={{ color: C.ink }}>No creators shortlisted yet</p>
                <p className="text-[12px]" style={{ color: C.muted }}>The client hasn't shortlisted any creators for this campaign.</p>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
                {shortlistItems.map((creator, i) => {
                  const sc = SHORTLIST_STATUS_CONFIG[creator.shortlistStatus] || SHORTLIST_STATUS_CONFIG.shortlisted;
                  const threads = messageThreads[creator.id] || [];
                  const isLast = i === shortlistItems.length - 1;
                  const showOfferStrip = (creator.shortlistStatus === "offered" || creator.shortlistStatus === "creator-locked") && creator.offerMessage;

                  return (
                    <div key={creator.id} style={{ borderBottom: isLast ? "none" : "1px solid " + C.hairlineSoft }}>
                      {/* Main row */}
                      <div className="flex items-center gap-4 px-5 py-4">
                        {/* Avatar */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
                        >
                          {creator.initials}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[13px] font-semibold" style={{ color: C.ink }}>{creator.name}</span>
                            <span
                              className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: sc.bg, color: sc.color }}
                            >
                              {creator.shortlistStatus === "offered" && (
                                <span className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse flex-shrink-0" style={{ background: sc.color }} />
                              )}
                              {sc.label}
                            </span>
                          </div>
                          <div className="text-[12px] mt-0.5 flex items-center gap-2" style={{ color: C.muted }}>
                            <span>{creator.city} · {creator.niches.slice(0, 2).join(", ")}</span>
                            {creator.shortlistStatus !== "shortlisted" && creator.pricePerVideo && (
                              <span className="font-semibold" style={{ color: C.tealMid }}>${creator.pricePerVideo}/video</span>
                            )}
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Message — show for all non-in-production */}
                          {creator.shortlistStatus !== "in-production" && (
                            <button
                              onClick={() => setMsgTarget(creator)}
                              className="h-8 px-3 rounded-xl text-[12px] font-semibold flex items-center gap-1.5 relative"
                              style={{ backgroundColor: C.panel, color: C.muted, border: "1px solid " + C.hairline }}
                            >
                              <MessageSquare className="w-3.5 h-3.5" strokeWidth={2} />
                              Message
                              {threads.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ backgroundColor: C.teal }} />
                              )}
                            </button>
                          )}

                          {/* Shortlisted → Offer Campaign */}
                          {creator.shortlistStatus === "shortlisted" && (
                            <button
                              onClick={() => setOfferTarget(creator)}
                              className="h-8 px-3 rounded-xl text-[12px] font-semibold flex items-center gap-1.5 text-white"
                              style={{ backgroundColor: C.tealDeep }}
                            >
                              <Send className="w-3.5 h-3.5" strokeWidth={2} />
                              Offer Campaign
                            </button>
                          )}

                          {/* Offered → Mark as Accepted */}
                          {creator.shortlistStatus === "offered" && (
                            <button
                              onClick={() => markAccepted(creator.id)}
                              className="h-8 px-3 rounded-xl text-[12px] font-semibold flex items-center gap-1.5 text-white"
                              style={{ backgroundColor: C.green }}
                            >
                              <UserCheck className="w-3.5 h-3.5" strokeWidth={2} />
                              Mark Accepted
                            </button>
                          )}

                          {/* Creator Locked → Approve for Client */}
                          {creator.shortlistStatus === "creator-locked" && (
                            <button
                              onClick={() => approveForClient(creator.id)}
                              className="h-8 px-3 rounded-xl text-[12px] font-semibold flex items-center gap-1.5 text-white"
                              style={{ backgroundColor: C.tealDeep }}
                            >
                              <Shield className="w-3.5 h-3.5" strokeWidth={2} />
                              Approve for Client
                            </button>
                          )}

                          {/* Client Approved — ready badge */}
                          {creator.shortlistStatus === "client-approved" && (
                            <span
                              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl text-[12px] font-semibold"
                              style={{ backgroundColor: C.greenSoft, color: C.green }}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                              Ready for Production
                            </span>
                          )}

                          {/* In Production → View Production */}
                          {creator.shortlistStatus === "in-production" && (
                            <button
                              onClick={() => navigate("production-detail", { campaignId })}
                              className="h-8 px-3 rounded-xl text-[12px] font-semibold flex items-center gap-1.5 text-white"
                              style={{ backgroundColor: C.tealDeep }}
                            >
                              View Production
                              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Offer strip — shown when offer was sent */}
                      {showOfferStrip && (
                        <div
                          className="mx-5 mb-4 px-4 py-3 rounded-xl"
                          style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}
                        >
                          <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: C.faint, letterSpacing: "0.08em" }}>Offer Message</div>
                          <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: C.text }}>{creator.offerMessage}</p>
                          {creator.pricePerVideo && (
                            <span
                              className="inline-flex items-center mt-2 text-[11px] font-semibold px-2 py-0.5 rounded-lg"
                              style={{ backgroundColor: C.tealMist, color: C.tealMid, border: "1px solid " + C.tealBorder }}
                            >
                              ${creator.pricePerVideo}/video offered
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Production tab ────────────────────────────────────────────────── */}
        {tab === "production" && (
          <div className="space-y-4">
            {/* Assign Brief — for client-approved creators */}
            {clientApproved.length > 0 && (
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.green + "50" }}>
                <div
                  className="flex items-center gap-2 px-5 py-3"
                  style={{ borderBottom: "1px solid " + C.green + "30", backgroundColor: C.greenSoft }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} strokeWidth={2} />
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.green, letterSpacing: "0.1em" }}>Ready to Brief</span>
                  <span className="text-[11px]" style={{ color: C.green + "AA" }}>— client approved {clientApproved.length} creator{clientApproved.length !== 1 ? "s" : ""}</span>
                </div>
                {clientApproved.map((creator, i) => (
                  <div
                    key={creator.id}
                    className="flex items-center gap-4 px-5 py-4"
                    style={{ borderBottom: i < clientApproved.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
                    >
                      {creator.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{creator.name}</div>
                      <div className="text-[12px]" style={{ color: C.muted }}>
                        {creator.pricePerVideo ? "$" + creator.pricePerVideo + "/video" : creator.city}
                        {" · "}{creator.niches.slice(0, 2).join(", ")}
                      </div>
                    </div>
                    <button
                      onClick={() => assignBrief(creator)}
                      className="h-9 px-4 rounded-xl text-[13px] font-semibold text-white flex items-center gap-2"
                      style={{ backgroundColor: C.tealDeep }}
                    >
                      <FileText className="w-3.5 h-3.5" strokeWidth={2} />
                      Assign Brief + Send
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* In production creators */}
            {inProduction.length > 0 && (
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
                <div className="px-5 py-3" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm }}>
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>In Production</span>
                </div>
                {inProduction.map((creator, i) => (
                  <div
                    key={creator.id}
                    className="flex items-center gap-4 px-5 py-4"
                    style={{ borderBottom: i < inProduction.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
                    >
                      {creator.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{creator.name}</div>
                      <div className="text-[12px]" style={{ color: C.muted }}>
                        {creator.pricePerVideo ? "$" + creator.pricePerVideo + "/video" : creator.city}
                        {" · "}{creator.niches.slice(0, 2).join(", ")}
                      </div>
                    </div>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: prodStatus.bg, color: prodStatus.color }}
                    >
                      {prodStatus.label}
                    </span>
                    <button
                      onClick={() => navigate("production-detail", { campaignId })}
                      className="h-9 px-4 rounded-xl text-[13px] font-semibold flex items-center gap-2"
                      style={{ backgroundColor: C.teal, color: "#fff" }}
                    >
                      View Production
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Pipeline checklist */}
            <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-[12px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>Production Pipeline</div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: prodStatus.bg, color: prodStatus.color }}>{prodStatus.label}</span>
              </div>
              <div className="space-y-3">
                {[
                  { step: "Brief created",            done: campaign.briefStatus !== "not-started" },
                  { step: "Brief approved by client", done: campaign.briefStatus === "approved" },
                  { step: "Creator assigned",         done: inProduction.length > 0 },
                  { step: "Brief sent to creator",    done: ["brief-sent","shooting","submitted","revision-requested","approved"].includes(campaign.productionStatus) },
                  { step: "Creator shooting",         done: ["shooting","submitted","revision-requested","approved"].includes(campaign.productionStatus) },
                  { step: "Video submitted",          done: ["submitted","revision-requested","approved"].includes(campaign.productionStatus) },
                  { step: "Under admin review",       done: ["revision-requested","approved"].includes(campaign.productionStatus) },
                  { step: "Approved",                 done: campaign.productionStatus === "approved" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: s.done ? C.greenSoft : C.panel, border: "1.5px solid " + (s.done ? C.green : C.hairline) }}
                    >
                      {s.done && <CheckCircle2 className="w-3 h-3" style={{ color: C.green }} strokeWidth={2.5} />}
                    </div>
                    <span className="text-[13px]" style={{ color: s.done ? C.ink : C.faint }}>{s.step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
