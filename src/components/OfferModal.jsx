import { useState } from "react";
import { X, Send } from "lucide-react";
import { C } from "../constants/colors";

export default function OfferModal({ campaign, creator, onSend, onClose }) {
  const [message, setMessage] = useState(
    `Hi ${creator.name.split(" ")[0]}! We'd love to have you on the "${campaign.title}" campaign for ${campaign.clientName}. Let me know if you're interested!`
  );
  const [price, setPrice] = useState(String(creator.rate || ""));

  function handleSend() {
    if (!message.trim() || !price) return;
    onSend(message.trim(), Number(price));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid " + C.hairline, background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
        >
          <div>
            <h2 className="text-[16px] font-semibold text-white">Offer Campaign</h2>
            <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
              {campaign.title} · {campaign.clientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.12)" }}
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Creator strip */}
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: C.bgWarm, border: "1px solid " + C.hairlineSoft }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
            >
              {creator.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{creator.name}</div>
              <div className="text-[12px]" style={{ color: C.muted }}>{creator.email} · {creator.city}</div>
            </div>
            <div
              className="text-[12px] font-semibold px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}
            >
              Default ${creator.rate}/video
            </div>
          </div>

          {/* Price per video */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>
              Offer Price per Video
            </label>
            <div className="relative">
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-semibold pointer-events-none"
                style={{ color: C.muted }}
              >
                $
              </span>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl text-[13px] font-semibold outline-none"
                style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
                placeholder={String(creator.rate)}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.faint, letterSpacing: "0.1em" }}>
              Message to Creator
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 rounded-xl text-[13px] leading-relaxed outline-none resize-none"
              style={{ backgroundColor: C.bg, border: "1px solid " + C.hairline, color: C.ink }}
              placeholder="Write your offer message to the creator..."
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-2 px-6 pb-5 pt-1"
          style={{ borderTop: "1px solid " + C.hairlineSoft }}
        >
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-xl text-[13px] font-semibold"
            style={{ backgroundColor: C.panel, color: C.muted }}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim() || !price}
            className="h-9 px-5 rounded-xl text-[13px] font-semibold text-white flex items-center gap-2 disabled:opacity-40"
            style={{ backgroundColor: C.tealDeep }}
          >
            <Send className="w-3.5 h-3.5" strokeWidth={2} />
            Send Offer
          </button>
        </div>
      </div>
    </div>
  );
}
