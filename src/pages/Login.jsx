import { useState } from "react";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { C } from "../constants/colors";

const DEMO_EMAIL = "admin@plotwise.co";
const DEMO_PASSWORD = "plotwise2024";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (
        email.trim().toLowerCase() === DEMO_EMAIL &&
        password === DEMO_PASSWORD
      ) {
        onLogin();
      } else {
        setError("Invalid email or password. Try admin@plotwise.co / plotwise2024");
        setLoading(false);
      }
    }, 700);
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: C.bg, fontFamily: "var(--font-sans)" }}
    >
      {/* ── Left brand panel ── */}
      <div
        className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-shrink-0 flex-col relative overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${C.tealDeep} 0%, ${C.teal} 55%, #2BA89E 100%)` }}
      >
        {/* Decorative rings */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-[0.12]"
          style={{ border: "1.5px solid #fff" }}
        />
        <div
          className="absolute -top-12 -left-12 w-72 h-72 rounded-full opacity-[0.08]"
          style={{ border: "1.5px solid #fff" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full opacity-[0.06]"
          style={{ border: "1.5px solid #fff", transform: "translate(40%, 40%)" }}
        />
        <div
          className="absolute bottom-16 -right-8 w-80 h-80 rounded-full opacity-[0.07]"
          style={{ border: "1px solid #fff" }}
        />

        {/* Content */}
        <div className="relative flex flex-col flex-1 px-12 py-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-auto">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-bold"
              style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#fff" }}
            >
              PW
            </div>
            <div>
              <div className="text-[16px] font-bold text-white tracking-tight">Plotwise</div>
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em" }}>Admin</div>
            </div>
          </div>

          {/* Hero text */}
          <div className="mb-auto">
            <h1
              className="text-[38px] xl:text-[44px] font-semibold leading-[1.15] text-white mb-4"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}
            >
              Creator campaigns,<br />beautifully managed.
            </h1>
            <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Manage clients, briefs, creators, and production — all in one clean workspace.
            </p>
          </div>

          {/* Stats strip */}
          <div
            className="grid grid-cols-3 gap-4 p-5 rounded-2xl mt-10"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            {[
              { value: "24", label: "Active Creators" },
              { value: "12", label: "Live Campaigns" },
              { value: "$48k", label: "This Month" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-[22px] font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {s.value}
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${C.tealDeep}, ${C.teal})` }}
          >
            PW
          </div>
          <div>
            <div className="text-[16px] font-bold tracking-tight" style={{ color: C.ink }}>Plotwise</div>
            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.faint, letterSpacing: "0.12em" }}>Admin</div>
          </div>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="mb-8">
            <h2
              className="text-[28px] font-semibold leading-tight mb-2"
              style={{ color: C.ink, fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Welcome back
            </h2>
            <p className="text-[14px]" style={{ color: C.muted }}>
              Sign in to your admin account to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                className="block text-[11px] font-bold uppercase tracking-widest mb-1.5"
                style={{ color: C.faint, letterSpacing: "0.1em" }}
              >
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                placeholder="admin@plotwise.co"
                autoComplete="email"
                className="w-full h-11 px-4 rounded-xl text-[14px] outline-none transition-all"
                style={{
                  backgroundColor: C.surface,
                  border: "1.5px solid " + (error ? C.rose + "88" : C.hairline),
                  color: C.ink,
                }}
                onFocus={e => { e.target.style.borderColor = C.teal; e.target.style.boxShadow = `0 0 0 3px ${C.tealBorder}`; }}
                onBlur={e => { e.target.style.borderColor = error ? C.rose + "88" : C.hairline; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: C.faint, letterSpacing: "0.1em" }}
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-[12px] font-semibold"
                  style={{ color: C.teal }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full h-11 px-4 pr-11 rounded-xl text-[14px] outline-none transition-all"
                  style={{
                    backgroundColor: C.surface,
                    border: "1.5px solid " + (error ? C.rose + "88" : C.hairline),
                    color: C.ink,
                  }}
                  onFocus={e => { e.target.style.borderColor = C.teal; e.target.style.boxShadow = `0 0 0 3px ${C.tealBorder}`; }}
                  onBlur={e => { e.target.style.borderColor = error ? C.rose + "88" : C.hairline; e.target.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-lg hover:opacity-70"
                  style={{ color: C.faint }}
                >
                  {showPw
                    ? <EyeOff className="w-4 h-4" strokeWidth={2} />
                    : <Eye className="w-4 h-4" strokeWidth={2} />
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-[13px]"
                style={{ backgroundColor: C.roseSoft, color: C.rose, border: "1px solid " + C.rose + "33" }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl text-[14px] font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 mt-2"
              style={{ backgroundColor: C.tealDeep }}
            >
              {loading ? (
                <span
                  className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"
                />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div
            className="mt-6 px-4 py-3 rounded-xl text-[12px]"
            style={{ backgroundColor: C.tealMist, border: "1px solid " + C.tealBorder, color: C.teal }}
          >
            <span className="font-bold">Demo credentials —</span> email: <span className="font-semibold">admin@plotwise.co</span> &nbsp;·&nbsp; password: <span className="font-semibold">plotwise2024</span>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-[12px]" style={{ color: C.faint }}>
          © 2026 Plotwise. All rights reserved.
        </p>
      </div>
    </div>
  );
}
