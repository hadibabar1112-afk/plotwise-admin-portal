import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { C } from "../constants/colors";
import { NAV_GROUPS } from "../constants/nav";
import Logo from "./Logo";

function NavItem({ item, active, navigate }) {
  const [open, setOpen] = useState(
    item.children ? item.children.some((c) => c.id === active) : false
  );

  if (item.children) {
    const childActive = item.children.some((c) => c.id === active);
    const Icon = item.icon;
    return (
      <div>
        <button
          onClick={() => {
            if (!open) { setOpen(true); navigate(item.children[0].id); }
            else if (!childActive) { setOpen(false); }
            else { setOpen(true); }
          }}
          className="w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors"
          style={{
            backgroundColor: childActive ? C.tealTint : "transparent",
            color: childActive ? C.teal : C.text,
            borderLeft: childActive ? "2px solid " + C.teal : "2px solid transparent",
          }}
        >
          <Icon className="w-4 h-4" strokeWidth={childActive ? 2.2 : 1.8} />
          <span className="flex-1 text-[13px]" style={{ fontWeight: childActive ? 600 : 500 }}>
            {item.label}
          </span>
          <ChevronDown
            className="w-3.5 h-3.5 flex-shrink-0 transition-transform"
            strokeWidth={2}
            style={{ color: C.faint, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
        {open && (
          <div className="pb-0.5">
            {item.children.map((child) => {
              const on = child.id === active;
              const ChildIcon = child.icon;
              return (
                <button
                  key={child.id}
                  onClick={() => navigate(child.id)}
                  className="w-full flex items-center gap-2.5 pl-9 pr-4 py-1.5 text-left transition-colors"
                  style={{
                    backgroundColor: on ? C.tealTint : "transparent",
                    color: on ? C.teal : C.muted,
                    borderLeft: on ? "2px solid " + C.teal : "2px solid transparent",
                  }}
                >
                  {ChildIcon && (
                    <ChildIcon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={on ? 2.2 : 1.8} style={{ color: on ? C.teal : C.muted }} />
                  )}
                  <span className="flex-1 text-[12px]" style={{ fontWeight: on ? 600 : 500 }}>
                    {child.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const on = item.id === active;
  const Icon = item.icon;
  return (
    <button
      onClick={() => navigate(item.id)}
      className="w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors"
      style={{
        backgroundColor: on ? C.tealTint : "transparent",
        color: on ? C.teal : C.text,
        borderLeft: on ? "2px solid " + C.teal : "2px solid transparent",
      }}
    >
      <Icon className="w-4 h-4" strokeWidth={on ? 2.2 : 1.8} />
      <span className="flex-1 text-[13px]" style={{ fontWeight: on ? 600 : 500 }}>
        {item.label}
      </span>
      {item.badge && (
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
          style={{ backgroundColor: C.rose, color: "white" }}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

export default function Sidebar({ active, navigate, counts = {} }) {
  return (
    <aside
      className="w-[248px] flex-shrink-0 flex flex-col sticky top-0"
      style={{ backgroundColor: C.surface, borderRight: "1px solid " + C.hairline, height: "100vh" }}
    >
      {/* Logo + Admin badge */}
      <div className="px-4 py-4 flex items-center gap-3">
        <Logo variant="dark" />
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
          style={{ backgroundColor: C.tealMist, color: C.teal, border: "1px solid " + C.tealBorder }}
        >
          Admin
        </span>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-3">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="mb-4">
            {group.label && (
              <div
                className="px-4 mb-1.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: C.faint, letterSpacing: "0.12em" }}
              >
                {group.label}
              </div>
            )}
            {!group.label && gi > 0 && (
              <div className="mx-4 mb-3 h-px" style={{ backgroundColor: C.hairlineSoft }} />
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem
                  key={item.id}
                  item={{ ...item, badge: counts[item.id] || null }}
                  active={active}
                  navigate={navigate}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3" style={{ borderTop: "1px solid " + C.hairline }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, " + C.tealDeep + ", " + C.teal + ")" }}
          >
            PW
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold truncate" style={{ color: C.ink }}>Plotwise Admin</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.green }} />
              <span className="text-[11px]" style={{ color: C.faint }}>Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
