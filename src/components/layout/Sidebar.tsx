import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { 
  LayoutDashboard, ShoppingBag, Code2, BookOpen, 
  Briefcase, Users, MessageCircle, HelpCircle, 
  CheckSquare, Calendar, CalendarDays, FolderOpen,
  Award, Sparkles, Bot, ArrowRight
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/" }
    ]
  },
  {
    label: "Campus",
    items: [
      { icon: ShoppingBag, label: "Marketplace", href: "/marketplace", badgeKey: "marketplace" },
      { icon: Code2, label: "Coding Hub", href: "/coding", badgeKey: "streak" },
      { icon: BookOpen, label: "Resource Hub", href: "/resources" },
      { icon: Briefcase, label: "Placement Hub", href: "/placements" },
      { icon: Users, label: "Team Finder", href: "/teams" },
      { icon: MessageCircle, label: "Community", href: "/community" },
      { icon: HelpCircle, label: "Lost & Found", href: "/lost-found" }
    ]
  },
  {
    label: "Productivity",
    items: [
      { icon: CheckSquare, label: "My Tasks", href: "/tasks", badgeKey: "tasks" },
      { icon: Calendar, label: "Events", href: "/events" },
      { icon: CalendarDays, label: "Calendar", href: "/calendar" }
    ]
  },
  {
    label: "Profile",
    items: [
      { icon: FolderOpen, label: "Portfolio", href: "/portfolio" },
      { icon: Award, label: "Achievements", href: "/achievements" },
      { icon: Sparkles, label: "Skills", href: "/skills" }
    ]
  }
];

export const Sidebar = () => {
  const location = useLocation();
  const { profile, marketplace, tasks } = useApp();

  const getBadgeValue = (key?: string) => {
    if (key === "streak") return `${profile.streak}🔥`;
    if (key === "marketplace") {
      const activeCount = marketplace.filter(m => !m.sold).length;
      return activeCount > 0 ? `${activeCount}` : undefined;
    }
    if (key === "tasks") {
      const pendingCount = tasks.filter(t => t.status !== "done").length;
      return pendingCount > 0 ? `${pendingCount}` : undefined;
    }
    return undefined;
  };

  return (
    <aside className="sidebar">
      <div>
        {NAV_SECTIONS.map((section, idx) => (
          <div key={idx} className="sidebar-section">
            <h4 className="sidebar-title">{section.label}</h4>
            <div className="flex flex-col gap-1">
              {section.items.map((item, itemIdx) => {
                const isActive = location.pathname === item.href;
                const badge = getBadgeValue(item.badgeKey);

                return (
                  <Link
                    key={itemIdx}
                    to={item.href}
                    className={cn("sidebar-item", isActive && "active")}
                  >
                    <item.icon style={{ width: '1.125rem', height: '1.125rem', flexShrink: 0 }} />
                    <span className="flex-1">{item.label}</span>
                    {badge && (
                      <span
                        className={cn(
                          "badge",
                          item.badgeKey === "streak" ? "badge-gold" : "badge-gray"
                        )}
                        style={{ fontSize: '0.6875rem', padding: '0.1rem 0.45rem' }}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* AI Assistant Quick Launcher Card */}
      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--charcoal-border)' }}>
        <Link
          to="/ai"
          className="card hover:-translate-y-1 block"
          style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, var(--forest-tint), #FFFFFF)',
            border: '1px solid rgba(31, 111, 92, 0.25)',
            textDecoration: 'none'
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: '0.375rem' }}>
            <div className="flex items-center gap-2">
              <div
                className="avatar"
                style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  background: 'linear-gradient(135deg, var(--gold), var(--forest-light))'
                }}
              >
                <Bot style={{ width: '1rem', height: '1rem' }} />
              </div>
              <span className="text-charcoal font-semibold" style={{ fontSize: '0.875rem' }}>Campus AI</span>
            </div>
            <ArrowRight style={{ width: '0.875rem', height: '0.875rem', color: 'var(--forest-light)' }} />
          </div>
          <p className="text-charcoal-muted" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
            Instant search for notes, interview tips & teammates.
          </p>
        </Link>
      </div>
    </aside>
  );
};
