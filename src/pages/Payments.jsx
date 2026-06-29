import { useState } from "react";
import { CreditCard, ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { C } from "../constants/colors";
import { PAYMENTS_TO_CREATORS, PAYMENTS_FROM_CLIENTS } from "../data/payments";

const PAY_STATUS = {
  paid:       { bg: C.greenSoft, color: C.green,  label: "Paid" },
  processing: { bg: C.tealMist,  color: C.teal,   label: "Processing" },
  pending:    { bg: C.amberSoft, color: C.amber,   label: "Pending" },
  awaiting:   { bg: C.amberSoft, color: C.amber,   label: "Awaiting" },
  partial:    { bg: C.panel,     color: C.muted,   label: "Partial" },
};

export default function Payments({ navigate }) {
  const [tab, setTab] = useState("creators");

  const totalPaidOut = PAYMENTS_TO_CREATORS.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = PAYMENTS_TO_CREATORS.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const totalReceived = PAYMENTS_FROM_CLIENTS.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalAwaiting = PAYMENTS_FROM_CLIENTS.filter(p => p.status === "awaiting").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>Payments</h1>
        <p className="text-[13px] mt-1" style={{ color: C.muted }}>Manage creator payouts and client invoices.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Received from clients", value: "$" + totalReceived.toLocaleString(), sub: "all time", color: C.green, icon: ArrowDownLeft },
          { label: "Awaiting from clients", value: "$" + totalAwaiting.toLocaleString(), sub: "outstanding", color: C.amber, icon: Clock },
          { label: "Paid to creators", value: "$" + totalPaidOut.toLocaleString(), sub: "all time", color: C.ink, icon: ArrowUpRight },
          { label: "Pending to creators", value: "$" + totalPending.toLocaleString(), sub: "on approval", color: C.amber, icon: Clock },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.panel }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: C.muted }} strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.1em" }}>{s.label}</span>
              </div>
              <div className="text-[20px] font-semibold" style={{ color: s.color, fontFamily: "var(--font-display)" }}>{s.value}</div>
              <div className="text-[11px] mt-0.5" style={{ color: C.faint }}>{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 mb-5" style={{ borderBottom: "1px solid " + C.hairline }}>
        {[
          { key: "creators", label: "Creator Payouts" },
          { key: "clients", label: "Client Invoices" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className="px-4 py-2.5 text-[12px] font-semibold"
            style={{ color: tab === t.key ? C.teal : C.muted, borderBottom: tab === t.key ? "2px solid " + C.teal : "2px solid transparent", marginBottom: -1 }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Creator payouts */}
      {tab === "creators" && (
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="grid px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest" style={{ gridTemplateColumns: "1fr 160px 100px 120px 140px", borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm, color: C.faint, letterSpacing: "0.1em" }}>
            <div>Creator · Campaign</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Expected</div>
            <div>Reference</div>
          </div>
          {PAYMENTS_TO_CREATORS.map((p, i) => {
            const ps = PAY_STATUS[p.status] || PAY_STATUS.pending;
            return (
              <div key={p.id} className="grid px-5 py-3.5 items-center" style={{ gridTemplateColumns: "1fr 160px 100px 120px 140px", borderBottom: i < PAYMENTS_TO_CREATORS.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{p.creatorName}</div>
                  <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{p.campaign}</div>
                </div>
                <div className="text-[14px] font-semibold" style={{ color: C.ink }}>${p.amount}</div>
                <div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: ps.bg, color: ps.color }}>{ps.label}</span>
                </div>
                <div className="text-[12px]" style={{ color: C.muted }}>{p.paidDate || p.expectedDate || "—"}</div>
                <div className="text-[12px] font-mono" style={{ color: C.faint }}>{p.reference || "—"}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Client invoices */}
      {tab === "clients" && (
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="grid px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest" style={{ gridTemplateColumns: "1fr 160px 100px 120px 140px", borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm, color: C.faint, letterSpacing: "0.1em" }}>
            <div>Client · Campaign</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Date</div>
            <div>Invoice #</div>
          </div>
          {PAYMENTS_FROM_CLIENTS.map((p, i) => {
            const ps = PAY_STATUS[p.status] || PAY_STATUS.pending;
            return (
              <div key={p.id} className="grid px-5 py-3.5 items-center" style={{ gridTemplateColumns: "1fr 160px 100px 120px 140px", borderBottom: i < PAYMENTS_FROM_CLIENTS.length - 1 ? "1px solid " + C.hairlineSoft : "none" }}>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{p.clientName}</div>
                  <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{p.campaign}</div>
                </div>
                <div className="text-[14px] font-semibold" style={{ color: C.ink }}>${p.amount.toLocaleString()}</div>
                <div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: ps.bg, color: ps.color }}>{ps.label}</span>
                </div>
                <div className="text-[12px]" style={{ color: C.muted }}>{p.paidDate || "—"}</div>
                <div className="text-[12px] font-mono" style={{ color: C.faint }}>{p.reference || "—"}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
