import { ArrowUpRight, Users, Briefcase, Film, Clock, AlertCircle, CheckCircle2, TrendingUp, UserCheck } from "lucide-react";
import { C } from "../constants/colors";
import { CLIENTS } from "../data/clients";
import { CREATORS } from "../data/creators";
import { CAMPAIGNS } from "../data/campaigns";
import { PAYMENTS_TO_CREATORS, PAYMENTS_FROM_CLIENTS } from "../data/payments";

function StatCard({ label, value, suffix, icon: Icon, tone, onClick }) {
  const colors = {
    teal: { bg: C.tealMist, border: C.tealBorder, icon: C.teal, val: C.teal },
    amber: { bg: C.amberSoft, border: "#9C6F1E30", icon: C.amber, val: C.amber },
    green: { bg: C.greenSoft, border: "#2D7A4F30", icon: C.green, val: C.green },
    default: { bg: C.panel, border: C.hairline, icon: C.muted, val: C.ink },
  };
  const t = colors[tone] || colors.default;
  return (
    <button
      onClick={onClick}
      className="rounded-xl p-4 text-left w-full transition-all hover:shadow-sm"
      style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>{label}</div>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: t.bg, border: "1px solid " + t.border }}>
          <Icon className="w-3.5 h-3.5" style={{ color: t.icon }} strokeWidth={2} />
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[26px] font-semibold tabular-nums" style={{ color: t.val, fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>{value}</span>
        {suffix && <span className="text-[12px]" style={{ color: C.faint }}>{suffix}</span>}
      </div>
    </button>
  );
}

function AttentionItem({ icon: Icon, label, desc, count, tone, onClick }) {
  const toneColor = tone === "rose" ? C.rose : tone === "amber" ? C.amber : C.teal;
  const toneBg = tone === "rose" ? C.roseSoft : tone === "amber" ? C.amberSoft : C.tealMist;
  return (
    <button
      onClick={onClick}
      className="w-full px-5 py-4 flex items-center gap-4 text-left transition-colors hover:opacity-80"
      style={{ borderBottom: "1px solid " + C.hairlineSoft }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: toneBg }}>
        <Icon className="w-4 h-4" style={{ color: toneColor }} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{label}</div>
        <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{desc}</div>
      </div>
      <div className="text-[20px] font-semibold tabular-nums flex-shrink-0" style={{ color: count > 0 ? toneColor : C.faint, fontFamily: "var(--font-display)" }}>
        {count}
      </div>
    </button>
  );
}

function CampaignRow({ campaign, navigate }) {
  const statusColors = {
    research: { bg: C.amberSoft, color: C.amber },
    briefing: { bg: C.tealMist, color: C.teal },
    production: { bg: C.tealMist, color: C.tealMid },
    review: { bg: C.amberSoft, color: C.amber },
    complete: { bg: C.greenSoft, color: C.green },
    paused: { bg: C.panel, color: C.muted },
  };
  const sc = statusColors[campaign.status] || statusColors.paused;
  return (
    <button
      onClick={() => navigate("campaign-detail", { campaignId: campaign.id })}
      className="w-full px-5 py-4 flex items-center gap-4 text-left transition-colors hover:opacity-80"
      style={{ borderBottom: "1px solid " + C.hairlineSoft }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
        style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}
      >
        {campaign.clientName.split(" ").map(w => w[0]).join("").slice(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold truncate" style={{ color: C.ink }}>{campaign.clientName} — {campaign.title}</div>
        <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{campaign.creatorIds.length} creator{campaign.creatorIds.length !== 1 ? "s" : ""} · {campaign.totalVideos} video{campaign.totalVideos !== 1 ? "s" : ""} · due {campaign.deadline}</div>
      </div>
      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: sc.bg, color: sc.color }}>
        {campaign.statusLabel}
      </span>
    </button>
  );
}

export default function Overview({ navigate }) {
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateStr = `${days[today.getDay()]} · ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  const activeClients = CLIENTS.filter(c => c.status === "active").length;
  const activeCreators = CREATORS.filter(c => c.status === "active").length;
  const activeCampaigns = CAMPAIGNS.filter(c => c.status === "production" || c.status === "research" || c.status === "briefing").length;
  const pendingPayments = PAYMENTS_TO_CREATORS.filter(p => p.status === "pending").length;

  const totalPendingAmount = PAYMENTS_TO_CREATORS.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const totalRevenue = PAYMENTS_FROM_CLIENTS.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);

  const pendingApprovals = CLIENTS.reduce((s, c) => s + c.pendingApprovals, 0);
  const creatorsAvailable = CREATORS.filter(c => c.status === "active" && c.capacity.current < c.capacity.max).length;

  const activeCampaignList = CAMPAIGNS.filter(c => c.status !== "complete" && c.status !== "paused").sort((a, b) => a.deadline.localeCompare(b.deadline));

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.teal, letterSpacing: "0.14em" }}>
          {dateStr}
        </div>
        <h1 className="text-[28px] font-semibold leading-tight mb-1" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
          Good morning.
        </h1>
        <p className="text-[14px] leading-relaxed" style={{ color: C.muted }}>
          {activeCampaigns} active campaign{activeCampaigns !== 1 ? "s" : ""} across {activeClients} clients, {activeCreators} creators in the network.
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard label="Active Clients" value={activeClients} suffix="clients" icon={Briefcase} tone="teal" onClick={() => navigate("clients")} />
        <StatCard label="Active Creators" value={activeCreators} suffix="in network" icon={UserCheck} tone="teal" onClick={() => navigate("creators")} />
        <StatCard label="Live Campaigns" value={activeCampaigns} suffix="in progress" icon={Film} tone="teal" onClick={() => navigate("campaigns")} />
        <StatCard label="Pending Payouts" value={"$" + totalPendingAmount.toLocaleString()} icon={Clock} tone="amber" onClick={() => navigate("payments")} />
      </div>

      {/* Revenue summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl p-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Total Revenue</div>
          <div className="text-[20px] font-semibold" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>${totalRevenue.toLocaleString()}</div>
          <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>from {PAYMENTS_FROM_CLIENTS.filter(p => p.status === "paid").length} invoices paid</div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Creators Available</div>
          <div className="text-[20px] font-semibold" style={{ color: C.green, fontFamily: "var(--font-display)" }}>{creatorsAvailable}</div>
          <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>have open capacity now</div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>Client Approvals</div>
          <div className="text-[20px] font-semibold" style={{ color: pendingApprovals > 0 ? C.amber : C.green, fontFamily: "var(--font-display)" }}>{pendingApprovals}</div>
          <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>awaiting client sign-off</div>
        </div>
      </div>

      {/* Needs attention */}
      <div className="mb-3">
        <h2 className="text-[15px] font-semibold tracking-tight" style={{ color: C.ink }}>Needs Attention</h2>
      </div>
      <div className="rounded-xl overflow-hidden mb-8" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <AttentionItem icon={AlertCircle} label="Pending client approvals" desc="Briefs or content awaiting client sign-off" count={pendingApprovals} tone="amber" onClick={() => navigate("briefs")} />
        <AttentionItem icon={Clock} label="Creator payouts pending" desc="Approved videos awaiting payment" count={pendingPayments} tone="rose" onClick={() => navigate("payments")} />
        <AttentionItem icon={Film} label="Productions in revision" desc="Creator submissions with feedback sent" count={CAMPAIGNS.filter(c => c.productionStatus === "revision-requested").length} tone="amber" onClick={() => navigate("production")} />
        <AttentionItem icon={Users} label="Campaigns without creators" desc="Campaigns ready to assign a creator" count={CAMPAIGNS.filter(c => (c.status === "research" || c.status === "briefing") && c.creatorIds.length === 0).length} tone="teal" onClick={() => navigate("creators")} />
        <div className="px-5 py-4 flex items-center gap-4" style={{ borderBottom: "none" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: C.greenSoft }}>
            <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold" style={{ color: C.ink }}>Completed this month</div>
            <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>Videos approved and delivered</div>
          </div>
          <div className="text-[20px] font-semibold tabular-nums" style={{ color: C.green, fontFamily: "var(--font-display)" }}>
            {CAMPAIGNS.filter(c => c.videosApproved > 0).reduce((s, c) => s + c.videosApproved, 0)}
          </div>
        </div>
      </div>

      {/* Active campaigns */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold tracking-tight" style={{ color: C.ink }}>Active Campaigns</h2>
        <button onClick={() => navigate("campaigns")} className="text-[12px] font-semibold flex items-center gap-1" style={{ color: C.teal }}>
          View all <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        {activeCampaignList.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-[14px] font-semibold mb-1" style={{ color: C.ink }}>No active campaigns</div>
            <div className="text-[13px]" style={{ color: C.muted }}>All caught up.</div>
          </div>
        ) : (
          activeCampaignList.map((c, i) => (
            <CampaignRow key={c.id} campaign={c} navigate={navigate} />
          ))
        )}
      </div>
    </div>
  );
}
