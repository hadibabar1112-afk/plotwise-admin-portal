import { useState } from "react";
import { Bell, Search, ChevronDown, Settings, LogOut } from "lucide-react";
import { C } from "../constants/colors";

const RECENT_NOTIFICATIONS = [
  { id: 1, type: "action", text: "Maya Chen submitted revision for Aurelia · Dehydration Reframe.", time: "2h ago", unread: true },
  { id: 2, type: "action", text: "Sofia Rodriguez accepted Salt & Sea offer.", time: "5h ago", unread: true },
  { id: 3, type: "payment", text: "Glow Labs onboarding payment received — $0 (free trial).", time: "1d ago", unread: true },
  { id: 4, type: "brief", text: "Aurelia Skincare approved the SPF Daily brief.", time: "2d ago", unread: false },
  { id: 5, type: "system", text: "Ella Kim's Aurelia · Timeline Honesty payment processed.", time: "3d ago", unread: false },
];

export default function TopBar({ section, onSearch, navigate }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const unread = RECENT_NOTIFICATIONS.filter(n => n.unread).length;

  const SECTION_LABELS = {
    overview: "Overview",
    clients: "Clients",
    "client-detail": "Client Detail",
    creators: "Creators",
    "creator-detail": "Creator Detail",
    campaigns: "Campaigns",
    "campaign-detail": "Campaign Detail",
    research: "Research",
    briefs: "Briefs",
    production: "Production",
    payments: "Payments",
    messages: "Messages",
    settings: "Settings",
  };

  return (
    <header
      className="h-14 flex items-center justify-between px-8 flex-shrink-0"
      style={{
        backgroundColor: "rgba(255,255,255,0.92)",
        borderBottom: "1px solid " + C.hairline,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left — breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold" style={{ color: C.ink }}>
          {SECTION_LABELS[section] || "Admin"}
        </span>
      </div>

      {/* Right — search + notifs + avatar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: C.faint }} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search clients, creators…"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="pl-8 pr-3 h-8 rounded-xl text-[12px] outline-none"
            style={{
              width: 220,
              border: "1.5px solid " + C.hairline,
              backgroundColor: C.bg,
              color: C.ink,
              fontFamily: "var(--font-sans)",
            }}
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          {notifOpen && <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />}
          <button
            onClick={() => setNotifOpen(o => !o)}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
            style={{ color: C.muted, backgroundColor: notifOpen ? C.panel : "transparent" }}
          >
            <Bell className="w-4.5 h-4.5" strokeWidth={1.8} style={{ width: 18, height: 18 }} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: C.rose }} />
            )}
          </button>
          {notifOpen && (
            <div
              className="absolute right-0 top-11 w-[340px] rounded-xl shadow-xl overflow-hidden"
              style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, zIndex: 50 }}
            >
              <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm }}>
                <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.teal, letterSpacing: "0.12em" }}>Notifications</span>
                {unread > 0 && <span className="text-[11px] font-semibold" style={{ color: C.teal }}>{unread} new</span>}
              </div>
              <div style={{ maxHeight: 300, overflowY: "auto" }}>
                {RECENT_NOTIFICATIONS.map((n, i) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 flex items-start gap-3"
                    style={{ borderBottom: i < RECENT_NOTIFICATIONS.length - 1 ? "1px solid " + C.hairlineSoft : "none", backgroundColor: n.unread ? C.tealMist : "transparent" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: n.unread ? C.teal : C.hairline }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] leading-snug" style={{ color: C.ink }}>{n.text}</div>
                      <div className="text-[11px] mt-0.5" style={{ color: C.faint }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-px" style={{ backgroundColor: C.hairline }} />

        {/* Avatar menu */}
        <div className="relative">
          {avatarOpen && <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />}
          <button
            onClick={() => setAvatarOpen(o => !o)}
            className="flex items-center gap-1.5 rounded-lg px-1 py-1 transition-colors hover:opacity-80"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}
            >
              PW
            </div>
            <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} style={{ color: C.faint, transform: avatarOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }} />
          </button>
          {avatarOpen && (
            <div
              className="absolute right-0 top-11 w-[200px] rounded-xl overflow-hidden"
              style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, zIndex: 50, boxShadow: "0 8px 24px -6px rgba(0,0,0,0.12)" }}
            >
              <div className="px-4 py-3" style={{ background: "linear-gradient(135deg, " + C.tealDeep + " 0%, " + C.teal + " 100%)" }}>
                <div className="text-[13px] font-semibold text-white">Plotwise Admin</div>
                <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>admin@plotwise.co</div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setAvatarOpen(false); navigate("settings"); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-left transition-colors hover:bg-[#f3f5f5]"
                  style={{ color: C.ink }}
                >
                  <Settings className="w-4 h-4" style={{ color: C.muted }} strokeWidth={1.8} />
                  Settings
                </button>
                <div className="mx-4 my-1" style={{ height: 1, backgroundColor: C.hairlineSoft }} />
                <button
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-left transition-colors hover:bg-[#fff0f0]"
                  style={{ color: C.rose }}
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.8} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
