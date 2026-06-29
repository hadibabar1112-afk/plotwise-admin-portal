import { useState } from "react";
import { Send, User, Briefcase } from "lucide-react";
import { C } from "../constants/colors";
import { MESSAGES } from "../data/messages";

export default function Messages({ navigate }) {
  const [selectedId, setSelectedId] = useState(MESSAGES[0]?.id);
  const [draft, setDraft] = useState("");
  const [threads, setThreads] = useState(MESSAGES);

  const selected = threads.find(m => m.id === selectedId);
  const unreadTotal = threads.reduce((s, m) => s + m.unread, 0);

  function sendMessage() {
    if (!draft.trim()) return;
    setThreads(prev => prev.map(m => {
      if (m.id !== selectedId) return m;
      return {
        ...m,
        lastMessage: draft,
        lastTime: "just now",
        thread: [...m.thread, { from: "admin", text: draft, time: "just now" }],
      };
    }));
    setDraft("");
  }

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[26px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>Messages</h1>
        <p className="text-[13px] mt-1" style={{ color: C.muted }}>Communicate with clients and creators. {unreadTotal > 0 && <span style={{ color: C.teal }}>{unreadTotal} unread.</span>}</p>
      </div>

      <div className="flex gap-4" style={{ height: "calc(100vh - 200px)", minHeight: 500 }}>
        {/* Thread list */}
        <div className="w-72 flex-shrink-0 rounded-xl overflow-hidden flex flex-col" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          <div className="px-4 py-3" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm }}>
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.12em" }}>Conversations</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map((m, i) => {
              const isSelected = m.id === selectedId;
              return (
                <button
                  key={m.id}
                  onClick={() => { setSelectedId(m.id); setThreads(prev => prev.map(t => t.id === m.id ? { ...t, unread: 0 } : t)); }}
                  className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors"
                  style={{
                    backgroundColor: isSelected ? C.tealTint : "transparent",
                    borderLeft: isSelected ? "2px solid " + C.teal : "2px solid transparent",
                    borderBottom: i < threads.length - 1 ? "1px solid " + C.hairlineSoft : "none",
                  }}
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                    style={{ background: m.type === "client" ? "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" : "linear-gradient(135deg, #5A6B6B, #3A4545)" }}>
                    {m.participantName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="text-[12px] font-semibold truncate" style={{ color: isSelected ? C.teal : C.ink }}>{m.participantName}</div>
                      <div className="text-[10px] flex-shrink-0" style={{ color: C.faint }}>{m.lastTime}</div>
                    </div>
                    <div className="text-[11px] mt-0.5 flex items-center gap-1">
                      {m.type === "client" ? (
                        <Briefcase className="w-3 h-3 flex-shrink-0" style={{ color: C.faint }} strokeWidth={1.8} />
                      ) : (
                        <User className="w-3 h-3 flex-shrink-0" style={{ color: C.faint }} strokeWidth={1.8} />
                      )}
                      <span className="truncate" style={{ color: C.faint }}>{m.context}</span>
                    </div>
                    <div className="text-[11px] mt-0.5 truncate" style={{ color: C.muted }}>{m.lastMessage}</div>
                  </div>
                  {m.unread > 0 && (
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ backgroundColor: C.teal }}>
                      {m.unread}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Thread view */}
        <div className="flex-1 flex flex-col rounded-xl overflow-hidden" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
          {selected ? (
            <>
              {/* Thread header */}
              <div className="px-5 py-3.5 flex items-center gap-3" style={{ borderBottom: "1px solid " + C.hairlineSoft, backgroundColor: C.bgWarm }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                  style={{ background: selected.type === "client" ? "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" : "linear-gradient(135deg, #5A6B6B, #3A4545)" }}>
                  {selected.participantName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{selected.participantName}</div>
                  <div className="text-[11px] flex items-center gap-1" style={{ color: C.faint }}>
                    <span className="capitalize">{selected.type}</span>
                    <span>·</span>
                    <span>{selected.context}</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {selected.thread.map((msg, i) => {
                  const isAdmin = msg.from === "admin";
                  return (
                    <div key={i} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                      <div
                        className="max-w-[75%] rounded-2xl px-4 py-3"
                        style={{
                          backgroundColor: isAdmin ? C.tealDeep : C.bg,
                          color: isAdmin ? "white" : C.ink,
                          borderBottomRightRadius: isAdmin ? 4 : undefined,
                          borderBottomLeftRadius: !isAdmin ? 4 : undefined,
                          border: isAdmin ? "none" : "1px solid " + C.hairline,
                        }}
                      >
                        <div className="text-[13px] leading-relaxed">{msg.text}</div>
                        <div className="text-[11px] mt-1 opacity-60">{msg.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Compose */}
              <div className="px-5 py-3.5" style={{ borderTop: "1px solid " + C.hairlineSoft }}>
                <div className="flex items-end gap-3">
                  <textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder={`Message ${selected.participantName}…`}
                    rows={2}
                    className="flex-1 px-4 py-2.5 rounded-xl text-[13px] leading-relaxed outline-none resize-none"
                    style={{ border: "1.5px solid " + C.hairline, backgroundColor: C.bg, color: C.ink, fontFamily: "var(--font-sans)" }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!draft.trim()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity"
                    style={{ backgroundColor: draft.trim() ? C.tealDeep : C.panel, opacity: draft.trim() ? 1 : 0.5 }}
                  >
                    <Send className="w-4 h-4 text-white" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-[13px]" style={{ color: C.muted }}>Select a conversation</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
