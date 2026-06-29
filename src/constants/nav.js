import {
  LayoutDashboard, Users, UserCheck, Megaphone, FlaskConical,
  FileText, Film, CreditCard, MessageCircle, Settings, Briefcase,
  CircleDot, Inbox, UserPlus,
} from "lucide-react";

export const NAV_GROUPS = [
  {
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
    ],
  },
  {
    label: "People",
    items: [
      {
        id: "clients-parent", label: "Clients", icon: Briefcase,
        children: [
          { id: "clients",           label: "Active Clients", icon: CircleDot },
          { id: "client-onboarding", label: "Onboarding",     icon: UserPlus },
        ],
      },
      {
        id: "creators-parent", label: "Creators", icon: UserCheck,
        children: [
          { id: "creators",          label: "Active Creators",   icon: CircleDot },
          { id: "creator-requests",  label: "Creator Requests",  icon: Inbox },
        ],
      },
    ],
  },
  {
    label: "Campaigns",
    items: [
      { id: "campaigns", label: "All Campaigns", icon: Megaphone },
      { id: "research", label: "Research", icon: FlaskConical },
      { id: "briefs", label: "Briefs", icon: FileText },
      { id: "production", label: "Production", icon: Film },
    ],
  },
  {
    label: "Account",
    items: [
      { id: "payments", label: "Payments", icon: CreditCard },
      { id: "messages", label: "Messages", icon: MessageCircle },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];
