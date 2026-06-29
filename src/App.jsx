import { useState } from "react";
import { C } from "./constants/colors";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Overview from "./pages/Overview";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import ClientOnboarding from "./pages/ClientOnboarding";
import Creators from "./pages/Creators";
import CreatorDetail from "./pages/CreatorDetail";
import { CREATORS } from "./data/creators";
import CreatorRequests from "./pages/CreatorRequests";
import CreatorRequestDetail from "./pages/CreatorRequestDetail";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import Research from "./pages/Research";
import ResearchDetail from "./pages/ResearchDetail";
import Briefs from "./pages/Briefs";
import Production from "./pages/Production";
import ProductionDetail from "./pages/ProductionDetail";
import Payments from "./pages/Payments";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

export default function App() {
  const [section, setSection] = useState("overview");
  const [context, setContext] = useState({});
  const [toast, setToast] = useState(null);
  const [creatorStatuses, setCreatorStatuses] = useState(
    () => Object.fromEntries(CREATORS.map(c => [c.id, c.status]))
  );

  function toggleCreatorStatus(id) {
    setCreatorStatuses(prev => ({
      ...prev,
      [id]: prev[id] === "active" ? "inactive" : "active",
    }));
  }

  function navigate(s, ctx = {}) {
    setSection(s);
    setContext(ctx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showToast(msg, duration = 4000) {
    setToast(msg);
    setTimeout(() => setToast(null), duration);
  }

  function renderPage() {
    switch (section) {
      case "overview":
        return <Overview navigate={navigate} />;
      case "clients":
        return <Clients navigate={navigate} />;
      case "client-onboarding":
        return <ClientOnboarding navigate={navigate} />;
      case "client-detail":
        return <ClientDetail clientId={context.clientId} navigate={navigate} />;
      case "creators":
        return <Creators navigate={navigate} creatorStatuses={creatorStatuses} toggleCreatorStatus={toggleCreatorStatus} />;
      case "creator-detail":
        return <CreatorDetail creatorId={context.creatorId} navigate={navigate} creatorStatuses={creatorStatuses} toggleCreatorStatus={toggleCreatorStatus} />;
      case "creator-requests":
        return <CreatorRequests navigate={navigate} />;
      case "creator-request-detail":
        return <CreatorRequestDetail navigate={navigate} context={context} />;
      case "campaigns":
        return <Campaigns navigate={navigate} />;
      case "campaign-detail":
        return <CampaignDetail campaignId={context.campaignId} navigate={navigate} />;
      case "research":
        return <Research navigate={navigate} />;
      case "research-detail":
        return <ResearchDetail navigate={navigate} context={context} />;
      case "briefs":
        return <Briefs navigate={navigate} />;
      case "production":
        return <Production navigate={navigate} />;
      case "production-detail":
        return <ProductionDetail campaignId={context.campaignId} navigate={navigate} />;
      case "payments":
        return <Payments navigate={navigate} />;
      case "messages":
        return <Messages navigate={navigate} />;
      case "settings":
        return <Settings />;
      default:
        return <Overview navigate={navigate} />;
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: C.bg }}>
      {/* Sidebar */}
      <Sidebar active={section} navigate={navigate} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar section={section} navigate={navigate} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 48px" }}>
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg"
          style={{ transform: "translateX(-50%)", background: C.tealDeep, color: "#fff", minWidth: 300, maxWidth: 480 }}
        >
          <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: C.tealSoft }} />
          <span className="text-[13px] font-semibold flex-1">{toast}</span>
          <button onClick={() => setToast(null)} className="text-[16px] leading-none opacity-60 hover:opacity-100">✕</button>
        </div>
      )}
    </div>
  );
}
