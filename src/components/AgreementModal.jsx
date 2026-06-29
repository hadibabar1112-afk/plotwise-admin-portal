import { useState, useRef } from "react";
import { X, Upload, FileText, CheckCircle, Send } from "lucide-react";
import { C } from "../constants/colors";

export default function AgreementModal({ creator, onConfirm, onClose }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  function handleFile(f) {
    if (f) setFile(f);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(19,24,24,0.45)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative rounded-2xl shadow-2xl w-full"
        style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline, maxWidth: 480, margin: "0 24px" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.tealMist, border: "1px solid " + C.tealBorder }}>
              <FileText className="w-4.5 h-4.5" style={{ color: C.teal }} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>
                Send Master Agreement
              </h2>
              <p className="text-[12px] mt-0.5" style={{ color: C.muted }}>
                Upload the agreement to send to <strong style={{ color: C.ink }}>{creator.name}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-70"
            style={{ backgroundColor: C.panel, border: "1px solid " + C.hairline }}
          >
            <X className="w-3.5 h-3.5" style={{ color: C.muted }} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          {/* Creator info strip */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl mb-5" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairlineSoft }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, " + C.inkSoft + ", " + C.muted + ")" }}
            >
              {creator.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold truncate" style={{ color: C.ink }}>{creator.name}</div>
              <div className="text-[11px] truncate" style={{ color: C.faint }}>{creator.email}</div>
            </div>
            <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.tealMist, color: C.teal }}>
              Will be emailed
            </span>
          </div>

          {/* Upload zone */}
          {!file ? (
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className="rounded-xl flex flex-col items-center justify-center py-8 px-4 cursor-pointer transition-all"
              style={{
                border: "2px dashed " + (dragging ? C.teal : C.hairline),
                backgroundColor: dragging ? C.tealMist : C.bg,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: dragging ? C.tealBorder : C.panel }}
              >
                <Upload className="w-5 h-5" style={{ color: dragging ? C.teal : C.faint }} strokeWidth={1.8} />
              </div>
              <div className="text-[13px] font-semibold mb-1" style={{ color: C.ink }}>
                {dragging ? "Drop to upload" : "Click or drag a file here"}
              </div>
              <div className="text-[11px]" style={{ color: C.faint }}>PDF, DOCX, or DOC · Max 10 MB</div>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={e => handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ backgroundColor: C.greenSoft, border: "1px solid " + C.green + "40" }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fff" }}>
                <FileText className="w-4.5 h-4.5" style={{ color: C.teal }} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold truncate" style={{ color: C.ink }}>{file.name}</div>
                <div className="text-[11px] mt-0.5" style={{ color: C.muted }}>{formatSize(file.size)}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <CheckCircle className="w-4 h-4" style={{ color: C.green }} strokeWidth={2} />
                <button
                  onClick={() => setFile(null)}
                  className="text-[11px] font-semibold underline"
                  style={{ color: C.muted }}
                >
                  Change
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-5">
            <button
              onClick={onClose}
              className="h-9 px-4 rounded-xl text-[13px] font-semibold transition-all hover:opacity-80"
              style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}
            >
              Cancel
            </button>
            <button
              onClick={() => file && onConfirm(file)}
              disabled={!file}
              className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold transition-all"
              style={{
                backgroundColor: file ? C.green : C.panel,
                color: file ? "#fff" : C.faint,
                cursor: file ? "pointer" : "not-allowed",
              }}
            >
              <Send className="w-3.5 h-3.5" strokeWidth={2} />
              Send &amp; Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
