import { useState } from "react";
import {
  ArrowLeft, CheckCircle, XCircle, Clock, MapPin, Mail, Phone,
  Star, Video, Mic, Camera, Calendar, ExternalLink,
} from "lucide-react";
import { C } from "../constants/colors";
import { CREATOR_REQUESTS } from "../data/creatorRequests";
import AgreementModal from "../components/AgreementModal";

const STATUS_STYLES = {
  pending:  { bg: C.amberSoft, color: C.amber, label: "Pending Review", icon: Clock },
  approved: { bg: C.greenSoft, color: C.green, label: "Approved",       icon: CheckCircle },
  rejected: { bg: C.roseSoft,  color: C.rose,  label: "Rejected",       icon: XCircle },
};

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
      <div className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: C.faint, letterSpacing: "0.1em" }}>{title}</div>
      {children}
    </div>
  );
}

function Field({ label, value }) {
  if (!value) return null;
  return (
    <div className="mb-3">
      <div className="text-[11px] font-medium mb-0.5" style={{ color: C.faint }}>{label}</div>
      <div className="text-[13px]" style={{ color: C.ink }}>{value}</div>
    </div>
  );
}

function PlatformStats({ platform, data }) {
  if (!data.handle) return null;
  return (
    <div className="rounded-xl p-4 flex flex-col gap-1" style={{ backgroundColor: C.bg, border: "1px solid " + C.hairlineSoft }}>
      <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: C.faint, letterSpacing: "0.1em" }}>{platform}</div>
      <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{data.handle}</div>
      <div className="flex items-center gap-4 mt-1">
        <div>
          <div className="text-[10px]" style={{ color: C.faint }}>Followers</div>
          <div className="text-[14px] font-semibold" style={{ color: C.teal }}>{data.followers}</div>
        </div>
        <div>
          <div className="text-[10px]" style={{ color: C.faint }}>Engagement</div>
          <div className="text-[14px] font-semibold" style={{ color: C.teal }}>{data.engagement}</div>
        </div>
      </div>
    </div>
  );
}

export default function CreatorRequestDetail({ navigate, context }) {
  const requestId = context?.requestId;
  const initial = CREATOR_REQUESTS.find(r => r.id === requestId);
  const [req, setReq] = useState(initial);
  const [showAgreement, setShowAgreement] = useState(false);

  if (!req) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="text-[14px] font-semibold" style={{ color: C.ink }}>Request not found.</div>
        <button
          onClick={() => navigate("creator-requests")}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold"
          style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} /> Back to Requests
        </button>
      </div>
    );
  }

  const ss = STATUS_STYLES[req.status];
  const StatusIcon = ss.icon;
  const isPending = req.status === "pending";

  function approve() {
    setShowAgreement(true);
  }

  function confirmApprove() {
    setReq(prev => ({ ...prev, status: "approved" }));
    setShowAgreement(false);
  }

  function reject() {
    setReq(prev => ({ ...prev, status: "rejected" }));
  }

  return (
    <>
    <div className="pb-10">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("creator-requests")}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold transition-all hover:opacity-80"
          style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} /> Back
        </button>
        <div className="text-[12px]" style={{ color: C.faint }}>Creator Requests / <span style={{ color: C.ink }}>{req.name}</span></div>
      </div>

      {/* Hero */}
      <div className="rounded-2xl p-6 mb-5 flex items-start gap-5" style={{ backgroundColor: C.surface, border: "1px solid " + C.hairline }}>
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-[20px] font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, " + C.teal + ", " + C.tealMid + ")" }}
        >
          {req.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] font-semibold leading-tight" style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}>
                {req.name}
              </h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-[12px]" style={{ color: C.muted }}>
                  <MapPin className="w-3.5 h-3.5" strokeWidth={2} /> {req.city}
                </span>
                <span className="flex items-center gap-1 text-[12px]" style={{ color: C.muted }}>
                  <Mail className="w-3.5 h-3.5" strokeWidth={2} /> {req.email}
                </span>
                {req.phone && (
                  <span className="flex items-center gap-1 text-[12px]" style={{ color: C.muted }}>
                    <Phone className="w-3.5 h-3.5" strokeWidth={2} /> {req.phone}
                  </span>
                )}
                {req.pronouns && (
                  <span className="text-[12px]" style={{ color: C.muted }}>{req.pronouns}</span>
                )}
              </div>
            </div>
            {/* Status badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0" style={{ backgroundColor: ss.bg }}>
              <StatusIcon className="w-3.5 h-3.5" style={{ color: ss.color }} strokeWidth={2} />
              <span className="text-[12px] font-semibold" style={{ color: ss.color }}>{ss.label}</span>
            </div>
          </div>
          <div className="text-[11px] mt-2" style={{ color: C.faint }}>Submitted {req.submittedAt}</div>

          {/* Approve / Reject buttons */}
          {isPending && (
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={approve}
                className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: C.green, color: "#fff" }}
              >
                <CheckCircle className="w-4 h-4" strokeWidth={2} /> Approve Creator
              </button>
              <button
                onClick={reject}
                className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: C.roseSoft, color: C.rose, border: "1px solid " + C.rose + "40" }}
              >
                <XCircle className="w-4 h-4" strokeWidth={2} /> Reject
              </button>
            </div>
          )}

          {/* Re-action when already decided */}
          {!isPending && (
            <div className="flex items-center gap-2 mt-4">
              {req.status === "approved" ? (
                <button
                  onClick={reject}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[12px] font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: C.roseSoft, color: C.rose, border: "1px solid " + C.rose + "40" }}
                >
                  <XCircle className="w-3.5 h-3.5" strokeWidth={2} /> Revoke Approval
                </button>
              ) : (
                <button
                  onClick={approve}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[12px] font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: C.greenSoft, color: C.green, border: "1px solid " + C.green + "40" }}
                >
                  <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} /> Approve Instead
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left column (2/3) */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Bio */}
          <Section title="Bio">
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{req.bio}</p>
          </Section>

          {/* Social presence */}
          <Section title="Social Presence">
            <div className="grid grid-cols-3 gap-3">
              <PlatformStats platform="Instagram" data={req.instagram} />
              <PlatformStats platform="TikTok"    data={req.tiktok} />
              <PlatformStats platform="YouTube"   data={req.youtube} />
            </div>
          </Section>

          {/* Sample videos */}
          {req.sampleVideos?.length > 0 && (
            <Section title="Sample Work">
              <div className="flex flex-col gap-2">
                {req.sampleVideos.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: C.bg, border: "1px solid " + C.hairlineSoft }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: C.tealMist }}>
                        <Video className="w-4 h-4" style={{ color: C.teal }} strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium truncate" style={{ color: C.ink }}>{v.title}</div>
                        <div className="text-[11px] mt-0.5" style={{ color: C.faint }}>{v.platform} · {v.views} views</div>
                      </div>
                    </div>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 h-7 px-2.5 rounded-lg text-[11px] font-semibold flex-shrink-0 hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: C.panel, color: C.ink, border: "1px solid " + C.hairline }}
                    >
                      <ExternalLink className="w-3 h-3" strokeWidth={2} /> View
                    </a>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Right column (1/3) */}
        <div className="flex flex-col gap-4">
          {/* Niches & content */}
          <Section title="Content Focus">
            <div className="mb-3">
              <div className="text-[11px] font-medium mb-1.5" style={{ color: C.faint }}>Niches</div>
              <div className="flex flex-wrap gap-1">
                {req.niches.map(n => (
                  <span key={n} className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}>
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <div className="text-[11px] font-medium mb-1.5" style={{ color: C.faint }}>Content Types</div>
              <div className="flex flex-wrap gap-1">
                {req.contentTypes.map(t => (
                  <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.inkSoft }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium mb-1.5" style={{ color: C.faint }}>Platforms</div>
              <div className="flex flex-wrap gap-1">
                {req.platforms.map(p => (
                  <span key={p} className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.inkSoft }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Section>

          {/* Experience & rate */}
          <Section title="Experience & Rate">
            <Field label="Years of Experience" value={req.yearsExperience ? `${req.yearsExperience} years` : null} />
            <Field label="Rate per Video" value={req.ratePerVideo ? `$${req.ratePerVideo}` : null} />
            <Field label="Rate Note" value={req.rateNote} />
            {req.brandsWorked?.length > 0 && (
              <div>
                <div className="text-[11px] font-medium mb-1.5" style={{ color: C.faint }}>Brands Worked With</div>
                <div className="flex flex-wrap gap-1">
                  {req.brandsWorked.map(b => (
                    <span key={b} className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: C.panel, color: C.inkSoft }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* Equipment */}
          <Section title="Equipment">
            <div className="flex flex-col gap-2">
              {req.camera && (
                <div className="flex items-start gap-2">
                  <Camera className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: C.faint }} strokeWidth={2} />
                  <div>
                    <div className="text-[10px] mb-0.5" style={{ color: C.faint }}>Camera</div>
                    <div className="text-[12px]" style={{ color: C.ink }}>{req.camera}</div>
                  </div>
                </div>
              )}
              {req.lighting && (
                <div className="flex items-start gap-2">
                  <Star className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: C.faint }} strokeWidth={2} />
                  <div>
                    <div className="text-[10px] mb-0.5" style={{ color: C.faint }}>Lighting</div>
                    <div className="text-[12px]" style={{ color: C.ink }}>{req.lighting}</div>
                  </div>
                </div>
              )}
              {req.audio && (
                <div className="flex items-start gap-2">
                  <Mic className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: C.faint }} strokeWidth={2} />
                  <div>
                    <div className="text-[10px] mb-0.5" style={{ color: C.faint }}>Audio</div>
                    <div className="text-[12px]" style={{ color: C.ink }}>{req.audio}</div>
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* Availability & notes */}
          <Section title="Availability">
            <div className="flex items-start gap-2 mb-3">
              <Calendar className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: C.faint }} strokeWidth={2} />
              <div className="text-[13px]" style={{ color: C.ink }}>{req.availability}</div>
            </div>
            {req.additionalNotes && (
              <div>
                <div className="text-[11px] font-medium mb-1" style={{ color: C.faint }}>Additional Notes</div>
                <p className="text-[12px] leading-relaxed" style={{ color: C.text }}>{req.additionalNotes}</p>
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>

    {showAgreement && (
      <AgreementModal
        creator={req}
        onConfirm={confirmApprove}
        onClose={() => setShowAgreement(false)}
      />
    )}
    </>
  );
}
