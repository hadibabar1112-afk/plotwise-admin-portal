import { useState } from "react";
import { Save, Shield, Bell, CreditCard, Users, Globe } from "lucide-react";
import { C } from "../constants/colors";

function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4" style={{ borderBottom: "1px solid " + C.hairlineSoft }}>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{label}</div>
        {desc && <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>{desc}</div>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="w-10 h-6 rounded-full relative transition-colors"
      style={{ backgroundColor: on ? C.teal : C.panel }}
    >
      <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all" style={{ left: on ? "calc(100% - 20px)" : 4 }} />
    </button>
  );
}

const SECTIONS = [
  { id: "general",        label: "General",        icon: Globe },
  { id: "notifications",  label: "Notifications",  icon: Bell },
  { id: "team",           label: "Team",           icon: Users },
  { id: "billing",        label: "Billing",        icon: CreditCard },
  { id: "security",       label: "Security",       icon: Shield },
];

export default function Settings() {
  const [section, setSection] = useState("general");
  const [notifs, setNotifs] = useState({ newClient: true, newCreator: true, campaignUpdate: true, payment: true, message: true, revision: true });

  return (
    <div className="pb-10">
      <div className="mb-6">
        <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>Settings</h1>
        <p className="text-[13px] mt-1" style={{ color: C.muted }}>Manage admin portal preferences.</p>
      </div>

      <div className="flex gap-5">
        {/* Left nav */}
        <div className="w-48 flex-shrink-0">
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
            {SECTIONS.map((sec, i) => {
              const on = section === sec.id;
              const Icon = sec.icon;
              return (
                <button key={sec.id} onClick={() => setSection(sec.id)}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-left transition-colors"
                  style={{
                    backgroundColor: on ? C.tealTint : "transparent",
                    borderLeft: on ? "2px solid " + C.teal : "2px solid transparent",
                    borderBottom: i < SECTIONS.length - 1 ? "1px solid " + C.hairlineSoft : "none",
                  }}>
                  <Icon className="w-4 h-4" strokeWidth={on ? 2.2 : 1.8} style={{ color: on ? C.teal : C.muted }} />
                  <span className="text-[13px]" style={{ fontWeight: on ? 600 : 500, color: on ? C.teal : C.text }}>{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {section === "general" && (
            <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="text-[13px] font-bold uppercase tracking-widest mb-4" style={{ color: C.faint, letterSpacing: "0.1em" }}>General Settings</div>
              <SettingRow label="Company name" desc="Shown in admin portal and client-facing communications.">
                <input defaultValue="Plotwise" className="h-8 px-3 rounded-xl text-[13px] outline-none w-48"
                  style={{ border: "1.5px solid " + C.hairline, backgroundColor: C.bg, color: C.ink, fontFamily: "var(--font-sans)" }} />
              </SettingRow>
              <SettingRow label="Admin email" desc="Used for system notifications and logins.">
                <input defaultValue="admin@plotwise.co" className="h-8 px-3 rounded-xl text-[13px] outline-none w-48"
                  style={{ border: "1.5px solid " + C.hairline, backgroundColor: C.bg, color: C.ink, fontFamily: "var(--font-sans)" }} />
              </SettingRow>
              <SettingRow label="Default creator payment terms" desc="Days after video approval before payment is sent.">
                <select defaultValue="7" className="h-8 px-3 rounded-xl text-[13px] outline-none"
                  style={{ border: "1.5px solid " + C.hairline, backgroundColor: C.bg, color: C.ink, fontFamily: "var(--font-sans)" }}>
                  <option value="3">3 days</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </SettingRow>
              <SettingRow label="Default brief review window" desc="Days client has to approve or request changes.">
                <select defaultValue="3" className="h-8 px-3 rounded-xl text-[13px] outline-none"
                  style={{ border: "1.5px solid " + C.hairline, backgroundColor: C.bg, color: C.ink, fontFamily: "var(--font-sans)" }}>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="5">5 days</option>
                  <option value="7">7 days</option>
                </select>
              </SettingRow>
              <div className="pt-3">
                <button className="h-9 px-4 rounded-xl text-[13px] font-semibold text-white flex items-center gap-2" style={{ backgroundColor: C.tealDeep }}>
                  <Save className="w-3.5 h-3.5" strokeWidth={2} /> Save changes
                </button>
              </div>
            </div>
          )}

          {section === "notifications" && (
            <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="text-[13px] font-bold uppercase tracking-widest mb-4" style={{ color: C.faint, letterSpacing: "0.1em" }}>Notification Preferences</div>
              {[
                { key: "newClient", label: "New client onboarded", desc: "When a new client is added to the platform." },
                { key: "newCreator", label: "New creator registered", desc: "When a creator joins the platform." },
                { key: "campaignUpdate", label: "Campaign status changes", desc: "Transitions between research, brief, production stages." },
                { key: "payment", label: "Payment events", desc: "Payouts processed and invoices received." },
                { key: "message", label: "New messages", desc: "Messages from clients or creators." },
                { key: "revision", label: "Revision requests", desc: "When admin requests revision from creator." },
              ].map(n => (
                <SettingRow key={n.key} label={n.label} desc={n.desc}>
                  <Toggle on={notifs[n.key]} onChange={v => setNotifs(p => ({ ...p, [n.key]: v }))} />
                </SettingRow>
              ))}
            </div>
          )}

          {section === "team" && (
            <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="text-[13px] font-bold uppercase tracking-widest mb-4" style={{ color: C.faint, letterSpacing: "0.1em" }}>Team Members</div>
              {[
                { name: "Plotwise Admin", email: "admin@plotwise.co", role: "Owner", initials: "PW" },
                { name: "Sarah K.", email: "sarah@plotwise.co", role: "Campaign Manager", initials: "SK" },
                { name: "James L.", email: "james@plotwise.co", role: "Creator Liaison", initials: "JL" },
              ].map(member => (
                <div key={member.email} className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid " + C.hairlineSoft }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}>
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{member.name}</div>
                    <div className="text-[12px]" style={{ color: C.muted }}>{member.email}</div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.muted }}>{member.role}</span>
                </div>
              ))}
              <div className="pt-3">
                <button className="h-8 px-3 rounded-xl text-[12px] font-semibold flex items-center gap-2"
                  style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>
                  <Users className="w-3.5 h-3.5" strokeWidth={2} /> Invite team member
                </button>
              </div>
            </div>
          )}

          {section === "billing" && (
            <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="text-[13px] font-bold uppercase tracking-widest mb-4" style={{ color: C.faint, letterSpacing: "0.1em" }}>Billing</div>
              <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline }}>
                <div className="text-[12px] font-semibold mb-1" style={{ color: C.muted }}>Current Plan</div>
                <div className="text-[18px] font-semibold" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>Plotwise Business</div>
                <div className="text-[12px] mt-0.5" style={{ color: C.muted }}>Unlimited clients · Unlimited campaigns · Full access</div>
              </div>
              <SettingRow label="Billing email" desc="Where invoices and receipts are sent.">
                <input defaultValue="billing@plotwise.co" className="h-8 px-3 rounded-xl text-[13px] outline-none w-48"
                  style={{ border: "1.5px solid " + C.hairline, backgroundColor: C.bg, color: C.ink, fontFamily: "var(--font-sans)" }} />
              </SettingRow>
            </div>
          )}

          {section === "security" && (
            <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
              <div className="text-[13px] font-bold uppercase tracking-widest mb-4" style={{ color: C.faint, letterSpacing: "0.1em" }}>Security</div>
              <SettingRow label="Two-factor authentication" desc="Require 2FA for all admin logins.">
                <Toggle on={true} onChange={() => {}} />
              </SettingRow>
              <SettingRow label="Session timeout" desc="Automatically log out after inactivity.">
                <select defaultValue="60" className="h-8 px-3 rounded-xl text-[13px] outline-none"
                  style={{ border: "1.5px solid " + C.hairline, backgroundColor: C.bg, color: C.ink, fontFamily: "var(--font-sans)" }}>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="480">8 hours</option>
                  <option value="0">Never</option>
                </select>
              </SettingRow>
              <SettingRow label="Audit log" desc="Full log of admin actions and data changes.">
                <button className="h-8 px-3 rounded-xl text-[12px] font-semibold" style={{ backgroundColor: C.panel, color: C.muted, border: "1px solid " + C.hairline }}>View log</button>
              </SettingRow>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
