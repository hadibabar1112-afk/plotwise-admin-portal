import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { C } from "../constants/colors";

export default function MessageModal({ creator, messages, onSend, onClose }) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden"
        style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, maxHeight: "78vh" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid " + C.hairline }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
            >
              {creator.initials}
            </div>
            <div>
              <div className="text-[14px] font-semibold" style={{ color: C.ink }}>{creator.name}</div>
              <div className="text-[12px]" style={{ color: C.muted }}>{creator.email}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ color: C.faint, backgroundColor: C.panel }}
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        {/* Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ backgroundColor: C.bgWarm }}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: C.panel }}
              >
                <Send className="w-4 h-4" style={{ color: C.faint }} strokeWidth={2} />
              </div>
              <p className="text-[13px] font-semibold mb-1" style={{ color: C.ink }}>No messages yet</p>
              <p className="text-[12px]" style={{ color: C.faint }}>Start the conversation with {creator.name.split(" ")[0]}.</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[82%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed"
                  style={{
                    backgroundColor: msg.sender === "admin" ? C.tealDeep : C.surface,
                    color: msg.sender === "admin" ? "#fff" : C.ink,
                    border: msg.sender === "admin" ? "none" : "1px solid " + C.hairline,
                    borderBottomRightRadius: msg.sender === "admin" ? 4 : 16,
                    borderBottomLeftRadius: msg.sender === "creator" ? 4 : 16,
                  }}
                >
                  {msg.isOffer && (
                    <div
                      className="text-[10px] font-bold uppercase tracking-widest mb-1.5 px-2 py-0.5 rounded-md w-fit"
                      style={{ letterSpacing: "0.08em", backgroundColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)" }}
                    >
                      Campaign Offer
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className="text-[10px] mt-1" style={{ opacity: 0.55 }}>{msg.time}</div>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ borderTop: "1px solid " + C.hairline }}
        >
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            className="flex-1 h-9 px-4 rounded-xl text-[13px] outline-none"
            style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
            placeholder={`Message ${creator.name.split(" ")[0]}…`}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40"
            style={{ backgroundColor: C.tealDeep, color: "#fff" }}
          >
            <Send className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
